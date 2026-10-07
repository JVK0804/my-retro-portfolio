import { useState, type MouseEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import ThemeToggle from "@/components/ThemeToggle";
import { useSound } from "@/contexts/SoundContext";

const navItems = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/about" },
  { label: "Photography", href: "/photography" },
  { label: "Resume", href: "/resume.pdf", external: true },
];

const CornerMarks = () => (
  <>
    <span className="absolute -left-1 -top-1 size-2 bg-foreground" />
    <span className="absolute -right-1 -top-1 size-2 bg-foreground" />
    <span className="absolute -bottom-1 -left-1 size-2 bg-foreground" />
    <span className="absolute -right-1 -bottom-1 size-2 bg-foreground" />
  </>
);

const MenuGlyph = ({ open }: { open: boolean }) => (
  <svg
    viewBox="0 0 24 24"
    className={`size-5 origin-center [transform-box:fill-box] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${open ? "rotate-0" : "-rotate-45"}`}
    aria-hidden="true"
  >
    <path
      d="M6 6 L18 18 M18 6 L6 18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    />
  </svg>
);

const HeroHud = () => {
  const [open, setOpen] = useState(false);
  const { play } = useSound();
  const location = useLocation();
  const navigate = useNavigate();

  const handleHashNav = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    const [path, hash] = href.split("#");
    if (!hash) return;
    event.preventDefault();
    setOpen(false);
    if (location.pathname === (path || "/")) {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    navigate(path || "/");
    window.setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  return (
    <>
      <div className="fixed left-4 top-4 z-[61] sm:left-6 sm:top-6">
        <button
          type="button"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => {
            play("click");
            setOpen((value) => !value);
          }}
          className="relative flex size-12 items-center justify-center border border-foreground/70 bg-background text-foreground"
        >
          <CornerMarks />
          <MenuGlyph open={open} />
        </button>

        <AnimatePresence>
          {open && (
            <motion.nav
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              aria-label="Site"
              className="relative mt-3 w-56 border border-foreground/25 bg-background/95 p-5 backdrop-blur-md"
            >
              <CornerMarks />
              <ul className="flex flex-col gap-3">
                {navItems.map((item) => (
                  <li key={item.label}>
                    {item.external ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => {
                          play("click");
                          setOpen(false);
                        }}
                        className="type-label text-foreground/80 hover:text-primary"
                      >
                        {item.label}
                      </a>
                    ) : item.href.includes("#") ? (
                      <a
                        href={item.href}
                        onClick={(event) => {
                          play("click");
                          handleHashNav(event, item.href);
                        }}
                        className="type-label text-foreground/80 hover:text-primary"
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link
                        to={item.href}
                        onClick={() => {
                          play("click");
                          setOpen(false);
                        }}
                        className="type-label text-foreground/80 hover:text-primary"
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-col gap-2 border-t border-foreground/15 pt-4">
                <a
                  href="#letsconnect"
                  onClick={(event) => {
                    event.preventDefault();
                    play("click");
                    setOpen(false);
                    document.getElementById("letsconnect")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="retro-btn retro-btn--outline w-full px-4"
                >
                  [ Let&apos;s Connect ]
                </a>
                <Link
                  to="/about"
                  onClick={() => {
                    play("whoosh");
                    setOpen(false);
                  }}
                  className="retro-btn retro-btn--primary w-full px-4"
                >
                  About me →
                </Link>
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-foreground/15 pt-3">
                <span className="type-label">
                  Theme
                </span>
                <ThemeToggle />
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>

    </>
  );
};

export default HeroHud;
