import { createContext, useContext, useState, useCallback, useRef, useEffect } from "react";
import { getSharedAudioContext, primeAudioContext, withRunningAudioContext } from "@/lib/audio-context";

type SoundType =
  | "click"
  | "hover"
  | "whoosh"
  | "toggle"
  | "success"
  | "fluorescent"
  | "typing";

const FLUORESCENT_DURATION = 3.0;

type SoundContextType = {
  enabled: boolean;
  setEnabled: (next: boolean) => void;
  play: (type: SoundType, options?: { force?: boolean }) => void;
  playTyping: () => void;
  prepareTypingAudio: () => Promise<void>;
};

const noop = () => undefined;

const SoundContext = createContext<SoundContextType>({
  enabled: false,
  setEnabled: noop,
  play: noop,
  playTyping: noop,
  prepareTypingAudio: async () => undefined,
});

export const SoundProvider = ({ children }: { children: React.ReactNode }) => {
  const [enabled, setEnabled] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem("retro-sfx") === "true";
  });
  const fluorescentCleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("retro-sfx", String(enabled));
  }, [enabled]);

  const getCtx = useCallback(() => getSharedAudioContext(), []);

  const stopFluorescent = useCallback(() => {
    fluorescentCleanupRef.current?.();
    fluorescentCleanupRef.current = null;
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const prime = () => {
      primeAudioContext();
    };
    const opts = { passive: true } as AddEventListenerOptions;
    document.addEventListener("pointerdown", prime, opts);
    document.addEventListener("touchstart", prime, opts);
    document.addEventListener("click", prime, opts);
    document.addEventListener("keydown", prime, opts);
    return () => {
      document.removeEventListener("pointerdown", prime);
      document.removeEventListener("touchstart", prime);
      document.removeEventListener("click", prime);
      document.removeEventListener("keydown", prime);
      stopFluorescent();
    };
  }, [stopFluorescent]);

  const scheduleSound = useCallback(
    (ctx: AudioContext, type: SoundType) => {
      const now = ctx.currentTime + 0.01;

      if (type === "fluorescent") {
        stopFluorescent();
        const bufferSize = Math.floor(ctx.sampleRate * FLUORESCENT_DURATION);
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = noiseBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i += 1) data[i] = Math.random() * 2 - 1;

        const noise = ctx.createBufferSource();
        const bandpass = ctx.createBiquadFilter();
        const noiseGain = ctx.createGain();
        const hum = ctx.createOscillator();
        const humGain = ctx.createGain();

        noise.buffer = noiseBuffer;
        bandpass.type = "bandpass";
        bandpass.frequency.value = 2000;
        bandpass.Q.value = 0.8;

        noiseGain.gain.setValueAtTime(0.0001, now);
        [0, 0.15, 0.35, 0.55, 0.8, 1.1, 1.4, 1.7, 1.95, 2.2].forEach((offset) => {
          const start = now + offset;
          noiseGain.gain.setValueAtTime(0.0001, start);
          noiseGain.gain.exponentialRampToValueAtTime(0.09, start + 0.012);
          noiseGain.gain.exponentialRampToValueAtTime(0.001, start + 0.07);
        });
        noiseGain.gain.setValueAtTime(0.001, now + 2.35);
        noiseGain.gain.exponentialRampToValueAtTime(0.2, now + 2.5);
        noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + FLUORESCENT_DURATION);

        hum.type = "sawtooth";
        hum.frequency.value = 100;
        humGain.gain.setValueAtTime(0.0001, now);
        humGain.gain.setValueAtTime(0.0001, now + 2.3);
        humGain.gain.exponentialRampToValueAtTime(0.045, now + 2.5);
        humGain.gain.exponentialRampToValueAtTime(0.0001, now + FLUORESCENT_DURATION);

        noise.connect(bandpass);
        bandpass.connect(noiseGain);
        noiseGain.connect(ctx.destination);
        hum.connect(humGain);
        humGain.connect(ctx.destination);

        noise.start(now);
        noise.stop(now + FLUORESCENT_DURATION);
        hum.start(now);
        hum.stop(now + FLUORESCENT_DURATION);

        fluorescentCleanupRef.current = () => {
          try {
            noise.stop();
          } catch {
            /* noop */
          }
          try {
            hum.stop();
          } catch {
            /* noop */
          }
          noise.disconnect();
          bandpass.disconnect();
          noiseGain.disconnect();
          hum.disconnect();
          humGain.disconnect();
        };
        return;
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      switch (type) {
        case "click":
          osc.type = "square";
          osc.frequency.setValueAtTime(800, now);
          osc.frequency.exponentialRampToValueAtTime(200, now + 0.08);
          gain.gain.setValueAtTime(0.08, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
          osc.start(now);
          osc.stop(now + 0.1);
          break;
        case "hover":
          osc.type = "sine";
          osc.frequency.setValueAtTime(600, now);
          osc.frequency.exponentialRampToValueAtTime(900, now + 0.06);
          gain.gain.setValueAtTime(0.03, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
          osc.start(now);
          osc.stop(now + 0.08);
          break;
        case "whoosh":
          osc.type = "sawtooth";
          osc.frequency.setValueAtTime(100, now);
          osc.frequency.exponentialRampToValueAtTime(1200, now + 0.15);
          osc.frequency.exponentialRampToValueAtTime(100, now + 0.3);
          gain.gain.setValueAtTime(0.04, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
          osc.start(now);
          osc.stop(now + 0.3);
          break;
        case "toggle":
          osc.type = "triangle";
          osc.frequency.setValueAtTime(440, now);
          osc.frequency.setValueAtTime(660, now + 0.06);
          gain.gain.setValueAtTime(0.06, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
          osc.start(now);
          osc.stop(now + 0.15);
          break;
        case "success":
          osc.type = "sine";
          osc.frequency.setValueAtTime(523, now);
          osc.frequency.setValueAtTime(659, now + 0.1);
          osc.frequency.setValueAtTime(784, now + 0.2);
          gain.gain.setValueAtTime(0.06, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
          osc.start(now);
          osc.stop(now + 0.35);
          break;
        case "typing": {
          const tick = 1180 + Math.random() * 180;
          const startAt = ctx.currentTime;
          osc.type = "square";
          osc.frequency.setValueAtTime(tick, startAt);
          osc.frequency.exponentialRampToValueAtTime(tick * 0.72, startAt + 0.022);
          gain.gain.setValueAtTime(0.028, startAt);
          gain.gain.exponentialRampToValueAtTime(0.001, startAt + 0.028);
          osc.start(startAt);
          osc.stop(startAt + 0.03);
          break;
        }
      }
    },
    [stopFluorescent],
  );

  const play = useCallback(
    (type: SoundType, options?: { force?: boolean }) => {
      if (!enabled && !options?.force) return;
      withRunningAudioContext((ctx) => scheduleSound(ctx, type));
    },
    [enabled, scheduleSound],
  );

  const prepareTypingAudio = useCallback(async () => {
    if (!enabled) return;
    primeAudioContext();
    const ctx = getCtx();
    if (ctx?.state === "suspended") {
      try {
        await ctx.resume();
      } catch {
        // ignore
      }
    }
  }, [enabled, getCtx]);

  const playTyping = useCallback(() => {
    if (!enabled) return;
    withRunningAudioContext((ctx) => scheduleSound(ctx, "typing"));
  }, [enabled, scheduleSound]);

  return (
    <SoundContext.Provider value={{ enabled, setEnabled, play, playTyping, prepareTypingAudio }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => useContext(SoundContext);
