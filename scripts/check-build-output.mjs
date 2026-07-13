import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const packageJsonPath = resolve(packageRoot, "package.json");
const packageJson = await import(packageJsonPath, { with: { type: "json" } });
const manifest = packageJson.default;

const failures = [];
const expectedBuildPaths = new Set();

function collectExportValues(value) {
  if (typeof value === "string") {
    return [value];
  }

  if (!value || typeof value !== "object") {
    return [];
  }

  return Object.values(value).flatMap(collectExportValues);
}

function expectedBuildPath(packagePath) {
  if (typeof packagePath !== "string") {
    return undefined;
  }

  if (packagePath.startsWith("./dist/")) {
    return packagePath;
  }

  if (packagePath === "./src/index.ts") {
    return "./dist/index.js";
  }

  const componentMatch = packagePath.match(/^\.\/src\/components\/(.+)\.tsx$/);
  if (componentMatch) {
    return `./dist/components/${componentMatch[1]}.js`;
  }

  const styleMatch = packagePath.match(/^\.\/src\/styles\/(.+\.css)$/);
  if (styleMatch) {
    return `./dist/styles/${styleMatch[1]}`;
  }

  return undefined;
}

function addExpectedPath(label, packagePath) {
  const buildPath = expectedBuildPath(packagePath);
  if (!buildPath) {
    return;
  }

  expectedBuildPaths.add(buildPath);

  if (!existsSync(resolve(packageRoot, buildPath))) {
    failures.push(`${label} has no build output at ${buildPath}`);
  }
}

addExpectedPath("main", manifest.main);
addExpectedPath("module", manifest.module);
addExpectedPath("types", manifest.types);

for (const [exportName, exportValue] of Object.entries(manifest.exports ?? {})) {
  const values = collectExportValues(exportValue);
  for (const value of values) {
    addExpectedPath(`exports[${exportName}]`, value);
  }
}

const fontsCssPath = resolve(packageRoot, "dist/styles/fonts.css");
if (!existsSync(fontsCssPath)) {
  failures.push("dist/styles/fonts.css is missing");
} else {
  const fontsCss = readFileSync(fontsCssPath, "utf8");
  const fontUrls = [...fontsCss.matchAll(/url\(["']?([^"')]+)["']?\)/g)].map(
    ([, url]) => url,
  );

  for (const fontUrl of fontUrls) {
    if (/^(data:|https?:|\/)/.test(fontUrl)) {
      continue;
    }

    const fontPath = resolve(dirname(fontsCssPath), fontUrl);
    if (!existsSync(fontPath)) {
      failures.push(`dist/styles/fonts.css references missing font: ${fontUrl}`);
    }
  }
}

const componentsCssPath = resolve(packageRoot, "dist/styles/components.css");
if (!existsSync(componentsCssPath)) {
  failures.push("dist/styles/components.css is missing");
} else {
  const componentsCss = readFileSync(componentsCssPath, "utf8");

  if (componentsCss.includes("@source") || componentsCss.includes("tailwindcss/")) {
    failures.push("dist/styles/components.css contains uncompiled Tailwind directives");
  }

  for (const expectedRule of ["display:flex", "display:grid", "display:inline-flex"]) {
    if (!componentsCss.includes(expectedRule)) {
      failures.push(`dist/styles/components.css is missing utility output: ${expectedRule}`);
    }
  }
}

if (failures.length > 0) {
  console.error("Package build output check failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(
  `Package build output check passed for ${expectedBuildPaths.size} exported artifacts.`,
);
