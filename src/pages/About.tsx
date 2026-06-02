import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Briefcase } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollFadeSection from "@/components/ScrollFadeSection";
import StickyChapters from "@/components/StickyChapters";
import CitiesJourney from "@/components/CitiesJourney";

/* ───── Main About Page ───── */
const About = () => {
  return (
    <div className="noise-overlay min-h-screen bg-background">
      <Navbar />

      {/* ===== HERO INTRO ===== */}
      <ScrollFadeSection>
        <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-24">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="font-heading text-xs text-primary mb-4 tracking-widest uppercase"
          >
            The Chaptered Journey
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mono-heading text-5xl md:text-7xl font-bold text-center max-w-4xl mb-6"
          >
            My Retro portfolio
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="font-body text-foreground/70 text-lg text-center max-w-lg"
          >
            A Zillennial's journey from analog tactility to cloud-native design. Each era leaving its fingerprint on how I build.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-16 text-foreground/50 animate-bounce"
          >
            ↓ Scroll to begin
          </motion.div>
        </section>
      </ScrollFadeSection>

      {/* ===== WHO I AM + WHERE I'M FROM — merged sticky journey ===== */}
      <ScrollFadeSection>
        <section className="pt-32 pb-12 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mx-auto mb-8 w-36 h-36 md:w-44 md:h-44"
            >
              <div className="relative size-full overflow-hidden rounded-full border-2 border-primary/30 bg-muted/20 shadow-md">
                <img
                  src="/headshot/portfolio-headshot.webp"
                  alt="Portrait of Kaushik JV"
                  width={352}
                  height={352}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="size-full object-cover object-[50%_32%]"
                />
              </div>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-heading text-xs text-primary mb-4 tracking-widest uppercase"
            >
              Who I Am · Where I'm From
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="mono-heading text-3xl md:text-5xl font-bold text-foreground mb-6"
            >
              Hey, I'm <span className="teal-shimmer">Kaushik JV</span>
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="flex flex-wrap gap-3 justify-center mb-6"
            >
              <span className="retro-tag inline-flex items-center gap-2">
                <Briefcase size={12} /> Product Designer & Design Engineer
              </span>
              <span className="retro-tag inline-flex items-center gap-2">
                <MapPin size={12} /> India → Bay Area
              </span>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="font-body text-foreground/70 leading-relaxed"
            >
              6+ years designing at the intersection of craft and code, shipping enterprise products at Deloitte for clients like Anthem, Cigna, and the Commonwealth of Massachusetts. Scroll to trace the three cities that shaped me.
            </motion.p>
          </div>
        </section>
      </ScrollFadeSection>

      {/* Sticky cities journey */}
      <CitiesJourney />

      {/* ===== WHERE I'VE BEEN — Quick Stats ===== */}
      <ScrollFadeSection>
        <section className="py-16 px-6 border-y border-border/50">
          <div className="max-w-5xl mx-auto">
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              {[
                { value: "6+", label: "Years in Design" },
                { value: "4", label: "Countries Lived" },
                { value: "50+", label: "Products Shipped" },
                { value: "∞", label: "Cups of Coffee" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                >
                  <p className="mono-heading text-3xl md:text-4xl font-bold text-primary mb-2">
                    {stat.value}
                  </p>
                  <p className="font-body text-xs text-muted-foreground tracking-wider uppercase">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </ScrollFadeSection>

      {/* ===== STICKY CHAPTERS — Era Journey ===== */}
      <StickyChapters />

      {/* ===== CLOSING — What drives me ===== */}
      <section className="py-32 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-heading text-xs text-primary mb-4 tracking-widest uppercase">
              What Drives Me
            </p>
            <h2 className="mono-heading text-3xl md:text-5xl font-bold text-foreground mb-8">
              Designing for <span className="teal-shimmer">humans first</span>,<br />
              engineering for scale.
            </h2>
            <p className="font-body text-foreground/70 text-lg leading-relaxed mb-10">
              Every project I take on starts with empathy and ends with precision. I believe great design is invisible: it just <em>works</em>. Whether it's a design system used by hundreds of engineers or a privacy-first AI feature, the goal is always the same: make technology feel human.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/#work"
                className="inline-flex items-center justify-center gap-3 glass-card px-8 py-4 font-heading text-sm text-primary hover:gap-5 transition-all duration-300 group"
              >
                See my work
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="mailto:kaushikjv@example.com"
                className="inline-flex items-center justify-center gap-3 glass-card px-8 py-4 font-heading text-sm text-foreground/70 hover:text-foreground transition-all duration-300"
              >
                Say hello →
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
