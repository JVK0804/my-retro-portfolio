import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";

type CaseStudyCardMediaProps = {
  src: string;
  alt: string;
  mediaType: "video" | "image";
  priority?: boolean;
};

/** Card thumbnail: eager images; video decodes only when near the viewport. */
const CaseStudyCardMedia = ({ src, alt, mediaType, priority }: CaseStudyCardMediaProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "240px 0px", amount: 0.01 });

  useEffect(() => {
    if (mediaType !== "video" || !inView) return;
    const el = ref.current?.querySelector("video");
    if (!el) return;
    const playPromise = el.play();
    if (playPromise) playPromise.catch(() => {});
  }, [inView, mediaType]);

  if (mediaType === "video") {
    return (
      <div ref={ref} className="relative overflow-hidden">
        <video
          src={src}
          aria-label={alt}
          muted
          playsInline
          loop
          preload={priority ? "metadata" : "none"}
          autoPlay={inView}
          className="block w-full h-auto"
        />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="eager"
      fetchPriority={priority ? "high" : "low"}
      decoding="async"
      className="block w-full h-auto"
    />
  );
};

export default CaseStudyCardMedia;
