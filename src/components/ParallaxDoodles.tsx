import { useScroll, useTransform, motion, MotionValue } from "framer-motion";
import crt from "@/assets/retro-crt.png";
import cassette from "@/assets/retro-cassette.png";
import gameboy from "@/assets/retro-gameboy.png";
import vhs from "@/assets/retro-vhs.png";
import phone from "@/assets/retro-phone.png";
import boombox from "@/assets/retro-boombox.png";

type Doodle = {
  src: string;
  alt: string;
  side: "left" | "right";
  top: string;
  size: number;
  speed: number; // px traveled across full scroll
  rotate: number;
  offset: number; // px from edge (can be negative to bleed off-screen)
};

const doodles: Doodle[] = [
  { src: crt,      alt: "CRT",      side: "left",  top: "8vh",   size: 220, speed: -600,  rotate: -8, offset: -30 },
  { src: cassette, alt: "Cassette", side: "right", top: "22vh",  size: 190, speed: -900,  rotate: 10, offset: -20 },
  { src: gameboy,  alt: "Game Boy", side: "left",  top: "65vh",  size: 200, speed: -750,  rotate: 6,  offset: 30 },
  { src: vhs,      alt: "VHS",      side: "right", top: "90vh",  size: 230, speed: -1200, rotate: -6, offset: -40 },
  { src: phone,    alt: "Phone",    side: "left",  top: "140vh", size: 210, speed: -850,  rotate: -10, offset: -20 },
  { src: boombox,  alt: "Boombox",  side: "right", top: "170vh", size: 250, speed: -1100, rotate: 8,  offset: 20 },
  { src: cassette, alt: "Cassette", side: "left",  top: "220vh", size: 180, speed: -700,  rotate: 12, offset: 40 },
  { src: gameboy,  alt: "Game Boy", side: "right", top: "250vh", size: 200, speed: -1000, rotate: -5, offset: -30 },
];

const DoodleItem = ({ d, scrollY }: { d: Doodle; scrollY: MotionValue<number> }) => {
  const y = useTransform(scrollY, [0, 3000], [0, d.speed]);
  return (
    <motion.img
      src={d.src}
      alt=""
      width={512}
      height={512}
      loading="lazy"
      aria-hidden="true"
      style={{
        y,
        rotate: d.rotate,
        top: d.top,
        width: d.size,
        height: d.size,
        [d.side]: d.offset,
      }}
      className="absolute opacity-40 dark:opacity-50 dark:invert pointer-events-none select-none"
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
