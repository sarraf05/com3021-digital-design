const CACHE_NAME = 'com3021-offline-v1';

const CORE_PRECACHE_URLS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon.svg',
  '/favicon.ico',
  '/pwa-192x192.png',
  '/pwa-512x512.png',
  '/pwa-maskable-512x512.png',
  '/apple-touch-icon.png',
];

const ALLOWED_EXTERNAL_HOSTS = [
  'fonts.googleapis.com',
  'fonts.gstatic.com',
  'cdn.jsdelivr.net',
  'unpkg.com',
];

function isCacheableResponse(response) {
  if (!response) return false;
  return response.status === 200 || response.type === 'opaque';
}

function shouldHandleRequest(request) {
  if (request.method !== 'GET') return false;

  let url;
  try {
    url = new URL(request.url);
  } catch {
    return false;
  }

  if (url.protocol !== 'http:' && url.protocol !== 'https:') return false;

  // Never serve stale sw.js or interfere with Vite dev HMR endpoints
  if (
    url.origin === self.location.origin &&
    (url.pathname === '/sw.js' ||
      url.pathname.startsWith('/@vite') ||
      url.pathname.startsWith('/__vite_ping') ||
      url.pathname.startsWith('/@react-refresh'))
  ) {
    return false;
  }

  return (
    url.origin === self.location.origin ||
    ALLOWED_EXTERNAL_HOSTS.some(
      (host) => url.hostname === host || url.hostname.endsWith(`.${host}`)
    )
  );
}

async function safeCacheUrl(cache, url) {
  try {
    const req = new Request(url, { cache: 'reload' });
    const res = await fetch(req);
    if (isCacheableResponse(res)) {
      await cache.put(url, res);
    }
  } catch {
    // Try standard CORS/opaque fallback for external font assets
    try {
      const res = await fetch(url);
      if (isCacheableResponse(res)) {
        await cache.put(url, res);
      }
    } catch {
      // Ignore individual non-critical precache misses
    }
  }
}

async function notifyClientsOfflineReady() {
  try {
    const clientList = await self.clients.matchAll({
      type: 'window',
      includeUncontrolled: true,
    });
    for (const client of clientList) {
      client.postMessage({ type: 'SW_OFFLINE_READY', cacheName: CACHE_NAME });
    }
  } catch {
    // Ignore client messaging errors
  }
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      await Promise.allSettled(
        CORE_PRECACHE_URLS.map((url) => safeCacheUrl(cache, url))
      );
      await self.skipWaiting();
    })()
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((oldKey) => caches.delete(oldKey))
      );
      await self.clients.claim();
      await notifyClientsOfflineReady();
    })()
  );
});

self.addEventListener('message', (event) => {
  const data = event.data;
  if (!data || typeof data !== 'object') return;

  if (data.type === 'SKIP_WAITING') {
    self.skipWaiting();
    return;
  }

  if (data.type === 'CACHE_URLS' && Array.isArray(data.urls)) {
    event.waitUntil(
      (async () => {
        const cache = await caches.open(CACHE_NAME);
        const existingKeys = await cache.keys();
        const existingSet = new Set(existingKeys.map((r) => r.url));

        const uniqueUrls = Array.from(new Set(data.urls)).filter((rawUrl) => {
          if (typeof rawUrl !== 'string') return false;
          try {
            const parsed = new URL(rawUrl, self.location.origin);
            if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return false;
            if (
              parsed.origin === self.location.origin &&
              (parsed.pathname === '/sw.js' ||
                parsed.pathname.startsWith('/@vite') ||
                parsed.pathname.startsWith('/__vite_ping'))
            ) {
              return false;
            }
            const isAllowedOrigin =
              parsed.origin === self.location.origin ||
              ALLOWED_EXTERNAL_HOSTS.some(
                (host) =>
                  parsed.hostname === host || parsed.hostname.endsWith(`.${host}`)
              );
            return isAllowedOrigin && !existingSet.has(parsed.href);
          } catch {
            return false;
          }
        });

        await Promise.allSettled(
          uniqueUrls.map(async (u) => {
            try {
              const res = await fetch(u);
              if (isCacheableResponse(res)) {
                await cache.put(u, res);
              }
            } catch {
              // Ignore failed warmup resource
            }
          })
        );

        await notifyClientsOfflineReady();
      })()
    );
  }
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (!shouldHandleRequest(request)) return;

  // Navigation requests (page loads / refreshes): Network-First with offline shell fallback
  if (request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        const cache = await caches.open(CACHE_NAME);
        try {
          const networkResponse = await fetch(request);
          if (isCacheableResponse(networkResponse)) {
            cache.put(request, networkResponse.clone()).catch(() => {});
            cache.put('/index.html', networkResponse.clone()).catch(() => {});
          }
          return networkResponse;
        } catch {
          const cachedExact = await cache.match(request);
          if (cachedExact) return cachedExact;
          const cachedIndex = await cache.match('/index.html');
          if (cachedIndex) return cachedIndex;
          const cachedRoot = await cache.match('/');
          if (cachedRoot) return cachedRoot;
          return new Response('Offline', {
            status: 503,
            statusText: 'Offline',
            headers: { 'Content-Type': 'text/plain; charset=utf-8' },
          });
        }
      })()
    );
    return;
  }

  // Static JS/CSS chunks, icons, fonts: Stale-While-Revalidate with cache persistence
  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      const cachedResponse = await cache.match(request);

      const networkPromise = fetch(request)
        .then((networkResponse) => {
          if (isCacheableResponse(networkResponse)) {
            cache.put(request, networkResponse.clone()).catch(() => {});
          }
          return networkResponse;
        })
        .catch(() => null);

      if (cachedResponse) {
        // Trigger background revalidation without blocking instant offline/cached load
        event.waitUntil(networkPromise);
        return cachedResponse;
      }

      const freshResponse = await networkPromise;
      if (freshResponse) return freshResponse;

      return new Response('', { status: 504, statusText: 'Gateway Timeout' });
    })()
  );
});
