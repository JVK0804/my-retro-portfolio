import { type MotionValue, useTransform } from "framer-motion";

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
