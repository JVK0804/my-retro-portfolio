import { useState } from "react";
import { Bell, Calendar, ChevronLeft, ChevronRight, Info, Minus, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { cignaPalette, cignaSurface } from "@/components/case-study/cigna-ds-tokens";

const coverageTabs = ["Medical", "Dental", "Vision"] as const;

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
] as const;

const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();

const getFirstWeekday = (year: number, month: number) => new Date(year, month, 1).getDay();

const CollagePanel = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div
    className={cn(
      "rounded-xl border bg-white p-4 md:p-5 shadow-[0_1px_3px_rgba(0,0,0,0.08)]",
      className,
    )}
    style={{ borderColor: cignaSurface.border }}
  >
    {children}
  </div>
);

const CignaDesignSystemCollage = () => {
  const [dependents, setDependents] = useState(2);
  const [activeCoverage, setActiveCoverage] = useState<(typeof coverageTabs)[number]>("Medical");
  const [subscriber, setSubscriber] = useState(true);
  const [hipaaAuth, setHipaaAuth] = useState(false);
  const [paperless, setPaperless] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);
  const [claimModalState, setClaimModalState] = useState<"confirm" | "cancelled" | "kept">("confirm");
  const [calendarOpen, setCalendarOpen] = useState(true);
  const [calendarMonth, setCalendarMonth] = useState(5); // June (0-indexed)
  const [calendarYear, setCalendarYear] = useState(2026);
  const [selectedDay, setSelectedDay] = useState(13);
  const [hoveredColor, setHoveredColor] = useState<string | null>(null);

  const daysInMonth = getDaysInMonth(calendarYear, calendarMonth);
  const firstWeekday = getFirstWeekday(calendarYear, calendarMonth);
  const calendarCells = [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const goToPrevMonth = () => {
    if (calendarMonth === 0) {
      setCalendarMonth(11);
      setCalendarYear((y) => y - 1);
    } else {
      setCalendarMonth((m) => m - 1);
    }
    setSelectedDay(1);
  };

  const goToNextMonth = () => {
    if (calendarMonth === 11) {
      setCalendarMonth(0);
      setCalendarYear((y) => y + 1);
    } else {
      setCalendarMonth((m) => m + 1);
    }
    setSelectedDay(1);
  };

  const selectDay = (day: number) => {
    setSelectedDay(day);
    setCalendarOpen(true);
  };

  const formattedDate = `${String(calendarMonth + 1).padStart(2, "0")} / ${String(selectedDay).padStart(2, "0")} / ${calendarYear}`;

  return (
    <div className="mb-10 md:mb-12">
      <div
        className="mb-6 flex h-14 md:h-[4.5rem] overflow-hidden rounded-[13px] shadow-[0_1px_3px_rgba(0,0,0,0.1)]"
        role="list"
        aria-label="Cigna color palette"
      >
        {cignaPalette.map((color) => (
          <button
            key={color.hex}
            type="button"
            role="listitem"
            className="relative flex-1 min-w-0 transition-transform hover:scale-y-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            style={{ backgroundColor: color.hex }}
            onMouseEnter={() => setHoveredColor(color.hex)}
            onMouseLeave={() => setHoveredColor(null)}
            onFocus={() => setHoveredColor(color.hex)}
            onBlur={() => setHoveredColor(null)}
            aria-label={`${color.name}, ${color.hex}`}
          >
            {hoveredColor === color.hex && (
              <span className="absolute inset-x-0 bottom-1 text-center font-body text-[9px] md:text-[10px] font-medium text-white drop-shadow-sm px-1 truncate">
                {color.name}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3 lg:gap-5">
        {/* Column 1 — buttons, progress, modal */}
        <CollagePanel className="flex flex-col gap-4">
          <div
            className="inline-flex items-center gap-3 rounded-lg px-3 py-2 w-fit"
            style={{ backgroundColor: cignaSurface.muted }}
          >
            <button
              type="button"
              className="flex size-8 items-center justify-center rounded-md border bg-white hover:bg-[#f5f5f5]"
              style={{ borderColor: cignaSurface.border }}
              onClick={() => setDependents((n) => Math.max(0, n - 1))}
              aria-label="Decrease dependents"
            >
              <Minus size={14} className="text-[#333]" />
            </button>
            <span className="font-body text-base font-semibold text-[#333] min-w-[1ch] text-center">{dependents}</span>
            <button
              type="button"
              className="flex size-8 items-center justify-center rounded-md border bg-white hover:bg-[#f5f5f5]"
              style={{ borderColor: cignaSurface.border }}
              onClick={() => setDependents((n) => n + 1)}
              aria-label="Increase dependents"
            >
              <Plus size={14} className="text-[#333]" />
            </button>
            <span className="font-body text-sm text-[#333]">Dependents</span>
          </div>

          <div className="rounded-lg p-4" style={{ backgroundColor: cignaSurface.muted }}>
            <div className="flex justify-between font-body text-sm text-[#333] mb-3">
              <span>Deductible met</span>
              <span className="font-medium">$750 / $1,500</span>
            </div>
            <div className="h-1.5 rounded-full bg-[#E0E0E0] overflow-hidden">
              <div className="h-full w-1/2 rounded-full" style={{ backgroundColor: "#0075C9" }} />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button
              type="button"
              className="w-full rounded py-3 font-body text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#0075C9" }}
            >
              Enroll in plan
            </button>
            <button
              type="button"
              className="w-full rounded border py-3 font-body text-sm font-semibold transition-colors hover:bg-[#f5f5f5]"
              style={{ borderColor: "#0075C9", color: "#0075C9" }}
            >
              View benefits
            </button>
          </div>

          <div className="rounded-lg border p-4 mt-2" style={{ borderColor: cignaSurface.border }}>
            {claimModalState === "confirm" ? (
              <>
                <div className="flex size-9 items-center justify-center rounded-lg mb-3" style={{ backgroundColor: cignaSurface.info }}>
                  <Info size={16} className="text-[#0075C9]" />
                </div>
                <p className="font-body text-base font-semibold text-[#333] mb-2">Cancel this claim?</p>
                <p className="font-body text-sm text-[#666] leading-relaxed mb-4">
                  Claim #CLM-2026-04821 will be withdrawn. Reimbursement may be delayed.
                </p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    className="flex-1 rounded px-4 py-2 font-body text-sm font-semibold text-white"
                    style={{ backgroundColor: cignaSurface.error }}
                    onClick={() => setClaimModalState("cancelled")}
                  >
                    Cancel claim
                  </button>
                  <button
                    type="button"
                    className="rounded border px-4 py-2 font-body text-sm font-semibold text-[#333] hover:bg-[#f5f5f5]"
                    style={{ borderColor: cignaSurface.border }}
                    onClick={() => setClaimModalState("kept")}
                  >
                    Keep
                  </button>
                </div>
              </>
            ) : claimModalState === "cancelled" ? (
              <>
                <div
                  className="flex size-9 items-center justify-center rounded-lg mb-3"
                  style={{ backgroundColor: cignaSurface.errorBg }}
                >
                  <Info size={16} style={{ color: cignaSurface.error }} />
                </div>
                <p className="font-body text-base font-semibold text-[#333] mb-2">Claim cancellation submitted</p>
                <p className="font-body text-sm text-[#666] leading-relaxed mb-4">
                  Claim #CLM-2026-04821 is being withdrawn. You will receive confirmation by email within 24 hours.
                </p>
                <button
                  type="button"
                  className="w-full rounded border px-4 py-2 font-body text-sm font-semibold text-[#333] hover:bg-[#f5f5f5]"
                  style={{ borderColor: cignaSurface.border }}
                  onClick={() => setClaimModalState("confirm")}
                >
                  Undo
                </button>
              </>
            ) : (
              <>
                <div
                  className="flex size-9 items-center justify-center rounded-lg mb-3"
                  style={{ backgroundColor: "#E8F5E9" }}
                >
                  <Info size={16} style={{ color: cignaSurface.success }} />
                </div>
                <p className="font-body text-base font-semibold text-[#333] mb-2">Claim kept active</p>
                <p className="font-body text-sm text-[#666] leading-relaxed mb-4">
                  Claim #CLM-2026-04821 will continue processing. No changes were made.
                </p>
                <button
                  type="button"
                  className="w-full rounded border px-4 py-2 font-body text-sm font-semibold text-[#333] hover:bg-[#f5f5f5]"
                  style={{ borderColor: cignaSurface.border }}
                  onClick={() => setClaimModalState("confirm")}
                >
                  Review again
                </button>
              </>
            )}
          </div>
        </CollagePanel>

        {/* Column 2 — tabs, forms, status, toggles */}
        <CollagePanel className="flex flex-col gap-4">
          <div className="inline-flex rounded-lg p-1 w-fit" style={{ backgroundColor: cignaSurface.muted }}>
            {coverageTabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveCoverage(tab)}
                className={cn(
                  "rounded-md px-4 py-1.5 font-body text-sm font-medium transition-colors",
                  activeCoverage === tab
                    ? "bg-white text-[#333] shadow-sm"
                    : "text-[#666] hover:text-[#333]",
                )}
              >
                {tab}
              </button>
            ))}
          </div>

          <div
            className="relative rounded-lg border px-4 py-3 font-body text-sm text-[#333] leading-relaxed"
            style={{ borderColor: cignaSurface.border, backgroundColor: cignaSurface.info }}
          >
            Your Member ID is the 11-digit number printed on the front of your card.
            <span
              className="absolute -bottom-2 left-8 size-3 rotate-45 border-b border-r bg-[#E8F4FD]"
              style={{ borderColor: cignaSurface.border }}
            />
          </div>

          <div className="space-y-3 rounded-lg p-4" style={{ backgroundColor: cignaSurface.muted }}>
            <label className="flex items-center gap-3 font-body text-sm text-[#333] cursor-pointer">
              <input
                type="checkbox"
                checked={subscriber}
                onChange={(e) => setSubscriber(e.target.checked)}
                className="size-4 accent-[#0075C9]"
              />
              I am the subscriber
            </label>
            <label className="flex items-start gap-3 font-body text-sm text-[#333] cursor-pointer">
              <input
                type="checkbox"
                checked={hipaaAuth}
                onChange={(e) => setHipaaAuth(e.target.checked)}
                className="size-4 mt-0.5 accent-[#0075C9]"
              />
              I authorize release of PHI under HIPAA
            </label>
          </div>

          <div className="space-y-2">
            {[
              { label: "Claim approved", color: cignaSurface.success },
              { label: "Prior authorization pending", color: "#F59E0B" },
              { label: "Out-of-network denied", color: cignaSurface.error },
            ].map((status) => (
              <div
                key={status.label}
                className="flex items-center gap-2 rounded-full border px-4 py-2 font-body text-sm text-[#333] w-fit"
                style={{ borderColor: cignaSurface.border }}
              >
                <span className="size-2 rounded-full" style={{ backgroundColor: status.color }} />
                {status.label}
              </div>
            ))}
          </div>

          <div className="space-y-3 rounded-lg p-4" style={{ backgroundColor: cignaSurface.muted }}>
            {[
              { label: "Paperless EOB delivery", on: paperless, toggle: () => setPaperless((v) => !v) },
              { label: "HIPAA two-factor auth", on: twoFactor, toggle: () => setTwoFactor((v) => !v) },
            ].map((row) => (
              <div key={row.label} className="flex items-center justify-between gap-4">
                <span className="font-body text-sm text-[#333]">{row.label}</span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={row.on}
                  onClick={row.toggle}
                  className="relative inline-flex h-6 w-11 shrink-0 overflow-hidden rounded-full transition-colors"
                  style={{ backgroundColor: row.on ? "#0075C9" : "#E0E0E0" }}
                >
                  <span
                    className={cn(
                      "pointer-events-none absolute top-0.5 left-0.5 size-5 rounded-full bg-white shadow transition-transform duration-200",
                      row.on ? "translate-x-5" : "translate-x-0",
                    )}
                  />
                </button>
              </div>
            ))}
          </div>
        </CollagePanel>

        {/* Column 3 — alert, date picker, list */}
        <CollagePanel className="flex flex-col gap-4">
          <div
            className="flex gap-3 rounded-lg border p-4"
            style={{ borderColor: cignaSurface.border, backgroundColor: cignaSurface.info }}
          >
            <Info size={18} className="text-[#0075C9] shrink-0 mt-0.5" />
            <div>
              <p className="font-body text-sm font-semibold text-[#333]">Claim #CLM-2026-04821 submitted</p>
              <p className="font-body text-xs text-[#666] mt-1 leading-relaxed">
                EOB will be available within 7 to 10 business days.
              </p>
            </div>
            <button type="button" className="ml-auto text-[#666] hover:text-[#333]" aria-label="Dismiss">
              <X size={14} />
            </button>
          </div>

          <div className="rounded-lg border p-4" style={{ borderColor: cignaSurface.border }}>
            <label className="font-body text-sm text-[#666] block mb-2" htmlFor="cigna-date-of-service">
              Date of service
            </label>
            <div className="relative mb-3">
              <input
                id="cigna-date-of-service"
                type="text"
                readOnly
                value={formattedDate}
                onClick={() => setCalendarOpen((open) => !open)}
                className="w-full cursor-pointer rounded border px-3 py-2.5 font-body text-sm text-[#333] pr-10"
                style={{ borderColor: cignaSurface.border }}
                aria-expanded={calendarOpen}
                aria-haspopup="dialog"
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-[#666] hover:bg-[#f5f5f5] hover:text-[#333]"
                onClick={() => setCalendarOpen((open) => !open)}
                aria-label={calendarOpen ? "Close calendar" : "Open calendar"}
              >
                <Calendar size={16} />
              </button>
            </div>

            {calendarOpen && (
              <>
                <div className="flex items-center justify-between mb-2 font-body text-sm text-[#333]">
                  <button
                    type="button"
                    className="rounded p-1 text-[#666] hover:bg-[#f5f5f5] hover:text-[#333]"
                    onClick={goToPrevMonth}
                    aria-label="Previous month"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <span className="font-medium">
                    {MONTH_NAMES[calendarMonth]} {calendarYear}
                  </span>
                  <button
                    type="button"
                    className="rounded p-1 text-[#666] hover:bg-[#f5f5f5] hover:text-[#333]"
                    onClick={goToNextMonth}
                    aria-label="Next month"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center font-body text-xs text-[#666] mb-1">
                  {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                    <span key={`${d}-${i}`}>{d}</span>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {calendarCells.map((day, i) =>
                    day === null ? (
                      <span key={`empty-${i}`} className="aspect-square" aria-hidden />
                    ) : (
                      <button
                        key={`${calendarYear}-${calendarMonth}-${day}`}
                        type="button"
                        onClick={() => selectDay(day)}
                        className={cn(
                          "aspect-square rounded font-body text-xs transition-colors",
                          selectedDay === day
                            ? "bg-[#0075C9] text-white font-semibold"
                            : "text-[#333] hover:bg-[#E8F4FD]",
                        )}
                        aria-label={`${MONTH_NAMES[calendarMonth]} ${day}, ${calendarYear}`}
                        aria-pressed={selectedDay === day}
                      >
                        {day}
                      </button>
                    ),
                  )}
                </div>
              </>
            )}
          </div>

          <div className="rounded-lg border overflow-hidden" style={{ borderColor: cignaSurface.border }}>
            <div className="p-3 border-b" style={{ borderColor: cignaSurface.border, backgroundColor: cignaSurface.muted }}>
              <p className="font-body text-sm font-semibold text-[#333]">Taylor Smith · Subscriber</p>
              <p className="font-body text-xs text-[#666] mt-0.5">Member ID: U•••••42891 · PPO Plan</p>
            </div>
            {[
              { icon: Bell, label: "Claim updates", badge: "8" },
              { icon: Info, label: "Coverage & benefits" },
              { icon: Calendar, label: "Find a provider" },
            ].map((item) => (
              <button
                key={item.label}
                type="button"
                className="flex w-full items-center gap-3 px-3 py-2.5 font-body text-sm text-[#333] hover:bg-[#f5f5f5] transition-colors border-b last:border-b-0"
                style={{ borderColor: cignaSurface.border }}
              >
                <item.icon size={16} className="text-[#666]" />
                <span className="flex-1 text-left">{item.label}</span>
                {item.badge && (
                  <span
                    className="rounded-full px-2 py-0.5 font-body text-xs font-semibold text-white"
                    style={{ backgroundColor: "#0075C9" }}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </CollagePanel>
      </div>

      <p className="font-body text-[10px] tracking-widest uppercase text-foreground/45 text-center mt-5">
        Interactive component collage · abstracted for NDA
      </p>
    </div>
  );
};

export default CignaDesignSystemCollage;
