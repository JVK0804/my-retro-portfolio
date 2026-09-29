const pad2 = (n: number) => String(n).padStart(2, "0");

/** HH:MM:SS since the page was opened (performance.now() starts at navigation). */
export const formatUptime = (ms: number) => {
  const total = Math.floor(ms / 1000);
  return `${pad2(Math.floor(total / 3600))}:${pad2(Math.floor((total % 3600) / 60))}:${pad2(total % 60)}`;
};
