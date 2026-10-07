import { useEffect, useState, type MouseEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useReducedMotion } from "framer-motion";
import HeroHud from "@/components/HeroHud";
import SoundSwitch from "@/components/SoundSwitch";

const PATH_TYPING_MS = 28;

const segmentHref = (segments: string[], index: number) => {
  const joined = `/${segments.slice(0, index + 1).join("/")}`;
  return joined === "/work" ? "/#work" : joined;
};

const TerminalPath = ({ pathname }: { pathname: string }) => {
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();
  const segments = pathname.split("/").filter(Boolean);
  const parts = ["~", ...segments];
  const fullText = `${parts.join("/")} $`;
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (reduceMotion) {
      setCount(fullText.length);
      return;
    }
    setCount(0);
    const timer = window.setInterval(() => {
      setCount((current) => {
        if (current >= fullText.length) {
          window.clearInterval(timer);
          return current;
        }
        return current + 1;
      });
    }, PATH_TYPING_MS);
    return () => window.clearInterval(timer);
  }, [fullText, reduceMotion]);

  const goToWork = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    navigate("/");
    window.setTimeout(() => {
      document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  let offset = 0;
  const visible = (text: string) => {
    const start = offset;
    offset += text.length;
    return text.slice(0, Math.max(0, count - start));
  };

  return (
    <nav
      aria-label={`Current path ${parts.join("/")}`}
      className="flex h-12 items-center border border-foreground/25 bg-background/85 px-4 font-mono-space text-[11px] tracking-[0.08em] text-foreground/60 backdrop-blur-md sm:text-xs"
    >
      {parts.map((part, i) => {
        const isLast = i === parts.length - 1;
        const label = visible(part);
        const slash = i < parts.length - 1 ? visible("/") : "";
        const href = i === 0 ? "/" : segmentHref(segments, i - 1);
        return (
          <span key={`${part}-${i}`} className="whitespace-nowrap">
            {isLast ? (
              <span className="text-foreground" aria-current="page">
                {label}
              </span>
            ) : href === "/#work" ? (
              <a href={href} onClick={goToWork} className="hover:text-primary">
                {label}
              </a>
            ) : (
              <Link to={href} className={i === 0 ? "text-primary hover:opacity-80" : "hover:text-primary"}>
                {label}
              </Link>
            )}
            <span className="text-foreground/35">{slash}</span>
          </span>
        );
      })}
      <span className="ml-1 text-primary">{visible(" $").trim()}</span>
      <span className="terminal-cursor" data-typing={count < fullText.length ? "true" : undefined} aria-hidden="true" />
    </nav>
  );
};

const SiteChrome = () => {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  return (
    <>
      <div className="pointer-events-none fixed inset-4 z-[60] sm:inset-6" aria-hidden="true">
        <div className="absolute left-0 top-0 h-6 w-6 border-l border-t border-foreground/30" />
        <div className="absolute right-0 top-0 h-6 w-6 border-r border-t border-foreground/30" />
        <div className="absolute bottom-0 left-0 h-6 w-6 border-b border-l border-foreground/30" />
        <div className="absolute bottom-0 right-0 h-6 w-6 border-b border-r border-foreground/30" />
      </div>

      {!isHome && (
        <div className="fixed left-[5.25rem] top-4 z-[60] max-w-[calc(100vw-16rem)] sm:max-w-[calc(100vw-22rem)] overflow-hidden sm:left-[6rem] sm:top-6">
          <TerminalPath pathname={pathname} />
        </div>
      )}

      <HeroHud />
      <SoundSwitch />
    </>
  );
};

export default SiteChrome;
