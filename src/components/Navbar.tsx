import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/about" },
  { label: "Photography", href: "/#photography" },
  { label: "Resume", href: "https://drive.google.com/file/d/1GpKL7lSGkl9zEBl2DNvDwdw2U2NPDKrX/view", external: true },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-3rem)] max-w-3xl">
      <div className="glass-card px-6 py-3 flex items-center justify-between">
        <Link to="/" className="font-mono text-lg font-bold tracking-tight text-foreground">
          JVK
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) =>
            item.external ? (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.label}
                to={item.href}
                className={`font-body text-sm transition-colors ${
                  location.pathname === item.href ? "text-primary" : "text-muted-foreground hover:text-primary"
                }`}
              >
                {item.label}
              </Link>
            )
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="glass-card mt-2 px-6 py-4 flex flex-col gap-4 md:hidden"
          >
            {navItems.map((item) =>
              item.external ? (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-sm text-muted-foreground"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.label}
                  to={item.href}
                  className="font-body text-sm text-muted-foreground"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              )
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
