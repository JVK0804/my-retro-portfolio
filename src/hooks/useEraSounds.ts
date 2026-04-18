import { useCallback, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

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

// Module-scope cache so clips persist across re-renders / page navigations.
const audioCache = new Map<DeviceKey, HTMLAudioElement>();
let currentlyPlaying: HTMLAudioElement | null = null;

export const useEraSounds = () => {
  const [loadingKey, setLoadingKey] = useState<DeviceKey | null>(null);
  const inFlightRef = useRef<Set<DeviceKey>>(new Set());

  const stopCurrent = useCallback(() => {
    if (currentlyPlaying) {
      currentlyPlaying.pause();
      currentlyPlaying.currentTime = 0;
      currentlyPlaying = null;
    }
  }, []);

  const play = useCallback(
    async (key: DeviceKey) => {
      stopCurrent();

      const cached = audioCache.get(key);
      if (cached) {
        currentlyPlaying = cached;
        cached.currentTime = 0;
        void cached.play().catch((e) => console.warn("play failed", e));
        return;
      }

      if (inFlightRef.current.has(key)) return;
      inFlightRef.current.add(key);
      setLoadingKey(key);

      try {
        const { data, error } = await supabase.functions.invoke(
          "generate-era-sound",
          { body: { device: key } }
        );
        if (error) throw error;

        const blob =
          data instanceof Blob
            ? data
            : new Blob([data as ArrayBuffer], { type: "audio/mpeg" });
        const url = URL.createObjectURL(blob);
        const audio = new Audio(url);
        audio.preload = "auto";
        audioCache.set(key, audio);
        currentlyPlaying = audio;
        await audio.play();
      } catch (e) {
        console.error("Failed to generate device sound", e);
      } finally {
        inFlightRef.current.delete(key);
        setLoadingKey((cur) => (cur === key ? null : cur));
      }
    },
    [stopCurrent]
  );

  // Backward-compat alias kept as `loadingEra` for MorphIllustration
  return { play, loadingKey, loadingEra: loadingKey as Era | null };
};
