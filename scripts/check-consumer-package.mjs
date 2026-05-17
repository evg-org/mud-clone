import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdtemp, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";
const tempRoot = await mkdtemp(resolve(tmpdir(), "mud-clone-consumer-"));
const consumerRoot = resolve(tempRoot, "consumer");
const npmCache = resolve(tempRoot, "npm-cache");

async function run(command, args, { cwd, env = {}, timeoutMs = 180_000 } = {}) {
  const display = [command, ...args].join(" ");
  console.log(`> ${display}`);

  return new Promise((resolvePromise, rejectPromise) => {
    let settled = false;
    const child = spawn(command, args, {
      cwd,
      env: {
        ...process.env,
        ...env,
      },
      stdio: ["ignore", "pipe", "pipe"],
    });
    let stdout = "";
    let stderr = "";
    const finish = (error, result) => {
      if (settled) {
        return;
      }

      settled = true;
      clearTimeout(timeout);

      if (error) {
        rejectPromise(error);
        return;
      }

      resolvePromise(result);
    };
    const timeout = setTimeout(() => {
      child.kill("SIGTERM");
      finish(
        new Error(
          [
            `Command timed out after ${timeoutMs}ms: ${display}`,
            stdout.trim(),
            stderr.trim(),
          ]
            .filter(Boolean)
            .join("\n"),
        ),
      );
    }, timeoutMs);

    child.stdout.on("data", (chunk) => {
      stdout += chunk;
    });
    child.stderr.on("data", (chunk) => {
      stderr += chunk;
    });
    child.on("error", (error) => {
      finish(error);
    });
    child.on("close", (code, signal) => {
      if (code === 0) {
        finish(undefined, { stdout, stderr });
        return;
      }

      finish(
        new Error(
          [
            `Command failed with ${code === null ? `signal ${signal}` : `exit code ${code}`}: ${display}`,
            stdout.trim(),
            stderr.trim(),
          ]
            .filter(Boolean)
            .join("\n"),
        ),
      );
    });
  });
}

async function writeJson(filePath, value) {
  await writeFile(`${filePath}`, `${JSON.stringify(value, null, 2)}\n`);
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

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

async function packPackage() {
  const { stdout } = await run(
    npmCommand,
    ["pack", "--silent", "--pack-destination", tempRoot],
    {
      cwd: packageRoot,
      env: {
        npm_config_cache: npmCache,
      },
    },
  );
  const tarballName = stdout.trim().split(/\r?\n/).filter(Boolean).at(-1);

  assert(tarballName, "npm pack did not return a tarball name.");

  const tarballPath = resolve(tempRoot, tarballName);

  assert(existsSync(tarballPath), `Packed tarball is missing: ${tarballPath}`);

  return tarballPath;
}

async function createConsumerApp(tarballPath) {
  await mkdir(resolve(consumerRoot, "src"), { recursive: true });
  await writeJson(resolve(consumerRoot, "package.json"), {
    private: true,
    type: "module",
    scripts: {
      build: "vite build",
      smoke: "node index.mjs",
      typecheck: "tsc -p tsconfig.json",
    },
    dependencies: {
      "mud-clone": `file:${tarballPath}`,
      react: "18.3.1",
      "react-dom": "18.3.1",
    },
    devDependencies: {
      "@types/react": "18.3.28",
      "@types/react-dom": "18.3.7",
      typescript: "5.9.3",
      vite: "6.3.5",
    },
  });
  await writeJson(resolve(consumerRoot, "tsconfig.json"), {
    compilerOptions: {
      allowSyntheticDefaultImports: true,
      jsx: "react-jsx",
      module: "NodeNext",
      moduleResolution: "NodeNext",
      noEmit: true,
      strict: true,
      target: "ES2022",
    },
    include: ["usage.tsx"],
  });
  await writeFile(
    resolve(consumerRoot, "index.html"),
    '<div id="root"></div>\n<script type="module" src="/src/main.jsx"></script>\n',
  );
  await writeFile(
    resolve(consumerRoot, "index.mjs"),
    `import { existsSync } from "node:fs";
import { Button, Tag, TextInput } from "mud-clone";
import { MudIcon } from "mud-clone/components/mud-icon";
import { MudLogo, getMudLogoUrl } from "mud-clone/components/mud-logo";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

for (const cssExport of [
  "mud-clone/styles/fonts.css",
  "mud-clone/styles/design-system.css",
]) {
  const resolved = new URL(import.meta.resolve(cssExport));

  if (!existsSync(resolved)) {
    throw new Error(\`Missing CSS export: \${cssExport}\`);
  }
}

const govLogoUrl = getMudLogoUrl("gov");

if (!govLogoUrl || govLogoUrl.includes("/assets/gov.svg")) {
  throw new Error(\`Unexpected logo URL: \${govLogoUrl}\`);
}

const markup = renderToStaticMarkup(
  React.createElement(
    "main",
    null,
    React.createElement(MudLogo, { name: "gov", width: 120 }),
    React.createElement(TextInput, {
      label: "Search",
      placeholder: "Document number",
      leadingIcon: React.createElement(MudIcon, {
        name: "Outlined/20/search",
        size: 20,
      }),
    }),
    React.createElement(Tag, { color: "#578242" }, "Active"),
    React.createElement(Button, { type: "button" }, "Submit"),
  ),
);

if (!markup.includes("Search") || !markup.includes("#578242")) {
  throw new Error("Rendered package markup did not include expected content.");
}

console.log("consumer smoke passed");
`,
  );
  await writeFile(
    resolve(consumerRoot, "usage.tsx"),
    `import "mud-clone/styles/fonts.css";
import "mud-clone/styles/design-system.css";

import { Button, Tag, TextInput } from "mud-clone";
import { MudIcon } from "mud-clone/components/mud-icon";
import { MudLogo } from "mud-clone/components/mud-logo";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "mud-clone/components/table";

export function UsageSmoke() {
  return (
    <main>
      <MudLogo name="gov" width={120} />
      <TextInput
        label="Request number"
        leadingIcon={<MudIcon name="Outlined/20/search" />}
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Request</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>578242</TableCell>
            <TableCell>
              <Tag color="#578242">Active</Tag>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Button type="button">Submit</Button>
    </main>
  );
}
`,
  );
  await writeFile(
    resolve(consumerRoot, "src/main.jsx"),
    `import "mud-clone/styles/fonts.css";
import "mud-clone/styles/design-system.css";

import { Button, Tag, TextInput } from "mud-clone";
import { MudIcon } from "mud-clone/components/mud-icon";
import { MudLogo } from "mud-clone/components/mud-logo";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "mud-clone/components/select";
import React from "react";
import { createRoot } from "react-dom/client";

function App() {
  return React.createElement(
    "main",
    { className: "grid gap-[var(--spacing-16)] p-[var(--spacing-24)]" },
    React.createElement(MudLogo, { name: "gov", width: 120 }),
    React.createElement(TextInput, {
      label: "Request number",
      placeholder: "578242",
      leadingIcon: React.createElement(MudIcon, {
        name: "Outlined/20/search",
      }),
    }),
    React.createElement(
      Select,
      { defaultValue: "active" },
      React.createElement(
        SelectTrigger,
        { "aria-label": "Status" },
        React.createElement(SelectValue, { placeholder: "Status" }),
      ),
      React.createElement(
        SelectContent,
        null,
        React.createElement(SelectItem, { value: "active" }, "Active"),
        React.createElement(SelectItem, { value: "paused" }, "Paused"),
      ),
    ),
    React.createElement(Tag, { color: "#578242" }, "Active"),
    React.createElement(Button, { type: "button" }, "Submit"),
  );
}

createRoot(document.getElementById("root")).render(React.createElement(App));
`,
  );
}

async function validateBuiltConsumerAssets() {
  const assetRoot = resolve(consumerRoot, "dist/assets");
  const files = await walkFiles(assetRoot);
  const relativeNames = files.map((file) => file.slice(assetRoot.length + 1));
  const hasCss = relativeNames.some((file) => file.endsWith(".css"));
  const hasFont = relativeNames.some((file) => file.endsWith(".woff"));
  const hasGovLogo = relativeNames.some((file) => file.includes("gov") && file.endsWith(".svg"));
  const hasSearchIcon = relativeNames.some((file) => file.includes("search"));

  assert(hasCss, "Consumer Vite build did not emit CSS.");
  assert(hasFont, "Consumer Vite build did not emit Onest font assets.");
  assert(hasGovLogo, "Consumer Vite build did not emit a MUD logo asset.");
  assert(hasSearchIcon, "Consumer Vite build did not emit a MUD search icon asset.");

  const jsFiles = files.filter((file) => file.endsWith(".js"));
  for (const file of jsFiles) {
    const content = await readFile(file, "utf8");

    assert(
      !content.includes('"/assets/gov.svg') && !content.includes("'/assets/gov.svg"),
      `Consumer bundle contains an app-root logo URL in ${file}.`,
    );
  }
}

try {
  console.log(`Using temp consumer workspace: ${consumerRoot}`);
  const tarballPath = await packPackage();

  await createConsumerApp(tarballPath);
  await run(npmCommand, ["install", "--silent", "--no-audit", "--no-fund"], {
    cwd: consumerRoot,
    timeoutMs: 300_000,
  });
  await run(npmCommand, ["run", "--silent", "smoke"], { cwd: consumerRoot });
  await run(npmCommand, ["run", "--silent", "typecheck"], { cwd: consumerRoot });
  await run(npmCommand, ["run", "--silent", "build"], { cwd: consumerRoot });
  await validateBuiltConsumerAssets();
  console.log("Clean consumer package validation passed.");
  await rm(tempRoot, { force: true, recursive: true });
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  console.error(`Temp consumer workspace retained for inspection: ${consumerRoot}`);
  process.exit(1);
}
