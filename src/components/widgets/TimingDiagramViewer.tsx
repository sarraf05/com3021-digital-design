import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Activity, RotateCcw } from 'lucide-react';
import type { WidgetConfig } from '../../types/curriculum';
import { useSession } from '../../context/SessionContext';
import { UI_STRINGS } from '../../i18n/translations';

interface TimingDiagramViewerProps {
  config?: WidgetConfig;
  studioMode?: boolean;
}

const CYCLES = 8;

function buildSquareWavePath(
  values: (0 | 1)[],
  yHigh: number,
  yLow: number,
  stepW: number,
  startX: number
): string {
  let d = '';
  for (let i = 0; i < values.length; i++) {
    const x0 = startX + i * stepW;
    const x1 = x0 + stepW;
    const y = values[i] === 1 ? yHigh : yLow;
    if (i === 0) {
      d += `M ${x0} ${y} L ${x1} ${y}`;
    } else {
      const prevY = values[i - 1] === 1 ? yHigh : yLow;
      if (prevY !== y) {
        d += ` L ${x0} ${y}`;
      }
      d += ` L ${x1} ${y}`;
    }
  }
  return d;
}

export const TimingDiagramViewer: React.FC<TimingDiagramViewerProps> = ({
  config,
  studioMode = false,
}) => {
  const { session, updateToolsState } = useSession();
  const td = UI_STRINGS[session.language].timing;
  const savedTimingRef = useRef(studioMode ? session.tools.timingDiagram : undefined);

  const [ffType, setFfType] = useState<'D' | 'JK' | 'T'>(
    savedTimingRef.current?.ffType ?? config?.flipFlopType ?? 'D'
  );
  const [edgeType, setEdgeType] = useState<'rising' | 'falling'>(
    savedTimingRef.current?.edgeType ?? 'rising'
  );
  const [initialQ, setInitialQ] = useState<0 | 1>(
    savedTimingRef.current?.initialQ ?? 0
  );

  const [dWave, setDWave] = useState<(0 | 1)[]>(
    savedTimingRef.current?.dWave ?? [0, 1, 1, 0, 1, 0, 0, 1]
  );
  const [jWave, setJWave] = useState<(0 | 1)[]>(
    savedTimingRef.current?.jWave ?? [1, 0, 1, 0, 1, 1, 0, 1]
  );
  const [kWave, setKWave] = useState<(0 | 1)[]>(
    savedTimingRef.current?.kWave ?? [0, 0, 1, 1, 0, 1, 0, 0]
  );
  const [tWave, setTWave] = useState<(0 | 1)[]>(
    savedTimingRef.current?.tWave ?? [1, 1, 0, 1, 1, 0, 1, 1]
  );

  const skipFirstSyncRef = useRef(true);
  useEffect(() => {
    if (!studioMode) return;
    if (skipFirstSyncRef.current) {
      skipFirstSyncRef.current = false;
      return;
    }
    updateToolsState('timingDiagram', {
      ffType,
      edgeType,
      initialQ,
      dWave,
      jWave,
      kWave,
      tWave,
    });
  }, [
    studioMode,
    ffType,
    edgeType,
    initialQ,
    dWave,
    jWave,
    kWave,
    tWave,
    updateToolsState,
  ]);

  const toggleCycle = (
    setter: React.Dispatch<React.SetStateAction<(0 | 1)[]>>,
    idx: number
  ) => {
    setter((prev) => prev.map((v, i) => (i === idx ? (v === 1 ? 0 : 1) : v)));
  };

  const applyPreset = (preset: 'alt' | 'toggle' | 'zero') => {
    if (preset === 'alt') {
      setDWave([1, 0, 1, 0, 1, 0, 1, 0]);
      setJWave([1, 0, 1, 0, 1, 0, 1, 0]);
      setKWave([0, 1, 0, 1, 0, 1, 0, 1]);
      setTWave([1, 0, 1, 0, 1, 0, 1, 0]);
    } else if (preset === 'toggle') {
      setDWave([1, 1, 0, 0, 1, 1, 0, 0]);
      setJWave([1, 1, 1, 1, 1, 1, 1, 1]);
      setKWave([1, 1, 1, 1, 1, 1, 1, 1]);
      setTWave([1, 1, 1, 1, 1, 1, 1, 1]);
    } else {
      setDWave([0, 0, 0, 0, 0, 0, 0, 0]);
      setJWave([0, 0, 0, 0, 0, 0, 0, 0]);
      setKWave([0, 0, 0, 0, 0, 0, 0, 0]);
      setTWave([0, 0, 0, 0, 0, 0, 0, 0]);
    }
  };

  const qWave = useMemo(() => {
    const out: (0 | 1)[] = [];
    let q: 0 | 1 = initialQ;
    for (let i = 0; i < CYCLES; i++) {
      if (ffType === 'D') {
        q = dWave[i];
      } else if (ffType === 'T') {
        q = tWave[i] === 1 ? (q === 1 ? 0 : 1) : q;
      } else {
        const j = jWave[i];
        const k = kWave[i];
        if (j === 0 && k === 1) q = 0;
        else if (j === 1 && k === 0) q = 1;
        else if (j === 1 && k === 1) q = q === 1 ? 0 : 1;
      }
      out.push(q);
    }
    return out;
  }, [ffType, initialQ, dWave, jWave, kWave, tWave]);

  const qBarWave = useMemo(
    () => qWave.map((v) => (v === 1 ? 0 : 1) as 0 | 1),
    [qWave]
  );

  const stepW = 68;
  const startX = 52;
  const svgW = startX + CYCLES * stepW + 16;
  const svgH = ffType === 'JK' ? 248 : 206;

  const clkPath = useMemo(() => {
    const yH = 24;
    const yL = 46;
    let d = '';
    for (let i = 0; i < CYCLES; i++) {
      const x0 = startX + i * stepW;
      const xMid = x0 + stepW / 2;
      const x1 = x0 + stepW;
      if (edgeType === 'rising') {
        d +=
          i === 0
            ? `M ${x0} ${yL} L ${x0} ${yH} L ${xMid} ${yH} L ${xMid} ${yL} L ${x1} ${yL}`
            : ` L ${x0} ${yH} L ${xMid} ${yH} L ${xMid} ${yL} L ${x1} ${yL}`;
      } else {
        d +=
          i === 0
            ? `M ${x0} ${yH} L ${x0} ${yL} L ${xMid} ${yL} L ${xMid} ${yH} L ${x1} ${yH}`
            : ` L ${x0} ${yL} L ${xMid} ${yL} L ${xMid} ${yH} L ${x1} ${yH}`;
      }
    }
    return d;
  }, [edgeType]);

  const ffMeta =
    ffType === 'D'
      ? {
          eq: 'Q(t+1) = D',
          rule: td.rules.D,
        }
      : ffType === 'T'
        ? {
            eq: "Q(t+1) = T ⊕ Q = TQ' + T'Q",
            rule: td.rules.T,
          }
        : {
            eq: "Q(t+1) = JQ' + K'Q",
            rule: td.rules.JK,
          };

  const qTopY = ffType === 'JK' ? 154 : 114;
  const qBotY = ffType === 'JK' ? 178 : 138;
  const qBarTopY = ffType === 'JK' ? 200 : 160;
  const qBarBotY = ffType === 'JK' ? 224 : 184;

  return (
    <div
      className={`bg-white rounded-3xl border-2 border-slate-200 border-b-4 p-3 sm:p-4 flex flex-col justify-between gap-3 ${
        studioMode ? 'lg:flex-1 lg:min-h-0' : ''
      }`}
    >
      {/* Compact Header */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 pb-2.5 border-b-2 border-slate-100 shrink-0">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="w-9 h-9 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-sm">
            <Activity className="w-4 h-4" />
          </span>
          <div className="min-w-0">
            <h4 className="font-display font-extrabold text-sm sm:text-base text-slate-800 leading-tight">
              {td.title}
            </h4>
            <p className="text-[11px] font-medium text-slate-500 truncate">
              {td.subtitle}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <div className="flex items-center gap-1 p-1 rounded-2xl bg-amber-50/80 border-2 border-amber-200/80">
            {(['D', 'JK', 'T'] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setFfType(t)}
                className={`min-h-[36px] md:min-h-0 px-2.5 py-1 text-xs font-mono font-extrabold rounded-xl transition-all cursor-pointer ${
                  ffType === t
                    ? 'bg-[#10B981] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {t} FF
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setEdgeType((e) => (e === 'rising' ? 'falling' : 'rising'))}
            className="min-h-[40px] md:min-h-0 px-2.5 py-1.5 rounded-2xl border-2 border-sky-200 border-b-4 bg-sky-50 hover:bg-sky-100 active:border-b-2 text-xs font-mono font-bold text-sky-800 cursor-pointer"
          >
            {edgeType === 'rising' ? td.edgeRising : td.edgeFalling}
          </button>

          <button
            type="button"
            onClick={() => setInitialQ((q) => (q === 1 ? 0 : 1))}
            className="min-h-[40px] md:min-h-0 px-2.5 py-1.5 rounded-2xl border-2 border-emerald-200 border-b-4 bg-emerald-50 hover:bg-emerald-100 active:border-b-2 text-xs font-mono font-bold text-emerald-800 cursor-pointer"
          >
            Q₀={initialQ}
          </button>

          <button
            type="button"
            onClick={() => applyPreset('alt')}
            className="min-h-[40px] md:min-h-0 px-2.5 py-1.5 rounded-2xl border-2 border-violet-200 border-b-4 bg-violet-50 hover:bg-violet-100 active:border-b-2 text-xs font-bold text-violet-800 cursor-pointer"
          >
            {td.alternating}
          </button>
          <button
            type="button"
            onClick={() => applyPreset('toggle')}
            className="min-h-[40px] md:min-h-0 px-2.5 py-1.5 rounded-2xl border-2 border-amber-200 border-b-4 bg-amber-50 hover:bg-amber-100 active:border-b-2 text-xs font-bold text-amber-800 cursor-pointer"
          >
            {td.toggle}
          </button>
          <button
            type="button"
            onClick={() => applyPreset('zero')}
            className="min-h-[40px] md:min-h-0 flex items-center gap-1 px-2.5 py-1.5 rounded-2xl border-2 border-rose-200 border-b-4 bg-rose-50 hover:bg-rose-100 active:border-b-2 text-xs font-bold text-rose-700 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{td.reset}</span>
          </button>
        </div>
      </div>

      {/* Responsive Split Body */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center flex-1 min-h-0">
        {/* Left Column: Clock-Cycle Toggles + Characteristic Equation */}
        <div className="md:col-span-5 lg:col-span-4 flex flex-col gap-2.5 min-w-0">
          <div className="bg-[#FFFDF8] border-2 border-amber-100 rounded-2xl p-3.5 space-y-2.5">
            {ffType !== 'JK' ? (
              <div className="space-y-1.5">
                <div className="text-[11px] font-display font-extrabold text-sky-700">
                  {td.inputCycles(ffType)}
                </div>
                <div className="grid grid-cols-4 gap-1.5">
                  {(ffType === 'D' ? dWave : tWave).map((v, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() =>
                        toggleCycle(ffType === 'D' ? setDWave : setTWave, i)
                      }
                      className={`min-h-[44px] md:min-h-0 py-1.5 rounded-xl text-xs font-mono font-extrabold border-2 border-b-[3px] active:border-b-2 transition-all cursor-pointer ${
                        v === 1
                          ? 'bg-sky-500 border-sky-600 text-white'
                          : 'bg-white border-slate-200 text-slate-600 hover:border-sky-300'
                      }`}
                    >
                      t{i + 1}:{v}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <>
                <div className="space-y-1">
                  <div className="text-[11px] font-display font-extrabold text-sky-700">
                    {td.jInput}
                  </div>
                  <div className="grid grid-cols-4 gap-1.5">
                    {jWave.map((v, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => toggleCycle(setJWave, i)}
                        className={`min-h-[40px] md:min-h-0 py-1 rounded-xl text-[11px] font-mono font-extrabold border-2 transition-all cursor-pointer ${
                          v === 1
                            ? 'bg-sky-500 border-sky-600 text-white'
                            : 'bg-white border-slate-200 text-slate-600 hover:border-sky-300'
                        }`}
                      >
                        t{i + 1}:{v}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-[11px] font-display font-extrabold text-amber-700">
                    {td.kInput}
                  </div>
                  <div className="grid grid-cols-4 gap-1.5">
                    {kWave.map((v, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => toggleCycle(setKWave, i)}
                        className={`min-h-[40px] md:min-h-0 py-1 rounded-xl text-[11px] font-mono font-extrabold border-2 transition-all cursor-pointer ${
                          v === 1
                            ? 'bg-amber-500 border-amber-600 text-white'
                            : 'bg-white border-slate-200 text-slate-600 hover:border-amber-300'
                        }`}
                      >
                        t{i + 1}:{v}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Characteristic Equation Card */}
          <div className="bg-violet-50/60 border-2 border-violet-200 rounded-2xl p-3.5 space-y-1.5">
            <div className="text-[11px] font-display font-extrabold text-violet-700">
              {td.charEqTitle(ffType)}
            </div>
            <div className="font-mono text-sm font-black text-violet-900 bg-white/85 border border-violet-200 rounded-xl px-3 py-2">
              {ffMeta.eq}
            </div>
            <p className="text-[11px] font-medium text-slate-600 leading-snug">
              {ffMeta.rule}
            </p>
          </div>

          <div className="bg-emerald-50/60 border-2 border-emerald-200 rounded-2xl px-3.5 py-2 flex items-center justify-between text-xs font-mono font-bold text-emerald-900">
            <span>{td.qSequence}</span>
            <span>{qWave.join(' ')}</span>
          </div>
        </div>

        {/* Right Column: Crisp Compact SVG Square-Wave Waveform Viewer */}
        <div className="md:col-span-7 lg:col-span-8 bg-[#FFFDF9] border-2 border-slate-200 rounded-2xl p-3 overflow-x-auto max-w-full">
          <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full min-w-[540px] h-auto">
            {Array.from({ length: CYCLES }).map((_, i) => {
              const x = startX + i * stepW;
              return (
                <g key={i}>
                  <line
                    x1={x}
                    y1={14}
                    x2={x}
                    y2={svgH - 8}
                    stroke="#E2E8F0"
                    strokeDasharray="4 4"
                    strokeWidth="1.4"
                  />
                  {/* Edge-trigger arrow on CLK transition */}
                  <polygon
                    points={
                      edgeType === 'rising'
                        ? `${x},29 ${x - 4.5},37 ${x + 4.5},37`
                        : `${x},41 ${x - 4.5},33 ${x + 4.5},33`
                    }
                    fill="#F59E0B"
                  />
                  <text
                    x={x + stepW / 2}
                    y={12}
                    textAnchor="middle"
                    fill="#64748B"
                    fontSize="10"
                    fontWeight="700"
                    fontFamily="JetBrains Mono, monospace"
                  >
                    t{i + 1}
                  </text>
                </g>
              );
            })}

            {/* CLK */}
            <text
              x={8}
              y={39}
              fill="#475569"
              fontSize="12"
              fontWeight="800"
              fontFamily="JetBrains Mono, monospace"
            >
              CLK
            </text>
            <path d={clkPath} fill="none" stroke="#64748B" strokeWidth="2.4" strokeLinecap="round" />

            {/* Input(s) */}
            {ffType !== 'JK' ? (
              <>
                <text
                  x={12}
                  y={84}
                  fill="#0284C7"
                  fontSize="12.5"
                  fontWeight="800"
                  fontFamily="JetBrains Mono, monospace"
                >
                  {ffType}
                </text>
                <path
                  d={buildSquareWavePath(
                    ffType === 'D' ? dWave : tWave,
                    66,
                    90,
                    stepW,
                    startX
                  )}
                  fill="none"
                  stroke="#0EA5E9"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                />
              </>
            ) : (
              <>
                <text
                  x={12}
                  y={82}
                  fill="#0284C7"
                  fontSize="12"
                  fontWeight="800"
                  fontFamily="JetBrains Mono, monospace"
                >
                  J
                </text>
                <path
                  d={buildSquareWavePath(jWave, 64, 88, stepW, startX)}
                  fill="none"
                  stroke="#0EA5E9"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                />
                <text
                  x={12}
                  y={124}
                  fill="#D97706"
                  fontSize="12"
                  fontWeight="800"
                  fontFamily="JetBrains Mono, monospace"
                >
                  K
                </text>
                <path
                  d={buildSquareWavePath(kWave, 106, 130, stepW, startX)}
                  fill="none"
                  stroke="#F59E0B"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                />
              </>
            )}

            {/* Q Output */}
            <text
              x={12}
              y={(qTopY + qBotY) / 2 + 4}
              fill="#059669"
              fontSize="12.5"
              fontWeight="800"
              fontFamily="JetBrains Mono, monospace"
            >
              Q
            </text>
            <path
              d={buildSquareWavePath(qWave, qTopY, qBotY, stepW, startX)}
              fill="none"
              stroke="#10B981"
              strokeWidth="3.2"
              strokeLinecap="round"
            />

            {/* Q' Complement Output */}
            <text
              x={10}
              y={(qBarTopY + qBarBotY) / 2 + 4}
              fill="#E11D48"
              fontSize="12.5"
              fontWeight="800"
              fontFamily="JetBrains Mono, monospace"
            >
              Q&apos;
            </text>
            <path
              d={buildSquareWavePath(qBarWave, qBarTopY, qBarBotY, stepW, startX)}
              fill="none"
              stroke="#FF6B8B"
              strokeWidth="2.8"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
