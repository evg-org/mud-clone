import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const componentEntries = {
  "components/avatar": "src/components/avatar.tsx",
  "components/badge": "src/components/badge.tsx",
  "components/button": "src/components/button.tsx",
  "components/checkbox": "src/components/checkbox.tsx",
  "components/chip": "src/components/chip.tsx",
  "components/control-card-small": "src/components/control-card-small.tsx",
  "components/detail-row": "src/components/detail-row.tsx",
  "components/dialog": "src/components/dialog.tsx",
  "components/dropdown-menu": "src/components/dropdown-menu.tsx",
  "components/icon": "src/components/icon.tsx",
  "components/input": "src/components/input.tsx",
  "components/link": "src/components/link.tsx",
  "components/menu": "src/components/menu.tsx",
  "components/metric-card": "src/components/metric-card.tsx",
  "components/modal": "src/components/modal.tsx",
  "components/mud-icon": "src/components/mud-icon.tsx",
  "components/mud-logo": "src/components/mud-logo.tsx",
  "components/pagination": "src/components/pagination.tsx",
  "components/radio-group": "src/components/radio-group.tsx",
  "components/search-input": "src/components/search-input.tsx",
  "components/selection-card": "src/components/selection-card.tsx",
  "components/separator": "src/components/separator.tsx",
  "components/section-heading": "src/components/section-heading.tsx",
  "components/select": "src/components/select.tsx",
  "components/switch": "src/components/switch.tsx",
  "components/table": "src/components/table.tsx",
  "components/table-card": "src/components/table-card.tsx",
  "components/tabs": "src/components/tabs.tsx",
  "components/tag": "src/components/tag.tsx",
  "components/textarea": "src/components/textarea.tsx",
} satisfies Record<string, string>;

export default defineConfig({
  plugins: [react()],
  build: {
    assetsInlineLimit: 0,
    copyPublicDir: false,
    emptyOutDir: true,
    outDir: "dist",
    rollupOptions: {
      preserveEntrySignatures: "strict",
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "class-variance-authority",
        "clsx",
        "lucide-react",
        "tailwind-merge",
        /^@radix-ui\/react-/,
      ],
      input: {
        index: resolve(__dirname, "src/index.ts"),
        ...Object.fromEntries(
          Object.entries(componentEntries).map(([name, path]) => [
            name,
            resolve(__dirname, path),
          ]),
        ),
      },
      output: {
        assetFileNames: "assets/[name][extname]",
        chunkFileNames: "chunks/[name]-[hash].js",
        entryFileNames: "[name].js",
        format: "es",
        preserveModules: true,
        preserveModulesRoot: "src",
      },
    },
  },
});
