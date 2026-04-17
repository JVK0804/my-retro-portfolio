import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSound } from "@/contexts/SoundContext";

const WELCOME_TEXT = "Kaushik here ✦ Welcome to my internet corner";

const TypingWelcome = () => {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 1000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!started || count >= WELCOME_TEXT.length) return;
    const t = setTimeout(() => setCount((c) => c + 1), 32);
    return () => clearTimeout(t);
  }, [count, started]);

  const shown = WELCOME_TEXT.slice(0, count);
  const isDone = count >= WELCOME_TEXT.length;

  return (
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.6 }}
      className="font-mono text-foreground/70 text-sm mb-8 tracking-wide min-h-[1.5em]"
      aria-label={WELCOME_TEXT}
    >
      <span className="text-primary mr-1">$</span>
      <span className="teal-shimmer font-bold">{shown.split("✦")[0]}</span>
      {shown.includes("✦") && <span>{"✦" + shown.split("✦")[1]}</span>}
      <span
        className={`inline-block w-[0.55ch] h-[1em] -mb-[0.15em] ml-[1px] bg-primary ${
          isDone ? "animate-pulse" : ""
        }`}
        aria-hidden="true"
      />
    </motion.p>
  );
};

const logos = [
  { name: "Slack", url: "https://framerusercontent.com/images/Y1BLUOFjSoTgGkUdTbXiGf240.png?width=1600&height=572" },
  { name: "Anthem", url: "https://framerusercontent.com/images/KfD31x5VYV55hirSEkUW5j4Vg.png?width=2853&height=512" },
  { name: "Deloitte", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Deloitte.svg/200px-Deloitte.svg.png" },
];

const HeroSection = () => {
  const { play } = useSound();

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16">
      <TypingWelcome />

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="mono-heading text-4xl md:text-6xl lg:text-7xl font-bold text-center max-w-4xl mb-2"
      >
        A Zillennial Designer
      </motion.h1>
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="mono-heading text-4xl md:text-6xl lg:text-7xl font-bold text-center max-w-4xl mb-2"
      >
        Crafting the <span className="teal-shimmer">handshake</span> between humans and AI.
      </motion.h1>
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="mono-heading text-4xl md:text-6xl lg:text-7xl font-bold text-center max-w-4xl"
      >
        Built to scale.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="font-body text-foreground/50 text-[11px] mt-12 mb-5 tracking-[0.25em] uppercase"
      >
        Shipped at
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="flex items-center gap-8 flex-wrap justify-center opacity-40"
      >
        {logos.map((logo) => (
          <img
            key={logo.name}
            src={logo.url}
            alt={logo.name}
            className="h-7 md:h-9 object-contain grayscale"
            loading="lazy"
          />
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        className="flex gap-4 mt-14"
      >
        <a
          href="#letsconnect"
          onClick={(e) => {
            e.preventDefault();
            play("click");
            document.getElementById("letsconnect")?.scrollIntoView({ behavior: "smooth" });
          }}
          onMouseEnter={() => play("hover")}
          className="glass-card px-8 py-3 font-heading text-xs font-bold text-primary-foreground bg-primary hover:opacity-90 transition-opacity tracking-wider uppercase cursor-pointer"
        >
          Let's Connect
        </a>
        <Link
          to="/about"
          onClick={() => play("whoosh")}
          onMouseEnter={() => play("hover")}
          className="glass-card px-8 py-3 font-heading text-xs font-bold text-foreground hover:text-primary transition-colors tracking-wider uppercase"
        >
          About me →
        </Link>
      </motion.div>
    </section>
  );
};

export default HeroSection;
