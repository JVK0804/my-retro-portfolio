import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const AboutMeSection = () => {
  return (
    <section className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-heading text-xs text-primary mb-4 tracking-widest uppercase">
            About Me
          </p>
          <h2 className="mono-heading text-4xl md:text-6xl font-bold text-foreground mb-8 max-w-3xl">
            A Designer Who Codes & Connects
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 mt-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            <p className="font-body text-lg text-foreground/80 leading-relaxed mb-6">
              I'm <span className="teal-shimmer font-bold">Kaushik JV</span>, a Product Designer & Design Engineer with 6+ years crafting digital experiences that bridge the gap between human intuition and technical precision.
            </p>
            <p className="font-body text-lg text-foreground/70 leading-relaxed">
              My journey from rewinding cassette tapes to designing cloud-native interfaces shaped a unique perspective — where analog warmth meets digital clarity.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: 0.35, duration: 0.7 }}
            className="flex flex-col justify-between"
          >
            <p className="font-body text-lg text-foreground/70 leading-relaxed mb-8">
              Combining a designer's eye and a <span className="font-heading text-primary">&lt;developer's mindset /&gt;</span> to create user-first experiences — backed by Privacy, Data, and relentless craft.
            </p>
            <Link
              to="/about"
              className="inline-flex items-center gap-3 font-heading text-sm text-primary hover:gap-5 transition-all duration-300 group"
            >
              Read the full story
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutMeSection;
