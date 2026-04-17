import { useScroll, useTransform, motion, MotionValue } from "framer-motion";
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
};

// Retro doodles dominate the top of the page; modern doodles take over
// further down. Each one fades in/out around its anchor as you scroll past.
const doodles: Doodle[] = [
  // RETRO — visible from top through ~mid scroll
  { src: crt,      alt: "CRT",      side: "left",  top: "8vh",   size: 220, speed: -600,  rotate: -8,  offset: -30, era: "retro" },
  { src: cassette, alt: "Cassette", side: "right", top: "22vh",  size: 190, speed: -900,  rotate: 10,  offset: -20, era: "retro" },
  { src: gameboy,  alt: "Game Boy", side: "left",  top: "65vh",  size: 200, speed: -750,  rotate: 6,   offset: 30,  era: "retro" },
  { src: vhs,      alt: "VHS",      side: "right", top: "90vh",  size: 230, speed: -1200, rotate: -6,  offset: -40, era: "retro" },
  { src: phone,    alt: "Phone",    side: "left",  top: "140vh", size: 210, speed: -850,  rotate: -10, offset: -20, era: "retro" },
  { src: boombox,  alt: "Boombox",  side: "right", top: "170vh", size: 250, speed: -1100, rotate: 8,   offset: 20,  era: "retro" },
  { src: camera,   alt: "Camera",   side: "right", top: "125vh", size: 170, speed: -800,  rotate: 18,  offset: 60,  era: "retro" },

  // MODERN — gradually fade in from mid scroll downward
  { src: smartphone, alt: "Smartphone", side: "left",  top: "200vh", size: 200, speed: -900,  rotate: -8, offset: -20, era: "modern" },
  { src: earbuds,    alt: "Earbuds",    side: "right", top: "220vh", size: 180, speed: -1000, rotate: 12, offset: 30,  era: "modern" },
  { src: smartwatch, alt: "Smartwatch", side: "left",  top: "245vh", size: 170, speed: -800,  rotate: 6,  offset: 40,  era: "modern" },
  { src: vr,         alt: "AR Glasses", side: "right", top: "265vh", size: 220, speed: -1100, rotate: -4, offset: -30, era: "modern" },
  { src: laptop,     alt: "Laptop",     side: "left",  top: "285vh", size: 230, speed: -950,  rotate: 4,  offset: -40, era: "modern" },
  { src: drone,      alt: "Drone",      side: "right", top: "305vh", size: 210, speed: -1200, rotate: -10, offset: 20, era: "modern" },
];

const DoodleItem = ({ d, scrollY }: { d: Doodle; scrollY: MotionValue<number> }) => {
  // Modern doodles enter slightly later via initial offset, but never fade out.
  const y = useTransform(scrollY, [0, 3000], [0, d.speed]);

  return (
    <motion.img
      src={d.src}
      alt=""
      width={512}
      height={512}
      loading="lazy"
      decoding="async"
      aria-hidden="true"
      style={{
        y,
        rotate: d.rotate,
        top: d.top,
        width: d.size,
        height: d.size,
        opacity: 0.4,
        [d.side]: d.offset,
        willChange: "transform",
      }}
      className="absolute dark:invert pointer-events-none select-none"
    />
  );
};

const ParallaxDoodles = () => {
  const { scrollY } = useScroll();
  return (
    <div className="absolute inset-0 pointer-events-none hidden md:block z-0">
      {doodles.map((d, i) => (
        <DoodleItem key={i} d={d} scrollY={scrollY} />
      ))}
    </div>
  );
};

export default ParallaxDoodles;
