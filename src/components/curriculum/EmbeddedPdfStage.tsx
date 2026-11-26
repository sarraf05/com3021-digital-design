import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  AlertCircle,
  BookMarked,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  FileUp,
  FolderUp,
  HardDrive,
  Loader2,
  Presentation,
  RefreshCw,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import {
  BOOK_MIN_PAGE,
  BOOK_PDF_URL,
  BOOK_TOTAL_PAGES,
} from '../../data/textbookMap';
import {
  OFFLINE_BOOK_CACHE,
  ensurePdfJsLoaded,
  hasCacheStorage,
  type PdfDocumentInitParams,
  type PdfDocumentProxy,
  type PdfLoadingTask,
  type PdfRenderTask,
} from '../../utils/pdfJsLoader';
import {
  listStoredSlideNames,
  resolveSlidePdfBuffer,
  saveSlidePdfs,
} from '../../utils/slideStorage';
import {
  PDF_MAX_SCALE,
  PDF_MIN_SCALE,
  clampPdfScale,
  usePdfGestures,
} from '../../hooks/usePdfGestures';

interface EmbeddedPdfStageProps {
  mode: 'slide' | 'book';
  targetPage: number;
  slideFile?: string;
  lectureCode?: string;
  isEnOnly: boolean;
  onOpenFullBook?: (page: number) => void;
}

export const EmbeddedPdfStage: React.FC<EmbeddedPdfStageProps> = ({
  mode,
  targetPage,
  slideFile = '',
  lectureCode = '',
  isEnOnly,
  onOpenFullBook,
}) => {
  const [viewPage, setViewPage] = useState<number>(Math.max(1, targetPage));
  const [pageInput, setPageInput] = useState<string>(String(Math.max(1, targetPage)));
  const [totalPages, setTotalPages] = useState<number>(
    mode === 'book' ? BOOK_TOTAL_PAGES : 1
  );
  const [zoomScale, setZoomScale] = useState<number>(1);
  const [docLoading, setDocLoading] = useState<boolean>(true);
  const [pageRendering, setPageRendering] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [slideMissing, setSlideMissing] = useState<boolean>(false);
  const [slideSource, setSlideSource] = useState<'public' | 'indexeddb' | null>(null);
  const [storedSlideCount, setStoredSlideCount] = useState<number>(0);
  const [uploadStatusMsg, setUploadStatusMsg] = useState<string | null>(null);
  const [isDraggingFiles, setIsDraggingFiles] = useState<boolean>(false);
  const [localBookBlobUrl, setLocalBookBlobUrl] = useState<string | null>(null);
  const [reloadEpoch, setReloadEpoch] = useState<number>(0);
  const [containerWidth, setContainerWidth] = useState<number>(0);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const slideInputRef = useRef<HTMLInputElement>(null);
  const bookFileInputRef = useRef<HTMLInputElement>(null);
  const pageInputRef = useRef<HTMLInputElement>(null);
  const pdfDocRef = useRef<PdfDocumentProxy | null>(null);
  const renderTaskRef = useRef<PdfRenderTask | null>(null);
  const renderSeqRef = useRef<number>(0);
  const lastScrolledKeyRef = useRef<string | null>(null);

  const gestures = usePdfGestures({
    stageRef,
    scale: zoomScale,
    onScaleChange: setZoomScale,
    onNextPage: () =>
      setViewPage((p) => Math.min(Math.max(1, totalPages), p + 1)),
    onPrevPage: () => setViewPage((p) => Math.max(1, p - 1)),
    disabled: slideMissing || Boolean(errorMsg) || docLoading,
  });

  // Sync viewPage whenever parent card's targetPage or active file/mode changes
  useEffect(() => {
    const safeTarget = Math.max(1, Math.round(targetPage || 1));
    setViewPage(safeTarget);
    setPageInput(String(safeTarget));
  }, [targetPage, mode, slideFile]);

  useEffect(() => {
    setPageInput(String(viewPage));
    if (stageRef.current) {
      stageRef.current.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }
  }, [viewPage, mode, slideFile]);

  useEffect(() => {
    return () => {
      if (localBookBlobUrl) {
        URL.revokeObjectURL(localBookBlobUrl);
      }
    };
  }, [localBookBlobUrl]);

  // Refresh stored IndexedDB slide count
  const refreshStoredCount = useCallback(async () => {
    const names = await listStoredSlideNames();
    setStoredSlideCount(names.length);
  }, []);

  useEffect(() => {
    if (mode === 'slide') {
      void refreshStoredCount();
    }
  }, [mode, reloadEpoch, refreshStoredCount]);

  // Observe container width for crisp fit-to-width rendering
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    const updateWidth = () => {
      setContainerWidth(el.clientWidth);
    };
    updateWidth();

    let timer: number | null = null;
    const ro = new ResizeObserver(() => {
      if (timer !== null) window.clearTimeout(timer);
      timer = window.setTimeout(updateWidth, 60);
    });
    ro.observe(el);

    return () => {
      ro.disconnect();
      if (timer !== null) window.clearTimeout(timer);
    };
  }, [slideMissing, errorMsg]);

  // Load PDF document when mode, slideFile, localBookBlobUrl, or reloadEpoch changes
  useEffect(() => {
    let cancelled = false;
    let loadingTask: PdfLoadingTask | null = null;

    const loadDoc = async () => {
      setDocLoading(true);
      setErrorMsg(null);
      setSlideMissing(false);
      setSlideSource(null);

      try {
        let docOptions: PdfDocumentInitParams;

        if (mode === 'slide') {
          const resolved = await resolveSlidePdfBuffer(slideFile);
          if (cancelled) return;

          if (!resolved) {
            pdfDocRef.current = null;
            setSlideMissing(true);
            setDocLoading(false);
            return;
          }

          setSlideSource(resolved.source);
          const { pdfjsLib, disableWorker } = await ensurePdfJsLoaded();
          if (cancelled) return;

          // Copy into a fresh Uint8Array so Worker transfer never detaches stored ArrayBuffer
          const copyBytes = new Uint8Array(resolved.buffer.slice(0));
          docOptions = {
            data: copyBytes,
            ...(disableWorker ? { disableWorker: true } : {}),
          };

          loadingTask = pdfjsLib.getDocument(docOptions);
        } else {
          const { pdfjsLib, disableWorker } = await ensurePdfJsLoaded();
          if (cancelled) return;

          let cachedBuffer: ArrayBuffer | null = null;
          if (!localBookBlobUrl && hasCacheStorage()) {
            try {
              const cache = await caches.open(OFFLINE_BOOK_CACHE);
              const cachedRes = await cache.match(BOOK_PDF_URL);
              if (cachedRes) {
                cachedBuffer = await cachedRes.arrayBuffer();
              }
            } catch {
              cachedBuffer = null;
            }
          }
          if (cancelled) return;

          docOptions = {
            disableAutoFetch: true,
            rangeChunkSize: 65536,
            ...(disableWorker ? { disableWorker: true } : {}),
            ...(cachedBuffer
              ? { data: cachedBuffer }
              : { url: localBookBlobUrl || BOOK_PDF_URL }),
          };

          loadingTask = pdfjsLib.getDocument(docOptions);
        }

        const doc = await loadingTask.promise;
        if (cancelled) {
          void doc.destroy?.();
          return;
        }

        if (pdfDocRef.current && pdfDocRef.current !== doc) {
          void pdfDocRef.current.destroy?.();
        }
        pdfDocRef.current = doc;
        setTotalPages(doc.numPages || (mode === 'book' ? BOOK_TOTAL_PAGES : 1));
      } catch (err) {
        if (cancelled) return;
        pdfDocRef.current = null;
        const msg =
          err instanceof Error && err.message
            ? err.message
            : typeof err === 'string' && err
              ? err
              : 'PDF_LOAD_FAILED';
        setErrorMsg(msg);
      } finally {
        if (!cancelled) {
          setDocLoading(false);
        }
      }
    };

    void loadDoc();

    return () => {
      cancelled = true;
      void loadingTask?.destroy?.();
      if (pdfDocRef.current) {
        void pdfDocRef.current.destroy?.();
        pdfDocRef.current = null;
      }
    };
  }, [mode, slideFile, localBookBlobUrl, reloadEpoch]);

  // Render active page to canvas
  const renderPage = useCallback(async () => {
    const doc = pdfDocRef.current;
    const canvas = canvasRef.current;
    const stage = stageRef.current;
    if (!doc || !canvas || !stage || docLoading || errorMsg || slideMissing) {
      return;
    }

    const maxPage = doc.numPages || totalPages;
    const safePage = Math.min(maxPage, Math.max(1, viewPage));

    if (renderTaskRef.current) {
      try {
        renderTaskRef.current.cancel();
      } catch {
        // Ignore cancel cleanup
      }
      renderTaskRef.current = null;
    }

    const renderId = ++renderSeqRef.current;
    setPageRendering(true);

    try {
      const page = await doc.getPage(safePage);
      if (renderSeqRef.current !== renderId) return;

      const unscaled = page.getViewport({ scale: 1 });
      const availableWidth = Math.max(240, (containerWidth || stage.clientWidth) - 28);
      const fitScale = availableWidth / unscaled.width;
      const cssScale = Math.max(0.25, fitScale * zoomScale);
      const viewport = page.getViewport({ scale: cssScale });

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const context = canvas.getContext('2d');
      if (!context) throw new Error('Canvas 2D context unavailable');

      canvas.width = Math.floor(viewport.width * dpr);
      canvas.height = Math.floor(viewport.height * dpr);
      canvas.style.width = `${Math.floor(viewport.width)}px`;
      canvas.style.height = `${Math.floor(viewport.height)}px`;

      const pageScrollKey = `${mode}:${slideFile}:${safePage}`;
      if (lastScrolledKeyRef.current !== pageScrollKey) {
        lastScrolledKeyRef.current = pageScrollKey;
        stage.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      }

      const activeTask = page.render({
        canvasContext: context,
        viewport,
        transform: dpr !== 1 ? [dpr, 0, 0, dpr, 0, 0] : undefined,
      });
      renderTaskRef.current = activeTask;

      await activeTask.promise;
    } catch (err) {
      const errName = (err as { name?: string })?.name;
      if (
        errName === 'RenderingCancelledException' ||
        renderSeqRef.current !== renderId
      ) {
        return;
      }
      const msg =
        err instanceof Error && err.message
          ? err.message
          : typeof err === 'string' && err
            ? err
            : 'PDF_PAGE_RENDER_FAILED';
      setErrorMsg(msg);
    } finally {
      if (renderSeqRef.current === renderId) {
        renderTaskRef.current = null;
        setPageRendering(false);
      }
    }
  }, [containerWidth, docLoading, errorMsg, slideMissing, totalPages, viewPage, zoomScale]);

  useEffect(() => {
    void renderPage();

    return () => {
      renderSeqRef.current += 1;
      if (renderTaskRef.current) {
        try {
          renderTaskRef.current.cancel();
        } catch {
          // Ignore cancel cleanup
        }
        renderTaskRef.current = null;
      }
    };
  }, [renderPage]);

  const handleUploadSlideFiles = async (files: FileList | File[] | null) => {
    if (!files || files.length === 0) return;
    try {
      const savedNames = await saveSlidePdfs(files);
      if (savedNames.length === 0) {
        setUploadStatusMsg(
          isEnOnly
            ? 'Please select valid .pdf files.'
            : 'Lütfen geçerli .pdf dosyaları seçin.'
        );
        return;
      }
      await refreshStoredCount();
      setUploadStatusMsg(
        isEnOnly
          ? `${savedNames.length} slide PDF(s) saved offline in IndexedDB.`
          : `${savedNames.length} slayt PDF dosyası offline olarak kaydedildi.`
      );
      setReloadEpoch((n) => n + 1);
    } catch {
      setUploadStatusMsg(
        isEnOnly
          ? 'Could not save slides to browser storage.'
          : 'Slaytlar tarayıcı deposuna kaydedilemedi.'
      );
    }
  };

  const handleSlideInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    void handleUploadSlideFiles(e.target.files);
    e.target.value = '';
  };

  const handleBookLocalPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (localBookBlobUrl) URL.revokeObjectURL(localBookBlobUrl);
    setLocalBookBlobUrl(URL.createObjectURL(file));
    setErrorMsg(null);
    e.target.value = '';
  };

  const commitPageInput = () => {
    const parsed = Number.parseInt(pageInput.trim(), 10);
    if (!Number.isFinite(parsed)) {
      setPageInput(String(viewPage));
      return;
    }
    const clamped = Math.min(Math.max(1, totalPages), Math.max(1, Math.round(parsed)));
    setViewPage(clamped);
    setPageInput(String(clamped));
  };

  const clampedDisplayPage = Math.min(Math.max(1, totalPages), Math.max(1, viewPage));

  return (
    <div className="rounded-3xl border-2 border-slate-200 border-b-4 bg-white shadow-sm overflow-hidden">
      {/* Hidden multi-file input for slide PDFs */}
      <input
        ref={slideInputRef}
        type="file"
        multiple
        accept=".pdf,application/pdf"
        onChange={handleSlideInputChange}
        className="hidden"
      />

      {/* Hidden single-file input fallback for textbook */}
      <input
        ref={bookFileInputRef}
        type="file"
        accept=".pdf,application/pdf"
        onChange={handleBookLocalPick}
        className="hidden"
      />

      {/* Top Info & Source Actions Bar */}
      <div className="px-3.5 py-2.5 border-b-2 border-slate-100 bg-slate-50/80 flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex flex-wrap items-center gap-2 min-w-0">
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl border text-[11px] font-display font-extrabold ${
              mode === 'slide'
                ? 'bg-sky-50 text-sky-800 border-sky-200'
                : 'bg-amber-50 text-amber-900 border-amber-200'
            }`}
          >
            {mode === 'slide' ? (
              <Presentation className="w-3.5 h-3.5 shrink-0" />
            ) : (
              <BookMarked className="w-3.5 h-3.5 shrink-0" />
            )}
            <span className="truncate">
              {mode === 'slide'
                ? `${lectureCode} · ${slideFile}`
                : 'Mano & Ciletti (6th Ed.)'}
            </span>
          </span>

          {mode === 'slide' && slideSource && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-emerald-50 border border-emerald-200 text-[10px] font-mono font-bold text-emerald-700">
              <HardDrive className="w-3 h-3 shrink-0" />
              <span>
                {slideSource === 'public'
                  ? '/slides'
                  : isEnOnly
                    ? 'Offline IndexedDB'
                    : 'Offline Kayıtlı'}
              </span>
            </span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2 ml-auto">
          {mode === 'slide' && !slideMissing && (
            <button
              type="button"
              onClick={() => slideInputRef.current?.click()}
              className="min-h-[30px] px-2.5 py-1 rounded-xl border border-slate-200 bg-white hover:bg-sky-50 hover:border-sky-300 text-[11px] font-bold text-slate-600 hover:text-sky-800 inline-flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <FolderUp className="w-3.5 h-3.5 text-sky-600 shrink-0" />
              <span>
                {isEnOnly ? 'Add Slide PDFs' : 'Slayt PDF Ekle'}
                {storedSlideCount > 0 ? ` (${storedSlideCount})` : ''}
              </span>
            </button>
          )}

          {mode === 'book' && onOpenFullBook && (
            <button
              type="button"
              onClick={() => onOpenFullBook(clampedDisplayPage)}
              className="min-h-[30px] px-2.5 py-1 rounded-xl border border-amber-200 bg-white hover:bg-amber-50 text-[11px] font-bold text-amber-800 inline-flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ExternalLink className="w-3 h-3 shrink-0" />
              <span>{isEnOnly ? 'Full Viewer' : 'Tam Ekran Kitap'}</span>
            </button>
          )}
        </div>
      </div>

      {uploadStatusMsg && (
        <div className="px-3.5 py-2 bg-emerald-50 border-b border-emerald-200 text-xs font-bold text-emerald-800 flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{uploadStatusMsg}</span>
          </span>
          <button
            type="button"
            onClick={() => setUploadStatusMsg(null)}
            className="text-emerald-700 hover:text-emerald-950 font-extrabold cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* Stage Body with Pinch-to-Zoom, Zoom-Guarded Swipe, Wheel Zoom & Drag-to-Pan */}
      <div
        ref={stageRef}
        onMouseDown={gestures.onMouseDown}
        style={{ touchAction: gestures.canPan ? 'pan-x pan-y' : 'pan-y' }}
        className={`relative w-full h-[56vh] min-h-[380px] max-h-[680px] bg-slate-100/90 p-3 flex flex-col ${
          gestures.canPan ? 'overflow-auto' : 'overflow-y-auto overflow-x-hidden'
        } ${
          gestures.canPan
            ? gestures.isDragging
              ? 'cursor-grabbing select-none'
              : 'cursor-grab'
            : ''
        }`}
      >
        {(docLoading || pageRendering) && !slideMissing && !errorMsg && (
          <div className="sticky top-1.5 z-10 mb-2 mx-auto inline-flex items-center gap-2 px-3 py-1 rounded-full border-2 border-sky-200 bg-white/95 shadow-xs text-[11px] font-display font-extrabold text-sky-800 shrink-0">
            <Loader2 className="w-3.5 h-3.5 animate-spin text-sky-600" />
            <span>
              {docLoading
                ? isEnOnly
                  ? 'Loading PDF...'
                  : 'PDF yükleniyor...'
                : isEnOnly
                  ? 'Rendering page...'
                  : 'Sayfa hazırlanıyor...'}
            </span>
          </div>
        )}

        {mode === 'slide' && slideMissing ? (
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDraggingFiles(true);
            }}
            onDragLeave={() => setIsDraggingFiles(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDraggingFiles(false);
              void handleUploadSlideFiles(e.dataTransfer.files);
            }}
            className={`m-auto max-w-lg w-full rounded-3xl border-2 border-dashed p-6 sm:p-7 text-center space-y-4 transition-colors ${
              isDraggingFiles
                ? 'border-sky-500 bg-sky-50/90'
                : 'border-sky-300 bg-white'
            }`}
          >
            <div className="w-12 h-12 mx-auto rounded-2xl bg-sky-100 border-2 border-sky-200 text-sky-700 flex items-center justify-center">
              <FolderUp className="w-6 h-6" />
            </div>

            <div className="space-y-1.5">
              <h4 className="font-display text-base sm:text-lg font-black text-slate-900">
                {isEnOnly
                  ? `Load Lecture Slides (${slideFile})`
                  : `Hoca Slaytını Yükle (${slideFile})`}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {isEnOnly
                  ? `No valid slide PDF was found at /slides/${slideFile} or in offline browser storage. Select all Lecture*_2p.pdf files once to cache them permanently in IndexedDB.`
                  : `/slides/${slideFile} klasöründe veya tarayıcı önbelleğinde geçerli slayt PDF'i bulunamadı. Tüm Lecture*_2p.pdf dosyalarını tek seferde seçerek IndexedDB'ye kalıcı kaydedebilirsiniz.`}
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 font-mono text-[11px] font-bold text-slate-700 select-all">
              public/slides/{slideFile}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1">
              <button
                type="button"
                onClick={() => slideInputRef.current?.click()}
                className="min-h-[44px] px-4 py-2.5 rounded-2xl border-2 border-sky-600 border-b-4 bg-sky-500 hover:bg-sky-600 active:border-b-2 active:translate-y-0.5 text-white text-xs font-display font-extrabold inline-flex items-center gap-2 shadow-xs transition-all cursor-pointer"
              >
                <FileUp className="w-4 h-4 shrink-0" />
                <span>
                  {isEnOnly
                    ? 'Upload Slide PDFs (Save Offline)'
                    : "Slayt PDF'lerini Yükle (Offline Kaydet)"}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setReloadEpoch((n) => n + 1)}
                className="min-h-[44px] px-3.5 py-2.5 rounded-2xl border-2 border-slate-200 border-b-4 bg-white hover:bg-slate-50 active:border-b-2 active:translate-y-0.5 text-slate-700 text-xs font-display font-extrabold inline-flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>{isEnOnly ? 'Retry' : 'Yeniden Dene'}</span>
              </button>
            </div>

            {storedSlideCount > 0 && (
              <p className="text-[11px] font-mono font-bold text-emerald-700">
                {isEnOnly
                  ? `${storedSlideCount} slide file(s) currently stored in IndexedDB.`
                  : `IndexedDB içinde kayıtlı ${storedSlideCount} slayt dosyası var.`}
              </p>
            )}
          </div>
        ) : errorMsg ? (
          <div className="m-auto max-w-md w-full rounded-3xl border-2 border-rose-200 border-b-4 bg-white p-5 text-center space-y-3">
            <div className="w-11 h-11 mx-auto rounded-2xl bg-rose-100 border border-rose-200 text-rose-600 flex items-center justify-center">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="font-display text-sm sm:text-base font-black text-slate-900">
                {isEnOnly ? 'Could not open PDF' : 'PDF Açılamadı'}
              </h4>
              <p className="font-mono text-[11px] font-bold text-rose-700 break-all">
                {errorMsg}
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {mode === 'book' ? (
                <button
                  type="button"
                  onClick={() => bookFileInputRef.current?.click()}
                  className="min-h-[38px] px-3.5 py-1.5 rounded-xl border-2 border-amber-400 bg-amber-50 hover:bg-amber-100 text-amber-950 text-xs font-extrabold inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <FileUp className="w-3.5 h-3.5" />
                  <span>{isEnOnly ? 'Select Textbook PDF' : 'Kitap PDF Seç'}</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => slideInputRef.current?.click()}
                  className="min-h-[38px] px-3.5 py-1.5 rounded-xl border-2 border-sky-500 bg-sky-500 hover:bg-sky-600 text-white text-xs font-extrabold inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <FileUp className="w-3.5 h-3.5" />
                  <span>
                    {isEnOnly
                      ? 'Upload Slide PDFs'
                      : "Slayt PDF'lerini Yükle"}
                  </span>
                </button>
              )}
              <button
                type="button"
                onClick={() => setReloadEpoch((n) => n + 1)}
                className="min-h-[38px] px-3.5 py-1.5 rounded-xl border-2 border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-extrabold inline-flex items-center gap-1.5 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>{isEnOnly ? 'Retry' : 'Tekrar Dene'}</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="mx-auto shrink-0" style={gestures.wrapperStyle}>
            <canvas
              ref={canvasRef}
              className="rounded-xl bg-white shadow-md border border-slate-200/80 block shrink-0 mx-auto"
            />
          </div>
        )}
      </div>

      {/* Bottom Control & Info Bar (Page Controls + Zoom Percentage + Sync Info) */}
      <div className="px-3.5 py-2 border-t-2 border-slate-100 bg-white flex flex-wrap items-center justify-between gap-2.5">
        <div className="text-[11px] font-mono font-bold text-slate-500 flex items-center gap-2">
          <span>
            {mode === 'slide'
              ? isEnOnly
                ? `Card slide p. ${targetPage}`
                : `Kart slaytı: s. ${targetPage}`
              : isEnOnly
                ? `Card book PDF p. ${targetPage}`
                : `Kart kitap PDF: s. ${targetPage}`}
          </span>
          <span className="hidden md:inline text-slate-300">·</span>
          <span className="hidden md:inline text-slate-400">
            {mode === 'book'
              ? `Mano & Ciletti · ${BOOK_MIN_PAGE}–${totalPages}`
              : slideFile}
          </span>
        </div>

        {!slideMissing && !errorMsg && (
          <div className="flex flex-wrap items-center gap-2 ml-auto">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                commitPageInput();
                pageInputRef.current?.blur();
              }}
              className="flex items-center gap-1"
            >
              <button
                type="button"
                disabled={clampedDisplayPage <= 1}
                onClick={() => setViewPage(Math.max(1, clampedDisplayPage - 1))}
                aria-label={isEnOnly ? 'Previous Page' : 'Önceki Sayfa'}
                className="w-7 h-7 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 disabled:opacity-35 disabled:cursor-not-allowed text-slate-700 flex items-center justify-center cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>

              <input
                ref={pageInputRef}
                type="number"
                inputMode="numeric"
                min={1}
                max={totalPages}
                value={pageInput}
                onChange={(e) => setPageInput(e.target.value)}
                onBlur={commitPageInput}
                aria-label={isEnOnly ? 'Page Number' : 'Sayfa Numarası'}
                className="w-12 h-7 px-1 rounded-lg border border-slate-200 bg-white font-mono text-xs font-extrabold text-center text-slate-800 tabular-nums focus:outline-none focus:border-sky-400"
              />
              <span className="font-mono text-[11px] font-bold text-slate-500 tabular-nums px-0.5">
                / {totalPages}
              </span>

              <button
                type="button"
                disabled={clampedDisplayPage >= totalPages}
                onClick={() =>
                  setViewPage(Math.min(totalPages, clampedDisplayPage + 1))
                }
                aria-label={isEnOnly ? 'Next Page' : 'Sonraki Sayfa'}
                className="w-7 h-7 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 disabled:opacity-35 disabled:cursor-not-allowed text-slate-700 flex items-center justify-center cursor-pointer"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </form>

            <div className="h-4 w-px bg-slate-200" aria-hidden="true" />

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setZoomScale((z) => clampPdfScale(z - 0.15))}
                disabled={zoomScale <= PDF_MIN_SCALE}
                aria-label={isEnOnly ? 'Zoom Out' : 'Uzaklaştır'}
                className="w-7 h-7 rounded-lg border border-slate-200 bg-slate-50 hover:bg-violet-50 disabled:opacity-35 text-slate-700 flex items-center justify-center cursor-pointer"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setZoomScale(1)}
                title={isEnOnly ? 'Reset Zoom (100%)' : 'Yakınlaştırmayı Sıfırla (%100)'}
                className="h-7 px-2 rounded-lg border border-slate-200 bg-slate-50 hover:bg-violet-50 font-mono text-[11px] font-extrabold text-slate-700 tabular-nums cursor-pointer"
              >
                {Math.round(gestures.liveScale * 100)}%
              </button>
              <button
                type="button"
                onClick={() => setZoomScale((z) => clampPdfScale(z + 0.15))}
                disabled={zoomScale >= PDF_MAX_SCALE}
                aria-label={isEnOnly ? 'Zoom In' : 'Yakınlaştır'}
                className="w-7 h-7 rounded-lg border border-slate-200 bg-slate-50 hover:bg-violet-50 disabled:opacity-35 text-slate-700 flex items-center justify-center cursor-pointer"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
