import React, { useEffect, useState } from 'react';
import { Lightbulb, Check, ChevronDown } from 'lucide-react';
import type { VisualSection } from '../../types/curriculum';
import { useSession } from '../../context/SessionContext';
import { t, UI_STRINGS } from '../../i18n/translations';
import { WidgetRenderer } from '../widgets/WidgetRenderer';

interface VisualSectionCardProps {
  section: VisualSection;
  focusMode?: boolean;
}

export const VisualSectionCard: React.FC<VisualSectionCardProps> = ({
  section,
  focusMode = false,
}) => {
  const { session } = useSession();
  const lang = session.language;
  const copy = UI_STRINGS[lang].curriculum;
  const [tipExpanded, setTipExpanded] = useState(false);

  useEffect(() => {
    setTipExpanded(false);
  }, [section.id, focusMode]);

  const allDiagrams = [
    ...(section.diagram ? [section.diagram] : []),
    ...(section.diagrams ?? []),
  ];

  return (
    <section
      className={`rounded-3xl border-2 border-slate-200 border-b-4 bg-white shadow-sm overflow-hidden ${
        focusMode
          ? 'p-5 sm:p-7 md:p-8 space-y-5 md:space-y-6'
          : 'p-4 md:p-6 lg:p-7 space-y-4 md:space-y-5'
      }`}
    >
      <div className="space-y-2.5 min-w-0">
        <h3
          className={`font-display font-extrabold text-slate-800 break-words ${
            focusMode ? 'text-xl sm:text-2xl' : 'text-lg sm:text-xl'
          }`}
        >
          {t(section.title, lang)}
        </h3>
        <p
          className={`text-slate-600 max-w-4xl whitespace-pre-line break-words ${
            focusMode
              ? 'text-sm sm:text-base leading-[1.75]'
              : 'text-sm sm:text-[15px] leading-relaxed'
          }`}
        >
          {t(section.explanation, lang)}
        </p>
      </div>

      {section.keyPoints && section.keyPoints.length > 0 && (
        <ul className="space-y-2.5 pt-1">
          {section.keyPoints.map((pt, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700 font-medium">
              <span className="w-5 h-5 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-3.5 h-3.5 stroke-[2.8]" />
              </span>
              <span>{t(pt, lang)}</span>
            </li>
          ))}
        </ul>
      )}

      {allDiagrams.map((diagram, dIdx) => (
        <React.Fragment key={dIdx}>
          {diagram.kind === 'positional' && (
            <div className="rounded-2xl border-2 border-sky-200 bg-sky-50/50 p-3 sm:p-4 space-y-3 max-w-full">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-bold text-slate-700 break-words">
                  {t(diagram.caption, lang)}
                </span>
                <span className="font-mono text-xs font-extrabold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-xl max-w-full overflow-x-auto">
                  {t(diagram.resultLabel, lang)}
                </span>
              </div>
              <div className="overflow-x-auto max-w-full pb-1">
                <div
                  className="grid gap-2 min-w-max sm:min-w-0"
                  style={{
                    gridTemplateColumns: `repeat(${diagram.digits.length}, minmax(56px, 1fr))`,
                  }}
                >
                  {diagram.digits.map((d, idx) => (
                    <div
                      key={idx}
                      className="rounded-2xl border-2 border-sky-200 border-b-4 bg-white p-2 sm:p-2.5 text-center space-y-1"
                    >
                      <div
                        className={`font-mono text-base font-extrabold ${
                          d.symbol === '1'
                            ? 'text-emerald-600'
                            : d.symbol === '0'
                              ? 'text-slate-400'
                              : 'text-slate-800'
                        }`}
                      >
                        {d.symbol}
                      </div>
                      <div className="font-mono text-[11px] font-bold text-sky-600">
                        {t(d.weightLabel, lang)}
                      </div>
                      <div className="font-mono text-[11px] font-semibold text-slate-600 border-t border-slate-100 pt-1">
                        {t(d.contribution, lang)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {diagram.kind === 'table' && (
            <div className="rounded-2xl border-2 border-slate-200 bg-white overflow-hidden">
              <div className="px-4 py-2.5 border-b-2 border-slate-100 bg-gradient-to-r from-violet-50 to-sky-50 text-xs font-bold text-slate-700">
                {t(diagram.caption, lang)}
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs font-mono">
                  <thead>
                    <tr className="border-b-2 border-slate-100 bg-slate-50 text-slate-500">
                      {diagram.headers.map((h, hIdx) => (
                        <th key={hIdx} className="py-2.5 px-4 text-left font-bold">
                          {t(h, lang)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {diagram.rows.map((row, rIdx) => (
                      <tr
                        key={rIdx}
                        className="border-b border-slate-100 hover:bg-sky-50/40 transition-colors"
                      >
                        {row.map((cell, cIdx) => (
                          <td
                            key={cIdx}
                            className={`py-2 px-4 ${
                              cIdx === diagram.highlightColumn
                                ? 'text-emerald-700 font-bold bg-emerald-50/50'
                                : cIdx === 0
                                  ? 'text-slate-800 font-bold'
                                  : 'text-sky-700 font-medium'
                            }`}
                          >
                            {t(cell, lang)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {diagram.kind === 'steps' && (
            <div className="rounded-2xl border-2 border-violet-200 bg-violet-50/40 p-3 sm:p-4 space-y-3 max-w-full">
              <div className="text-xs font-bold text-violet-900 break-words">
                {t(diagram.caption, lang)}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {diagram.steps.map((st, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl border-2 border-violet-200 border-b-4 bg-white p-3.5 space-y-1.5 min-w-0"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-xs font-display font-extrabold text-violet-700">
                        {t(st.label, lang)}
                      </span>
                      {st.badge && (
                        <span className="font-mono text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-lg">
                          {t(st.badge, lang)}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line font-mono break-words overflow-x-auto max-w-full">
                      {t(st.detail, lang)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </React.Fragment>
      ))}

      {section.widget && (
        <WidgetRenderer type={section.widget} config={section.widgetConfig} />
      )}

      {section.examTip &&
        (focusMode ? (
          <div className="pt-1 space-y-2.5">
            <button
              type="button"
              onClick={() => setTipExpanded((prev) => !prev)}
              aria-expanded={tipExpanded}
              className="min-h-[44px] w-full sm:w-auto inline-flex items-center justify-between sm:justify-start gap-2.5 px-4 py-2.5 rounded-2xl border-2 border-amber-200 border-b-4 active:border-b-2 active:translate-y-0.5 bg-amber-50/90 hover:bg-amber-100/80 text-xs font-extrabold text-amber-900 transition-all cursor-pointer"
            >
              <span className="inline-flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-amber-400 text-white flex items-center justify-center shrink-0">
                  <Lightbulb className="w-3.5 h-3.5" />
                </span>
                <span>{tipExpanded ? copy.hideExamTip : copy.showExamTip}</span>
              </span>
              <ChevronDown
                className={`w-4 h-4 text-amber-700 shrink-0 transition-transform duration-200 ${
                  tipExpanded ? 'rotate-180' : ''
                }`}
              />
            </button>

            {tipExpanded && (
              <div className="rounded-2xl border-2 border-amber-200 bg-amber-50/80 p-4 sm:p-5 flex items-start gap-3">
                <span className="w-7 h-7 rounded-xl bg-amber-400 text-white flex items-center justify-center shrink-0">
                  <Lightbulb className="w-4 h-4" />
                </span>
                <div className="text-xs sm:text-sm leading-relaxed text-amber-950">
                  <span className="font-display font-extrabold text-amber-800 mr-1.5">
                    {copy.examTipLabel}
                  </span>
                  {t(section.examTip, lang)}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="rounded-2xl border-2 border-amber-200 bg-amber-50/80 p-4 flex items-start gap-3">
            <span className="w-7 h-7 rounded-xl bg-amber-400 text-white flex items-center justify-center shrink-0">
              <Lightbulb className="w-4 h-4" />
            </span>
            <div className="text-xs sm:text-[13px] leading-relaxed text-amber-950">
              <span className="font-display font-extrabold text-amber-800 mr-1.5">
                {copy.examTipLabel}
              </span>
              {t(section.examTip, lang)}
            </div>
          </div>
        ))}
    </section>
  );
};
