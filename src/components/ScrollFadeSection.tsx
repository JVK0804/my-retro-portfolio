import { ReactNode, useRef } from "react";
import { motion, useMotionTemplate, useScroll, useTransform } from "framer-motion";

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

  const opacity = useTransform(scrollYProgress, [0, 0.45, 0.72, 1], [1, 1, 0.38, 0]);
  const blur = useTransform(scrollYProgress, [0.55, 1], [0, 14]);
  const y = useTransform(scrollYProgress, [0.55, 1], [0, -44]);
  const scale = useTransform(scrollYProgress, [0.55, 1], [1, 0.985]);
  const filter = useMotionTemplate`blur(${blur}px)`;

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ opacity, y, scale, filter, willChange: "transform, filter, opacity" }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollFadeSection;
