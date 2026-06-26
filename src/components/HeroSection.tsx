import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useLayoutEffect, useState } from "react";
import { useSound } from "@/contexts/SoundContext";
import { useInterfaceReady } from "@/contexts/InterfaceReadyContext";
import {
  KAUSHIK_HERE_HAPTIC_END,
  pulseTypingHaptic,
} from "@/lib/typing-haptic";

const WELCOME_TEXT = "Kaushik here ✦ Welcome to my internet corner";
const TYPING_INTERVAL_MS = 32;
const TYPING_START_DELAY_MS = 500;

const TypingWelcome = () => {
  const { playTyping, prepareTypingAudio } = useSound();
  const interfaceReady = useInterfaceReady();
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!interfaceReady) {
      setStarted(false);
      setCount(0);
      return;
    }

    const primeTimer = window.setTimeout(() => {
      void prepareTypingAudio();
    }, TYPING_START_DELAY_MS - 120);

    const startTimer = window.setTimeout(() => {
      setStarted(true);
    }, TYPING_START_DELAY_MS);

    return () => {
      window.clearTimeout(primeTimer);
      window.clearTimeout(startTimer);
    };
  }, [interfaceReady, prepareTypingAudio]);

  useEffect(() => {
    if (!started || count >= WELCOME_TEXT.length) return;
    const timer = window.setTimeout(() => {
      setCount((current) => current + 1);
    }, TYPING_INTERVAL_MS);
    return () => window.clearTimeout(timer);
  }, [count, started]);

  useLayoutEffect(() => {
    if (!started || count === 0) return;
    playTyping();
    if (count < KAUSHIK_HERE_HAPTIC_END) {
      pulseTypingHaptic();
    }
  }, [count, started, playTyping]);

  const shown = WELCOME_TEXT.slice(0, count);
  const isDone = count >= WELCOME_TEXT.length;

  return (
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.6 }}
      className="font-mono-space text-foreground/70 text-sm mb-8 tracking-[0.12em] min-h-[1.5em] w-full text-center"
      aria-label={WELCOME_TEXT}
    >
      <span className="text-primary mr-1">$</span>
      <span className="teal-shimmer font-bold">{shown.split("✦")[0]}</span>
      {shown.includes("✦") && <span>{"✦" + shown.split("✦")[1]}</span>}
      <span
        className={`inline-block w-[0.55ch] h-[1em] -mb-[0.15em] ml-[1px] bg-primary ${
          isDone ? "animate-pulse" : ""
        }`}
        aria-hidden="true"
      />
    </motion.p>
  );
};

const HeroSection = () => {
  const { play } = useSound();

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16">
      <TypingWelcome />

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="font-heading text-4xl md:text-6xl font-bold text-center overflow-visible"
      >
        <span className="thinking-shimmer" aria-label="Product Designer">
          <span className="thinking-shimmer-base" aria-hidden="true">
            Product Designer
          </span>
          <span className="thinking-shimmer-overlay" aria-hidden="true">
            Product Designer
          </span>
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="font-body text-foreground/90 text-base md:text-lg text-center max-w-2xl mt-8 leading-relaxed"
      >
        I design B2B SaaS, design system & AI products. I design in Figma and ship in React,
        built around data privacy and user trust.
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="font-body text-foreground/70 text-sm md:text-base text-center max-w-2xl mt-6 italic"
      >
        Previously designed @ Deloitte, Cigna, Anthem, Commonwealth of Massachusetts & Slack
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3, duration: 0.6 }}
        className="flex flex-wrap justify-center gap-4 mt-12"
      >
        <a
          href="#letsconnect"
          onClick={(e) => {
            e.preventDefault();
            play("click");
            document.getElementById("letsconnect")?.scrollIntoView({ behavior: "smooth" });
          }}
          onMouseEnter={() => play("hover")}
          className="rounded-[var(--radius-md)] border border-foreground bg-background px-8 py-3 font-heading text-xs font-bold tracking-wider text-foreground uppercase cursor-pointer transition-[opacity,transform] hover:opacity-90 active:scale-[var(--scale-press)]"
        >
          Let&apos;s Connect
        </a>
        <Link
          to="/about"
          onClick={() => play("whoosh")}
          onMouseEnter={() => play("hover")}
          className="rounded-[var(--radius-md)] bg-primary px-8 py-3 font-heading text-xs font-bold tracking-wider text-primary-foreground shadow-md uppercase transition-[opacity,transform] hover:opacity-90 active:scale-[var(--scale-press)]"
        >
          About me →
        </Link>
      </motion.div>
    </section>
  );
};

export default HeroSection;
