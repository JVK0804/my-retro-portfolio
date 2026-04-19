import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Lock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SketchFilter from "@/components/SketchFilter";
import { useSound } from "@/contexts/SoundContext";

const sectionNav = ["Context", "Role", "Process", "System", "Impact", "Learnings"];

type CategoryKey = "Color" | "Typography" | "Buttons" | "Forms" | "Spacing" | "Cards" | "Inputs";

const processSteps = [
  {
    no: "01",
    title: "Discovery",
    headline: "First, I mapped what already existed.",
    body: "Before designing a single new component, I mapped the existing Mednext design system. What patterns were already established? Where were the gaps? Understanding the existing system deeply was the only way to add to it without breaking it.",
  },
  {
    no: "02",
    title: "Alignment",
    headline: "Then I got everyone in the same room.",
    body: "The hardest design problem wasn't the UI — it was alignment. I facilitated working sessions between all three teams to surface conflicts early and establish shared principles before any code was written.",
  },
  {
    no: "03",
    title: "Design + Build",
    headline: "Then I built things that could be used forever.",
    body: "Rather than designing features one-off, I built a library of 20+ reusable React and JavaScript components aligned with the healthcare design system. Each was composable — engineers assembled new screens without reinventing UX patterns from scratch.",
  },
  {
    no: "04",
    title: "Integration",
    headline: "And we shipped, without breaking a thing.",
    body: "Feature integration into an active healthcare platform requires discipline. I worked closely with QA and engineering to ensure new components fit within existing constraints. Nothing in production broke as a result of what we added. At launch: zero regression issues.",
  },
];

const contributions = [
  "Audited the existing Mednext component library to identify gaps between platform capabilities and Cigna's new feature requirements before writing a line of code.",
  "Architected 20+ React and JavaScript components from scratch, aligned with healthcare design tokens and Mednext's visual language.",
  "Created a block design framework and cross-trained the broader team — designers and developers alike — so components were used correctly across all three organizations.",
  "Documented component behavior, states, and edge cases to reduce ambiguity for developers working across three codebases with three different deadlines.",
  "Established design-to-engineering handoff conventions that reduced back-and-forth review cycles and accelerated iteration velocity by 35%.",
  "Mentored junior designers and engineers on system thinking, ensuring the design system kept growing with the product.",
];

const colorTokens = [
  { name: "Primary Blue", hex: "#0075C9", use: "CTA buttons, links" },
  { name: "Dark Blue", hex: "#004E87", use: "Hover state, logo" },
  { name: "Light Blue Tint", hex: "#E8F4FD", use: "Page background, info cards" },
  { name: "Success Green", hex: "#4CAF50", use: "Logo accent, success" },
  { name: "Error Red", hex: "#D32F2F", use: "Validation errors" },
  { name: "Error Background", hex: "#FFEBEE", use: "Error input highlight" },
  { name: "Text Primary", hex: "#333333", use: "Headings, body text" },
  { name: "Text Secondary", hex: "#666666", use: "Labels, helper text" },
  { name: "Border Gray", hex: "#E0E0E0", use: "Input borders, dividers" },
  { name: "Disabled Gray", hex: "#9E9E9E", use: "Disabled buttons" },
  { name: "Surface Gray", hex: "#F5F5F5", use: "Background sections" },
  { name: "White", hex: "#FFFFFF", use: "Card surfaces, inputs" },
];

const impactStats = [
  { value: "35%", label: "Faster Development", note: "Reduced dev time through reusable components" },
  { value: "20+", label: "Components Built", note: "React & JS, aligned to healthcare design system" },
  { value: "3", label: "Orgs Aligned", note: "Cigna, Munich Re, Deloitte — one source of truth" },
];

const learnings = [
  {
    no: "01",
    title: "A component library is really a trust contract.",
    body: "The component library wasn't just about efficiency — it was a shared vocabulary that let three organizations talk about UI without talking past each other. A reusable button isn't just a button; it's a contract.",
  },
  {
    no: "02",
    title: "The best design skill I have is knowing when to stop designing.",
    body: "Cigna spoke in business outcomes. Munich Re spoke in platform constraints. Deloitte spoke in delivery timelines. The work was understanding all three dialects fluently enough to satisfy all three simultaneously.",
  },
  {
    no: "03",
    title: "Constraints aren't blockers. They're the brief.",
    body: "Adding features to a live product isn't the same as building new ones. You don't get to change the furniture — you work with what's there. That constraint forced a level of design discipline I now actively seek out.",
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

const CignaCaseStudy = () => {
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
            Case Study · Enterprise Healthcare UX
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="mono-heading text-4xl md:text-7xl font-bold text-foreground leading-[1.05] mb-8"
          >
            Three organisations. <br />
            One platform. <br />
            <span className="teal-shimmer">Zero regressions.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="font-body text-foreground/70 text-base md:text-lg max-w-2xl leading-relaxed mb-10"
          >
            How I helped Cigna, Munich Re, and Deloitte speak the same design language and shipped new features into a live healthcare system without breaking a thing.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex flex-wrap gap-2 mb-10"
          >
            {["Cigna × Deloitte", "Mednext — Munich Re HealthTech", "UX Designer + Engineer", "React · JavaScript", "35% faster development"].map((t) => (
              <span key={t} className="retro-tag">{t}</span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="flex items-center gap-6 flex-wrap"
          >
            <a
              href="#system"
              onClick={() => play("click")}
              onMouseEnter={() => play("hover")}
              className="glass-card px-7 py-3 font-heading text-xs font-bold text-primary-foreground bg-primary tracking-wider uppercase"
            >
              View Design Components
            </a>
            <a
              href="#context"
              onClick={() => play("click")}
              className="font-body text-sm text-primary hover:underline inline-flex items-center gap-2"
            >
              Read Our Story <ArrowRight size={14} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* === CONTEXT === */}
      <section id="context" className="py-24 px-6 border-t border-border/40">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            kicker="01 — Context"
            title={<>System is well established with <span className="teal-shimmer">real data and real users</span>.</>}
          />
          <div className="grid md:grid-cols-5 gap-8 items-start">
            <div className="md:col-span-2">
              <p className="mono-heading text-7xl md:text-8xl font-bold text-primary leading-none mb-3">3</p>
              <p className="font-body text-foreground/70 text-sm tracking-wide uppercase">Organisations. One shared product.</p>
            </div>
            <div className="md:col-span-3 glass-card p-8 md:p-10">
              <p className="font-body text-foreground/80 leading-relaxed mb-6">
                Cigna needed new features inside <strong>Mednext</strong>, <strong>Munich Re</strong> HealthTech's existing platform, delivered through <strong>Deloitte</strong>. Three organizations, three sets of priorities, one live healthcare product that couldn't break. I sat at the intersection of all three, translating between what each needed and what was actually possible.
              </p>
              <div className="inline-flex items-center gap-2 retro-tag">
                <Lock size={12} /> UI components and data are limited for NDA compliance
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === ROLE === */}
      <section id="role" className="py-24 px-6 border-t border-border/40">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            kicker="02 — My Role"
            title={<>I was the person who <span className="teal-shimmer">spoke everyone's language</span>.</>}
          />
          <div className="glass-card p-8 md:p-12">
            <p className="font-body text-foreground/80 text-base md:text-lg leading-relaxed mb-8">
              My title was UX Engineer, which in practice meant sketching a component in Figma in the morning and shipping it in React by afternoon. That dual fluency mattered: when engineers pushed back, I could engage with the actual constraints; when product asked why something felt off, I could trace it to a specific component and fix it at the source. I sat at the bridge between three organizations, and that bridge had to hold weight in both directions.
            </p>
            <div className="flex flex-wrap gap-2">
              {["UX Engineer", "UX Design", "Design Systems", "JavaScript", "React", "Healthcare Platform", "Cross-functional Collaboration"].map((t) => (
                <span key={t} className="retro-tag">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* === DESIGN SYSTEM TEASER === */}
      <section className="py-24 px-6 border-t border-border/40">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            kicker="03 — Design System"
            title={<>The real deliverable wasn't features. It was <span className="teal-shimmer">trust</span>.</>}
          />
          <div className="grid md:grid-cols-5 gap-8 items-start">
            <div className="md:col-span-2">
              <p className="mono-heading text-7xl md:text-8xl font-bold text-primary leading-none mb-3">20+</p>
              <p className="font-body text-foreground/70 text-sm tracking-wide uppercase">Reusable components. One source of truth.</p>
            </div>
            <div className="md:col-span-3 glass-card p-8 md:p-10">
              <p className="font-body text-foreground/80 leading-relaxed mb-6">
                Design systems live or die by adoption. My approach was to build components so well-documented, well-named, and precisely scoped that the path of least resistance was also the path of consistency — the only way to keep three teams from diverging into three different products.
              </p>
              <a
                href="#system"
                onClick={() => play("click")}
                className="font-body text-sm text-primary hover:underline inline-flex items-center gap-2"
              >
                See the Components <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* === PROCESS === */}
      <section id="process" className="py-24 px-6 border-t border-border/40">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            kicker="04 — Process"
            title={<>So I started by <span className="teal-shimmer">listening</span> before I drew anything.</>}
          />
          <div className="space-y-8">
            {processSteps.map((s, i) => (
              <motion.article
                key={s.no}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: i * 0.1, duration: 0.7 }}
                className="glass-card p-8 md:p-12 grid md:grid-cols-5 gap-8 items-start"
              >
                <div className="md:col-span-2">
                  <p className="font-body text-[10px] tracking-widest uppercase text-primary mb-3">Step {s.no} · {s.title}</p>
                  <h3 className="mono-heading text-2xl md:text-3xl font-bold text-foreground leading-snug">{s.headline}</h3>
                </div>
                <div className="md:col-span-3 border-l-0 md:border-l-2 border-primary/30 md:pl-8">
                  <p className="font-body text-foreground/80 leading-relaxed">{s.body}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* === SYSTEM / COMPONENTS === */}
      <section id="system" className="py-24 px-6 border-t border-border/40">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            kicker="05 — Design System / Components"
            title={<>What I <span className="teal-shimmer">actually built</span>.</>}
          />

          {/* Contributions */}
          <div className="mb-20">
            <p className="font-body text-[10px] tracking-[0.3em] uppercase text-foreground/50 mb-6">My Specific Contributions</p>
            <div className="grid md:grid-cols-2 gap-6">
              {contributions.map((c, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ delay: i * 0.06, duration: 0.5 }}
                  className="glass-card p-6 flex gap-5"
                >
                  <span className="mono-heading text-2xl font-bold text-primary leading-none shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="font-body text-foreground/80 text-sm leading-relaxed">{c}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Color Tokens */}
          <div className="mb-12">
            <p className="font-body text-[10px] tracking-[0.3em] uppercase text-foreground/50 mb-3">Component Categories</p>
            <h3 className="mono-heading text-2xl md:text-3xl font-bold text-foreground mb-2">Color Tokens</h3>
            <p className="font-body text-foreground/60 text-sm mb-8 max-w-2xl">
              A sample of the foundation tokens — abstracted for NDA compliance, representative of the actual scope.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {colorTokens.map((c, i) => (
                <motion.div
                  key={c.hex}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: i * 0.04, duration: 0.4 }}
                  className="glass-card p-4 flex items-center gap-4"
                >
                  <div
                    className="w-14 h-14 shrink-0 border-2 border-foreground/10"
                    style={{ backgroundColor: c.hex, borderRadius: "2px" }}
                  />
                  <div className="min-w-0">
                    <p className="font-body text-sm font-bold text-foreground truncate">{c.name}</p>
                    <p className="font-body text-[11px] text-foreground/50 uppercase tracking-wider">{c.hex}</p>
                    <p className="font-body text-[11px] text-foreground/60 mt-0.5">{c.use}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 mt-6">
              {["Typography", "Buttons", "Forms", "Spacing", "Cards", "Inputs"].map((t) => (
                <span key={t} className="retro-tag">{t}</span>
              ))}
            </div>
          </div>

          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card p-8 md:p-12 mt-12 border-l-4 border-primary"
          >
            <p className="mono-heading text-xl md:text-2xl font-bold text-foreground leading-snug">
              "Building a Design System isn't the hard part. Building one that three teams, with three different codebases and opinions, will actually use consistently? <span className="teal-shimmer">That's the design problem.</span>"
            </p>
          </motion.blockquote>
        </div>
      </section>

      {/* === IMPACT === */}
      <section id="impact" className="py-24 px-6 border-t border-border/40">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            kicker="06 — Impact"
            title={<>Three months later, the numbers told their <span className="teal-shimmer">own story</span>.</>}
          />
          <div className="grid md:grid-cols-3 gap-6">
            {impactStats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="glass-card p-8"
              >
                <p className="mono-heading text-6xl md:text-7xl font-bold text-primary leading-none mb-4">{s.value}</p>
                <p className="font-heading text-sm font-bold text-foreground tracking-wider uppercase mb-2">{s.label}</p>
                <p className="font-body text-foreground/65 text-sm leading-relaxed">{s.note}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* === LEARNINGS === */}
      <section id="learnings" className="py-24 px-6 border-t border-border/40">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            kicker="07 — Learnings"
            title={<>What this project changed about <span className="teal-shimmer">how I work</span>.</>}
          />
          <div className="space-y-8">
            {learnings.map((l, i) => (
              <motion.article
                key={l.no}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: i * 0.1, duration: 0.7 }}
                className="glass-card p-8 md:p-12 grid md:grid-cols-5 gap-8 items-start"
              >
                <div className="md:col-span-1">
                  <p className="mono-heading text-5xl font-bold text-primary leading-none">{l.no}</p>
                </div>
                <div className="md:col-span-4">
                  <h3 className="mono-heading text-xl md:text-2xl font-bold text-foreground mb-4 leading-snug">{l.title}</h3>
                  <p className="font-body text-foreground/80 leading-relaxed">{l.body}</p>
                </div>
              </motion.article>
            ))}
          </div>

          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card p-8 md:p-12 mt-12 text-center"
          >
            <p className="mono-heading text-xl md:text-2xl font-bold text-foreground leading-snug max-w-3xl mx-auto">
              "The most underrated UX skill isn't craft — it's making everyone in the room feel like the design outcome was also their idea. <span className="teal-shimmer">That's how you actually ship things in enterprise.</span>"
            </p>
          </motion.blockquote>

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

export default CignaCaseStudy;
