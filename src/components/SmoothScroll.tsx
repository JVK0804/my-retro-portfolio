import { useEffect } from "react";
import { useReducedMotion } from "framer-motion";
import Lenis from "lenis";

/**
 * Lenis inertia scroll on the home experience; native smooth scroll elsewhere.
 */
const SmoothScroll = () => {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("smooth-scroll");

    if (reduceMotion) return;

    const lenis = new Lenis({
      lerp: 0.085,
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.15,
    });

    let frame = 0;
    const onFrame = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(onFrame);
    };
    frame = requestAnimationFrame(onFrame);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, [reduceMotion]);

  return null;
};

export default SmoothScroll;
