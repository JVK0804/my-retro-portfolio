import { useEffect, useRef, useState } from "react";

type LazyVideoProps = {
  src: string;
  label: string;
  className?: string;
  onLoadedMetadata?: (e: React.SyntheticEvent<HTMLVideoElement>) => void;
};

/**
 * Plays video only while in view — avoids decoding multiple loops off-screen.
 */
const LazyVideo = ({ src, label, className, onLoadedMetadata }: LazyVideoProps) => {
  const ref = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "120px 0px", threshold: 0.15 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (inView) {
      const playPromise = el.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    } else {
      el.pause();
    }
  }, [inView]);

  return (
    <video
      ref={ref}
      src={src}
      className={className}
      loop
      muted
      playsInline
      preload="metadata"
      aria-label={label}
      onLoadedMetadata={onLoadedMetadata}
    />
  );
};

export default LazyVideo;
