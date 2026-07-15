import { Buffer } from "node:buffer";
import { cp, mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { dirname, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");

function toPosixPath(value) {
  return value.split(sep).join("/");
}

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

async function walkFiles(root) {
  const entries = await readdir(root, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const absolutePath = resolve(root, entry.name);

    if (entry.isDirectory()) {
      files.push(...await walkFiles(absolutePath));
      continue;
    }

    if (entry.isFile()) {
      files.push(absolutePath);
    }
  }

  return files;
}

function registryNameForAsset(relativeFile, extension) {
  return relativeFile.slice(0, -extension.length);
}

async function rewriteMudLogoRegistry() {
  const logoAssetRoot = resolve(packageRoot, "src/assets/mud/logos");
  const registryFile = resolve(packageRoot, "dist/generated/mud-logos.js");
  const registry = new Map();

  for (const file of await walkFiles(logoAssetRoot)) {
    const relativeFile = toPosixPath(relative(logoAssetRoot, file));
    const extension = [".svg", ".png"].find((item) => relativeFile.endsWith(item));

    if (!extension) {
      continue;
    }

    const name = registryNameForAsset(relativeFile, extension);
    const expression =
      `new URL(${JSON.stringify(`../assets/mud/logos/${relativeFile}`)}, import.meta.url).href`;

    registry.set(name, expression);

    const lowerName = name.toLowerCase();

    if (!registry.has(lowerName)) {
      registry.set(lowerName, expression);
    }
  }

  const objectEntries = [...registry.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([name, expression]) => `  ${JSON.stringify(name)}: ${expression},`)
    .join("\n");
  const content = `const mudLogos = {
${objectEntries}
};
const mudLogoNames = Object.keys(mudLogos).sort();
export { mudLogoNames, mudLogos };
`;

  await writeFile(registryFile, content);
}

async function rewriteMudIconUrlModules() {
  const iconAssetRoot = resolve(packageRoot, "dist/assets/mud/icons");

  for (const file of await walkFiles(iconAssetRoot)) {
    if (!file.endsWith(".svg.js")) {
      continue;
    }

    const svgFile = file.slice(0, -".js".length);
    const svgContent = await readFile(svgFile);
    const dataUrl = `data:image/svg+xml;base64,${Buffer.from(svgContent).toString("base64")}`;
    const content =
      `const url = ${JSON.stringify(dataUrl)};\n` +
      "export { url as default };\n";

    await writeFile(file, content);
  }
}

async function assertNoInvalidAssetUrls() {
  const iconUrlModuleFiles = (await walkFiles(resolve(packageRoot, "dist/assets/mud/icons")))
    .filter((file) => file.endsWith(".svg.js"));
  const filesToCheck = [
    resolve(packageRoot, "dist/generated/mud-logos.js"),
    ...iconUrlModuleFiles,
  ];

  for (const file of filesToCheck) {
    const content = await readFile(file, "utf8");

    if (content.includes("\"/assets/") || content.includes("'/assets/")) {
      throw new Error(
        `${toPosixPath(relative(packageRoot, file))} contains an app-root asset URL.`,
      );
    }
  }

  for (const file of iconUrlModuleFiles) {
    const content = await readFile(file, "utf8");
    const relativeFile = toPosixPath(relative(packageRoot, file));

    if (!content.includes("data:image/svg+xml;base64,")) {
      throw new Error(`${relativeFile} does not export an encoded SVG data URL.`);
    }

    if (content.includes("new URL(")) {
      throw new Error(`${relativeFile} contains a runtime-relative SVG URL.`);
    }

    if (content.includes("/node_modules/.vite/deps/")) {
      throw new Error(`${relativeFile} contains a Vite dependency SVG URL.`);
    }
  }
}

await copyDirectory(resolve(packageRoot, "src/styles"), resolve(packageRoot, "dist/styles"), {
  extensions: [".css"],
});
await copyDirectory(
  resolve(packageRoot, "src/assets/fonts"),
  resolve(packageRoot, "dist/assets/fonts"),
);
await copyDirectory(
  resolve(packageRoot, "src/assets/mud"),
  resolve(packageRoot, "dist/assets/mud"),
);
await rewriteMudLogoRegistry();
await rewriteMudIconUrlModules();
await assertNoInvalidAssetUrls();

console.log("Package source CSS, font, and MUD assets copied to dist.");
