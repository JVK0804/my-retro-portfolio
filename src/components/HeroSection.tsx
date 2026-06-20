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

      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="mono-heading text-3xl md:text-5xl font-bold text-center max-w-4xl leading-tight"
      >
        Product Designer crafting handshake between Design and{" "}
        <span className="font-mono-space font-normal text-primary">
          &lt;<span className="teal-shimmer">Code</span>/&gt;
        </span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="font-body text-foreground/60 text-sm md:text-base text-center max-w-xl mt-12"
      >
        Previously worked for Deloitte, Anthem and Cigna.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        className="flex gap-4 mt-14"
      >
        <a
          href="#letsconnect"
          onClick={(e) => {
            e.preventDefault();
            play("click");
            document.getElementById("letsconnect")?.scrollIntoView({ behavior: "smooth" });
          }}
          onMouseEnter={() => play("hover")}
          className="rounded-[var(--radius-md)] bg-primary px-8 py-3 font-heading text-xs font-bold tracking-wider text-primary-foreground shadow-md uppercase cursor-pointer transition-[opacity,transform] hover:opacity-90 active:scale-[var(--scale-press)]"
        >
          Let's Connect
        </a>
        <Link
          to="/about"
          onClick={() => play("whoosh")}
          onMouseEnter={() => play("hover")}
          className="glass-card px-8 py-3 font-heading text-xs font-bold tracking-wider text-foreground uppercase transition-colors hover:text-primary"
        >
          About me →
        </Link>
      </motion.div>
    </section>
  );
};

export default HeroSection;
