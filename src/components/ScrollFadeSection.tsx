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
    offset: ["start start", "end end"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 0.82, 1], [1, 1, 0.3, 0]);
  const blur = useTransform(scrollYProgress, [0.45, 1], [0, 16]);
  const y = useTransform(scrollYProgress, [0.5, 1], [0, -56]);
  const scale = useTransform(scrollYProgress, [0.5, 1], [1, 0.985]);
  const filter = useMotionTemplate`blur(${blur}px)`;

  return (
    <div ref={ref} className={`relative min-h-[135vh] md:min-h-[145vh] ${className}`}>
      <motion.div
        className="sticky top-24"
        style={{ opacity, y, scale, filter, willChange: "transform, filter, opacity" }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default ScrollFadeSection;
