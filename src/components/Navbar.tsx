import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import SoundToggle from "./SoundToggle";
import { useSound } from "@/contexts/SoundContext";

const navItems = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/about" },
  { label: "Photography", href: "/photography" },
  { label: "Resume", href: "https://drive.google.com/file/d/1b7kSeKXclG8XpTwW15Q86AWGVHVum8ME/view?usp=sharing", external: true },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { play } = useSound();

  const handleHashNav = (e: React.MouseEvent, href: string) => {
    const [path, hash] = href.split("#");
    if (hash) {
      e.preventDefault();
      if (location.pathname === (path || "/")) {
        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate(path || "/");
        setTimeout(() => {
          document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
        }, 300);
      }
      setMobileOpen(false);
    }
  };

  const isHashLink = (href: string) => href.includes("#");

  const renderNavItem = (item: typeof navItems[0], mobile = false) => {
    const baseClass = mobile
      ? "font-heading text-xs tracking-widest uppercase text-muted-foreground"
      : `font-heading text-xs tracking-widest uppercase transition-colors ${
          location.pathname === item.href ? "text-primary" : "text-muted-foreground hover:text-primary"
        }`;

    if (item.external) {
      return (
        <a
          key={item.label}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => { play("click"); if (mobile) setMobileOpen(false); }}
          onMouseEnter={() => !mobile && play("hover")}
          className={baseClass}
        >
          {item.label}
        </a>
      );
    }

    if (isHashLink(item.href)) {
      return (
        <a
          key={item.label}
          href={item.href}
          onClick={(e) => { play("click"); handleHashNav(e, item.href); }}
          onMouseEnter={() => !mobile && play("hover")}
          className={baseClass}
        >
          {item.label}
        </a>
      );
    }

    return (
      <Link
        key={item.label}
        to={item.href}
        onClick={() => { play("click"); setMobileOpen(false); }}
        onMouseEnter={() => !mobile && play("hover")}
        className={baseClass}
      >
        {item.label}
      </Link>
    );
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="relative px-6 py-5">
        <div className="navbar-bar glass-card mx-auto flex max-w-6xl items-center justify-between px-8 py-4">
        <Link to="/" className="heading-font text-base font-bold tracking-[0.25em] uppercase text-foreground">
          JVK
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-10">
          {navItems.map((item) => renderNavItem(item))}
          <SoundToggle />
          <ThemeToggle />
        </div>

        {/* Mobile toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <SoundToggle />
          <ThemeToggle />
          <button
            className="text-foreground p-1"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="navbar-bar glass-card relative mx-6 mt-2 flex max-w-6xl flex-col gap-5 px-8 py-5 md:hidden"
          >
            {navItems.map((item) => renderNavItem(item, true))}
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
