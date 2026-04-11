import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsBar from "@/components/StatsBar";
import CaseStudyTiles from "@/components/CaseStudyTiles";
import TestimonialTicker from "@/components/TestimonialTicker";
import PhotographyGrid from "@/components/PhotographyGrid";
import PhilosophySection from "@/components/PhilosophySection";
import AboutMeSection from "@/components/AboutMeSection";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";

const Index = () => {
  return (
    <LoadingScreen>
      <div className="noise-overlay min-h-screen bg-background">
        <Navbar />
        <HeroSection />
        <StatsBar />
        <CaseStudyTiles />
        <TestimonialTicker />
        <PhotographyGrid />
        <PhilosophySection />
        <AboutMeSection />
        <Footer />
      </div>
    </LoadingScreen>
  );
};

export default Index;
