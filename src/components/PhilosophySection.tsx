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
    <section className="py-24 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <p className="font-mono text-xs text-primary mb-3 tracking-widest uppercase">
          Living Document
        </p>
        <h2 className="mono-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
          Design Philosophy
        </h2>
        <p className="font-body text-muted-foreground max-w-lg mb-16">
          Three pillars that guide every decision — from SmartAlign's AI systems to enterprise healthcare workflows.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="glass-card p-8"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <pillar.icon size={22} className="text-primary" />
              </div>
              <h3 className="mono-heading text-xl font-bold text-foreground mb-3">
                {pillar.title}
              </h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
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
