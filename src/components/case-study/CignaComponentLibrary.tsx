import { motion } from "framer-motion";
import CignaDesignSystemCollage from "@/components/case-study/CignaDesignSystemCollage";
import CignaComponentCategories from "@/components/case-study/CignaComponentCategories";

type CignaComponentLibraryProps = {
  onTabClick?: () => void;
  onTabHover?: () => void;
};

const CignaComponentLibrary = ({ onTabClick, onTabHover }: CignaComponentLibraryProps) => (
  <div className="min-w-0">
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6 }}
      className="glass-card overflow-hidden p-4 md:p-6 mb-14 md:mb-16 border border-border/50"
    >
      <CignaDesignSystemCollage />
    </motion.div>

    <div className="border-t border-border/40 pt-14 md:pt-16">
      <CignaComponentCategories onTabClick={onTabClick} onTabHover={onTabHover} />
    </div>
  </div>
);

export default CignaComponentLibrary;
