import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import {SessionProvider} from './context/SessionContext.tsx';
import './index.css';

if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
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
}

createRoot(document.getElementById('root')!).render(
  <SessionProvider>
    <App />
  </SessionProvider>
);
