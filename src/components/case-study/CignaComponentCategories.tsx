import { useCallback, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

type CategoryKey = "Color" | "Typography" | "Buttons" | "Forms" | "Spacing" | "Cards" | "Inputs";

const categories: CategoryKey[] = [
  "Color",
  "Typography",
  "Buttons",
  "Forms",
  "Spacing",
  "Cards",
  "Inputs",
];

const colorTokens = [
  { name: "Primary Blue", hex: "#0075C9", use: "CTA buttons, links" },
  { name: "Dark Blue", hex: "#004E87", use: "Hover state, logo" },
  { name: "Light Blue Tint", hex: "#E8F4FD", use: "Page background, info cards" },
  { name: "Success Green", hex: "#4CAF50", use: "Logo accent, success" },
  { name: "Error Red", hex: "#D32F2F", use: "Validation errors" },
  { name: "Error Background", hex: "#FFEBEE", use: "Error input highlight" },
  { name: "Text Primary", hex: "#333333", use: "Headings, body text" },
  { name: "Text Secondary", hex: "#666666", use: "Labels, helper text" },
  { name: "Border Gray", hex: "#E0E0E0", use: "Input borders, dividers" },
  { name: "Disabled Gray", hex: "#9E9E9E", use: "Disabled buttons" },
  { name: "Surface Gray", hex: "#F5F5F5", use: "Background sections" },
  { name: "White", hex: "#FFFFFF", use: "Card surfaces, inputs" },
];

const typographySamples = [
  {
    label: "Display / H1",
    spec: "32px · Bold · 1.2",
    usage: "Landing hero, plan selection page titles",
    sample: "Healthcare you can trust",
    style: { fontSize: 32, fontWeight: 700, lineHeight: 1.2, color: "#333333", letterSpacing: "-0.02em" },
  },
  {
    label: "Heading / H2",
    spec: "24px · Bold · 1.3",
    usage: "Section headers, dashboard module titles",
    sample: "Your benefits at a glance",
    style: { fontSize: 24, fontWeight: 700, lineHeight: 1.3, color: "#333333" },
  },
  {
    label: "Subheading / H3",
    spec: "18px · Semibold · 1.4",
    usage: "Card titles, form section labels",
    sample: "Plan summary",
    style: { fontSize: 18, fontWeight: 600, lineHeight: 1.4, color: "#333333" },
  },
  {
    label: "Body / Default",
    spec: "16px · Regular · 1.5",
    usage: "Paragraph copy, coverage explanations",
    sample: "Review your coverage details and next steps before enrolling.",
    style: { fontSize: 16, fontWeight: 400, lineHeight: 1.5, color: "#333333" },
  },
  {
    label: "Label / Form",
    spec: "14px · Medium · 1.4",
    usage: "Input labels, table column headers",
    sample: "Member ID",
    style: { fontSize: 14, fontWeight: 500, lineHeight: 1.4, color: "#666666" },
  },
  {
    label: "Caption / Helper",
    spec: "12px · Regular · 1.4",
    usage: "Helper text, footnotes, validation hints",
    sample: "Required field. Enter as it appears on your card.",
    style: { fontSize: 12, fontWeight: 400, lineHeight: 1.4, color: "#666666" },
  },
];

const spacingTokens = [
  { name: "xs", px: 4, usage: "Icon-to-label gaps, tight chip padding" },
  { name: "sm", px: 8, usage: "Compact form fields, inline button groups" },
  { name: "md", px: 16, usage: "Card interior padding, standard list spacing" },
  { name: "lg", px: 24, usage: "Dialog body padding, module separation" },
  { name: "xl", px: 32, usage: "Page section gutters, dashboard columns" },
  { name: "2xl", px: 48, usage: "Landing section breaks, hero vertical rhythm" },
];

type CignaComponentCategoriesProps = {
  onTabClick?: () => void;
  onTabHover?: () => void;
};

/** High-contrast white surface for Mednext UI demos on the portfolio background. */
const DemoCard = ({
  label,
  usage,
  children,
  className,
}: {
  label: string;
  usage?: string;
  children: ReactNode;
  className?: string;
}) => (
  <div
    className={cn(
      "rounded-lg border border-[#D0D0D0] bg-white p-5 md:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08)]",
      className,
    )}
  >
    <p className="font-body text-[10px] tracking-widest uppercase text-[#0075C9] mb-1">{label}</p>
    {usage ? (
      <p className="font-body text-[11px] text-[#666666] mb-4 leading-relaxed">
        Used for · {usage}
      </p>
    ) : (
      <div className="mb-4" />
    )}
    {children}
  </div>
);

const CategoryPanel = ({ category }: { category: CategoryKey }) => {
  switch (category) {
    case "Color":
      return (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {colorTokens.map((c) => (
            <div
              key={c.hex}
              className="rounded-lg border border-border/60 bg-white p-4 flex items-center gap-4 shadow-sm"
            >
              <div
                className="w-14 h-14 shrink-0 border-2 border-[#E0E0E0]"
                style={{ backgroundColor: c.hex, borderRadius: "2px" }}
              />
              <div className="min-w-0">
                <p className="font-body text-sm font-bold text-[#333333] truncate">{c.name}</p>
                <p className="font-body text-[11px] text-[#666666] uppercase tracking-wider">{c.hex}</p>
                <p className="font-body text-[11px] text-[#666666] mt-0.5">{c.use}</p>
              </div>
            </div>
          ))}
        </div>
      );

    case "Typography":
      return (
        <div className="grid md:grid-cols-2 gap-5">
          {typographySamples.map((t) => (
            <DemoCard key={t.label} label={t.label} usage={t.usage}>
              <p className="font-body text-[11px] text-[#666666] mb-3">{t.spec}</p>
              <p className="font-body" style={t.style}>
                {t.sample}
              </p>
            </DemoCard>
          ))}
        </div>
      );

    case "Buttons":
      return (
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { label: "Primary / Default", usage: "Main CTAs on login and registration", node: <button type="button" style={{ background: "#0075C9", color: "#fff", padding: "10px 20px", borderRadius: 4, fontSize: 14, fontWeight: 600, border: 0 }}>Continue</button> },
            { label: "Primary / Hover", usage: "Pressed and hover states on primary actions", node: <button type="button" style={{ background: "#004E87", color: "#fff", padding: "10px 20px", borderRadius: 4, fontSize: 14, fontWeight: 600, border: 0 }}>Continue</button> },
            { label: "Secondary", usage: "Cancel and back actions in modals", node: <button type="button" style={{ background: "transparent", color: "#0075C9", padding: "10px 20px", borderRadius: 4, fontSize: 14, fontWeight: 600, border: "1.5px solid #0075C9" }}>Cancel</button> },
            { label: "Disabled", usage: "Inactive submit until form validates", node: <button type="button" disabled style={{ background: "#9E9E9E", color: "#fff", padding: "10px 20px", borderRadius: 4, fontSize: 14, fontWeight: 600, border: 0 }}>Submit</button> },
            { label: "Tertiary / Link", usage: "Inline help links below forms", node: <button type="button" style={{ background: "transparent", color: "#0075C9", padding: "10px 0", fontSize: 14, fontWeight: 600, textDecoration: "underline", border: 0 }}>Learn more</button> },
            { label: "Destructive", usage: "Remove account, delete claim actions", node: <button type="button" style={{ background: "#D32F2F", color: "#fff", padding: "10px 20px", borderRadius: 4, fontSize: 14, fontWeight: 600, border: 0 }}>Remove</button> },
          ].map((b) => (
            <DemoCard key={b.label} label={b.label} usage={b.usage} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              {b.node}
            </DemoCard>
          ))}
        </div>
      );

    case "Forms":
      return (
        <div className="grid md:grid-cols-2 gap-4">
          {[
            {
              label: "Text Input Default",
              usage: "Member ID and username fields on login",
              node: (
                <div>
                  <label style={{ display: "block", fontSize: 13, color: "#666", marginBottom: 6 }}>Member ID</label>
                  <input placeholder="Enter your ID" style={{ width: "100%", padding: "10px 12px", border: "1px solid #E0E0E0", borderRadius: 4, fontSize: 14, color: "#333" }} />
                </div>
              ),
            },
            {
              label: "Text Input Error",
              usage: "Inline validation on registration",
              node: (
                <div>
                  <label style={{ display: "block", fontSize: 13, color: "#666", marginBottom: 6 }}>Member ID</label>
                  <input defaultValue="INVALID" style={{ width: "100%", padding: "10px 12px", border: "1.5px solid #D32F2F", borderRadius: 4, fontSize: 14, background: "#FFEBEE", color: "#333" }} />
                  <p style={{ color: "#D32F2F", fontSize: 12, marginTop: 4 }}>Please enter a valid Member ID</p>
                </div>
              ),
            },
            {
              label: "Select / Dropdown",
              usage: "Plan type picker during enrollment",
              node: (
                <div>
                  <label style={{ display: "block", fontSize: 13, color: "#666", marginBottom: 6 }}>Plan type</label>
                  <select style={{ width: "100%", padding: "10px 12px", border: "1px solid #E0E0E0", borderRadius: 4, fontSize: 14, background: "#fff", color: "#333" }}>
                    <option>PPO</option>
                    <option>HMO</option>
                    <option>EPO</option>
                  </select>
                </div>
              ),
            },
            {
              label: "Checkbox Group",
              usage: "Coverage options on benefits summary",
              node: (
                <div style={{ fontSize: 14, color: "#333" }}>
                  <label style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}><input type="checkbox" defaultChecked /> Medical coverage</label>
                  <label style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}><input type="checkbox" /> Dental coverage</label>
                  <label style={{ display: "flex", alignItems: "center", gap: 8 }}><input type="checkbox" /> Vision coverage</label>
                </div>
              ),
            },
          ].map((f) => (
            <DemoCard key={f.label} label={f.label} usage={f.usage}>
              {f.node}
            </DemoCard>
          ))}
        </div>
      );

    case "Spacing":
      return (
        <div className="grid md:grid-cols-2 gap-4">
          {spacingTokens.map((s) => (
            <DemoCard key={s.name} label={`Spacing · ${s.name}`} usage={s.usage}>
              <div className="flex items-center gap-4">
                <div className="shrink-0 w-16">
                  <p className="font-body text-lg font-bold text-[#333333]">{s.px}px</p>
                  <p className="font-body text-[11px] text-[#666666]">token: {s.name}</p>
                </div>
                <div className="flex-1 min-w-0">
                  <div
                    className="rounded-sm bg-[#0075C9]"
                    style={{ height: 14, width: Math.min(s.px * 5, 200) }}
                  />
                </div>
              </div>
            </DemoCard>
          ))}
        </div>
      );

    case "Cards":
      return (
        <div className="grid md:grid-cols-2 gap-4">
          {[
            {
              label: "Info Card",
              usage: "Coverage status alerts on member dashboard",
              body: (
                <div style={{ background: "#E8F4FD", padding: 16, borderRadius: 6, borderLeft: "4px solid #0075C9" }}>
                  <p style={{ fontSize: 14, color: "#333", margin: 0, lineHeight: 1.5 }}>
                    <strong>Coverage active</strong>
                    <br />
                    Effective Jan 1 to Dec 31, 2024
                  </p>
                </div>
              ),
            },
            {
              label: "Status Card Success",
              usage: "Claim approval confirmations",
              body: (
                <div style={{ background: "#fff", padding: 16, borderRadius: 6, border: "1px solid #E0E0E0", borderLeft: "4px solid #4CAF50" }}>
                  <p style={{ fontSize: 14, color: "#333", margin: 0, lineHeight: 1.5 }}>
                    <strong style={{ color: "#4CAF50" }}>✓ Claim approved</strong>
                    <br />
                    Reimbursement on its way.
                  </p>
                </div>
              ),
            },
            {
              label: "Plan Summary Card",
              usage: "Benefits overview on home screen",
              body: (
                <div style={{ background: "#fff", padding: 16, borderRadius: 6, border: "1px solid #E0E0E0" }}>
                  <p style={{ fontSize: 12, color: "#666", margin: 0, textTransform: "uppercase", letterSpacing: 1 }}>Cigna PPO</p>
                  <p style={{ fontSize: 18, fontWeight: 700, color: "#333", margin: "4px 0 8px" }}>Premium Plan</p>
                  <p style={{ fontSize: 13, color: "#666", margin: 0 }}>$0 deductible · $20 copay</p>
                </div>
              ),
            },
            {
              label: "Action Card",
              usage: "Provider search prompts in care flows",
              body: (
                <div style={{ background: "#F0F4F8", padding: 16, borderRadius: 6, border: "1px solid #D0D0D0" }}>
                  <p style={{ fontSize: 14, color: "#333", margin: "0 0 12px", fontWeight: 500 }}>Find a doctor near you</p>
                  <button type="button" style={{ background: "#0075C9", color: "#fff", padding: "8px 16px", borderRadius: 4, fontSize: 13, fontWeight: 600, border: 0 }}>Search providers</button>
                </div>
              ),
            },
          ].map((c) => (
            <DemoCard key={c.label} label={c.label} usage={c.usage}>
              {c.body}
            </DemoCard>
          ))}
        </div>
      );

    case "Inputs":
      return (
        <div className="grid md:grid-cols-2 gap-4">
          {[
            {
              label: "Toggle Switch",
              usage: "Notification preferences in account settings",
              node: (
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 36, height: 20, background: "#0075C9", borderRadius: 999, position: "relative" }}>
                    <div style={{ position: "absolute", right: 2, top: 2, width: 16, height: 16, background: "#fff", borderRadius: "50%" }} />
                  </div>
                  <span style={{ fontSize: 14, color: "#333" }}>Email notifications on</span>
                </div>
              ),
            },
            {
              label: "Radio Group",
              usage: "Dependent coverage selection on enrollment",
              node: (
                <div style={{ fontSize: 14, color: "#333" }}>
                  <label style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}><input type="radio" name="r" defaultChecked /> Self only</label>
                  <label style={{ display: "flex", alignItems: "center", gap: 8 }}><input type="radio" name="r" /> Family</label>
                </div>
              ),
            },
            {
              label: "Search Input",
              usage: "Global provider and claims search",
              node: <input placeholder="Search providers, claims, plans…" style={{ width: "100%", padding: "10px 12px", border: "1px solid #E0E0E0", borderRadius: 999, fontSize: 14, background: "#F5F5F5", color: "#333" }} />,
            },
            {
              label: "Date Picker",
              usage: "Effective date on plan change requests",
              node: <input type="date" defaultValue="2024-01-15" style={{ width: "100%", padding: "10px 12px", border: "1px solid #E0E0E0", borderRadius: 4, fontSize: 14, color: "#333", background: "#fff" }} />,
            },
          ].map((inp) => (
            <DemoCard key={inp.label} label={inp.label} usage={inp.usage}>
              {inp.node}
            </DemoCard>
          ))}
        </div>
      );

    default:
      return null;
  }
};

const panelVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 48 : -48,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -48 : 48,
    opacity: 0,
  }),
};

const CignaComponentCategories = ({ onTabClick, onTabHover }: CignaComponentCategoriesProps) => {
  const tabStripRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const activeCategory = categories[activeIndex];

  const selectTab = useCallback(
    (index: number) => {
      onTabClick?.();
      setActiveIndex((current) => {
        if (index === current) return current;
        setDirection(index > current ? 1 : -1);
        return index;
      });
      tabStripRef.current?.children[index]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    },
    [onTabClick],
  );

  return (
    <div className="mb-12 min-w-0">
      <p className="font-body text-[10px] tracking-[0.3em] uppercase text-primary mb-3">Browse by category</p>
      <p className="font-body text-foreground/60 text-sm mb-8 max-w-2xl leading-relaxed">
        Click a tab or use the arrows to explore each token and pattern. Panels slide horizontally without scrolling the page.
      </p>

      <div className="rounded-xl border border-border/50 bg-background/80 p-4 md:p-6">
        <div
          ref={tabStripRef}
          className="mb-6 flex gap-2 overflow-x-auto border-b border-border/40 pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          role="tablist"
          aria-label="Component categories"
        >
          {categories.map((cat, i) => (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={activeCategory === cat}
              aria-controls={`cigna-panel-${cat}`}
              id={`cigna-tab-${cat}`}
              onClick={() => selectTab(i)}
              onMouseEnter={onTabHover}
              className={cn(
                "shrink-0 font-body text-[11px] tracking-widest uppercase px-4 py-2 transition-all",
                activeCategory === cat
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground/60 hover:text-primary border border-border/60",
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative min-h-[320px] overflow-hidden md:min-h-[360px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeCategory}
              id={`cigna-panel-${activeCategory}`}
              role="tabpanel"
              aria-labelledby={`cigna-tab-${activeCategory}`}
              custom={direction}
              variants={panelVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="w-full"
            >
              <CategoryPanel category={activeCategory} />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-6 flex items-center justify-between gap-4 border-t border-border/40 pt-4">
          <button
            type="button"
            onClick={() => {
              onTabClick?.();
              selectTab(Math.max(0, activeIndex - 1));
            }}
            disabled={activeIndex === 0}
            className="font-body text-[11px] tracking-widest uppercase text-foreground/60 hover:text-primary disabled:opacity-30 disabled:pointer-events-none"
          >
            ← Previous
          </button>
          <p className="font-body text-[10px] tracking-widest uppercase text-foreground/40 text-center">
            {activeIndex + 1} / {categories.length} · {activeCategory}
          </p>
          <button
            type="button"
            onClick={() => {
              onTabClick?.();
              selectTab(Math.min(categories.length - 1, activeIndex + 1));
            }}
            disabled={activeIndex === categories.length - 1}
            className="font-body text-[11px] tracking-widest uppercase text-foreground/60 hover:text-primary disabled:opacity-30 disabled:pointer-events-none"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
};

export default CignaComponentCategories;
