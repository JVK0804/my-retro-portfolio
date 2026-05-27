import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SketchFilter from "@/components/SketchFilter";
import { useSound } from "@/contexts/SoundContext";

const sectionNav = [
  "Overview",
  "TLDR",
  "Research",
  "HMW",
  "Ideas",
  "Design System",
  "Final Prototypes",
  "What Next",
];

const tldrBlocks = [
  {
    label: "Context",
    body: "Powerful apps exist — none of them teach while you're shooting.",
    sub: "Mobile Photography Gap",
  },
  {
    label: "Problem",
    body: "Poor framing, no in-context guidance. Guidance always arrives after the image is captured.",
    sub: "Mobile Photography Gap",
  },
  {
    label: "Solution",
    body: "Real-time AI composition signals that live inside the viewfinder — not a separate screen.",
    sub: null,
  },
];

const personas = [
  {
    role: "Beginner",
    name: "Priya, 22",
    meta: "College student · shoots daily on iPhone",
    body: "Shoots every day on iPhone. Knows something's off in the frame — can't say what. Doesn't want a course. Wants the camera to show her in the moment.",
    impact:
      "Her frustration directly shaped the alignment signal bar — a single ambient cue that requires zero prior knowledge to read.",
  },
  {
    role: "Professional",
    name: "Arjun, 34",
    meta: "Software engineer · Travel photographer",
    body: "Knows rule of thirds, nothing beyond it. Switches between three apps to get one shot right. Wants the guidance built in, not scattered across settings menus.",
    impact:
      "His frustration directly shaped multi-grid mode — compositional frameworks available without leaving the viewfinder.",
  },
];

const painClusters = [
  {
    title: "Lack of Control",
    body: "Can't adjust ISO, exposure or aperture quickly — miss the moment searching settings.",
  },
  {
    title: "Composition & Framing",
    body: "Struggles with straight horizons, subject placement and grids beyond basic 3×3.",
  },
  {
    title: "Image Quality",
    body: "Blurriness, poor zoom, hardware constraints leave users dissatisfied with results.",
  },
  {
    title: "Dissatisfied with Auto",
    body: "Automatic filters produce results that don't match what the user imagined.",
  },
  {
    title: "Contextual Inquiry",
    body: "Time pressure, multi-app friction and forgetting to check the shot — repeated failures.",
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
    body: "Not for vanity — because testing showed users needed a reason to return.",
    quote: "Motivation through visible progress, not push notifications.",
    video: "/case-studies/smartalign/activity-screen.webm",
  },
  {
    no: "Screen 2",
    title: "The Camera, where everything happens",
    kicker: "Live exposure data at the top",
    body: "Multi-grid mode overlaid directly on the viewfinder. Signal bar that turns yellow on alignment. No settings menu. No secondary screen. Every interaction happens without leaving the shot. Dark UI follows HIG media capture conventions — not a stylistic choice, a platform decision. High-contrast overlays maintain 4.5:1 ratio against the live camera feed across lighting conditions.",
    video: "/case-studies/smartalign/camera-screen.webm",
  },
  {
    no: "Screen 3",
    title: "Community Screen",
    kicker: "Resources to learn the basics of mobile photography",
    body: "Dynamic challenges with an explanation. This screen also contains the work of fellow photographers who have posted to the community — helping users get motivation.",
    video: "/case-studies/smartalign/community-screen.webm",
  },
];

const features = [
  {
    no: "Feature 01",
    title: "Image Data in Real Time",
    body: "While you point the camera at a subject it analyses and displays the values in real time, letting users know how the values change dynamically based on light while you pan the camera.",
    video: null as string | null,
  },
  {
    no: "Feature 02",
    title: "Real-Time Guidance that signals user to align the frame",
    body: "While users switch into grid-guidance mode they can witness a signal bar, signaling whether the frame has been aligned as per the selected grid-format. Once the frame is aligned the gray bar turns into yellow, signaling the user that frame is positioned perfect!",
    video: null,
  },
  {
    no: "Feature 03",
    title: "What if users can control the live data?",
    body: "As mentioned earlier, the live data will be displayed at the top of the screen while the camera pans around to let users know what's happening with the image while capturing. But, what if users can control the live data to set specific values while capturing so that they can achieve desired results. And this feature delivers exactly the same.",
    video: "/case-studies/smartalign/camera-manual-mode.webm",
  },
];

const whatNext = [
  {
    title: "Designing for when the AI gets it wrong",
    body: "Low light, glass surfaces, awkward angles. I want to explore how the guidance behaves under real conditions, not just clean ones. That failure state deserves its own interaction pattern.",
  },
  {
    title: "Taking it beyond Figma.",
    body: "The interactions are prototyped. I'm looking forward to making them functional — seeing how the design holds up when it's actually running.",
  },
  {
    title: "Building it with right tech stack.",
    body: "Swift, SwiftUI, AVFoundation. I've scoped what it takes. Rapid prototyping with the actual tech stack is the logical next step — that's where the real learning happens.",
  },
];

const PrototypeVideo = ({ src, label }: { src: string; label: string }) => (
  <div className="glass-card overflow-hidden rounded-[var(--radius-lg)] border border-border/50 bg-muted/15 p-2 shadow-sm">
    <video
      src={src}
      className="mx-auto block w-full max-h-[min(70vh,520px)] max-w-[220px] rounded-md object-contain sm:max-w-[240px] md:max-w-[260px]"
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
      aria-label={label}
    />
  </div>
);

type MediaRowProps = {
  no: string;
  title: string;
  kicker?: string;
  body: string;
  quote?: string;
  video?: string | null;
  reverse?: boolean;
};

const CaseStudyMediaRow = ({ no, title, kicker, body, quote, video, reverse }: MediaRowProps) => (
  <motion.article
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.7 }}
    className="glass-card p-8 md:p-12"
  >
    <div
      className={`grid gap-8 md:gap-10 items-center ${
        video ? "md:grid-cols-5" : ""
      }`}
    >
      <div className={`min-w-0 ${video ? `md:col-span-2 ${reverse ? "md:order-2" : ""}` : "max-w-3xl"}`}>
        <p className="font-body text-[10px] tracking-widest uppercase text-primary mb-3">{no}</p>
        <h3 className="mono-heading text-2xl md:text-3xl font-bold text-foreground mb-3 leading-snug">{title}</h3>
        {kicker && <p className="font-body text-sm text-foreground/60 mb-3 leading-relaxed">{kicker}</p>}
        <p className="font-body text-foreground/80 leading-relaxed">{body}</p>
        {quote && (
          <p className="font-body text-sm italic text-primary mt-4 leading-relaxed border-l-2 border-primary/40 pl-4">
            {quote}
          </p>
        )}
      </div>
      {video && (
        <div
          className={`flex min-w-0 justify-center md:col-span-3 ${
            reverse ? "md:order-1 md:justify-start" : "md:justify-end"
          }`}
        >
          <PrototypeVideo src={video} label={`${title} prototype`} />
        </div>
      )}
    </div>
  </motion.article>
);

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

      {/* === OVERVIEW / HERO === */}
      <section id="overview" className="pt-32 pb-24 px-6">
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
            Smart Align
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="mono-heading text-4xl md:text-6xl font-bold text-foreground leading-[1.05] mb-6"
          >
            The photography app that teaches composition{" "}
            <span className="teal-shimmer">while you're adjusting the frame</span>.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.6 }}
            className="font-body text-foreground/70 text-base md:text-lg max-w-2xl leading-relaxed mb-10"
          >
            Designed solo. Built to iOS native standards. Validated with 30 real users.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
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
      </section>

      {/* === TLDR === */}
      <section id="tldr" className="py-24 px-6 border-t border-border/40">
        <div className="max-w-6xl mx-auto">
          <SectionHeader kicker="TLDR" title={<>Short on time? Here's the <span className="teal-shimmer">shot</span>.</>} />
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {tldrBlocks.map((b, i) => (
              <motion.div
                key={b.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="glass-card p-7 flex flex-col"
              >
                <p className="font-body text-[10px] tracking-widest uppercase text-primary mb-3">{b.label}</p>
                <p className="font-body text-sm text-foreground/80 leading-relaxed flex-1">{b.body}</p>
                {b.sub && (
                  <p className="font-body text-[10px] text-foreground/50 mt-4 tracking-wider uppercase">{b.sub}</p>
                )}
              </motion.div>
            ))}
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card p-8"
            >
              <p className="font-body text-[10px] tracking-widest uppercase text-primary mb-3">Research</p>
              <p className="mono-heading text-5xl font-bold text-primary mb-2">30</p>
              <p className="font-body text-sm text-foreground/70 leading-relaxed">
                Users tested across two photographer profiles (Beginners and Professionals), to understand their
                approach towards analysing the frame and settings.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="glass-card p-8"
            >
              <p className="font-body text-[10px] tracking-widest uppercase text-primary mb-3">Results</p>
              <p className="font-body text-sm text-foreground/80 leading-relaxed">
                Usability tests showed 6 out of 10 users oriented frames faster within 1 minute and said they can see
                how the values impact the results.
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
        </div>
      </section>

      {/* === STORY HOOK === */}
      <section className="py-24 px-6 border-t border-border/40">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mono-heading text-3xl md:text-5xl font-bold text-foreground leading-tight"
          >
            I've missed shots. Not because of light or timing — because I didn't know where to look. Turns out, most
            people haven't either.
          </motion.h2>
        </div>
      </section>

      {/* === RESEARCH === */}
      <section id="research" className="py-24 px-6 border-t border-border/40">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            kicker="Mobile Photography"
            title={
              <>
                Mobile Photography Is Everywhere and they're doing great — but did they address the{" "}
                <span className="teal-shimmer">problems</span>?
              </>
            }
          />

          <SectionHeader
            kicker="Who I Designed For"
            title={
              <>
                Two Levels of Photographers. <span className="teal-shimmer">One Frustration</span>
              </>
            }
          />
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {personas.map((p, i) => (
              <motion.article
                key={p.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="glass-card p-8"
              >
                <span className="retro-tag mb-4 inline-block">{p.role}</span>
                <h3 className="mono-heading text-2xl font-bold text-foreground mb-1">{p.name}</h3>
                <p className="font-body text-xs text-foreground/50 mb-4">{p.meta}</p>
                <p className="font-body text-sm text-foreground/80 leading-relaxed mb-4">{p.body}</p>
                <p className="font-body text-xs italic text-primary leading-snug">{p.impact}</p>
              </motion.article>
            ))}
          </div>

          <SectionHeader
            kicker="Affinity Mapping"
            title={
              <>
                Five pain clusters. <span className="teal-shimmer">One root cause</span>.
              </>
            }
          />
          <p className="font-body text-foreground/60 max-w-2xl mb-10 -mt-6">
            Every frustration pointed to the same moment — guidance that arrives after the shot is already gone. Not a
            hardware problem. A timing problem.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {painClusters.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                className="glass-card p-6"
              >
                <h4 className="mono-heading text-lg font-bold text-foreground mb-3">{c.title}</h4>
                <p className="font-body text-sm text-foreground/70 leading-relaxed">{c.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* === HMW === */}
      <section id="hmw" className="py-24 px-6 border-t border-border/40">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            kicker="How Might We"
            title={
              <>
                Teach composition without making the camera feel like a{" "}
                <span className="teal-shimmer">classroom</span>?
              </>
            }
          />
          <p className="font-body text-foreground/60 max-w-2xl mb-6">
            The apps already exist. Here's where they stop.
          </p>
          <p className="font-body text-[10px] tracking-widest uppercase text-foreground/50 mb-10">
            Snapseed, Lightroom, Spectre, Halide
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {competitiveGaps.map((g, i) => (
              <motion.div
                key={g.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="glass-card p-7"
              >
                <h4 className="mono-heading text-lg font-bold text-foreground mb-3">{g.title}</h4>
                <p className="font-body text-sm text-foreground/70 leading-relaxed">{g.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* === IDEAS (sketches — coming soon) === */}
      <section id="ideas" className="py-24 px-6 border-t border-border/40">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            kicker="Ideation"
            title={
              <>
                Seven sketches across <span className="teal-shimmer">three sessions</span>.
              </>
            }
          />
          <p className="font-body text-foreground/60 max-w-2xl mb-8">
            The goal wasn't refinement — it was getting the wrong ideas out early so screen time wasn't wasted on them.
          </p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card aspect-[16/9] max-w-2xl flex items-center justify-center p-8"
          >
            <p className="font-body text-foreground/50 text-center text-sm">
              Sketch prototypes — coming soon
            </p>
          </motion.div>
        </div>
      </section>

      {/* === FINAL PROTOTYPES === */}
      <section id="final-prototypes" className="py-24 px-6 border-t border-border/40">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            kicker="Final Prototypes"
            title={
              <>
                Finalised screens based on <span className="teal-shimmer">user feedback</span>.
              </>
            }
          />
          <div className="space-y-8">
            {finalScreens.map((s, i) => (
              <CaseStudyMediaRow
                key={s.no}
                no={s.no}
                title={s.title}
                kicker={s.kicker}
                body={s.body}
                quote={s.quote}
                video={s.video}
                reverse={i % 2 === 1}
              />
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
            {features.map((f, i) =>
              f.video ? (
                <CaseStudyMediaRow
                  key={f.no}
                  no={f.no}
                  title={f.title}
                  body={f.body}
                  video={f.video}
                  reverse={i % 2 === 1}
                />
              ) : (
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
                    <h3 className="mono-heading text-2xl md:text-3xl font-bold text-foreground leading-snug">
                      {f.title}
                    </h3>
                  </div>
                  <div className="md:col-span-3 border-l-0 md:border-l-2 border-primary/30 md:pl-8">
                    <p className="font-body text-foreground/80 leading-relaxed">{f.body}</p>
                  </div>
                </motion.article>
              ),
            )}
          </div>
        </div>
      </section>

      {/* === DESIGN SYSTEM === */}
      <section id="design-system" className="py-24 px-6 border-t border-border/40">
        <div className="max-w-5xl mx-auto">
          <SectionHeader kicker="Design Systems" title="Minimal UI that never competes with the shot." />
          <p className="font-body text-foreground/70 text-lg leading-relaxed max-w-2xl">
            My goal is to keep UI minimalistic with user friendly layout and not to compete with the shot.
          </p>
        </div>
      </section>

      {/* === WHAT NEXT === */}
      <section id="what-next" className="py-24 px-6 border-t border-border/40">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            kicker="What I'd do differently?"
            title={<>What comes <span className="teal-shimmer">next</span>.</>}
          />
          <div className="space-y-6">
            {whatNext.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="glass-card p-8 md:p-10"
              >
                <h3 className="mono-heading text-xl md:text-2xl font-bold text-foreground mb-3">{item.title}</h3>
                <p className="font-body text-foreground/70 leading-relaxed">{item.body}</p>
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

export default SmartAlignCaseStudy;
