import React, { useEffect } from 'react';
import {
  BookMarked,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Cpu,
  Lightbulb,
  ListChecks,
  Sigma,
  Sparkles,
} from 'lucide-react';
import type { FocusCard, WeekCurriculum } from '../../data/curriculum';
import { useSession, type FocusLangMode } from '../../context/SessionContext';

interface FocusCardDeckProps {
  weekCurriculum: WeekCurriculum;
  currentIndex: number;
  onChangeIndex: (nextIndex: number) => void;
  hasPracticeTab?: boolean;
  onGoToPractice?: () => void;
}

const CARD_TYPE_META: Record<
  FocusCard['type'],
  {
    leftStripe: string;
    badge: string;
    bulletDot: string;
    icon: React.ComponentType<{ className?: string }>;
    labels: { en: string; tr: string; bilingual: string };
  }
> = {
  concept: {
    leftStripe: 'border-l-[6px] border-l-sky-500',
    badge: 'bg-sky-50 text-sky-800 border-sky-200',
    bulletDot: 'bg-sky-500',
    icon: BookOpen,
    labels: { en: 'Concept', tr: 'Kavram', bilingual: 'Concept · Kavram' },
  },
  formula: {
    leftStripe: 'border-l-[6px] border-l-indigo-500',
    badge: 'bg-indigo-50 text-indigo-800 border-indigo-200',
    bulletDot: 'bg-indigo-500',
    icon: Sigma,
    labels: { en: 'Formula', tr: 'Formül', bilingual: 'Formula · Formül' },
  },
  method: {
    leftStripe: 'border-l-[6px] border-l-emerald-500',
    badge: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    bulletDot: 'bg-emerald-500',
    icon: ListChecks,
    labels: { en: 'Method', tr: 'Yöntem', bilingual: 'Method · Yöntem' },
  },
  'exam-tip': {
    leftStripe: 'border-l-[6px] border-l-amber-500',
    badge: 'bg-amber-50 text-amber-900 border-amber-300',
    bulletDot: 'bg-amber-500',
    icon: Lightbulb,
    labels: { en: 'Exam Tip', tr: 'Sınav İpucu', bilingual: 'Exam Tip · Sınav İpucu' },
  },
};

function renderFormattedLines(text: string, dotClass: string) {
  const lines = text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  return (
    <ul className="space-y-2">
      {lines.map((rawLine, idx) => {
        const cleanLine = rawLine.startsWith('•')
          ? rawLine.slice(1).trim()
          : rawLine;
        const colonIdx = cleanLine.indexOf(':');
        const hasLead =
          colonIdx > 1 && colonIdx <= 42 && !/[=<>→]/.test(cleanLine.slice(0, colonIdx));

        return (
          <li
            key={idx}
            className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed"
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${dotClass} shrink-0 mt-2`}
              aria-hidden="true"
            />
            <span className="min-w-0 flex-1">
              {hasLead ? (
                <>
                  <strong className="font-bold text-slate-900">
                    {cleanLine.slice(0, colonIdx + 1)}
                  </strong>{' '}
                  <span>{cleanLine.slice(colonIdx + 1).trimStart()}</span>
                </>
              ) : (
                <span>{cleanLine}</span>
              )}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

const LANG_MODE_OPTIONS: { id: FocusLangMode; label: string }[] = [
  { id: 'en', label: 'EN' },
  { id: 'tr', label: 'TR' },
  { id: 'bilingual', label: 'Bilingual' },
];

export const FocusCardDeck: React.FC<FocusCardDeckProps> = ({
  weekCurriculum,
  currentIndex,
  onChangeIndex,
  hasPracticeTab = false,
  onGoToPractice,
}) => {
  const { session, setFocusLangMode, openBookAtPage, openLabWithPreset } =
    useSession();
  const focusLangMode = session.focusLangMode;

  const cards = weekCurriculum.cards;
  const total = cards.length;
  const safeIndex = total > 0 ? Math.min(Math.max(0, currentIndex), total - 1) : 0;
  const card = cards[safeIndex];

  useEffect(() => {
    if (total === 0) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.isContentEditable)
      ) {
        return;
      }

      if (e.key === 'ArrowRight' && safeIndex < total - 1) {
        e.preventDefault();
        onChangeIndex(safeIndex + 1);
      } else if (e.key === 'ArrowLeft' && safeIndex > 0) {
        e.preventDefault();
        onChangeIndex(safeIndex - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [safeIndex, total, onChangeIndex]);

  if (!card) return null;

  const meta = CARD_TYPE_META[card.type];
  const TypeIcon = meta.icon;
  const progressPercent = Math.round(((safeIndex + 1) / total) * 100);
  const isEnOnly = focusLangMode === 'en';

  return (
    <div className="space-y-3.5">
      {/* Focus Mode Top Bar: Language Mode Switcher + Progress Indicator */}
      <div className="rounded-2xl border-2 border-slate-200/90 bg-white px-3.5 py-2.5 shadow-2xs space-y-2.5">
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          {/* Language Mode Selector: EN | TR | Bilingual */}
          <div className="flex items-center gap-2 flex-wrap">
            <div
              role="group"
              aria-label={isEnOnly ? 'Card Language Mode' : 'Kart Dil Modu'}
              className="bg-amber-50/95 border-2 border-amber-200/90 rounded-xl p-0.5 inline-flex items-center gap-0.5"
            >
              {LANG_MODE_OPTIONS.map((opt) => {
                const active = focusLangMode === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setFocusLangMode(opt.id)}
                    aria-pressed={active}
                    className={`min-h-[32px] px-2.5 py-1 rounded-lg text-[11px] font-display font-extrabold transition-all cursor-pointer whitespace-nowrap ${
                      active
                        ? 'bg-white text-slate-900 border border-sky-200 border-b-2 border-b-sky-400 shadow-xs'
                        : 'text-slate-500 hover:text-slate-800 border border-transparent'
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>

            <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-mono font-bold text-slate-500 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-lg">
              <span>{weekCurriculum.lectureCode}</span>
              <span aria-hidden="true">·</span>
              <span>{weekCurriculum.bookSection}</span>
            </span>
          </div>

          {/* Step Dots + Progress Counter */}
          <div className="flex items-center gap-2 ml-auto">
            <div className="flex items-center gap-1">
              {cards.map((c, idx) => {
                const isCurrent = idx === safeIndex;
                const isVisited = idx < safeIndex;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => onChangeIndex(idx)}
                    aria-label={`${isEnOnly ? 'Card' : 'Kart'} ${idx + 1}`}
                    aria-current={isCurrent ? 'step' : undefined}
                    className={`min-w-[30px] h-[30px] px-2 rounded-lg border-2 font-mono text-[11px] font-extrabold transition-all cursor-pointer ${
                      isCurrent
                        ? 'bg-violet-600 border-violet-700 text-white shadow-2xs'
                        : isVisited
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:border-emerald-300'
                          : 'bg-[#FFFDF8] border-slate-200 text-slate-500 hover:border-violet-300'
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            <span className="font-mono text-xs font-extrabold text-violet-700 bg-violet-50 border border-violet-200 px-2.5 py-1 rounded-lg whitespace-nowrap">
              {isEnOnly ? `Card ${safeIndex + 1} / ${total}` : `Kart ${safeIndex + 1} / ${total}`}
            </span>
          </div>
        </div>

        {/* Visual Progress Bar */}
        <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-sky-500 via-indigo-500 to-violet-500 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Single Distraction-Free Focus Card */}
      <article
        className={`rounded-3xl border-2 border-slate-200 border-b-4 ${meta.leftStripe} bg-white p-4 sm:p-6 shadow-sm space-y-4`}
      >
        {/* Card Type Badge + Book Page Pill */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl border text-[11px] font-display font-extrabold ${meta.badge}`}
          >
            <TypeIcon className="w-3.5 h-3.5 shrink-0" />
            <span>{meta.labels[focusLangMode]}</span>
          </span>

          <span className="font-mono text-[11px] font-bold text-slate-500 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-lg">
            Mano &amp; Ciletti (6th Ed.) · {isEnOnly ? 'p.' : 's.'} {card.pdfPage}
          </span>
        </div>

        {/* Bilingual / EN / TR Content */}
        {focusLangMode === 'bilingual' ? (
          <div className="space-y-4">
            {/* English Technical Explanation (Top) */}
            <div className="rounded-2xl border border-slate-200/80 bg-slate-50/60 p-3.5 sm:p-4 space-y-2.5">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md bg-sky-100 text-sky-800 border border-sky-200 font-mono text-[10px] font-extrabold tracking-wide">
                  EN
                </span>
                <h3 className="font-display text-base sm:text-lg font-black text-slate-900 leading-snug">
                  {card.title.en}
                </h3>
              </div>
              {renderFormattedLines(card.content.en, meta.bulletDot)}
            </div>

            {/* Turkish Explanation (Bottom) */}
            <div className="rounded-2xl border border-amber-200/80 bg-[#FFFDF8] p-3.5 sm:p-4 space-y-2.5">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-200 font-mono text-[10px] font-extrabold tracking-wide">
                  TR
                </span>
                <h4 className="font-display text-sm sm:text-base font-extrabold text-slate-800 leading-snug">
                  {card.title.tr}
                </h4>
              </div>
              {renderFormattedLines(card.content.tr, meta.bulletDot)}
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <h3 className="font-display text-lg sm:text-xl font-black text-slate-900 leading-snug">
              {focusLangMode === 'en' ? card.title.en : card.title.tr}
            </h3>
            {renderFormattedLines(
              focusLangMode === 'en' ? card.content.en : card.content.tr,
              meta.bulletDot
            )}
          </div>
        )}

        {/* Centered Highlighted Formula / Code Box */}
        {card.formulaOrCode && (
          <div className="rounded-2xl border-2 border-indigo-200/90 bg-gradient-to-r from-indigo-50/90 via-sky-50/80 to-indigo-50/90 px-4 py-3 text-center overflow-x-auto shadow-2xs">
            <code className="font-mono text-xs sm:text-sm font-extrabold text-indigo-950 whitespace-pre-wrap break-words">
              {card.formulaOrCode}
            </code>
          </div>
        )}

        {/* Card Action Footer: Open PDF Page + Try in Simulation Lab */}
        <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2.5">
          <button
            type="button"
            onClick={() => openBookAtPage(card.pdfPage)}
            className="min-h-[40px] px-3.5 py-2 rounded-2xl border-2 border-amber-300 border-b-4 bg-amber-50 hover:bg-amber-100 active:border-b-2 active:translate-y-0.5 text-amber-950 text-xs font-display font-extrabold inline-flex items-center gap-2 transition-all cursor-pointer"
          >
            <BookMarked className="w-4 h-4 text-amber-700 shrink-0" />
            <span>
              {isEnOnly
                ? `Open PDF p. ${card.pdfPage}`
                : `PDF s. ${card.pdfPage}'de Aç`}
            </span>
          </button>

          {weekCurriculum.labPreset && (
            <button
              type="button"
              onClick={() => openLabWithPreset(weekCurriculum.labPreset!)}
              className="min-h-[40px] px-3.5 py-2 rounded-2xl border-2 border-emerald-500 border-b-4 bg-emerald-500 hover:bg-emerald-600 active:border-b-2 active:translate-y-0.5 text-white text-xs font-display font-extrabold inline-flex items-center gap-2 transition-all shadow-xs cursor-pointer"
            >
              <Cpu className="w-4 h-4 shrink-0" />
              <span>
                {isEnOnly ? 'Try in Simulation Lab' : "Simülasyon Lab'da Dene"}
              </span>
            </button>
          )}
        </div>
      </article>

      {/* Bottom Prev / Next Navigation + Keyboard Hint */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          disabled={safeIndex <= 0}
          onClick={() => onChangeIndex(safeIndex - 1)}
          className="min-h-[42px] inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl border-2 border-slate-200 border-b-4 bg-white text-xs font-extrabold text-slate-700 hover:border-violet-300 active:border-b-2 active:translate-y-0.5 disabled:opacity-35 disabled:cursor-not-allowed transition-all cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>{isEnOnly ? 'Previous Card' : 'Önceki Kart'}</span>
        </button>

        <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-mono font-semibold text-slate-400">
          <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-200 text-slate-500">
            ←
          </kbd>
          <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-200 text-slate-500">
            →
          </kbd>
          <span>{isEnOnly ? 'Navigate cards' : 'Kartlar arası geçiş'}</span>
        </span>

        {safeIndex < total - 1 ? (
          <button
            type="button"
            onClick={() => onChangeIndex(safeIndex + 1)}
            className="min-h-[42px] inline-flex items-center gap-1.5 px-5 py-2 rounded-2xl border-2 border-violet-600 border-b-4 bg-violet-500 hover:bg-violet-600 text-xs font-extrabold text-white active:border-b-2 active:translate-y-0.5 transition-all cursor-pointer"
          >
            <span>{isEnOnly ? 'Next Card' : 'Sonraki Kart'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : hasPracticeTab && onGoToPractice ? (
          <button
            type="button"
            onClick={onGoToPractice}
            className="min-h-[42px] inline-flex items-center gap-1.5 px-5 py-2 rounded-2xl border-2 border-emerald-600 border-b-4 bg-emerald-500 hover:bg-emerald-600 text-xs font-extrabold text-white active:border-b-2 active:translate-y-0.5 transition-all shadow-xs cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isEnOnly ? 'Practice Questions' : 'Pratik Sorulara Geç'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            type="button"
            disabled
            className="min-h-[42px] inline-flex items-center gap-1.5 px-5 py-2 rounded-2xl border-2 border-slate-200 border-b-4 bg-white text-xs font-extrabold text-slate-400 opacity-35 cursor-not-allowed"
          >
            <span>{isEnOnly ? 'Next Card' : 'Sonraki Kart'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
