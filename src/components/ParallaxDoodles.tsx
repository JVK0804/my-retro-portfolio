import { useCallback, useEffect, useRef } from "react";
import {
  useScroll,
  useTransform,
  motionValue,
  useMotionValueEvent,
  useMotionTemplate,
  motion,
  type MotionValue,
  useReducedMotion,
} from "framer-motion";
import { VolumeX } from "lucide-react";
import { toast } from "sonner";
import crt from "@/assets/retro-crt.png";
import cassette from "@/assets/retro-cassette.png";
import gameboy from "@/assets/retro-gameboy.png";
import vhs from "@/assets/retro-vhs.png";
import phone from "@/assets/retro-phone.png";
import boombox from "@/assets/retro-boombox.png";
import camera from "@/assets/retro-camera.png";
import smartphone from "@/assets/modern-smartphone.png";
import earbuds from "@/assets/modern-earbuds.png";
import smartwatch from "@/assets/modern-smartwatch.png";
import vr from "@/assets/modern-vr.png";
import laptop from "@/assets/modern-laptop.png";
import drone from "@/assets/modern-drone.png";
import { useEraSounds, type DeviceKey } from "@/hooks/useEraSounds";
import { useSound } from "@/contexts/SoundContext";
import { useInterfaceReady } from "@/contexts/InterfaceReadyContext";
import { MACBOOK_13_MAX_WIDTH, useViewportBelow } from "@/hooks/useViewportBelow";

type Doodle = {
  src: string;
  alt: string;
  side: "left" | "right";
  top: string;
  size: number;
  speed: number;
  rotate: number;
  offset: number;
  era: "retro" | "modern";
  device: DeviceKey;
};

const doodles: Doodle[] = [
  { src: crt, alt: "CRT", side: "left", top: "8vh", size: 180, speed: -600, rotate: -8, offset: 10, era: "retro", device: "crt" },
  { src: cassette, alt: "Cassette", side: "right", top: "22vh", size: 160, speed: -900, rotate: 10, offset: 20, era: "retro", device: "cassette" },
  { src: gameboy, alt: "Game Boy", side: "left", top: "65vh", size: 170, speed: -750, rotate: 6, offset: 20, era: "retro", device: "gameboy" },
  { src: vhs, alt: "VHS", side: "right", top: "90vh", size: 190, speed: -1200, rotate: -6, offset: 10, era: "retro", device: "vhs" },
  { src: phone, alt: "Phone", side: "left", top: "140vh", size: 170, speed: -850, rotate: -10, offset: 30, era: "retro", device: "phone" },
  { src: boombox, alt: "Boombox", side: "right", top: "170vh", size: 200, speed: -1100, rotate: 8, offset: 20, era: "retro", device: "boombox" },
  { src: camera, alt: "Camera", side: "right", top: "125vh", size: 150, speed: -800, rotate: 18, offset: 60, era: "retro", device: "camera" },
  { src: smartphone, alt: "Smartphone", side: "left", top: "200vh", size: 170, speed: -900, rotate: -8, offset: 20, era: "modern", device: "smartphone" },
  { src: earbuds, alt: "Earbuds", side: "right", top: "220vh", size: 160, speed: -1000, rotate: 12, offset: 30, era: "modern", device: "earbuds" },
  { src: smartwatch, alt: "Smartwatch", side: "left", top: "245vh", size: 150, speed: -800, rotate: 6, offset: 40, era: "modern", device: "smartwatch" },
  { src: vr, alt: "AR Glasses", side: "right", top: "265vh", size: 180, speed: -1100, rotate: -4, offset: 20, era: "modern", device: "ar" },
  { src: laptop, alt: "Laptop", side: "left", top: "285vh", size: 190, speed: -950, rotate: 4, offset: 10, era: "modern", device: "laptop" },
  { src: drone, alt: "Drone", side: "right", top: "305vh", size: 170, speed: -1200, rotate: -10, offset: 20, era: "modern", device: "drone" },
];

const PARALLAX_SCROLL_RANGE = 3000;
const CONTENT_OVERLAP_BLUR_PX = 2;
const BLUR_ZONE_SELECTOR = "[data-parallax-blur-zone]";

const rectsOverlap = (a: DOMRect, b: DOMRect) =>
  a.bottom > b.top && a.top < b.bottom && a.right > b.left && a.left < b.right;

const getVisibleBlurZones = () => {
  const viewportHeight = window.innerHeight;
  return Array.from(document.querySelectorAll<HTMLElement>(BLUR_ZONE_SELECTOR)).filter((zone) => {
    const rect = zone.getBoundingClientRect();
    return rect.bottom > 0 && rect.top < viewportHeight;
  });
};

const overlapsAnyZone = (doodleRect: DOMRect, zones: HTMLElement[]) =>
  zones.some((zone) => rectsOverlap(doodleRect, zone.getBoundingClientRect()));

const DoodleItem = ({
  d,
  scrollY,
  blurPx,
  onPlay,
  loading,
  soundEnabled,
  showPulse,
  playGlow,
  doodleRef,
}: {
  d: Doodle;
  scrollY: MotionValue<number>;
  blurPx: MotionValue<number>;
  onPlay: (device: DeviceKey) => void;
  loading: boolean;
  soundEnabled: boolean;
  showPulse: boolean;
  playGlow: boolean;
  doodleRef: (node: HTMLButtonElement | null) => void;
}) => {
  const y = useTransform(scrollY, [0, PARALLAX_SCROLL_RANGE], [0, d.speed]);
  const filter = useMotionTemplate`blur(${blurPx}px)`;

  return (
    <motion.button
      ref={doodleRef}
      type="button"
      onClick={() => {
        if (!soundEnabled) {
          toast("Sound effects are off", { icon: <VolumeX size={16} /> });
          return;
        }
        onPlay(d.device);
      }}
      aria-label={`Play ${d.alt} sound`}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{
        y,
        rotate: d.rotate,
        top: d.top,
        left: d.side === "left" ? d.offset : undefined,
        right: d.side === "right" ? d.offset : undefined,
        width: d.size,
        height: d.size,
        willChange: "transform",
      }}
      className="doodle-hit absolute pointer-events-auto cursor-pointer p-0 border-0 bg-transparent select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md"
    >
      <motion.div
        className={`doodle-art absolute inset-0${loading ? " doodle-art--loading" : ""}`}
      >
        <motion.img
          src={d.src}
          alt=""
          width={512}
          height={512}
          loading="lazy"
          decoding="async"
          aria-hidden="true"
          style={{ filter }}
          className="w-full h-full dark:invert select-none pointer-events-none"
          draggable={false}
        />
      </motion.div>

      {showPulse && playGlow ? (
        <span className="doodle-pulse-hint doodle-pulse-hint--play" aria-hidden="true" />
      ) : null}

      {loading ? (
        <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="w-3 h-3 rounded-full bg-primary animate-ping" />
        </span>
      ) : null}
    </motion.button>
  );
};

const ParallaxDoodles = () => {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const { play, loadingKey } = useEraSounds();
  const { enabled: soundEnabled } = useSound();
  const interfaceReady = useInterfaceReady();
  const isNarrowViewport = useViewportBelow(MACBOOK_13_MAX_WIDTH);

  const doodleRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const blurValues = useRef(doodles.map(() => motionValue(0)));

  const updateBlurs = useCallback(() => {
    const blurs = blurValues.current;

    if (!isNarrowViewport) {
      blurs.forEach((blur) => blur.set(0));
      return;
    }

    const zones = getVisibleBlurZones();
    if (zones.length === 0) {
      blurs.forEach((blur) => blur.set(0));
      return;
    }

    doodleRefs.current.forEach((node, index) => {
      const blur = blurs[index];
      if (!node) {
        blur.set(0);
        return;
      }

      const doodleRect = node.getBoundingClientRect();
      blur.set(overlapsAnyZone(doodleRect, zones) ? CONTENT_OVERLAP_BLUR_PX : 0);
    });
  }, [isNarrowViewport]);

  useMotionValueEvent(scrollY, "change", updateBlurs);

  useEffect(() => {
    updateBlurs();
    window.addEventListener("resize", updateBlurs);
    window.addEventListener("scroll", updateBlurs, { passive: true });
    return () => {
      window.removeEventListener("resize", updateBlurs);
      window.removeEventListener("scroll", updateBlurs);
    };
  }, [updateBlurs]);

  useEffect(() => {
    if (!isNarrowViewport) {
      blurValues.current.forEach((blur) => blur.set(0));
    }
  }, [isNarrowViewport]);

  if (reduceMotion) return null;

  return (
    <div
      className="absolute inset-0 pointer-events-none hidden md:block z-0"
      style={{ contain: "layout style" }}
    >
      {doodles.map((d, i) => (
        <DoodleItem
          key={d.device}
          d={d}
          scrollY={scrollY}
          blurPx={blurValues.current[i]!}
          doodleRef={(node) => {
            doodleRefs.current[i] = node;
          }}
          onPlay={play}
          loading={loadingKey === d.device}
          soundEnabled={soundEnabled}
          showPulse={!reduceMotion}
          playGlow={interfaceReady}
        />
      ))}
    </div>
  );
};

export default ParallaxDoodles;
