import React, { useMemo, useState } from 'react';
import { Calculator } from 'lucide-react';
import type { WidgetConfig } from '../../types/curriculum';

interface BaseComplementVisualizerProps {
  config?: WidgetConfig;
  studioMode?: boolean;
}

const DIGITS = '0123456789ABCDEF';
const BASES = [2, 8, 10, 16] as const;

function parseFromBase(raw: string, base: number): number | null {
  const cleaned = raw.replace(',', '.').trim().toUpperCase();
  if (!cleaned) return null;
  const parts = cleaned.split('.');
  if (parts.length > 2) return null;
  const validChars = DIGITS.slice(0, base);

  const intStr = parts[0] || '0';
  const fracStr = parts[1] || '';
  for (const ch of intStr + fracStr) {
    if (!validChars.includes(ch)) return null;
  }

  let intVal = 0;
  for (const ch of intStr) {
    intVal = intVal * base + DIGITS.indexOf(ch);
  }
  let fracVal = 0;
  for (let i = 0; i < fracStr.length; i++) {
    fracVal += DIGITS.indexOf(fracStr[i]) / Math.pow(base, i + 1);
  }
  const total = intVal + fracVal;
  if (!Number.isFinite(total) || total > 100000) return null;
  return total;
}

export const BaseComplementVisualizer: React.FC<BaseComplementVisualizerProps> = ({
  config,
  studioMode = false,
}) => {
  const [numberInput, setNumberInput] = useState<string>(config?.initialValue ?? '25.625');
  const [sourceBase, setSourceBase] = useState<number>(10);
  const [targetBase, setTargetBase] = useState<number>(config?.initialBase ?? 2);
  const [bitWidth, setBitWidth] = useState<4 | 8>(8);

  const decimalValue = useMemo(
    () => parseFromBase(numberInput, sourceBase),
    [numberInput, sourceBase]
  );

  const conversion = useMemo(() => {
    if (decimalValue === null) return null;
    const intPart = Math.floor(decimalValue);
    const fracPart = Number((decimalValue - intPart).toFixed(8));

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

    const fracSteps: {
      fraction: number;
      product: number;
      carry: number;
      digit: string;
    }[] = [];
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
  }, [decimalValue, targetBase]);

  const complements = useMemo(() => {
    const intVal = decimalValue !== null ? Math.floor(decimalValue) : 0;
    const mask = (1 << bitWidth) - 1;
    const masked = intVal & mask;

    const bits: (0 | 1)[] = [];
    for (let i = bitWidth - 1; i >= 0; i--) {
      bits.push(((masked >> i) & 1) as 0 | 1);
    }
    const ones = bits.map((b) => (b === 1 ? 0 : 1) as 0 | 1);
    const twos = [...ones];
    let c2 = 1;
    for (let i = twos.length - 1; i >= 0; i--) {
      const s = twos[i] + c2;
      twos[i] = (s % 2) as 0 | 1;
      c2 = Math.floor(s / 2);
    }

    const decStr = String(intVal).slice(-4).padStart(4, '0');
    const decDigits = decStr.split('').map((d) => Number.parseInt(d, 10));
    const nines = decDigits.map((d) => 9 - d);
    const tens = [...nines];
    let c10 = 1;
    for (let i = tens.length - 1; i >= 0; i--) {
      const s = tens[i] + c10;
      tens[i] = s % 10;
      c10 = Math.floor(s / 10);
    }

    return { masked, bits, ones, twos, decDigits, nines, tens };
  }, [decimalValue, bitWidth]);

  const flipBit = (bitIdxFromLeft: number) => {
    const bitPos = bitWidth - 1 - bitIdxFromLeft;
    const nextMasked = complements.masked ^ (1 << bitPos);
    const nextStr = nextMasked.toString(sourceBase).toUpperCase();
    setNumberInput(nextStr);
  };

  return (
    <div
      className={`bg-white rounded-3xl border-2 border-slate-200 border-b-4 p-3 sm:p-4 flex flex-col justify-between gap-3 ${
        studioMode ? 'lg:flex-1 lg:min-h-0' : ''
      }`}
    >
      {/* Compact Header */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 pb-2.5 border-b-2 border-slate-100 shrink-0">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="w-9 h-9 rounded-2xl bg-sky-500 text-white flex items-center justify-center shrink-0 shadow-sm">
            <Calculator className="w-4 h-4" />
          </span>
          <div className="min-w-0">
            <h4 className="font-display font-extrabold text-sm sm:text-base text-slate-800 leading-tight">
              Taban Dönüşümü &amp; Complement
            </h4>
            <p className="text-[11px] font-medium text-slate-500 truncate">
              Kaynak taban, hedef taban, bit çevirme ve 1&apos;s / 2&apos;s / 9&apos;s / 10&apos;s tümleyenleri
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { label: '25.625₁₀', val: '25.625', src: 10, dst: 2 },
            { label: '101101₂', val: '101101', src: 2, dst: 16 },
            { label: '2F₁₆', val: '2F', src: 16, dst: 2 },
          ].map((preset) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => {
                setNumberInput(preset.val);
                setSourceBase(preset.src);
                setTargetBase(preset.dst);
              }}
              className="min-h-[40px] md:min-h-0 px-2.5 py-1 rounded-xl border-2 border-sky-200 bg-sky-50 hover:bg-sky-100 text-[11px] font-mono font-bold text-sky-800 cursor-pointer"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Responsive Split Body */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch flex-1 min-h-0">
        {/* Left Column: Compact Input Controls + Bit-Flipping Blocks */}
        <div className="md:col-span-5 flex flex-col justify-between gap-2.5 min-w-0">
          <div className="bg-[#FFFDF8] border-2 border-amber-100 rounded-2xl p-3.5 space-y-2.5">
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">
                Sayı Girişi (Base {sourceBase})
              </label>
              <input
                type="text"
                value={numberInput}
                onChange={(e) => setNumberInput(e.target.value.toUpperCase())}
                placeholder="Örn: 25.625"
                className={`w-full px-3 py-1.5 rounded-xl bg-white border-2 font-mono text-sm font-extrabold focus:outline-none ${
                  decimalValue === null
                    ? 'border-rose-400 text-rose-700'
                    : 'border-slate-200 text-slate-800 focus:border-sky-400'
                }`}
              />
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <div className="text-[11px] font-bold text-slate-500 mb-1">Kaynak Taban</div>
                <div className="grid grid-cols-4 gap-1 p-1 rounded-xl bg-white border border-slate-200">
                  {BASES.map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setSourceBase(b)}
                      className={`min-h-[38px] md:min-h-0 py-1 rounded-lg font-mono text-[11px] font-extrabold cursor-pointer transition-all ${
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
                <div className="text-[11px] font-bold text-slate-500 mb-1">Hedef Taban</div>
                <div className="grid grid-cols-4 gap-1 p-1 rounded-xl bg-white border border-slate-200">
                  {BASES.map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setTargetBase(b)}
                      className={`min-h-[38px] md:min-h-0 py-1 rounded-lg font-mono text-[11px] font-extrabold cursor-pointer transition-all ${
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

            <div className="flex items-center justify-between pt-0.5">
              <span className="text-[11px] font-bold text-slate-500">Bit Genişliği:</span>
              <div className="inline-flex gap-1 p-1 rounded-xl bg-white border border-slate-200">
                {([4, 8] as const).map((w) => (
                  <button
                    key={w}
                    type="button"
                    onClick={() => setBitWidth(w)}
                    className={`px-2.5 py-0.5 rounded-lg font-mono text-[11px] font-extrabold cursor-pointer ${
                      bitWidth === w
                        ? 'bg-violet-500 text-white'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {w}-bit
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Converted Result Banner */}
          <div className="bg-emerald-50/70 border-2 border-emerald-200 rounded-2xl px-3.5 py-2.5 flex items-center justify-between gap-2">
            <div>
              <div className="text-[10px] font-display font-extrabold text-emerald-700">
                DÖNÜŞÜM SONUCU (BASE {targetBase})
              </div>
              <div className="text-[11px] font-mono text-slate-600">
                Onluk değer: {decimalValue !== null ? Number(decimalValue.toFixed(6)) : 'Geçersiz'}
              </div>
            </div>
            <div className="font-mono text-base sm:text-lg font-black text-emerald-800 truncate">
              {conversion ? `(${conversion.fullResult})_${targetBase}` : 'Hatalı giriş'}
            </div>
          </div>

          {/* Interactive Bit-Flipping Visual Blocks */}
          <div className="bg-sky-50/60 border-2 border-sky-200 rounded-2xl p-3 space-y-1.5">
            <div className="flex items-center justify-between text-[11px] font-bold text-sky-800">
              <span>Etkileşimli Bit Blokları ({bitWidth}-bit · Tıklayıp Çevir)</span>
              <span className="font-mono">{complements.masked}₁₀</span>
            </div>
            <div className="flex items-center justify-center gap-1.5 flex-wrap">
              {complements.bits.map((b, idx) => {
                const power = bitWidth - 1 - idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => flipBit(idx)}
                    className={`flex flex-col items-center justify-center w-10 h-12 sm:w-9 sm:h-11 rounded-xl border-2 border-b-4 active:border-b-2 transition-all cursor-pointer ${
                      b === 1
                        ? 'bg-emerald-500 border-emerald-600 text-white'
                        : 'bg-white border-slate-200 text-slate-500 hover:border-sky-300'
                    }`}
                  >
                    <span className="font-mono text-sm font-black leading-none">{b}</span>
                    <span
                      className={`font-mono text-[9px] mt-0.5 ${
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

        {/* Right Column: Step-by-Step Tables + 1's, 2's, 9's, 10's Complement Cards */}
        <div className="md:col-span-7 flex flex-col justify-between gap-2.5 min-w-0">
          {/* Step-by-Step Division & Multiplication Tables */}
          <div className="bg-white border-2 border-slate-200 rounded-2xl p-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-700 mb-1.5">
                <span>Tam Kısım (÷ {targetBase}, Alttan Üste ↑)</span>
                <span className="font-mono text-sky-600">
                  {conversion ? `${conversion.intPart}₁₀` : '-'}
                </span>
              </div>
              <div className="max-h-[125px] overflow-y-auto pastel-scrollbar border border-slate-100 rounded-xl">
                <table className="w-full text-[11px] font-mono">
                  <thead className="bg-slate-50 text-slate-500">
                    <tr>
                      <th className="py-1 px-2 text-left">Bölme</th>
                      <th className="py-1 px-2 text-right">Bölüm</th>
                      <th className="py-1 px-2 text-right text-emerald-700">Kalan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(conversion?.intSteps ?? []).map((s, idx) => (
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
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-700 mb-1.5">
                <span>Kesir (× {targetBase}, Üstten Alta ↓)</span>
                <span className="font-mono text-sky-600">
                  {conversion ? `${conversion.fracPart}₁₀` : '-'}
                </span>
              </div>
              <div className="max-h-[125px] overflow-y-auto pastel-scrollbar border border-slate-100 rounded-xl">
                {!conversion || conversion.fracSteps.length === 0 ? (
                  <div className="text-[11px] text-slate-400 p-3 text-center">
                    Kesirli kısım yok (örn. 25.625)
                  </div>
                ) : (
                  <table className="w-full text-[11px] font-mono">
                    <thead className="bg-slate-50 text-slate-500">
                      <tr>
                        <th className="py-1 px-2 text-left">Çarpma</th>
                        <th className="py-1 px-2 text-right">Sonuç</th>
                        <th className="py-1 px-2 text-right text-emerald-700">Tam</th>
                      </tr>
                    </thead>
                    <tbody>
                      {conversion.fracSteps.map((s, idx) => (
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

          {/* 1's, 2's, 9's, 10's Complement Result Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div className="bg-sky-50/60 border-2 border-sky-200 rounded-2xl p-2.5 space-y-1.5">
              <div className="flex items-center justify-between text-[11px] font-display font-extrabold text-sky-800">
                <span>1&apos;s COMPLEMENT (Bit Tersle)</span>
                <span className="font-mono">{complements.ones.join('')}</span>
              </div>
              <div className="flex gap-1 flex-wrap">
                {complements.ones.map((b, i) => (
                  <span
                    key={i}
                    className="w-6 h-6 rounded-lg bg-white border border-sky-300 font-mono text-xs font-extrabold text-sky-800 flex items-center justify-center"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-emerald-50/60 border-2 border-emerald-200 rounded-2xl p-2.5 space-y-1.5">
              <div className="flex items-center justify-between text-[11px] font-display font-extrabold text-emerald-800">
                <span>2&apos;s COMPLEMENT (+1)</span>
                <span className="font-mono">{complements.twos.join('')}</span>
              </div>
              <div className="flex gap-1 flex-wrap">
                {complements.twos.map((b, i) => (
                  <span
                    key={i}
                    className="w-6 h-6 rounded-lg bg-emerald-500 border border-emerald-600 font-mono text-xs font-extrabold text-white flex items-center justify-center"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-amber-50/60 border-2 border-amber-200 rounded-2xl p-2.5 space-y-1.5">
              <div className="flex items-center justify-between text-[11px] font-display font-extrabold text-amber-800">
                <span>9&apos;s COMPLEMENT (9 - dᵢ)</span>
                <span className="font-mono text-slate-600">
                  {complements.decDigits.join('')} → {complements.nines.join('')}
                </span>
              </div>
              <div className="flex gap-1.5">
                {complements.nines.map((d, i) => (
                  <span
                    key={i}
                    className="w-7 h-6 rounded-lg bg-white border border-amber-300 font-mono text-xs font-extrabold text-amber-800 flex items-center justify-center"
                  >
                    {d}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-violet-50/60 border-2 border-violet-200 rounded-2xl p-2.5 space-y-1.5">
              <div className="flex items-center justify-between text-[11px] font-display font-extrabold text-violet-800">
                <span>10&apos;s COMPLEMENT (+1)</span>
                <span className="font-mono">{complements.tens.join('')}</span>
              </div>
              <div className="flex gap-1.5">
                {complements.tens.map((d, i) => (
                  <span
                    key={i}
                    className="w-7 h-6 rounded-lg bg-violet-500 border border-violet-600 font-mono text-xs font-extrabold text-white flex items-center justify-center"
                  >
                    {d}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
