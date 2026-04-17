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

/* Small portrait that floats in zigzag near the column gutter — never overlaps the landmark */
const FloatingPortrait = ({ progress }: { progress: MotionValue<number> }) => {
  const x = useTransform(
    progress,
    [0, 0.33, 0.66, 1],
    ["-8%", "8%", "-6%", "6%"]
  );
  const scale = useTransform(progress, [0, 1], [1, 0.6]);
  const rotate = useTransform(progress, [0, 0.33, 0.66, 1], [-5, 4, -3, 5]);
  const y = useTransform(progress, [0, 0.5, 1], [0, -8, 8]);

  return (
    <motion.div
      style={{ x, scale, rotate, y }}
      className="hidden lg:block absolute top-12 left-1/2 -translate-x-1/2 z-10 pointer-events-none"
    >
      <div className="relative w-[110px] aspect-[3/4] glass-card flex items-center justify-center bg-muted/40">
        <div className="text-center text-muted-foreground/70 p-2">
          <div className="w-8 h-8 mx-auto mb-1 rounded-full border-2 border-dashed border-foreground/30 flex items-center justify-center">
            <Camera size={14} className="text-foreground/50" />
          </div>
          <p className="font-heading text-[8px] tracking-widest uppercase">Kaushik</p>
        </div>
        <div className="absolute top-1 left-1 w-2 h-2 border-t-2 border-l-2 border-primary/50" />
        <div className="absolute top-1 right-1 w-2 h-2 border-t-2 border-r-2 border-primary/50" />
        <div className="absolute bottom-1 left-1 w-2 h-2 border-b-2 border-l-2 border-primary/50" />
        <div className="absolute bottom-1 right-1 w-2 h-2 border-b-2 border-r-2 border-primary/50" />
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
            className="mt-8 w-48 h-auto opacity-80 md:hidden"
          />
        </div>

        {/* Right column: landmark — visual crux of the section */}
        <div className="hidden md:flex relative items-center justify-center min-h-[420px]">
          <img
            src={city.landmark}
            alt={`${city.city} landmark illustration`}
            width={768}
            height={768}
            loading="lazy"
            className="w-full max-w-[300px] lg:max-w-sm h-auto opacity-80"
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
