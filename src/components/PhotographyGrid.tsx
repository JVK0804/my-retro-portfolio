import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type PhotoTile = {
  src: string;
  className: string;
  alt: string;
  fit?: "cover" | "contain";
  objectPosition?: string;
  backdrop?: string;
};

const photos: PhotoTile[] = [
  {
    src: "https://framerusercontent.com/images/VrEzabwFYTe5VrZjOX8UAqkOk.jpeg?scale-down-to=1024&width=1024&height=1280",
    className: "col-span-2 row-span-2 md:col-span-2 md:row-span-2",
    alt: "Portrait photography",
  },
  {
    src: "https://framerusercontent.com/images/vJ9WWmXY09LMBLnX6xsqYikGqI.webp?scale-down-to=1024&width=3051&height=2228",
    className: "col-span-2 md:col-span-2 md:col-start-3",
    alt: "Landscape photography",
  },
  {
    src: "https://framerusercontent.com/images/SCseKUFp4uNWNWO4romGiyoIgOM.webp?scale-down-to=1024&width=1280&height=853",
    className: "col-span-1 md:col-span-2 md:col-start-3 md:row-start-2",
    alt: "Street photography",
  },
  {
    src: "https://framerusercontent.com/images/vRglLWhe85zcLmw1ZjBVziFN4.webp?width=1280&height=853",
    className: "col-span-2 md:col-span-2 md:col-start-1 md:row-start-3",
    alt: "Sunset silhouette with a figure on the skyline",
    fit: "contain",
    objectPosition: "center bottom",
    backdrop: "bg-[#9a3d28]",
  },
  {
    src: "https://framerusercontent.com/images/DqaSE2Ytzpm2Lm6BZiu8YI2w7as.webp?width=1280&height=853",
    className: "col-span-1 md:col-span-1 md:col-start-3 md:row-start-3",
    alt: "Landscape photography",
  },
  {
    src: "https://framerusercontent.com/images/dfuskamJj3Bh7uBlSpkHuxTUbkk.webp?width=1591&height=1591",
    className: "col-span-1 md:col-span-1 md:col-start-4 md:row-start-3",
    alt: "Square composition photography",
  },
];

const PhotographyGrid = () => {
  return (
    <section id="photography" className="pb-24">
      <div
        className={cn(
          "grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4",
          "auto-rows-[minmax(10rem,1fr)] md:min-h-[36rem] md:grid-rows-3 md:auto-rows-fr",
        )}
      >
        {photos.map(({ src, className, alt, fit = "cover", objectPosition, backdrop }, i) => {
          const isContain = fit === "contain";

          return (
            <motion.figure
              key={src}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                "relative m-0 min-h-[11rem] overflow-hidden border-2 border-border",
                backdrop ?? "bg-muted/10",
                isContain && "flex items-end justify-center",
                className,
              )}
              style={{ borderRadius: "var(--radius)" }}
            >
              <img
                src={src}
                alt={alt}
                className={cn(
                  isContain
                    ? "max-h-full w-full object-contain"
                    : "absolute inset-0 size-full object-cover",
                )}
                style={objectPosition ? { objectPosition } : undefined}
                loading="lazy"
                decoding="async"
              />
            </motion.figure>
          );
        })}
      </div>
    </section>
  );
};

export default PhotographyGrid;
