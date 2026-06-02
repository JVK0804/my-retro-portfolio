import { motion, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSound } from "@/contexts/SoundContext";

const caseStudies = [
  {
    title: "Integrating AI Powered features in Slack, to enhance data privacy.",
    subtitle: "AI Design for Data Privacy",
    description: "Redesigned Slack's AI to make privacy feel human, empowering students to trust, learn, and take control of their data.",
    tags: ["AI", "Data Privacy", "UX Design"],
    impact: "20% increase in user engagement",
    readTime: "6 min Read",
    image: "/case-study-cards/slack.webm",
    mediaType: "video" as const,
    href: "/work/slack",
  },
  {
    title: "AI Powered features to learn Mobile Photography",
    subtitle: "Mobile AI",
    description: "Designed Smart Align, an AI-powered mobile photography app that improved user interaction through iterative testing and feedback.",
    tags: ["Mobile AI", "Photography", "UX Research"],
    impact: "62% improved interaction · 35% less onboarding friction",
    readTime: "5 min Read",
    image: "/case-study-cards/smart-align.webp",
    mediaType: "image" as const,
    href: "/work/smartalign",
  },
  {
    title: "Collaboration That Scales Trust (NDA)",
    subtitle: "Design Systems",
    description: "Designed 20+ react components and built a unified design system for Cigna Enterprise enabling seamless collaboration across 3 teams with zero integration regressions.",
    tags: ["Design Systems", "Enterprise", "React"],
    impact: "Reduced development time by 35%",
    readTime: "4 min Read",
    image: "/case-study-cards/cigna-thumb.webp",
    mediaType: "image" as const,
    href: "/work/cigna",
  },
];

const CaseStudyTiles = () => {
  const { play } = useSound();
  const gridRef = useRef<HTMLDivElement>(null);
  const inView = useInView(gridRef, { once: true, amount: 0.5 });

  // Simple fade-in without flicker
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
      },
    }),
  };

  return (
    <section id="work" className="py-24 px-6">
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "50px" }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="mono-heading text-2xl md:text-3xl font-bold text-foreground mb-4">
            Selected Work
          </h2>
          <div className="retro-divider w-24 mb-6" />
          <p className="font-body text-foreground/60 mb-16 max-w-lg">
            Case studies spanning healthcare, AI, and enterprise — where craft meets complexity.
          </p>
        </motion.div>

        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {caseStudies.map((study, idx) => {
            const isInternal = study.href.startsWith("/");
            const cardInner = (
              <>
                <div className="relative overflow-hidden">
                  {study.mediaType === "video" ? (
                    <video
                      src={study.image}
                      aria-label={study.subtitle}
                      muted
                      playsInline
                      loop
                      autoPlay
                      preload="metadata"
                      className="block w-full h-auto"
                    />
                  ) : (
                    <img
                      src={study.image}
                      alt={study.subtitle}
                      loading="lazy"
                      className="block w-full h-auto"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/80" />
                </div>
                <div className="p-7 pt-4 flex flex-col flex-1 justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <p className="font-heading text-[10px] text-primary tracking-widest uppercase">
                        {study.subtitle}
                      </p>
                      <span className="font-body text-[10px] text-foreground/40">⏱ {study.readTime}</span>
                    </div>
                    <h3 className="mono-heading text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors leading-snug">
                      {study.title}
                    </h3>
                    <p className="font-body text-foreground/60 text-sm leading-relaxed">
                      {study.description}
                    </p>
                  </div>
                  <div>
                    <div className="flex flex-wrap gap-2 mt-6">
                      {study.tags.map((tag) => (
                        <span key={tag} className="retro-tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="retro-divider w-full mt-4 mb-2" />
                    <p className="font-body text-[11px]">
                      <span className="text-foreground/50 mr-2">IMPACT</span>
                      <span className="text-primary font-medium">{study.impact}</span>
                    </p>
                  </div>
                </div>
              </>
            );

            const wrapperClass = "glass-card flex flex-col justify-between min-h-[460px] group cursor-pointer overflow-hidden";

            return (
              <motion.div
                key={study.title}
                custom={idx}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={cardVariants}
                onMouseEnter={() => play("hover")}
              >
                {isInternal ? (
                  <Link to={study.href} onClick={() => play("click")} className={wrapperClass}>
                    {cardInner}
                  </Link>
                ) : (
                  <a href={study.href} className={wrapperClass}>
                    {cardInner}
                  </a>
                )}
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mt-14"
        >
          <a
            href="#work"
            onClick={() => play("click")}
            onMouseEnter={() => play("hover")}
            className="cursor-pointer rounded-[var(--radius-md)] bg-primary px-8 py-3 font-heading text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-md transition-opacity hover:opacity-90"
          >
            View all projects →
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default CaseStudyTiles;
