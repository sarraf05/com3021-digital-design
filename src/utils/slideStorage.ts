const SLIDE_DB_NAME = 'com3021-slides-db';
const SLIDE_DB_VERSION = 1;
const SLIDE_STORE_NAME = 'slides';

export interface StoredSlideRecord {
  fileName: string;
  data: ArrayBuffer;
  size: number;
  updatedAt: number;
}

export interface ResolvedSlidePdf {
  source: 'public' | 'indexeddb';
  buffer: ArrayBuffer;
}

function isPdfBuffer(buffer: ArrayBuffer): boolean {
  if (buffer.byteLength < 5) return false;
  const header = new Uint8Array(buffer, 0, 5);
  // "%PDF-"
  return (
    header[0] === 0x25 &&
    header[1] === 0x50 &&
    header[2] === 0x44 &&
    header[3] === 0x46 &&
    header[4] === 0x2d
  );
}

function openSlidesDb(): Promise<IDBDatabase> {
  if (typeof window === 'undefined' || !('indexedDB' in window)) {
    return Promise.reject(new Error('IndexedDB unavailable'));
  }

  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open(SLIDE_DB_NAME, SLIDE_DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(SLIDE_STORE_NAME)) {
        db.createObjectStore(SLIDE_STORE_NAME, { keyPath: 'fileName' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () =>
      reject(request.error ?? new Error('Failed to open IndexedDB'));
  });
}

export async function saveSlidePdfs(
  files: FileList | File[]
): Promise<string[]> {
  const fileArray = Array.from(files).filter(
    (f) => f.name.toLowerCase().endsWith('.pdf') || f.type === 'application/pdf'
  );
  if (fileArray.length === 0) return [];

  const records: StoredSlideRecord[] = await Promise.all(
    fileArray.map(async (file) => ({
      fileName: file.name.trim(),
      data: await file.arrayBuffer(),
      size: file.size,
      updatedAt: Date.now(),
    }))
  );

  const db = await openSlidesDb();
  return new Promise<string[]>((resolve, reject) => {
    const tx = db.transaction(SLIDE_STORE_NAME, 'readwrite');
    const store = tx.objectStore(SLIDE_STORE_NAME);

    for (const rec of records) {
      store.put(rec);
    }

    tx.oncomplete = () => {
      db.close();
      resolve(records.map((r) => r.fileName));
    };
    tx.onerror = () => {
      db.close();
      reject(tx.error ?? new Error('Failed to store slides in IndexedDB'));
    };
    tx.onabort = () => {
      db.close();
      reject(tx.error ?? new Error('IndexedDB transaction aborted'));
    };
  });
}

export async function getSlideFromIndexedDB(
  fileName: string
): Promise<ArrayBuffer | null> {
  try {
    const db = await openSlidesDb();
    return await new Promise<ArrayBuffer | null>((resolve) => {
      const tx = db.transaction(SLIDE_STORE_NAME, 'readonly');
      const store = tx.objectStore(SLIDE_STORE_NAME);
      const req = store.get(fileName);

      req.onsuccess = () => {
        const record = req.result as StoredSlideRecord | undefined;
        db.close();
        if (record?.data && isPdfBuffer(record.data)) {
          resolve(record.data);
        } else {
          resolve(null);
        }
      };
      req.onerror = () => {
        db.close();
        resolve(null);
      };
    });
  } catch {
    return null;
  }
}

export async function listStoredSlideNames(): Promise<string[]> {
  try {
    const db = await openSlidesDb();
    return await new Promise<string[]>((resolve) => {
      const tx = db.transaction(SLIDE_STORE_NAME, 'readonly');
      const store = tx.objectStore(SLIDE_STORE_NAME);
      const req = store.getAllKeys();

      req.onsuccess = () => {
        db.close();
        resolve((req.result as IDBValidKey[]).map(String));
      };
      req.onerror = () => {
        db.close();
        resolve([]);
      };
    });
  } catch {
    return [];
  }
}

export async function resolveSlidePdfBuffer(
  fileName: string
): Promise<ResolvedSlidePdf | null> {
  if (!fileName) return null;

  // 1. Check /slides/${fileName} first (bundled public/slides/ folder)
  try {
    const url = `/slides/${encodeURIComponent(fileName)}`;
    const response = await fetch(url);
    if (response.ok) {
      const contentType = (response.headers.get('content-type') || '').toLowerCase();
      if (!contentType.includes('text/html')) {
        const buffer = await response.arrayBuffer();
        if (isPdfBuffer(buffer)) {
          return { source: 'public', buffer };
        }
      }
    }
  } catch {
    // Offline or missing from public/slides -> fall through to IndexedDB
  }

  // 2. Check IndexedDB offline storage
  const idbBuffer = await getSlideFromIndexedDB(fileName);
  if (idbBuffer) {
    return { source: 'indexeddb', buffer: idbBuffer };
  }

  return null;
}
