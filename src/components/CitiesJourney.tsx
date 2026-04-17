import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { Camera, MapPin } from "lucide-react";
import vizag from "@/assets/landmark-vizag.png";
import hyderabad from "@/assets/landmark-hyderabad.png";
import bloomington from "@/assets/landmark-bloomington.png";

type City = {
  era: string;
  city: string;
  region: string;
  years: string;
  landmark: string;
  text: string;
  side: "left" | "right";
};

const cities: City[] = [
  {
    era: "Home · Chapter I",
    city: "Visakhapatnam",
    region: "Andhra Pradesh, India",
    years: "Where it began",
    landmark: vizag,
    text: "Born by the Bay of Bengal, under Dolphin's Nose hill. Salt air and steel plants taught me craft and engineering share a coastline.",
    side: "left",
  },
  {
    era: "Home · Chapter II",
    city: "Hyderabad",
    region: "Telangana, India",
    years: "First job, first love",
    landmark: hyderabad,
    text: "Charminar arches and HiTech City GPUs. My first design role, and where I fell for building at scale.",
    side: "right",
  },
  {
    era: "Home · Chapter III",
    city: "Bloomington",
    region: "Indiana, USA",
    years: "Third home",
    landmark: bloomington,
    text: "Through the Sample Gates and into HCI. Indiana University gave me the rigor of research and a quieter way to think.",
    side: "left",
  },
];

/* Photo that floats in zigzag inside the right column — never overlaps text */
const FloatingPortrait = ({ progress }: { progress: MotionValue<number> }) => {
  // Zigzag confined to the right half of the screen
  const x = useTransform(
    progress,
    [0, 0.33, 0.66, 1],
    ["-12%", "12%", "-10%", "10%"]
  );
  const scale = useTransform(progress, [0, 1], [1, 0.55]);
  const rotate = useTransform(progress, [0, 0.33, 0.66, 1], [-5, 4, -3, 5]);
  const y = useTransform(progress, [0, 0.5, 1], [0, -8, 8]);

  return (
    <motion.div
      style={{ x, scale, rotate, y }}
      className="hidden md:block absolute top-1/2 right-[12%] -translate-y-1/2 z-10 pointer-events-none"
    >
      <div className="relative w-[170px] lg:w-[210px] aspect-[3/4] glass-card flex items-center justify-center bg-muted/40">
        <div className="text-center text-muted-foreground/70 p-3">
          <div className="w-10 h-10 mx-auto mb-2 rounded-full border-2 border-dashed border-foreground/30 flex items-center justify-center">
            <Camera size={16} className="text-foreground/50" />
          </div>
          <p className="font-heading text-[9px] tracking-widest uppercase">Kaushik</p>
          <p className="font-body text-[8px] mt-1 opacity-70">Portrait</p>
        </div>
        <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-primary/50" />
        <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-primary/50" />
        <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-primary/50" />
        <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-primary/50" />
      </div>
    </motion.div>
  );
};

const CityPanel = ({
  city,
  index,
  total,
  progress,
}: {
  city: City;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) => {
  const segment = 1 / total;
  const start = index * segment;
  const end = start + segment;
  const fadeInStart = Math.max(0, start - segment * 0.15);
  const fadeInEnd = start + segment * 0.35;
  const fadeOutStart = end - segment * 0.15;
  const fadeOutEnd = Math.min(1, end + segment * 0.15);

  const opacity = useTransform(
    progress,
    [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd],
    [0, 1, 1, 0]
  );
  const y = useTransform(progress, [fadeInStart, start, end, fadeOutEnd], [24, 0, 0, -24]);

  return (
    <motion.div
      className="absolute inset-0 flex items-center"
      style={{ opacity, y }}
    >
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-8 items-center">
        {/* Text — always left column, never overlapped by portrait */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <MapPin size={14} className="text-primary" />
            <p className="font-heading text-[11px] text-primary tracking-widest uppercase">
              {city.era} · {city.years}
            </p>
          </div>
          <h3 className="mono-heading text-4xl md:text-6xl font-bold text-foreground mb-2">
            {city.city}
          </h3>
          <p className="font-body text-xs text-muted-foreground tracking-wider uppercase mb-6">
            {city.region}
          </p>
          <p className="font-body text-base md:text-lg text-foreground/80 leading-relaxed max-w-md">
            {city.text}
          </p>
          {/* Mobile landmark below text */}
          <img
            src={city.landmark}
            alt={`${city.city} landmark`}
            width={512}
            height={512}
            loading="lazy"
            className="mt-8 w-40 h-auto opacity-70 dark:invert md:hidden"
          />
        </div>

        {/* Right column: faded landmark sits behind floating portrait */}
        <div className="hidden md:flex relative items-center justify-center min-h-[420px]">
          <img
            src={city.landmark}
            alt=""
            aria-hidden="true"
            width={768}
            height={768}
            loading="lazy"
            className="w-full max-w-xs h-auto opacity-25 dark:invert"
          />
        </div>
      </div>
    </motion.div>
  );
};

const CitiesJourney = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ height: `${cities.length * 100}vh` }}
      aria-label="Cities I've called home"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Section intro tag */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20 text-center">
          <p className="font-heading text-[11px] text-primary tracking-widest uppercase">
            Where I'm From
          </p>
          <p className="font-body text-xs text-foreground/60 mt-1">
            Three cities. One zigzag.
          </p>
        </div>

        {/* Floating zigzag portrait */}
        <FloatingPortrait progress={scrollYProgress} />

        {/* City panels cross-fade */}
        <div className="relative h-full w-full">
          {cities.map((c, i) => (
            <CityPanel
              key={c.city}
              city={c}
              index={i}
              total={cities.length}
              progress={scrollYProgress}
            />
          ))}
        </div>

        {/* Progress + city markers */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3 w-[min(420px,80vw)]">
          <div className="relative h-[2px] w-full bg-border/40">
            <motion.div
              className="absolute inset-y-0 left-0 bg-primary"
              style={{ width: progressWidth }}
            />
          </div>
          <div className="flex items-center justify-between w-full">
            {cities.map((c) => (
              <span
                key={c.city}
                className="font-heading text-[10px] text-foreground/50 tracking-wider"
              >
                {c.city}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CitiesJourney;
