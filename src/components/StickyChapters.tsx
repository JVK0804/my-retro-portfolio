import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import illusCassette from "@/assets/illus-cassette.png";
import illusCd from "@/assets/illus-cd.png";
import illusMp3 from "@/assets/illus-mp3.png";
import illusStreaming from "@/assets/illus-streaming.png";

export type Chapter = {
  era: string;
  title: string;
  year: string;
  icon: string;
  text: string;
  illus: string;
};

export const stickyChapters: Chapter[] = [
  {
    era: "Chapter I — Analog",
    title: "The Cassette",
    year: "1990s",
    icon: "📼",
    illus: illusCassette,
    text: "Growing up rewinding tapes taught me patience with process. The tactile click of a play button, the hiss before the music — these analog rituals shaped how I think about micro-interactions today.",
  },
  {
    era: "Chapter II — Digital Dawn",
    title: "The Compact Disc",
    year: "2000s",
    icon: "💿",
    illus: illusCd,
    text: "CDs introduced perfection — skip-free, crystal clear. But also fragility. I learned that polish without resilience is meaningless. My design systems are built to be both precise and unbreakable.",
  },
  {
    era: "Chapter III — Portable",
    title: "The MP3 Player",
    year: "2005–2012",
    icon: "🎵",
    illus: illusMp3,
    text: "1,000 songs in your pocket changed everything. Compression forced choices — what's essential? This era taught me ruthless prioritization. Every pixel must earn its place.",
  },
  {
    era: "Chapter IV — Cloud",
    title: "Streaming",
    year: "2012–Now",
    icon: "☁️",
    illus: illusStreaming,
    text: "Now everything is everywhere, instantly. The challenge shifted from access to attention. I design for a world where the medium is invisible — only the experience remains.",
  },
];

/* Each chapter slot fades its text + illustration in/out based on scroll progress */
const ChapterSlot = ({
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
  const mid = start + segment / 2;

  // Text: fade + slide in, hold, fade + slide out
  const textOpacity = useTransform(
    progress,
    [start, start + segment * 0.2, end - segment * 0.2, end],
    [0, 1, 1, 0]
  );
  const textY = useTransform(
    progress,
    [start, mid, end],
    [40, 0, -40]
  );

  // Illustration: rotate + scale + fade morph
  const illusOpacity = useTransform(
    progress,
    [start, start + segment * 0.15, end - segment * 0.15, end],
    [0, 1, 1, 0]
  );
  const illusRotate = useTransform(progress, [start, end], [-25, 25]);
  const illusScale = useTransform(
    progress,
    [start, mid, end],
    [0.7, 1, 0.7]
  );
  const illusBlur = useTransform(
    progress,
    [start, start + segment * 0.15, end - segment * 0.15, end],
    [12, 0, 0, 12]
  );
  const illusFilter = useTransform(illusBlur, (v) => `blur(${v}px)`);

  return (
    <>
      {/* Text panel — left side */}
      <motion.div
        className="absolute inset-y-0 left-0 w-full md:w-1/2 flex items-center justify-center px-6 md:px-16"
        style={{ opacity: textOpacity, y: textY }}
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

      {/* Illustration — right side, morphs */}
      <motion.div
        className="absolute inset-y-0 right-0 w-full md:w-1/2 flex items-center justify-center pointer-events-none"
        style={{
          opacity: illusOpacity,
          rotate: illusRotate,
          scale: illusScale,
          filter: illusFilter,
        }}
      >
        <img
          src={chapter.illus}
          alt={chapter.title}
          width={1024}
          height={1024}
          loading="lazy"
          className="w-[60vw] max-w-[480px] h-auto dark:invert opacity-90"
        />
      </motion.div>
    </>
  );
};

const StickyChapters = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Progress bar fill
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ height: `${stickyChapters.length * 100}vh` }}
      aria-label="The chaptered journey through music tech eras"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Backdrop subtle grid */}
        <div className="absolute inset-0 bg-background" />
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Chapter slots stacked & cross-faded */}
        <div className="relative h-full w-full">
          {stickyChapters.map((ch, i) => (
            <ChapterSlot
              key={ch.title}
              chapter={ch}
              index={i}
              total={stickyChapters.length}
              progress={scrollYProgress}
            />
          ))}
        </div>

        {/* Bottom progress bar + chapter dots */}
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
            {stickyChapters.map((ch, i) => (
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
