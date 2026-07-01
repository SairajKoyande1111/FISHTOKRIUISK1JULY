import { useRef, useCallback, useEffect } from "react";

export function useDragScroll<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const hasDragged = useRef(false);

  // Momentum for wheel scroll
  const velocity = useRef(0);
  const rafId = useRef<number | null>(null);

  // ── Wheel: convert vertical scroll to smooth horizontal ──────────────────
  const onWheel = useCallback((e: WheelEvent) => {
    const el = ref.current;
    if (!el) return;
    if (el.scrollWidth <= el.clientWidth) return;
    e.preventDefault();
    const delta = e.deltaY !== 0 ? e.deltaY : e.deltaX;
    velocity.current += delta;
    if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    const step = () => {
      if (!ref.current) return;
      ref.current.scrollLeft += velocity.current * 0.12;
      velocity.current *= 0.82;
      if (Math.abs(velocity.current) > 0.5) {
        rafId.current = requestAnimationFrame(step);
      } else {
        velocity.current = 0;
        rafId.current = null;
      }
    };
    rafId.current = requestAnimationFrame(step);
  }, []);

  // ── Drag: mousemove/mouseup on document so fast drags don't break ────────
  const onMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging.current) return;
    const el = ref.current;
    if (!el) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    if (Math.abs(walk) > 4) hasDragged.current = true;
    el.scrollLeft = scrollLeft.current - walk;
  }, []);

  const onMouseUp = useCallback(() => {
    if (!isDragging.current) return;
    const el = ref.current;
    isDragging.current = false;
    if (el) {
      el.style.cursor = "grab";
      el.style.userSelect = "";
    }
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  }, [onMouseMove]);

  const onMouseDown = useCallback((e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    // Cancel any ongoing momentum
    if (rafId.current !== null) {
      cancelAnimationFrame(rafId.current);
      rafId.current = null;
      velocity.current = 0;
    }
    isDragging.current = true;
    hasDragged.current = false;
    startX.current = e.pageX - el.offsetLeft;
    scrollLeft.current = el.scrollLeft;
    el.style.cursor = "grabbing";
    el.style.userSelect = "none";
    // Attach to document so drag works even when mouse leaves the element
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  }, [onMouseMove, onMouseUp]);

  const onClickCapture = useCallback((e: MouseEvent) => {
    if (hasDragged.current) {
      e.stopPropagation();
      e.preventDefault();
    }
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.cursor = "grab";
    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("mousedown", onMouseDown);
    el.addEventListener("click", onClickCapture, true);
    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("mousedown", onMouseDown);
      el.removeEventListener("click", onClickCapture, true);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, [onWheel, onMouseDown, onMouseMove, onMouseUp, onClickCapture]);

  return ref;
}
