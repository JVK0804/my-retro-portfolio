import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="noise-overlay relative min-h-screen bg-background text-foreground">
      <div className="relative z-10">
        <Navbar />
        <div className="flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center px-6 pt-28 pb-16">
          <div className="glass-card max-w-md px-10 py-12 text-center">
            <p className="font-mono-space mb-2 text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
              Error
            </p>
            <h1 className="mono-heading mb-4 text-5xl font-bold">404</h1>
            <p className="font-body mb-8 text-muted-foreground">That page does not exist.</p>
            <a
              href="/"
              className="inline-block rounded-[var(--radius-md)] bg-primary px-6 py-3 font-heading text-[10px] font-bold uppercase tracking-widest text-primary-foreground transition-opacity hover:opacity-90"
            >
              Return home
            </a>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default NotFound;
