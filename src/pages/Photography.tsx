import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PhotographyGrid from "@/components/PhotographyGrid";
import { motion } from "framer-motion";

const Photography = () => {
  return (
    <div className="noise-overlay min-h-screen bg-background">
      <Navbar />
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="font-heading text-xs text-primary mb-4 tracking-widest uppercase"
          >
            Through the Lens
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mono-heading text-4xl md:text-6xl font-bold text-foreground mb-6"
          >
            Photography
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="font-body text-foreground/70 text-lg max-w-xl leading-relaxed"
          >
            Photography grounds my design work. Framing a shot teaches composition, light teaches contrast, and street photography teaches empathy.
          </motion.p>
        </div>
      </section>
      <PhotographyGrid />
      <Footer />
    </div>
  );
};

export default Photography;
