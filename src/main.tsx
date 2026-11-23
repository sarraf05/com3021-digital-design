import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import {ErrorBoundary} from './components/curriculum/ErrorBoundary.tsx';
import {SessionProvider} from './context/SessionContext.tsx';
import './index.css';

if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  if (import.meta.env.PROD) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js', {scope: '/'})
        .then(async (registration) => {
          // If an updated worker is waiting, let it take over cleanly
          if (registration.waiting) {
            registration.waiting.postMessage({type: 'SKIP_WAITING'});
          }

          const readyReg = await navigator.serviceWorker.ready;
          const activeWorker = readyReg.active || navigator.serviceWorker.controller;

          // Warm-cache active document, CSS/JS chunks, and loaded fonts on very first online visit
          if (activeWorker) {
            const urls = new Set<string>([window.location.href]);
            document
              .querySelectorAll<HTMLScriptElement | HTMLLinkElement>(
                'script[src], link[rel="stylesheet"][href]'
              )
              .forEach((el) => {
                const src =
                  el instanceof HTMLScriptElement ? el.src : el.href;
                if (src) urls.add(src);
              });

            if (typeof performance !== 'undefined' && performance.getEntriesByType) {
              performance.getEntriesByType('resource').forEach((entry) => {
                if (entry.name) urls.add(entry.name);
              });
            }

            activeWorker.postMessage({
              type: 'CACHE_URLS',
              urls: Array.from(urls),
            });
          }

          window.dispatchEvent(new CustomEvent('com3021-sw-ready'));
        })
        .catch(() => {
          // Ignore Service Worker registration errors in unsupported/restricted contexts
        });
    });
  } else {
    // In Vite dev preview, never allow a Service Worker to serve stale /src or /node_modules/.vite deps
    navigator.serviceWorker
      .getRegistrations()
      .then(async (registrations) => {
        const hadRegs = registrations.length > 0;
        await Promise.all(registrations.map((reg) => reg.unregister()));
        if ('caches' in window) {
          const keys = await caches.keys();
          await Promise.all(
            keys
              .filter(
                (key) =>
                  key !== 'dd-offline-book-v1' &&
                  (key.startsWith('com3021-offline-') ||
                    key.startsWith('workbox-'))
              )
              .map((key) => caches.delete(key))
          );
        }
        if (hadRegs && navigator.serviceWorker.controller) {
          window.location.reload();
        }
      })
      .catch(() => {
        // Ignore cleanup errors
      });
  }
}

createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <SessionProvider>
      <App />
    </SessionProvider>
  </ErrorBoundary>
);
