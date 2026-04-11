import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import eraCassette from "@/assets/era-cassette.jpg";
import eraCd from "@/assets/era-cd.jpg";
import eraMp3 from "@/assets/era-mp3.jpg";
import eraStreaming from "@/assets/era-streaming.jpg";

const chapters = [
  {
    era: "Chapter I — Analog",
    title: "The Cassette",
    year: "1990s",
    image: eraCassette,
    text: "Growing up rewinding tapes taught me patience with process. The tactile click of a play button, the hiss before the music — these analog rituals shaped how I think about micro-interactions today. Every interface should have that moment of anticipation.",
  },
  {
    era: "Chapter II — Digital Dawn",
    title: "The Compact Disc",
    year: "2000s",
    image: eraCd,
    text: "CDs introduced perfection — skip-free, crystal clear. But they also introduced fragility. I learned that polish without resilience is meaningless. My design systems are built to be both precise and unbreakable.",
  },
  {
    era: "Chapter III — Portable",
    title: "The MP3 Player",
    year: "2005–2012",
    image: eraMp3,
    text: "1,000 songs in your pocket changed everything. Compression forced choices — what's essential? This era taught me ruthless prioritization in design. Every pixel must earn its place.",
  },
  {
    era: "Chapter IV — Cloud",
    title: "Streaming",
    year: "2012–Present",
    image: eraStreaming,
    text: "Now everything is everywhere, instantly. The challenge shifted from access to attention. As a Principal Design Engineer at Apple, I design for a world where the medium is invisible — only the experience remains.",
  },
];

const ChapterBlock = ({
  chapter,
  index,
}: {
  chapter: (typeof chapters)[0];
  index: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imageOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const imageBlur = useTransform(scrollYProgress, [0.5, 0.8], [0, 12]);
  const textY = useTransform(scrollYProgress, [0.2, 0.5], [60, 0]);
  const textOpacity = useTransform(scrollYProgress, [0.2, 0.45], [0, 1]);

  return (
    <div ref={ref} className="relative min-h-[120vh] flex items-center justify-center px-6">
      {/* Background image with blur transition */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ opacity: imageOpacity }}
      >
        <motion.img
          src={chapter.image}
          alt={chapter.title}
          className="w-full h-full object-cover"
          style={{ filter: useTransform(imageBlur, (v) => `blur(${v}px)`) }}
          loading={index === 0 ? "eager" : "lazy"}
          width={1280}
          height={720}
        />
        <div className="absolute inset-0 bg-background/60" />
      </motion.div>

      {/* Text content */}
      <motion.div
        className="relative z-10 max-w-2xl"
        style={{ y: textY, opacity: textOpacity }}
      >
        <p className="font-heading text-xs text-primary mb-3 tracking-widest uppercase">
          {chapter.era} · {chapter.year}
        </p>
        <h2 className="mono-heading text-4xl md:text-6xl font-bold text-foreground mb-6">
          {chapter.title}
        </h2>
        <p className="font-body text-lg text-foreground/90 leading-relaxed">
          {chapter.text}
        </p>
      </motion.div>
    </div>
  );
};

const About = () => {
  return (
    <div className="noise-overlay min-h-screen bg-background">
      <Navbar />

      {/* Intro */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-24">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="font-heading text-xs text-primary mb-4 tracking-widest uppercase"
        >
          The Chaptered Journey
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mono-heading text-5xl md:text-7xl font-bold text-center max-w-4xl mb-6"
        >
          Digital Maturation
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="font-body text-foreground/70 text-lg text-center max-w-lg"
        >
          A Zillennial's journey from analog tactility to cloud-native design — each era leaving its fingerprint on how I build.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-16 text-foreground/50 animate-bounce"
        >
          ↓ Scroll
        </motion.div>
      </section>

      {/* Chapters */}
      {chapters.map((chapter, i) => (
        <ChapterBlock key={chapter.title} chapter={chapter} index={i} />
      ))}

      {/* Closing */}
      <section className="py-32 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="mono-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
            Product designer with <span className="teal-shimmer">6+ years</span> of experience
          </h2>
          <p className="font-body text-foreground/80 text-lg leading-relaxed">
            Combining a designer's eye and a <span className="font-heading text-primary">&lt;developer's mindset /&gt;</span> to craft user-first experiences, backed by Privacy and Data.
          </p>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
