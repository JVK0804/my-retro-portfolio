/** Shared Web Audio context — mobile Safari requires resume() inside the user gesture. */
let sharedCtx: AudioContext | null = null;

export const getSharedAudioContext = (): AudioContext | null => {
  if (typeof window === "undefined") return null;
  if (!sharedCtx) {
    const Ctor =
      window.AudioContext ||
      (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return null;
    sharedCtx = new Ctor();
  }
  return sharedCtx;
};

/** Call resume() synchronously from a pointer / touch / click handler. */
export const primeAudioContext = (): AudioContext | null => {
  const ctx = getSharedAudioContext();
  if (!ctx) return null;
  if (ctx.state === "suspended") {
    try {
      void ctx.resume();
    } catch {
      return null;
    }
  }
  return ctx;
};

/**
 * Run audio work inside the current user gesture when possible.
 * Schedules immediately after a synchronous resume() kick — required on iOS.
 */
export const withRunningAudioContext = (fn: (ctx: AudioContext) => void): void => {
  const ctx = primeAudioContext();
  if (!ctx) return;

  const run = () => {
    try {
      fn(ctx);
    } catch {
      // Web Audio can throw if the context was interrupted.
    }
  };

  if (ctx.state === "running") {
    run();
    return;
  }

  try {
    const pending = ctx.resume();
    if (ctx.state === "running") {
      run();
      return;
    }
    void pending.then(() => {
      if (ctx.state === "running") run();
    });
  } catch {
    // ignore
  }
};
