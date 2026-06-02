import { motion } from "framer-motion";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSound } from "@/contexts/SoundContext";
import CaseStudyCardMedia from "@/components/CaseStudyCardMedia";

type CaseStudy = {
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  impact: string;
  readTime: string;
  image: string;
  mediaType: "video" | "image";
  href: string;
  priority?: boolean;
};

const caseStudies: CaseStudy[] = [
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
    priority: true,
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
    priority: true,
  },
];

const CaseStudyTiles = () => {
  const { play } = useSound();

  useEffect(() => {
    const links: HTMLLinkElement[] = [];
    caseStudies.forEach((study) => {
      if (study.mediaType !== "image" || !study.priority) return;
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = study.image;
      document.head.appendChild(link);
      links.push(link);
    });
    return () => links.forEach((el) => el.remove());
  }, []);

  return (
    <section id="work" className="py-24 px-6">
      <div className="max-w-6xl mx-auto relative z-10">
        <div>
          <h2 className="mono-heading text-2xl md:text-3xl font-bold text-foreground mb-4">
            Selected Work
          </h2>
          <p className="font-body text-foreground/60 mb-16 max-w-lg">
            Case studies spanning healthcare, AI, and enterprise, where craft meets complexity.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {caseStudies.map((study, idx) => {
            const isInternal = study.href.startsWith("/");
            const cardInner = (
              <>
                <div className="relative overflow-hidden">
                  <CaseStudyCardMedia
                    src={study.image}
                    alt={study.subtitle}
                    mediaType={study.mediaType}
                    priority={study.priority ?? idx === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/80 pointer-events-none" />
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
                    <p className="font-body text-[11px] mt-4">
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
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05, duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
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
      </div>
    </section>
  );
};

export default CaseStudyTiles;
