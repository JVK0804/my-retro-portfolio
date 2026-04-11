import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LOADING_DURATION = 3200;
const RESET_INTERVAL = 10 * 60 * 1000;
const STORAGE_KEY = "lastLoadingTimestamp";

const LoadingScreen = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(() => {
    const last = sessionStorage.getItem(STORAGE_KEY);
    if (!last) return true;
    return Date.now() - parseInt(last, 10) > RESET_INTERVAL;
  });

  useEffect(() => {
    if (!loading) return;
    const timer = setTimeout(() => {
      sessionStorage.setItem(STORAGE_KEY, Date.now().toString());
      setLoading(false);
    }, LOADING_DURATION);
    return () => clearTimeout(timer);
  }, [loading]);

  return (
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
                background: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)`,
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
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="font-body text-[10px] tracking-[0.4em] uppercase text-muted-foreground mt-4 z-20"
            >
              Principal Design Engineer
            </motion.p>

            {/* Loading bar — retro style */}
            <motion.div className="mt-10 w-48 h-[2px] bg-border overflow-hidden z-20">
              <motion.div
                className="h-full bg-primary"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.6, duration: 2.2, ease: "linear" }}
              />
            </motion.div>

            {/* System text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.4 }}
              className="font-heading text-[8px] tracking-[0.3em] uppercase text-muted-foreground/50 mt-3 z-20"
            >
              INITIALIZING INTERFACE...
            </motion.p>
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
  );
};

export default LoadingScreen;
