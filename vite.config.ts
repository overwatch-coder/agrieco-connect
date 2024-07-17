import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { chunkSplitPlugin } from "vite-plugin-chunk-split";

export default defineConfig({
  plugins: [react(), chunkSplitPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
