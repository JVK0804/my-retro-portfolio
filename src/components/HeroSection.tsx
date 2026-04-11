import { motion } from "framer-motion";

const logos = [
  { name: "Slack", url: "https://framerusercontent.com/images/Y1BLUOFjSoTgGkUdTbXiGf240.png?width=1600&height=572" },
  { name: "Anthem", url: "https://framerusercontent.com/images/KfD31x5VYV55hirSEkUW5j4Vg.png?width=2853&height=512" },
  { name: "Deloitte", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Deloitte.svg/200px-Deloitte.svg.png" },
];

const HeroSection = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="font-body text-foreground/60 text-base mb-6 tracking-wide"
      >
        Hi there, I'm <span className="teal-shimmer font-bold">Kaushik</span>
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="mono-heading text-3xl md:text-5xl lg:text-6xl font-bold text-center max-w-4xl mb-2"
      >
        Designing Simple,
      </motion.h1>
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="mono-heading text-3xl md:text-5xl lg:text-6xl font-bold text-center max-w-4xl mb-2"
      >
        Scalable,
      </motion.h1>
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="mono-heading text-3xl md:text-5xl lg:text-6xl font-bold text-center max-w-4xl"
      >
        & <span className="teal-shimmer">Human Experiences</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="font-body text-foreground/50 text-sm mt-14 mb-6 tracking-widest uppercase"
      >
        Previously designed for
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
          className="glass-card px-8 py-3 font-heading text-xs font-bold text-primary-foreground bg-primary hover:opacity-90 transition-opacity tracking-wider uppercase"
        >
          Let's Connect
        </a>
        <a
          href="/about"
          className="glass-card px-8 py-3 font-heading text-xs font-bold text-foreground hover:text-primary transition-colors tracking-wider uppercase"
        >
          About me →
        </a>
      </motion.div>
    </section>
  );
};

export default HeroSection;
