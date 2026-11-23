import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  AlertCircle,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Download,
  ExternalLink,
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
  getTextbookEntryForPage,
} from '../../data/textbookMap';
import { UI_STRINGS } from '../../i18n/translations';

const OFFLINE_BOOK_CACHE = 'dd-offline-book-v1';

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

interface PdfDocumentInitParams {
  url?: string;
  data?: ArrayBuffer | Uint8Array;
  disableAutoFetch?: boolean;
  rangeChunkSize?: number;
  disableWorker?: boolean;
}

interface PdfJsGlobal {
  GlobalWorkerOptions: { workerSrc: string };
  getDocument: (src: string | PdfDocumentInitParams) => PdfLoadingTask;
}

declare global {
  interface Window {
    pdfjsLib?: PdfJsGlobal;
  }
}

interface WorkerConfig {
  workerSrc: string;
  disableWorker: boolean;
}

function hasCacheStorage(): boolean {
  return typeof window !== 'undefined' && 'caches' in window;
}

let pdfJsLoadPromise: Promise<PdfJsGlobal> | null = null;
let cachedWorkerBlobUrl: string | null = null;

async function resolveWorkerConfig(): Promise<WorkerConfig> {
  if (cachedWorkerBlobUrl) {
    return { workerSrc: cachedWorkerBlobUrl, disableWorker: false };
  }

  // 1. Try Cache API first if available (offline-saved worker)
  if (hasCacheStorage()) {
    try {
      const cachedWorker = await caches.match(PDFJS_WORKER_URL);
      if (cachedWorker) {
        const workerText = await cachedWorker.text();
        if (workerText.length > 0) {
          const blob = new Blob([workerText], { type: 'application/javascript' });
          cachedWorkerBlobUrl = URL.createObjectURL(blob);
          return { workerSrc: cachedWorkerBlobUrl, disableWorker: false };
        }
      }
    } catch {
      // Fall through to network fetch + Blob URL
    }
  }

  // 2. Fetch worker script as text and create same-origin Blob URL (bypasses Safari cross-origin Worker block)
  try {
    const response = await fetch(PDFJS_WORKER_URL, { mode: 'cors' });
    if (!response.ok) {
      throw new Error(`Worker fetch HTTP ${response.status}`);
    }
    const workerText = await response.text();
    if (!workerText || workerText.length === 0) {
      throw new Error('Empty worker script');
    }
    const blob = new Blob([workerText], { type: 'application/javascript' });
    cachedWorkerBlobUrl = URL.createObjectURL(blob);
    return { workerSrc: cachedWorkerBlobUrl, disableWorker: false };
  } catch {
    // 3. Fallback: disable Web Worker so PDF.js runs cleanly on main thread in restricted WebKit contexts
    return { workerSrc: PDFJS_WORKER_URL, disableWorker: true };
  }
}

async function ensurePdfJsLoaded(): Promise<{
  pdfjsLib: PdfJsGlobal;
  disableWorker: boolean;
}> {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('Window unavailable'));
  }

  const workerConfig = await resolveWorkerConfig();

  if (window.pdfjsLib) {
    window.pdfjsLib.GlobalWorkerOptions.workerSrc = workerConfig.workerSrc;
    return {
      pdfjsLib: window.pdfjsLib,
      disableWorker: workerConfig.disableWorker,
    };
  }

  if (!pdfJsLoadPromise) {
    pdfJsLoadPromise = (async () => {
      let scriptBlobUrl: string | null = null;
      if (hasCacheStorage()) {
        try {
          const cachedScript = await caches.match(PDFJS_CDN_URL);
          if (cachedScript) {
            const scriptText = await cachedScript.text();
            if (scriptText.length > 0) {
              scriptBlobUrl = URL.createObjectURL(
                new Blob([scriptText], { type: 'application/javascript' })
              );
            }
          }
        } catch {
          // Fallback to network CDN script
        }
      }

      return new Promise<PdfJsGlobal>((resolve, reject) => {
        const existingScript = document.querySelector<HTMLScriptElement>(
          `script[data-pdfjs-cdn="true"]`
        );

        const finalize = () => {
          if (scriptBlobUrl) {
            URL.revokeObjectURL(scriptBlobUrl);
            scriptBlobUrl = null;
          }
          if (window.pdfjsLib) {
            window.pdfjsLib.GlobalWorkerOptions.workerSrc = workerConfig.workerSrc;
            resolve(window.pdfjsLib);
          } else {
            pdfJsLoadPromise = null;
            reject(new Error('pdfjsLib did not initialize'));
          }
        };

        const handleError = () => {
          if (scriptBlobUrl) {
            URL.revokeObjectURL(scriptBlobUrl);
            scriptBlobUrl = null;
          }
          pdfJsLoadPromise = null;
          reject(new Error('Failed to load PDF.js script from CDN'));
        };

        if (existingScript && window.pdfjsLib) {
          finalize();
          return;
        }

        if (existingScript) {
          existingScript.addEventListener('load', finalize, { once: true });
          existingScript.addEventListener('error', handleError, { once: true });
          return;
        }

        const script = document.createElement('script');
        script.dataset.pdfjsCdn = 'true';
        script.src = scriptBlobUrl || PDFJS_CDN_URL;
        script.async = true;
        script.onload = finalize;
        script.onerror = handleError;
        document.head.appendChild(script);
      });
    })();
  }

  const pdfjsLib = await pdfJsLoadPromise;
  pdfjsLib.GlobalWorkerOptions.workerSrc = workerConfig.workerSrc;
  return {
    pdfjsLib,
    disableWorker: workerConfig.disableWorker,
  };
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

  // Cache API offline states
  const [isOfflineSaved, setIsOfflineSaved] = useState<boolean>(false);
  const [isSavingOffline, setIsSavingOffline] = useState<boolean>(false);
  const [confirmRemoveOffline, setConfirmRemoveOffline] = useState<boolean>(false);
  const [offlineSaveError, setOfflineSaveError] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const pageInputRef = useRef<HTMLInputElement>(null);
  const pdfDocRef = useRef<PdfDocumentProxy | null>(null);
  const renderTaskRef = useRef<PdfRenderTask | null>(null);
  const renderSeqRef = useRef<number>(0);

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

  // Check if textbook PDF is already cached inside Cache API ('dd-offline-book-v1')
  useEffect(() => {
    if (!hasCacheStorage()) return;
    let cancelled = false;

    const checkCache = async () => {
      try {
        const cache = await caches.open(OFFLINE_BOOK_CACHE);
        const match = await cache.match(BOOK_PDF_URL);
        if (!cancelled) {
          setIsOfflineSaved(Boolean(match));
        }
      } catch {
        if (!cancelled) {
          setIsOfflineSaved(false);
        }
      }
    };

    void checkCache();
    return () => {
      cancelled = true;
    };
  }, []);

  // Watch container width via ResizeObserver for automatic fit-to-width on rotate/resize
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
      resizeTimer = window.setTimeout(updateWidth, 60);
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

  // Load PDF document from Cache API ArrayBuffer when saved offline, else via URL
  useEffect(() => {
    let cancelled = false;
    let loadingTask: PdfLoadingTask | null = null;

    const loadDocument = async () => {
      setDocLoading(true);
      setErrorMsg(null);

      try {
        const { pdfjsLib, disableWorker } = await ensurePdfJsLoaded();
        if (cancelled) return;

        let cachedBuffer: ArrayBuffer | null = null;
        if (!localBlobUrl && hasCacheStorage()) {
          try {
            const cache = await caches.open(OFFLINE_BOOK_CACHE);
            const cachedResponse = await cache.match(BOOK_PDF_URL);
            if (cachedResponse) {
              setIsOfflineSaved(true);
              cachedBuffer = await cachedResponse.arrayBuffer();
            }
          } catch {
            cachedBuffer = null;
          }
        }

        if (cancelled) return;

        const docOptions: PdfDocumentInitParams = {
          disableAutoFetch: true,
          rangeChunkSize: 65536,
          ...(disableWorker ? { disableWorker: true } : {}),
          ...(cachedBuffer ? { data: cachedBuffer } : { url: pdfSourceUrl }),
        };

        loadingTask = pdfjsLib.getDocument(docOptions);
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
      } catch (err) {
        if (cancelled) return;
        pdfDocRef.current = null;
        const message =
          err instanceof Error && err.message
            ? err.message
            : typeof err === 'string' && err
              ? err
              : 'PDF_LOAD_FAILED';
        setErrorMsg(message);
      } finally {
        if (!cancelled) {
          setDocLoading(false);
        }
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
  }, [localBlobUrl, pdfSourceUrl, reloadEpoch]);

  // Render only the selected page onto crisp Retina <canvas> (DPR capped at 2 for iOS Safari memory limit)
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

    const renderId = ++renderSeqRef.current;
    let activeTask: PdfRenderTask | null = null;
    setPageRendering(true);

    try {
      const page = await doc.getPage(safePage);
      if (renderSeqRef.current !== renderId) return;

      const unscaledViewport = page.getViewport({ scale: 1 });
      // Subtract horizontal padding (24px) + hairline margin (4px) so zoom=1 fits cleanly without horizontal overflow
      const availableWidth = Math.max(240, (containerWidth || stage.clientWidth) - 28);
      const fitWidthScale = availableWidth / unscaledViewport.width;
      const cssScale = Math.max(0.25, fitWidthScale * zoomScale);
      const viewport = page.getViewport({ scale: cssScale });

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const context = canvas.getContext('2d');
      if (!context) {
        throw new Error('Canvas 2D context unavailable');
      }

      canvas.width = Math.floor(viewport.width * dpr);
      canvas.height = Math.floor(viewport.height * dpr);
      canvas.style.width = `${Math.floor(viewport.width)}px`;
      canvas.style.height = `${Math.floor(viewport.height)}px`;

      activeTask = page.render({
        canvasContext: context,
        viewport,
        transform: dpr !== 1 ? [dpr, 0, 0, dpr, 0, 0] : undefined,
      });
      renderTaskRef.current = activeTask;

      await activeTask.promise;
    } catch (err) {
      const errName = (err as { name?: string })?.name;
      if (errName === 'RenderingCancelledException' || renderSeqRef.current !== renderId) {
        return;
      }
      const message =
        err instanceof Error && err.message
          ? err.message
          : typeof err === 'string' && err
            ? err
            : 'PDF_PAGE_RENDER_FAILED';
      setErrorMsg(message);
    } finally {
      if (renderSeqRef.current === renderId) {
        renderTaskRef.current = null;
        setPageRendering(false);
      }
    }
  }, [containerWidth, currentPage, docLoading, errorMsg, totalPages, zoomScale]);

  useEffect(() => {
    void renderCurrentPage();

    return () => {
      renderSeqRef.current += 1;
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

  const handleSaveOffline = async () => {
    if (!hasCacheStorage() || isSavingOffline) {
      return;
    }
    setIsSavingOffline(true);
    setOfflineSaveError(false);

    try {
      const cache = await caches.open(OFFLINE_BOOK_CACHE);

      const fetchAndCache = async (url: string, cors = false) => {
        const res = await fetch(url, cors ? { mode: 'cors' } : undefined);
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        await cache.put(url, res);
      };

      await Promise.all([
        fetchAndCache(BOOK_PDF_URL, false),
        fetchAndCache(PDFJS_CDN_URL, true),
        fetchAndCache(PDFJS_WORKER_URL, true),
      ]);

      // Upgrade active workerSrc to Blob URL backed by cached worker script
      if (window.pdfjsLib) {
        cachedWorkerBlobUrl = null;
        const workerConfig = await resolveWorkerConfig();
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = workerConfig.workerSrc;
      }

      setIsOfflineSaved(true);
      setConfirmRemoveOffline(false);
    } catch {
      setOfflineSaveError(true);
    } finally {
      setIsSavingOffline(false);
    }
  };

  const handleRemoveOfflineCache = async () => {
    if (!hasCacheStorage()) return;
    try {
      await caches.delete(OFFLINE_BOOK_CACHE);
      setIsOfflineSaved(false);
      setConfirmRemoveOffline(false);
    } catch {
      setConfirmRemoveOffline(false);
    }
  };

  const activeEntry = getTextbookEntryForPage(currentPage);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nextPage = Number(e.target.value);
    if (Number.isFinite(nextPage)) {
      onPageChange(Math.min(totalPages, Math.max(BOOK_MIN_PAGE, Math.round(nextPage))));
    }
  };

  const commitPageInput = () => {
    const parsed = Number.parseInt(pageInput.trim(), 10);
    if (!Number.isFinite(parsed)) {
      setPageInput(String(currentPage));
      return;
    }
    const target = Math.min(totalPages, Math.max(BOOK_MIN_PAGE, Math.round(parsed)));
    setPageInput(String(target));
    if (target !== currentPage) {
      onPageChange(target);
    }
  };

  const handlePageFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    commitPageInput();
    pageInputRef.current?.blur();
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

  const supportsCacheApi = hasCacheStorage();

  return (
    <div className="w-full max-w-full overflow-x-hidden flex flex-col p-1.5 sm:p-2.5 gap-2">
      {/* Compact Single-Row Top Bar */}
      <div className="shrink-0 h-12 sm:h-14 px-3 rounded-2xl border-2 border-amber-200/90 bg-white flex items-center justify-between gap-2 shadow-xs overflow-hidden">
        {/* Left: 14-Week & Lab Topic Quick-Jump Select */}
        <div className="flex items-center gap-2 min-w-0">
          <label className="sr-only" htmlFor="book-topic-select">
            {ui.book.quickJumpLabel}
          </label>
          <select
            id="book-topic-select"
            value={activeEntry.page}
            onChange={handleSelectChange}
            aria-label={ui.book.quickJumpLabel}
            className="max-w-[180px] sm:max-w-xs truncate min-h-[36px] px-2.5 py-1 rounded-xl border-2 border-sky-200 bg-sky-50/70 hover:border-sky-300 focus:border-sky-400 focus:outline-none text-xs sm:text-sm font-bold text-slate-800 cursor-pointer"
          >
            {TEXTBOOK_ENTRIES.map((entry) => (
              <option key={entry.id} value={entry.page}>
                {entry.label[language]} — {language === 'tr' ? `s. ${entry.page}` : `p. ${entry.page}`}
              </option>
            ))}
          </select>
        </div>

        {/* Right: Offline Save/Ready Button + Open in New Tab */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {supportsCacheApi && (
            <>
              {!isOfflineSaved ? (
                <button
                  type="button"
                  onClick={() => {
                    void handleSaveOffline();
                  }}
                  disabled={isSavingOffline}
                  className="min-h-[36px] px-2.5 sm:px-3 py-1 rounded-xl border-2 border-sky-300 border-b-[3px] bg-sky-50 hover:bg-sky-100 active:border-b-2 active:translate-y-0.5 disabled:opacity-70 text-sky-900 text-xs font-display font-extrabold inline-flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer"
                >
                  {isSavingOffline ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-sky-600 shrink-0" />
                  ) : (
                    <Download className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                  )}
                  <span className="sm:hidden">
                    {isSavingOffline ? ui.book.offlineSaving : ui.book.offlineSaveShort}
                  </span>
                  <span className="hidden sm:inline">
                    {isSavingOffline ? ui.book.offlineSaving : ui.book.offlineSaveBtn}
                  </span>
                </button>
              ) : !confirmRemoveOffline ? (
                <button
                  type="button"
                  onClick={() => setConfirmRemoveOffline(true)}
                  title={ui.book.offlineReadyTitle}
                  className="min-h-[36px] px-2.5 sm:px-3 py-1 rounded-xl border-2 border-emerald-300 border-b-[3px] bg-emerald-50 hover:bg-emerald-100 active:border-b-2 active:translate-y-0.5 text-emerald-800 text-xs font-display font-extrabold inline-flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="sm:hidden">{ui.book.offlineReadyShort}</span>
                  <span className="hidden sm:inline">{ui.book.offlineReadyBadge}</span>
                </button>
              ) : (
                <div className="inline-flex items-center gap-1 rounded-xl border-2 border-rose-200 bg-rose-50 px-2 py-1">
                  <span className="hidden md:inline text-[11px] font-bold text-rose-900 whitespace-nowrap">
                    {ui.book.offlineRemovePrompt}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      void handleRemoveOfflineCache();
                    }}
                    className="min-h-[26px] px-2 rounded-lg bg-rose-500 hover:bg-rose-600 text-white text-[11px] font-extrabold transition-colors cursor-pointer whitespace-nowrap"
                  >
                    {ui.book.offlineRemoveYes}
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmRemoveOffline(false)}
                    className="min-h-[26px] px-2 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 text-[11px] font-bold transition-colors cursor-pointer whitespace-nowrap"
                  >
                    {ui.book.offlineRemoveCancel}
                  </button>
                </div>
              )}
            </>
          )}

          <a
            href={`/books/digital-design-6e.pdf#page=${currentPage}`}
            target="_blank"
            rel="noopener noreferrer"
            title={ui.book.openNewTab}
            aria-label={ui.book.openNewTab}
            className="min-h-[36px] px-2.5 sm:px-3 py-1 rounded-xl border-2 border-emerald-300 border-b-[3px] bg-emerald-50 hover:bg-emerald-100 active:border-b-2 active:translate-y-0.5 text-emerald-900 text-xs font-display font-extrabold inline-flex items-center gap-1.5 transition-all whitespace-nowrap shrink-0"
          >
            <ExternalLink className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
            <span className="hidden sm:inline">{ui.book.openNewTabShort}</span>
          </a>
        </div>
      </div>

      {/* Inline error feedback if offline save fails */}
      {offlineSaveError && (
        <div
          role="alert"
          className="shrink-0 rounded-xl border-2 border-rose-200 bg-rose-50 px-3 py-2 text-xs font-bold text-rose-800 flex items-center justify-between gap-2"
        >
          <span>{ui.book.offlineSaveError}</span>
          <button
            type="button"
            onClick={() => setOfflineSaveError(false)}
            className="text-rose-600 hover:text-rose-900 font-extrabold cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* High-Resolution Responsive Canvas Stage + Floating Bottom Capsule */}
      <div className="relative w-full h-[calc(100dvh-115px)] rounded-2xl border-2 border-slate-200 bg-slate-100/90 shadow-inner overflow-hidden">
        <div
          ref={stageRef}
          className={`w-full h-full px-3 pt-3 pb-20 flex flex-col ${
            zoomScale > 1 ? 'overflow-auto' : 'overflow-y-auto overflow-x-hidden'
          }`}
        >
          {(docLoading || pageRendering) && !errorMsg && (
            <div className="sticky top-2 z-10 mb-2 mx-auto inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border-2 border-sky-200 bg-white/95 shadow-sm text-xs font-display font-extrabold text-sky-800 shrink-0">
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
              <div className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-left font-mono text-[11px] font-bold text-rose-700 break-all">
                <span className="text-rose-500 mr-1.5">{ui.book.errorDetailLabel}</span>
                <span>{errorMsg}</span>
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
              className="rounded-xl bg-white shadow-md border border-slate-200/80 block shrink-0 mx-auto"
            />
          )}
        </div>

        {/* Floating Bottom Control Capsule */}
        {!errorMsg && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 max-w-[95vw] px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md shadow-lg border border-slate-200 flex items-center gap-2">
            {/* Prev / Direct Page Input / Total / Next */}
            <form
              onSubmit={handlePageFormSubmit}
              className="flex items-center gap-1.5 shrink-0"
            >
              <button
                type="button"
                onClick={() => onPageChange(Math.max(BOOK_MIN_PAGE, currentPage - 1))}
                disabled={currentPage <= BOOK_MIN_PAGE}
                title={ui.book.prevPageTitle}
                aria-label={ui.book.prevPageTitle}
                className="w-8 h-8 rounded-full hover:bg-slate-100 active:bg-slate-200 disabled:opacity-35 disabled:cursor-not-allowed text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <input
                ref={pageInputRef}
                type="number"
                inputMode="numeric"
                min={BOOK_MIN_PAGE}
                max={totalPages}
                value={pageInput}
                onChange={(e) => setPageInput(e.target.value)}
                onBlur={commitPageInput}
                aria-label={ui.book.pagePlaceholder}
                className="w-12 sm:w-14 h-8 px-1.5 rounded-full border border-slate-200 focus:border-amber-400 focus:outline-none bg-slate-50/90 font-mono text-xs font-extrabold text-center text-slate-800 tabular-nums"
              />

              <span className="font-mono text-xs font-bold text-slate-500 tabular-nums whitespace-nowrap">
                / {totalPages}
              </span>

              <button
                type="button"
                onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage >= totalPages}
                title={ui.book.nextPageTitle}
                aria-label={ui.book.nextPageTitle}
                className="w-8 h-8 rounded-full hover:bg-slate-100 active:bg-slate-200 disabled:opacity-35 disabled:cursor-not-allowed text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </form>

            <div className="h-5 w-px bg-slate-200 shrink-0" aria-hidden="true" />

            {/* Zoom Controls (- / optional % reset / +) */}
            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={handleZoomOut}
                disabled={zoomScale <= 0.6}
                title={ui.book.zoomOutTitle}
                aria-label={ui.book.zoomOutTitle}
                className="w-8 h-8 rounded-full hover:bg-violet-50 active:bg-violet-100 disabled:opacity-35 disabled:cursor-not-allowed text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
              >
                <ZoomOut className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setZoomScale(1)}
                title={ui.book.resetZoomTitle}
                className="hidden sm:inline-flex items-center justify-center h-7 px-2 rounded-full hover:bg-violet-50 font-mono text-[11px] font-extrabold text-slate-600 tabular-nums transition-colors cursor-pointer"
              >
                {Math.round(zoomScale * 100)}%
              </button>

              <button
                type="button"
                onClick={handleZoomIn}
                disabled={zoomScale >= 2.4}
                title={ui.book.zoomInTitle}
                aria-label={ui.book.zoomInTitle}
                className="w-8 h-8 rounded-full hover:bg-violet-50 active:bg-violet-100 disabled:opacity-35 disabled:cursor-not-allowed text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookViewer;
