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
  const stepRefs = useRef<(HTMLElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.7", "end 0.3"],
  });

  const lineScale = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1]), {
    stiffness: 100,
    damping: 30,
  });

  useEffect(() => {
    const nodes = stepRefs.current.filter(Boolean) as HTMLElement[];
    if (!nodes.length) return;

    const pickActive = () => {
      const viewportCenter = window.innerHeight * 0.42;
      let bestIdx = 0;
      let bestDistance = Infinity;

      nodes.forEach((node, idx) => {
        const rect = node.getBoundingClientRect();
        const cardCenter = rect.top + rect.height / 2;
        const distance = Math.abs(cardCenter - viewportCenter);
        if (distance < bestDistance) {
          bestDistance = distance;
          bestIdx = idx;
        }
      });

      setActiveIndex(bestIdx);
    };

    pickActive();

    const observer = new IntersectionObserver(
      () => pickActive(),
      { root: null, rootMargin: "-42% 0px -42% 0px", threshold: [0, 0.15, 0.35, 0.55, 0.75, 1] },
    );

    nodes.forEach((node) => observer.observe(node));
    window.addEventListener("scroll", pickActive, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", pickActive);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full text-left">
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
          const isPast = i < activeIndex;
          const isFuture = i > activeIndex;

          return (
            <li key={step.no} className="list-none">
              <article
                ref={(el) => {
                  stepRefs.current[i] = el;
                }}
                data-step-index={i}
                className={cn(
                  "relative rounded-[var(--radius-md)] border-2 p-6 md:p-8 transition-[opacity,transform,border-color,background-color,box-shadow] duration-700 ease-out",
                  isActive
                    ? "opacity-100 border-primary bg-primary/5 shadow-md scale-100"
                    : isFuture
                      ? "opacity-[0.22] border-border/35 bg-muted/5 scale-[0.98]"
                      : "opacity-40 border-border/45 bg-muted/10 scale-[0.99]",
                )}
              >
                <span
                  className={cn(
                    "absolute top-8 flex size-8 -translate-x-1/2 items-center justify-center rounded-full border-2 transition-all duration-700",
                    "left-0 -ml-10 md:-ml-12",
                    isActive
                      ? "border-primary bg-primary text-primary-foreground scale-100"
                      : "border-border/50 bg-background text-foreground/30 scale-90",
                  )}
                  aria-hidden
                >
                  <Icon size={14} strokeWidth={2.25} />
                </span>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
                  <div
                    className={cn(
                      "flex size-12 shrink-0 items-center justify-center rounded-lg border transition-all duration-700",
                      isActive
                        ? "border-primary/40 bg-primary/10 text-primary"
                        : "border-border/40 text-foreground/30",
                    )}
                  >
                    <Icon size={22} strokeWidth={1.75} />
                  </div>
                  <div className="min-w-0 flex-1 text-left">
                    <p
                      className={cn(
                        "font-body text-[10px] tracking-widest uppercase mb-2 transition-colors duration-700",
                        isActive ? "text-primary" : "text-primary/40",
                      )}
                    >
                      Step {step.no} · {step.title}
                    </p>
                    <h3
                      className={cn(
                        "mono-heading text-xl md:text-2xl font-bold leading-snug mb-2 transition-colors duration-700",
                        isActive ? "text-foreground" : "text-foreground/45",
                      )}
                    >
                      {step.headline}
                    </h3>
                    <p
                      className={cn(
                        "font-body text-sm leading-relaxed transition-colors duration-700",
                        isActive ? "text-foreground/75" : "text-foreground/40",
                      )}
                    >
                      {step.summary}
                    </p>
                  </div>
                </div>
              </article>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CignaProcessTimeline;
