import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { formatUptime } from "@/lib/session-uptime";

const TIME_ZONE = "America/Indiana/Indianapolis";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  timeZone: TIME_ZONE,
});

const timeFormatter = new Intl.DateTimeFormat("en-US", {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hourCycle: "h23",
  timeZone: TIME_ZONE,
});

const formatDate = (date: Date) => {
  const parts = Object.fromEntries(dateFormatter.formatToParts(date).map((p) => [p.type, p.value]));
  return `${parts.day} ${parts.month} ${parts.year}`;
};

const HeroStatusLine = () => {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.6, duration: 0.6 }}
      className="pointer-events-none absolute inset-x-0 bottom-8 px-6"
    >
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-1 border-t border-border/60 px-2 pt-3 font-mono-space text-[10px] tracking-[0.12em] text-foreground/55 sm:px-8 sm:text-[11px]">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="terminal-status-dot" aria-hidden="true" />
          <span>
            Status: <span className="text-primary">ONLINE</span>
          </span>
          <span className="text-foreground/25" aria-hidden="true">|</span>
          <span>Bloomington, IN</span>
          <span className="text-foreground/25" aria-hidden="true">|</span>
          <span>
            Session uptime: <span className="text-primary tabular-nums">[ {formatUptime(performance.now())} ]</span>
          </span>
        </div>
        <time dateTime={now.toISOString()} className="tabular-nums">
          {formatDate(now)} // {timeFormatter.format(now)}
        </time>
      </div>
    </motion.div>
  );
};

export default HeroStatusLine;
