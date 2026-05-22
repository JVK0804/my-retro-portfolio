import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SketchFilter from "@/components/SketchFilter";
import { useSound } from "@/contexts/SoundContext";

const sectionNav = ["Intro", "Screens", "Features"];

const screens = [
  {
    no: "Screen 01",
    title: "Home Screen",
    body: "Displays the data of the user's activity — how many challenges they've been through and how many photos they've captured to date. This motivates users to discover and accomplish more challenges.",
  },
  {
    no: "Screen 02",
    title: "Main Camera Screen",
    body: "Where users operate the camera to capture images with real-time insights. The camera maintains transparency of real-time data — showing how the values change as you move the camera. With grid-guidance mode, users can understand and learn how to frame subjects using various types of grids.",
  },
  {
    no: "Screen 03",
    title: "Community Screen",
    body: "Contains resources to learn the basics of mobile photography — mainly dynamic challenges with explanations. It also surfaces the work of fellow photographers who have posted to the community, helping users find motivation.",
  },
];

const features = [
  {
    no: "Feature 01",
    title: "Image Data in Real Time",
    body: "While you point the camera at a subject it analyses and displays the values in real time, letting users see how the values change dynamically based on light as you pan the camera.",
  },
  {
    no: "Feature 02",
    title: "Real-Time Guidance That Signals Frame Alignment",
    body: "When users switch into grid-guidance mode they see a signal bar indicating whether the frame is aligned to the selected grid format. Once the frame is aligned, the gray bar turns yellow — signaling that the frame is positioned perfectly.",
  },
  {
    no: "Feature 03",
    title: "User-Controlled Live Data",
    body: "The live data shown at the top of the screen lets users know what's happening with the image while capturing. This feature also lets users control that live data — setting specific values while capturing to achieve the desired result.",
  },
];

const SectionHeader = ({ kicker, title }: { kicker: string; title: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.6 }}
    className="mb-12"
  >
    <p className="font-body text-[10px] tracking-[0.3em] uppercase text-primary mb-4">{kicker}</p>
    <h2 className="mono-heading text-3xl md:text-5xl font-bold text-foreground max-w-3xl leading-tight">
      {title}
    </h2>
    <div className="retro-divider w-24 mt-6" />
  </motion.div>
);

const SmartAlignCaseStudy = () => {
  const { play } = useSound();

  return (
    <div className="noise-overlay min-h-screen bg-background text-foreground">
      <SketchFilter />
      <Navbar />

      {/* === HERO === */}
      <section className="pt-32 pb-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-between mb-12 flex-wrap gap-4"
          >
            <Link
              to="/#work"
              onClick={() => play("click")}
              onMouseEnter={() => play("hover")}
              className="font-body text-xs text-foreground/70 hover:text-primary transition-colors inline-flex items-center gap-2"
            >
              <ArrowLeft size={14} /> Back to work
            </Link>
            <div className="flex flex-wrap gap-3">
              {sectionNav.map((s) => (
                <a
                  key={s}
                  href={`#${s.toLowerCase()}`}
                  onClick={() => play("click")}
                  className="font-body text-[10px] tracking-widest uppercase text-foreground/50 hover:text-primary transition-colors"
                >
                  {s}
                </a>
              ))}
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-8"
          >
            Smart Align · Mobile AI Photography
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="mono-heading text-4xl md:text-7xl font-bold text-foreground leading-[1.05] mb-8"
          >
            I've missed shots. <br />
            Not because of light or timing — <br />
            because I didn't <span className="teal-shimmer">know where to look</span>.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="font-body text-foreground/70 text-base md:text-lg max-w-2xl leading-relaxed mb-12"
          >
            Turns out, most people haven't either. Mobile photography is everywhere — and the apps are doing great. But did they address the problems?
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="flex items-center gap-6 flex-wrap"
          >
            <a
              href="#screens"
              onClick={() => play("click")}
              onMouseEnter={() => play("hover")}
              className="rounded-[var(--radius-md)] bg-primary px-7 py-3 font-heading text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-md transition-opacity hover:opacity-90"
            >
              See the Screens
            </a>
            <a
              href="#features"
              onClick={() => play("click")}
              className="font-body text-sm text-primary hover:underline inline-flex items-center gap-2"
            >
              Product Features <ArrowRight size={14} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* === SCREENS === */}
      <section id="screens" className="py-24 px-6 border-t border-border/40">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            kicker="Final Screens"
            title={<>Finalised screens based on <span className="teal-shimmer">user feedback</span>.</>}
          />
          <div className="space-y-8">
            {screens.map((s, i) => (
              <motion.article
                key={s.no}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: i * 0.1, duration: 0.7 }}
                className="glass-card p-8 md:p-12 grid md:grid-cols-5 gap-8 items-start"
              >
                <div className="md:col-span-2">
                  <p className="font-body text-[10px] tracking-widest uppercase text-primary mb-3">{s.no}</p>
                  <h3 className="mono-heading text-2xl md:text-3xl font-bold text-foreground mb-4 leading-snug">{s.title}</h3>
                </div>
                <div className="md:col-span-3 border-l-0 md:border-l-2 border-primary/30 md:pl-8">
                  <p className="font-body text-foreground/80 leading-relaxed">{s.body}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* === FEATURES === */}
      <section id="features" className="py-24 px-6 border-t border-border/40">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            kicker="Product Features"
            title={
              <>
                Smart Align combines cutting-edge AI with intuitive design to{" "}
                <span className="teal-shimmer">revolutionize mobile photography composition</span>.
              </>
            }
          />
          <div className="space-y-8">
            {features.map((f, i) => (
              <motion.article
                key={f.no}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: i * 0.1, duration: 0.7 }}
                className="glass-card p-8 md:p-12 grid md:grid-cols-5 gap-8 items-start"
              >
                <div className="md:col-span-2">
                  <p className="font-body text-[10px] tracking-widest uppercase text-primary mb-3">{f.no}</p>
                  <h3 className="mono-heading text-2xl md:text-3xl font-bold text-foreground leading-snug">{f.title}</h3>
                </div>
                <div className="md:col-span-3 border-l-0 md:border-l-2 border-primary/30 md:pl-8">
                  <p className="font-body text-foreground/80 leading-relaxed">{f.body}</p>
                </div>
              </motion.article>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-20 text-center"
          >
            <Link
              to="/#work"
              onClick={() => play("click")}
              onMouseEnter={() => play("hover")}
              className="inline-flex items-center gap-3 rounded-[var(--radius-md)] bg-primary px-8 py-3 font-heading text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-md transition-opacity hover:opacity-90"
            >
              <ArrowLeft size={14} /> Back to all projects
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SmartAlignCaseStudy;
