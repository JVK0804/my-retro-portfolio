import { useRef } from "react";
import { motion, useTransform, type MotionValue } from "framer-motion";
import MorphIllustration from "@/components/MorphIllustration";
import { useSegmentOpacity, useSegmentY, useStickySectionProgress } from "@/lib/scroll-segment-motion";

export type Chapter = {
  era: string;
  title: string;
  year: string;
  icon: string;
  text: string;
};

export const stickyChapters: Chapter[] = [
  {
    era: "Analog",
    title: "The Cassette",
    year: "1990s",
    icon: "📼",
    text: "Growing up rewinding tapes taught me patience with process. The tactile click of a play button, the hiss before the music. These analog rituals shaped how I think about micro-interactions today.",
  },
  {
    era: "Digital dawn",
    title: "The Compact Disc",
    year: "2000s",
    icon: "💿",
    text: "CDs introduced perfection: skip-free, crystal clear. But also fragility. I learned that polish without resilience is meaningless. My design systems are built to be both precise and unbreakable.",
  },
  {
    era: "Portable",
    title: "The MP3 Player",
    year: "2005-2012",
    icon: "🎵",
    text: "1,000 songs in your pocket changed everything. Compression forced choices. What's essential? This era taught me ruthless prioritization. Every pixel must earn its place.",
  },
  {
    era: "Cloud",
    title: "Streaming",
    year: "2012-Now",
    icon: "☁️",
    text: "Now everything is everywhere, instantly. The challenge shifted from access to attention. I design for a world where the medium is invisible: only the experience remains.",
  },
];

/* Text panel for each chapter — only the copy fades, illustration morphs continuously */
const ChapterText = ({
  chapter,
  index,
  total,
  progress,
}: {
  chapter: Chapter;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) => {
  const opacity = useSegmentOpacity(progress, index, total);
  const y = useSegmentY(progress, index, total);

  return (
    <motion.div
      className="absolute top-24 left-0 right-0 z-[2] flex justify-center px-6 md:inset-y-0 md:left-0 md:w-1/2 md:items-center md:px-16 md:pt-0"
      style={{ opacity, y, zIndex: 10 + index }}
    >
      <div className="max-w-md bg-transparent max-md:pointer-events-auto">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl">{chapter.icon}</span>
          <p className="font-heading text-xs text-primary tracking-widest uppercase">
            {chapter.era} · {chapter.year}
          </p>
        </div>
        <h2 className="mono-heading text-4xl md:text-6xl font-bold text-foreground mb-6">
          {chapter.title}
        </h2>
        <p className="font-body text-base md:text-lg text-foreground/80 leading-relaxed">
          {chapter.text}
        </p>
      </div>
    </motion.div>
  );
};

const StickyChapters = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const chapterProgress = useStickySectionProgress(containerRef);

  const progressWidth = useTransform(chapterProgress, [0, 1], ["0%", "100%"]);
  const illusRotate = useTransform(chapterProgress, [0, 1], [-12, 12]);

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ height: `${stickyChapters.length * 100}vh` }}
      aria-label="How technology eras shaped my design thinking"
    >
      <div className="sticky top-[5.5rem] h-[calc(100svh-5.5rem)] w-full overflow-hidden">
        <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20 text-center">
          <p className="font-heading text-[11px] text-primary tracking-widest uppercase">
            How Tech Shaped Me
          </p>
          <p className="font-body text-xs text-foreground/60 mt-1">
            Cassette · CD · MP3 · Streaming
          </p>
        </div>

        {/* Desktop-only backdrop layers — mobile uses page background so art stays visible */}
        <div className="absolute inset-0 hidden bg-background md:block" />
        <div
          className="pointer-events-none absolute inset-0 hidden opacity-[0.04] md:block"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Morphing illustration — blurred behind copy on mobile */}
        <div className="absolute inset-0 z-[1] flex items-center justify-center pointer-events-none md:inset-y-0 md:right-0 md:left-auto md:w-1/2">
          <div className="morph-chapter-illustration pointer-events-auto">
            <MorphIllustration progress={chapterProgress} rotate={illusRotate} />
          </div>
        </div>

        {/* Text slots cross-fade */}
        <div className="absolute inset-0 z-[2] max-md:pointer-events-none md:relative md:z-10 md:h-full md:w-full">
          {stickyChapters.map((ch, i) => (
            <ChapterText
              key={ch.title}
              chapter={ch}
              index={i}
              total={stickyChapters.length}
              progress={chapterProgress}
            />
          ))}
        </div>

        {/* Progress bar + year markers */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3 w-[min(420px,80vw)]">
          <div className="flex items-center gap-2 font-heading text-[10px] tracking-widest uppercase text-foreground/50">
            <span>Scroll to advance</span>
            <span>↓</span>
          </div>
          <div className="relative h-[2px] w-full bg-border/40">
            <motion.div
              className="absolute inset-y-0 left-0 bg-primary"
              style={{ width: progressWidth }}
            />
          </div>
          <div className="flex items-center justify-between w-full">
            {stickyChapters.map((ch) => (
              <span
                key={ch.title}
                className="font-heading text-[10px] text-foreground/40 tracking-wider"
              >
                {ch.year}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StickyChapters;
