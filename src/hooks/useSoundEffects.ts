import { useState, useCallback, useRef, useEffect } from "react";

type SoundType = "click" | "hover" | "whoosh" | "toggle" | "success" | "fluorescent";

const useSoundEffects = () => {
  const [enabled, setEnabled] = useState(() => {
    const stored = localStorage.getItem("retro-sfx");
    return stored === "true";
  });
  const ctxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    localStorage.setItem("retro-sfx", String(enabled));
  }, [enabled]);

  // Prime AudioContext on mount and on first user gesture so sounds triggered
  // later (e.g. via scroll/inView) play immediately in new tabs/windows.
  useEffect(() => {
    const getCtx = () => {
      if (!ctxRef.current) {
        const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        ctxRef.current = new Ctx();
      }
      if (ctxRef.current.state === "suspended") void ctxRef.current.resume();
      return ctxRef.current;
    };
    const prime = () => getCtx();
    const opts = { once: true, passive: true } as AddEventListenerOptions;
    window.addEventListener("pointerdown", prime, opts);
    window.addEventListener("keydown", prime, opts);
    window.addEventListener("touchstart", prime, opts);
    window.addEventListener("scroll", prime, opts);
    return () => {
      window.removeEventListener("pointerdown", prime);
      window.removeEventListener("keydown", prime);
      window.removeEventListener("touchstart", prime);
      window.removeEventListener("scroll", prime);
    };
  }, []);

  const getCtx = useCallback(() => {
    if (!ctxRef.current) {
      const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      ctxRef.current = new Ctx();
    }
    if (ctxRef.current.state === "suspended") void ctxRef.current.resume();
    return ctxRef.current;
  }, []);

  const play = useCallback(
    (type: SoundType) => {
      if (!enabled) return;
      const ctx = getCtx();
      // Schedule slightly in the future — events at exactly currentTime can be dropped
      const now = ctx.currentTime + 0.005;

      // Fluorescent lamp startup — noise hum + random strike bursts → steady buzz
      if (type === "fluorescent") {
        const duration = 1.6;
        // White-noise buffer
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
        // Random flicker bursts of noise (ballast strikes)
        const burstTimes = [0.0, 0.12, 0.28, 0.42, 0.6, 0.78];
        burstTimes.forEach((t) => {
          const start = now + t;
          noiseGain.gain.setValueAtTime(0.0001, start);
          noiseGain.gain.exponentialRampToValueAtTime(0.09, start + 0.012);
          noiseGain.gain.exponentialRampToValueAtTime(0.001, start + 0.07);
        });
        // Settle to faint steady hiss
        noiseGain.gain.setValueAtTime(0.001, now + 0.95);
        noiseGain.gain.exponentialRampToValueAtTime(0.012, now + 1.1);
        noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

        noise.connect(bandpass);
        bandpass.connect(noiseGain);
        noiseGain.connect(ctx.destination);
        noise.start(now);
        noise.stop(now + duration);

        // 100Hz mains hum that fades in as lamp "settles"
        const hum = ctx.createOscillator();
        const humGain = ctx.createGain();
        hum.type = "sawtooth";
        hum.frequency.value = 100;
        humGain.gain.setValueAtTime(0.0001, now);
        humGain.gain.setValueAtTime(0.0001, now + 0.85);
        humGain.gain.exponentialRampToValueAtTime(0.025, now + 1.15);
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
    },
    [enabled, getCtx]
  );

  return { enabled, setEnabled, play };
};

export default useSoundEffects;
