import { resolve } from "node:path";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

function isCssAsset(assetInfo: {
  name?: string;
  names?: string[];
  originalFileNames?: string[];
}) {
  return [
    assetInfo.name,
    ...(assetInfo.names ?? []),
    ...(assetInfo.originalFileNames ?? []),
  ].some((name) => name?.endsWith(".css"));
}

export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    copyPublicDir: false,
    emptyOutDir: false,
    outDir: "dist",
    rollupOptions: {
      input: {
        components: resolve(__dirname, "src/styles/components.css"),
      },
      output: {
        assetFileNames(assetInfo) {
          if (isCssAsset(assetInfo)) {
            return "styles/[name][extname]";
          }

          return "assets/[name][extname]";
        },
        chunkFileNames: "chunks/[name]-[hash].js",
        entryFileNames: "chunks/[name].js",
      },
    },
  },
});
