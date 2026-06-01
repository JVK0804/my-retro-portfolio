import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export type CaseStudyNavItem = {
  label: string;
  id: string;
};

type CaseStudySideNavProps = {
  items: CaseStudyNavItem[];
  onNavigate?: () => void;
};

const CaseStudySideNav = ({ items, onNavigate }: CaseStudySideNavProps) => {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-42% 0px -42% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav
      aria-label="Case study sections"
      className="fixed left-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-1 lg:left-8 xl:flex"
    >
      {items.map((item) => {
        const isActive = activeId === item.id;
        return (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={onNavigate}
            className={cn(
              "group flex items-center gap-2 py-1 pr-3 text-left transition-colors",
              isActive ? "text-primary" : "text-foreground/40 hover:text-foreground/70",
            )}
          >
            <span
              className={cn(
                "h-1.5 w-1.5 shrink-0 rounded-full transition-all",
                isActive ? "scale-125 bg-primary" : "bg-foreground/25 group-hover:bg-foreground/50",
              )}
              aria-hidden
            />
            <span
              className={cn(
                "font-body text-[10px] tracking-widest uppercase transition-opacity",
                isActive ? "opacity-100" : "opacity-0 group-hover:opacity-70",
              )}
            >
              {item.label}
            </span>
          </a>
        );
      })}
    </nav>
  );
};

export default CaseStudySideNav;
