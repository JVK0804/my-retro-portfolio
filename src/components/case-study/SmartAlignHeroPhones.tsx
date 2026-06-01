import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const CENTER_PHONE = {
  src: "/case-studies/smartalign/hifi/launch-app.webp",
  alt: "Smart Align launch and logo screen",
};

const SIDE_PHONES = [
  {
    src: "/case-studies/smartalign/hifi/golden-triangle-1.webp",
    alt: "Smart Align golden triangle composition grid",
    /** Collapsed offset toward center (px) */
    collapsedX: 88,
  },
  {
    src: "/case-studies/smartalign/hifi/ready-to-align.webp",
    alt: "Smart Align ready to align framing",
    collapsedX: -88,
  },
];

const ALL_HERO_IMAGES = [CENTER_PHONE.src, ...SIDE_PHONES.map((p) => p.src)];

const easeOut = [0.25, 0.1, 0.25, 1] as const;

const SmartAlignHeroPhones = () => {
  const reduceMotion = useReducedMotion();
  const [sidesReady, setSidesReady] = useState(false);

  useEffect(() => {
    const links = ALL_HERO_IMAGES.map((src) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = src;
      document.head.appendChild(link);
      return link;
    });

    let cancelled = false;

    const preload = (src: string) =>
      new Promise<void>((resolve) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = () => resolve();
        img.src = src;
      });

    const preloadAll = Promise.all(ALL_HERO_IMAGES.map(preload));
    const maxWait = new Promise<void>((resolve) => setTimeout(resolve, 280));

    Promise.race([preloadAll, maxWait]).then(() => {
      if (!cancelled) setSidesReady(true);
    });

    return () => {
      cancelled = true;
      links.forEach((link) => link.remove());
    };
  }, []);

  const showSides = reduceMotion || sidesReady;

  return (
    <div
      className="relative mx-auto flex w-full max-w-[min(100%,580px)] items-center justify-center px-1 py-4 sm:px-2"
      aria-hidden={false}
    >
      <div className="flex items-center justify-center -space-x-9 sm:-space-x-11 md:-space-x-12">
        {/* Left side */}
        <motion.div
          className="shrink-0"
          initial={{ x: SIDE_PHONES[0].collapsedX, opacity: 0 }}
          animate={{
            x: showSides ? 0 : SIDE_PHONES[0].collapsedX,
            opacity: showSides ? 1 : 0,
          }}
          transition={{ delay: reduceMotion ? 0 : 0.18, duration: 0.6, ease: easeOut }}
        >
          <div className="case-study-phone-frame case-study-phone-frame--hero-side shadow-md shadow-foreground/8">
            <img
              src={SIDE_PHONES[0].src}
              alt={SIDE_PHONES[0].alt}
              width={196}
              height={424}
              decoding="async"
              fetchPriority="high"
              loading="eager"
            />
          </div>
        </motion.div>

        {/* Logo screen — visible on load */}
        <div className="relative z-10 shrink-0">
          <div className="case-study-phone-frame case-study-phone-frame--hero-center shadow-lg shadow-foreground/10">
            <img
              src={CENTER_PHONE.src}
              alt={CENTER_PHONE.alt}
              width={224}
              height={485}
              decoding="sync"
              fetchPriority="high"
              loading="eager"
            />
          </div>
        </div>

        {/* Right side */}
        <motion.div
          className="shrink-0"
          initial={{ x: SIDE_PHONES[1].collapsedX, opacity: 0 }}
          animate={{
            x: showSides ? 0 : SIDE_PHONES[1].collapsedX,
            opacity: showSides ? 1 : 0,
          }}
          transition={{ delay: reduceMotion ? 0 : 0.25, duration: 0.6, ease: easeOut }}
        >
          <div className="case-study-phone-frame case-study-phone-frame--hero-side shadow-md shadow-foreground/8">
            <img
              src={SIDE_PHONES[1].src}
              alt={SIDE_PHONES[1].alt}
              width={196}
              height={424}
              decoding="async"
              fetchPriority="high"
              loading="eager"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SmartAlignHeroPhones;
