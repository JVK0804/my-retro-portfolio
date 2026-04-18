import { createContext, useContext, useState, useCallback, useRef, useEffect } from "react";

type SoundType = "click" | "hover" | "whoosh" | "toggle" | "success" | "fluorescent";

const FLUORESCENT_DURATION = 4.1;
const RECENT_GESTURE_WINDOW = 250;

type SoundContextType = {
  enabled: boolean;
  setEnabled: (next: boolean) => void;
  play: (type: SoundType) => void;
};

const SoundContext = createContext<SoundContextType | null>(null);

export const SoundProvider = ({ children }: { children: React.ReactNode }) => {
  const [enabled, setEnabled] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem("retro-sfx") === "true";
  });
  const ctxRef = useRef<AudioContext | null>(null);
  const lastGestureAtRef = useRef(0);
  const fluorescentCleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("retro-sfx", String(enabled));
  }, [enabled]);

  const getCtx = useCallback(() => {
    if (typeof window === "undefined") return null;
    if (!ctxRef.current) {
      const Ctor =
        window.AudioContext ||
        (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!Ctor) return null;
      ctxRef.current = new Ctor();
    }
    return ctxRef.current;
  }, []);

  const unlockContext = useCallback(async () => {
    const ctx = getCtx();
    if (!ctx) return null;
    if (ctx.state !== "running") {
      try {
        await ctx.resume();
      } catch {
        return null;
      }
    }
    return ctx.state === "running" ? ctx : null;
  }, [getCtx]);

  const stopFluorescent = useCallback(() => {
    fluorescentCleanupRef.current?.();
    fluorescentCleanupRef.current = null;
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const prime = () => {
      lastGestureAtRef.current = Date.now();
      void unlockContext();
    };
    const opts = { passive: true } as AddEventListenerOptions;
    document.addEventListener("pointerdown", prime, opts);
    document.addEventListener("keydown", prime, opts);
    document.addEventListener("touchstart", prime, opts);
    document.addEventListener("wheel", prime, opts);
    return () => {
      document.removeEventListener("pointerdown", prime);
      document.removeEventListener("keydown", prime);
      document.removeEventListener("touchstart", prime);
      document.removeEventListener("wheel", prime);
      stopFluorescent();
    };
  }, [stopFluorescent, unlockContext]);

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
        [0, 0.12, 0.28, 0.42, 0.6, 0.78, 0.92, 1.05, 1.22, 1.46, 1.72, 1.94, 2.16, 2.48, 2.82].forEach(
          (offset) => {
            const start = now + offset;
            noiseGain.gain.setValueAtTime(0.0001, start);
            noiseGain.gain.exponentialRampToValueAtTime(0.09, start + 0.012);
            noiseGain.gain.exponentialRampToValueAtTime(0.001, start + 0.07);
          }
        );
        noiseGain.gain.setValueAtTime(0.001, now + 3.8);
        noiseGain.gain.exponentialRampToValueAtTime(0.012, now + 4.05);
        noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + FLUORESCENT_DURATION);

        hum.type = "sawtooth";
        hum.frequency.value = 100;
        humGain.gain.setValueAtTime(0.0001, now);
        humGain.gain.setValueAtTime(0.0001, now + 3.7);
        humGain.gain.exponentialRampToValueAtTime(0.025, now + 4.1);
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
          try { noise.stop(); } catch { /* noop */ }
          try { hum.stop(); } catch { /* noop */ }
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
      }
    },
    [stopFluorescent]
  );

  const play = useCallback(
    (type: SoundType) => {
      if (!enabled) return;
      const ctx = getCtx();
      if (!ctx) return;
      if (ctx.state === "running") {
        scheduleSound(ctx, type);
        return;
      }
      if (Date.now() - lastGestureAtRef.current > RECENT_GESTURE_WINDOW) return;
      void unlockContext().then((runningCtx) => {
        if (!runningCtx) return;
        scheduleSound(runningCtx, type);
      });
    },
    [enabled, getCtx, scheduleSound, unlockContext]
  );

  return (
    <SoundContext.Provider value={{ enabled, setEnabled, play }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => {
  const ctx = useContext(SoundContext);
  if (!ctx) throw new Error("useSound must be inside SoundProvider");
  return ctx;
};
