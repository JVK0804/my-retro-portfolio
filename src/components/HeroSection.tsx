import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { useSound } from "@/contexts/SoundContext";
import { useInterfaceReady } from "@/contexts/InterfaceReadyContext";
import { pulseTypingHaptic } from "@/lib/typing-haptic";
import HeroStatusLine from "@/components/HeroStatusLine";

const WELCOME_TEXT = "Hello Guest, I'm Kaushik";
const WELCOME_NAME_START = WELCOME_TEXT.indexOf("Kaushik");
const TYPING_INTERVAL_MS = 37;
const TYPING_START_DELAY_MS = 500;

const SUBTITLE_INTERVAL_MS = 14;
const SUBTITLE_GAP_MS = 250;
const SUBTITLE_TEXT =
  "I design B2B SaaS, design system & AI products. I design in Figma and ship in React, built around data privacy and user trust.";
const PREVIOUSLY_TEXT = "Previously designed @ Deloitte, Cigna, Anthem, Commonwealth of Massachusetts & Slack";

const useTypewriter = (text: string, active: boolean, intervalMs: number, startDelayMs = 0) => {
  const reduceMotion = useReducedMotion();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) setCount(0);
    else if (reduceMotion) setCount(text.length);
  }, [active, reduceMotion, text]);

  useEffect(() => {
    if (!active || reduceMotion || count >= text.length) return;
    const timer = window.setTimeout(
      () => setCount((current) => current + 1),
      count === 0 ? startDelayMs : intervalMs,
    );
    return () => window.clearTimeout(timer);
  }, [active, reduceMotion, count, text, intervalMs, startDelayMs]);

  return count;
};

const TypedParagraph = ({
  text,
  count,
  showCursor,
  className,
}: {
  text: string;
  count: number;
  showCursor: boolean;
  className: string;
}) => (
  <p className={className} aria-label={text}>
    <span aria-hidden="true">{text.slice(0, count)}</span>
    {showCursor && <span className="terminal-cursor" data-typing="true" aria-hidden="true" />}
    <span className="invisible" aria-hidden="true">
      {text.slice(count)}
    </span>
  </p>
);

const TypingWelcome = ({ onDone }: { onDone: () => void }) => {
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
    if (WELCOME_TEXT[count - 1] !== " ") playTyping();
    pulseTypingHaptic();
  }, [count, started, playTyping]);

  const shown = WELCOME_TEXT.slice(0, count);
  const isDone = count >= WELCOME_TEXT.length;

  useEffect(() => {
    if (isDone) onDone();
  }, [isDone, onDone]);

  return (
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.6 }}
      className="font-mono-space text-foreground/70 text-sm mb-8 tracking-[0.12em] min-h-[1.5em] w-full text-center"
      aria-label={WELCOME_TEXT}
    >
      <span className="text-primary mr-1">$</span>
      <span>{shown.slice(0, WELCOME_NAME_START)}</span>
      {shown.length > WELCOME_NAME_START && (
        <span className="teal-shimmer font-bold">{shown.slice(WELCOME_NAME_START)}</span>
      )}
      <span
        className={`inline-block w-[1.4ch] h-[1em] -mb-[0.15em] ml-[2px] bg-primary ${
          isDone ? "animate-pulse" : ""
        }`}
        aria-hidden="true"
      />
    </motion.p>
  );
};

const HeroSection = () => {
  const [welcomeDone, setWelcomeDone] = useState(false);
  const handleWelcomeDone = useCallback(() => setWelcomeDone(true), []);
  const subtitleCount = useTypewriter(SUBTITLE_TEXT, welcomeDone, SUBTITLE_INTERVAL_MS, SUBTITLE_GAP_MS);
  const subtitleDone = subtitleCount >= SUBTITLE_TEXT.length;
  const previouslyCount = useTypewriter(PREVIOUSLY_TEXT, subtitleDone, SUBTITLE_INTERVAL_MS, SUBTITLE_GAP_MS);
  const previouslyTyping = subtitleDone && previouslyCount < PREVIOUSLY_TEXT.length;

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16" data-parallax-blur-zone>
      <HeroStatusLine />
      <TypingWelcome onDone={handleWelcomeDone} />

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold text-center overflow-visible leading-[1.05]"
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

      <TypedParagraph
        text={SUBTITLE_TEXT}
        count={subtitleCount}
        showCursor={welcomeDone && !subtitleDone}
        className="type-lead text-center max-w-3xl mt-10"
      />

      <TypedParagraph
        text={PREVIOUSLY_TEXT}
        count={previouslyCount}
        showCursor={previouslyTyping}
        className="type-body text-foreground/60 text-center max-w-3xl mt-6"
      />
    </section>
  );
};

export default HeroSection;
