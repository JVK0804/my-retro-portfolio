import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="noise-overlay relative min-h-screen bg-background text-foreground">
      <div className="relative z-10">
        <div className="flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center px-6 pt-28 pb-16">
          <div className="glass-card max-w-md px-10 py-12 text-center">
            <p className="type-label mb-2">
              Error
            </p>
            <h1 className="type-h2 mb-4">404</h1>
            <p className="type-body mb-8">That page does not exist.</p>
            <a
              href="/"
              className="retro-btn retro-btn--primary"
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
