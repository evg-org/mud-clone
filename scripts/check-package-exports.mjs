import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const packageJsonPath = resolve(packageRoot, "package.json");
const packageJson = await import(packageJsonPath, { with: { type: "json" } });
const manifest = packageJson.default;

const failures = [];

function checkPath(label, value) {
  if (typeof value !== "string") {
    return;
  }

  if (!value.startsWith("./")) {
    failures.push(`${label} must be a relative package path: ${value}`);
    return;
  }

  const sourcePath = sourcePathForPackagePath(value);
  const absolutePath = resolve(packageRoot, sourcePath ?? value);

  if (!existsSync(absolutePath)) {
    const expectedPath = sourcePath ? `${value} (source: ${sourcePath})` : value;
    failures.push(`${label} points to a missing file: ${expectedPath}`);
  }
}

checkPath("main", manifest.main);
checkPath("module", manifest.module);
checkPath("types", manifest.types);

function sourcePathForPackagePath(packagePath) {
  if (typeof packagePath !== "string" || !packagePath.startsWith("./dist/")) {
    return undefined;
  }

  if (packagePath === "./dist/index.js" || packagePath === "./dist/index.d.ts") {
    return "./src/index.ts";
  }

  const componentMatch = packagePath.match(
    /^\.\/dist\/components\/(.+)\.(?:js|d\.ts)$/,
  );
  if (componentMatch) {
    return `./src/components/${componentMatch[1]}.tsx`;
  }

  const styleMatch = packagePath.match(/^\.\/dist\/styles\/(.+\.css)$/);
  if (styleMatch) {
    return `./src/styles/${styleMatch[1]}`;
  }

  failures.push(`Cannot map build path to a source file: ${packagePath}`);
  return undefined;
}

for (const [exportName, exportValue] of Object.entries(manifest.exports ?? {})) {
  if (typeof exportValue === "string") {
    checkPath(`exports[${exportName}]`, exportValue);
    continue;
  }

  if (exportValue && typeof exportValue === "object") {
    for (const [condition, conditionValue] of Object.entries(exportValue)) {
      checkPath(`exports[${exportName}].${condition}`, conditionValue);
    }
  }
}

if (failures.length > 0) {
  console.error("Package export check failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Package export check passed.");
