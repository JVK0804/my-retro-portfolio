import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ScrollFadeSectionProps {
  children: ReactNode;
  className?: string;
}

const ScrollFadeSection = ({ children, className = "" }: ScrollFadeSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [1, 1, 0.3, 0]);
  const blur = useTransform(scrollYProgress, [0.5, 1], [0, 8]);
  const scale = useTransform(scrollYProgress, [0.5, 1], [1, 0.98]);

  return (
    <motion.div
      ref={ref}
      style={{
        opacity,
        scale,
        filter: useTransform(blur, (v) => `blur(${v}px)`),
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollFadeSection;
