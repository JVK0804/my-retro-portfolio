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
  text?: string;
  paragraphs?: string[];
};

const renderEmphasis = (text: string) =>
  text.split(/(\*[^*]+\*)/g).map((part, i) =>
    part.startsWith("*") && part.endsWith("*") ? (
      <em key={i}>{part.slice(1, -1)}</em>
    ) : (
      part
    ),
  );

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
    paragraphs: [
      "I grew up in Visakhapatnam on the Bay of Bengal, where curiosity shaped how I see the world. I started my career in frontend development, but I was drawn to a different question: not *how* interfaces were built, but *why* they were designed that way. That curiosity led me from building screens to designing products.",
      "Photography sharpened my eye for composition and detail, while product design gave me a way to turn those observations into meaningful experiences. Today in the Bay Area, I design B2B SaaS products, AI experiences, and design systems—and still enjoy bringing ideas to life through code.",
    ],
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
      className={`flex aspect-[3/2] w-full max-w-md items-center justify-center rounded-xl border border-dashed border-border/70 bg-muted/20 px-6 text-center ${className ?? ""}`}
      aria-label={`${city.city} landmark illustration placeholder`}
    >
      <div>
        <p className="font-heading text-[10px] tracking-[0.3em] uppercase text-primary mb-2">
          Bay Area
        </p>
        <p className="mono-heading text-2xl font-bold text-foreground/80">{city.city}</p>
        <p className="font-body text-xs text-muted-foreground mt-2">Illustration coming soon</p>
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
      {/* Mobile — blurred landmark behind copy */}
      {city.landmark ? (
        <div
          className="pointer-events-none absolute inset-x-0 bottom-24 top-32 z-0 flex items-center justify-center px-4 md:hidden"
          aria-hidden="true"
        >
          <LandmarkArt city={city} className="landmark-illustration landmark-illustration--mobile-bg" />
        </div>
      ) : null}

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pt-24 pb-52 md:pb-36 md:py-0 grid md:grid-cols-2 gap-6 md:gap-8 items-center min-h-full md:min-h-0">
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-3">
            <MapPin size={14} className="text-primary shrink-0" />
            <p className="font-heading text-[10px] sm:text-[11px] text-primary tracking-widest uppercase">
              {city.era} · {city.years}
            </p>
          </div>
          <h3 className="mono-heading text-3xl sm:text-4xl md:text-6xl font-bold text-foreground mb-2 leading-tight">
            {city.city}
          </h3>
          <p className="font-body text-[10px] sm:text-xs text-muted-foreground tracking-wider uppercase mb-5 md:mb-6">
            {city.region}
          </p>
          <div className="space-y-4 max-w-md">
            {city.paragraphs ? (
              city.paragraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 32)}
                  className="font-body text-sm sm:text-base md:text-lg text-foreground/80 leading-relaxed"
                >
                  {renderEmphasis(paragraph)}
                </p>
              ))
            ) : (
              <p className="font-body text-sm sm:text-base md:text-lg text-foreground/80 leading-relaxed">
                {city.text}
              </p>
            )}
          </div>
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
      <div className="sticky top-[5.5rem] h-[calc(100svh-5.5rem)] w-full overflow-hidden">
        <div className="absolute top-4 md:top-8 inset-x-0 z-20 px-6 pointer-events-none">
          <p className="font-heading text-[10px] md:text-[11px] text-primary tracking-widest uppercase text-center">
            Where I&apos;m From
          </p>
          <p className="hidden sm:block font-body text-xs text-foreground/60 mt-1 text-center">
            Visakhapatnam · Hyderabad · Bloomington · San Francisco
          </p>
        </div>

        <div className="relative h-full w-full">
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

        <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3 w-[min(480px,92vw)] px-2">
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
                className="font-heading text-[8px] sm:text-[10px] text-foreground/50 tracking-wider text-center truncate"
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
