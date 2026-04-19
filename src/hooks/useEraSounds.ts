import { useCallback, useRef, useState } from "react";

export type Era = "cassette" | "cd" | "mp3" | "streaming";

export type DeviceKey =
  | Era
  | "crt"
  | "gameboy"
  | "vhs"
  | "phone"
  | "boombox"
  | "camera"
  | "smartphone"
  | "earbuds"
  | "smartwatch"
  | "ar"
  | "laptop"
  | "drone";

let sharedCtx: AudioContext | null = null;
const getCtx = (): AudioContext | null => {
  if (typeof window === "undefined") return null;
  if (!sharedCtx) {
    const Ctor =
      window.AudioContext ||
      (window as Window & { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!Ctor) return null;
    sharedCtx = new Ctor();
  }
  return sharedCtx;
};

let activeStop: (() => void) | null = null;
const stopActive = () => {
  activeStop?.();
  activeStop = null;
};

// ---- Synth helpers ----
const noiseBuffer = (ctx: AudioContext, seconds: number) => {
  const buf = ctx.createBuffer(1, Math.floor(ctx.sampleRate * seconds), ctx.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  return buf;
};

type Voice = { stop: () => void };

const beep = (
  ctx: AudioContext,
  startAt: number,
  freq: number,
  dur: number,
  type: OscillatorType = "sine",
  vol = 0.15,
  freqEnd?: number
): Voice => {
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, startAt);
  if (freqEnd !== undefined) {
    o.frequency.exponentialRampToValueAtTime(Math.max(1, freqEnd), startAt + dur);
  }
  g.gain.setValueAtTime(0.0001, startAt);
  g.gain.exponentialRampToValueAtTime(vol, startAt + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, startAt + dur);
  o.connect(g).connect(ctx.destination);
  o.start(startAt);
  o.stop(startAt + dur + 0.05);
  return {
    stop: () => {
      try { o.stop(); } catch { /* noop */ }
      o.disconnect(); g.disconnect();
    },
  };
};

const noiseBurst = (
  ctx: AudioContext,
  startAt: number,
  dur: number,
  filter: { type: BiquadFilterType; freq: number; q?: number },
  vol = 0.1
): Voice => {
  const src = ctx.createBufferSource();
  src.buffer = noiseBuffer(ctx, dur);
  const f = ctx.createBiquadFilter();
  f.type = filter.type;
  f.frequency.value = filter.freq;
  if (filter.q !== undefined) f.Q.value = filter.q;
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.0001, startAt);
  g.gain.exponentialRampToValueAtTime(vol, startAt + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, startAt + dur);
  src.connect(f).connect(g).connect(ctx.destination);
  src.start(startAt);
  src.stop(startAt + dur + 0.05);
  return {
    stop: () => {
      try { src.stop(); } catch { /* noop */ }
      src.disconnect(); f.disconnect(); g.disconnect();
    },
  };
};

// ---- Per-device synthesizers ----
const synths: Record<DeviceKey, (ctx: AudioContext, t: number) => Voice[]> = {
  cassette: (ctx, t) => [
    beep(ctx, t, 180, 0.05, "square", 0.18),
    noiseBurst(ctx, t + 0.05, 1.6, { type: "highpass", freq: 4000 }, 0.04),
    beep(ctx, t + 0.2, 220, 1.2, "triangle", 0.05, 200),
  ],
  cd: (ctx, t) => [
    beep(ctx, t, 90, 0.15, "sine", 0.1),
    noiseBurst(ctx, t + 0.1, 0.8, { type: "bandpass", freq: 1500, q: 2 }, 0.05),
    beep(ctx, t + 0.6, 880, 0.4, "sine", 0.12, 1320),
  ],
  mp3: (ctx, t) => [
    beep(ctx, t, 1200, 0.04, "square", 0.08),
    beep(ctx, t + 0.08, 1400, 0.04, "square", 0.08),
    beep(ctx, t + 0.16, 1600, 0.04, "square", 0.08),
    beep(ctx, t + 0.3, 660, 0.5, "sawtooth", 0.06, 440),
  ],
  streaming: (ctx, t) => [
    beep(ctx, t, 523, 0.4, "sine", 0.08, 1046),
    beep(ctx, t + 0.05, 659, 0.5, "sine", 0.06, 1318),
    noiseBurst(ctx, t, 1.2, { type: "lowpass", freq: 800 }, 0.02),
  ],
  crt: (ctx, t) => [
    beep(ctx, t, 15600, 0.8, "sine", 0.04),
    noiseBurst(ctx, t, 0.3, { type: "highpass", freq: 3000 }, 0.15),
    beep(ctx, t + 0.3, 60, 0.2, "sine", 0.2, 30),
  ],
  gameboy: (ctx, t) => [
    beep(ctx, t, 523, 0.12, "square", 0.1),
    beep(ctx, t + 0.15, 659, 0.12, "square", 0.1),
    beep(ctx, t + 0.3, 784, 0.12, "square", 0.1),
    beep(ctx, t + 0.45, 1046, 0.25, "square", 0.1),
  ],
  vhs: (ctx, t) => [
    beep(ctx, t, 80, 0.08, "square", 0.15),
    noiseBurst(ctx, t + 0.1, 1.5, { type: "bandpass", freq: 600, q: 1 }, 0.06),
    beep(ctx, t + 0.1, 200, 1.4, "sawtooth", 0.04, 180),
  ],
  phone: (ctx, t) => {
    const voices: Voice[] = [];
    // Classic dial tone first (350Hz + 440Hz) — short hum before dialing
    voices.push(beep(ctx, t, 350, 0.4, "sine", 0.07));
    voices.push(beep(ctx, t, 440, 0.4, "sine", 0.07));

    // Finger inserts and pulls dial around — soft mechanical scrape
    const pullStart = t + 0.45;
    voices.push(noiseBurst(ctx, pullStart, 0.35, { type: "bandpass", freq: 500, q: 3 }, 0.05));
    voices.push(beep(ctx, pullStart, 140, 0.35, "sawtooth", 0.04, 90));

    // Governor "tick-tick-tick" as dial returns — evenly spaced sharp clicks
    // Dialing the digit "7": 7 pulses, ~10 pulses per second (real rotary spec)
    const digit = 7;
    const tickStart = pullStart + 0.4;
    const tickGap = 0.1;
    for (let i = 0; i < digit; i++) {
      const ct = tickStart + i * tickGap;
      // Sharp metallic tick (governor pawl)
      voices.push(noiseBurst(ctx, ct, 0.012, { type: "highpass", freq: 4500 }, 0.35));
      voices.push(beep(ctx, ct, 1800, 0.015, "square", 0.12));
      // Low mechanical thunk under each tick
      voices.push(beep(ctx, ct, 70, 0.02, "sine", 0.15));
    }

    // Brief mechanical settle at the end
    const endTick = tickStart + digit * tickGap;
    voices.push(noiseBurst(ctx, endTick, 0.05, { type: "bandpass", freq: 300, q: 2 }, 0.08));

    return voices;
  },
  boombox: (ctx, t) => [
    beep(ctx, t, 60, 0.15, "sine", 0.2),
    beep(ctx, t + 0.4, 60, 0.15, "sine", 0.2),
    beep(ctx, t + 0.8, 60, 0.15, "sine", 0.2),
    beep(ctx, t + 1.2, 60, 0.15, "sine", 0.2),
    noiseBurst(ctx, t + 0.05, 0.05, { type: "highpass", freq: 6000 }, 0.15),
    noiseBurst(ctx, t + 0.45, 0.05, { type: "highpass", freq: 6000 }, 0.15),
    noiseBurst(ctx, t + 0.85, 0.05, { type: "highpass", freq: 6000 }, 0.15),
    noiseBurst(ctx, t + 1.25, 0.05, { type: "highpass", freq: 6000 }, 0.15),
  ],
  camera: (ctx, t) => [
    noiseBurst(ctx, t, 0.04, { type: "highpass", freq: 5000 }, 0.25),
    noiseBurst(ctx, t + 0.15, 0.4, { type: "bandpass", freq: 2000, q: 3 }, 0.08),
  ],
  smartphone: (ctx, t) => [
    beep(ctx, t, 1318, 0.15, "sine", 0.1),
    beep(ctx, t + 0.18, 1760, 0.15, "sine", 0.1),
    beep(ctx, t + 0.36, 2093, 0.25, "sine", 0.1),
  ],
  earbuds: (ctx, t) => [
    beep(ctx, t, 880, 0.2, "sine", 0.08, 1320),
    beep(ctx, t + 0.3, 1320, 0.3, "sine", 0.08, 1760),
  ],
  smartwatch: (ctx, t) => [
    beep(ctx, t, 2093, 0.08, "sine", 0.1),
    beep(ctx, t + 0.12, 2093, 0.08, "sine", 0.1),
  ],
  ar: (ctx, t) => [
    beep(ctx, t, 220, 1.2, "sine", 0.06, 880),
    beep(ctx, t + 0.1, 330, 1.1, "sine", 0.05, 1100),
    noiseBurst(ctx, t, 1.2, { type: "highpass", freq: 5000 }, 0.02),
  ],
  laptop: (ctx, t) => [
    beep(ctx, t, 523, 0.3, "sine", 0.1),
    beep(ctx, t + 0.15, 784, 0.4, "sine", 0.1),
    beep(ctx, t + 0.3, 1046, 0.5, "sine", 0.1),
  ],
  drone: (ctx, t) => [
    beep(ctx, t, 180, 1.8, "sawtooth", 0.08, 240),
    beep(ctx, t, 185, 1.8, "sawtooth", 0.08, 245),
    beep(ctx, t, 178, 1.8, "sawtooth", 0.08, 238),
    noiseBurst(ctx, t, 1.8, { type: "bandpass", freq: 400, q: 2 }, 0.04),
  ],
};

export const useEraSounds = () => {
  const [loadingKey, setLoadingKey] = useState<DeviceKey | null>(null);
  const playingTimerRef = useRef<number | null>(null);

  const play = useCallback(async (key: DeviceKey) => {
    stopActive();
    const ctx = getCtx();
    if (!ctx) return;
    if (ctx.state !== "running") {
      try { await ctx.resume(); } catch { return; }
    }

    const make = synths[key];
    if (!make) return;

    const startAt = ctx.currentTime + 0.02;
    const voices = make(ctx, startAt);

    activeStop = () => voices.forEach((v) => v.stop());

    // brief loading flash for visual feedback (kept short since playback is instant)
    setLoadingKey(key);
    if (playingTimerRef.current) window.clearTimeout(playingTimerRef.current);
    playingTimerRef.current = window.setTimeout(() => {
      setLoadingKey((cur) => (cur === key ? null : cur));
    }, 250);
  }, []);

  return { play, loadingKey, loadingEra: loadingKey as Era | null };
};
