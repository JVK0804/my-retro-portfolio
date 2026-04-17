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
  // Phone (taller, more rounded rect)
  "M65,20 L65,180 Q65,190 75,190 L125,190 Q135,190 135,180 L135,20 Q135,10 125,10 L75,10 Q65,10 65,20 Z",
];

// Inner detail (the "screen" / "hole" / "disc center")
const DETAILS = [
  // Cassette window
  "M70,90 L70,115 Q70,118 73,118 L127,118 Q130,118 130,115 L130,90 Q130,87 127,87 L73,87 Q70,87 70,90 Z",
  // CD center hole
  "M100,80 C111,80 120,89 120,100 C120,111 111,120 100,120 C89,120 80,111 80,100 C80,89 89,80 100,80 Z",
  // MP3 screen
  "M82,45 L82,90 Q82,93 85,93 L115,93 Q118,93 118,90 L118,45 Q118,42 115,42 L85,42 Q82,42 82,45 Z",
  // Phone screen
  "M75,35 L75,160 Q75,163 78,163 L122,163 Q125,163 125,160 L125,35 Q125,32 122,32 L78,32 Q75,32 75,35 Z",
];

// Optional small accent (reels / wheel / button)
const ACCENTS = [
  // Cassette left reel
  "M65,105 C73,105 80,112 80,120 C80,128 73,135 65,135 C57,135 50,128 50,120 C50,112 57,105 65,105 Z",
  // CD inner ring
  "M100,92 C104,92 108,96 108,100 C108,104 104,108 100,108 C96,108 92,104 92,100 C92,96 96,92 100,92 Z",
  // MP3 click wheel
  "M100,125 C112,125 122,135 122,147 C122,159 112,169 100,169 C88,169 78,159 78,147 C78,135 88,125 100,125 Z",
  // Phone home button
  "M100,170 C103,170 106,173 106,176 C106,179 103,182 100,182 C97,182 94,179 94,176 C94,173 97,170 100,170 Z",
];

const useMorph = (progress: MotionValue<number>, paths: string[]) => {
  // progress is 0..1 across the whole scroll. Slice into segments between paths.
  const segments = paths.length - 1;
  const inputs = paths.map((_, i) => i / segments);
  // Build pairwise interpolators
  const interps = paths.slice(0, -1).map((p, i) =>
    interpolate(p, paths[i + 1], { maxSegmentLength: 4 })
  );

  return useTransform(progress, (v) => {
    const clamped = Math.max(0, Math.min(0.9999, v));
    const idx = Math.min(segments - 1, Math.floor(clamped * segments));
    const local = clamped * segments - idx;
    return interps[idx](local);
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
