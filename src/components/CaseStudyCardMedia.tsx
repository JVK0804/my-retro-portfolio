import { useCallback, useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { cn } from "@/lib/utils";

type CaseStudyCardMediaProps = {
  src: string;
  alt: string;
  mediaType: "video" | "image";
  priority?: boolean;
  className?: string;
};

/** Full-width stack thumbnail — preserves aspect ratio, no crop. */
const CaseStudyCardMedia = ({
  src,
  alt,
  mediaType,
  priority,
  className,
}: CaseStudyCardMediaProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "240px 0px", amount: 0.01 });
  const [aspectRatio, setAspectRatio] = useState<string | null>(null);

  const onLoadedMetadata = useCallback((e: React.SyntheticEvent<HTMLVideoElement>) => {
    const v = e.currentTarget;
    if (v.videoWidth && v.videoHeight) {
      setAspectRatio(`${v.videoWidth} / ${v.videoHeight}`);
    }
  }, []);

  const onImageLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    if (img.naturalWidth && img.naturalHeight) {
      setAspectRatio(`${img.naturalWidth} / ${img.naturalHeight}`);
    }
  }, []);

  useEffect(() => {
    if (mediaType !== "video" || !inView) return;
    const el = ref.current?.querySelector("video");
    if (!el) return;
    const playPromise = el.play();
    if (playPromise) playPromise.catch(() => {});
  }, [inView, mediaType]);

  const frameStyle = aspectRatio ? { aspectRatio } : undefined;

  if (mediaType === "video") {
    return (
      <div
        ref={ref}
        className={cn(
          "relative w-full overflow-hidden rounded-[1.1rem] border border-border/50 bg-muted/15",
          !aspectRatio && "aspect-video",
          className,
        )}
        style={frameStyle}
      >
        <video
          src={src}
          aria-label={alt}
          muted
          playsInline
          loop
          preload={priority ? "metadata" : "none"}
          autoPlay={inView}
          onLoadedMetadata={onLoadedMetadata}
          className="block h-full w-full object-contain object-center"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-[1.1rem] border border-border/50 bg-muted/15",
        !aspectRatio && "aspect-[4/3]",
        className,
      )}
      style={frameStyle}
    >
      <img
        src={src}
        alt={alt}
        loading="eager"
        fetchPriority={priority ? "high" : "low"}
        decoding="async"
        onLoad={onImageLoad}
        className="block h-full w-full object-contain object-center"
      />
    </div>
  );
};

export default CaseStudyCardMedia;
