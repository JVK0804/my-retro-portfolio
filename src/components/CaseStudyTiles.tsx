import { motion } from "framer-motion";

const caseStudies = [
  {
    title: "SmartAlign",
    subtitle: "AI-First UX Design System",
    description: "Pioneering alignment between AI capabilities and human-centered interfaces.",
    tags: ["Product Design", "AI/ML", "Design System"],
  },
  {
    title: "Health Catalyst",
    subtitle: "Healthcare Data Platform",
    description: "Transforming complex healthcare data into intuitive clinical workflows for 1M+ users.",
    tags: ["Enterprise", "Data Viz", "Accessibility"],
  },
  {
    title: "Kyndryl Design",
    subtitle: "Enterprise Infrastructure UX",
    description: "Redesigning IT infrastructure management with user-first thinking at global scale.",
    tags: ["Enterprise", "UX Strategy", "Research"],
  },
];

const CaseStudyTiles = () => {
  return (
    <section id="work" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="mono-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            Selected Work
          </h2>
          <p className="font-body text-foreground/60 mb-16 max-w-lg">
            Case studies spanning healthcare, AI, and enterprise — where craft meets complexity.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {caseStudies.map((study, i) => (
            <motion.article
              key={study.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="glass-card p-8 flex flex-col justify-between min-h-[320px] group cursor-pointer"
            >
              <div>
                <p className="font-heading text-xs text-primary mb-3 tracking-wider uppercase">
                  {study.subtitle}
                </p>
                <h3 className="mono-heading text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {study.title}
                </h3>
                <p className="font-body text-foreground/60 text-sm leading-relaxed">
                  {study.description}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 mt-6">
                {study.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-heading text-[10px] px-3 py-1 rounded-full bg-secondary text-secondary-foreground uppercase tracking-wider"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudyTiles;
