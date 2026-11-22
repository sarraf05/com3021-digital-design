import React, { useMemo, useState } from 'react';
import { GitCommitHorizontal, Play, RotateCcw } from 'lucide-react';
import type { WidgetConfig } from '../../types/curriculum';

interface StateMachineExplorerProps {
  config?: WidgetConfig;
  studioMode?: boolean;
}

type StateId = 'S0' | 'S1' | 'S2' | 'S3';

interface TransitionDef {
  from: StateId;
  input: 0 | 1;
  next: StateId;
  output: 0 | 1;
}

const STATE_BITS: Record<StateId, [0 | 1, 0 | 1]> = {
  S0: [0, 0],
  S1: [0, 1],
  S2: [1, 0],
  S3: [1, 1],
};

const TRANSITIONS: TransitionDef[] = [
  { from: 'S0', input: 0, next: 'S0', output: 0 },
  { from: 'S0', input: 1, next: 'S1', output: 0 },
  { from: 'S1', input: 0, next: 'S2', output: 0 },
  { from: 'S1', input: 1, next: 'S1', output: 0 },
  { from: 'S2', input: 0, next: 'S0', output: 0 },
  { from: 'S2', input: 1, next: 'S3', output: 1 },
  { from: 'S3', input: 0, next: 'S2', output: 0 },
  { from: 'S3', input: 1, next: 'S1', output: 0 },
];

const STATE_POS: Record<StateId, { x: number; y: number }> = {
  S0: { x: 92, y: 72 },
  S1: { x: 288, y: 72 },
  S2: { x: 288, y: 186 },
  S3: { x: 92, y: 186 },
};

function jkExcitation(q: 0 | 1, qNext: 0 | 1): { j: string; k: string } {
  if (q === 0 && qNext === 0) return { j: '0', k: 'X' };
  if (q === 0 && qNext === 1) return { j: '1', k: 'X' };
  if (q === 1 && qNext === 0) return { j: 'X', k: '1' };
  return { j: 'X', k: '0' };
}

export const StateMachineExplorer: React.FC<StateMachineExplorerProps> = ({
  studioMode = false,
}) => {
  const [currentState, setCurrentState] = useState<StateId>('S0');
  const [lastTransition, setLastTransition] = useState<TransitionDef>(TRANSITIONS[1]);
  const [ffMode, setFfMode] = useState<'D' | 'JK'>('D');
  const [history, setHistory] = useState<string[]>(['S0']);

  const activePreview = useMemo(
    () =>
      TRANSITIONS.find(
        (t) => t.from === currentState && t.input === lastTransition.input
      ) ?? TRANSITIONS[0],
    [currentState, lastTransition.input]
  );

  const handlePulseInput = (bit: 0 | 1) => {
    const tr =
      TRANSITIONS.find((t) => t.from === currentState && t.input === bit) ??
      TRANSITIONS[0];
    setLastTransition(tr);
    setCurrentState(tr.next);
    setHistory((prev) => [...prev.slice(-6), tr.next]);
  };

  const handleReset = () => {
    setCurrentState('S0');
    setLastTransition(TRANSITIONS[1]);
    setHistory(['S0']);
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
          <span className="w-9 h-9 rounded-2xl bg-rose-500 text-white flex items-center justify-center shrink-0 shadow-sm">
            <GitCommitHorizontal className="w-4 h-4" />
          </span>
          <div className="min-w-0">
            <h4 className="font-display font-extrabold text-sm sm:text-base text-slate-800 leading-tight">
              State Machine Explorer (101 Mealy Detector)
            </h4>
            <p className="text-[11px] font-medium text-slate-500 truncate">
              Giriş = 0 veya Giriş = 1 darbesi gönderin; aktif geçişi ve uyarma tablosunu izleyin
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 p-1 rounded-2xl bg-amber-50/80 border-2 border-amber-200/80">
            {(['D', 'JK'] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setFfMode(m)}
                className={`min-h-[36px] md:min-h-0 px-2.5 py-1 text-xs font-mono font-extrabold rounded-xl cursor-pointer transition-all ${
                  ffMode === m
                    ? 'bg-[#10B981] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {m} Excitation
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="min-h-[40px] md:min-h-0 flex items-center gap-1 px-2.5 py-1.5 rounded-2xl border-2 border-rose-200 border-b-4 bg-rose-50 hover:bg-rose-100 active:border-b-2 text-xs font-bold text-rose-700 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Sıfırla</span>
          </button>
        </div>
      </div>

      {/* Responsive Split Body */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center flex-1 min-h-0">
        {/* Left Column: Interactive SVG State Diagram + Pulse Buttons */}
        <div className="md:col-span-5 bg-[#FFFDF8] border-2 border-amber-100 rounded-2xl p-3 flex flex-col gap-2.5 min-w-0">
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handlePulseInput(0)}
              className="min-h-[44px] flex items-center justify-center gap-1.5 py-2 px-3 rounded-2xl bg-sky-500 hover:bg-sky-600 border-2 border-sky-600 border-b-4 active:border-b-2 text-white text-xs font-extrabold transition-all cursor-pointer"
            >
              <Play className="w-3.5 h-3.5" />
              <span>Giriş = 0</span>
            </button>
            <button
              type="button"
              onClick={() => handlePulseInput(1)}
              className="min-h-[44px] flex items-center justify-center gap-1.5 py-2 px-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 border-2 border-emerald-600 border-b-4 active:border-b-2 text-white text-xs font-extrabold transition-all cursor-pointer"
            >
              <Play className="w-3.5 h-3.5" />
              <span>Giriş = 1</span>
            </button>
          </div>

          <svg
            viewBox="0 0 380 250"
            className="w-full h-auto bg-white rounded-2xl border-2 border-slate-100"
          >
            <defs>
              <marker id="sm-arrow-muted" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
                <path d="M 0 1 L 7 4 L 0 7 z" fill="#94A3B8" />
              </marker>
              <marker id="sm-arrow-active" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
                <path d="M 0 1 L 7 4 L 0 7 z" fill="#10B981" />
              </marker>
            </defs>

            {[
              { from: 'S0', input: 1, d: 'M 122 66 Q 190 42 256 66', lx: 190, ly: 44, text: '1/0' },
              { from: 'S0', input: 0, d: 'M 70 54 C 32 18, 32 114, 68 88', lx: 32, ly: 74, text: '0/0' },
              { from: 'S1', input: 1, d: 'M 310 54 C 348 18, 348 114, 312 88', lx: 348, ly: 74, text: '1/0' },
              { from: 'S1', input: 0, d: 'M 296 102 Q 320 130 296 156', lx: 326, ly: 132, text: '0/0' },
              { from: 'S2', input: 1, d: 'M 258 192 Q 190 218 124 192', lx: 190, ly: 220, text: '1/1' },
              { from: 'S2', input: 0, d: 'M 264 166 L 118 88', lx: 205, ly: 118, text: '0/0' },
              { from: 'S3', input: 0, d: 'M 124 176 Q 190 156 256 176', lx: 190, ly: 158, text: '0/0' },
              { from: 'S3', input: 1, d: 'M 116 168 L 264 88', lx: 162, ly: 120, text: '1/0' },
            ].map((arc, idx) => {
              const isAct =
                lastTransition.from === arc.from && lastTransition.input === arc.input;
              return (
                <g key={idx}>
                  <path
                    d={arc.d}
                    fill="none"
                    stroke={isAct ? '#10B981' : '#CBD5E1'}
                    strokeWidth={isAct ? '3.2' : '1.8'}
                    markerEnd={isAct ? 'url(#sm-arrow-active)' : 'url(#sm-arrow-muted)'}
                  />
                  <text
                    x={arc.lx}
                    y={arc.ly}
                    textAnchor="middle"
                    fontSize="11"
                    fontFamily="JetBrains Mono, monospace"
                    fontWeight={isAct ? '800' : '600'}
                    fill={isAct ? '#059669' : '#64748B'}
                  >
                    {arc.text}
                  </text>
                </g>
              );
            })}

            {(['S0', 'S1', 'S2', 'S3'] as StateId[]).map((sid) => {
              const pos = STATE_POS[sid];
              const isCurrent = currentState === sid;
              const bits = STATE_BITS[sid].join('');
              return (
                <g
                  key={sid}
                  onClick={() => setCurrentState(sid)}
                  style={{ cursor: 'pointer' }}
                >
                  {isCurrent && (
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r={32}
                      fill="rgba(16, 185, 129, 0.16)"
                    />
                  )}
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={26}
                    fill={isCurrent ? '#D1FAE5' : '#FFFFFF'}
                    stroke={isCurrent ? '#10B981' : '#94A3B8'}
                    strokeWidth={isCurrent ? '3.4' : '2.2'}
                  />
                  <text
                    x={pos.x}
                    y={pos.y - 2}
                    textAnchor="middle"
                    fontSize="13"
                    fontWeight="800"
                    fontFamily="Nunito, sans-serif"
                    fill="#1E293B"
                  >
                    {sid}
                  </text>
                  <text
                    x={pos.x}
                    y={pos.y + 13}
                    textAnchor="middle"
                    fontSize="10"
                    fontWeight="700"
                    fontFamily="JetBrains Mono, monospace"
                    fill={isCurrent ? '#047857' : '#64748B'}
                  >
                    {bits}
                  </text>
                </g>
              );
            })}
          </svg>

          <div className="bg-emerald-50/70 border-2 border-emerald-200 rounded-xl px-3 py-2 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono">
            <span className="font-bold text-slate-700">
              Son Geçiş:{' '}
              <strong className="text-emerald-700">
                {lastTransition.from} → {lastTransition.next}
              </strong>{' '}
              (x={lastTransition.input}, z=
              <strong className={lastTransition.output === 1 ? 'text-emerald-700' : 'text-slate-600'}>
                {lastTransition.output}
              </strong>
              )
            </span>
            <span className="text-sky-700 font-bold truncate">
              İz: {history.join(' → ')}
            </span>
          </div>
        </div>

        {/* Right Column: Synchronized Compact State Table & Excitation Table */}
        <div className="md:col-span-7 flex flex-col gap-2.5 min-w-0">
          <div className="overflow-x-auto max-w-full rounded-2xl border-2 border-slate-200 bg-white">
            <table className="w-full text-xs font-mono">
              <thead>
                <tr className="border-b-2 border-slate-100 bg-slate-50 text-slate-500">
                  <th className="py-2 px-2.5 text-left font-bold">Geçiş</th>
                  <th className="py-2 px-2 text-center font-bold">Q1 Q0</th>
                  <th className="py-2 px-2 text-center font-bold">x</th>
                  <th className="py-2 px-2 text-center font-bold">Q1+ Q0+</th>
                  <th className="py-2 px-2 text-center font-bold">z</th>
                  {ffMode === 'D' ? (
                    <>
                      <th className="py-2 px-2 text-center text-sky-700 font-bold">D1</th>
                      <th className="py-2 px-2 text-center text-sky-700 font-bold">D0</th>
                    </>
                  ) : (
                    <>
                      <th className="py-2 px-2 text-center text-sky-700 font-bold">J1 K1</th>
                      <th className="py-2 px-2 text-center text-sky-700 font-bold">J0 K0</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {TRANSITIONS.map((tr, idx) => {
                  const [q1, q0] = STATE_BITS[tr.from];
                  const [n1, n0] = STATE_BITS[tr.next];
                  const isLastFired =
                    tr.from === lastTransition.from && tr.input === lastTransition.input;
                  const isCurrentRow =
                    tr.from === currentState && tr.input === activePreview.input;
                  const jk1 = jkExcitation(q1, n1);
                  const jk0 = jkExcitation(q0, n0);

                  return (
                    <tr
                      key={idx}
                      className={`border-b border-slate-100 last:border-b-0 transition-colors ${
                        isLastFired
                          ? 'bg-emerald-50 text-emerald-950 font-bold'
                          : isCurrentRow
                            ? 'bg-sky-50/70 text-sky-950'
                            : 'text-slate-700'
                      }`}
                    >
                      <td className="py-1.5 px-2.5 font-bold">
                        {tr.from} → {tr.next}
                      </td>
                      <td className="py-1.5 px-2 text-center">
                        {q1} {q0}
                      </td>
                      <td className="py-1.5 px-2 text-center">{tr.input}</td>
                      <td className="py-1.5 px-2 text-center">
                        {n1} {n0}
                      </td>
                      <td
                        className={`py-1.5 px-2 text-center font-extrabold ${
                          tr.output === 1 ? 'text-emerald-600' : 'text-slate-400'
                        }`}
                      >
                        {tr.output}
                      </td>
                      {ffMode === 'D' ? (
                        <>
                          <td className="py-1.5 px-2 text-center text-sky-700 font-bold">{n1}</td>
                          <td className="py-1.5 px-2 text-center text-sky-700 font-bold">{n0}</td>
                        </>
                      ) : (
                        <>
                          <td className="py-1.5 px-2 text-center text-sky-700 font-bold">
                            {jk1.j} {jk1.k}
                          </td>
                          <td className="py-1.5 px-2 text-center text-sky-700 font-bold">
                            {jk0.j} {jk0.k}
                          </td>
                        </>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Excitation Summary Card */}
          <div className="bg-violet-50/60 border-2 border-violet-200 rounded-2xl px-3.5 py-2.5 flex flex-wrap items-center justify-between gap-2 text-xs font-mono font-bold text-violet-900">
            <span>
              Mevcut Durum: <strong className="text-emerald-700">{currentState}</strong> (
              {STATE_BITS[currentState].join('')})
            </span>
            <span>
              {ffMode === 'D'
                ? 'D₁ = Q₁+ , D₀ = Q₀+'
                : 'JK Uyarma: 0→0 (0X), 0→1 (1X), 1→0 (X1), 1→1 (X0)'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
