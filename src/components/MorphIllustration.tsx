import { motion, MotionValue, useTransform } from "framer-motion";
import { interpolate } from "flubber";

/**
 * Morphing tech illustration.
 * Uses flubber to interpolate SVG path `d` values so the cassette literally
 * deforms into the CD, then MP3 player, then phone.
 *
 * Each path is drawn on a 200x200 viewBox with roughly equal command counts
 * to keep the morph readable.
 */

// 4 hand-crafted paths, single-stroke style, all in 200x200 viewBox.
// Outer shells (the dominant silhouette of each device).
const SHELLS = [
  // Cassette body (rounded rect with notches)
  "M30,70 L30,140 Q30,150 40,150 L160,150 Q170,150 170,140 L170,70 Q170,60 160,60 L40,60 Q30,60 30,70 Z",
  // CD (circle approximated as path)
  "M100,30 C138,30 170,62 170,100 C170,138 138,170 100,170 C62,170 30,138 30,100 C30,62 62,30 100,30 Z",
  // MP3 player (tall rounded rect)
  "M70,30 L70,170 Q70,178 78,178 L122,178 Q130,178 130,170 L130,30 Q130,22 122,22 L78,22 Q70,22 70,30 Z",
  // Cloud (puffy rounded silhouette)
  "M50,130 C35,130 25,118 25,105 C25,92 35,82 48,82 C52,65 68,55 85,58 C92,42 110,35 128,42 C148,38 168,52 170,72 C182,75 188,90 182,103 C188,115 180,130 165,130 L50,130 Z",
];

// Inner detail (the "screen" / "hole" / "disc center")
const DETAILS = [
  // Cassette window
  "M70,90 L70,115 Q70,118 73,118 L127,118 Q130,118 130,115 L130,90 Q130,87 127,87 L73,87 Q70,87 70,90 Z",
  // CD center hole
  "M100,80 C111,80 120,89 120,100 C120,111 111,120 100,120 C89,120 80,111 80,100 C80,89 89,80 100,80 Z",
  // MP3 screen
  "M82,45 L82,90 Q82,93 85,93 L115,93 Q118,93 118,90 L118,45 Q118,42 115,42 L85,42 Q82,42 82,45 Z",
  // Wave spectrum (sound wave inside cloud)
  "M50,100 C58,100 58,85 66,85 C74,85 74,115 82,115 C90,115 90,80 98,80 C106,80 106,120 114,120 C122,120 122,82 130,82 C138,82 138,110 146,110 C154,110 154,95 162,95 L162,100 L50,100 Z",
];

// Optional small accent (reels / wheel / button)
const ACCENTS = [
  // Cassette left reel
  "M65,105 C73,105 80,112 80,120 C80,128 73,135 65,135 C57,135 50,128 50,120 C50,112 57,105 65,105 Z",
  // CD inner ring
  "M100,92 C104,92 108,96 108,100 C108,104 104,108 100,108 C96,108 92,104 92,100 C92,96 96,92 100,92 Z",
  // MP3 click wheel
  "M100,125 C112,125 122,135 122,147 C122,159 112,169 100,169 C88,169 78,159 78,147 C78,135 88,125 100,125 Z",
  // Streaming dot (signal pulse)
  "M100,150 C106,150 111,155 111,161 C111,167 106,172 100,172 C94,172 89,167 89,161 C89,155 94,150 100,150 Z",
];

const useMorph = (progress: MotionValue<number>, paths: string[]) => {
  // progress is 0..1 across the whole scroll. Slice into segments between paths.
  const segments = paths.length - 1;
  // Build pairwise interpolators
  const interps = paths.slice(0, -1).map((p, i) =>
    interpolate(p, paths[i + 1], { maxSegmentLength: 4 })
  );

  // Each chapter occupies 1/total of scroll. Within a chapter, text fades in
  // during the first 20%, holds, then fades out during the last 20%.
  // We want the illustration to HOLD on its shape while text is fully visible,
  // and morph to the next shape during the transition window between chapters
  // (i.e. the trailing 20% of chapter N + leading 20% of chapter N+1).
  const total = paths.length; // number of chapters (e.g. 4)
  const chapterSize = 1 / total;
  // Transition window centered on each boundary between chapters.
  const transitionHalf = chapterSize * 0.12; // tighter window so morph completes while text is still present

  return useTransform(progress, (v) => {
    const clamped = Math.max(0, Math.min(0.9999, v));
    // For each segment i (0..segments-1), the boundary sits at (i+1)/total.
    // Find which segment we're in based on which boundary we're closest to / past.
    let idx = 0;
    let local = 0;
    for (let i = 0; i < segments; i++) {
      const boundary = (i + 1) * chapterSize;
      const tStart = boundary - transitionHalf;
      const tEnd = boundary + transitionHalf;
      if (clamped < tStart) {
        // Still fully on shape i
        idx = i;
        local = 0;
        break;
      } else if (clamped <= tEnd) {
        // Inside the transition window between shape i and i+1
        idx = i;
        local = (clamped - tStart) / (tEnd - tStart);
        break;
      } else {
        // Past this boundary — default to fully on next shape, keep looping
        idx = i;
        local = 1;
      }
    }
    // Smoothstep easing for a softer morph
    const eased = local * local * (3 - 2 * local);
    return interps[idx](eased);
  });
};

interface MorphIllustrationProps {
  progress: MotionValue<number>;
  rotate?: MotionValue<number> | number;
}

const MorphIllustration = ({ progress, rotate = 0 }: MorphIllustrationProps) => {
  const shellD = useMorph(progress, SHELLS);
  const detailD = useMorph(progress, DETAILS);
  const accentD = useMorph(progress, ACCENTS);

  return (
    <motion.svg
      viewBox="0 0 200 200"
      className="w-[60vw] max-w-[440px] h-auto"
      style={{ rotate }}
      fill="none"
      stroke="hsl(var(--foreground))"
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <motion.path d={shellD} />
      <motion.path d={detailD} opacity={0.85} />
      <motion.path d={accentD} opacity={0.7} />
    </motion.svg>
  );
};

export default MorphIllustration;
