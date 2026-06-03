import { useEffect } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Native smooth scroll + scroll performance hints (no extra scroll library).
 */
const SmoothScroll = () => {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("smooth-scroll", !reduceMotion);
    return () => root.classList.remove("smooth-scroll");
  }, [reduceMotion]);

  return null;
};

export default SmoothScroll;
