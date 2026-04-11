import { createContext, useContext } from "react";
import useSoundEffects from "@/hooks/useSoundEffects";

type SoundContextType = ReturnType<typeof useSoundEffects>;

const SoundContext = createContext<SoundContextType | null>(null);

export const SoundProvider = ({ children }: { children: React.ReactNode }) => {
  const sound = useSoundEffects();
  return <SoundContext.Provider value={sound}>{children}</SoundContext.Provider>;
};

export const useSound = () => {
  const ctx = useContext(SoundContext);
  if (!ctx) throw new Error("useSound must be inside SoundProvider");
  return ctx;
};
