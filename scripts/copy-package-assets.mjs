import { cp, mkdir, readdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");

async function copyDirectory(source, destination, { extensions } = {}) {
  await mkdir(destination, { recursive: true });

  const entries = await readdir(source, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name === ".DS_Store") {
      continue;
    }

    const sourcePath = resolve(source, entry.name);
    const destinationPath = resolve(destination, entry.name);

    if (entry.isDirectory()) {
      await copyDirectory(sourcePath, destinationPath, { extensions });
      continue;
    }

    if (extensions && !extensions.some((extension) => entry.name.endsWith(extension))) {
      continue;
    }

    await cp(sourcePath, destinationPath);
  }
}

await copyDirectory(resolve(packageRoot, "src/styles"), resolve(packageRoot, "dist/styles"), {
  extensions: [".css"],
});
await copyDirectory(
  resolve(packageRoot, "src/assets/fonts"),
  resolve(packageRoot, "dist/assets/fonts"),
);

console.log("Package CSS and font assets copied to dist.");
