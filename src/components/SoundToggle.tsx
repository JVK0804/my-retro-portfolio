import { Volume2, VolumeX } from "lucide-react";
import { useSound } from "@/contexts/SoundContext";

const SoundToggle = () => {
  const { enabled, setEnabled, play } = useSound();

  const handleToggle = () => {
    setEnabled(!enabled);
    if (!enabled) {
      // Play a little confirmation beep when turning on
      setTimeout(() => play("toggle"), 50);
    }
  };

  return (
    <button
      onClick={handleToggle}
      className="glass-toggle w-9 h-9 text-muted-foreground hover:text-primary transition-colors"
      aria-label={enabled ? "Mute sound effects" : "Enable sound effects"}
      title={enabled ? "Sound on" : "Sound off"}
    >
      {enabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
    </button>
  );
};

export default SoundToggle;
