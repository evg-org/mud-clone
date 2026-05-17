import { readFile, readdir, writeFile } from "node:fs/promises";
import { dirname, posix, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const declarationRoot = resolve(packageRoot, "dist");

function toPosixPath(value) {
  return value.split(sep).join("/");
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

function normalizeSpecifier(specifier) {
  if (!specifier.startsWith(".") || posix.extname(specifier)) {
    return specifier;
  }

  return `${specifier}.js`;
}

function rewriteDeclarationImports(content) {
  return content.replace(
    /((?:from\s+|import\(\s*)["'])(\.[^"']+)(["'])/g,
    (_match, prefix, specifier, suffix) =>
      `${prefix}${normalizeSpecifier(specifier)}${suffix}`,
  );
}

let updatedCount = 0;

for (const file of await walkFiles(declarationRoot)) {
  if (!file.endsWith(".d.ts")) {
    continue;
  }

  const content = await readFile(file, "utf8");
  const updatedContent = rewriteDeclarationImports(content);

  if (updatedContent === content) {
    continue;
  }

  await writeFile(file, updatedContent);
  updatedCount += 1;
}

console.log(
  updatedCount === 0
    ? "Declaration imports already use ESM file extensions."
    : `Declaration imports use ESM file extensions in ${updatedCount} file(s).`,
);

for (const file of await walkFiles(declarationRoot)) {
  if (!file.endsWith(".d.ts")) {
    continue;
  }

  const content = await readFile(file, "utf8");
  const specifierPattern = /(?:from\s+|import\(\s*)["'](\.[^"']+)["']/g;

  for (const match of content.matchAll(specifierPattern)) {
    const specifier = match[1];

    if (normalizeSpecifier(specifier) !== specifier) {
      throw new Error(
        `${toPosixPath(relative(packageRoot, file))} contains an extensionless relative declaration import: ${specifier}`,
      );
    }
  }
}
