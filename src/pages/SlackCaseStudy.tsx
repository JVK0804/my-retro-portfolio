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
  "Design System",
  "Reflections",
];

const problems = [
  {
    no: "01",
    label: "Bias Moderation",
    headline: "Two students discussed colonial history for class. AI flagged them both as threats.",
    body: "AI interprets academic discussion as hostile content. Students are silenced. The chilling effect on free expression is immediate and severe — especially for international students whose visa status could be at risk.",
  },
  {
    no: "02",
    label: "Misinterpretation",
    headline: "A new teammate used AI to catch up. The summary was wrong.",
    body: "Sarcasm, banter, and cultural nuance go right over AI's head. A 'classic procrastinator move' joke becomes a documented conflict. Trust collapses at the worst possible moment.",
  },
  {
    no: "03",
    label: "Opportunity",
    headline: "What if AI made privacy education feel like part of the conversation?",
    body: "Instead of burying controls in documentation nobody reads, we designed privacy awareness directly into the moments students need it — inline, contextual, and human.",
  },
];

const tested = [
  {
    status: "Cut",
    title: "Personal Info Tagging",
    body: "Real-time alerts every time a user typed personally identifiable information — student names, grades, contact details.",
    quote: "\"Annoying. It fires on everything. I'd disable it immediately.\" — From User Testing",
    tone: "destructive",
  },
  {
    status: "Evolve",
    title: "Seriousness Slider",
    body: "An emoji-based slider to indicate how serious a channel was. Confusing, ambiguous, and too playful for the use case.",
    quote: "\"What does the emoji mean exactly?\" — Ambiguity killed it. Became the Engagement Style dropdown.",
    tone: "muted",
  },
  {
    status: "Shipped",
    title: "Contextual Training Overlay",
    body: "An inline explanation of what AI just did, why, and what data it used. Built directly into the moment.",
    quote: "\"Finally. I know what it's doing and why.\" — Became core to all 3 final features.",
    tone: "primary",
  },
];

const findings = [
  {
    no: "01",
    title: "Context is Everything",
    body: "Users expected AI to understand the situation, not just the words. An alert without context felt accusatory.",
  },
  {
    no: "02",
    title: "Tone of AI Voice Matters",
    body: "Legalistic language triggered distrust. Conversational, peer-like explanations were accepted and welcomed.",
  },
  {
    no: "03",
    title: "Control = Trust",
    body: "Users wanted the steering wheel, not the autopilot. The more control we surfaced, the more they trusted the system.",
  },
];

const features = [
  {
    no: "Feature 01",
    title: "In-Line Privacy Alerts",
    quote: "\"Users weren't afraid of AI. They were afraid of not knowing what it knew.\"",
    sub: "Custom Alert Control",
    body: "Testing revealed alerts were triggering on everything, regardless of context. The fix: let users define what matters to them. Alerts become intentional, not noise.",
  },
  {
    no: "Feature 02",
    title: "Bias Moderation Transparency",
    quote: "\"Users were scared to type anything after being wrongly flagged.\"",
    sub: "Only Visible To You",
    body: "Reports stay private. Cancel = ghost. Report = solid. Matches Slack's native modal pattern exactly — feels native, not bolted on.",
  },
  {
    no: "Feature 03",
    title: "Engagement Style",
    quote: "\"The same joke reads as aggressive in a serious channel, and friendly in a relaxed one.\"",
    sub: "Set the tone, set the truth",
    body: "Added Step 3 to Slack's 2-step channel creation. One new concept, zero structural deviation — context that follows the conversation.",
  },
];

const slackPalette = [
  { name: "Aubergine", hex: "#4A154B" },
  { name: "Green", hex: "#2BAC76" },
  { name: "Red", hex: "#E01E5A" },
  { name: "Yellow", hex: "#ECB22E" },
  { name: "Blue", hex: "#36C5F0" },
  { name: "Dark Canvas", hex: "#1D1C21" },
];

/** Served from /public/case-studies/slack/ (mirrors Framer “From Rough to Real” section). */
const slackSketchImages = [
  { src: "/case-studies/slack/sketches/IMG_7425.webp", alt: "Lo-fi paper sketch — Slack AI transparency concepts" },
  { src: "/case-studies/slack/sketches/IMG_7426.webp", alt: "Lo-fi paper sketch — flows and annotations" },
  { src: "/case-studies/slack/sketches/Z6eV1Vp9ggSp6mQkYuO6S60Mac.webp", alt: "Lo-fi sketch — channel and alert patterns" },
  { src: "/case-studies/slack/sketches/e3e0Du4BwCDYKsSO2eLILmTRds.webp", alt: "Lo-fi sketch — moderation and privacy paths" },
];

const slackMidFiImages = [
  { src: "/case-studies/slack/mid-fi/init-concepts-1.webp", alt: "Mid-fi prototype — initial concept exploration" },
  { src: "/case-studies/slack/mid-fi/initit-concept-2.webp", alt: "Mid-fi prototype — iteration on interaction model" },
  { src: "/case-studies/slack/mid-fi/init-concept-3.webp", alt: "Mid-fi prototype — refined flows" },
  { src: "/case-studies/slack/mid-fi/init-concepts-3-variant.webp", alt: "Mid-fi prototype — alternate concept direction" },
  { src: "/case-studies/slack/mid-fi/img-8392.webp", alt: "Mid-fi prototype board — consolidated screens" },
];

const reflections = [
  {
    title: "Turning Ethical Frameworks into Actionable Design Decisions",
    body: "I took this challenge as an opportunity for exploring 'ethics by design' — and how critical it is to follow guidelines, especially on projects involving data privacy and AI.",
  },
  {
    title: "Learning from Ethical Design Mentors & Real-World Stakeholders",
    body: "Working with product leaders helped me see the possibilities for balancing business needs with user priorities, without compromising either.",
  },
  {
    title: "Designing Across Disciplines: Lessons in Multicultural Teamwork",
    body: "Collaboration was my favorite part of this project. Coordinating across perspectives was the key that unlocked the work.",
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

const SlackCaseStudy = () => {
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
            Salesforce Externship · Slack
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="mono-heading text-4xl md:text-7xl font-bold text-foreground leading-[1.05] mb-6"
          >
            73% wanted AI help. <br />
            0% trusted it.
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.7 }}
            className="mono-heading text-3xl md:text-5xl font-bold mb-10"
          >
            We built the <span className="teal-shimmer">bridge</span>.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="font-body text-foreground/70 text-base md:text-lg max-w-2xl leading-relaxed mb-12"
          >
            AI was already inside Slack. Students were already using it. But nobody told them what it was doing with their conversations. This is how we designed transparency into every interaction.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.6 }}
            className="grid grid-cols-3 gap-6 max-w-xl mb-12"
          >
            {[
              { v: "40", l: "Real Users Tested" },
              { v: "16", l: "Weeks" },
              { v: "3", l: "Features Shipped" },
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
              className="rounded-[var(--radius-md)] bg-primary px-7 py-3 font-heading text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-md transition-opacity hover:opacity-90"
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
                Three moments where AI breaks <span className="teal-shimmer">student trust</span>.
              </>
            }
          />
          <p className="font-body text-foreground/60 max-w-2xl mb-12">
            We didn't guess at problems. We ran Black Mirror brainstorming sessions to surface the worst realistic scenarios — then designed for each one.
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
            title={<>We tested it ourselves. This is what AI thought a <span className="teal-shimmer">joke</span> looked like.</>}
          />
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-card p-8"
            >
              <p className="font-body text-[10px] tracking-widest uppercase text-foreground/50 mb-3">Without context</p>
              <p className="mono-heading text-2xl font-bold text-foreground mb-4">"Documented conflict between teammates."</p>
              <p className="font-body text-sm text-foreground/60">AI flagged casual banter as a workplace incident.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-card p-8 border-primary/40"
            >
              <p className="font-body text-[10px] tracking-widest uppercase text-primary mb-3">With context</p>
              <p className="mono-heading text-2xl font-bold text-foreground mb-4">"Friendly procrastination joke between project teammates."</p>
              <p className="font-body text-sm text-foreground/60">Same words. Entirely different reading.</p>
            </motion.div>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="font-body text-foreground/70 text-center mt-10 max-w-2xl mx-auto italic"
          >
            Same message. Same conversation. Completely different AI understanding.
            <br />
            <span className="text-primary not-italic font-bold">Context isn't optional — it's the entire product.</span>
          </motion.p>
        </div>
      </section>

      {/* === PROCESS === */}
      <section id="process" className="py-24 px-6 border-t border-border/40">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            kicker="Design Process"
            title={<>What we tried. What we killed. What <span className="teal-shimmer">survived</span>.</>}
          />
          <p className="font-body text-foreground/60 max-w-2xl mb-12">
            Every concept below went through Wizard of Oz testing with 40 real students before we decided its fate.
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
              We couldn't access Slack AI. <span className="teal-shimmer">So we became it.</span> 🧙‍♂️
            </h3>
            <p className="font-body text-foreground/70 max-w-3xl mt-4 leading-relaxed">
              <span className="text-primary font-bold">Wizard of Oz Testing.</span> A human moderator simulated AI responses in real-time while 40 students believed they were interacting with the actual system. Their emotional reactions were completely authentic.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-10">
              {findings.map((f, i) => (
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
            Every concept iterated through Wizard of Oz testing with 40 real students before earning its place in the final designs.
          </p>
          <div className="grid md:grid-cols-2 gap-10 md:gap-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="mono-heading text-xl md:text-2xl font-bold text-foreground mb-2">Lo-Fi Sketches</h3>
              <p className="font-body text-sm text-foreground/50 mb-6">Paper and whiteboard explorations before higher fidelity.</p>
              <div className="space-y-4">
                {slackSketchImages.map((img, i) => (
                  <motion.div
                    key={img.src}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ delay: i * 0.05, duration: 0.5 }}
                    className="glass-card overflow-hidden p-2 md:p-3 border border-border/50"
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-auto rounded-md object-contain bg-muted/20"
                      loading="lazy"
                      decoding="async"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              <h3 className="mono-heading text-xl md:text-2xl font-bold text-foreground mb-2">Mid-Fi Prototypes</h3>
              <p className="font-body text-sm text-foreground/50 mb-6">Screen-level flows aligned with Slack patterns.</p>
              <div className="space-y-4">
                {slackMidFiImages.map((img, i) => (
                  <motion.div
                    key={img.src}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ delay: i * 0.05, duration: 0.5 }}
                    className="glass-card overflow-hidden p-2 md:p-3 border border-border/50"
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-auto rounded-md object-contain bg-muted/20"
                      loading="lazy"
                      decoding="async"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* === DESIGNS === */}
      <section id="designs" className="py-24 px-6 border-t border-border/40">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            kicker="The Solutions"
            title={<>Three features. Each one <span className="teal-shimmer">earned</span>.</>}
          />
          <p className="font-body text-foreground/60 max-w-2xl mb-12">
            Each feature maps directly to an insight from testing. Nothing assumed. Everything earned.
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
            title={<>We didn't design <em>with</em> Slack. We designed <span className="teal-shimmer">inside it</span>.</>}
          />
          <p className="font-body text-foreground/60 max-w-2xl mb-12">
            Every component we shipped had to feel like it could have come from Slack's own product team. Same tokens. Same interaction grammar. Same component anatomy.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
            {slackPalette.map((c) => (
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
              { tag: "Within System", title: "All Color Usage", body: "Zero custom colors across three features. Every token is Slack's existing semantic palette, used exactly as intended." },
              { tag: "Within System", title: "Engagement Style step", body: "Added Step 3 to Slack's 2-step channel creation modal using their exact dialog component. One new concept, zero structural deviation." },
              { tag: "Within System", title: "No custom iconography", body: "Consciously chose not to introduce new icons. Every icon is from Slack's existing set — design system team review-friendly." },
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
            title={<>Human-centered lessons from building <span className="teal-shimmer">AI for students</span>.</>}
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

export default SlackCaseStudy;
