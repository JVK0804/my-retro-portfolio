import { useCallback, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type Era = "cassette" | "cd" | "mp3" | "streaming";

// Module-scope cache so clips persist across re-renders.
const audioCache = new Map<Era, HTMLAudioElement>();
let currentlyPlaying: HTMLAudioElement | null = null;

export const useEraSounds = () => {
  const [loadingEra, setLoadingEra] = useState<Era | null>(null);
  const inFlightRef = useRef<Set<Era>>(new Set());

  const stopCurrent = useCallback(() => {
    if (currentlyPlaying) {
      currentlyPlaying.pause();
      currentlyPlaying.currentTime = 0;
      currentlyPlaying = null;
    }
  }, []);

  const play = useCallback(
    async (era: Era) => {
      stopCurrent();

      const cached = audioCache.get(era);
      if (cached) {
        currentlyPlaying = cached;
        cached.currentTime = 0;
        void cached.play().catch((e) => console.warn("play failed", e));
        return;
      }

      if (inFlightRef.current.has(era)) return;
      inFlightRef.current.add(era);
      setLoadingEra(era);

      try {
        const { data, error } = await supabase.functions.invoke("generate-era-sound", {
          body: { era },
        });
        if (error) throw error;

        // supabase-js returns Blob for binary responses
        const blob =
          data instanceof Blob ? data : new Blob([data as ArrayBuffer], { type: "audio/mpeg" });
        const url = URL.createObjectURL(blob);
        const audio = new Audio(url);
        audio.preload = "auto";
        audioCache.set(era, audio);
        currentlyPlaying = audio;
        await audio.play();
      } catch (e) {
        console.error("Failed to generate era sound", e);
      } finally {
        inFlightRef.current.delete(era);
        setLoadingEra((cur) => (cur === era ? null : cur));
      }
    },
    [stopCurrent]
  );

  return { play, loadingEra };
};
