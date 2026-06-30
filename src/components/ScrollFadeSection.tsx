import { type ReactNode, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ScrollFadeSectionProps {
  children: ReactNode;
  className?: string;
}

/** Lightweight scroll fade — opacity only (no blur) for smooth scrolling. */
const ScrollFadeSection = ({ children, className = "" }: ScrollFadeSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.75, 1], [1, 1, 0], { clamp: true });

  return (
    <motion.div ref={ref} className={className} style={{ opacity }}>
      {children}
    </motion.div>
  );
};

export default ScrollFadeSection;
