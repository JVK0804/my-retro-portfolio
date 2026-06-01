import { useCallback, useState } from "react";
import LazyVideo from "@/components/LazyVideo";
import { cn } from "@/lib/utils";

type PrototypeMediaProps = {
  src: string;
  label: string;
  /** Hint before metadata loads — avoids layout jump for known assets */
  orientation?: "portrait" | "landscape";
  className?: string;
};

const PrototypeMedia = ({ src, label, orientation: orientationHint, className }: PrototypeMediaProps) => {
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);

  const onLoadedMetadata = useCallback((e: React.SyntheticEvent<HTMLVideoElement>) => {
    const v = e.currentTarget;
    if (v.videoWidth && v.videoHeight) {
      setSize({ w: v.videoWidth, h: v.videoHeight });
    }
  }, []);

  const landscape =
    size !== null ? size.w > size.h : orientationHint === "landscape";
  const portrait =
    size !== null ? size.h >= size.w : orientationHint !== "landscape";

  const aspectRatio = size ? `${size.w} / ${size.h}` : landscape ? "16 / 9" : "9 / 19.5";

  return (
    <div
      className={cn(
        "glass-card glass-card--media w-full shrink-0 p-2",
        landscape ? "max-w-3xl" : "max-w-[min(100%,340px)]",
        className,
      )}
    >
      <div
        className={cn(
          "case-study-media-frame w-full overflow-hidden rounded-[1.1rem] border border-border/60 bg-muted/20",
          landscape && "case-study-media-frame--landscape",
          portrait && "case-study-media-frame--portrait",
        )}
        style={{ aspectRatio }}
      >
        <LazyVideo src={src} label={label} onLoadedMetadata={onLoadedMetadata} />
      </div>
    </div>
  );
};

export default PrototypeMedia;
