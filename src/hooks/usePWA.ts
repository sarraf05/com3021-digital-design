import { useCallback, useEffect, useState } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

function checkIsStandalone(): boolean {
  if (typeof window === 'undefined') return false;
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as Navigator & { standalone?: boolean }).standalone === true
  );
}

function checkIsIOS(): boolean {
  if (typeof window === 'undefined') return false;
  const ua = window.navigator.userAgent;
  const isAppleMobile = /iphone|ipad|ipod/i.test(ua);
  const isIPadOSDesktop =
    navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;
  return isAppleMobile || isIPadOSDesktop;
}

export interface PWAStatus {
  isOnline: boolean;
  isOfflineReady: boolean;
  isInstallable: boolean;
  isInstalled: boolean;
  isIOS: boolean;
  install: () => Promise<boolean>;
}

export function usePWA(): PWAStatus {
  const [isOnline, setIsOnline] = useState<boolean>(() =>
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );
  const [isOfflineReady, setIsOfflineReady] = useState<boolean>(false);
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState<boolean>(checkIsStandalone);
  const [isIOS] = useState<boolean>(checkIsIOS);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    window.addEventListener('appinstalled', handleAppInstalled);

    const mediaQuery = window.matchMedia('(display-mode: standalone)');
    const handleDisplayChange = () => {
      setIsInstalled(checkIsStandalone());
    };
    mediaQuery.addEventListener('change', handleDisplayChange);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      window.removeEventListener('appinstalled', handleAppInstalled);
      mediaQuery.removeEventListener('change', handleDisplayChange);
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
      return;
    }

    let cancelled = false;

    const verifyOfflineCacheReady = async () => {
      try {
        const reg = await navigator.serviceWorker.ready;
        if (cancelled) return;
        if (reg.active?.state === 'activated') {
          if ('caches' in window) {
            const keys = await caches.keys();
            const hasCache = keys.some(
              (key) =>
                key.startsWith('com3021-offline-') ||
                key.startsWith('workbox-precache-')
            );
            if (!cancelled && hasCache) {
              setIsOfflineReady(true);
              return;
            }
          }
          if (!cancelled) {
            setIsOfflineReady(true);
          }
        }
      } catch {
        // Ignore if service worker ready check fails
      }
    };

    verifyOfflineCacheReady();

    const handleSwMessage = (event: MessageEvent) => {
      if (event.data?.type === 'SW_OFFLINE_READY' && !cancelled) {
        setIsOfflineReady(true);
      }
    };

    const handleCustomReady = () => {
      verifyOfflineCacheReady();
    };

    navigator.serviceWorker.addEventListener('message', handleSwMessage);
    navigator.serviceWorker.addEventListener('controllerchange', handleCustomReady);
    window.addEventListener('com3021-sw-ready', handleCustomReady);

    return () => {
      cancelled = true;
      navigator.serviceWorker.removeEventListener('message', handleSwMessage);
      navigator.serviceWorker.removeEventListener(
        'controllerchange',
        handleCustomReady
      );
      window.removeEventListener('com3021-sw-ready', handleCustomReady);
    };
  }, []);

  const install = useCallback(async () => {
    if (!deferredPrompt) return false;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
      setIsInstalled(true);
      return true;
    }
    return false;
  }, [deferredPrompt]);

  return {
    isOnline,
    isOfflineReady,
    isInstallable: deferredPrompt !== null,
    isInstalled,
    isIOS,
    install,
  };
}
