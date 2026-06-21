import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Lock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SketchFilter from "@/components/SketchFilter";
import CaseStudySideNav, { type CaseStudyNavItem } from "@/components/case-study/CaseStudySideNav";
import CignaProcessTimeline from "@/components/case-study/CignaProcessTimeline";
import CignaComponentLibrary from "@/components/case-study/CignaComponentLibrary";
import PrototypeMedia from "@/components/case-study/PrototypeMedia";
import CaseStudyShell, { CaseStudyContent } from "@/components/case-study/CaseStudyShell";
import { useSound } from "@/contexts/SoundContext";

const cignaHeroVideo = "/case-studies/cigna/cigna-hero.webm";

const cignaPrototypes = [
  { src: "/case-studies/cigna/main-login.webm", label: "Main login flow prototype", title: "Main Login" },
  { src: "/case-studies/cigna/member-id-login.webm", label: "Member ID login prototype", title: "Member ID Login" },
  { src: "/case-studies/cigna/registration-page.webm", label: "Registration page prototype", title: "Registration" },
];

const caseStudyNav: CaseStudyNavItem[] = [
  { label: "Overview", id: "overview" },
  { label: "Context", id: "context" },
  { label: "Role", id: "role" },
  { label: "Solutions", id: "solutions" },
  { label: "Process", id: "process" },
  { label: "System", id: "system" },
  { label: "Impact", id: "impact" },
  { label: "Learnings", id: "learnings" },
];

const impactStats = [
  { value: "35%", label: "Faster Development", note: "Reduced dev time through reusable components" },
  { value: "20+", label: "Components Built", note: "React & JS, aligned to healthcare design system" },
  { value: "3", label: "Orgs Aligned", note: "Cigna, Munich Re, Deloitte, one source of truth" },
];

const learnings = [
  {
    no: "01",
    title: "A component library is really a trust contract.",
    body: "The component library wasn't just about efficiency, it was a shared vocabulary that let three organizations talk about UI without talking past each other. A reusable button isn't just a button; it's a contract.",
  },
  {
    no: "02",
    title: "The best design skill I have is knowing when to stop designing.",
    body: "Cigna spoke in business outcomes. Munich Re spoke in platform constraints. Deloitte spoke in delivery timelines. The work was understanding all three dialects fluently enough to satisfy all three simultaneously.",
  },
  {
    no: "03",
    title: "Constraints aren't blockers. They're the brief.",
    body: "Adding features to a live product isn't the same as building new ones. You don't get to change the furniture, you work with what's there. That constraint forced a level of design discipline I now actively seek out.",
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
  </motion.div>
);

const CignaCaseStudy = () => {
  const { play } = useSound();

  return (
    <CaseStudyShell>
      <SketchFilter />
      <Navbar />
      <CaseStudySideNav items={caseStudyNav} onNavigate={() => play("click")} />

      {/* === HERO === */}
      <section id="overview" className="pt-32 pb-24">
        <CaseStudyContent>
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
            <div className="flex flex-wrap gap-3 xl:hidden">
              {caseStudyNav.slice(1).map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => play("click")}
                  className="font-body text-[10px] tracking-widest uppercase text-foreground/50 hover:text-primary transition-colors"
                >
                  {item.label}
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
            Case Study · Design Systems · Enterprise Healthcare
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="mono-heading text-4xl md:text-7xl font-bold text-foreground leading-[1.05] mb-8"
          >
            One design system. <br />
            Three organisations. <br />
            <span className="teal-shimmer">Zero regressions.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="font-body text-foreground/70 text-base md:text-lg max-w-2xl leading-relaxed mb-10"
          >
            While at <strong>Deloitte</strong>, I extended the Mednext design system for Cigna, building 20+ components and shipping into a live healthcare platform without breaking production.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex flex-wrap gap-2 mb-10"
          >
            {["Cigna Healthcare", "Deloitte", "Mednext · Munich Re", "Design Systems", "React · JavaScript"].map((t) => (
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
              href="#solutions"
              onClick={() => play("click")}
              onMouseEnter={() => play("hover")}
              className="rounded-[var(--radius-md)] bg-primary px-7 py-3 font-heading text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-md transition-opacity hover:opacity-90"
            >
              Feature Breakdown
            </a>
            <a
              href="#context"
              onClick={() => play("click")}
              className="font-body text-sm text-primary hover:underline inline-flex items-center gap-2"
            >
              Read Our Story <ArrowRight size={14} />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.7 }}
            className="mt-16 w-full min-w-0 overflow-hidden"
          >
            <PrototypeMedia
              src={cignaHeroVideo}
              label="Cigna Mednext platform overview prototype"
              orientation="landscape"
              sizeScale={2}
              className="mx-auto w-full"
            />
          </motion.div>
        </CaseStudyContent>
      </section>

      {/* === CONTEXT === */}
      <section id="context" className="py-24 border-t border-border/40">
        <CaseStudyContent>
          <SectionHeader
            kicker="01 Context"
            title={<>System is well established with <span className="teal-shimmer">real data and real users</span>.</>}
          />
          <div className="grid md:grid-cols-5 gap-8 items-start">
            <div className="md:col-span-2">
              <p className="mono-heading text-7xl md:text-8xl font-bold text-primary leading-none mb-3">3</p>
              <p className="font-body text-foreground/70 text-sm tracking-wide uppercase">Organisations. One shared product.</p>
            </div>
            <div className="md:col-span-3 glass-card p-8 md:p-10">
              <p className="font-body text-foreground/80 leading-relaxed mb-6">
                Cigna needed new features on <strong>Mednext</strong>, Munich Re's live platform, delivered through <strong>Deloitte</strong>. Three teams, one product, no regressions.
              </p>
              <div className="inline-flex items-center gap-2 retro-tag">
                <Lock size={12} /> UI components and data vary due to NDA compliance
              </div>
            </div>
          </div>
        </CaseStudyContent>
      </section>

      {/* === ROLE === */}
      <section id="role" className="py-24 border-t border-border/40">
        <CaseStudyContent>
          <SectionHeader
            kicker="02 My Role"
            title={<>I was the person who <span className="teal-shimmer">spoke everyone's language</span>.</>}
          />
          <div className="glass-card p-6 md:p-8">
            <p className="font-body text-foreground/80 text-sm md:text-base leading-relaxed mb-5">
              UX Engineer at Deloitte. Design in Figma, ship in React. I bridged Cigna, Munich Re, and engineering so components shipped once and stayed consistent.
            </p>
            <div className="flex flex-wrap gap-2">
              {["UX Engineer", "Design Systems", "React", "Healthcare Platform"].map((t) => (
                <span key={t} className="retro-tag">{t}</span>
              ))}
            </div>
          </div>
        </CaseStudyContent>
      </section>

      {/* === DESIGN SYSTEM TEASER === */}
      <section className="py-24 border-t border-border/40">
        <CaseStudyContent>
          <SectionHeader
            kicker="03 Design System"
            title={<>The real deliverable wasn't features. It was <span className="teal-shimmer">trust</span>.</>}
          />
          <div className="grid md:grid-cols-5 gap-8 items-start">
            <div className="md:col-span-2">
              <p className="mono-heading text-7xl md:text-8xl font-bold text-primary leading-none mb-3">20+</p>
              <p className="font-body text-foreground/70 text-sm tracking-wide uppercase">Reusable components. One source of truth.</p>
            </div>
            <div className="md:col-span-3 glass-card p-8 md:p-10">
              <p className="font-body text-foreground/80 leading-relaxed mb-6">
                Design systems live or die by adoption. My approach was to build components so well-documented, well-named, and precisely scoped that the path of least resistance was also the path of consistency, the only way to keep three teams from diverging into three different products.
              </p>
              <a
                href="#system"
                onClick={() => play("click")}
                className="font-body text-sm text-primary hover:underline inline-flex items-center gap-2"
              >
                Explore the library <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </CaseStudyContent>
      </section>

      {/* === SOLUTIONS === */}
      <section id="solutions" className="py-24 border-t border-border/40">
        <CaseStudyContent>
          <SectionHeader
            kicker="04 Prototypes"
            title={<>Auth flows shipped into a <span className="teal-shimmer">live platform</span>.</>}
          />
          <p className="font-body text-foreground/65 max-w-2xl mb-12 leading-relaxed">
            Login and registration screens built against Mednext patterns, prototyped in Figma, validated with stakeholders, then implemented in React.
          </p>
          <div className="flex flex-col gap-14">
            {cignaPrototypes.map((proto, i) => (
              <motion.div
                key={proto.src}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                className="flex flex-col gap-4"
              >
                <p className="font-body text-[10px] tracking-[0.3em] uppercase text-foreground/50">{proto.title}</p>
                <PrototypeMedia
                  src={proto.src}
                  label={proto.label}
                  orientation="landscape"
                  sizeScale={1.75}
                  className="w-full"
                />
              </motion.div>
            ))}
          </div>
        </CaseStudyContent>
      </section>

      {/* === PROCESS === */}
      <section id="process" className="py-24 border-t border-border/40">
        <CaseStudyContent>
          <SectionHeader
            kicker="05 Process"
            title={<>So I started by <span className="teal-shimmer">listening</span> before I drew anything.</>}
          />
          <CignaProcessTimeline />
        </CaseStudyContent>
      </section>

      {/* === SYSTEM / COMPONENTS === */}
      <section id="system" className="py-24 border-t border-border/40">
        <CaseStudyContent>
          <SectionHeader
            kicker="06 Design System"
            title={<>The <span className="teal-shimmer">component library</span> in practice.</>}
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="font-body text-foreground/65 text-sm md:text-base leading-relaxed max-w-2xl mb-10 md:mb-12 -mt-4"
          >
            Built for production healthcare flows. The interactive collage shows components working together. Scroll below to explore tokens and patterns by category.
          </motion.p>

          <CignaComponentLibrary onTabClick={() => play("click")} onTabHover={() => play("hover")} />

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
        </CaseStudyContent>
      </section>

      {/* === IMPACT === */}
      <section id="impact" className="py-24 border-t border-border/40">
        <CaseStudyContent>
          <SectionHeader
            kicker="07 Impact"
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
        </CaseStudyContent>
      </section>

      {/* === LEARNINGS === */}
      <section id="learnings" className="py-24 border-t border-border/40">
        <CaseStudyContent>
          <SectionHeader
            kicker="08 Learnings"
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
              "The most underrated UX skill isn't craft, it's making everyone in the room feel like the design outcome was also their idea. <span className="teal-shimmer">That's how you actually ship things in enterprise.</span>"
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
              className="inline-flex items-center gap-3 rounded-[var(--radius-md)] bg-primary px-8 py-3 font-heading text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-md transition-opacity hover:opacity-90"
            >
              <ArrowLeft size={14} /> Back to all projects
            </Link>
          </motion.div>
        </CaseStudyContent>
      </section>

      <Footer />
    </CaseStudyShell>
  );
};

export default CignaCaseStudy;
