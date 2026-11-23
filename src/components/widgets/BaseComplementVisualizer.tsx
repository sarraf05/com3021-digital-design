import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AlertTriangle, Calculator, Sparkles } from 'lucide-react';
import type { WidgetConfig } from '../../types/curriculum';
import { useSession } from '../../context/SessionContext';
import { UI_STRINGS } from '../../i18n/translations';

interface BaseComplementVisualizerProps {
  config?: WidgetConfig;
  studioMode?: boolean;
}

const DIGITS = '0123456789ABCDEF';
const BASES = [2, 8, 10, 16] as const;
const BIT_WIDTHS = [4, 8, 16] as const;
type BitWidth = (typeof BIT_WIDTHS)[number];

interface ParsedNumber {
  value: number;
  magnitude: number;
  isNegative: boolean;
}

function parseFromBase(raw: string, base: number): ParsedNumber | null {
  const cleaned = raw.replace(',', '.').trim().toUpperCase();
  if (!cleaned) return null;

  const isNegative = cleaned.startsWith('-');
  const hasExplicitSign = isNegative || cleaned.startsWith('+');
  const unsigned = hasExplicitSign ? cleaned.slice(1).trim() : cleaned;
  if (!unsigned) return null;

  const parts = unsigned.split('.');
  if (parts.length > 2) return null;

  const intStrRaw = parts[0];
  const fracStrRaw = parts[1] ?? '';
  if (intStrRaw.length === 0 && fracStrRaw.length === 0) return null;

  const validChars = DIGITS.slice(0, base);
  for (const ch of intStrRaw + fracStrRaw) {
    if (!validChars.includes(ch)) return null;
  }

  let intVal = 0;
  for (const ch of intStrRaw) {
    intVal = intVal * base + DIGITS.indexOf(ch);
  }
  let fracVal = 0;
  for (let i = 0; i < fracStrRaw.length; i++) {
    fracVal += DIGITS.indexOf(fracStrRaw[i]) / Math.pow(base, i + 1);
  }

  const magnitude = intVal + fracVal;
  if (!Number.isFinite(magnitude) || magnitude > 100000) return null;

  const effectiveNegative = isNegative && magnitude > 0;
  return {
    value: effectiveNegative ? -magnitude : magnitude,
    magnitude,
    isNegative: effectiveNegative,
  };
}

function convertMagnitudeToBase(
  magnitude: number,
  targetBase: number
): {
  intPart: number;
  fracPart: number;
  intSteps: { dividend: number; quotient: number; remainder: number; digit: string }[];
  fracSteps: { fraction: number; product: number; carry: number; digit: string }[];
  fullResult: string;
} {
  const intPart = Math.floor(magnitude);
  const fracPart = Number((magnitude - intPart).toFixed(8));

  const intSteps: { dividend: number; quotient: number; remainder: number; digit: string }[] = [];
  if (intPart === 0) {
    intSteps.push({ dividend: 0, quotient: 0, remainder: 0, digit: '0' });
  } else {
    let cur = intPart;
    while (cur > 0) {
      const q = Math.floor(cur / targetBase);
      const r = cur % targetBase;
      intSteps.push({ dividend: cur, quotient: q, remainder: r, digit: DIGITS[r] });
      cur = q;
    }
  }
  const intResult = [...intSteps]
    .reverse()
    .map((s) => s.digit)
    .join('');

  const fracSteps: { fraction: number; product: number; carry: number; digit: string }[] = [];
  let curFrac = fracPart;
  let safety = 0;
  while (curFrac > 1e-7 && safety < 5) {
    const prod = Number((curFrac * targetBase).toFixed(7));
    const carry = Math.floor(prod);
    const nextF = Number((prod - carry).toFixed(7));
    fracSteps.push({
      fraction: curFrac,
      product: prod,
      carry,
      digit: DIGITS[carry] ?? '0',
    });
    curFrac = nextF;
    safety++;
  }
  const fracResult = fracSteps.map((s) => s.digit).join('');

  return {
    intPart,
    fracPart,
    intSteps,
    fracSteps,
    fullResult: fracResult ? `${intResult}.${fracResult}` : intResult,
  };
}

function getSignedRange(w: BitWidth): [number, number] {
  const minVal = -(1 << (w - 1));
  const maxVal = (1 << (w - 1)) - 1;
  return [minVal, maxVal];
}

export const BaseComplementVisualizer: React.FC<BaseComplementVisualizerProps> = ({
  config,
  studioMode = false,
}) => {
  const { session, updateToolsState } = useSession();
  const bc = UI_STRINGS[session.language].baseComplement;
  const savedBaseRef = useRef(studioMode ? session.tools.baseComplement : undefined);

  const [numberInput, setNumberInput] = useState<string>(
    savedBaseRef.current?.numberInput ?? config?.initialValue ?? '25.625'
  );
  const [sourceBase, setSourceBase] = useState<number>(
    savedBaseRef.current?.sourceBase ?? 10
  );
  const [targetBase, setTargetBase] = useState<number>(
    savedBaseRef.current?.targetBase ?? config?.initialBase ?? 2
  );
  const [bitWidth, setBitWidth] = useState<BitWidth>(
    savedBaseRef.current?.bitWidth ?? 8
  );

  const skipFirstSyncRef = useRef(true);
  useEffect(() => {
    if (!studioMode) return;
    if (skipFirstSyncRef.current) {
      skipFirstSyncRef.current = false;
      return;
    }
    updateToolsState('baseComplement', {
      numberInput,
      sourceBase,
      targetBase,
      bitWidth,
    });
  }, [studioMode, numberInput, sourceBase, targetBase, bitWidth, updateToolsState]);

  const parsed = useMemo(
    () => parseFromBase(numberInput, sourceBase),
    [numberInput, sourceBase]
  );

  const isNegativeInput = parsed
    ? parsed.isNegative
    : numberInput.trim().startsWith('-');

  const toggleSign = () => {
    const trimmed = numberInput.trim();
    if (!trimmed) {
      setNumberInput('-');
      return;
    }
    if (trimmed.startsWith('-')) {
      setNumberInput(trimmed.slice(1) || '0');
    } else if (trimmed.startsWith('+')) {
      setNumberInput(`-${trimmed.slice(1)}`);
    } else {
      setNumberInput(`-${trimmed}`);
    }
  };

  // Positional base conversions across all 4 bases + step-by-step table for targetBase
  const conversionData = useMemo(() => {
    if (!parsed) return null;
    const signPrefix = parsed.isNegative ? '-' : '';
    const targetConv = convertMagnitudeToBase(parsed.magnitude, targetBase);

    const allBases = BASES.map((b) => {
      const c = convertMagnitudeToBase(parsed.magnitude, b);
      return {
        base: b,
        signedStr: `${signPrefix}${c.fullResult}`,
      };
    });

    return {
      ...targetConv,
      signPrefix,
      signedFullResult: `${signPrefix}${targetConv.fullResult}`,
      allBases,
    };
  }, [parsed, targetBase]);

  // Smart Auto-Fit Bit Width + Signed Binary Encodings + Decimal Complements
  const encoding = useMemo(() => {
    const magInt = parsed ? Math.floor(parsed.magnitude) : 0;
    const isNeg = parsed ? parsed.isNegative : false;
    const signedInt = isNeg ? -magInt : magInt;

    // Determine effective bit width cleanly
    let effectiveWidth: BitWidth = bitWidth;
    let overflowWarning: string | null = null;

    if (isNeg) {
      const [minSelected, maxSelected] = getSignedRange(bitWidth);
      if (signedInt < minSelected) {
        if (bitWidth === 4 && signedInt >= -128) {
          effectiveWidth = 8;
        } else {
          effectiveWidth = 16;
        }
        overflowWarning = bc.overflowSigned(bitWidth, minSelected, maxSelected, effectiveWidth);
      }
    } else {
      const maxUnsigned = (1 << bitWidth) - 1;
      if (magInt > maxUnsigned) {
        effectiveWidth = bitWidth === 4 && magInt <= 255 ? 8 : 16;
        overflowWarning = bc.overflowUnsigned(bitWidth, maxUnsigned, effectiveWidth);
      }
    }

    const mask = (1 << effectiveWidth) - 1;
    const maskedMag = magInt & mask;

    // 1. Magnitude |N| bits
    const magBits: (0 | 1)[] = [];
    for (let i = effectiveWidth - 1; i >= 0; i--) {
      magBits.push(((maskedMag >> i) & 1) as 0 | 1);
    }

    // 2. Signed-Magnitude bits (Sign bit + (W-1) magnitude bits)
    const maxSignedMag = (1 << (effectiveWidth - 1)) - 1;
    const signedMagValid = magInt <= maxSignedMag;
    const signedMagBits: (0 | 1)[] = signedMagValid
      ? [isNeg ? 1 : 0, ...magBits.slice(1)]
      : magBits;

    // 3. 1's Complement (Invert all bits of |N| when showing negative complement, or ~|N| of input)
    const onesBits = magBits.map((b) => (b === 1 ? 0 : 1) as 0 | 1);

    // 4. 2's Complement (1's Complement + 1)
    const twosBits = [...onesBits];
    let carry = 1;
    for (let i = twosBits.length - 1; i >= 0; i--) {
      const s = twosBits[i] + carry;
      twosBits[i] = (s % 2) as 0 | 1;
      carry = Math.floor(s / 2);
    }

    // Rightmost '1' index in magBits for the quick 2's complement shortcut highlight
    const rightmostOneIdx = magBits.lastIndexOf(1);

    // Active signed binary value representing the entered integer:
    // If positive, 2's complement encoding IS magBits; if negative, it IS twosBits.
    const signedTwosResult = isNeg ? twosBits : magBits;
    const signedOnesResult = isNeg ? onesBits : magBits;

    // Decimal 9's & 10's Complements based on digit count n of |N|
    const decStr = String(magInt);
    const nDigits = Math.max(1, decStr.length);
    const pow10 = Math.pow(10, nDigits);
    const nineMax = pow10 - 1;
    const ninesVal = Math.max(0, nineMax - magInt);
    const tensVal = magInt === 0 ? 0 : pow10 - magInt;

    const decDigits = decStr.split('').map((d) => Number.parseInt(d, 10));
    const ninesDigits = String(ninesVal)
      .padStart(nDigits, '0')
      .split('')
      .map((d) => Number.parseInt(d, 10));
    const tensDigits = String(tensVal)
      .padStart(nDigits, '0')
      .split('')
      .map((d) => Number.parseInt(d, 10));

    return {
      magInt,
      isNeg,
      signedInt,
      effectiveWidth,
      overflowWarning,
      maskedMag,
      magBits,
      signedMagValid,
      signedMagBits,
      onesBits,
      twosBits,
      signedOnesResult,
      signedTwosResult,
      rightmostOneIdx,
      nDigits,
      pow10,
      nineMax,
      ninesVal,
      tensVal,
      decDigits,
      ninesDigits,
      tensDigits,
    };
  }, [parsed, bitWidth, bc]);

  const flipBit = (bitIdxFromLeft: number) => {
    const bitPos = encoding.effectiveWidth - 1 - bitIdxFromLeft;
    const nextMag = encoding.maskedMag ^ (1 << bitPos);
    const nextUnsigned = nextMag.toString(sourceBase).toUpperCase();
    setNumberInput(isNegativeInput && nextMag > 0 ? `-${nextUnsigned}` : nextUnsigned);
  };

  const isCompactBits = encoding.effectiveWidth === 16;

  return (
    <div
      className={`bg-white rounded-3xl border-2 border-slate-200 border-b-4 p-3 sm:p-4 flex flex-col justify-between gap-2.5 ${
        studioMode ? 'lg:flex-1 lg:min-h-0' : ''
      }`}
    >
      {/* Compact Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b-2 border-slate-100 shrink-0">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="w-9 h-9 rounded-2xl bg-sky-500 text-white flex items-center justify-center shrink-0 shadow-sm">
            <Calculator className="w-4 h-4" />
          </span>
          <div className="min-w-0">
            <h4 className="font-display font-extrabold text-sm sm:text-base text-slate-800 leading-tight">
              {bc.title}
            </h4>
            <p className="text-[11px] font-medium text-slate-500 truncate">
              {bc.subtitle}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { label: '25.625₁₀', val: '25.625', src: 10, dst: 2 },
            { label: '-45₁₀', val: '-45', src: 10, dst: 2 },
            { label: '-10110₂', val: '-10110', src: 2, dst: 10 },
            { label: '-2D₁₆', val: '-2D', src: 16, dst: 2 },
          ].map((preset) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => {
                setNumberInput(preset.val);
                setSourceBase(preset.src);
                setTargetBase(preset.dst);
              }}
              className="min-h-[38px] md:min-h-0 px-2.5 py-1 rounded-xl border-2 border-sky-200 bg-sky-50 hover:bg-sky-100 text-[11px] font-mono font-bold text-sky-800 cursor-pointer"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Responsive Split Body */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-stretch flex-1 min-h-0">
        {/* Left Column: Input + Multi-Base Summary + Interactive |N| Bit Blocks */}
        <div className="md:col-span-5 flex flex-col justify-between gap-2 min-w-0">
          <div className="bg-[#FFFDF8] border-2 border-amber-100 rounded-2xl p-3 space-y-2">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[11px] font-bold text-slate-600">
                  {bc.numberInput} ({bc.baseLabel} {sourceBase})
                </label>
                {isNegativeInput && (
                  <span className="px-2 py-0.5 rounded-lg bg-rose-100 text-rose-700 font-display font-extrabold text-[10px]">
                    {bc.negativeBadge}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={toggleSign}
                  title={bc.toggleSignTitle}
                  className={`min-h-[38px] px-2.5 rounded-xl border-2 border-b-4 active:border-b-2 font-mono text-xs font-black cursor-pointer transition-all shrink-0 ${
                    isNegativeInput
                      ? 'bg-[#FF6B8B] border-rose-500 text-white'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-sky-300'
                  }`}
                >
                  +/−
                </button>
                <input
                  type="text"
                  value={numberInput}
                  onChange={(e) => setNumberInput(e.target.value.toUpperCase())}
                  placeholder={bc.placeholder}
                  className={`w-full min-h-[38px] px-3 py-1 rounded-xl bg-white border-2 font-mono text-sm font-extrabold focus:outline-none ${
                    !parsed
                      ? 'border-rose-400 text-rose-700'
                      : 'border-slate-200 text-slate-800 focus:border-sky-400'
                  }`}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <div className="text-[10.5px] font-bold text-slate-500 mb-1">{bc.sourceBase}</div>
                <div className="grid grid-cols-4 gap-1 p-1 rounded-xl bg-white border border-slate-200">
                  {BASES.map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setSourceBase(b)}
                      className={`min-h-[36px] md:min-h-0 py-1 rounded-lg font-mono text-[11px] font-extrabold cursor-pointer transition-all ${
                        sourceBase === b
                          ? 'bg-sky-500 text-white shadow-sm'
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-[10.5px] font-bold text-slate-500 mb-1">{bc.targetBase}</div>
                <div className="grid grid-cols-4 gap-1 p-1 rounded-xl bg-white border border-slate-200">
                  {BASES.map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setTargetBase(b)}
                      className={`min-h-[36px] md:min-h-0 py-1 rounded-lg font-mono text-[11px] font-extrabold cursor-pointer transition-all ${
                        targetBase === b
                          ? 'bg-[#10B981] text-white shadow-sm'
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-1.5 pt-0.5">
              <span className="text-[11px] font-bold text-slate-500">{bc.bitWidth}</span>
              <div className="inline-flex gap-1 p-1 rounded-xl bg-white border border-slate-200">
                {BIT_WIDTHS.map((w) => (
                  <button
                    key={w}
                    type="button"
                    onClick={() => setBitWidth(w)}
                    className={`min-h-[32px] md:min-h-0 px-2.5 py-0.5 rounded-lg font-mono text-[11px] font-extrabold cursor-pointer transition-all ${
                      bitWidth === w
                        ? 'bg-violet-500 text-white shadow-xs'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {w}-bit
                  </button>
                ))}
              </div>
            </div>

            {encoding.overflowWarning && (
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-amber-100/90 border border-amber-300 text-amber-900 text-[10.5px] font-bold">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>{encoding.overflowWarning}</span>
              </div>
            )}
          </div>

          {/* Multi-Base Conversion Result Banner */}
          <div className="bg-emerald-50/75 border-2 border-emerald-200 rounded-2xl px-3 py-2 space-y-1.5">
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <div className="text-[10px] font-display font-extrabold text-emerald-700">
                  {bc.conversionResult} ({bc.baseLabel.toUpperCase()} {targetBase})
                </div>
                <div className="text-[11px] font-mono text-slate-600 truncate">
                  {bc.decimalLabel} {parsed ? Number(parsed.value.toFixed(6)) : bc.invalidInput}
                </div>
              </div>
              <div className="font-mono text-base sm:text-lg font-black text-emerald-800 truncate">
                {conversionData ? `(${conversionData.signedFullResult})_${targetBase}` : bc.invalidShort}
              </div>
            </div>

            {conversionData && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 pt-1 border-t border-emerald-200/70">
                {conversionData.allBases.map((item) => (
                  <div
                    key={item.base}
                    className={`px-1.5 py-1 rounded-lg font-mono text-[10px] font-bold truncate text-center border ${
                      item.base === targetBase
                        ? 'bg-emerald-600 border-emerald-700 text-white'
                        : 'bg-white border-emerald-200 text-emerald-900'
                    }`}
                  >
                    ({item.signedStr})<sub className="text-[8px]">{item.base}</sub>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Interactive Magnitude |N| Bit-Flipping Blocks */}
          <div className="bg-sky-50/60 border-2 border-sky-200 rounded-2xl p-2.5 space-y-1.5">
            <div className="flex items-center justify-between text-[11px] font-bold text-sky-800">
              <span>
                {bc.magBlocks(encoding.effectiveWidth)}
              </span>
              <span className="font-mono">
                |{encoding.signedInt}| = {encoding.maskedMag}₁₀
              </span>
            </div>
            <div
              className={
                isCompactBits
                  ? 'grid grid-cols-8 gap-1'
                  : 'flex items-center justify-center gap-1.5 flex-wrap'
              }
            >
              {encoding.magBits.map((b, idx) => {
                const power = encoding.effectiveWidth - 1 - idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => flipBit(idx)}
                    className={`flex flex-col items-center justify-center rounded-xl border-2 border-b-4 active:border-b-2 transition-all cursor-pointer ${
                      isCompactBits ? 'h-9 w-full' : 'w-10 h-11 sm:w-9 sm:h-10'
                    } ${
                      b === 1
                        ? 'bg-emerald-500 border-emerald-600 text-white'
                        : 'bg-white border-slate-200 text-slate-500 hover:border-sky-300'
                    }`}
                  >
                    <span className="font-mono text-xs sm:text-sm font-black leading-none">{b}</span>
                    <span
                      className={`font-mono text-[8px] mt-0.5 ${
                        b === 1 ? 'text-emerald-100' : 'text-slate-400'
                      }`}
                    >
                      2^{power}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Step-by-Step Tables + Signed Encodings + 9's/10's Complements */}
        <div className="md:col-span-7 flex flex-col justify-between gap-2 min-w-0">
          {/* Step-by-Step Division & Multiplication Tables (Magnitude |N|) */}
          <div className="bg-white border-2 border-slate-200 rounded-2xl p-2.5 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div>
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-700 mb-1">
                <span>{bc.intPartTitle(targetBase)}</span>
                <span className="font-mono text-sky-600">
                  {conversionData
                    ? `${conversionData.signPrefix}${conversionData.intPart}₁₀`
                    : '-'}
                </span>
              </div>
              <div className="max-h-[104px] overflow-y-auto pastel-scrollbar border border-slate-100 rounded-xl">
                <table className="w-full text-[11px] font-mono">
                  <thead className="bg-slate-50 text-slate-500">
                    <tr>
                      <th className="py-1 px-2 text-left">{bc.divisionCol}</th>
                      <th className="py-1 px-2 text-right">{bc.quotientCol}</th>
                      <th className="py-1 px-2 text-right text-emerald-700">{bc.remainderCol}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(conversionData?.intSteps ?? []).map((s, idx) => (
                      <tr key={idx} className="border-t border-slate-100">
                        <td className="py-0.5 px-2 text-slate-700">
                          {s.dividend} ÷ {targetBase}
                        </td>
                        <td className="py-0.5 px-2 text-right text-slate-500">{s.quotient}</td>
                        <td className="py-0.5 px-2 text-right font-extrabold text-emerald-700">
                          {s.digit}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-700 mb-1">
                <span>{bc.fracPartTitle(targetBase)}</span>
                <span className="font-mono text-sky-600">
                  {conversionData ? `${conversionData.fracPart}₁₀` : '-'}
                </span>
              </div>
              <div className="max-h-[104px] overflow-y-auto pastel-scrollbar border border-slate-100 rounded-xl">
                {!conversionData || conversionData.fracSteps.length === 0 ? (
                  <div className="text-[10.5px] text-slate-400 p-3 text-center">
                    {bc.noFraction}
                  </div>
                ) : (
                  <table className="w-full text-[11px] font-mono">
                    <thead className="bg-slate-50 text-slate-500">
                      <tr>
                        <th className="py-1 px-2 text-left">{bc.multiplyCol}</th>
                        <th className="py-1 px-2 text-right">{bc.productCol}</th>
                        <th className="py-1 px-2 text-right text-emerald-700">{bc.carryCol}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {conversionData.fracSteps.map((s, idx) => (
                        <tr key={idx} className="border-t border-slate-100">
                          <td className="py-0.5 px-2 text-slate-700">
                            {s.fraction} × {targetBase}
                          </td>
                          <td className="py-0.5 px-2 text-right text-slate-500">{s.product}</td>
                          <td className="py-0.5 px-2 text-right font-extrabold text-emerald-700">
                            {s.digit}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>

          {/* 4 Signed Binary Cards: |N| Magnitude, Signed-Magnitude, 1's Comp, 2's Comp */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {/* 1. Magnitude |N| */}
            <div className="bg-slate-50/90 border-2 border-slate-200 rounded-2xl p-2 space-y-1">
              <div className="flex items-center justify-between text-[10.5px] font-display font-extrabold text-slate-700">
                <span>{bc.cardMag} (|N| = {encoding.magInt})</span>
                <span className="font-mono text-slate-800">{encoding.magBits.join('')}</span>
              </div>
              <div className={isCompactBits ? 'grid grid-cols-8 gap-0.5' : 'flex gap-1 flex-wrap'}>
                {encoding.magBits.map((b, i) => (
                  <span
                    key={i}
                    className={`${
                      isCompactBits ? 'h-5 w-full text-[10px]' : 'w-6 h-5 text-[11px]'
                    } rounded-md bg-white border border-slate-300 font-mono font-extrabold text-slate-700 flex items-center justify-center`}
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>

            {/* 2. Signed-Magnitude */}
            <div className="bg-rose-50/70 border-2 border-rose-200 rounded-2xl p-2 space-y-1">
              <div className="flex items-center justify-between text-[10.5px] font-display font-extrabold text-rose-800">
                <span>{bc.cardSignedMag}</span>
                <span className="font-mono">
                  {encoding.signedMagValid ? encoding.signedMagBits.join('') : bc.overflowShort}
                </span>
              </div>
              {encoding.signedMagValid ? (
                <div className={isCompactBits ? 'grid grid-cols-8 gap-0.5' : 'flex gap-1 flex-wrap'}>
                  {encoding.signedMagBits.map((b, i) => {
                    const isSignBit = i === 0;
                    return (
                      <span
                        key={i}
                        title={isSignBit ? (b === 1 ? bc.signBitNeg : bc.signBitPos) : undefined}
                        className={`${
                          isCompactBits ? 'h-5 w-full text-[10px]' : 'w-6 h-5 text-[11px]'
                        } rounded-md font-mono font-extrabold flex items-center justify-center border ${
                          isSignBit
                            ? b === 1
                              ? 'bg-[#FF6B8B] border-rose-600 text-white'
                              : 'bg-sky-500 border-sky-600 text-white'
                            : 'bg-white border-rose-200 text-rose-900'
                        }`}
                      >
                        {b}
                      </span>
                    );
                  })}
                </div>
              ) : (
                <div className="text-[10px] font-bold text-rose-700">
                  {bc.signedMagNote(
                    encoding.effectiveWidth,
                    (1 << (encoding.effectiveWidth - 1)) - 1
                  )}
                </div>
              )}
            </div>

            {/* 3. 1's Complement */}
            <div className="bg-sky-50/70 border-2 border-sky-200 rounded-2xl p-2 space-y-1">
              <div className="flex items-center justify-between text-[10.5px] font-display font-extrabold text-sky-800">
                <span>{bc.cardOnes}</span>
                <span className="font-mono">{encoding.onesBits.join('')}</span>
              </div>
              <div className={isCompactBits ? 'grid grid-cols-8 gap-0.5' : 'flex gap-1 flex-wrap'}>
                {encoding.onesBits.map((b, i) => (
                  <span
                    key={i}
                    className={`${
                      isCompactBits ? 'h-5 w-full text-[10px]' : 'w-6 h-5 text-[11px]'
                    } rounded-md bg-white border border-sky-300 font-mono font-extrabold text-sky-800 flex items-center justify-center`}
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>

            {/* 4. 2's Complement (+1 & Quick Shortcut Highlight) */}
            <div className="bg-emerald-50/75 border-2 border-emerald-200 rounded-2xl p-2 space-y-1">
              <div className="flex items-center justify-between text-[10.5px] font-display font-extrabold text-emerald-800">
                <span>
                  {bc.cardTwos} {encoding.isNeg ? `(${encoding.signedInt}₁₀)` : '(+1)'}
                </span>
                <span className="font-mono">{encoding.twosBits.join('')}</span>
              </div>
              <div className={isCompactBits ? 'grid grid-cols-8 gap-0.5' : 'flex gap-1 flex-wrap'}>
                {encoding.twosBits.map((b, i) => {
                  const keptFromRight =
                    encoding.rightmostOneIdx === -1 || i >= encoding.rightmostOneIdx;
                  return (
                    <span
                      key={i}
                      title={keptFromRight ? bc.twosKeepTip : bc.twosFlipTip}
                      className={`${
                        isCompactBits ? 'h-5 w-full text-[10px]' : 'w-6 h-5 text-[11px]'
                      } rounded-md font-mono font-extrabold flex items-center justify-center border ${
                        keptFromRight
                          ? 'bg-emerald-500 border-emerald-600 text-white'
                          : 'bg-sky-500 border-sky-600 text-white'
                      }`}
                    >
                      {b}
                    </span>
                  );
                })}
              </div>
              <div className="flex items-center gap-1 text-[9.5px] font-bold text-emerald-800 leading-tight">
                <Sparkles className="w-3 h-3 text-emerald-600 shrink-0" />
                <span>
                  {bc.quickShortcut}{' '}
                  <span className="text-emerald-700 underline">{bc.shortcutKeep}</span>,{' '}
                  <span className="text-sky-700 underline">{bc.shortcutFlip}</span>.
                </span>
              </div>
            </div>
          </div>

          {/* Decimal 9's & 10's Complement Row (Based on digit count n of |N|) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="bg-amber-50/70 border-2 border-amber-200 rounded-2xl p-2 space-y-1">
              <div className="flex items-center justify-between text-[10.5px] font-display font-extrabold text-amber-800">
                <span>9&apos;s COMPLEMENT (n={encoding.nDigits})</span>
                <span className="font-mono text-amber-900">
                  {encoding.nineMax} − {encoding.magInt} = {encoding.ninesDigits.join('')}
                </span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <div className="flex gap-1 flex-wrap">
                  {encoding.ninesDigits.map((d, i) => (
                    <span
                      key={i}
                      className="w-6 h-5 rounded-md bg-white border border-amber-300 font-mono text-[11px] font-extrabold text-amber-800 flex items-center justify-center"
                    >
                      {d}
                    </span>
                  ))}
                </div>
                <span className="text-[9.5px] font-bold text-amber-700 text-right">
                  {bc.ninesRule}
                </span>
              </div>
            </div>

            <div className="bg-violet-50/70 border-2 border-violet-200 rounded-2xl p-2 space-y-1">
              <div className="flex items-center justify-between text-[10.5px] font-display font-extrabold text-violet-800">
                <span>10&apos;s COMPLEMENT (10ⁿ − |N|)</span>
                <span className="font-mono text-violet-900">
                  {encoding.pow10} − {encoding.magInt} = {encoding.tensDigits.join('')}
                </span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <div className="flex gap-1 flex-wrap">
                  {encoding.tensDigits.map((d, i) => (
                    <span
                      key={i}
                      className="w-6 h-5 rounded-md bg-violet-500 border border-violet-600 font-mono text-[11px] font-extrabold text-white flex items-center justify-center"
                    >
                      {d}
                    </span>
                  ))}
                </div>
                <span className="text-[9.5px] font-bold text-violet-800 text-right">
                  {encoding.isNeg
                    ? `${encoding.tensDigits.join('')} = −${encoding.magInt} ${bc.representation}`
                    : `${encoding.pow10} − ${encoding.magInt} = ${encoding.tensVal}`}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BaseComplementVisualizer;
