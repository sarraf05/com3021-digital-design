import React, { useMemo, useState } from 'react';
import { AlertTriangle, Check, Copy, Sparkles, Table2, X } from 'lucide-react';
import type { Language } from '../../types/curriculum';
import type { LogicValue } from '../../types/simulator';
import type {
  OutputSignalMeta,
  SequentialActionKind,
  TruthTableAnalysis,
  TruthTableMode,
} from '../../engine/truthTableEngine';
import { UI_STRINGS } from '../../i18n/translations';

interface TruthTableModalProps {
  open: boolean;
  lang: Language;
  mode: TruthTableMode;
  analysis: TruthTableAnalysis;
  onChangeMode: (mode: TruthTableMode) => void;
  onClose: () => void;
  onApplyInputs: (assignments: { nodeId: string; value: LogicValue }[]) => void;
  onApplySequentialRow: (
    inputAssignments: { nodeId: string; value: LogicValue }[],
    stateAssignments: { nodeId: string; value: LogicValue; compNodeId?: string }[]
  ) => void;
}

const SEVEN_SEG_MAP: Record<
  number,
  [boolean, boolean, boolean, boolean, boolean, boolean, boolean]
> = {
  0: [true, true, true, true, true, true, false],
  1: [false, true, true, false, false, false, false],
  2: [true, true, false, true, true, false, true],
  3: [true, true, true, true, false, false, true],
  4: [false, true, true, false, false, true, true],
  5: [true, false, true, true, false, true, true],
  6: [true, false, true, true, true, true, true],
  7: [true, true, true, false, false, false, false],
  8: [true, true, true, true, true, true, true],
  9: [true, true, true, true, false, true, true],
  10: [true, true, true, false, true, true, true],
  11: [false, false, true, true, true, true, true],
  12: [true, false, false, true, true, true, false],
  13: [false, true, true, true, true, false, true],
  14: [true, false, false, true, true, true, true],
  15: [true, false, false, false, true, true, true],
};

const MiniSevenSeg: React.FC<{ value: number }> = ({ value }) => {
  const safeVal = Math.max(0, Math.min(15, value));
  const segs = SEVEN_SEG_MAP[safeVal] ?? SEVEN_SEG_MAP[0];
  const hexChar = safeVal.toString(16).toUpperCase();

  return (
    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-slate-900 border border-slate-700 text-rose-400 font-mono font-extrabold text-[11px] shadow-xs">
      <svg
        width="13"
        height="19"
        viewBox="0 0 18 28"
        aria-hidden="true"
        className="shrink-0"
      >
        {/* a */}
        <line x1="4" y1="3" x2="14" y2="3" stroke={segs[0] ? '#FB7185' : '#334155'} strokeWidth="2.4" strokeLinecap="round" />
        {/* b */}
        <line x1="15" y1="4.5" x2="15" y2="12.5" stroke={segs[1] ? '#FB7185' : '#334155'} strokeWidth="2.4" strokeLinecap="round" />
        {/* c */}
        <line x1="15" y1="15.5" x2="15" y2="23.5" stroke={segs[2] ? '#FB7185' : '#334155'} strokeWidth="2.4" strokeLinecap="round" />
        {/* d */}
        <line x1="4" y1="25" x2="14" y2="25" stroke={segs[3] ? '#FB7185' : '#334155'} strokeWidth="2.4" strokeLinecap="round" />
        {/* e */}
        <line x1="3" y1="15.5" x2="3" y2="23.5" stroke={segs[4] ? '#FB7185' : '#334155'} strokeWidth="2.4" strokeLinecap="round" />
        {/* f */}
        <line x1="3" y1="4.5" x2="3" y2="12.5" stroke={segs[5] ? '#FB7185' : '#334155'} strokeWidth="2.4" strokeLinecap="round" />
        {/* g */}
        <line x1="4.5" y1="14" x2="13.5" y2="14" stroke={segs[6] ? '#FB7185' : '#334155'} strokeWidth="2.4" strokeLinecap="round" />
      </svg>
      <span>{hexChar}</span>
    </span>
  );
};

const ACTION_BADGE_STYLES: Record<SequentialActionKind, string> = {
  hold: 'bg-slate-100 border-slate-200 text-slate-700',
  set: 'bg-emerald-100 border-emerald-200 text-emerald-800',
  reset: 'bg-amber-100 border-amber-200 text-amber-900',
  toggle: 'bg-violet-100 border-violet-200 text-violet-800',
  step: 'bg-indigo-100 border-indigo-200 text-indigo-800',
  forbidden: 'bg-rose-100 border-rose-300 text-rose-800',
  unstable: 'bg-rose-100 border-rose-300 text-rose-800',
};

const MODE_ORDER: TruthTableMode[] = ['simple', 'canonical', 'compressed', 'sequential'];

export const TruthTableModal: React.FC<TruthTableModalProps> = ({
  open,
  lang,
  mode,
  analysis,
  onChangeMode,
  onClose,
  onApplyInputs,
  onApplySequentialRow,
}) => {
  const [copied, setCopied] = useState(false);
  const copy = UI_STRINGS[lang].simulator.truthTableModal;

  const hasAnyActiveLow = useMemo(
    () => analysis.outputSignals.some((o) => o.isActiveLow),
    [analysis.outputSignals]
  );

  const hasAnySevenSeg = useMemo(
    () => analysis.outputSignals.some((o) => o.kind === 'SEVEN_SEG'),
    [analysis.outputSignals]
  );

  const renderOutputCell = (
    sig: OutputSignalMeta,
    val: number,
    highlightActiveLow: boolean
  ) => {
    if (sig.kind === 'SEVEN_SEG') {
      return <MiniSevenSeg value={val} />;
    }

    if (highlightActiveLow && sig.isActiveLow) {
      return val === 0 ? (
        <span className="inline-flex items-center justify-center min-w-[24px] px-1.5 py-0.5 rounded-md bg-rose-500 text-white font-extrabold shadow-xs">
          0
        </span>
      ) : (
        <span className="text-slate-400 font-semibold">1</span>
      );
    }

    return val === 1 ? (
      <span className="inline-flex items-center justify-center min-w-[24px] px-1.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-extrabold">
        1
      </span>
    ) : (
      <span className="text-slate-400 font-semibold">0</span>
    );
  };

  const buildCopyText = () => {
    const lines: string[] = [];

    if (mode === 'sequential') {
      if (analysis.sequentialRows.length === 0) return '';
      const headers = [
        ...analysis.seqInputSignals.map((s) => s.label),
        ...analysis.stateSignals.map((s) => `${s.label}(t)`),
        ...analysis.stateSignals.map((s) => `${s.label}(t+1)`),
        ...analysis.outputSignals.map((o) => o.label),
        copy.groups.action,
      ];
      lines.push(headers.join('\t'));

      for (const row of analysis.sequentialRows) {
        const outCols = analysis.outputSignals.map((o, idx) =>
          o.kind === 'SEVEN_SEG'
            ? row.outputValues[idx].toString(16).toUpperCase()
            : String(row.outputValues[idx])
        );
        lines.push(
          [
            ...row.inputBits.map(String),
            ...row.presentStateBits.map(String),
            ...row.nextStateBits.map(String),
            ...outCols,
            lang === 'en' ? row.actionDetailEn : row.actionDetailTr,
          ].join('\t')
        );
      }
      return lines.join('\n');
    }

    if (mode === 'compressed') {
      if (analysis.compressedRows.length === 0) return '';
      const headers = [
        ...analysis.inputSignals.map((s) => s.label),
        ...analysis.outputSignals.map((o) =>
          o.isActiveLow ? `${o.label} (Active-Low)` : o.label
        ),
      ];
      lines.push(headers.join('\t'));
      for (const row of analysis.compressedRows) {
        const outCols = analysis.outputSignals.map((o, idx) =>
          o.kind === 'SEVEN_SEG'
            ? row.outputValues[idx].toString(16).toUpperCase()
            : String(row.outputValues[idx])
        );
        lines.push([...row.pattern, ...outCols].join('\t'));
      }
      return lines.join('\n');
    }

    // Simple or Canonical
    if (analysis.combinationalRows.length === 0) return '';
    const headers = [
      ...(mode === 'canonical' ? ['m'] : []),
      ...analysis.inputSignals.map((s) => s.label),
      ...analysis.outputSignals.map((o) => o.label),
    ];
    lines.push(headers.join('\t'));

    for (const row of analysis.combinationalRows) {
      const outCols = analysis.outputSignals.map((o, idx) =>
        o.kind === 'SEVEN_SEG'
          ? row.outputValues[idx].toString(16).toUpperCase()
          : String(row.outputValues[idx])
      );
      lines.push(
        [
          ...(mode === 'canonical' ? [`m${row.index}`] : []),
          ...row.inputBits.map(String),
          ...outCols,
        ].join('\t')
      );
    }

    if (mode === 'canonical' && analysis.formulas.length > 0) {
      lines.push('');
      for (const f of analysis.formulas) {
        lines.push(
          `${f.label} SOP: Σm(${f.minterms.join(', ') || '∅'}) = ${f.canonicalSop}`
        );
        lines.push(
          `${f.label} POS: ΠM(${f.maxterms.join(', ') || '∅'}) = ${f.canonicalPos}`
        );
      }
    }

    return lines.join('\n');
  };

  const handleCopyTable = async () => {
    const text = buildCopyText();
    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      try {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2000);
      } catch {
        // Ignore copy failure cleanly
      }
    }
  };

  if (!open) return null;

  const isSequentialMode = mode === 'sequential';
  const showCombEmpty =
    !isSequentialMode &&
    (analysis.outputSignals.length === 0 || analysis.combinationalRows.length === 0);
  const showSeqEmpty = isSequentialMode && analysis.sequentialRows.length === 0;

  const canCopy = isSequentialMode
    ? analysis.sequentialRows.length > 0
    : analysis.combinationalRows.length > 0 && analysis.outputSignals.length > 0;

  return (
    <div
      onPointerDown={(e) => e.stopPropagation()}
      onClick={onClose}
      className="fixed inset-0 z-50 bg-slate-900/30 backdrop-blur-[2px] flex items-center justify-center p-2.5 sm:p-4"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="truth-table-modal-title"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-3xl max-h-[88dvh] rounded-3xl border-2 border-sky-200 border-b-4 bg-white shadow-2xl flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="shrink-0 px-4 py-3 border-b-2 border-slate-100 bg-gradient-to-r from-sky-50 via-white to-emerald-50/80 flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="w-9 h-9 rounded-2xl bg-sky-500 text-white flex items-center justify-center shadow-xs shrink-0">
              <Table2 className="w-4 h-4" />
            </span>
            <div className="min-w-0">
              <h3
                id="truth-table-modal-title"
                className="font-display font-extrabold text-sm sm:text-base text-slate-800 leading-tight"
              >
                {copy.title}
              </h3>
              <p className="text-[11px] font-medium text-slate-500 mt-0.5 leading-snug">
                {copy.subtitle}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label={copy.closeBtn}
            className="w-8 h-8 rounded-xl border-2 border-slate-200 bg-white hover:bg-rose-50 hover:border-rose-200 text-slate-500 hover:text-rose-600 flex items-center justify-center shrink-0 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Segmented Pill Mode Tabs (Responsive Wrap) */}
        <div className="shrink-0 px-4 py-2.5 border-b border-slate-100 bg-[#FFFDF8]">
          <div className="flex flex-wrap gap-1.5" role="tablist" aria-label={copy.title}>
            {MODE_ORDER.map((tabId) => {
              const active = mode === tabId;
              const isRecommended = analysis.recommendedMode === tabId;
              return (
                <button
                  key={tabId}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => onChangeMode(tabId)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-2xl border-2 text-xs font-display font-extrabold transition-all cursor-pointer min-h-[34px] ${
                    active
                      ? 'bg-sky-500 border-sky-600 text-white shadow-xs'
                      : 'bg-white border-slate-200 hover:border-sky-300 text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span>{copy.tabs[tabId]}</span>
                  {isRecommended && (
                    <span
                      className={`text-[9.5px] font-bold px-1.5 py-0.5 rounded-lg ${
                        active
                          ? 'bg-white/25 text-white'
                          : 'bg-emerald-100 text-emerald-700'
                      }`}
                    >
                      {copy.autoBadge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Scrollable Modal Body */}
        <div className="flex-1 min-h-0 overflow-y-auto overscroll-y-contain pastel-scrollbar p-4 space-y-3.5">
          {/* Performance Guard Banner (>6 Variables) */}
          {!isSequentialMode && analysis.combinationalTruncated && (
            <div className="rounded-2xl border-2 border-amber-200 bg-amber-50 px-3.5 py-2.5 flex items-start gap-2.5 text-xs text-amber-900">
              <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <div className="font-extrabold">{copy.guardTitle}</div>
                <div className="font-medium mt-0.5">
                  {copy.guardCombDesc(
                    analysis.extraHeldInputs.map((s) => s.label).join(', ')
                  )}
                </div>
              </div>
            </div>
          )}

          {isSequentialMode && analysis.sequentialTruncated && (
            <div className="rounded-2xl border-2 border-amber-200 bg-amber-50 px-3.5 py-2.5 flex items-start gap-2.5 text-xs text-amber-900">
              <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <div className="font-extrabold">{copy.guardTitle}</div>
                <div className="font-medium mt-0.5">
                  {copy.guardSeqDesc(
                    [
                      ...analysis.seqExtraHeldInputs.map((s) => s.label),
                      ...analysis.extraHeldStates.map((s) => s.label),
                    ].join(', ')
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Empty States */}
          {showCombEmpty && (
            <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/70 p-6 text-center space-y-1.5">
              <div className="font-display font-extrabold text-sm text-slate-700">
                {copy.emptyCombTitle}
              </div>
              <p className="text-xs font-medium text-slate-500 max-w-md mx-auto leading-relaxed">
                {copy.emptyCombDesc}
              </p>
            </div>
          )}

          {showSeqEmpty && (
            <div className="rounded-2xl border-2 border-dashed border-amber-200 bg-amber-50/50 p-6 text-center space-y-1.5">
              <div className="font-display font-extrabold text-sm text-amber-900">
                {copy.emptySeqTitle}
              </div>
              <p className="text-xs font-medium text-amber-800/80 max-w-md mx-auto leading-relaxed">
                {copy.emptySeqDesc}
              </p>
            </div>
          )}

          {/* MODE 1 & MODE 2: Sade & Minterm/Maxterm */}
          {(mode === 'simple' || mode === 'canonical') && !showCombEmpty && (
            <div className="space-y-3.5">
              <div className="rounded-2xl border-2 border-slate-200 bg-white overflow-x-auto">
                <table className="w-full text-xs font-mono border-collapse">
                  <thead>
                    <tr className="bg-slate-50/90 border-b border-slate-200 text-[10px] font-display font-extrabold tracking-wider text-slate-500">
                      {mode === 'canonical' && (
                        <th className="py-1.5 px-2.5 text-center border-r border-slate-200 bg-violet-50/60 text-violet-700">
                          {copy.mintermHeader}
                        </th>
                      )}
                      {analysis.inputSignals.length > 0 && (
                        <th
                          colSpan={analysis.inputSignals.length}
                          className="py-1.5 px-3 text-center text-sky-700"
                        >
                          {copy.groups.inputs}
                        </th>
                      )}
                      <th
                        colSpan={analysis.outputSignals.length}
                        className={`py-1.5 px-3 text-center text-emerald-700 ${
                          analysis.inputSignals.length > 0
                            ? 'border-l-2 border-slate-300'
                            : ''
                        }`}
                      >
                        {copy.groups.outputs}
                      </th>
                    </tr>
                    <tr className="bg-slate-50 border-b-2 border-slate-200 text-slate-700">
                      {mode === 'canonical' && (
                        <th className="py-2 px-2.5 text-center border-r border-slate-200 bg-violet-50/40 text-violet-700 font-bold">
                          #
                        </th>
                      )}
                      {analysis.inputSignals.map((inp) => (
                        <th key={inp.nodeId} className="py-2 px-2.5 text-center font-extrabold">
                          {inp.label}
                        </th>
                      ))}
                      {analysis.outputSignals.map((out, oIdx) => (
                        <th
                          key={out.nodeId}
                          className={`py-2 px-2.5 text-center font-extrabold text-emerald-800 ${
                            oIdx === 0 && analysis.inputSignals.length > 0
                              ? 'border-l-2 border-slate-300'
                              : ''
                          }`}
                        >
                          {out.label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {analysis.combinationalRows.map((row) => {
                      const active = row.matchesCanvas;
                      return (
                        <tr
                          key={row.index}
                          onClick={() =>
                            onApplyInputs(
                              analysis.inputSignals.map((sig, i) => ({
                                nodeId: sig.nodeId,
                                value: row.inputBits[i],
                              }))
                            )
                          }
                          title={copy.subtitle}
                          className={`border-b border-slate-100 last:border-b-0 cursor-pointer transition-colors ${
                            active
                              ? 'bg-sky-50/95 ring-1 ring-inset ring-sky-300'
                              : 'hover:bg-slate-50'
                          }`}
                        >
                          {mode === 'canonical' && (
                            <td className="py-1.5 px-2.5 text-center border-r border-slate-100 font-bold text-violet-700 bg-violet-50/20">
                              m<sub>{row.index}</sub>
                            </td>
                          )}
                          {row.inputBits.map((bit, iIdx) => (
                            <td
                              key={iIdx}
                              className={`py-1.5 px-2.5 text-center font-bold ${
                                bit === 1 ? 'text-slate-900' : 'text-slate-400'
                              }`}
                            >
                              {bit}
                            </td>
                          ))}
                          {row.outputValues.map((val, oIdx) => (
                            <td
                              key={oIdx}
                              className={`py-1.5 px-2.5 text-center ${
                                oIdx === 0 && analysis.inputSignals.length > 0
                                  ? 'border-l-2 border-slate-200'
                                  : ''
                              }`}
                            >
                              {renderOutputCell(
                                analysis.outputSignals[oIdx],
                                val,
                                false
                              )}
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Canonical SOP & POS Formula Cards (Only in Mode 2) */}
              {mode === 'canonical' && (
                <div className="space-y-2.5">
                  <div className="flex items-center gap-1.5 text-xs font-display font-extrabold text-slate-700 px-0.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                    <span>{copy.formulasTitle}</span>
                  </div>

                  {analysis.formulas.length === 0 ? (
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs font-medium text-slate-500">
                      {copy.noLedFormulaNote}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-2.5">
                      {analysis.formulas.map((f) => (
                        <div
                          key={f.nodeId}
                          className="rounded-2xl border-2 border-slate-200 bg-[#FFFDF8] p-3 space-y-2"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-mono text-xs font-extrabold text-slate-800">
                              {f.label}
                            </span>
                            {f.isActiveLow && (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-rose-100 text-rose-700 border border-rose-200">
                                {copy.activeLowTag}
                              </span>
                            )}
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 px-2.5 py-2 space-y-1">
                              <div className="flex items-center justify-between text-[10.5px] font-bold text-emerald-800">
                                <span>{copy.sopLabel}</span>
                                <span className="font-mono">
                                  Σm({f.minterms.join(', ') || '∅'})
                                </span>
                              </div>
                              <div className="font-mono text-xs font-extrabold text-emerald-950 break-words leading-relaxed">
                                {f.label} = {f.canonicalSop}
                              </div>
                            </div>

                            <div className="rounded-xl border border-sky-200 bg-sky-50/70 px-2.5 py-2 space-y-1">
                              <div className="flex items-center justify-between text-[10.5px] font-bold text-sky-800">
                                <span>{copy.posLabel}</span>
                                <span className="font-mono">
                                  ΠM({f.maxterms.join(', ') || '∅'})
                                </span>
                              </div>
                              <div className="font-mono text-xs font-extrabold text-sky-950 break-words leading-relaxed">
                                {f.label} = {f.canonicalPos}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* MODE 3: Compressed (Datasheet / X) */}
          {mode === 'compressed' && !showCombEmpty && (
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-bold text-slate-600 px-0.5">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-amber-50 border border-amber-200 text-amber-900">
                  {copy.compressionSummary(
                    analysis.combinationalRows.length,
                    analysis.compressedRows.length
                  )}
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1 text-amber-800">
                    <span className="px-1.5 py-0.5 rounded bg-amber-100 font-mono font-extrabold">
                      X
                    </span>
                    <span>{copy.dontCareLegend}</span>
                  </span>
                  {hasAnyActiveLow && (
                    <span className="inline-flex items-center gap-1 text-rose-700">
                      <span className="px-1.5 py-0.5 rounded bg-rose-500 text-white font-mono font-extrabold">
                        0
                      </span>
                      <span>{copy.activeLowLegend}</span>
                    </span>
                  )}
                </div>
              </div>

              <div className="rounded-2xl border-2 border-slate-200 bg-white overflow-x-auto">
                <table className="w-full text-xs font-mono border-collapse">
                  <thead>
                    <tr className="bg-slate-50/90 border-b border-slate-200 text-[10px] font-display font-extrabold tracking-wider text-slate-500">
                      {analysis.inputSignals.length > 0 && (
                        <th
                          colSpan={analysis.inputSignals.length}
                          className="py-1.5 px-3 text-center text-sky-700"
                        >
                          {copy.groups.inputs}
                        </th>
                      )}
                      <th
                        colSpan={analysis.outputSignals.length}
                        className={`py-1.5 px-3 text-center text-emerald-700 ${
                          analysis.inputSignals.length > 0
                            ? 'border-l-2 border-slate-300'
                            : ''
                        }`}
                      >
                        {copy.groups.outputs}
                      </th>
                    </tr>
                    <tr className="bg-slate-50 border-b-2 border-slate-200 text-slate-700">
                      {analysis.inputSignals.map((inp) => (
                        <th key={inp.nodeId} className="py-2 px-2.5 text-center font-extrabold">
                          {inp.label}
                        </th>
                      ))}
                      {analysis.outputSignals.map((out, oIdx) => (
                        <th
                          key={out.nodeId}
                          className={`py-2 px-2.5 text-center font-extrabold ${
                            out.isActiveLow ? 'text-rose-700 bg-rose-50/40' : 'text-emerald-800'
                          } ${
                            oIdx === 0 && analysis.inputSignals.length > 0
                              ? 'border-l-2 border-slate-300'
                              : ''
                          }`}
                        >
                          <div className="inline-flex flex-col items-center gap-0.5">
                            <span>{out.label}</span>
                            {out.isActiveLow && (
                              <span className="text-[9px] font-display font-bold px-1.5 py-0.2 rounded bg-rose-100 text-rose-700 border border-rose-200">
                                {copy.activeLowTag}
                              </span>
                            )}
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {analysis.compressedRows.map((row, idx) => (
                      <tr
                        key={`${row.pattern.join('')}_${idx}`}
                        onClick={() => {
                          const assignments: { nodeId: string; value: LogicValue }[] = [];
                          row.pattern.forEach((bitChar, i) => {
                            if (bitChar === '0' || bitChar === '1') {
                              assignments.push({
                                nodeId: analysis.inputSignals[i].nodeId,
                                value: bitChar === '1' ? 1 : 0,
                              });
                            }
                          });
                          if (assignments.length > 0) {
                            onApplyInputs(assignments);
                          }
                        }}
                        title={copy.subtitle}
                        className={`border-b border-slate-100 last:border-b-0 cursor-pointer transition-colors ${
                          row.matchesCanvas
                            ? 'bg-sky-50/95 ring-1 ring-inset ring-sky-300'
                            : 'hover:bg-slate-50'
                        }`}
                      >
                        {row.pattern.map((cell, cIdx) => (
                          <td key={cIdx} className="py-1.5 px-2.5 text-center">
                            {cell === 'X' ? (
                              <span className="inline-flex items-center justify-center min-w-[24px] px-1.5 py-0.5 rounded-md bg-amber-100 text-amber-800 font-extrabold">
                                X
                              </span>
                            ) : (
                              <span
                                className={`font-bold ${
                                  cell === '1' ? 'text-slate-900' : 'text-slate-400'
                                }`}
                              >
                                {cell}
                              </span>
                            )}
                          </td>
                        ))}
                        {row.outputValues.map((val, oIdx) => {
                          const outMeta = analysis.outputSignals[oIdx];
                          return (
                            <td
                              key={oIdx}
                              className={`py-1.5 px-2.5 text-center ${
                                outMeta.isActiveLow ? 'bg-rose-50/20' : ''
                              } ${
                                oIdx === 0 && analysis.inputSignals.length > 0
                                  ? 'border-l-2 border-slate-200'
                                  : ''
                              }`}
                            >
                              {renderOutputCell(outMeta, val, true)}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* MODE 4: Sequential State-Transition Table */}
          {mode === 'sequential' && !showSeqEmpty && (
            <div className="space-y-2.5">
              <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-bold text-slate-600 px-0.5">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-amber-50 border border-amber-200 text-amber-900">
                  {analysis.hasFeedbackLoop &&
                  !analysis.stateSignals.some((s) => s.nodeType !== 'LATCH')
                    ? copy.latchFeedbackNote
                    : copy.clkEdgeNote}
                </span>
                {hasAnySevenSeg && (
                  <span className="text-slate-500">{copy.sevenSegNote}</span>
                )}
              </div>

              <div className="rounded-2xl border-2 border-slate-200 bg-white overflow-x-auto">
                <table className="w-full text-xs font-mono border-collapse">
                  <thead>
                    <tr className="bg-slate-50/90 border-b border-slate-200 text-[10px] font-display font-extrabold tracking-wider text-slate-500">
                      {analysis.seqInputSignals.length > 0 && (
                        <th
                          colSpan={analysis.seqInputSignals.length}
                          className="py-1.5 px-2.5 text-center text-sky-700"
                        >
                          {copy.groups.inputs}
                        </th>
                      )}
                      <th
                        colSpan={analysis.stateSignals.length}
                        className={`py-1.5 px-2.5 text-center text-amber-700 ${
                          analysis.seqInputSignals.length > 0
                            ? 'border-l border-slate-200'
                            : ''
                        }`}
                      >
                        {copy.groups.presentState}
                      </th>
                      <th
                        colSpan={analysis.stateSignals.length}
                        className="py-1.5 px-2.5 text-center text-violet-700 border-l-2 border-slate-300"
                      >
                        {copy.groups.nextState}
                      </th>
                      {analysis.outputSignals.length > 0 && (
                        <th
                          colSpan={analysis.outputSignals.length}
                          className="py-1.5 px-2.5 text-center text-emerald-700 border-l border-slate-200"
                        >
                          {copy.groups.outputs}
                        </th>
                      )}
                      <th className="py-1.5 px-3 text-center text-slate-600 border-l border-slate-200">
                        {copy.groups.action}
                      </th>
                    </tr>
                    <tr className="bg-slate-50 border-b-2 border-slate-200 text-slate-700">
                      {analysis.seqInputSignals.map((inp) => (
                        <th key={inp.nodeId} className="py-2 px-2.5 text-center font-extrabold">
                          {inp.label}
                        </th>
                      ))}
                      {analysis.stateSignals.map((st, sIdx) => (
                        <th
                          key={`ps_${st.nodeId}`}
                          className={`py-2 px-2.5 text-center font-extrabold text-amber-800 ${
                            sIdx === 0 && analysis.seqInputSignals.length > 0
                              ? 'border-l border-slate-200'
                              : ''
                          }`}
                        >
                          {st.label}(t)
                        </th>
                      ))}
                      {analysis.stateSignals.map((st, sIdx) => (
                        <th
                          key={`ns_${st.nodeId}`}
                          className={`py-2 px-2.5 text-center font-extrabold text-violet-800 ${
                            sIdx === 0 ? 'border-l-2 border-slate-300' : ''
                          }`}
                        >
                          {st.label}(t+1)
                        </th>
                      ))}
                      {analysis.outputSignals.map((out, oIdx) => (
                        <th
                          key={`seq_out_${out.nodeId}`}
                          className={`py-2 px-2.5 text-center font-extrabold text-emerald-800 ${
                            oIdx === 0 ? 'border-l border-slate-200' : ''
                          }`}
                        >
                          {out.label}
                        </th>
                      ))}
                      <th className="py-2 px-3 text-center font-extrabold text-slate-600 border-l border-slate-200">
                        {copy.groups.action}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {analysis.sequentialRows.map((row) => (
                      <tr
                        key={row.index}
                        onClick={() =>
                          onApplySequentialRow(
                            analysis.seqInputSignals.map((sig, i) => ({
                              nodeId: sig.nodeId,
                              value: row.inputBits[i],
                            })),
                            analysis.stateSignals.map((st, sIdx) => ({
                              nodeId: st.nodeId,
                              value: row.presentStateBits[sIdx],
                              compNodeId: st.compNodeId,
                            }))
                          )
                        }
                        title={copy.subtitle}
                        className={`border-b border-slate-100 last:border-b-0 cursor-pointer transition-colors ${
                          row.matchesCanvas
                            ? 'bg-sky-50/95 ring-1 ring-inset ring-sky-300'
                            : 'hover:bg-slate-50'
                        }`}
                      >
                        {row.inputBits.map((b, idx) => (
                          <td
                            key={idx}
                            className={`py-1.5 px-2.5 text-center font-bold ${
                              b === 1 ? 'text-slate-900' : 'text-slate-400'
                            }`}
                          >
                            {b}
                          </td>
                        ))}
                        {row.presentStateBits.map((q, sIdx) => (
                          <td
                            key={`ps_${sIdx}`}
                            className={`py-1.5 px-2.5 text-center font-bold text-amber-800 ${
                              sIdx === 0 && analysis.seqInputSignals.length > 0
                                ? 'border-l border-slate-100'
                                : ''
                            }`}
                          >
                            {q}
                          </td>
                        ))}
                        {row.nextStateBits.map((nq, sIdx) => (
                          <td
                            key={`ns_${sIdx}`}
                            className={`py-1.5 px-2.5 text-center font-extrabold ${
                              nq === '?'
                                ? 'text-rose-600'
                                : nq === 1
                                  ? 'text-violet-800'
                                  : 'text-slate-500'
                            } ${sIdx === 0 ? 'border-l-2 border-slate-200' : ''}`}
                          >
                            {nq}
                          </td>
                        ))}
                        {row.outputValues.map((val, oIdx) => (
                          <td
                            key={`out_${oIdx}`}
                            className={`py-1.5 px-2.5 text-center ${
                              oIdx === 0 ? 'border-l border-slate-100' : ''
                            }`}
                          >
                            {renderOutputCell(
                              analysis.outputSignals[oIdx],
                              val,
                              false
                            )}
                          </td>
                        ))}
                        <td className="py-1.5 px-3 text-center border-l border-slate-100">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-lg border text-[10.5px] font-display font-extrabold whitespace-nowrap ${
                              ACTION_BADGE_STYLES[row.action]
                            }`}
                          >
                            {lang === 'en' ? row.actionDetailEn : row.actionDetailTr}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="shrink-0 px-4 py-3 border-t-2 border-slate-100 bg-slate-50/80 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-[11px] font-bold text-sky-800">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-500 shrink-0" />
            <span>{copy.activeRowPill}</span>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <button
              type="button"
              disabled={!canCopy}
              onClick={handleCopyTable}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-2xl border-2 border-b-4 active:border-b-2 text-xs font-extrabold transition-all cursor-pointer disabled:opacity-45 disabled:cursor-not-allowed ${
                copied
                  ? 'bg-emerald-500 border-emerald-600 text-white'
                  : 'bg-white hover:bg-sky-50 border-sky-200 text-sky-800'
              }`}
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? copy.copiedBtn : copy.copyBtn}</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-2xl border-2 border-slate-200 bg-white hover:bg-slate-100 text-xs font-bold text-slate-600 cursor-pointer"
            >
              {copy.closeBtn}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TruthTableModal;
