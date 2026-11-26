export const OFFLINE_BOOK_CACHE = 'dd-offline-book-v1';

export const PDFJS_CDN_URL =
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
export const PDFJS_WORKER_URL =
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

export interface PdfViewport {
  width: number;
  height: number;
}

export interface PdfRenderTask {
  promise: Promise<void>;
  cancel: () => void;
}

export interface PdfPageProxy {
  getViewport: (opts: { scale: number }) => PdfViewport;
  render: (params: {
    canvasContext: CanvasRenderingContext2D;
    viewport: PdfViewport;
    transform?: number[];
  }) => PdfRenderTask;
}

export interface PdfDocumentProxy {
  numPages: number;
  getPage: (pageNumber: number) => Promise<PdfPageProxy>;
  destroy?: () => Promise<void>;
}

export interface PdfLoadingTask {
  promise: Promise<PdfDocumentProxy>;
  destroy?: () => Promise<void>;
}

export interface PdfDocumentInitParams {
  url?: string;
  data?: ArrayBuffer | Uint8Array;
  disableAutoFetch?: boolean;
  rangeChunkSize?: number;
  disableWorker?: boolean;
}

export interface PdfJsGlobal {
  GlobalWorkerOptions: { workerSrc: string };
  getDocument: (src: string | PdfDocumentInitParams) => PdfLoadingTask;
}

declare global {
  interface Window {
    pdfjsLib?: PdfJsGlobal;
  }
}

export interface WorkerConfig {
  workerSrc: string;
  disableWorker: boolean;
}

export function hasCacheStorage(): boolean {
  return typeof window !== 'undefined' && 'caches' in window;
}

let pdfJsLoadPromise: Promise<PdfJsGlobal> | null = null;
let cachedWorkerBlobUrl: string | null = null;

export function resetCachedWorkerBlobUrl(): void {
  cachedWorkerBlobUrl = null;
}

export async function resolveWorkerConfig(): Promise<WorkerConfig> {
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

export async function ensurePdfJsLoaded(): Promise<{
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
          'script[data-pdfjs-cdn="true"]'
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
