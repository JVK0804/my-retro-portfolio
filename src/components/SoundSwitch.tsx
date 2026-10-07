import { motion } from "framer-motion";
import { useSound } from "@/contexts/SoundContext";
import { primeAudioContext } from "@/lib/audio-context";

const SoundSwitch = () => {
  const { enabled, setEnabled, play } = useSound();

  const toggle = () => {
    if (enabled) {
      setEnabled(false);
      return;
    }
    primeAudioContext();
    setEnabled(true);
    play("toggle", { force: true });
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      aria-label="Sound effects"
      onClick={toggle}
      className="fixed right-4 top-4 z-[61] flex h-12 items-center gap-3 border border-foreground/25 bg-background/85 px-3 text-foreground backdrop-blur-md sm:right-6 sm:top-6"
    >
      <span className="type-label hidden sm:inline">Sound</span>
      <span className="flex items-center gap-1.5 font-mono-space text-[9px] uppercase tracking-[0.16em]">
        <span className={enabled ? "text-foreground/35" : "text-foreground"}>Off</span>
        <span className="relative h-6 w-11 rounded-[3px] border border-foreground/60 bg-foreground/[0.06] shadow-[inset_0_1px_3px_rgba(0,0,0,0.5)]">
          <motion.span
            className="absolute top-[2px] h-[18px] w-[18px] rounded-[2px] border border-foreground/70 bg-foreground shadow-[0_1px_0_rgba(0,0,0,0.4)]"
            initial={false}
            animate={{ left: enabled ? 22 : 2 }}
            transition={{ type: "spring", stiffness: 520, damping: 32 }}
          >
            <span className="absolute inset-x-[4px] top-1/2 h-px -translate-y-1/2 bg-background/60" />
          </motion.span>
        </span>
        <span className={enabled ? "text-primary" : "text-foreground/35"}>On</span>
      </span>
      <span
        aria-hidden="true"
        className={`size-1.5 rounded-full transition-colors duration-300 ${
          enabled ? "bg-primary shadow-[0_0_6px_hsl(var(--primary))]" : "bg-foreground/20"
        }`}
      />
    </button>
  );
};

export default SoundSwitch;
