import { motion } from "framer-motion";
import { Cpu, Eye, Layers } from "lucide-react";

const pillars = [
  {
    icon: Cpu,
    title: "AI-First UX",
    description: "Designing interfaces that augment human cognition rather than replace it. Every AI interaction should feel like a natural extension of thought.",
  },
  {
    icon: Eye,
    title: "Technical Feasibility",
    description: "A designer's eye with a developer's mindset. Every pixel is validated against engineering constraints before it ships.",
  },
  {
    icon: Layers,
    title: "Privacy by Design",
    description: "User trust is non-negotiable. Data architecture and UX patterns are co-designed to protect without friction.",
  },
];

const PhilosophySection = () => {
  return (
    <section className="py-24 px-6 border-t-2 border-border">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
        >
          <p className="font-heading text-[10px] text-primary mb-3 tracking-widest uppercase">
            Living Document
          </p>
          <h2 className="mono-heading text-2xl md:text-3xl font-bold text-foreground mb-4">
            Design Philosophy
          </h2>
          <div className="retro-divider w-24 mb-6" />
          <p className="font-body text-foreground/60 max-w-lg mb-16">
            Three pillars that guide every decision — from SmartAlign's AI systems to enterprise healthcare workflows.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="glass-card p-8"
            >
              <div className="w-10 h-10 flex items-center justify-center mb-6 border border-primary/30">
                <pillar.icon size={18} className="text-primary" />
              </div>
              <h3 className="mono-heading text-lg font-bold text-foreground mb-3">
                {pillar.title}
              </h3>
              <p className="font-body text-sm text-foreground/60 leading-relaxed">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PhilosophySection;
