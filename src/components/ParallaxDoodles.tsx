import { useScroll, useTransform, motion, MotionValue, useReducedMotion } from "framer-motion";
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

type Doodle = {
  src: string;
  alt: string;
  side: "left" | "right";
  top: string;
  size: number;
  speed: number; // px traveled across full scroll
  rotate: number;
  offset: number; // px from edge (can be negative to bleed off-screen)
  era: "retro" | "modern";
  device: DeviceKey;
};

// Retro doodles dominate the top of the page; modern doodles take over
// further down. Each one fades in/out around its anchor as you scroll past.
const doodles: Doodle[] = [
  // RETRO — top of the page
  { src: crt,      alt: "CRT",      side: "left",  top: "8vh",   size: 180, speed: -600,  rotate: -8,  offset: 10,  era: "retro", device: "crt" },
  { src: cassette, alt: "Cassette", side: "right", top: "22vh",  size: 160, speed: -900,  rotate: 10,  offset: 20,  era: "retro", device: "cassette" },
  { src: gameboy,  alt: "Game Boy", side: "left",  top: "65vh",  size: 170, speed: -750,  rotate: 6,   offset: 20,  era: "retro", device: "gameboy" },
  { src: vhs,      alt: "VHS",      side: "right", top: "90vh",  size: 190, speed: -1200, rotate: -6,  offset: 10,  era: "retro", device: "vhs" },
  { src: phone,    alt: "Phone",    side: "left",  top: "140vh", size: 170, speed: -850,  rotate: -10, offset: 30,  era: "retro", device: "phone" },
  { src: boombox,  alt: "Boombox",  side: "right", top: "170vh", size: 200, speed: -1100, rotate: 8,   offset: 20,  era: "retro", device: "boombox" },
  { src: camera,   alt: "Camera",   side: "right", top: "125vh", size: 150, speed: -800,  rotate: 18,  offset: 60,  era: "retro", device: "camera" },

  // MODERN — lower in the page
  { src: smartphone, alt: "Smartphone", side: "left",  top: "200vh", size: 170, speed: -900,  rotate: -8, offset: 20, era: "modern", device: "smartphone" },
  { src: earbuds,    alt: "Earbuds",    side: "right", top: "220vh", size: 160, speed: -1000, rotate: 12, offset: 30, era: "modern", device: "earbuds" },
  { src: smartwatch, alt: "Smartwatch", side: "left",  top: "245vh", size: 150, speed: -800,  rotate: 6,  offset: 40, era: "modern", device: "smartwatch" },
  { src: vr,         alt: "AR Glasses", side: "right", top: "265vh", size: 180, speed: -1100, rotate: -4, offset: 20, era: "modern", device: "ar" },
  { src: laptop,     alt: "Laptop",     side: "left",  top: "285vh", size: 190, speed: -950,  rotate: 4,  offset: 10, era: "modern", device: "laptop" },
  { src: drone,      alt: "Drone",      side: "right", top: "305vh", size: 170, speed: -1200, rotate: -10, offset: 20, era: "modern", device: "drone" },
];

const DoodleItem = ({
  d,
  scrollY,
  onPlay,
  loading,
  soundEnabled,
}: {
  d: Doodle;
  scrollY: MotionValue<number>;
  onPlay: (device: DeviceKey) => void;
  loading: boolean;
  soundEnabled: boolean;
}) => {
  const y = useTransform(scrollY, [0, 3000], [0, d.speed]);

  return (
    <motion.button
      type="button"
      onClick={() => {
        if (!soundEnabled) {
          toast("Enable sound effects to hear device audio", {
            description: "Tap the speaker icon in the top right.",
          });
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
        opacity: loading ? 0.7 : 0.4,
        willChange: "transform",
      }}
      className="absolute pointer-events-auto cursor-pointer p-0 border-0 bg-transparent select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md"
    >
      <img
        src={d.src}
        alt=""
        width={512}
        height={512}
        loading="lazy"
        decoding="async"
        aria-hidden="true"
        className="w-full h-full dark:invert select-none pointer-events-none"
        draggable={false}
      />
      {loading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="w-3 h-3 rounded-full bg-primary animate-ping" />
        </span>
      )}
    </motion.button>
  );
};

const ParallaxDoodles = () => {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const { play, loadingKey } = useEraSounds();
  const { enabled: soundEnabled } = useSound();

  if (reduceMotion) return null;

  return (
    <div
      className="absolute inset-0 pointer-events-none hidden md:block z-20"
      style={{ contain: "layout paint style" }}
    >
      {doodles.map((d, i) => (
        <DoodleItem
          key={i}
          d={d}
          scrollY={scrollY}
          onPlay={play}
          loading={loadingKey === d.device}
          soundEnabled={soundEnabled}
        />
      ))}
    </div>
  );
};

export default ParallaxDoodles;
