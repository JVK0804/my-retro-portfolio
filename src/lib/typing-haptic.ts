/** Index before "✦" — haptics only while typing "Kaushik here " */
export const KAUSHIK_HERE_HAPTIC_END = "Kaushik here ✦".indexOf("✦");

const isTouchMobile = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(pointer: coarse) and (hover: none)").matches;

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const canUseTypingHaptic = () =>
  typeof navigator !== "undefined" &&
  typeof navigator.vibrate === "function" &&
  isTouchMobile() &&
  !prefersReducedMotion();

/** Very short pulse per typed character (touch mobile only). */
export const pulseTypingHaptic = () => {
  if (!canUseTypingHaptic()) return;
  navigator.vibrate(8);
};
