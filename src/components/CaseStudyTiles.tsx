import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useSound } from "@/contexts/SoundContext";
import CaseStudyCardMedia from "@/components/CaseStudyCardMedia";

type CaseStudy = {
  projectName: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  impact: string;
  readTime: string;
  image: string;
  mediaType: "video" | "image";
  href: string;
  priority?: boolean;
};

const caseStudies: CaseStudy[] = [
  {
    projectName: "Slack AI",
    title: "Integrating AI Powered features in Slack, to enhance data privacy.",
    subtitle: "AI Design for Data Privacy",
    description:
      "Redesigned Slack's AI to make privacy feel human, empowering students to trust, learn, and take control of their data.",
    tags: ["AI", "Data Privacy", "UX Design"],
    impact: "20% increase in user engagement",
    readTime: "6 min Read",
    image: "/case-studies/slack/hifi/slack-full.webm",
    mediaType: "video",
    href: "/work/slack",
    priority: true,
  },
  {
    projectName: "Cigna Healthcare",
    title: "Collaboration That Scales Trust (NDA)",
    subtitle: "Design Systems",
    description:
      "Designed 20+ react components and built a unified design system for Cigna Enterprise enabling seamless collaboration across 3 teams with zero integration regressions.",
    tags: ["Design Systems", "Enterprise", "React"],
    impact: "Reduced development time by 35%",
    readTime: "4 min Read",
    image: "/case-studies/cigna/cigna-hero.webm",
    mediaType: "video",
    href: "/work/cigna",
    priority: true,
  },
  {
    projectName: "Smart Align",
    title: "AI Powered features to learn Mobile Photography",
    subtitle: "Mobile AI",
    description:
      "Designed Smart Align, an AI-powered mobile photography app that improved user interaction through iterative testing and feedback.",
    tags: ["Mobile AI", "Photography", "UX Research"],
    impact: "62% improved interaction · 35% less onboarding friction",
    readTime: "5 min Read",
    image: "/case-study-cards/smart-align.webp",
    mediaType: "image",
    href: "/work/smartalign",
    priority: true,
  },
];

type TerminalLine = {
  text: string;
  msPerChar: number;
  className: string;
  prefix?: string;
  prefixClassName?: string;
};

const LINE_PAUSE_MS = 90;
const COMMAND_MS_PER_CHAR = 37;
const BODY_MS_PER_CHAR = 7;

const buildLines = (study: CaseStudy): TerminalLine[] => {
  const slug = study.href.split("/").filter(Boolean).pop() ?? study.projectName;
  return [
    {
      prefix: "~/work $ ",
      prefixClassName: "text-primary",
      text: `open ${slug}`,
      msPerChar: COMMAND_MS_PER_CHAR,
      className: "font-mono-space text-xs md:text-sm text-foreground/70",
    },
    {
      text: study.projectName,
      msPerChar: 28,
      className:
        "type-h3 group-hover:text-primary transition-colors pt-2",
    },
    {
      text: `${study.subtitle} · ${study.readTime}`,
      msPerChar: BODY_MS_PER_CHAR,
      className: "type-eyebrow",
    },
    {
      text: study.title,
      msPerChar: BODY_MS_PER_CHAR,
      className: "type-h4 pt-1",
    },
    {
      text: study.description,
      msPerChar: BODY_MS_PER_CHAR,
      className: "type-body",
    },
    {
      prefix: "tags    ",
      prefixClassName: "text-foreground/45",
      text: study.tags.map((tag) => `[${tag}]`).join(" "),
      msPerChar: BODY_MS_PER_CHAR,
      className: "font-mono-space text-[11px] text-foreground/70 pt-1 whitespace-pre-wrap",
    },
    {
      prefix: "impact  ",
      prefixClassName: "text-foreground/45",
      text: study.impact,
      msPerChar: BODY_MS_PER_CHAR,
      className: "font-mono-space text-[11px] text-primary whitespace-pre-wrap",
    },
    {
      prefix: "> ",
      prefixClassName: "text-primary",
      text: "read case study ↵",
      msPerChar: 20,
      className: "font-mono-space text-xs text-foreground/80 pt-2 group-hover:text-primary transition-colors",
    },
  ];
};

/** Start time (ms) of each line, so progress can be derived from elapsed time alone. */
const buildSchedule = (lines: TerminalLine[]) => {
  let t = 0;
  return lines.map((line) => {
    const start = t;
    t += line.text.length * line.msPerChar + LINE_PAUSE_MS;
    return start;
  });
};

const TerminalProject = ({ study, lines }: { study: CaseStudy; lines: TerminalLine[] }) => {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const schedule = useMemo(() => buildSchedule(lines), [lines]);
  const [counts, setCounts] = useState<number[]>(() => lines.map(() => 0));
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      setCounts(lines.map((line) => line.text.length));
      setDone(true);
      return;
    }

    let raf = 0;
    const startedAt = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startedAt;
      const next = lines.map((line, i) => {
        const n = Math.floor((elapsed - schedule[i]) / line.msPerChar);
        return Math.max(0, Math.min(line.text.length, n));
      });

      setCounts(next);
      if (next.every((n, i) => n >= lines[i].text.length)) {
        setDone(true);
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduceMotion, lines, schedule]);

  const activeLine = done ? lines.length - 1 : Math.max(0, counts.findIndex((n, i) => n < lines[i].text.length));

  return (
    <div ref={ref} className="flex flex-col gap-2.5 md:gap-3 mt-5 md:mt-0 md:py-1">
      <span className="sr-only">
        {lines.map((line) => `${line.prefix ?? ""}${line.text}`).join(". ")}
      </span>
      {lines.map((line, i) => {
        const shown = counts[i];
        const started = inView && (shown > 0 || i === activeLine);
        return (
          <p key={i} aria-hidden="true" className={line.className}>
            {line.prefix && (
              <span className={`${line.prefixClassName ?? ""} ${started ? "" : "invisible"}`}>
                {line.prefix}
              </span>
            )}
            <span>{line.text.slice(0, shown)}</span>
            {inView && i === activeLine && (
              <span className="terminal-cursor" data-typing={done ? undefined : "true"} />
            )}
            <span className="invisible">{line.text.slice(shown)}</span>
          </p>
        );
      })}
    </div>
  );
};

const CaseStudyTiles = () => {
  const { play } = useSound();
  const terminalLines = useMemo(() => caseStudies.map(buildLines), []);

  useEffect(() => {
    const links: HTMLLinkElement[] = [];
    caseStudies.forEach((study) => {
      if (!study.priority) return;
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = study.mediaType === "video" ? "video" : "image";
      link.href = study.image;
      document.head.appendChild(link);
      links.push(link);
    });
    return () => links.forEach((el) => el.remove());
  }, []);

  return (
    <section id="work" className="py-24 px-6" data-parallax-blur-zone>
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-14 md:mb-16">
          <h2 className="type-h2 mb-3">
            Selected Work
          </h2>
          <p className="type-body max-w-lg">
            Case studies spanning healthcare, AI, and enterprise, where craft meets complexity.
          </p>
        </div>

        <div className="flex flex-col gap-10 md:gap-14">
          {caseStudies.map((study, idx) => {
            const isInternal = study.href.startsWith("/");
            const cardInner = (
              <div className="grid md:grid-cols-[1.3fr_0.7fr] lg:grid-cols-[3fr_2fr] md:gap-6 lg:gap-8 md:items-center">
                <div className="min-w-0">
                  <CaseStudyCardMedia
                    src={study.image}
                    alt={`${study.projectName} prototype preview`}
                    mediaType={study.mediaType}
                    priority={study.priority ?? idx === 0}
                    className="transition-colors group-hover:border-primary/50"
                  />
                </div>

                <TerminalProject study={study} lines={terminalLines[idx]} />
              </div>
            );

            const wrapperClass = "group relative z-10 block w-full cursor-pointer border-t border-border/50 pt-8 md:pt-10";

            return (
              <motion.article
                key={study.projectName}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: idx * 0.06, duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
                onMouseEnter={() => play("hover")}
              >
                {isInternal ? (
                  <Link
                    to={study.href}
                    onClick={() => play("click")}
                    className={wrapperClass}
                    data-parallax-block-zone
                  >
                    {cardInner}
                  </Link>
                ) : (
                  <a href={study.href} className={wrapperClass} data-parallax-block-zone>
                    {cardInner}
                  </a>
                )}
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CaseStudyTiles;
