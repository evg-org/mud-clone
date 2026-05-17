import { existsSync } from "node:fs";
import { readdir, readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const forbiddenPattern = /--app-color-[A-Za-z0-9_-]+/g;
const ignoredDirs = new Set([".git", "dist", "node_modules"]);
const textFilePattern = /\.(css|scss|ts|tsx|js|jsx|mjs|cjs|html)$/;
const targets = ["src", "examples/playground/src"];
const violations = [];

function lineNumberFor(source, index) {
  return source.slice(0, index).split("\n").length;
}

async function scanFile(absolutePath) {
  const source = await readFile(absolutePath, "utf8");
  const relativePath = absolutePath.replace(`${packageRoot}/`, "");
  const matches = source.matchAll(forbiddenPattern);

  for (const match of matches) {
    violations.push(
      `${relativePath}:${lineNumberFor(source, match.index ?? 0)} uses ${match[0]}`,
    );
  }
}

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    if (ignoredDirs.has(entry.name)) continue;

    const absolutePath = resolve(dir, entry.name);

    if (entry.isDirectory()) {
      await walk(absolutePath);
      continue;
    }

    if (!textFilePattern.test(entry.name)) continue;

    await scanFile(absolutePath);
  }
}

for (const target of targets) {
  const absoluteTarget = resolve(packageRoot, target);

  if (existsSync(absoluteTarget)) {
    await walk(absoluteTarget);
  }
}

if (violations.length > 0) {
  console.error("Forbidden RSC color aliases found. Use MUD semantic --color-* tokens instead:\n");
  for (const violation of violations) {
    console.error(`- ${violation}`);
  }
  process.exit(1);
}

console.log("Color alias check passed.");
