import { cp, mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { basename, dirname, relative, resolve, sep } from "node:path";
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

    const svgFileName = basename(file, ".js");
    const content =
      `const url = new URL(${JSON.stringify(`./${svgFileName}`)}, import.meta.url).href;\n` +
      "export { url as default };\n";

    await writeFile(file, content);
  }
}

async function assertNoRootAssetUrls() {
  const filesToCheck = [
    resolve(packageRoot, "dist/generated/mud-logos.js"),
    ...(await walkFiles(resolve(packageRoot, "dist/assets/mud/icons"))).filter((file) =>
      file.endsWith(".svg.js"),
    ),
  ];

  for (const file of filesToCheck) {
    const content = await readFile(file, "utf8");

    if (content.includes("\"/assets/") || content.includes("'/assets/")) {
      throw new Error(
        `${toPosixPath(relative(packageRoot, file))} contains an app-root asset URL.`,
      );
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
await assertNoRootAssetUrls();

console.log("Package CSS, font, and MUD assets copied to dist.");
