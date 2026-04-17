import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsBar from "@/components/StatsBar";
import CaseStudyTiles from "@/components/CaseStudyTiles";
import TestimonialTicker from "@/components/TestimonialTicker";
import PhilosophySection from "@/components/PhilosophySection";

import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";
import ParallaxDoodles from "@/components/ParallaxDoodles";

const Index = () => {
  return (
    <LoadingScreen>
      <div className="noise-overlay min-h-screen bg-background relative">
        <ParallaxDoodles />
        <div className="relative z-10">
          <Navbar />
          <HeroSection />
          <StatsBar />
          <CaseStudyTiles />
          <TestimonialTicker />
          <PhilosophySection />
          <Footer />
        </div>
      </div>
    </LoadingScreen>
  );
};

export default Index;
