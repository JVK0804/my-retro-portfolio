import { useState, useEffect, useLayoutEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { InterfaceReadyProvider } from "@/contexts/InterfaceReadyContext";
import { useSound } from "@/contexts/SoundContext";

/** Safety net in case the boot sequence never reports completion. */
const MAX_LOADING_DURATION = 9000;
const RESET_INTERVAL = 10 * 60 * 1000;
const STORAGE_KEY = "lastLoadingTimestamp";

const BOOT_START_DELAY_MS = 700;
const CHARS_PER_SECOND = 38;
const LINE_PAUSE_MS = 260;
const FINAL_HOLD_MS = 650;

const BOOT_LINES = [
  "> initializing interface...",
  "> guest authenticated",
  "> remote link: established",
  "> connection established",
];

const LINE_LENGTHS = BOOT_LINES.map((line) => line.length);
const TOTAL_CHARS = LINE_LENGTHS.reduce((sum, n) => sum + n, 0);

const keystrokeDelay = () => (1000 / CHARS_PER_SECOND) * (0.55 + Math.random() * 0.9);

const BootSequence = ({ onComplete }: { onComplete: () => void }) => {
  const { playTyping } = useSound();
  const [lineIndex, setLineIndex] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimer = window.setTimeout(() => setStarted(true), BOOT_START_DELAY_MS);
    return () => window.clearTimeout(startTimer);
  }, []);

  const isLastLine = lineIndex === LINE_LENGTHS.length - 1;
  const lineDone = charCount >= LINE_LENGTHS[lineIndex];

  useEffect(() => {
    if (!started) return;
    if (!lineDone) {
      const timer = window.setTimeout(() => setCharCount((c) => c + 1), keystrokeDelay());
      return () => window.clearTimeout(timer);
    }
    if (isLastLine) {
      const timer = window.setTimeout(onComplete, FINAL_HOLD_MS);
      return () => window.clearTimeout(timer);
    }
    const timer = window.setTimeout(() => {
      setLineIndex((i) => i + 1);
      setCharCount(0);
    }, LINE_PAUSE_MS);
    return () => window.clearTimeout(timer);
  }, [started, lineDone, isLastLine, charCount, onComplete]);

  useLayoutEffect(() => {
    if (!started || charCount === 0) return;
    if (BOOT_LINES[lineIndex][charCount - 1] !== " ") playTyping();
  }, [started, lineIndex, charCount, playTyping]);

  const typedChars = LINE_LENGTHS.slice(0, lineIndex).reduce((sum, n) => sum + n, 0) + charCount;
  const progress = started ? typedChars / TOTAL_CHARS : 0;

  return (
    <>
      <div className="mt-10 w-64 h-[2px] bg-border overflow-hidden z-20">
        <div
          className="h-full bg-primary transition-[width] duration-150 ease-linear"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      <div
        className="mt-5 w-64 min-h-[6rem] font-mono-space text-[10px] leading-relaxed z-20"
        role="status"
        aria-live="polite"
      >
        {BOOT_LINES.slice(0, lineIndex + 1).map((line, i) => {
          const isCurrent = i === lineIndex;
          const text = isCurrent ? line.slice(0, charCount) : line;
          const isFinal = i === LINE_LENGTHS.length - 1;
          return (
            <p
              key={i}
              className={
                isFinal ? "text-primary" : isCurrent ? "text-foreground/80" : "text-muted-foreground/60"
              }
            >
              {text}
              {isCurrent && started && (
                <span className="terminal-cursor" data-typing={!lineDone} aria-hidden="true" />
              )}
            </p>
          );
        })}
      </div>
    </>
  );
};

const LoadingScreen = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(() => {
    const last = sessionStorage.getItem(STORAGE_KEY);
    if (!last) return true;
    return Date.now() - parseInt(last, 10) > RESET_INTERVAL;
  });

  const finishLoading = useCallback(() => {
    sessionStorage.setItem(STORAGE_KEY, Date.now().toString());
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading) return;
    const timer = setTimeout(finishLoading, MAX_LOADING_DURATION);
    return () => clearTimeout(timer);
  }, [loading, finishLoading]);

  return (
    <InterfaceReadyProvider value={!loading}>
      <>
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            key="loader"
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background overflow-hidden"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            {/* Scanline overlay on loader */}
            <div
              className="absolute inset-0 pointer-events-none z-10"
              style={{
                background: `repeating-linear-gradient(0deg, transparent, transparent 2px, hsl(var(--foreground) / 0.06) 2px, hsl(var(--foreground) / 0.06) 4px)`,
              }}
            />

            {/* Horizontal retro grid lines */}
            <motion.div
              className="absolute inset-0 overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.12 }}
              transition={{ delay: 0.2, duration: 1 }}
            >
              {[...Array(7)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute left-0 right-0 h-px bg-primary"
                  style={{ top: `${12 + i * 12}%` }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.1 + i * 0.1, duration: 1, ease: "easeOut" }}
                />
              ))}
              {/* Vertical lines */}
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={`v-${i}`}
                  className="absolute top-0 bottom-0 w-px bg-primary/50"
                  style={{ left: `${15 + i * 18}%` }}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ delay: 0.3 + i * 0.12, duration: 1.2, ease: "easeOut" }}
                />
              ))}
            </motion.div>

            {/* Corner brackets — retro HUD */}
            <div className="absolute top-8 left-8 w-8 h-8 border-t-2 border-l-2 border-primary/40" />
            <div className="absolute top-8 right-8 w-8 h-8 border-t-2 border-r-2 border-primary/40" />
            <div className="absolute bottom-8 left-8 w-8 h-8 border-b-2 border-l-2 border-primary/40" />
            <div className="absolute bottom-8 right-8 w-8 h-8 border-b-2 border-r-2 border-primary/40" />

            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-20"
            >
              <h1 className="heading-font text-5xl md:text-7xl font-bold tracking-[0.3em] text-foreground">
                JVK
              </h1>
              <p className="font-body text-[11px] md:text-xs tracking-[0.35em] uppercase text-foreground/60 mt-3 text-center">
                Kaushik <span className="text-foreground/40">aka</span> JVK
              </p>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="font-body text-[10px] tracking-[0.4em] uppercase text-muted-foreground mt-4 z-20"
            >
              Product Designer / Design Engineer
            </motion.p>

            <BootSequence onComplete={finishLoading} />
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        initial={loading ? { opacity: 0 } : { opacity: 1 }}
        animate={{ opacity: 1 }}
        transition={{ delay: loading ? 0.3 : 0, duration: 0.5 }}
      >
        {children}
      </motion.div>
      </>
    </InterfaceReadyProvider>
  );
};

export default LoadingScreen;
