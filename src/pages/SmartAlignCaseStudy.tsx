import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SketchFilter from "@/components/SketchFilter";
import { useSound } from "@/contexts/SoundContext";

const sectionNav = [
  "Problem",
  "Process",
  "Sketches",
  "Designs",
  "Features",
  "Reflections",
];

const problems = [
  {
    no: "01",
    label: "Missed Moments",
    headline: "I've missed shots — not because of light or timing, but because I didn't know where to look.",
    body: "Most mobile photographers haven't either. Composition is the invisible skill nobody teaches — and the moment is gone before you can learn it.",
  },
  {
    no: "02",
    label: "Tools Without Teaching",
    headline: "Mobile photography apps are everywhere — and they're doing great. But did they address the real problem?",
    body: "Filters, presets, and AI scene modes do the work for you. None of them help you understand why a frame works. Users stay dependent on automation forever.",
  },
  {
    no: "03",
    label: "Opportunity",
    headline: "What if the camera could teach you to see — in real time?",
    body: "Instead of post-processing the mistake away, surface composition guidance the moment it matters. Inline. Contextual. Human.",
  },
];

const tested = [
  {
    status: "Cut",
    title: "Auto-Capture on Alignment",
    body: "Camera shutter would auto-fire the moment the frame snapped to a grid. Felt like the app was taking the photo for you.",
    quote: "\"It robbed me of the moment. I want to press the button.\" — From User Testing",
  },
  {
    status: "Evolve",
    title: "Static Grid Overlays",
    body: "A toggle for rule-of-thirds and golden ratio grids. Useful but passive — users still didn't know if they were aligned correctly.",
    quote: "\"Cool lines. Now what?\" — Became the dynamic Signal Bar.",
  },
  {
    status: "Shipped",
    title: "Real-Time Alignment Signal",
    body: "A live signal bar that turns from gray to yellow the instant your frame aligns to the chosen grid. Teaches by reinforcement.",
    quote: "\"I felt the moment it clicked.\" — Became the core of Smart Align.",
  },
];

const findings = [
  {
    no: "01",
    title: "Real-Time Beats Post-Hoc",
    body: "Users learned faster from in-the-moment signals than from any tutorial. The camera became the classroom.",
  },
  {
    no: "02",
    title: "Transparency Builds Trust",
    body: "Showing the live ISO, exposure, and focal data — instead of hiding it — made users feel in control, not patronized.",
  },
  {
    no: "03",
    title: "Community Closes the Loop",
    body: "Challenges and peer photos turned passive users into active learners. Motivation came from seeing others, not from streaks.",
  },
];

const features = [
  {
    no: "Feature 01",
    title: "Image Data in Real Time",
    quote: "\"Users didn't want auto. They wanted to understand.\"",
    sub: "Live Camera Telemetry",
    body: "While you point the camera at a subject, Smart Align analyses and displays the values in real time — letting users watch how exposure, ISO, and focal data shift as light and framing change.",
  },
  {
    no: "Feature 02",
    title: "Real-Time Grid Guidance",
    quote: "\"The bar turning yellow felt like a quiet 'yes'.\"",
    sub: "Signal Bar Alignment",
    body: "Switch into grid-guidance mode and a signal bar appears. It stays gray as you frame — and snaps to yellow the moment your composition aligns to the selected grid. No menus. No coaching. Just feel.",
  },
  {
    no: "Feature 03",
    title: "User-Controlled Live Data",
    quote: "\"Show me the values. Then let me drive them.\"",
    sub: "Manual Override, Made Simple",
    body: "The same live data that teaches you also becomes the controls. Tap a value, dial it in, and capture exactly the result you imagined — no more wrestling with hidden Pro modes.",
  },
];

const screens = [
  {
    no: "Screen 01",
    title: "Home — Your Photographic Journey",
    body: "Displays the user's activity: how many challenges they've completed and how many photos they've captured to date. The screen turns progress into motivation — discover and accomplish more challenges.",
  },
  {
    no: "Screen 02",
    title: "Camera — Real-Time Insight",
    body: "The main camera screen, where users operate the camera with real-time insights of the image. Transparent live data shows how values shift as you pan; grid-guidance mode teaches users to frame subjects with multiple grid formats.",
  },
  {
    no: "Screen 03",
    title: "Community — Learn From Peers",
    body: "Resources for the basics of mobile photography, dynamic challenges with explanations, and a feed of work from fellow photographers. Education, motivation, and inspiration — in one place.",
  },
];

const palette = [
  { name: "Signal Yellow", hex: "#ECB22E" },
  { name: "Frame Gray", hex: "#7A7A82" },
  { name: "Lens Black", hex: "#1A1A1F" },
  { name: "Highlight White", hex: "#F5F5F0" },
  { name: "Sunset Amber", hex: "#E8833A" },
  { name: "Capture Red", hex: "#E01E5A" },
];

const reflections = [
  {
    title: "Designing for Learning, Not Automation",
    body: "It would have been easier to ship another auto-everything camera. Instead, I leaned into 'design that teaches' — surfacing the craft beneath the tap, so users grow with the tool instead of leaning on it.",
  },
  {
    title: "Iterative Testing Earned Every Pixel",
    body: "62% improvement in interaction didn't come from one big idea. It came from killing five concepts users politely told us they hated, and rebuilding the survivors around their actual behaviour.",
  },
  {
    title: "Reducing Friction Without Removing Craft",
    body: "35% less onboarding friction was the easy metric to brag about. The harder win: keeping the depth that serious photographers needed, while still welcoming first-time users who'd never opened a Pro mode.",
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
                  href={`#${s.toLowerCase().replace(/\s+/g, "-")}`}
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
            className="mono-heading text-4xl md:text-7xl font-bold text-foreground leading-[1.05] mb-6"
          >
            They had the camera. <br />
            They didn't have the eye.
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.7 }}
            className="mono-heading text-3xl md:text-5xl font-bold mb-10"
          >
            So we built the <span className="teal-shimmer">signal</span>.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="font-body text-foreground/70 text-base md:text-lg max-w-2xl leading-relaxed mb-12"
          >
            Smart Align is an AI-powered mobile photography app that teaches composition the moment you frame a shot. Live data, real-time grid guidance, and a signal bar that quietly tells you when the moment is right.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.6 }}
            className="grid grid-cols-3 gap-6 max-w-xl mb-12"
          >
            {[
              { v: "62%", l: "Improved Interaction" },
              { v: "35%", l: "Less Onboarding Friction" },
              { v: "3", l: "Core Screens Shipped" },
            ].map((s) => (
              <div key={s.l} className="glass-card p-5">
                <p className="mono-heading text-3xl md:text-4xl font-bold text-primary">{s.v}</p>
                <p className="font-body text-[11px] text-foreground/60 mt-1">{s.l}</p>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="flex items-center gap-6 flex-wrap"
          >
            <a
              href="#designs"
              onClick={() => play("click")}
              onMouseEnter={() => play("hover")}
              className="glass-card px-7 py-3 font-heading text-xs font-bold text-primary-foreground bg-primary tracking-wider uppercase"
            >
              Final Designs
            </a>
            <a
              href="#problem"
              onClick={() => play("click")}
              className="font-body text-sm text-primary hover:underline inline-flex items-center gap-2"
            >
              Read the Story <ArrowRight size={14} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* === PROBLEM === */}
      <section id="problem" className="py-24 px-6 border-t border-border/40">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            kicker="The Problem"
            title={
              <>
                Three reasons mobile photographers <span className="teal-shimmer">stop learning</span>.
              </>
            }
          />
          <p className="font-body text-foreground/60 max-w-2xl mb-12">
            We didn't start with features. We started with the missed shot — and traced it back through every app that promised to fix it but never taught you why.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {problems.map((p, i) => (
              <motion.article
                key={p.no}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="glass-card p-7 flex flex-col"
              >
                <span className="mono-heading text-5xl font-bold text-primary/30 mb-4">{p.no}</span>
                <p className="font-body text-[10px] tracking-widest uppercase text-primary mb-3">{p.label}</p>
                <h3 className="mono-heading text-lg font-bold text-foreground mb-4 leading-snug">{p.headline}</h3>
                <p className="font-body text-sm text-foreground/70 leading-relaxed">{p.body}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* === EVIDENCE === */}
      <section className="py-24 px-6 border-t border-border/40">
        <div className="max-w-5xl mx-auto">
          <SectionHeader
            kicker="The Evidence"
            title={<>Same scene. <span className="teal-shimmer">Two different photographers</span>.</>}
          />
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-card p-8"
            >
              <p className="font-body text-[10px] tracking-widest uppercase text-foreground/50 mb-3">Without guidance</p>
              <p className="mono-heading text-2xl font-bold text-foreground mb-4">"Looked great on the screen. Looked off in the gallery."</p>
              <p className="font-body text-sm text-foreground/60">Subject centered, horizon tilted, focal point lost. The moment slipped before the user knew what was wrong.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-card p-8 border-primary/40"
            >
              <p className="font-body text-[10px] tracking-widest uppercase text-primary mb-3">With Smart Align</p>
              <p className="mono-heading text-2xl font-bold text-foreground mb-4">"The bar turned yellow. I knew exactly when to press."</p>
              <p className="font-body text-sm text-foreground/60">Same scene. Real-time signal. The user learned the rule of thirds without ever reading the words.</p>
            </motion.div>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="font-body text-foreground/70 text-center mt-10 max-w-2xl mx-auto italic"
          >
            Same camera. Same subject. Completely different outcome.
            <br />
            <span className="text-primary not-italic font-bold">Composition isn't a filter — it's a feeling.</span>
          </motion.p>
        </div>
      </section>

      {/* === PROCESS === */}
      <section id="process" className="py-24 px-6 border-t border-border/40">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            kicker="Design Process"
            title={<>What we tried. What we cut. What <span className="teal-shimmer">earned</span> a place on the screen.</>}
          />
          <p className="font-body text-foreground/60 max-w-2xl mb-12">
            Every concept below went through hands-on testing with real mobile photographers — beginners and enthusiasts — before we decided its fate.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {tested.map((t, i) => (
              <motion.div
                key={t.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="glass-card p-7 flex flex-col"
              >
                <span className="retro-tag self-start mb-4">{t.status}</span>
                <h3 className="mono-heading text-xl font-bold text-foreground mb-3">{t.title}</h3>
                <p className="font-body text-sm text-foreground/70 mb-4 leading-relaxed">{t.body}</p>
                <div className="retro-divider w-full mt-auto mb-3" />
                <p className="font-body text-xs italic text-primary leading-snug">{t.quote}</p>
              </motion.div>
            ))}
          </div>

          {/* Method */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card p-10 mt-16"
          >
            <p className="font-body text-[10px] tracking-widest uppercase text-primary mb-3">Method</p>
            <h3 className="mono-heading text-3xl md:text-4xl font-bold text-foreground mb-2">
              We tested in the wild. <span className="teal-shimmer">Not in a lab.</span> 📷
            </h3>
            <p className="font-body text-foreground/70 max-w-3xl mt-4 leading-relaxed">
              <span className="text-primary font-bold">Field Iteration.</span> Prototypes were handed to real photographers in real lighting — sunsets, street markets, indoor concerts. Their unscripted reactions shaped every iteration of the signal bar and the live data layout.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-10">
              {findings.map((f) => (
                <div key={f.no} className="border-l-2 border-primary/40 pl-5">
                  <span className="mono-heading text-3xl font-bold text-primary/40">{f.no}</span>
                  <h4 className="mono-heading text-base font-bold text-foreground mt-2 mb-2">{f.title}</h4>
                  <p className="font-body text-sm text-foreground/70 leading-relaxed">{f.body}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* === SKETCHES === */}
      <section id="sketches" className="py-24 px-6 border-t border-border/40">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            kicker="From Rough to Real"
            title={<>Lo-Fi sketches. <span className="teal-shimmer">Mid-Fi</span> prototypes.</>}
          />
          <p className="font-body text-foreground/60 max-w-2xl mb-12">
            Each screen iterated through field testing with real photographers before earning its place in the final designs.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {["Lo-Fi Sketches", "Mid-Fi Prototypes"].map((label, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="glass-card aspect-[4/3] flex items-center justify-center relative overflow-hidden"
              >
                <div className="absolute inset-0 opacity-20" style={{
                  backgroundImage: "repeating-linear-gradient(45deg, hsl(var(--foreground)) 0 1px, transparent 1px 12px)"
                }} />
                <p className="mono-heading text-2xl font-bold text-foreground/60 relative z-10">{label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* === DESIGNS / SCREENS === */}
      <section id="designs" className="py-24 px-6 border-t border-border/40">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            kicker="Final Screens"
            title={<>Three screens. Each one <span className="teal-shimmer">earned</span>.</>}
          />
          <p className="font-body text-foreground/60 max-w-2xl mb-12">
            Finalised based on direct user feedback. Each screen maps to a specific moment in a photographer's journey — from motivation, to capture, to community.
          </p>
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
            title={<>Cutting-edge AI. <span className="teal-shimmer">Intuitive design</span>.</>}
          />
          <p className="font-body text-foreground/60 max-w-2xl mb-12">
            Smart Align combines real-time AI with a quiet, hand-drawn interface — revolutionising mobile photography composition without ever stealing the moment.
          </p>
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
                  <h3 className="mono-heading text-2xl md:text-3xl font-bold text-foreground mb-4 leading-snug">{f.title}</h3>
                  <p className="font-body text-sm italic text-foreground/60 leading-relaxed">{f.quote}</p>
                </div>
                <div className="md:col-span-3 border-l-0 md:border-l-2 border-primary/30 md:pl-8">
                  <p className="font-body text-[10px] tracking-widest uppercase text-foreground/50 mb-3">{f.sub}</p>
                  <p className="font-body text-foreground/80 leading-relaxed">{f.body}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* === DESIGN SYSTEM === */}
      <section id="design-system" className="py-24 px-6 border-t border-border/40">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            kicker="Design System"
            title={<>A camera UI that <span className="teal-shimmer">disappears</span> when you need it to.</>}
          />
          <p className="font-body text-foreground/60 max-w-2xl mb-12">
            The palette and components were tuned for one job: stay out of the way until the moment you need them, then speak clearly without breaking your concentration.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
            {palette.map((c) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="glass-card p-4"
              >
                <div
                  className="w-full aspect-square mb-3 border border-border"
                  style={{ background: c.hex }}
                />
                <p className="mono-heading text-sm font-bold text-foreground">{c.name}</p>
                <p className="font-body text-[10px] text-foreground/50">{c.hex}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { tag: "Quiet by Default", title: "Signal, Not Noise", body: "The interface stays gray and minimal until alignment is reached. Only then does the system speak — in yellow, briefly." },
              { tag: "Always Visible", title: "Live Data, Always Honest", body: "Exposure, ISO, and focal data sit at the top of the screen. Users learn the language of the camera by watching it change." },
              { tag: "Tap to Take Over", title: "Manual When You Need It", body: "Every live value is also a control. Tap to dial in your own settings without ever leaving the camera view." },
            ].map((d, i) => (
              <motion.div
                key={d.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="glass-card p-6"
              >
                <span className="retro-tag mb-3 inline-block">{d.tag}</span>
                <h4 className="mono-heading text-lg font-bold text-foreground mb-3">{d.title}</h4>
                <p className="font-body text-sm text-foreground/70 leading-relaxed">{d.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* === REFLECTIONS === */}
      <section id="reflections" className="py-24 px-6 border-t border-border/40">
        <div className="max-w-5xl mx-auto">
          <SectionHeader
            kicker="Reflections"
            title={<>Lessons from designing AI that <span className="teal-shimmer">teaches instead of replaces</span>.</>}
          />
          <div className="space-y-6">
            {reflections.map((r, i) => (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="glass-card p-8 md:p-10"
              >
                <h3 className="mono-heading text-xl md:text-2xl font-bold text-foreground mb-3 leading-snug">{r.title}</h3>
                <p className="font-body text-foreground/70 leading-relaxed">{r.body}</p>
              </motion.div>
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
              className="glass-card inline-flex items-center gap-3 px-8 py-3 font-heading text-xs font-bold text-primary-foreground bg-primary tracking-wider uppercase"
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
