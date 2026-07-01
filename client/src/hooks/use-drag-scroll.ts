import { useRef, useCallback, useEffect } from "react";

export function useDragScroll<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const hasDragged = useRef(false);

  // Smooth wheel-to-horizontal-scroll using momentum
  const velocity = useRef(0);
  const rafId = useRef<number | null>(null);

  const onWheel = useCallback((e: WheelEvent) => {
    const el = ref.current;
    if (!el) return;
    // Only intercept if the element has horizontal overflow to scroll
    const hasHorizontalScroll = el.scrollWidth > el.clientWidth;
    if (!hasHorizontalScroll) return;
    e.preventDefault();
    // Use deltaY (vertical scroll) to drive horizontal scroll — feels natural on all devices
    const delta = e.deltaY !== 0 ? e.deltaY : e.deltaX;
    velocity.current += delta;
    if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    // Momentum decay loop for a smooth, natural feel on desktop mouse wheel
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
  }, []);

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging.current) return;
    const el = ref.current;
    if (!el) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startX.current) * 1.2;
    if (Math.abs(walk) > 4) hasDragged.current = true;
    el.scrollLeft = scrollLeft.current - walk;
  }, []);

  const onMouseUp = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    isDragging.current = false;
    el.style.cursor = "grab";
    el.style.userSelect = "";
  }, []);

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    isDragging.current = false;
    el.style.cursor = "grab";
    el.style.userSelect = "";
  }, []);

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
    el.addEventListener("mousemove", onMouseMove);
    el.addEventListener("mouseup", onMouseUp);
    el.addEventListener("mouseleave", onMouseLeave);
    el.addEventListener("click", onClickCapture, true);
    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("mousedown", onMouseDown);
      el.removeEventListener("mousemove", onMouseMove);
      el.removeEventListener("mouseup", onMouseUp);
      el.removeEventListener("mouseleave", onMouseLeave);
      el.removeEventListener("click", onClickCapture, true);
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, [onWheel, onMouseDown, onMouseMove, onMouseUp, onMouseLeave, onClickCapture]);

  return ref;
}
