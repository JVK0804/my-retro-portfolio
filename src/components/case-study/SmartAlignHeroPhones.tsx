import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const MOBILE_MAX = 767;

const getSideSpread = () =>
  typeof window !== "undefined" && window.innerWidth <= MOBILE_MAX ? 36 : 72;

const CENTER_PHONE = {
  src: "/case-studies/smartalign/hifi/launch-app.webp",
  alt: "Smart Align launch and logo screen",
};

const SIDE_PHONES = [
  {
    src: "/case-studies/smartalign/hifi/golden-triangle-1.webp",
    alt: "Smart Align golden triangle composition grid",
  },
  {
    src: "/case-studies/smartalign/hifi/ready-to-align.webp",
    alt: "Smart Align ready to align framing",
  },
];

const ALL_HERO_IMAGES = [CENTER_PHONE.src, ...SIDE_PHONES.map((p) => p.src)];

const easeOut = [0.25, 0.1, 0.25, 1] as const;

const SmartAlignHeroPhones = () => {
  const reduceMotion = useReducedMotion();
  const [sidesReady, setSidesReady] = useState(false);
  const [sideSpread, setSideSpread] = useState(getSideSpread);

  useEffect(() => {
    const onResize = () => setSideSpread(getSideSpread());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

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
      className="relative mx-auto w-full max-w-full overflow-visible px-1 py-2 sm:max-w-[min(100%,580px)] sm:overflow-hidden sm:px-1 sm:py-4"
      aria-hidden={false}
    >
      <div className="flex items-center justify-center -space-x-5 sm:-space-x-11 md:-space-x-12">
        <motion.div
          className="shrink-0"
          initial={{ x: sideSpread, opacity: 0 }}
          animate={{
            x: showSides ? 0 : sideSpread,
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

        <div className="relative z-10 mx-auto shrink-0">
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

        <motion.div
          className="shrink-0"
          initial={{ x: -sideSpread, opacity: 0 }}
          animate={{
            x: showSides ? 0 : -sideSpread,
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
