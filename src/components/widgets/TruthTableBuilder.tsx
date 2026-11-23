import React, { useEffect, useMemo, useRef, useState } from 'react';
import { RotateCcw, Sparkles, Table2 } from 'lucide-react';
import type { WidgetConfig } from '../../types/curriculum';
import { useSession } from '../../context/SessionContext';
import { UI_STRINGS } from '../../i18n/translations';

interface TruthTableBuilderProps {
  config?: WidgetConfig;
  studioMode?: boolean;
}

const VAR_NAMES = ['A', 'B', 'C', 'D'];

export const TruthTableBuilder: React.FC<TruthTableBuilderProps> = ({
  config,
  studioMode = false,
}) => {
  const { session, updateToolsState } = useSession();
  const tt = UI_STRINGS[session.language].truthTable;
  const savedTruthRef = useRef(studioMode ? session.tools.truthTable : undefined);

  const [varCount, setVarCount] = useState<2 | 3 | 4>(
    savedTruthRef.current?.varCount ?? config?.variables ?? 3
  );
  const rowCount = 1 << varCount;

  const [outputs, setOutputs] = useState<(0 | 1)[]>(() => {
    if (savedTruthRef.current && Array.isArray(savedTruthRef.current.outputs) && savedTruthRef.current.outputs.length === 16) {
      return savedTruthRef.current.outputs;
    }
    const arr = new Array<0 | 1>(16).fill(0);
    const init = config?.initialMinterms ?? [1, 3, 5, 6];
    init.forEach((m) => {
      if (m >= 0 && m < 16) arr[m] = 1;
    });
    return arr;
  });
  const [selectedRow, setSelectedRow] = useState<number>(
    savedTruthRef.current?.selectedRow ?? 1
  );

  const skipFirstSyncRef = useRef(true);
  useEffect(() => {
    if (!studioMode) return;
    if (skipFirstSyncRef.current) {
      skipFirstSyncRef.current = false;
      return;
    }
    updateToolsState('truthTable', { varCount, outputs, selectedRow });
  }, [studioMode, varCount, outputs, selectedRow, updateToolsState]);

  const vars = VAR_NAMES.slice(0, varCount);

  const expressions = useMemo(() => {
    const minterms: number[] = [];
    const maxterms: number[] = [];
    const sopTerms: { idx: number; expr: string }[] = [];
    const posTerms: { idx: number; expr: string }[] = [];

    for (let i = 0; i < rowCount; i++) {
      const val = outputs[i] ?? 0;
      const bits = vars.map((_, bitIdx) => (i >> (varCount - 1 - bitIdx)) & 1);
      if (val === 1) {
        minterms.push(i);
        sopTerms.push({
          idx: i,
          expr: bits.map((b, idx) => (b === 1 ? vars[idx] : `${vars[idx]}'`)).join(''),
        });
      } else {
        maxterms.push(i);
        posTerms.push({
          idx: i,
          expr: `(${bits
            .map((b, idx) => (b === 0 ? vars[idx] : `${vars[idx]}'`))
            .join(' + ')})`,
        });
      }
    }

    return { minterms, maxterms, sopTerms, posTerms };
  }, [outputs, rowCount, varCount, vars]);

  const toggleOutput = (idx: number) => {
    setOutputs((prev) => {
      const next = [...prev];
      next[idx] = next[idx] === 1 ? 0 : 1;
      return next;
    });
    setSelectedRow(idx);
  };

  const applyPreset = (preset: 'and' | 'xor' | 'majority' | 'clear') => {
    const next = new Array<0 | 1>(16).fill(0);
    if (preset === 'and') {
      next[rowCount - 1] = 1;
    } else if (preset === 'xor') {
      for (let i = 0; i < rowCount; i++) {
        let ones = 0;
        for (let b = 0; b < varCount; b++) ones += (i >> b) & 1;
        next[i] = ones % 2 === 1 ? 1 : 0;
      }
    } else if (preset === 'majority') {
      for (let i = 0; i < rowCount; i++) {
        let ones = 0;
        for (let b = 0; b < varCount; b++) ones += (i >> b) & 1;
        next[i] = ones >= Math.ceil((varCount + 1) / 2) ? 1 : 0;
      }
    }
    setOutputs(next);
    setSelectedRow(0);
  };

  const renderTableSlice = (start: number, end: number) => (
    <div className="rounded-2xl border-2 border-slate-200 bg-white overflow-x-auto">
      <table className="w-full text-[11px] font-mono">
        <thead>
          <tr className="border-b-2 border-slate-100 text-slate-500 bg-slate-50">
            <th className="py-1.5 px-2 text-left font-bold">#</th>
            {vars.map((v) => (
              <th key={v} className="py-1.5 px-1.5 text-center font-bold">
                {v}
              </th>
            ))}
            <th className="py-1.5 px-2 text-center text-sky-700 font-extrabold">F</th>
            <th className="py-1.5 px-2 text-left font-bold">{tt.termCol}</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: end - start }).map((_, offset) => {
            const idx = start + offset;
            const bits = vars.map((_, bIdx) => (idx >> (varCount - 1 - bIdx)) & 1);
            const val = outputs[idx] ?? 0;
            const isSelected = selectedRow === idx;
            const mintermExpr = bits
              .map((b, i) => (b === 1 ? vars[i] : `${vars[i]}'`))
              .join('');
            const maxtermExpr = `(${bits
              .map((b, i) => (b === 0 ? vars[i] : `${vars[i]}'`))
              .join('+')})`;

            return (
              <tr
                key={idx}
                onClick={() => setSelectedRow(idx)}
                className={`border-b border-slate-100 last:border-b-0 cursor-pointer transition-colors ${
                  isSelected ? 'bg-amber-50/90' : 'hover:bg-slate-50'
                }`}
              >
                <td className="py-1 px-2 text-slate-400 font-semibold">{idx}</td>
                {bits.map((b, bIdx) => (
                  <td
                    key={bIdx}
                    className={`py-1 px-1.5 text-center font-bold ${
                      b === 1 ? 'text-slate-800' : 'text-slate-400'
                    }`}
                  >
                    {b}
                  </td>
                ))}
                <td className="py-1 px-2 text-center">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleOutput(idx);
                    }}
                    className={`min-w-[36px] min-h-[34px] md:min-w-0 md:min-h-0 md:w-7 md:h-6 rounded-lg font-extrabold border-2 border-b-[3px] active:border-b-2 transition-all cursor-pointer ${
                      val === 1
                        ? 'bg-emerald-500 border-emerald-600 text-white'
                        : 'bg-slate-100 border-slate-300 text-slate-600'
                    }`}
                  >
                    {val}
                  </button>
                </td>
                <td className="py-1 px-2 text-left truncate max-w-[115px]">
                  {val === 1 ? (
                    <span className="text-emerald-700 font-bold">
                      m<sub>{idx}</sub>:{mintermExpr}
                    </span>
                  ) : (
                    <span className="text-slate-500">
                      M<sub>{idx}</sub>:{maxtermExpr}
                    </span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const safeRow = Math.min(selectedRow, rowCount - 1);
  const selectedBits = vars.map((_, bIdx) => (safeRow >> (varCount - 1 - bIdx)) & 1);
  const selectedVal = outputs[safeRow] ?? 0;

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
            <Table2 className="w-4 h-4" />
          </span>
          <div className="min-w-0">
            <h4 className="font-display font-extrabold text-sm sm:text-base text-slate-800 leading-tight">
              {tt.title}
            </h4>
            <p className="text-[11px] font-medium text-slate-500 truncate">
              {tt.subtitle}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <div className="flex items-center gap-1 p-1 rounded-2xl bg-amber-50/80 border-2 border-amber-200/80">
            {([2, 3, 4] as const).map((cnt) => (
              <button
                key={cnt}
                type="button"
                onClick={() => {
                  setVarCount(cnt);
                  setSelectedRow(0);
                }}
                className={`min-h-[36px] md:min-h-0 px-2.5 py-1 text-xs font-mono font-extrabold rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                  varCount === cnt
                    ? 'bg-[#10B981] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cnt} {tt.variablesSuffix}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => applyPreset('and')}
            className="min-h-[40px] md:min-h-0 px-2.5 py-1.5 rounded-2xl border-2 border-sky-200 border-b-4 bg-sky-50 hover:bg-sky-100 active:border-b-2 text-xs font-bold text-sky-800 cursor-pointer whitespace-nowrap"
          >
            AND
          </button>
          <button
            type="button"
            onClick={() => applyPreset('xor')}
            className="min-h-[40px] md:min-h-0 px-2.5 py-1.5 rounded-2xl border-2 border-violet-200 border-b-4 bg-violet-50 hover:bg-violet-100 active:border-b-2 text-xs font-bold text-violet-800 cursor-pointer whitespace-nowrap"
          >
            XOR
          </button>
          <button
            type="button"
            onClick={() => applyPreset('majority')}
            className="min-h-[40px] md:min-h-0 px-2.5 py-1.5 rounded-2xl border-2 border-emerald-200 border-b-4 bg-emerald-50 hover:bg-emerald-100 active:border-b-2 text-xs font-bold text-emerald-800 cursor-pointer whitespace-nowrap"
          >
            {tt.majority}
          </button>
          <button
            type="button"
            onClick={() => applyPreset('clear')}
            className="min-h-[40px] md:min-h-0 flex items-center gap-1 px-2.5 py-1.5 rounded-2xl border-2 border-rose-200 border-b-4 bg-rose-50 hover:bg-rose-100 active:border-b-2 text-xs font-bold text-rose-700 cursor-pointer whitespace-nowrap"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{tt.clear}</span>
          </button>
        </div>
      </div>

      {/* Responsive Split Body */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center flex-1 min-h-0">
        {/* Left: Compact Clickable Truth Table */}
        <div className="md:col-span-6 bg-[#FFFDF8] border-2 border-amber-100 rounded-2xl p-2.5 sm:p-3 min-w-0">
          {varCount === 4 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {renderTableSlice(0, 8)}
              {renderTableSlice(8, 16)}
            </div>
          ) : (
            renderTableSlice(0, rowCount)
          )}
        </div>

        {/* Right: Stacked Pastel Result Cards */}
        <div className="md:col-span-6 flex flex-col gap-2.5 min-w-0">
          {/* Canonical SOP Card */}
          <div className="bg-emerald-50/60 border-2 border-emerald-200 rounded-2xl p-3.5 space-y-1.5">
            <div className="flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-display font-extrabold tracking-wide text-emerald-700">
                <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                {tt.canonicalSop}
              </span>
              <span className="font-mono text-[11px] font-bold text-emerald-800">
                Σm({expressions.minterms.join(', ') || '∅'})
              </span>
            </div>
            <div className="font-mono text-xs sm:text-sm font-extrabold text-emerald-950 bg-white/85 border border-emerald-200 rounded-xl p-2.5 leading-relaxed max-h-[96px] overflow-y-auto pastel-scrollbar">
              <span className="text-slate-500 mr-1.5">F =</span>
              {expressions.sopTerms.length === 0 ? (
                <span className="text-slate-400">0</span>
              ) : (
                expressions.sopTerms.map((t, i) => (
                  <React.Fragment key={t.idx}>
                    {i > 0 && <span className="text-slate-400 mx-1">+</span>}
                    <span
                      className={`px-1 rounded transition-colors ${
                        t.idx === safeRow
                          ? 'bg-emerald-500 text-white'
                          : 'text-emerald-800'
                      }`}
                    >
                      {t.expr}
                    </span>
                  </React.Fragment>
                ))
              )}
            </div>
          </div>

          {/* Canonical POS Card */}
          <div className="bg-sky-50/60 border-2 border-sky-200 rounded-2xl p-3.5 space-y-1.5">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] font-display font-extrabold tracking-wide text-sky-700">
                {tt.canonicalPos}
              </span>
              <span className="font-mono text-[11px] font-bold text-sky-800">
                ΠM({expressions.maxterms.join(', ') || '∅'})
              </span>
            </div>
            <div className="font-mono text-xs font-extrabold text-sky-950 bg-white/85 border border-sky-200 rounded-xl p-2.5 leading-relaxed max-h-[96px] overflow-y-auto pastel-scrollbar">
              <span className="text-slate-500 mr-1.5">F =</span>
              {expressions.posTerms.length === 0 ? (
                <span className="text-slate-400">1</span>
              ) : (
                expressions.posTerms.map((t, i) => (
                  <React.Fragment key={t.idx}>
                    {i > 0 && <span className="text-slate-400 mx-0.5">·</span>}
                    <span
                      className={`px-1 rounded transition-colors ${
                        t.idx === safeRow
                          ? 'bg-sky-500 text-white'
                          : 'text-sky-800'
                      }`}
                    >
                      {t.expr}
                    </span>
                  </React.Fragment>
                ))
              )}
            </div>
          </div>

          {/* Active Row Inspector Card */}
          <div className="bg-amber-50/60 border-2 border-amber-200 rounded-2xl px-3.5 py-2.5 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="font-mono font-bold text-amber-950">
              {tt.selectedRowPrefix} #{safeRow}:{' '}
              <span className="text-slate-700">
                {vars.map((v, i) => `${v}=${selectedBits[i]}`).join(', ')}
              </span>{' '}
              →{' '}
              <span className={selectedVal === 1 ? 'text-emerald-700' : 'text-sky-700'}>
                {selectedVal === 1
                  ? `m${safeRow} (${tt.mintermActive})`
                  : `M${safeRow} (${tt.maxtermActive})`}
              </span>
            </div>
            <button
              type="button"
              onClick={() => toggleOutput(safeRow)}
              className="min-h-[40px] md:min-h-0 px-3 py-1 rounded-xl border-2 border-amber-300 bg-white hover:bg-amber-100 text-amber-900 font-bold cursor-pointer"
            >
              {tt.flipOutput} ({selectedVal} → {selectedVal === 1 ? 0 : 1})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TruthTableBuilder;
