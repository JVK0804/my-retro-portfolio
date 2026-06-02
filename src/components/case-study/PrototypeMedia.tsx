import { useCallback, useState } from "react";
import LazyVideo from "@/components/LazyVideo";
import { cn } from "@/lib/utils";

type PrototypeMediaProps = {
  src: string;
  label: string;
  /** Hint before metadata loads — avoids layout jump for known assets */
  orientation?: "portrait" | "landscape";
  /** Multiplier for max display width (e.g. 1.25 = 25% larger) */
  sizeScale?: number;
  /** Same fixed frame for every clip (filled with object-cover) */
  uniform?: boolean;
  className?: string;
};

/** Base frame height at sizeScale 1 — Slack features use ~2.81× for display size */
const UNIFORM_FRAME_HEIGHT_PX = 280;

const PrototypeMedia = ({
  src,
  label,
  orientation: orientationHint,
  sizeScale = 1,
  uniform = false,
  className,
}: PrototypeMediaProps) => {
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);

  const onLoadedMetadata = useCallback((e: React.SyntheticEvent<HTMLVideoElement>) => {
    const v = e.currentTarget;
    if (v.videoWidth && v.videoHeight) {
      setSize({ w: v.videoWidth, h: v.videoHeight });
    }
  }, []);

  if (uniform) {
    const frameHeightPx = Math.round(UNIFORM_FRAME_HEIGHT_PX * sizeScale);

    return (
      <div className={cn("glass-card glass-card--media w-full max-w-full shrink-0 p-1", className)}>
        <div
          className="case-study-media-frame case-study-media-frame--uniform relative w-full overflow-hidden rounded-[1.1rem] border border-border/60 bg-muted/20"
          style={{
            height: `clamp(16rem, 50vw, ${frameHeightPx}px)`,
            width: "100%",
          }}
        >
          <LazyVideo
            src={src}
            label={label}
            className="absolute inset-0 h-full w-full object-cover object-center"
            onLoadedMetadata={onLoadedMetadata}
          />
        </div>
      </div>
    );
  }

  const landscape =
    size !== null ? size.w > size.h : orientationHint === "landscape";
  const portrait =
    size !== null ? size.h >= size.w : orientationHint !== "landscape";

  const aspectRatio = size ? `${size.w} / ${size.h}` : landscape ? "16 / 9" : "9 / 19.5";
  const landscapeMaxRem = 48 * sizeScale;
  const portraitMaxPx = 340 * sizeScale;
  const frameLandscapeMaxRem = 42 * sizeScale;

  return (
    <div
      className={cn("glass-card glass-card--media w-full shrink-0 p-2", className)}
      style={{
        maxWidth: landscape ? `min(100%, ${landscapeMaxRem}rem)` : `min(100%, ${portraitMaxPx}px)`,
      }}
    >
      <div
        className={cn(
          "case-study-media-frame w-full overflow-hidden rounded-[1.1rem] border border-border/60 bg-muted/20",
          landscape && "case-study-media-frame--landscape",
          portrait && "case-study-media-frame--portrait",
        )}
        style={{
          aspectRatio,
          ...(landscape ? { maxWidth: `min(100%, ${frameLandscapeMaxRem}rem)` } : undefined),
        }}
      >
        <LazyVideo src={src} label={label} onLoadedMetadata={onLoadedMetadata} />
      </div>
    </div>
  );
};

export default PrototypeMedia;
