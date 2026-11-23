import React, { useEffect, useRef, useState } from 'react';
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  CornerDownLeft,
  FileUp,
  RefreshCw,
} from 'lucide-react';
import { useSession } from '../../context/SessionContext';
import {
  BOOK_MIN_PAGE,
  BOOK_PDF_URL,
  BOOK_TOTAL_PAGES,
  TEXTBOOK_ENTRIES,
  clampBookPage,
  getTextbookEntryForPage,
} from '../../data/textbookMap';
import { UI_STRINGS } from '../../i18n/translations';

interface BookViewerProps {
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const BookViewer: React.FC<BookViewerProps> = ({
  currentPage,
  onPageChange,
}) => {
  const {
    session: { language },
  } = useSession();
  const ui = UI_STRINGS[language];

  const [pageInput, setPageInput] = useState<string>(String(currentPage));
  const [localBlobUrl, setLocalBlobUrl] = useState<string | null>(null);
  const [pdfStatus, setPdfStatus] = useState<'checking' | 'ready' | 'missing'>(
    'checking'
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setPageInput(String(currentPage));
  }, [currentPage]);

  const checkPdfAvailability = async () => {
    setPdfStatus('checking');
    try {
      const res = await fetch(BOOK_PDF_URL, { method: 'HEAD' });
      const contentType = res.headers.get('content-type')?.toLowerCase() ?? '';
      // Vite SPA fallback serves index.html (text/html) for missing static files in public/
      if (!res.ok || contentType.includes('text/html')) {
        setPdfStatus('missing');
      } else {
        setPdfStatus('ready');
      }
    } catch {
      // Fall back to trying direct iframe load if offline / HEAD blocked
      setPdfStatus('ready');
    }
  };

  useEffect(() => {
    void checkPdfAvailability();
  }, []);

  useEffect(() => {
    return () => {
      if (localBlobUrl) {
        URL.revokeObjectURL(localBlobUrl);
      }
    };
  }, [localBlobUrl]);

  const activeEntry = getTextbookEntryForPage(currentPage);
  const pdfBaseUrl = localBlobUrl || BOOK_PDF_URL;
  const iframeSrc = `${pdfBaseUrl}#page=${currentPage}&view=FitH`;

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nextPage = Number(e.target.value);
    if (Number.isFinite(nextPage)) {
      onPageChange(clampBookPage(nextPage));
    }
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = Number.parseInt(pageInput.trim(), 10);
    if (!Number.isFinite(parsed)) {
      setPageInput(String(currentPage));
      return;
    }
    const target = clampBookPage(parsed);
    setPageInput(String(target));
    onPageChange(target);
  };

  const handlePickLocalPdf = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (localBlobUrl) {
      URL.revokeObjectURL(localBlobUrl);
    }
    const nextUrl = URL.createObjectURL(file);
    setLocalBlobUrl(nextUrl);
    setPdfStatus('ready');
    e.target.value = '';
  };

  const showMissingNotice = pdfStatus === 'missing' && !localBlobUrl;

  return (
    <div className="h-full w-full overflow-hidden flex flex-col p-2 sm:p-3 lg:p-4 gap-2.5">
      {/* Cute Pastel Control Toolbar */}
      <div className="shrink-0 rounded-2xl border-2 border-amber-200/90 border-b-4 bg-white px-3 py-2.5 flex flex-wrap items-center justify-between gap-2.5 shadow-xs">
        {/* Active Topic & Page Info */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-amber-100 border-2 border-amber-200 text-amber-700 flex items-center justify-center shrink-0">
            <BookOpen className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-display text-xs sm:text-sm font-extrabold text-slate-800 truncate max-w-[260px] sm:max-w-[360px]">
                {activeEntry.shortLabel[language]}
              </span>
              <span className="font-mono text-[11px] font-extrabold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-lg shrink-0 tabular-nums">
                {activeEntry.chapterRef} · {ui.book.pageBadge(currentPage)}
              </span>
            </div>
            <div className="text-[11px] text-slate-500 font-medium truncate">
              {ui.book.title}
            </div>
          </div>
        </div>

        {/* Quick Topic Selector & Manual Page Jump */}
        <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto lg:justify-end">
          <label className="sr-only" htmlFor="book-topic-select">
            {ui.book.quickJumpLabel}
          </label>
          <select
            id="book-topic-select"
            value={activeEntry.page}
            onChange={handleSelectChange}
            aria-label={ui.book.quickJumpLabel}
            className="flex-1 min-w-[210px] sm:flex-initial sm:max-w-[320px] min-h-[38px] px-3 py-1.5 rounded-xl border-2 border-sky-200 bg-sky-50/60 hover:border-sky-300 focus:border-sky-400 focus:outline-none text-xs font-bold text-slate-800 cursor-pointer"
          >
            {TEXTBOOK_ENTRIES.map((entry) => (
              <option key={entry.id} value={entry.page}>
                {entry.label[language]} — {language === 'tr' ? `s. ${entry.page}` : `p. ${entry.page}`}
              </option>
            ))}
          </select>

          <form
            onSubmit={handleManualSubmit}
            className="inline-flex items-center gap-1 shrink-0"
          >
            <button
              type="button"
              onClick={() => onPageChange(clampBookPage(currentPage - 1))}
              disabled={currentPage <= BOOK_MIN_PAGE}
              title={ui.book.prevPageTitle}
              aria-label={ui.book.prevPageTitle}
              className="min-w-[38px] min-h-[38px] rounded-xl border-2 border-slate-200 border-b-[3px] bg-white hover:bg-slate-50 active:border-b-2 active:translate-y-0.5 disabled:opacity-35 disabled:cursor-not-allowed text-slate-700 flex items-center justify-center transition-all cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <input
              type="number"
              inputMode="numeric"
              min={BOOK_MIN_PAGE}
              max={BOOK_TOTAL_PAGES}
              value={pageInput}
              onChange={(e) => setPageInput(e.target.value)}
              placeholder={ui.book.pagePlaceholder}
              aria-label={ui.book.pagePlaceholder}
              className="w-20 min-h-[38px] px-2.5 py-1 rounded-xl border-2 border-slate-200 focus:border-amber-400 focus:outline-none bg-[#FFFDF8] font-mono text-xs font-extrabold text-center text-slate-800 tabular-nums"
            />

            <button
              type="submit"
              className="min-h-[38px] px-3 py-1.5 rounded-xl border-2 border-amber-500 border-b-[3px] bg-amber-400 hover:bg-amber-500 active:border-b-2 active:translate-y-0.5 text-slate-900 text-xs font-display font-extrabold inline-flex items-center gap-1 transition-all whitespace-nowrap cursor-pointer"
            >
              <span>{ui.book.goBtn}</span>
              <CornerDownLeft className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={() => onPageChange(clampBookPage(currentPage + 1))}
              disabled={currentPage >= BOOK_TOTAL_PAGES}
              title={ui.book.nextPageTitle}
              aria-label={ui.book.nextPageTitle}
              className="min-w-[38px] min-h-[38px] rounded-xl border-2 border-slate-200 border-b-[3px] bg-white hover:bg-slate-50 active:border-b-2 active:translate-y-0.5 disabled:opacity-35 disabled:cursor-not-allowed text-slate-700 flex items-center justify-center transition-all cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Full-Viewport Height PDF Container */}
      <div className="flex-1 min-h-0 rounded-2xl border-2 border-slate-200 bg-white overflow-hidden shadow-xs relative">
        {showMissingNotice ? (
          <div className="h-full w-full flex items-center justify-center p-4 sm:p-8 bg-gradient-to-br from-amber-50/70 via-[#FFFDF8] to-sky-50/70 overflow-y-auto">
            <div className="max-w-lg w-full rounded-3xl border-2 border-amber-200 border-b-4 bg-white p-6 sm:p-7 space-y-4 shadow-sm text-center">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-100 border-2 border-amber-200 text-amber-700 flex items-center justify-center">
                <BookOpen className="w-7 h-7" />
              </div>
              <div className="space-y-1.5">
                <h2 className="font-display text-lg sm:text-xl font-black text-slate-900">
                  {ui.book.missingTitle}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {ui.book.missingDesc}
                </p>
              </div>
              <div className="rounded-2xl border-2 border-slate-200 bg-slate-50 px-3.5 py-2.5 font-mono text-xs font-bold text-slate-800 select-all">
                public/books/digital-design-6e.pdf
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                {ui.book.missingUploadHint}
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept="application/pdf"
                onChange={handlePickLocalPdf}
                className="hidden"
              />
              <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="min-h-[42px] px-4 py-2 rounded-2xl border-2 border-sky-600 border-b-4 bg-sky-500 hover:bg-sky-600 active:border-b-2 active:translate-y-0.5 text-white text-xs font-display font-extrabold inline-flex items-center gap-2 transition-all cursor-pointer"
                >
                  <FileUp className="w-4 h-4" />
                  <span>{ui.book.choosePdfBtn}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    void checkPdfAvailability();
                  }}
                  className="min-h-[42px] px-4 py-2 rounded-2xl border-2 border-slate-200 border-b-4 bg-white hover:bg-slate-50 active:border-b-2 active:translate-y-0.5 text-slate-700 text-xs font-display font-extrabold inline-flex items-center gap-2 transition-all cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>{ui.book.retryBtn}</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <iframe
            key={currentPage}
            src={iframeSrc}
            title={ui.book.title}
            className="w-full h-full border-0 block bg-slate-100"
          />
        )}
      </div>
    </div>
  );
};
