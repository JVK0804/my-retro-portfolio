import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useSound } from "@/contexts/SoundContext";
import caseStudyPrivacy from "@/assets/case-study-privacy.jpg";
import caseStudyPhotography from "@/assets/case-study-photography.jpg";
import caseStudyDesignSystem from "@/assets/case-study-designsystem.jpg";

const caseStudies = [
  {
    title: "Integrating AI Powered features in Slack, to enhance data privacy.",
    subtitle: "AI Design for Data Privacy",
    description: "Redesigned Slack's AI to make privacy feel human, empowering students to trust, learn, and take control of their data.",
    tags: ["AI", "Data Privacy", "UX Design"],
    impact: "20% increase in user engagement",
    readTime: "6 min Read",
    image: caseStudyPrivacy,
    href: "/work/slack",
  },
  {
    title: "AI Powered features to learn Mobile Photography",
    subtitle: "Mobile AI",
    description: "Designed Smart Align, an AI-powered mobile photography app that improved user interaction through iterative testing and feedback.",
    tags: ["Mobile AI", "Photography", "UX Research"],
    impact: "62% improved interaction · 35% less onboarding friction",
    readTime: "5 min Read",
    image: caseStudyPhotography,
    href: "/work/smartalign",
  },
  {
    title: "Collaboration That Scales Trust (NDA)",
    subtitle: "Design Systems",
    description: "Designed 20+ react components and built a unified design system for Cigna Enterprise enabling seamless collaboration across 3 teams with zero integration regressions.",
    tags: ["Design Systems", "Enterprise", "React"],
    impact: "Reduced development time by 35%",
    readTime: "4 min Read",
    image: caseStudyDesignSystem,
    href: "#work",
  },
];

const CaseStudyTiles = () => {
  const { play } = useSound();

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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {caseStudies.map((study, i) => {
            const isInternal = study.href.startsWith("/");
            const cardInner = (
              <>
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={study.image}
                    alt={study.subtitle}
                    loading="lazy"
                    width={800}
                    height={512}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
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
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
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
            className="glass-card px-8 py-3 font-heading text-xs font-bold text-primary-foreground bg-primary hover:opacity-90 transition-opacity tracking-wider uppercase cursor-pointer"
          >
            View all projects →
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default CaseStudyTiles;
