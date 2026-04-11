import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsBar from "@/components/StatsBar";
import CaseStudyTiles from "@/components/CaseStudyTiles";
import TestimonialTicker from "@/components/TestimonialTicker";
import PhotographyGrid from "@/components/PhotographyGrid";
import PhilosophySection from "@/components/PhilosophySection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="noise-overlay min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <StatsBar />
      <CaseStudyTiles />
      <TestimonialTicker />
      <PhotographyGrid />
      <PhilosophySection />
      <Footer />
    </div>
  );
};

export default Index;
