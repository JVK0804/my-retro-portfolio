import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { InterfaceReadyProvider } from "@/contexts/InterfaceReadyContext";

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

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

const keystrokeDelay = () => (1000 / CHARS_PER_SECOND) * (0.55 + Math.random() * 0.9);

const BootSequence = ({ onComplete }: { onComplete: () => void }) => {
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

  const typedChars = LINE_LENGTHS.slice(0, lineIndex).reduce((sum, n) => sum + n, 0) + charCount;
  const progress = started ? typedChars / TOTAL_CHARS : 0;

  return (
    <>
      <div className="mt-10 w-64 h-[2px] bg-border overflow-hidden z-20">
        <motion.div
          className="h-full w-full origin-left bg-primary will-change-transform"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: progress }}
          transition={{ type: "spring", stiffness: 60, damping: 20, mass: 0.8 }}
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
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: EASE_OUT }}
              className={
                isFinal ? "text-primary" : isCurrent ? "text-foreground/80" : "text-muted-foreground/60"
              }
            >
              {text}
              {isCurrent && started && (
                <span className="terminal-cursor" data-typing={!lineDone} aria-hidden="true" />
              )}
            </motion.p>
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
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background overflow-hidden will-change-[opacity,filter]"
            exit={{ opacity: 0, filter: "blur(6px)" }}
            transition={{ duration: 0.9, ease: EASE_OUT }}
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
                  transition={{ delay: 0.1 + i * 0.08, duration: 1.4, ease: EASE_OUT }}
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
                  transition={{ delay: 0.3 + i * 0.1, duration: 1.4, ease: EASE_OUT }}
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
              initial={{ opacity: 0, scale: 0.94, filter: "blur(8px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ delay: 0.25, duration: 1.1, ease: EASE_OUT }}
              className="relative z-20"
            >
              <h1 className="heading-font text-5xl md:text-7xl font-bold tracking-[0.3em] text-foreground">
                JVK
              </h1>
              <p className="type-label mt-3 text-center">
                Kaushik <span className="text-foreground/40">aka</span> JVK
              </p>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8, ease: EASE_OUT }}
              className="type-label mt-4 z-20"
            >
              Product Designer / Design Engineer
            </motion.p>

            <BootSequence onComplete={finishLoading} />
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        initial={false}
        animate={loading ? { opacity: 0, scale: 0.985 } : { opacity: 1, scale: 1 }}
        transition={{ delay: loading ? 0 : 0.15, duration: 0.9, ease: EASE_OUT }}
        style={{ transformOrigin: "50% 30vh" }}
      >
        {children}
      </motion.div>
      </>
    </InterfaceReadyProvider>
  );
};

export default LoadingScreen;
