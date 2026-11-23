import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  AlertCircle,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  CornerDownLeft,
  FileUp,
  Loader2,
  RefreshCw,
  ZoomIn,
  ZoomOut,
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

const PDFJS_CDN_URL =
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
const PDFJS_WORKER_URL =
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

interface PdfViewport {
  width: number;
  height: number;
}

interface PdfRenderTask {
  promise: Promise<void>;
  cancel: () => void;
}

interface PdfPageProxy {
  getViewport: (opts: { scale: number }) => PdfViewport;
  render: (params: {
    canvasContext: CanvasRenderingContext2D;
    viewport: PdfViewport;
    transform?: number[];
  }) => PdfRenderTask;
}

interface PdfDocumentProxy {
  numPages: number;
  getPage: (pageNumber: number) => Promise<PdfPageProxy>;
  destroy?: () => Promise<void>;
}

interface PdfLoadingTask {
  promise: Promise<PdfDocumentProxy>;
  destroy?: () => Promise<void>;
}

interface PdfJsGlobal {
  GlobalWorkerOptions: { workerSrc: string };
  getDocument: (src: string) => PdfLoadingTask;
}

declare global {
  interface Window {
    pdfjsLib?: PdfJsGlobal;
  }
}

let pdfJsLoadPromise: Promise<PdfJsGlobal> | null = null;

function ensurePdfJsLoaded(): Promise<PdfJsGlobal> {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('Window unavailable'));
  }

  if (window.pdfjsLib) {
    window.pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER_URL;
    return Promise.resolve(window.pdfjsLib);
  }

  if (pdfJsLoadPromise) return pdfJsLoadPromise;

  pdfJsLoadPromise = new Promise<PdfJsGlobal>((resolve, reject) => {
    const existingScript = document.querySelector<HTMLScriptElement>(
      `script[src="${PDFJS_CDN_URL}"]`
    );

    const finalize = () => {
      if (window.pdfjsLib) {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER_URL;
        resolve(window.pdfjsLib);
      } else {
        pdfJsLoadPromise = null;
        reject(new Error('pdfjsLib did not initialize'));
      }
    };

    if (existingScript) {
      existingScript.addEventListener('load', finalize, { once: true });
      existingScript.addEventListener(
        'error',
        () => {
          pdfJsLoadPromise = null;
          reject(new Error('Failed to load PDF.js script'));
        },
        { once: true }
      );
      return;
    }

    const script = document.createElement('script');
    script.src = PDFJS_CDN_URL;
    script.async = true;
    script.onload = finalize;
    script.onerror = () => {
      pdfJsLoadPromise = null;
      reject(new Error('Failed to load PDF.js script'));
    };
    document.head.appendChild(script);
  });

  return pdfJsLoadPromise;
}

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
  const [zoomScale, setZoomScale] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(BOOK_TOTAL_PAGES);
  const [docLoading, setDocLoading] = useState<boolean>(true);
  const [pageRendering, setPageRendering] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [localBlobUrl, setLocalBlobUrl] = useState<string | null>(null);
  const [reloadEpoch, setReloadEpoch] = useState<number>(0);
  const [containerWidth, setContainerWidth] = useState<number>(0);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const pdfDocRef = useRef<PdfDocumentProxy | null>(null);
  const renderTaskRef = useRef<PdfRenderTask | null>(null);

  useEffect(() => {
    setPageInput(String(currentPage));
  }, [currentPage]);

  useEffect(() => {
    return () => {
      if (localBlobUrl) {
        URL.revokeObjectURL(localBlobUrl);
      }
    };
  }, [localBlobUrl]);

  // Track responsive canvas stage width so PDF automatically fits mobile/tablet/desktop
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    const updateWidth = () => {
      setContainerWidth(el.clientWidth);
    };
    updateWidth();

    let resizeTimer: number | null = null;
    const ro = new ResizeObserver(() => {
      if (resizeTimer !== null) {
        window.clearTimeout(resizeTimer);
      }
      resizeTimer = window.setTimeout(updateWidth, 80);
    });
    ro.observe(el);

    return () => {
      ro.disconnect();
      if (resizeTimer !== null) {
        window.clearTimeout(resizeTimer);
      }
    };
  }, []);

  const pdfSourceUrl = localBlobUrl || BOOK_PDF_URL;

  // Load PDF document once per source URL
  useEffect(() => {
    let cancelled = false;
    let loadingTask: PdfLoadingTask | null = null;

    const loadDocument = async () => {
      setDocLoading(true);
      setErrorMsg(null);

      try {
        const pdfjsLib = await ensurePdfJsLoaded();
        if (cancelled) return;

        loadingTask = pdfjsLib.getDocument(pdfSourceUrl);
        const doc = await loadingTask.promise;

        if (cancelled) {
          void doc.destroy?.();
          return;
        }

        if (pdfDocRef.current && pdfDocRef.current !== doc) {
          void pdfDocRef.current.destroy?.();
        }
        pdfDocRef.current = doc;
        setTotalPages(doc.numPages || BOOK_TOTAL_PAGES);
        setDocLoading(false);
      } catch (err) {
        if (cancelled) return;
        pdfDocRef.current = null;
        setDocLoading(false);
        const message =
          err instanceof Error && err.message ? err.message : 'PDF_LOAD_FAILED';
        setErrorMsg(message);
      }
    };

    void loadDocument();

    return () => {
      cancelled = true;
      void loadingTask?.destroy?.();
      if (pdfDocRef.current) {
        void pdfDocRef.current.destroy?.();
        pdfDocRef.current = null;
      }
    };
  }, [pdfSourceUrl, reloadEpoch]);

  // Render only the selected page onto crisp Retina <canvas>
  const renderCurrentPage = useCallback(async () => {
    const doc = pdfDocRef.current;
    const canvas = canvasRef.current;
    const stage = stageRef.current;
    if (!doc || !canvas || !stage || docLoading || errorMsg) return;

    const maxPage = doc.numPages || totalPages;
    const safePage = Math.min(maxPage, Math.max(BOOK_MIN_PAGE, currentPage));

    if (renderTaskRef.current) {
      try {
        renderTaskRef.current.cancel();
      } catch {
        // Ignore cancellation cleanup error
      }
      renderTaskRef.current = null;
    }

    setPageRendering(true);

    try {
      const page = await doc.getPage(safePage);
      const unscaledViewport = page.getViewport({ scale: 1 });
      const measuredWidth = Math.max(280, (containerWidth || stage.clientWidth) - 24);
      const fitWidthScale = measuredWidth / unscaledViewport.width;
      const cssScale = Math.max(0.35, fitWidthScale * zoomScale);
      const viewport = page.getViewport({ scale: cssScale });

      const dpr = Math.min(window.devicePixelRatio || 1, 3);
      const context = canvas.getContext('2d');
      if (!context) return;

      canvas.width = Math.floor(viewport.width * dpr);
      canvas.height = Math.floor(viewport.height * dpr);
      canvas.style.width = `${Math.floor(viewport.width)}px`;
      canvas.style.height = `${Math.floor(viewport.height)}px`;

      const task = page.render({
        canvasContext: context,
        viewport,
        transform: dpr !== 1 ? [dpr, 0, 0, dpr, 0, 0] : undefined,
      });
      renderTaskRef.current = task;

      await task.promise;
      if (renderTaskRef.current === task) {
        renderTaskRef.current = null;
        setPageRendering(false);
      }
    } catch (err) {
      const errName = (err as { name?: string })?.name;
      if (errName === 'RenderingCancelledException') {
        return;
      }
      setPageRendering(false);
    }
  }, [containerWidth, currentPage, docLoading, errorMsg, totalPages, zoomScale]);

  useEffect(() => {
    void renderCurrentPage();

    return () => {
      if (renderTaskRef.current) {
        try {
          renderTaskRef.current.cancel();
        } catch {
          // Ignore cancel error on cleanup
        }
        renderTaskRef.current = null;
      }
    };
  }, [renderCurrentPage]);

  const activeEntry = getTextbookEntryForPage(currentPage);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nextPage = Number(e.target.value);
    if (Number.isFinite(nextPage)) {
      onPageChange(Math.min(totalPages, Math.max(BOOK_MIN_PAGE, Math.round(nextPage))));
    }
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = Number.parseInt(pageInput.trim(), 10);
    if (!Number.isFinite(parsed)) {
      setPageInput(String(currentPage));
      return;
    }
    const target = Math.min(totalPages, Math.max(BOOK_MIN_PAGE, clampBookPage(parsed)));
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
    setErrorMsg(null);
    e.target.value = '';
  };

  const handleZoomOut = () => {
    setZoomScale((z) => Math.max(0.6, Number((z - 0.15).toFixed(2))));
  };

  const handleZoomIn = () => {
    setZoomScale((z) => Math.min(2.4, Number((z + 0.15).toFixed(2))));
  };

  return (
    <div className="w-full max-w-full overflow-x-hidden flex flex-col p-2 sm:p-3 lg:p-4 gap-2.5">
      {/* Cute Pastel Control Toolbar */}
      <div className="shrink-0 rounded-2xl border-2 border-amber-200/90 border-b-4 bg-white px-3 py-2.5 flex flex-wrap items-center justify-between gap-2.5 shadow-xs">
        {/* Active Topic & Page Badge */}
        <div className="flex items-center gap-2.5 min-w-0 max-w-full">
          <div className="w-9 h-9 rounded-xl bg-amber-100 border-2 border-amber-200 text-amber-700 flex items-center justify-center shrink-0">
            <BookOpen className="w-4 h-4" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-display text-xs sm:text-sm font-extrabold text-slate-800 truncate max-w-full sm:max-w-[320px]">
                {activeEntry.shortLabel[language]}
              </span>
              <span className="font-mono text-[11px] font-extrabold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-lg shrink-0 tabular-nums">
                {activeEntry.chapterRef} · {ui.book.pageBadge(currentPage, totalPages)}
              </span>
            </div>
            <div className="text-[11px] text-slate-500 font-medium truncate">
              {ui.book.title}
            </div>
          </div>
        </div>

        {/* Navigation, Quick Topic Selector, Zoom & External Tab Action */}
        <div className="flex flex-wrap items-center gap-2 w-full xl:w-auto xl:justify-end">
          {/* 14-Week Topic Quick Jump Dropdown */}
          <label className="sr-only" htmlFor="book-topic-select">
            {ui.book.quickJumpLabel}
          </label>
          <select
            id="book-topic-select"
            value={activeEntry.page}
            onChange={handleSelectChange}
            aria-label={ui.book.quickJumpLabel}
            className="w-full sm:w-auto sm:flex-1 sm:max-w-[290px] min-h-[38px] px-3 py-1.5 rounded-xl border-2 border-sky-200 bg-sky-50/60 hover:border-sky-300 focus:border-sky-400 focus:outline-none text-xs font-bold text-slate-800 cursor-pointer"
          >
            {TEXTBOOK_ENTRIES.map((entry) => (
              <option key={entry.id} value={entry.page}>
                {entry.label[language]} — {language === 'tr' ? `s. ${entry.page}` : `p. ${entry.page}`}
              </option>
            ))}
          </select>

          {/* Prev / Manual Input + Go / Next */}
          <form
            onSubmit={handleManualSubmit}
            className="inline-flex items-center gap-1 shrink-0"
          >
            <button
              type="button"
              onClick={() => onPageChange(Math.max(BOOK_MIN_PAGE, currentPage - 1))}
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
              max={totalPages}
              value={pageInput}
              onChange={(e) => setPageInput(e.target.value)}
              placeholder={ui.book.pagePlaceholder}
              aria-label={ui.book.pagePlaceholder}
              className="w-16 sm:w-20 min-h-[38px] px-2 py-1 rounded-xl border-2 border-slate-200 focus:border-amber-400 focus:outline-none bg-[#FFFDF8] font-mono text-xs font-extrabold text-center text-slate-800 tabular-nums"
            />

            <button
              type="submit"
              className="min-h-[38px] px-2.5 sm:px-3 py-1.5 rounded-xl border-2 border-amber-500 border-b-[3px] bg-amber-400 hover:bg-amber-500 active:border-b-2 active:translate-y-0.5 text-slate-900 text-xs font-display font-extrabold inline-flex items-center gap-1 transition-all whitespace-nowrap cursor-pointer"
            >
              <span>{ui.book.goBtn}</span>
              <CornerDownLeft className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage >= totalPages}
              title={ui.book.nextPageTitle}
              aria-label={ui.book.nextPageTitle}
              className="min-w-[38px] min-h-[38px] rounded-xl border-2 border-slate-200 border-b-[3px] bg-white hover:bg-slate-50 active:border-b-2 active:translate-y-0.5 disabled:opacity-35 disabled:cursor-not-allowed text-slate-700 flex items-center justify-center transition-all cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </form>

          {/* Zoom Controls (- / % / +) */}
          <div className="inline-flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={handleZoomOut}
              disabled={zoomScale <= 0.6}
              title={ui.book.zoomOutTitle}
              aria-label={ui.book.zoomOutTitle}
              className="min-w-[38px] min-h-[38px] rounded-xl border-2 border-slate-200 border-b-[3px] bg-white hover:bg-violet-50 hover:border-violet-200 active:border-b-2 active:translate-y-0.5 disabled:opacity-35 disabled:cursor-not-allowed text-slate-700 flex items-center justify-center transition-all cursor-pointer"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setZoomScale(1)}
              title={ui.book.resetZoomTitle}
              className="min-h-[38px] px-2 rounded-xl border-2 border-slate-200 bg-slate-50 hover:bg-violet-50 hover:border-violet-200 font-mono text-[11px] font-extrabold text-slate-700 tabular-nums transition-colors cursor-pointer"
            >
              {Math.round(zoomScale * 100)}%
            </button>
            <button
              type="button"
              onClick={handleZoomIn}
              disabled={zoomScale >= 2.4}
              title={ui.book.zoomInTitle}
              aria-label={ui.book.zoomInTitle}
              className="min-w-[38px] min-h-[38px] rounded-xl border-2 border-slate-200 border-b-[3px] bg-white hover:bg-violet-50 hover:border-violet-200 active:border-b-2 active:translate-y-0.5 disabled:opacity-35 disabled:cursor-not-allowed text-slate-700 flex items-center justify-center transition-all cursor-pointer"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>

          {/* Open Directly in Browser Tab */}
          <a
            href={`/books/digital-design-6e.pdf#page=${currentPage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[38px] px-3 py-1.5 rounded-xl border-2 border-emerald-300 border-b-[3px] bg-emerald-50 hover:bg-emerald-100 active:border-b-2 active:translate-y-0.5 text-emerald-900 text-xs font-display font-extrabold inline-flex items-center gap-1 transition-all whitespace-nowrap shrink-0"
          >
            {ui.book.openNewTab}
          </a>
        </div>
      </div>

      {/* High-Resolution Responsive Canvas Stage */}
      <div
        ref={stageRef}
        className="w-full h-[calc(100dvh-72px)] rounded-2xl border-2 border-slate-200 bg-slate-100/90 overflow-auto shadow-inner relative flex flex-col items-center p-3"
      >
        {(docLoading || pageRendering) && !errorMsg && (
          <div className="sticky top-2 z-20 mb-2 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border-2 border-sky-200 bg-white/95 shadow-sm text-xs font-display font-extrabold text-sky-800">
            <Loader2 className="w-3.5 h-3.5 animate-spin text-sky-600" />
            <span>{docLoading ? ui.book.loadingDoc : ui.book.loadingPage}</span>
          </div>
        )}

        {errorMsg ? (
          <div className="m-auto max-w-lg w-full rounded-3xl border-2 border-rose-200 border-b-4 bg-white p-6 sm:p-7 space-y-4 shadow-sm text-center">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-rose-100 border-2 border-rose-200 text-rose-600 flex items-center justify-center">
              <AlertCircle className="w-7 h-7" />
            </div>
            <div className="space-y-1.5">
              <h2 className="font-display text-lg sm:text-xl font-black text-slate-900">
                {ui.book.missingTitle}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {ui.book.missingDesc}
              </p>
            </div>
            <div className="rounded-2xl border-2 border-slate-200 bg-slate-50 px-3.5 py-2.5 font-mono text-xs font-bold text-slate-800 select-all break-all">
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
                onClick={() => setReloadEpoch((n) => n + 1)}
                className="min-h-[42px] px-4 py-2 rounded-2xl border-2 border-slate-200 border-b-4 bg-white hover:bg-slate-50 active:border-b-2 active:translate-y-0.5 text-slate-700 text-xs font-display font-extrabold inline-flex items-center gap-2 transition-all cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>{ui.book.retryBtn}</span>
              </button>
            </div>
          </div>
        ) : (
          <canvas
            ref={canvasRef}
            className="rounded-xl bg-white shadow-md border border-slate-200/80 block shrink-0"
          />
        )}
      </div>
    </div>
  );
};
