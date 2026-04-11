import { motion } from "framer-motion";

const stats = [
  { value: "1M+", label: "Global Users" },
  { value: "300+", label: "Tasks Resolved" },
  { value: "15+", label: "Projects" },
  { value: "6+", label: "Years Experience" },
];

const StatsBar = () => {
  return (
    <section className="py-16 px-6 border-t-2 border-b-2 border-border" style={{ filter: 'url(#sketch-wobble)' }}>
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            <p className="mono-heading text-2xl md:text-3xl font-bold teal-shimmer mb-1">
              {stat.value}
            </p>
            <p className="font-body text-xs text-foreground/50 tracking-wider uppercase">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default StatsBar;
