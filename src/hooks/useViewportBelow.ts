import { useEffect, useState } from "react";

/** CSS px width of a 13" MacBook — blur doodles below this. */
export const MACBOOK_13_MAX_WIDTH = 1279;

export const useViewportBelow = (maxWidth: number) => {
  const [below, setBelow] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth <= maxWidth;
  });

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${maxWidth}px)`);
    const update = () => setBelow(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [maxWidth]);

  return below;
};
