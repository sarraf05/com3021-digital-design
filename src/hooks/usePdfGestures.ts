import { useEffect, useRef, useState, type CSSProperties, type RefObject } from 'react';

export const PDF_MIN_SCALE = 0.5;
export const PDF_MAX_SCALE = 3.0;
export const PDF_SWIPE_SCALE_THRESHOLD = 1.05;
export const PDF_DOUBLE_CLICK_ZOOM_SCALE = 1.8;

export function clampPdfScale(scale: number): number {
  return Math.min(PDF_MAX_SCALE, Math.max(PDF_MIN_SCALE, Number(scale.toFixed(2))));
}

interface UsePdfGesturesOptions {
  stageRef: RefObject<HTMLDivElement | null>;
  scale: number;
  onScaleChange: (nextScale: number) => void;
  onNextPage: () => void;
  onPrevPage: () => void;
  disabled?: boolean;
}

interface PendingZoomFocus {
  prevWidth: number;
  prevHeight: number;
  relX: number;
  relY: number;
  cursorInViewportX: number;
  cursorInViewportY: number;
  createdAt: number;
}

interface UsePdfGesturesResult {
  /** Live scale factor (reflects smooth pinch ratio before commit) */
  liveScale: number;
  /** CSS transform scale ratio to apply to canvas wrapper during active pinch */
  pinchVisualRatio: number;
  /** Computed CSS transform style for active pinch or smooth double-click zoom */
  wrapperStyle: CSSProperties | undefined;
  isPinching: boolean;
  isDragging: boolean;
  canPan: boolean;
  onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export function usePdfGestures({
  stageRef,
  scale,
  onScaleChange,
  onNextPage,
  onPrevPage,
  disabled = false,
}: UsePdfGesturesOptions): UsePdfGesturesResult {
  const [pinchVisualRatio, setPinchVisualRatio] = useState<number>(1);
  const [isPinching, setIsPinching] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [zoomAnimStyle, setZoomAnimStyle] = useState<CSSProperties | null>(null);

  const scaleRef = useRef(scale);
  scaleRef.current = scale;

  const onScaleChangeRef = useRef(onScaleChange);
  onScaleChangeRef.current = onScaleChange;

  const onNextPageRef = useRef(onNextPage);
  onNextPageRef.current = onNextPage;

  const onPrevPageRef = useRef(onPrevPage);
  onPrevPageRef.current = onPrevPage;

  const disabledRef = useRef(disabled);
  disabledRef.current = disabled;

  // Touch gesture state refs
  const pinchStateRef = useRef<{
    startDist: number;
    startScale: number;
    latestScale: number;
  } | null>(null);
  const swipeStartRef = useRef<{ x: number; y: number } | null>(null);
  const didPinchRef = useRef<boolean>(false);

  // Track last pointer type so touch double-taps do not trigger desktop dblclick zoom
  const lastPointerTypeRef = useRef<string>('mouse');

  // Wheel accumulator ref (for Ctrl+Wheel / Cmd+Wheel granular zoom)
  const wheelAccumRef = useRef<number>(0);

  // Mouse drag-to-pan state ref
  const dragStateRef = useRef<{
    startX: number;
    startY: number;
    scrollLeft: number;
    scrollTop: number;
  } | null>(null);

  // Pending cursor-centered double-click zoom state
  const pendingZoomFocusRef = useRef<PendingZoomFocus | null>(null);
  const animRaf1Ref = useRef<number | null>(null);
  const animRaf2Ref = useRef<number | null>(null);
  const animTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    const clearZoomAnim = () => {
      if (animRaf1Ref.current !== null) {
        window.cancelAnimationFrame(animRaf1Ref.current);
        animRaf1Ref.current = null;
      }
      if (animRaf2Ref.current !== null) {
        window.cancelAnimationFrame(animRaf2Ref.current);
        animRaf2Ref.current = null;
      }
      if (animTimerRef.current !== null) {
        window.clearTimeout(animTimerRef.current);
        animTimerRef.current = null;
      }
      setZoomAnimStyle(null);
    };

    const getTouchDistance = (t1: Touch, t2: Touch) =>
      Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);

    const handleTouchStart = (e: TouchEvent) => {
      if (disabledRef.current) return;

      if (e.touches.length === 2) {
        const dist = getTouchDistance(e.touches[0], e.touches[1]);
        if (dist > 0) {
          didPinchRef.current = true;
          swipeStartRef.current = null;
          pinchStateRef.current = {
            startDist: dist,
            startScale: scaleRef.current,
            latestScale: scaleRef.current,
          };
          setIsPinching(true);
          setPinchVisualRatio(1);
        }
      } else if (e.touches.length === 1 && !didPinchRef.current) {
        swipeStartRef.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        };
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (disabledRef.current) return;

      if (e.touches.length === 2) {
        // Block browser page pinch-zoom
        e.preventDefault();

        const pinch = pinchStateRef.current;
        const dist = getTouchDistance(e.touches[0], e.touches[1]);
        if (!pinch) {
          if (dist > 0) {
            didPinchRef.current = true;
            swipeStartRef.current = null;
            pinchStateRef.current = {
              startDist: dist,
              startScale: scaleRef.current,
              latestScale: scaleRef.current,
            };
            setIsPinching(true);
            setPinchVisualRatio(1);
          }
          return;
        }

        if (pinch.startDist > 0) {
          const rawNext = pinch.startScale * (dist / pinch.startDist);
          const clampedNext = clampPdfScale(rawNext);
          pinch.latestScale = clampedNext;
          setPinchVisualRatio(clampedNext / pinch.startScale);
        }
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (disabledRef.current) return;

      if (pinchStateRef.current && e.touches.length < 2) {
        const finalScale = pinchStateRef.current.latestScale;
        pinchStateRef.current = null;
        setIsPinching(false);
        setPinchVisualRatio(1);
        if (Math.abs(finalScale - scaleRef.current) >= 0.01) {
          onScaleChangeRef.current(finalScale);
        }
      }

      if (e.touches.length === 0) {
        const start = swipeStartRef.current;
        const wasPinch = didPinchRef.current;
        swipeStartRef.current = null;
        didPinchRef.current = false;

        if (!wasPinch && start && scaleRef.current <= PDF_SWIPE_SCALE_THRESHOLD) {
          const touch = e.changedTouches[0];
          if (touch) {
            const deltaX = touch.clientX - start.x;
            const deltaY = touch.clientY - start.y;
            if (Math.abs(deltaX) > 60 && Math.abs(deltaX) > Math.abs(deltaY) * 1.5) {
              if (deltaX < 0) {
                onNextPageRef.current();
              } else {
                onPrevPageRef.current();
              }
            }
          }
        }
      }
    };

    const handleTouchCancel = () => {
      pinchStateRef.current = null;
      swipeStartRef.current = null;
      didPinchRef.current = false;
      setIsPinching(false);
      setPinchVisualRatio(1);
    };

    const handleWheel = (e: WheelEvent) => {
      if (disabledRef.current) return;

      // Plain mouse wheel strictly scrolls vertically without zooming at all zoom levels
      if (!e.ctrlKey && !e.metaKey) {
        wheelAccumRef.current = 0;
        return;
      }

      // Only Ctrl+Wheel / Cmd+Wheel performs granular zoom
      e.preventDefault();
      e.stopPropagation();

      // Normalize deltaMode (lines/pages vs pixels)
      const unitMultiplier = e.deltaMode === 1 ? 24 : e.deltaMode === 2 ? 240 : 1;
      wheelAccumRef.current += e.deltaY * unitMultiplier;

      const threshold = 24;
      if (Math.abs(wheelAccumRef.current) < threshold) {
        return;
      }

      const direction = wheelAccumRef.current < 0 ? 1 : -1;
      wheelAccumRef.current = 0;

      const next = clampPdfScale(scaleRef.current + direction * 0.12);
      if (next !== scaleRef.current) {
        onScaleChangeRef.current(next);
      }
    };

    const handlePointerDown = (e: PointerEvent) => {
      lastPointerTypeRef.current = e.pointerType || 'mouse';
    };

    const handleDoubleClick = (e: MouseEvent) => {
      if (disabledRef.current || e.button !== 0) return;
      if (
        lastPointerTypeRef.current === 'touch' ||
        lastPointerTypeRef.current === 'pen'
      ) {
        return;
      }

      const target = e.target as HTMLElement | null;
      if (target?.closest('button, a, input, select, [role="button"]')) {
        return;
      }

      // Ignore double-clicks on native scrollbars
      const stageRect = el.getBoundingClientRect();
      if (
        e.clientX >= stageRect.left + el.clientWidth ||
        e.clientY >= stageRect.top + el.clientHeight
      ) {
        return;
      }

      const canvas = el.querySelector('canvas');
      if (!canvas) return;
      const canvasRect = canvas.getBoundingClientRect();
      if (canvasRect.width <= 0 || canvasRect.height <= 0) return;

      e.preventDefault();

      const isZoomedIn = scaleRef.current > PDF_SWIPE_SCALE_THRESHOLD;
      const targetScale = isZoomedIn ? 1 : PDF_DOUBLE_CLICK_ZOOM_SCALE;

      pendingZoomFocusRef.current = {
        prevWidth: canvasRect.width,
        prevHeight: canvasRect.height,
        relX: Math.min(1, Math.max(0, (e.clientX - canvasRect.left) / canvasRect.width)),
        relY: Math.min(1, Math.max(0, (e.clientY - canvasRect.top) / canvasRect.height)),
        cursorInViewportX: e.clientX - stageRect.left,
        cursorInViewportY: e.clientY - stageRect.top,
        createdAt: performance.now(),
      };

      onScaleChangeRef.current(targetScale);
    };

    // Align scroll position & run smooth GPU transform when canvas resizes after double-click zoom
    const canvasEl = el.querySelector('canvas');
    let canvasResizeObserver: ResizeObserver | null = null;
    if (canvasEl && typeof ResizeObserver !== 'undefined') {
      canvasResizeObserver = new ResizeObserver(() => {
        const pending = pendingZoomFocusRef.current;
        if (!pending) return;

        if (performance.now() - pending.createdAt > 2500) {
          pendingZoomFocusRef.current = null;
          return;
        }

        const newCanvasRect = canvasEl.getBoundingClientRect();
        if (
          Math.abs(newCanvasRect.width - pending.prevWidth) <= 2 &&
          Math.abs(newCanvasRect.height - pending.prevHeight) <= 2
        ) {
          return;
        }

        pendingZoomFocusRef.current = null;

        const newStageRect = el.getBoundingClientRect();
        const canvasScrollLeft = newCanvasRect.left - newStageRect.left + el.scrollLeft;
        const canvasScrollTop = newCanvasRect.top - newStageRect.top + el.scrollTop;
        const targetContentX = canvasScrollLeft + pending.relX * newCanvasRect.width;
        const targetContentY = canvasScrollTop + pending.relY * newCanvasRect.height;

        el.scrollLeft = Math.max(0, targetContentX - pending.cursorInViewportX);
        el.scrollTop = Math.max(0, targetContentY - pending.cursorInViewportY);

        const fromRatio = pending.prevWidth / newCanvasRect.width;
        if (
          Number.isFinite(fromRatio) &&
          fromRatio > 0.2 &&
          fromRatio < 5 &&
          Math.abs(fromRatio - 1) > 0.05
        ) {
          const origin = `${(pending.relX * 100).toFixed(2)}% ${(pending.relY * 100).toFixed(2)}%`;
          clearZoomAnim();
          setZoomAnimStyle({
            transform: `scale(${fromRatio.toFixed(4)})`,
            transformOrigin: origin,
            transition: 'none',
            willChange: 'transform',
          });
          animRaf1Ref.current = window.requestAnimationFrame(() => {
            animRaf2Ref.current = window.requestAnimationFrame(() => {
              setZoomAnimStyle({
                transform: 'scale(1)',
                transformOrigin: origin,
                transition: 'transform 180ms cubic-bezier(0.22, 1, 0.36, 1)',
                willChange: 'transform',
              });
              animTimerRef.current = window.setTimeout(() => {
                setZoomAnimStyle(null);
                animTimerRef.current = null;
              }, 200);
            });
          });
        }
      });
      canvasResizeObserver.observe(canvasEl);
    }

    el.addEventListener('touchstart', handleTouchStart, { passive: true });
    el.addEventListener('touchmove', handleTouchMove, { passive: false });
    el.addEventListener('touchend', handleTouchEnd, { passive: true });
    el.addEventListener('touchcancel', handleTouchCancel, { passive: true });
    el.addEventListener('wheel', handleWheel, { passive: false });
    el.addEventListener('pointerdown', handlePointerDown, { passive: true });
    el.addEventListener('dblclick', handleDoubleClick);

    return () => {
      canvasResizeObserver?.disconnect();
      clearZoomAnim();
      el.removeEventListener('touchstart', handleTouchStart);
      el.removeEventListener('touchmove', handleTouchMove);
      el.removeEventListener('touchend', handleTouchEnd);
      el.removeEventListener('touchcancel', handleTouchCancel);
      el.removeEventListener('wheel', handleWheel);
      el.removeEventListener('pointerdown', handlePointerDown);
      el.removeEventListener('dblclick', handleDoubleClick);
    };
  }, [stageRef, disabled]);

  // Global mousemove / mouseup listeners while dragging so pan never gets stuck
  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const el = stageRef.current;
      const drag = dragStateRef.current;
      if (!el || !drag) return;
      e.preventDefault();
      el.scrollLeft = drag.scrollLeft - (e.clientX - drag.startX);
      el.scrollTop = drag.scrollTop - (e.clientY - drag.startY);
    };

    const handleMouseUp = () => {
      dragStateRef.current = null;
      setIsDragging(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('blur', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('blur', handleMouseUp);
    };
  }, [isDragging, stageRef]);

  const canPan = !disabled && scale > PDF_SWIPE_SCALE_THRESHOLD;

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || e.button !== 0 || scaleRef.current <= PDF_SWIPE_SCALE_THRESHOLD) {
      return;
    }
    const target = e.target as HTMLElement | null;
    if (target?.closest('button, a, input, select, [role="button"]')) {
      return;
    }
    const el = stageRef.current;
    if (!el) return;

    // Allow native scrollbar dragging without hijacking mouse pan
    const rect = el.getBoundingClientRect();
    if (
      e.clientX >= rect.left + el.clientWidth ||
      e.clientY >= rect.top + el.clientHeight
    ) {
      return;
    }

    e.preventDefault();
    dragStateRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      scrollLeft: el.scrollLeft,
      scrollTop: el.scrollTop,
    };
    setIsDragging(true);
  };

  const liveScale = isPinching ? clampPdfScale(scale * pinchVisualRatio) : scale;
  const wrapperStyle: CSSProperties | undefined = isPinching
    ? {
        transform: `scale(${pinchVisualRatio})`,
        transformOrigin: 'center top',
        willChange: 'transform',
      }
    : zoomAnimStyle ?? undefined;

  return {
    liveScale,
    pinchVisualRatio,
    wrapperStyle,
    isPinching,
    isDragging,
    canPan,
    onMouseDown,
  };
}
