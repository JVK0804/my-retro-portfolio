import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type CaseStudyViewportProps = {
  id: string;
  children: ReactNode;
  variant?: "default" | "emphasis" | "quote";
  className?: string;
  innerClassName?: string;
};

const CaseStudyViewport = ({
  id,
  children,
  variant = "default",
  className,
  innerClassName,
}: CaseStudyViewportProps) => (
  <section
    id={id}
    className={cn(
      "case-study-viewport relative flex min-h-[100dvh] flex-col justify-center px-6 py-28 md:py-32",
      variant === "emphasis" && "bg-muted/30 border-y border-border/60",
      variant === "quote" && "bg-background",
      className,
    )}
  >
    <div className={cn("mx-auto w-full max-w-6xl", innerClassName)}>{children}</div>
  </section>
);

export default CaseStudyViewport;
