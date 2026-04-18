import { useState, useCallback, useRef, useEffect } from "react";

type SoundType = "click" | "hover" | "whoosh" | "toggle" | "success" | "fluorescent";

const useSoundEffects = () => {
  const [enabled, setEnabled] = useState(() => {
    if (typeof window === "undefined") return false;
    const stored = window.localStorage.getItem("retro-sfx");
    return stored === "true";
  });
  const ctxRef = useRef<AudioContext | null>(null);
  const lastGestureAtRef = useRef(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("retro-sfx", String(enabled));
    }
  }, [enabled]);

  const getCtx = useCallback(() => {
    if (typeof window === "undefined") return null;

    if (!ctxRef.current) {
      const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!Ctx) return null;
      ctxRef.current = new Ctx();
    }

    return ctxRef.current;
  }, []);

  const unlock = useCallback(async () => {
    const ctx = getCtx();
    if (!ctx) return null;

    if (ctx.state === "suspended") {
      try {
        await ctx.resume();
      } catch {
        return null;
      }
    }

    return ctx.state === "running" ? ctx : null;
  }, [getCtx]);

  useEffect(() => {
    const prime = () => {
      lastGestureAtRef.current = Date.now();
      void unlock();
    };

    const opts = { once: true, passive: true } as AddEventListenerOptions;
    document.addEventListener("pointerdown", prime, opts);
    document.addEventListener("keydown", prime, opts);
    document.addEventListener("touchstart", prime, opts);
    document.addEventListener("wheel", prime, opts);
    document.addEventListener("mousedown", prime, opts);

    return () => {
      document.removeEventListener("pointerdown", prime);
      document.removeEventListener("keydown", prime);
      document.removeEventListener("touchstart", prime);
      document.removeEventListener("wheel", prime);
      document.removeEventListener("mousedown", prime);
    };
  }, [unlock]);

  const play = useCallback(
    (type: SoundType) => {
      if (!enabled) return;

      const schedule = (ctx: AudioContext) => {
        const now = ctx.currentTime + 0.01;

        if (type === "fluorescent") {
          const duration = 3.6;
          const bufferSize = Math.floor(ctx.sampleRate * duration);
          const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
          const data = noiseBuffer.getChannelData(0);
          for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

          const noise = ctx.createBufferSource();
          noise.buffer = noiseBuffer;

          const bandpass = ctx.createBiquadFilter();
          bandpass.type = "bandpass";
          bandpass.frequency.value = 2000;
          bandpass.Q.value = 0.8;

          const noiseGain = ctx.createGain();
          noiseGain.gain.setValueAtTime(0, now);
          const burstTimes = [0.0, 0.12, 0.28, 0.42, 0.6, 0.78, 0.92, 1.05, 1.22, 1.46, 1.72, 1.94, 2.16];
          burstTimes.forEach((t) => {
            const start = now + t;
            noiseGain.gain.setValueAtTime(0.0001, start);
            noiseGain.gain.exponentialRampToValueAtTime(0.09, start + 0.012);
            noiseGain.gain.exponentialRampToValueAtTime(0.001, start + 0.07);
          });
          noiseGain.gain.setValueAtTime(0.001, now + 2.8);
          noiseGain.gain.exponentialRampToValueAtTime(0.012, now + 3.0);
          noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

          noise.connect(bandpass);
          bandpass.connect(noiseGain);
          noiseGain.connect(ctx.destination);
          noise.start(now);
          noise.stop(now + duration);

          const hum = ctx.createOscillator();
          const humGain = ctx.createGain();
          hum.type = "sawtooth";
          hum.frequency.value = 100;
          humGain.gain.setValueAtTime(0.0001, now);
          humGain.gain.setValueAtTime(0.0001, now + 2.7);
          humGain.gain.exponentialRampToValueAtTime(0.025, now + 3.1);
          humGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
          hum.connect(humGain);
          humGain.connect(ctx.destination);
          hum.start(now);
          hum.stop(now + duration);
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
      };

      const ctx = getCtx();
      if (!ctx) return;

      if (ctx.state === "running") {
        schedule(ctx);
        return;
      }

      const triggeredByRecentGesture = Date.now() - lastGestureAtRef.current < 250;
      if (!triggeredByRecentGesture) return;

      void unlock().then((runningCtx) => {
        if (!runningCtx) return;
        schedule(runningCtx);
      });
    },
    [enabled, getCtx, unlock]
  );

  return { enabled, setEnabled, play };
};

export default useSoundEffects;
