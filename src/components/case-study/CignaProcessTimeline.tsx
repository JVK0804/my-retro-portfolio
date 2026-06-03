import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Hammer, Rocket, Search, Users, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type ProcessStep = {
  no: string;
  title: string;
  headline: string;
  summary: string;
  icon: LucideIcon;
};

const steps: ProcessStep[] = [
  {
    no: "01",
    title: "Discovery",
    headline: "Map what already exists.",
    summary: "Audited Mednext patterns and gaps before designing anything new.",
    icon: Search,
  },
  {
    no: "02",
    title: "Alignment",
    headline: "Get three teams on one page.",
    summary: "Working sessions to surface conflicts early and agree on shared principles.",
    icon: Users,
  },
  {
    no: "03",
    title: "Design + Build",
    headline: "Build for reuse, not one-offs.",
    summary: "20+ composable React components aligned to the healthcare design system.",
    icon: Hammer,
  },
  {
    no: "04",
    title: "Integration",
    headline: "Ship without breaking production.",
    summary: "Tight QA with engineering. Zero regressions at launch.",
    icon: Rocket,
  },
];

const CignaProcessTimeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.75", "end 0.35"],
  });

  const lineScale = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1]), {
    stiffness: 120,
    damping: 28,
  });

  useEffect(() => {
    const nodes = stepRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          const idx = Number(visible[0].target.getAttribute("data-step-index"));
          if (!Number.isNaN(idx)) setActiveIndex(idx);
        }
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full text-left">
      {/* Track — flush with section heading */}
      <div className="absolute left-0 top-2 bottom-2 w-px bg-border/60" aria-hidden />
      <motion.div
        className="absolute left-0 top-2 w-0.5 bg-primary origin-top"
        style={{ scaleY: lineScale, height: "calc(100% - 1rem)" }}
        aria-hidden
      />

      <ul className="relative space-y-6 md:space-y-8 pl-10 md:pl-12">
        {steps.map((step, i) => {
          const Icon = step.icon;
          const isActive = activeIndex === i;

          return (
            <li key={step.no} className="list-none">
              <motion.article
                ref={(el) => {
                  stepRefs.current[i] = el;
                }}
                data-step-index={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                className={cn(
                  "relative rounded-[var(--radius-md)] border-2 p-6 md:p-8 transition-all duration-500",
                  isActive
                    ? "border-primary bg-primary/5 shadow-md scale-[1.01]"
                    : "border-border/50 bg-muted/10 opacity-55 scale-[0.99]",
                )}
              >
                <span
                  className={cn(
                    "absolute top-8 flex size-8 -translate-x-1/2 items-center justify-center rounded-full border-2 transition-colors duration-500",
                    "left-0 -ml-10 md:-ml-12",
                    isActive
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background text-foreground/40",
                  )}
                  aria-hidden
                >
                  <Icon size={14} strokeWidth={2.25} />
                </span>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
                  <div
                    className={cn(
                      "flex size-12 shrink-0 items-center justify-center rounded-lg border transition-colors duration-500",
                      isActive ? "border-primary/40 bg-primary/10 text-primary" : "border-border/60 text-foreground/45",
                    )}
                  >
                    <Icon size={22} strokeWidth={1.75} />
                  </div>
                  <div className="min-w-0 flex-1 text-left">
                    <p className="font-body text-[10px] tracking-widest uppercase text-primary mb-2">
                      Step {step.no} · {step.title}
                    </p>
                    <h3 className="mono-heading text-xl md:text-2xl font-bold text-foreground leading-snug mb-2">
                      {step.headline}
                    </h3>
                    <p className="font-body text-sm text-foreground/75 leading-relaxed">{step.summary}</p>
                  </div>
                </div>
              </motion.article>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CignaProcessTimeline;
