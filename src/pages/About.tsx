import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Briefcase, Camera } from "lucide-react";
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
            Digital Maturation
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="font-body text-foreground/70 text-lg text-center max-w-lg"
          >
            A Zillennial's journey from analog tactility to cloud-native design — each era leaving its fingerprint on how I build.
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

      {/* ===== WHO AM I — Introduction ===== */}
      <ScrollFadeSection>
        <section className="py-32 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-5 gap-12 items-center">
              {/* Photo placeholder */}
              <motion.div
                className="md:col-span-2"
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8 }}
              >
                <div className="aspect-[3/4] w-full bg-muted/50 border-2 border-border flex items-center justify-center relative overflow-hidden group">
                  <div className="text-center text-muted-foreground/60 p-6">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full border-2 border-dashed border-muted-foreground/30 flex items-center justify-center">
                      <Camera size={24} className="text-muted-foreground/40" />
                    </div>
                    <p className="font-heading text-xs tracking-widest uppercase">Portrait Photo</p>
                    <p className="font-body text-[10px] mt-1">Placeholder</p>
                  </div>
                  <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-primary/30" />
                  <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-primary/30" />
                  <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-primary/30" />
                  <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-primary/30" />
                </div>
              </motion.div>

              {/* Bio text */}
              <motion.div
                className="md:col-span-3"
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, delay: 0.15 }}
              >
                <p className="font-heading text-xs text-primary mb-4 tracking-widest uppercase">
                  Who Am I
                </p>
                <h2 className="mono-heading text-3xl md:text-5xl font-bold text-foreground mb-6">
                  Hey, I'm <span className="teal-shimmer">Kaushik JV</span>
                </h2>
                <div className="flex flex-wrap gap-4 mb-6">
                  <span className="retro-tag inline-flex items-center gap-2">
                    <Briefcase size={12} /> Product Designer & Design Engineer
                  </span>
                  <span className="retro-tag inline-flex items-center gap-2">
                    <MapPin size={12} /> India → Bay Area
                  </span>
                </div>
                <p className="font-body text-foreground/80 leading-relaxed mb-4">
                  With 6+ years in the design trenches, I've shipped products that millions use daily — from enterprise platforms at Kyndryl and Health Catalyst to privacy-first AI features at scale.
                </p>
                <p className="font-body text-foreground/70 leading-relaxed mb-4">
                  I sit at the intersection of design and engineering — fluent in Figma and code, equally at home pushing pixels or writing production React. I believe the best interfaces feel inevitable, like they couldn't have been designed any other way.
                </p>
                <p className="font-body text-foreground/60 leading-relaxed">
                  When I'm not designing, you'll find me behind a camera lens, exploring cities, or diving into the latest in spatial computing and AI.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      </ScrollFadeSection>

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

      {/* ===== PHOTOGRAPHY SECTION WITH CTA ===== */}
      <ScrollFadeSection>
        <section className="py-32 px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8 }}
            >
              <p className="font-heading text-xs text-primary mb-4 tracking-widest uppercase">
                Beyond the Screen
              </p>
              <h2 className="mono-heading text-3xl md:text-5xl font-bold text-foreground mb-6">
                Through the Lens
              </h2>
              <p className="font-body text-foreground/70 leading-relaxed max-w-xl mb-10">
                Photography grounds my design work. Framing a shot teaches composition, light teaches contrast, and street photography teaches empathy — all skills that transfer directly to interface design.
              </p>
            </motion.div>

            {/* Photo grid with placeholders */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <motion.div
                  key={n}
                  className={`bg-muted/30 border-2 border-border flex items-center justify-center relative overflow-hidden ${
                    n === 1 ? "row-span-2 aspect-[3/4]" : "aspect-square"
                  }`}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: n * 0.08, duration: 0.6 }}
                >
                  <div className="text-center text-muted-foreground/40">
                    <Camera size={20} className="mx-auto mb-2" />
                    <p className="font-body text-[10px]">Photo {n}</p>
                  </div>
                  <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-primary/20" />
                  <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-primary/20" />
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <Link
                to="/photography"
                className="inline-flex items-center gap-3 glass-card px-6 py-3 font-heading text-sm text-primary hover:gap-5 transition-all duration-300 group"
              >
                <Camera size={16} />
                View full photography gallery
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </section>
      </ScrollFadeSection>

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
              Every project I take on starts with empathy and ends with precision. I believe great design is invisible — it just <em>works</em>. Whether it's a design system used by hundreds of engineers or a privacy-first AI feature, the goal is always the same: make technology feel human.
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
