import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Frame,
  ImageIcon,
  Settings2,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SketchFilter from "@/components/SketchFilter";
import PrototypeMedia from "@/components/case-study/PrototypeMedia";
import CaseStudyViewport from "@/components/case-study/CaseStudyViewport";
import CaseStudySideNav, { type CaseStudyNavItem } from "@/components/case-study/CaseStudySideNav";
import SmartAlignHeroPhones from "@/components/case-study/SmartAlignHeroPhones";
import { useSound } from "@/contexts/SoundContext";
import { cn } from "@/lib/utils";

const fadeInView = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.45, ease: "easeOut" },
} as const;

const caseStudyNav: CaseStudyNavItem[] = [
  { label: "Overview", id: "overview" },
  { label: "TLDR", id: "tldr" },
  { label: "Story", id: "story" },
  { label: "Context", id: "context" },
  { label: "Research", id: "research" },
  { label: "Affinity", id: "affinity" },
  { label: "HMW", id: "hmw" },
  { label: "Ideas", id: "ideas" },
  { label: "Prototypes", id: "final-prototypes" },
  { label: "Features", id: "features" },
  { label: "System", id: "design-system" },
  { label: "Next", id: "what-next" },
];

const smartAlignSketchImages = [
  { src: "/case-studies/smartalign/sketches/ers0aivqgl4hmig9nbhz.webp", alt: "Ideation sketch, camera and grid concepts" },
  { src: "/case-studies/smartalign/sketches/k7ipns8hrl8q0czwhjge.webp", alt: "Ideation sketch, viewfinder layout exploration" },
  { src: "/case-studies/smartalign/sketches/pw09z1s7zynwirk4st4q.webp", alt: "Ideation sketch, alignment signal patterns" },
  { src: "/case-studies/smartalign/sketches/repgk1j8u6m8fqbrgbpt.webp", alt: "Ideation sketch, community and progress flows" },
  { src: "/case-studies/smartalign/sketches/sjcgbvkzl8yzycg0iffm.webp", alt: "Ideation sketch, manual controls exploration" },
  { src: "/case-studies/smartalign/sketches/spdcvf01vj2oxili3lf3.webp", alt: "Ideation sketch, onboarding and permissions" },
  { src: "/case-studies/smartalign/sketches/xlgjlwwcjz6vxmooul4f.webp", alt: "Ideation sketch, composition guidance UI" },
];

const tldrBlocks = [
  {
    label: "Context",
    body: "Powerful apps exist, but none of them teach while you're shooting.",
    sub: "Mobile Photography Gap",
  },
  {
    label: "Problem",
    body: "Poor framing, no in-context guidance. Guidance always arrives after the image is captured.",
    sub: "Mobile Photography Gap",
  },
  {
    label: "Solution",
    body: "Real time AI composition signals that live inside the viewfinder, not a separate screen.",
    sub: null,
  },
];

const personas = [
  {
    role: "Beginner",
    name: "Priya, 22",
    meta: "College student · shoots daily on iPhone",
    body: "Shoots every day on iPhone. Knows something's off in the frame and can't say what. Doesn't want a course. Wants the camera to show her in the moment.",
    impact:
      "Her frustration directly shaped the alignment signal bar, a single ambient cue that requires zero prior knowledge to read.",
  },
  {
    role: "Professional",
    name: "Arjun, 34",
    meta: "Software engineer · Travel photographer",
    body: "Knows rule of thirds, nothing beyond it. Switches between three apps to get one shot right. Wants the guidance built in, not scattered across settings menus.",
    impact:
      "His frustration directly shaped multi-grid mode, compositional frameworks available without leaving the viewfinder.",
  },
];

const painClusters: { title: string; body: string; icon: LucideIcon }[] = [
  {
    title: "Lack of Control",
    body: "Can't adjust ISO, exposure or aperture quickly and miss the moment searching settings.",
    icon: Settings2,
  },
  {
    title: "Composition & Framing",
    body: "Struggles with straight horizons, subject placement and grids beyond basic 3×3.",
    icon: Frame,
  },
  {
    title: "Image Quality",
    body: "Blurriness, poor zoom, hardware constraints leave users dissatisfied with results.",
    icon: ImageIcon,
  },
  {
    title: "Dissatisfied with Auto",
    body: "Automatic filters produce results that don't match what the user imagined.",
    icon: Sparkles,
  },
  {
    title: "Contextual Inquiry",
    body: "Time pressure, multi-app friction and forgetting to check the shot, repeated failures.",
    icon: Clock,
  },
];

const competitiveGaps = [
  {
    title: "Overwhelming Interfaces",
    body: "Many camera apps (Spectre, Halide) offer advanced manual controls (ISO, shutter speed, etc.), but they overwhelm casual users. Beginners abandon these apps quickly.",
  },
  {
    title: "Hidden or Scattered Features",
    body: "Native apps like Apple/Google Camera hide useful features (grids, exposure adjustments) deep in settings, making them inaccessible for quick, everyday use.",
  },
  {
    title: "AI Exists, but for Glamour, Not Guidance",
    body: "Apps like Spectre use AI for effects (background blur, long exposure), but none use AI for educating about framing, perspective, or composition rules.",
  },
];

const finalScreens = [
  {
    no: "Screen 1",
    title: "Activity & Progress",
    kicker: "The home screen surfaces challenge completion and photo count",
    body: "Not for vanity, because testing showed users needed a reason to return.",
    quote: "Motivation through visible progress, not push notifications.",
    video: "/case-studies/smartalign/activity-screen.webm",
    orientation: "portrait" as const,
  },
  {
    no: "Screen 2",
    title: "The Camera, where everything happens",
    kicker: "Live exposure data at the top",
    body: "Multi-grid mode overlaid directly on the viewfinder. Signal bar that turns yellow on alignment. No settings menu. No secondary screen. Every interaction happens without leaving the shot. Dark UI follows HIG media capture conventions, not a stylistic choice, a platform decision. High-contrast overlays maintain 4.5:1 ratio against the live camera feed across lighting conditions.",
    video: "/case-studies/smartalign/camera-screen.webm",
    orientation: "portrait" as const,
  },
  {
    no: "Screen 3",
    title: "Community Screen",
    kicker: "Resources to learn the basics of mobile photography",
    body: "Dynamic challenges with an explanation. This screen also contains the work of fellow photographers who have posted to the community, helping users get motivation.",
    video: "/case-studies/smartalign/community-screen.webm",
    orientation: "portrait" as const,
  },
];

const features = [
  {
    no: "Feature 01",
    title: "Image Data in Real Time",
    body: "While you point the camera at a subject it analyses and displays the values in real time, letting users know how the values change dynamically based on light while you pan the camera.",
    video: "/case-studies/smartalign/image-data-real-time.webm",
    orientation: "landscape" as const,
  },
  {
    no: "Feature 02",
    title: "Real Time Guidance that signals user to align the frame",
    titleLines: ["Real Time Guidance that signals user", "to align the frame"],
    body: "While users switch into grid guidance mode they can witness a signal bar, signaling whether the frame has been aligned as per the selected grid format. Once the frame is aligned the gray bar turns into yellow, signaling the user that frame is positioned perfect!",
    video: "/case-studies/smartalign/real-time-guidance.webm",
    orientation: "landscape" as const,
  },
  {
    no: "Feature 03",
    title: "What if users can control the live data?",
    body: "As mentioned earlier, the live data will be displayed at the top of the screen while the camera pans around to let users know what's happening with the image while capturing. But, what if users can control the live data to set specific values while capturing so that they can achieve desired results. And this feature delivers exactly the same.",
    video: "/case-studies/smartalign/camera-manual-mode.webm",
    orientation: "portrait" as const,
  },
];

const whatNext = [
  {
    title: "Designing for when the AI gets it wrong",
    body: "Low light, glass surfaces, awkward angles. I want to explore how the guidance behaves under real conditions, not just clean ones. That failure state deserves its own interaction pattern.",
  },
  {
    title: "Taking it beyond Figma.",
    body: "The interactions are prototyped. I'm looking forward to making them functional, seeing how the design holds up when it's actually running.",
  },
  {
    title: "Building it with right tech stack.",
    body: "Swift, SwiftUI, AVFoundation. I've scoped what it takes. Rapid prototyping with the actual tech stack is the logical next step, that's where the real learning happens.",
  },
];

/** Keeps rhetorical phrases on intentional lines (avoids mid-thought wraps). */
const LineBreakCopy = ({
  lines,
  className,
}: {
  lines: React.ReactNode[];
  className?: string;
}) => (
  <span className={className}>
    {lines.map((line, i) => (
      <span key={i} className={i > 0 ? "mt-[0.35em] block" : "block"}>
        {line}
      </span>
    ))}
  </span>
);

const SectionKicker = ({ children }: { children: React.ReactNode }) => (
  <p className="font-body text-[10px] tracking-[0.3em] uppercase text-primary mb-4">{children}</p>
);

const SectionTitle = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <h2 className={cn("mono-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight", className)}>
    {children}
  </h2>
);

type ScreenBlockProps = {
  no: string;
  title: string;
  titleLines?: string[];
  kicker?: string;
  body: string;
  quote?: string;
  video: string;
  orientation?: "portrait" | "landscape";
  reverse?: boolean;
  /** Tighter vertical rhythm (Product Features section). */
  compact?: boolean;
};

const ScreenBlock = ({
  no,
  title,
  titleLines,
  kicker,
  body,
  quote,
  video,
  orientation,
  reverse,
  compact,
}: ScreenBlockProps) => {
  const isLandscape = orientation === "landscape";

  return (
    <div
      className={cn(
        "grid items-center gap-10 px-0",
        compact ? "min-h-0 py-10 md:py-12" : "min-h-[100dvh] py-16",
        isLandscape ? "lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-14" : "lg:grid-cols-2",
        !isLandscape && (reverse ? "lg:gap-24 xl:gap-32" : "lg:gap-14"),
        reverse && "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1",
      )}
    >
      <div
        className={cn(
          "min-w-0 flex flex-col justify-center lg:py-8",
          reverse && !isLandscape && "lg:pl-8 xl:pl-12",
        )}
      >
        <p className="font-body text-[10px] tracking-widest uppercase text-primary mb-3">{no}</p>
        <h3 className="mono-heading text-2xl md:text-3xl font-bold text-foreground mb-3 leading-snug">
          {titleLines ? <LineBreakCopy lines={titleLines} /> : title}
        </h3>
        {kicker && <p className="font-body text-sm text-foreground/60 mb-3 leading-relaxed">{kicker}</p>}
        <p className="font-body text-foreground/80 leading-relaxed max-w-xl">{body}</p>
        {quote && (
          <p className="font-body text-sm italic text-primary mt-5 leading-relaxed border-l-2 border-primary/40 pl-4 max-w-lg">
            {quote}
          </p>
        )}
      </div>
      <div
        className={cn(
          "flex min-w-0 w-full justify-center lg:items-start lg:py-8",
          reverse && !isLandscape
            ? "lg:justify-start lg:pr-8 xl:pr-12"
            : "lg:justify-end lg:pl-4",
        )}
      >
        <PrototypeMedia src={video} label={`${title} prototype`} orientation={orientation} />
      </div>
    </div>
  );
};

const SmartAlignCaseStudy = () => {
  const { play } = useSound();

  return (
    <div className="noise-overlay case-study-page min-h-screen bg-background text-foreground xl:pl-28">
      <SketchFilter />
      <Navbar />
      <CaseStudySideNav items={caseStudyNav} onNavigate={() => play("click")} />

      {/* === HERO === */}
      <CaseStudyViewport id="overview" className="!pt-28">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-12 xl:gap-14">
          <div className="flex w-full max-w-xl flex-col items-start text-left">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="mb-8"
            >
              <Link
                to="/#work"
                onClick={() => play("click")}
                onMouseEnter={() => play("hover")}
                className="font-body text-xs text-foreground/70 hover:text-primary transition-colors inline-flex items-center gap-2"
              >
                <ArrowLeft size={14} /> Back to work
              </Link>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="font-body text-[10px] tracking-[0.28em] uppercase text-primary mb-4"
            >
              Smart Align
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.65 }}
              className="mono-heading text-[1.65rem] sm:text-3xl md:text-[2rem] lg:text-[2.35rem] font-bold text-foreground text-balance leading-[1.2] mb-5 max-w-[19em]"
            >
              The photography app that teaches composition{" "}
              <span className="teal-shimmer">while you're adjusting the frame.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.55 }}
              className="font-body text-sm md:text-base text-foreground/70 max-w-md leading-relaxed mb-7"
            >
              Designed solo. Built to iOS native standards. Validated with 30 real users.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.45 }}
              className="flex items-center gap-6 flex-wrap"
            >
              <a
                href="#final-prototypes"
                onClick={() => play("click")}
                onMouseEnter={() => play("hover")}
                className="rounded-[var(--radius-md)] bg-primary px-7 py-3 font-heading text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-md transition-opacity hover:opacity-90"
              >
                Final Designs
              </a>
              <a
                href="#tldr"
                onClick={() => play("click")}
                className="font-body text-sm text-primary hover:underline inline-flex items-center gap-2"
              >
                Read the Story <ArrowRight size={14} />
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="flex w-full items-center justify-center lg:justify-end"
          >
            <SmartAlignHeroPhones />
          </motion.div>
        </div>
      </CaseStudyViewport>

      {/* === TLDR === */}
      <CaseStudyViewport id="tldr" className="border-t border-border/40">
        <motion.div {...fadeInView}>
          <SectionKicker>TLDR</SectionKicker>
          <SectionTitle className="max-w-3xl mb-10">
            <LineBreakCopy
              lines={[
                <>Short on time? Here's the <span className="teal-shimmer">shot</span>.</>,
              ]}
            />
          </SectionTitle>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-5 mb-8">
          {tldrBlocks.map((b) => (
            <motion.div key={b.label} {...fadeInView} className="glass-card p-6 flex flex-col h-full">
              <p className="font-body text-[10px] tracking-widest uppercase text-primary mb-3">{b.label}</p>
              <p className="font-body text-sm text-foreground/80 leading-relaxed flex-1">{b.body}</p>
              {b.sub && (
                <p className="font-body text-[10px] text-foreground/50 mt-4 tracking-wider uppercase">{b.sub}</p>
              )}
            </motion.div>
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          <motion.div {...fadeInView} className="glass-card p-7">
            <p className="font-body text-[10px] tracking-widest uppercase text-primary mb-3">Research</p>
            <p className="mono-heading text-5xl font-bold text-primary mb-2">30</p>
            <p className="font-body text-sm text-foreground/70 leading-relaxed">
              <LineBreakCopy
                lines={[
                  "Users tested across two photographer profiles (Beginners and Professionals),",
                  "to understand their approach towards analysing the frame and settings.",
                ]}
              />
            </p>
          </motion.div>
          <motion.div {...fadeInView} className="glass-card p-7">
            <p className="font-body text-[10px] tracking-widest uppercase text-primary mb-3">Results</p>
            <p className="font-body text-sm text-foreground/80 leading-relaxed">
              <LineBreakCopy
                lines={[
                  "Usability tests showed 6 out of 10 users oriented frames faster within 1 minute",
                  "and said they can see how the values impact the results.",
                ]}
              />
            </p>
            <a
              href="#final-prototypes"
              onClick={() => play("click")}
              className="inline-block mt-4 font-body text-sm text-primary hover:underline"
            >
              See Final Designs →
            </a>
          </motion.div>
        </div>
      </CaseStudyViewport>

      {/* === STORY === */}
      <CaseStudyViewport id="story" variant="quote" className="border-t border-border/40">
        <motion.blockquote
          {...fadeInView}
          className="mx-auto max-w-4xl text-center"
        >
          <p className="mono-heading text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-foreground leading-[1.15]">
            <LineBreakCopy
              lines={[
                "I've missed shots. Not because of light or timing, because I didn't know where to look.",
                "Turns out, most people haven't either.",
              ]}
            />
          </p>
        </motion.blockquote>
      </CaseStudyViewport>

      {/* === CONTEXT (differentiated — not another card section) === */}
      <CaseStudyViewport id="context" variant="emphasis">
        <motion.div {...fadeInView} className="mx-auto max-w-4xl text-center">
          <p className="font-body text-[10px] tracking-[0.35em] uppercase text-foreground/50 mb-8">
            Mobile Photography
          </p>
          <h2 className="mono-heading text-3xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.12]">
            <LineBreakCopy
              className="text-foreground"
              lines={[
                "Mobile photography is everywhere",
                <span className="text-foreground/55 font-medium">
                  and they're doing great, but did they address the{" "}
                  <span className="text-primary font-bold">problems</span>?
                </span>,
              ]}
            />
          </h2>
        </motion.div>
      </CaseStudyViewport>

      {/* === RESEARCH (personas only) === */}
      <CaseStudyViewport id="research" className="border-t border-border/40">
        <motion.div {...fadeInView} className="mb-10">
          <SectionKicker>Who I Designed For</SectionKicker>
          <SectionTitle className="max-w-3xl">
            <LineBreakCopy
              lines={[
                "Two levels of photographers.",
                <span className="teal-shimmer">One frustration.</span>,
              ]}
            />
          </SectionTitle>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-6">
          {personas.map((p) => (
            <motion.article key={p.name} {...fadeInView} className="glass-card p-8 h-full">
              <span className="retro-tag mb-4 inline-block">{p.role}</span>
              <h3 className="mono-heading text-2xl font-bold text-foreground mb-1">{p.name}</h3>
              <p className="font-body text-xs text-foreground/50 mb-4">{p.meta}</p>
              <p className="font-body text-sm text-foreground/80 leading-relaxed mb-4">{p.body}</p>
              <p className="font-body text-xs italic text-primary leading-snug">{p.impact}</p>
            </motion.article>
          ))}
        </div>
      </CaseStudyViewport>

      {/* === AFFINITY === */}
      <CaseStudyViewport id="affinity" className="border-t border-border/40">
        <motion.div {...fadeInView} className="mb-8">
          <SectionKicker>Affinity Mapping</SectionKicker>
          <SectionTitle className="max-w-3xl mb-4">
            <LineBreakCopy
              lines={[
                "Five pain clusters.",
                <span className="teal-shimmer">One root cause.</span>,
              ]}
            />
          </SectionTitle>
          <p className="font-body text-foreground/60 max-w-2xl leading-relaxed">
            <LineBreakCopy
              lines={[
                "Every frustration pointed to the same moment, guidance that arrives after the shot is already gone.",
                "Not a hardware problem. A timing problem.",
              ]}
            />
          </p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {painClusters.map((c) => {
            const Icon = c.icon;
            return (
              <motion.div key={c.title} {...fadeInView} className="glass-card p-6">
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-primary/12 text-primary">
                    <Icon size={28} strokeWidth={1.65} aria-hidden />
                  </span>
                  <h4 className="mono-heading text-lg font-bold text-foreground leading-snug">{c.title}</h4>
                </div>
                <p className="font-body text-sm text-foreground/70 leading-relaxed">{c.body}</p>
              </motion.div>
            );
          })}
        </div>
      </CaseStudyViewport>

      {/* === HMW === */}
      <CaseStudyViewport id="hmw" variant="emphasis">
        <motion.div {...fadeInView} className="mb-8">
          <SectionKicker>How Might We</SectionKicker>
          <SectionTitle className="max-w-3xl mb-4">
            <LineBreakCopy
              lines={[
                "Teach composition without making the camera feel like a",
                <span className="teal-shimmer">classroom?</span>,
              ]}
            />
          </SectionTitle>
          <p className="font-body text-foreground/60 max-w-2xl mb-2">The apps already exist. Here's where they stop.</p>
          <p className="font-body text-[10px] tracking-widest uppercase text-foreground/50">
            Snapseed, Lightroom, Spectre, Halide
          </p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-5">
          {competitiveGaps.map((g) => (
            <motion.div key={g.title} {...fadeInView} className="glass-card p-6 h-full">
              <h4 className="mono-heading text-lg font-bold text-foreground mb-3">{g.title}</h4>
              <p className="font-body text-sm text-foreground/70 leading-relaxed">{g.body}</p>
            </motion.div>
          ))}
        </div>
      </CaseStudyViewport>

      {/* === IDEAS === */}
      <CaseStudyViewport id="ideas" className="!min-h-0 !h-auto border-t border-border/40 !py-20 md:!py-24">
        <motion.div {...fadeInView} className="mb-8">
          <SectionKicker>Ideation</SectionKicker>
          <SectionTitle className="max-w-3xl mb-4">
            <LineBreakCopy
              lines={[
                "Seven sketches across",
                <span className="teal-shimmer">three sessions.</span>,
              ]}
            />
          </SectionTitle>
          <p className="font-body text-foreground/60 max-w-2xl">
            <LineBreakCopy
              lines={[
                "The goal wasn't refinement, it was getting the wrong ideas out early",
                "so screen time wasn't wasted on them.",
              ]}
            />
          </p>
        </motion.div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 md:items-start">
          <div className="flex min-w-0 flex-col gap-5">
            {smartAlignSketchImages.slice(0, 4).map((img) => (
              <motion.div
                key={img.src}
                {...fadeInView}
                className="glass-card case-study-sketch-card w-full min-w-0 overflow-hidden border border-border/50 p-3 md:p-4"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="rounded-md bg-muted/15"
                  loading="lazy"
                  decoding="async"
                />
              </motion.div>
            ))}
          </div>
          <div className="flex min-w-0 flex-col gap-5">
            {smartAlignSketchImages.slice(4).map((img) => (
              <motion.div
                key={img.src}
                {...fadeInView}
                className="glass-card case-study-sketch-card w-full min-w-0 overflow-hidden border border-border/50 p-3 md:p-4"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="rounded-md bg-muted/15"
                  loading="lazy"
                  decoding="async"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </CaseStudyViewport>

      {/* === FINAL PROTOTYPES (one viewport per screen) === */}
      <section id="final-prototypes" className="border-t border-border/40 scroll-snap-align-start">
        <div className="mx-auto flex min-h-[100dvh] max-w-6xl flex-col justify-center px-6 py-20">
          <motion.div {...fadeInView} className="mb-4">
            <SectionKicker>Final Prototypes</SectionKicker>
            <SectionTitle className="max-w-3xl">
              <LineBreakCopy
                lines={[
                  "Finalised screens based on",
                  <span className="teal-shimmer">user feedback.</span>,
                ]}
              />
            </SectionTitle>
          </motion.div>
        </div>
        <div className="max-w-6xl mx-auto px-6">
          {finalScreens.map((s, i) => (
            <ScreenBlock
              key={s.no}
              no={s.no}
              title={s.title}
              kicker={s.kicker}
              body={s.body}
              quote={s.quote}
              video={s.video}
              orientation={s.orientation}
              reverse={i % 2 === 1}
            />
          ))}
        </div>
      </section>

      {/* === FEATURES === */}
      <section id="features" className="border-t border-border/40">
        <div className="max-w-6xl mx-auto px-6 pt-12 md:pt-16 pb-4">
          <motion.div {...fadeInView} className="mb-8 md:mb-10">
            <SectionKicker>Product Features</SectionKicker>
            <SectionTitle className="max-w-3xl">
              <LineBreakCopy
                lines={[
                  "AI and intuitive design to",
                  <span className="teal-shimmer">revolutionize mobile photography composition.</span>,
                ]}
              />
            </SectionTitle>
          </motion.div>
          {features.map((f, i) => (
            <ScreenBlock
              key={f.no}
              no={f.no}
              title={f.title}
              titleLines={"titleLines" in f ? f.titleLines : undefined}
              body={f.body}
              video={f.video}
              orientation={f.orientation}
              reverse={i % 2 === 1}
              compact
            />
          ))}
        </div>
      </section>

      {/* === DESIGN SYSTEM === */}
      <CaseStudyViewport id="design-system" className="border-t border-border/40">
        <motion.div {...fadeInView}>
          <SectionKicker>Design Systems</SectionKicker>
          <SectionTitle className="max-w-3xl mb-6">
            <LineBreakCopy lines={["Minimal UI that never competes with the shot."]} />
          </SectionTitle>
          <p className="font-body text-foreground/70 text-lg leading-relaxed max-w-2xl">
            My goal is to keep UI minimalistic with user friendly layout and not to compete with the shot.
          </p>
        </motion.div>
      </CaseStudyViewport>

      {/* === WHAT NEXT === */}
      <CaseStudyViewport id="what-next" className="border-t border-border/40">
        <motion.div {...fadeInView} className="mb-10">
          <SectionKicker>What I'd do differently?</SectionKicker>
          <SectionTitle className="max-w-3xl">
            <LineBreakCopy lines={["What comes", <span className="teal-shimmer">next.</span>]} />
          </SectionTitle>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-5 mb-16">
          {whatNext.map((item) => (
            <motion.div key={item.title} {...fadeInView} className="glass-card p-7 h-full">
              <h3 className="mono-heading text-lg font-bold text-foreground mb-3">{item.title}</h3>
              <p className="font-body text-sm text-foreground/70 leading-relaxed">{item.body}</p>
            </motion.div>
          ))}
        </div>
        <motion.div {...fadeInView} className="text-center">
          <Link
            to="/#work"
            onClick={() => play("click")}
            onMouseEnter={() => play("hover")}
            className="inline-flex items-center gap-3 rounded-[var(--radius-md)] bg-primary px-8 py-3 font-heading text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-md transition-opacity hover:opacity-90"
          >
            <ArrowLeft size={14} /> Back to all projects
          </Link>
        </motion.div>
      </CaseStudyViewport>

      <Footer />
    </div>
  );
};

export default SmartAlignCaseStudy;
