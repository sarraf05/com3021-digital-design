import React from 'react';
import {
  AlertTriangle,
  BookMarked,
  BookOpen,
  CheckCircle2,
  Cpu,
  Presentation,
} from 'lucide-react';
import type {
  BilingualText,
  FocusCard,
  WeekCurriculum,
} from '../../data/curriculum';
import type {
  DetailedLectureEntry,
  DetailedTable,
  DetailedTableCell,
} from '../../data/detailedLectures';
import type { FocusLangMode } from '../../context/SessionContext';

interface DetailedLectureViewProps {
  card: FocusCard;
  weekCurriculum: WeekCurriculum;
  detailed: DetailedLectureEntry;
  focusLangMode: FocusLangMode;
  onOpenSlide: () => void;
  onOpenBook: () => void;
  onOpenLab?: () => void;
}

function resolveCellText(
  cell: DetailedTableCell,
  lang: FocusLangMode
): string {
  if (typeof cell === 'string') return cell;
  if (lang === 'en') return cell.en;
  if (lang === 'tr') return cell.tr;
  return `${cell.en} / ${cell.tr}`;
}

function renderBilingualParagraph(
  text: BilingualText,
  lang: FocusLangMode,
  options?: { preserveWhitespace?: boolean }
) {
  const wsClass = options?.preserveWhitespace ? 'whitespace-pre-line' : '';

  if (lang === 'en') {
    return (
      <p
        className={`text-sm sm:text-[15px] text-slate-700 leading-relaxed ${wsClass}`}
      >
        {text.en}
      </p>
    );
  }

  if (lang === 'tr') {
    return (
      <p
        className={`text-sm sm:text-[15px] text-slate-700 leading-relaxed ${wsClass}`}
      >
        {text.tr}
      </p>
    );
  }

  return (
    <div className="space-y-2.5">
      <div className="rounded-xl border border-slate-200/80 bg-slate-50/70 px-3.5 py-2.5">
        <div className="flex items-start gap-2.5">
          <span className="mt-0.5 px-1.5 py-0.5 rounded bg-sky-100 text-sky-800 border border-sky-200 font-mono text-[10px] font-extrabold shrink-0">
            EN
          </span>
          <p
            className={`text-xs sm:text-sm text-slate-800 leading-relaxed min-w-0 flex-1 ${wsClass}`}
          >
            {text.en}
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-amber-200/70 bg-[#FFFDF8] px-3.5 py-2.5">
        <div className="flex items-start gap-2.5">
          <span className="mt-0.5 px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-200 font-mono text-[10px] font-extrabold shrink-0">
            TR
          </span>
          <p
            className={`text-xs sm:text-sm text-slate-700 leading-relaxed min-w-0 flex-1 ${wsClass}`}
          >
            {text.tr}
          </p>
        </div>
      </div>
    </div>
  );
}

function renderSectionHeading(
  numberLabel: string,
  heading: BilingualText,
  lang: FocusLangMode
) {
  return (
    <div className="flex items-baseline gap-2.5 min-w-0">
      <span className="font-mono text-xs sm:text-sm font-extrabold text-indigo-700 bg-indigo-50 border border-indigo-200/80 px-2 py-0.5 rounded-lg tabular-nums shrink-0">
        {numberLabel}
      </span>
      <div className="min-w-0 flex-1">
        {lang === 'bilingual' ? (
          <div className="space-y-0.5">
            <h4 className="font-display text-sm sm:text-base font-black text-slate-900 leading-snug">
              {heading.en}
            </h4>
            <p className="font-display text-xs sm:text-sm font-bold text-slate-500 leading-snug">
              {heading.tr}
            </p>
          </div>
        ) : (
          <h4 className="font-display text-sm sm:text-base font-black text-slate-900 leading-snug">
            {lang === 'en' ? heading.en : heading.tr}
          </h4>
        )}
      </div>
    </div>
  );
}

function renderStructuredTable(table: DetailedTable, lang: FocusLangMode) {
  const captionText =
    lang === 'en'
      ? table.caption.en
      : lang === 'tr'
        ? table.caption.tr
        : `${table.caption.en} — ${table.caption.tr}`;

  return (
    <div className="w-full max-w-full overflow-x-auto rounded-2xl border border-slate-200 bg-white">
      <div className="px-3.5 py-2 border-b border-slate-200 bg-slate-50/90 text-[11px] sm:text-xs font-display font-bold text-slate-700">
        {captionText}
      </div>
      <table className="w-full text-left border-collapse text-xs sm:text-[13px] font-mono tabular-nums">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50/50">
            {table.headers.map((header, hIdx) => (
              <th
                key={hIdx}
                className={`px-3 py-2 font-extrabold text-slate-800 whitespace-nowrap ${
                  table.highlightCol === hIdx ? 'bg-indigo-50/70 text-indigo-950' : ''
                }`}
              >
                {resolveCellText(header, lang)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {table.rows.map((row, rIdx) => (
            <tr
              key={rIdx}
              className="hover:bg-slate-50/70 transition-colors"
            >
              {row.map((cell, cIdx) => (
                <td
                  key={cIdx}
                  className={`px-3 py-2 text-slate-700 whitespace-nowrap ${
                    table.highlightCol === cIdx
                      ? 'bg-indigo-50/40 font-bold text-indigo-950'
                      : ''
                  }`}
                >
                  {resolveCellText(cell, lang)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export const DetailedLectureView: React.FC<DetailedLectureViewProps> = ({
  card,
  weekCurriculum,
  detailed,
  focusLangMode,
  onOpenSlide,
  onOpenBook,
  onOpenLab,
}) => {
  const isEnOnly = focusLangMode === 'en';
  const sectionRefText =
    focusLangMode === 'en'
      ? detailed.sectionRef.en
      : focusLangMode === 'tr'
        ? detailed.sectionRef.tr
        : `${detailed.sectionRef.en} · ${detailed.sectionRef.tr}`;

  return (
    <div className="max-w-3xl mx-auto lg:max-w-4xl w-full min-w-0">
      <article className="rounded-3xl border border-slate-200 bg-white p-4 sm:p-6 md:p-7 shadow-sm space-y-6">
        {/* Top Metadata Strip */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-100">
          <div className="inline-flex items-center gap-2 min-w-0">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl border border-indigo-200 bg-indigo-50/80 text-indigo-900 text-[11px] font-display font-extrabold">
              <BookOpen className="w-3.5 h-3.5 shrink-0" />
              <span>
                {focusLangMode === 'en'
                  ? 'Detailed Lecture'
                  : focusLangMode === 'tr'
                    ? 'Detaylı Anlatım'
                    : 'Detaylı Anlatım · Detailed Lecture'}
              </span>
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <span className="font-mono text-[11px] font-bold text-slate-600 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-lg">
              {sectionRefText}
            </span>
            <span className="font-mono text-[11px] font-bold text-sky-700 bg-sky-50 border border-sky-200 px-2.5 py-1 rounded-lg tabular-nums">
              {weekCurriculum.lectureCode} · {isEnOnly ? 'Slide p.' : 'Slayt s.'}{' '}
              {card.slidePage}
            </span>
            <span className="font-mono text-[11px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-lg tabular-nums">
              Mano 6th Ed. · {isEnOnly ? 'PDF p.' : 'PDF s.'} {card.pdfPage}
            </span>
          </div>
        </div>

        {/* Sub-Topic Title */}
        <header className="space-y-1.5">
          {focusLangMode === 'bilingual' ? (
            <>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-sky-100 text-sky-800 border border-sky-200 font-mono text-[10px] font-extrabold shrink-0">
                  EN
                </span>
                <h3 className="font-display text-lg sm:text-xl font-black text-slate-900 leading-snug">
                  {card.title.en}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-200 font-mono text-[10px] font-extrabold shrink-0">
                  TR
                </span>
                <p className="font-display text-sm sm:text-base font-extrabold text-slate-600 leading-snug">
                  {card.title.tr}
                </p>
              </div>
            </>
          ) : (
            <h3 className="font-display text-lg sm:text-2xl font-black text-slate-900 leading-snug">
              {focusLangMode === 'en' ? card.title.en : card.title.tr}
            </h3>
          )}
        </header>

        {/* 01. Core Concept & Formal Definition */}
        <section className="space-y-3.5 pt-1">
          {renderSectionHeading('01.', detailed.definition.heading, focusLangMode)}
          {renderBilingualParagraph(detailed.definition.body, focusLangMode, {
            preserveWhitespace: true,
          })}
          {detailed.definition.formalEquation && (
            <div className="w-full max-w-full overflow-x-auto rounded-2xl border border-indigo-200/90 bg-indigo-50/50 px-4 py-3">
              <code className="font-mono text-xs sm:text-sm font-extrabold text-indigo-950 whitespace-pre-wrap break-words block text-center">
                {detailed.definition.formalEquation}
              </code>
            </div>
          )}
        </section>

        {/* 02. Step-by-Step Rules / Procedure */}
        <section className="space-y-3.5 pt-4 border-t border-slate-100">
          {renderSectionHeading('02.', detailed.procedure.heading, focusLangMode)}
          <ol className="space-y-2.5">
            {detailed.procedure.steps.map((step, idx) => (
              <li
                key={idx}
                className="rounded-2xl border border-slate-200/80 bg-slate-50/40 p-3 sm:p-3.5"
              >
                {renderBilingualParagraph(step, focusLangMode, {
                  preserveWhitespace: true,
                })}
              </li>
            ))}
          </ol>
          {detailed.procedure.table &&
            renderStructuredTable(detailed.procedure.table, focusLangMode)}
        </section>

        {/* 03. Concrete Worked Example */}
        <section className="space-y-3.5 pt-4 border-t border-slate-100">
          {renderSectionHeading(
            '03.',
            detailed.workedExample.heading,
            focusLangMode
          )}

          {/* Problem Callout */}
          <div className="rounded-2xl border border-sky-200 bg-sky-50/50 p-3.5 sm:p-4 space-y-2">
            <div className="font-display text-xs font-extrabold uppercase tracking-wider text-sky-900">
              {focusLangMode === 'en'
                ? 'Problem'
                : focusLangMode === 'tr'
                  ? 'Problem'
                  : 'Problem · Soru'}
            </div>
            {renderBilingualParagraph(
              detailed.workedExample.problem,
              focusLangMode,
              { preserveWhitespace: true }
            )}
          </div>

          {/* Worked Steps */}
          <div className="space-y-2.5">
            {detailed.workedExample.steps.map((step, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200/80 bg-white p-3 sm:p-3.5"
              >
                {renderBilingualParagraph(step, focusLangMode, {
                  preserveWhitespace: true,
                })}
              </div>
            ))}
          </div>

          {detailed.workedExample.table &&
            renderStructuredTable(detailed.workedExample.table, focusLangMode)}

          {/* Final Answer Box */}
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-3.5 sm:p-4 space-y-2">
            <div className="inline-flex items-center gap-1.5 font-display text-xs font-extrabold uppercase tracking-wider text-emerald-900">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                {focusLangMode === 'en'
                  ? 'Result'
                  : focusLangMode === 'tr'
                    ? 'Sonuç'
                    : 'Result · Sonuç'}
              </span>
            </div>
            {renderBilingualParagraph(
              detailed.workedExample.finalAnswer,
              focusLangMode,
              { preserveWhitespace: true }
            )}
          </div>
        </section>

        {/* 04. Exam Notes & Pitfalls */}
        <section className="space-y-3.5 pt-4 border-t border-slate-100">
          {renderSectionHeading('04.', detailed.pitfalls.heading, focusLangMode)}
          <div className="rounded-2xl border border-amber-200/90 bg-amber-50/40 p-3.5 sm:p-4 space-y-2.5">
            <div className="inline-flex items-center gap-1.5 text-xs font-display font-extrabold text-amber-900">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                {focusLangMode === 'en'
                  ? 'Watch Out'
                  : focusLangMode === 'tr'
                    ? 'Sınavda Dikkat Edilecek Noktalar'
                    : 'Watch Out · Sınavda Dikkat'}
              </span>
            </div>
            <ul className="space-y-2.5">
              {detailed.pitfalls.items.map((item, idx) => (
                <li
                  key={idx}
                  className="rounded-xl border border-amber-200/70 bg-white/90 p-3"
                >
                  {renderBilingualParagraph(item, focusLangMode, {
                    preserveWhitespace: true,
                  })}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Quick-Access Footer: Slides + Book + Simulation Lab */}
        <footer className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={onOpenSlide}
              className="min-h-[40px] px-3.5 py-2 rounded-2xl border-2 border-sky-300 border-b-4 bg-sky-50 hover:bg-sky-100 active:border-b-2 active:translate-y-0.5 text-sky-900 text-xs font-display font-extrabold inline-flex items-center gap-2 transition-all cursor-pointer"
            >
              <Presentation className="w-4 h-4 text-sky-600 shrink-0" />
              <span>
                {isEnOnly
                  ? `Open in Slides (p. ${card.slidePage})`
                  : `Slaytta Aç (s. ${card.slidePage})`}
              </span>
            </button>

            <button
              type="button"
              onClick={onOpenBook}
              className="min-h-[40px] px-3.5 py-2 rounded-2xl border-2 border-amber-300 border-b-4 bg-amber-50 hover:bg-amber-100 active:border-b-2 active:translate-y-0.5 text-amber-950 text-xs font-display font-extrabold inline-flex items-center gap-2 transition-all cursor-pointer"
            >
              <BookMarked className="w-4 h-4 text-amber-700 shrink-0" />
              <span>
                {isEnOnly
                  ? `Open in Book (PDF p. ${card.pdfPage})`
                  : `Kitapta Aç (PDF s. ${card.pdfPage})`}
              </span>
            </button>
          </div>

          {weekCurriculum.labPreset && onOpenLab && (
            <button
              type="button"
              onClick={onOpenLab}
              className="min-h-[40px] px-3.5 py-2 rounded-2xl border-2 border-emerald-500 border-b-4 bg-emerald-500 hover:bg-emerald-600 active:border-b-2 active:translate-y-0.5 text-white text-xs font-display font-extrabold inline-flex items-center gap-2 transition-all shadow-xs cursor-pointer"
            >
              <Cpu className="w-4 h-4 shrink-0" />
              <span>
                {isEnOnly ? 'Try in Simulation Lab' : "Simülasyon Lab'da Dene"}
              </span>
            </button>
          )}
        </footer>
      </article>
    </div>
  );
};
