import { Volume2, VolumeX } from "lucide-react";
import { useSound } from "@/contexts/SoundContext";
import { primeAudioContext } from "@/lib/audio-context";

const SoundToggle = () => {
  const { enabled, setEnabled, play } = useSound();

  const handleToggle = () => {
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
      onClick={handleToggle}
      className="glass-toggle h-10 w-10 text-muted-foreground transition-colors hover:text-primary"
      aria-label={enabled ? "Mute sound effects" : "Enable sound effects"}
      title={enabled ? "Sound on" : "Sound off"}
    >
      {enabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
    </button>
  );
};

export default SoundToggle;
