import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SoundProvider } from "@/contexts/SoundContext";
import Index from "./pages/Index.tsx";
import About from "./pages/About.tsx";
import Photography from "./pages/Photography.tsx";
import SlackCaseStudy from "./pages/SlackCaseStudy.tsx";
import SmartAlignCaseStudy from "./pages/SmartAlignCaseStudy.tsx";
import CignaCaseStudy from "./pages/CignaCaseStudy.tsx";
import NotFound from "./pages/NotFound.tsx";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <SoundProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/photography" element={<Photography />} />
            <Route path="/work/slack" element={<SlackCaseStudy />} />
            <Route path="/work/smartalign" element={<SmartAlignCaseStudy />} />
            <Route path="/work/cigna" element={<CignaCaseStudy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </SoundProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
