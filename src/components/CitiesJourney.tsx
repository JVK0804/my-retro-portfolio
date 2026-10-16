import { useRef } from "react";
import { motion, useTransform, type MotionValue } from "framer-motion";
import { MapPin } from "lucide-react";
import { useSegmentOpacity, useSegmentY, useStickySectionProgress } from "@/lib/scroll-segment-motion";
import vizag from "@/assets/landmark-visakhapatnam.png";
import hyderabad from "@/assets/landmark-hyderabad.png";
import bloomington from "@/assets/landmark-bloomington.png";
import sfBridge from "@/assets/SF Bridge PNG.png";

type City = {
  era: string;
  city: string;
  shortName: string;
  region: string;
  years: string;
  landmark?: string;
  text: string;
};

const cities: City[] = [
  {
    era: "Roots",
    city: "Visakhapatnam",
    shortName: "Vizag",
    region: "Andhra Pradesh, India",
    years: "Where it began",
    landmark: vizag,
    text: "Born by the Bay of Bengal and raised under the watchful gaze of Dolphin's Nose hill, I grew up in a place where natural beauty and secure tech sit side by side. The salt air and the slow lighthouse blink taught me early that craft and engineering can share the same coastline.",
  },
  {
    era: "First career",
    city: "Hyderabad",
    shortName: "Hyderabad",
    region: "Telangana, India",
    years: "First job, first love",
    landmark: hyderabad,
    text: "Charminar, biryani, and a city that evolves at terabytes-per-second. Hyderabad gave me my first design role and the chaotic creative pulse of HiTech City, where Mughal arches meet GPU clusters, and I fell in love with building for scale.",
  },
  {
    era: "Third home",
    city: "Bloomington",
    shortName: "Bloomington",
    region: "Indiana, USA",
    years: "Discovered, third home",
    landmark: bloomington,
    text: "Walked through the Sample Gates and walked out a sharper designer. Indiana University gave me the language of HCI, the rigor of research, and a quieter midwestern winter to upgrade everything I thought I knew about design.",
  },
  {
    era: "Now",
    city: "San Francisco",
    shortName: "SF",
    region: "California, USA",
    years: "Bay Area",
    landmark: sfBridge,
    text: "Bloomington pointed me west. In the Bay Area I design B2B SaaS, AI products, and design systems, and I still ship them in React.",
  },
];

const LandmarkArt = ({ city, className }: { city: City; className?: string }) => {
  if (city.landmark) {
    return (
      <img
        src={city.landmark}
        alt={`${city.city} landmark`}
        width={1536}
        height={1024}
        loading="lazy"
        className={className}
      />
    );
  }

  return (
    <div
      className={`flex aspect-[3/2] w-full max-w-md items-center justify-center rounded-none border border-dashed border-border/70 bg-muted/20 px-6 text-center ${className ?? ""}`}
      aria-label={`${city.city} landmark illustration placeholder`}
    >
      <div>
        <p className="type-eyebrow mb-2">
          Bay Area
        </p>
        <p className="type-h3">{city.city}</p>
        <p className="type-caption mt-2">Illustration coming soon</p>
      </div>
    </div>
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
  const opacity = useSegmentOpacity(progress, index, total);
  const y = useSegmentY(progress, index, total);

  return (
    <motion.div
      className="absolute inset-0 flex items-start md:items-center"
      style={{ opacity, y, zIndex: index }}
    >
      {city.landmark ? (
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] flex h-[min(34svh,280px)] items-end justify-center px-3 md:hidden"
          aria-hidden="true"
        >
          <LandmarkArt city={city} className="landmark-illustration--mobile-bg" />
        </div>
      ) : null}

      <div className="relative z-[2] mx-auto grid w-full max-w-7xl items-center gap-8 px-6 pb-[min(34svh,280px)] pt-4 md:grid-cols-2 md:px-12 md:py-8">
        <div className="city-text-inner min-w-0">
          <div className="flex items-center gap-2 mb-3">
            <MapPin size={14} className="text-primary shrink-0" />
            <p className="type-eyebrow">
              {city.era} · {city.years}
            </p>
          </div>
          <h3 className="type-display mb-2 max-w-full">
            {city.city}
          </h3>
          <p className="type-label mb-5 md:mb-6">
            {city.region}
          </p>
          <p className="type-lead max-w-md">
            {city.text}
          </p>
        </div>

        <div className="hidden md:flex relative items-center justify-center min-h-[520px]">
          <LandmarkArt city={city} className="landmark-illustration" />
        </div>
      </div>
    </motion.div>
  );
};

const CitiesJourney = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const journeyProgress = useStickySectionProgress(containerRef);

  const progressWidth = useTransform(journeyProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ height: `${cities.length * 100}vh` }}
      aria-label="Places I've called home"
    >
      <div className="sticky top-[5.5rem] flex h-[calc(100svh-5.5rem)] w-full flex-col overflow-hidden">
        <div className="shrink-0 px-6 pt-4 text-center md:pt-6">
          <p className="type-eyebrow">
            Where I&apos;m From
          </p>
          <p className="type-caption mt-1 hidden sm:block">
            Visakhapatnam · Hyderabad · Bloomington · San Francisco
          </p>
        </div>

        <div className="relative min-h-0 flex-1">
          {cities.map((c, i) => (
            <CityPanel
              key={c.city}
              city={c}
              index={i}
              total={cities.length}
              progress={journeyProgress}
            />
          ))}
        </div>

        <div className="z-20 mx-auto flex w-[min(480px,92vw)] shrink-0 flex-col items-center gap-3 px-2 pb-6 md:pb-8">
          <div className="relative h-[2px] w-full bg-border/40">
            <motion.div
              className="absolute inset-y-0 left-0 bg-primary"
              style={{ width: progressWidth }}
            />
          </div>
          <div className="grid grid-cols-4 gap-1 w-full">
            {cities.map((c) => (
              <span
                key={c.city}
                className="type-label text-[9px] sm:text-[11px] text-center truncate"
                title={c.city}
              >
                <span className="sm:hidden">{c.shortName}</span>
                <span className="hidden sm:inline">{c.city}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CitiesJourney;
