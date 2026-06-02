import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
    // Allow Vercel preview / sandbox hosts (e.g. *.vercel.app, *.vercel.run)
    allowedHosts: [".vercel.app", ".vercel.run", "localhost"],
    hmr: {
      overlay: false,
    },
  },
  preview: {
    host: true,
    allowedHosts: [".vercel.app", ".vercel.run", "localhost"],
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],
  },
});
