import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import MorphIllustration from "@/components/MorphIllustration";

export type Chapter = {
  era: string;
  title: string;
  year: string;
  icon: string;
  text: string;
};

export const stickyChapters: Chapter[] = [
  {
    era: "Chapter I — Analog",
    title: "The Cassette",
    year: "1990s",
    icon: "📼",
    text: "Rewinding tapes taught me patience. Analog rituals still shape how I design micro-interactions.",
  },
  {
    era: "Chapter II — Digital Dawn",
    title: "The Compact Disc",
    year: "2000s",
    icon: "💿",
    text: "CDs were perfect but fragile. Polish without resilience is meaningless.",
  },
  {
    era: "Chapter III — Portable",
    title: "The MP3 Player",
    year: "2005–2012",
    icon: "🎵",
    text: "1,000 songs in a pocket forced ruthless prioritization. Every pixel must earn its place.",
  },
  {
    era: "Chapter IV — Cloud",
    title: "Streaming",
    year: "2012–Now",
    icon: "☁️",
    text: "Everything, everywhere, instantly. Design for a world where the medium is invisible.",
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
  const segment = 1 / total;
  const start = index * segment;
  const end = start + segment;
  const fadeInStart = Math.max(0, start - segment * 0.12);
  const fadeInEnd = start + segment * 0.14;
  const fadeOutStart = end - segment * 0.14;
  const fadeOutEnd = Math.min(1, end + segment * 0.12);

  const opacity = useTransform(
    progress,
    [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd],
    [0, 1, 1, 0]
  );
  const y = useTransform(progress, [fadeInStart, start, end, fadeOutEnd], [18, 0, 0, -18]);

  return (
    <motion.div
      className="absolute inset-y-0 left-0 w-full md:w-1/2 flex items-center justify-center px-6 md:px-16"
      style={{ opacity, y }}
    >
      <div className="max-w-md">
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
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  // Subtle continuous rotation tied to scroll for extra life
  const illusRotate = useTransform(scrollYProgress, [0, 1], [-12, 12]);

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ height: `${stickyChapters.length * 100}vh` }}
      aria-label="The chaptered journey through music tech eras"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Backdrop */}
        <div className="absolute inset-0 bg-background" />
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Single morphing illustration on the right — persists through all chapters */}
        <div className="absolute inset-y-0 right-0 w-full md:w-1/2 flex items-center justify-center pointer-events-none">
          <MorphIllustration progress={scrollYProgress} rotate={illusRotate} />
        </div>

        {/* Text slots cross-fade on the left */}
        <div className="relative h-full w-full">
          {stickyChapters.map((ch, i) => (
            <ChapterText
              key={ch.title}
              chapter={ch}
              index={i}
              total={stickyChapters.length}
              progress={scrollYProgress}
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
