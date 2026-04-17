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
  top: string; // vh-based positioning
  size: number; // px
  speed: number; // negative = up faster, positive = up slower
  rotate: number;
  offset: number; // px from edge
};

const doodles: Doodle[] = [
  { src: crt,      alt: "CRT monitor",   side: "left",  top: "12vh",  size: 140, speed: -180, rotate: -6, offset: 24 },
  { src: cassette, alt: "Cassette tape", side: "right", top: "28vh",  size: 120, speed: -320, rotate: 8,  offset: 32 },
  { src: gameboy,  alt: "Game Boy",      side: "left",  top: "70vh",  size: 130, speed: -240, rotate: 4,  offset: 40 },
  { src: vhs,      alt: "VHS tape",      side: "right", top: "95vh",  size: 150, speed: -420, rotate: -5, offset: 20 },
  { src: phone,    alt: "Rotary phone",  side: "left",  top: "150vh", size: 140, speed: -300, rotate: -8, offset: 28 },
  { src: boombox,  alt: "Boombox",       side: "right", top: "180vh", size: 160, speed: -380, rotate: 6,  offset: 36 },
  { src: cassette, alt: "Cassette tape", side: "left",  top: "230vh", size: 110, speed: -260, rotate: 10, offset: 44 },
  { src: gameboy,  alt: "Game Boy",      side: "right", top: "260vh", size: 125, speed: -340, rotate: -4, offset: 30 },
];

const DoodleItem = ({ d, scrollY }: { d: Doodle; scrollY: MotionValue<number> }) => {
  const y = useTransform(scrollY, [0, 2000], [0, d.speed]);
  return (
    <motion.img
      src={d.src}
      alt={d.alt}
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
      className="absolute opacity-25 dark:opacity-30 dark:invert pointer-events-none select-none"
    />
  );
};

const ParallaxDoodles = () => {
  const { scrollY } = useScroll();
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block z-0">
      {doodles.map((d, i) => (
        <DoodleItem key={i} d={d} scrollY={scrollY} />
      ))}
    </div>
  );
};

export default ParallaxDoodles;
