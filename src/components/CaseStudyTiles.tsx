import { motion } from "framer-motion";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSound } from "@/contexts/SoundContext";
import CaseStudyCardMedia from "@/components/CaseStudyCardMedia";

type CaseStudy = {
  projectName: string;
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
    projectName: "Slack AI",
    title: "Integrating AI Powered features in Slack, to enhance data privacy.",
    subtitle: "AI Design for Data Privacy",
    description:
      "Redesigned Slack's AI to make privacy feel human, empowering students to trust, learn, and take control of their data.",
    tags: ["AI", "Data Privacy", "UX Design"],
    impact: "20% increase in user engagement",
    readTime: "6 min Read",
    image: "/case-studies/slack/hifi/slack-full.webm",
    mediaType: "video",
    href: "/work/slack",
    priority: true,
  },
  {
    projectName: "Cigna Healthcare",
    title: "Collaboration That Scales Trust (NDA)",
    subtitle: "Design Systems",
    description:
      "Designed 20+ react components and built a unified design system for Cigna Enterprise enabling seamless collaboration across 3 teams with zero integration regressions.",
    tags: ["Design Systems", "Enterprise", "React"],
    impact: "Reduced development time by 35%",
    readTime: "4 min Read",
    image: "/case-studies/cigna/cigna-hero.webm",
    mediaType: "video",
    href: "/work/cigna",
    priority: true,
  },
  {
    projectName: "Smart Align",
    title: "AI Powered features to learn Mobile Photography",
    subtitle: "Mobile AI",
    description:
      "Designed Smart Align, an AI-powered mobile photography app that improved user interaction through iterative testing and feedback.",
    tags: ["Mobile AI", "Photography", "UX Research"],
    impact: "62% improved interaction · 35% less onboarding friction",
    readTime: "5 min Read",
    image: "/case-study-cards/smart-align.webp",
    mediaType: "image",
    href: "/work/smartalign",
    priority: true,
  },
];

const CaseStudyTiles = () => {
  const { play } = useSound();

  useEffect(() => {
    const links: HTMLLinkElement[] = [];
    caseStudies.forEach((study) => {
      if (!study.priority) return;
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = study.mediaType === "video" ? "video" : "image";
      link.href = study.image;
      document.head.appendChild(link);
      links.push(link);
    });
    return () => links.forEach((el) => el.remove());
  }, []);

  return (
    <section id="work" className="py-24 px-6">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-14 md:mb-16">
          <h2 className="mono-heading text-2xl md:text-3xl font-bold text-foreground mb-3">
            Selected Work
          </h2>
          <p className="font-body text-foreground/60 max-w-lg leading-relaxed">
            Case studies spanning healthcare, AI, and enterprise, where craft meets complexity.
          </p>
        </div>

        <div className="flex flex-col gap-10 md:gap-14">
          {caseStudies.map((study, idx) => {
            const isInternal = study.href.startsWith("/");
            const cardInner = (
              <div className="grid md:grid-cols-[1.3fr_0.7fr] lg:grid-cols-[3fr_2fr] md:gap-6 lg:gap-8 md:items-center p-3 sm:p-4 md:p-4">
                <div className="min-w-0">
                  <CaseStudyCardMedia
                    src={study.image}
                    alt={`${study.projectName} prototype preview`}
                    mediaType={study.mediaType}
                    priority={study.priority ?? idx === 0}
                    className="rounded-lg"
                  />
                </div>

                <div className="flex flex-col gap-2.5 md:gap-3 mt-5 md:mt-0 md:py-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <p className="mono-heading text-xl md:text-2xl lg:text-3xl font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
                      {study.projectName}
                    </p>
                    <span className="font-body text-[10px] text-foreground/45 shrink-0">
                      ⏱ {study.readTime}
                    </span>
                  </div>

                  <p className="font-heading text-[10px] text-primary tracking-widest uppercase">
                    {study.subtitle}
                  </p>

                  <h3 className="mono-heading text-base md:text-lg font-bold text-foreground leading-snug pt-1">
                    {study.title}
                  </h3>

                  <p className="font-body text-foreground/65 text-sm leading-relaxed">
                    {study.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {study.tags.map((tag) => (
                      <span key={tag} className="retro-tag">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <p className="font-body text-[11px] pt-1">
                    <span className="text-foreground/50 mr-2">IMPACT</span>
                    <span className="text-primary font-medium">{study.impact}</span>
                  </p>
                </div>
              </div>
            );

            const wrapperClass =
              "glass-card group block w-full cursor-pointer overflow-hidden transition-colors hover:border-primary/30";

            return (
              <motion.article
                key={study.projectName}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: idx * 0.06, duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
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
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CaseStudyTiles;
