import { motion } from "framer-motion";

const photos = [
  "https://framerusercontent.com/images/VrEzabwFYTe5VrZjOX8UAqkOk.jpeg?scale-down-to=1024&width=1024&height=1280",
  "https://framerusercontent.com/images/vJ9WWmXY09LMBLnX6xsqYikGqI.webp?scale-down-to=1024&width=3051&height=2228",
  "https://framerusercontent.com/images/SCseKUFp4uNWNWO4romGiyoIgOM.webp?scale-down-to=1024&width=1280&height=853",
  "https://framerusercontent.com/images/vRglLWhe85zcLmw1ZjBVziFN4.webp?width=1280&height=853",
  "https://framerusercontent.com/images/DqaSE2Ytzpm2Lm6BZiu8YI2w7as.webp?width=1280&height=853",
  "https://framerusercontent.com/images/dfuskamJj3Bh7uBlSpkHuxTUbkk.webp?width=1591&height=1591",
];

const PhotographyGrid = () => {
  return (
    <section id="photography" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <p className="font-mono text-xs text-primary mb-3 tracking-widest uppercase">
            The Lens → The Interface
          </p>
          <h2 className="mono-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            Photography
          </h2>
          <p className="font-body text-muted-foreground max-w-lg">
            Street and landscape photography inform my UI layout decisions — composition, negative space, and visual hierarchy transfer directly from lens to screen.
          </p>
        </div>

        <div className="columns-2 md:columns-3 gap-4 space-y-4">
          {photos.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="break-inside-avoid"
            >
              <img
                src={src}
                alt={`Photography work ${i + 1}`}
                className="w-full rounded-lg object-cover"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PhotographyGrid;
