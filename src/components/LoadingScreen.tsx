import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LOADING_DURATION = 2800;
const RESET_INTERVAL = 10 * 60 * 1000; // 10 minutes
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
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            {/* Geometric retro-futurism lines */}
            <motion.div
              className="absolute inset-0 overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.08 }}
              transition={{ delay: 0.3, duration: 1 }}
            >
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute left-0 right-0 h-px bg-primary"
                  style={{ top: `${20 + i * 15}%` }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.2 + i * 0.15, duration: 1.2, ease: "easeOut" }}
                />
              ))}
            </motion.div>

            {/* Logo / Name */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <h1 className="heading-font text-5xl md:text-7xl font-bold tracking-wider text-foreground">
                JVK
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground mt-4"
            >
              Principal Design Engineer
            </motion.p>

            {/* Loading bar */}
            <motion.div className="mt-10 w-40 h-px bg-border overflow-hidden rounded-full">
              <motion.div
                className="h-full bg-primary"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.5, duration: 2, ease: "easeInOut" }}
              />
            </motion.div>
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
