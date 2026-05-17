import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const playgroundRoot = fileURLToPath(new URL(".", import.meta.url));
const packageRoot = resolve(playgroundRoot, "../..");

export default defineConfig({
  root: playgroundRoot,
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@mud-clone": resolve(packageRoot, "src"),
    },
  },
  assetsInclude: ["**/*.svg"],
  build: {
    assetsInlineLimit: 0,
    emptyOutDir: true,
    outDir: "dist",
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("/src/generated/mud-icons")) {
            return "mud-icons";
          }

          if (id.includes("/src/generated/mud-logos")) {
            return "mud-logos";
          }

          if (id.includes("/node_modules/")) {
            return "vendor";
          }
        },
      },
    },
  },
});
