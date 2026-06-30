import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type CaseStudyShellProps = {
  children: ReactNode;
  className?: string;
};

/** Page root — matches navbar `max-w-6xl` column; side nav stays fixed outside flow. */
export const CaseStudyShell = ({ children, className }: CaseStudyShellProps) => (
  <div
    className={cn(
      "noise-overlay case-study-page min-h-screen overflow-x-clip bg-background text-foreground",
      className,
    )}
  >
    {children}
  </div>
);

type CaseStudyContentProps = {
  children: ReactNode;
  className?: string;
};

/** Inner column aligned with the navbar glass card. */
export const CaseStudyContent = ({ children, className }: CaseStudyContentProps) => (
  <div className={cn("mx-auto w-full min-w-0 max-w-6xl px-6", className)}>{children}</div>
);

type CaseStudySectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  bordered?: boolean;
};

export const CaseStudySection = ({
  id,
  children,
  className,
  contentClassName,
  bordered = true,
}: CaseStudySectionProps) => (
  <section
    id={id}
    className={cn(
      "case-study-section scroll-mt-28 py-24",
      bordered && "border-t border-border/40",
      className,
    )}
  >
    <CaseStudyContent className={contentClassName}>{children}</CaseStudyContent>
  </section>
);

export default CaseStudyShell;
