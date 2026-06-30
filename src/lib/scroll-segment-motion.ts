import { type MotionValue, useScroll, useTransform, type RefObject } from "framer-motion";

/** Navbar clearance — matches sticky `top-[5.5rem]`. */
export const STICKY_TOP_PX = 88;

/**
 * Progress 0 until the section top reaches the sticky line, then 0→1 across the scroll track.
 * Prevents chapters from advancing before the user enters the section.
 */
export const useStickySectionProgress = (
  containerRef: RefObject<HTMLElement | null>,
  stickyTopPx = STICKY_TOP_PX,
) => {
  const { scrollY } = useScroll();
  return useTransform(scrollY, () => {
    const container = containerRef.current;
    if (!container) return 0;

    const rect = container.getBoundingClientRect();
    const scrollable = container.offsetHeight - (window.innerHeight - stickyTopPx);
    if (scrollable <= 0) return 0;

    return Math.min(1, Math.max(0, (stickyTopPx - rect.top) / scrollable));
  });
};

/** Short crossfade at segment edges so only one panel is readable at a time. */
const CROSSFADE_RATIO = 0.07;

const segmentBounds = (index: number, total: number) => {
  const segment = 1 / total;
  const start = index * segment;
  const end = start + segment;
  const fade = Math.min(segment * CROSSFADE_RATIO, segment * 0.18);
  return { start, end, fade };
};

export const useSegmentOpacity = (
  progress: MotionValue<number>,
  index: number,
  total: number,
) => {
  const { start, end, fade } = segmentBounds(index, total);
  return useTransform(progress, [start, start + fade, end - fade, end], [0, 1, 1, 0], {
    clamp: true,
  });
};

export const useSegmentY = (
  progress: MotionValue<number>,
  index: number,
  total: number,
  distance = 14,
) => {
  const { start, end, fade } = segmentBounds(index, total);
  return useTransform(
    progress,
    [start, start + fade, end - fade, end],
    [distance, 0, 0, -distance],
    { clamp: true },
  );
};
