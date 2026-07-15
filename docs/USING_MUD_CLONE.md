# Using MUD-clone In Another Project

This guide is for anyone who needs to use `@evg-org/mud-clone` in a separate
React/Vite project.

`@evg-org/mud-clone` is the scoped package identity for versioned releases. The
repository is public and the package is `UNLICENSED`. Do not treat public
repository or registry visibility as open-source reuse permission.

The first scoped package release was:

```text
@evg-org/mud-clone@1.0.0
```

The current patch release used in access checks is:

```text
@evg-org/mud-clone@1.0.2
```

The rename from `mud-clone` to `@evg-org/mud-clone` is a one-time manual
consumer migration. After that migration, automated dependency update PRs can
track SemVer releases.

## What You Need

- A React/Vite project.
- Node.js and npm installed.
- A valid GitHub Packages npm token. Local installs need a personal access token
  classic with `read:packages`. GitHub Actions should provide a token through
  `NODE_AUTH_TOKEN`.

## 1. Install MUD-clone

In the consuming app repository, commit a project `.npmrc` that routes only the
`@evg-org` scope to GitHub Packages:

```ini
@evg-org:registry=https://npm.pkg.github.com
```

Do not commit an auth token to the repository.

For local developer installs, add the token line to your user-level `~/.npmrc`:

```ini
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

Then export a GitHub personal access token classic with `read:packages` before
installing:

```bash
export GITHUB_TOKEN=YOUR_GITHUB_PAT_CLASSIC_WITH_READ_PACKAGES
```

Install the package:

```bash
npm install @evg-org/mud-clone@^1.0.0
```

This adds the scoped package to your `package.json`:

```json
{
  "dependencies": {
    "@evg-org/mud-clone": "^1.0.0"
  }
}
```

For same-machine development before publication, use a local file dependency:

```json
{
  "dependencies": {
    "@evg-org/mud-clone": "file:../mud-clone"
  }
}
```

Do not depend on the `main` branch unless you are intentionally testing
unreleased design-system work.

## 2. Configure GitHub Actions

For GitHub Actions consumers, use `actions/setup-node` to create the runner
`.npmrc`, then pass a token through `NODE_AUTH_TOKEN` on the install step:

```yaml
permissions:
  contents: read
  packages: read

steps:
  - uses: actions/checkout@v6

  - uses: actions/setup-node@v4
    with:
      node-version: 20
      registry-url: https://npm.pkg.github.com
      scope: "@evg-org"

  - run: npm ci
    env:
      NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

For same-organization public package installs, `GITHUB_TOKEN` with
`packages: read` is usually enough. If your workflow still receives `E401` or
`E403`, create a repository or organization secret that contains a personal
access token classic with `read:packages`, then use that secret as
`NODE_AUTH_TOKEN`.

## 3. Verify Access

Before changing imports, verify that npm can read the package from GitHub
Packages:

```bash
npm view @evg-org/mud-clone@1.0.2 version --registry=https://npm.pkg.github.com
```

Expected output:

```text
1.0.2
```

If this command fails, fix package registry/authentication first. Installing the
dependency will fail for the same reason.

## 4. Import The Styles Once

Import the MUD-clone font, design-system, and component CSS once near the root
of your app. For a Vite app, this is usually `src/main.tsx`, `src/main.jsx`, or
`src/main.ts`.

```tsx
import "@evg-org/mud-clone/styles/fonts.css";
import "@evg-org/mud-clone/styles/design-system.css";
import "@evg-org/mud-clone/styles/components.css";

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
```

The component CSS is compiled and package-owned. Your app does not need to
configure Tailwind to scan `@evg-org/mud-clone` in `node_modules`. If your app
has custom CSS overrides, import those after the MUD-clone CSS.

## 5. Use Components

Use root imports for common components:

```tsx
import { Button, Tag, TextInput } from "@evg-org/mud-clone";

export function ExampleForm() {
  return (
    <form>
      <TextInput label="Request number" placeholder="578242" />
      <Tag tone="warning" variant="outlined">
        In process
      </Tag>
      <Tag tone="brand" variant="outlined" truncate>
        A very long status label that should stay inside a narrow container.
      </Tag>
      <Button type="submit">Submit</Button>
    </form>
  );
}
```

Use subpath imports for icons, logos, tables, selects, overlays, and other
larger component groups:

```tsx
import { MudIcon } from "@evg-org/mud-clone/components/mud-icon";
import { MudLogo } from "@evg-org/mud-clone/components/mud-logo";
import { Toast } from "@evg-org/mud-clone/components/toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@evg-org/mud-clone/components/select";
```

Small smoke-test component:

```tsx
import { Button, Tag, TextInput } from "@evg-org/mud-clone";
import { MudIcon } from "@evg-org/mud-clone/components/mud-icon";
import { MudLogo } from "@evg-org/mud-clone/components/mud-logo";

export function MudCloneSmokeTest() {
  return (
    <section style={{ display: "grid", gap: 16, maxWidth: 420 }}>
      <MudLogo name="gov" width={160} />
      <TextInput
        label="Search"
        placeholder="Request number"
        leadingIcon={<MudIcon name="Outlined/20/search" />}
      />
      <Tag tone="positive" variant="outlined">
        <MudIcon name="Outlined/16/checkmark-small" size="sm" />
        Connected
      </Tag>
      <Button type="button">Continue</Button>
    </section>
  );
}
```

## 6. Verify It Works In The Project

Run the project locally:

```bash
npm run dev
```

Check these things in the browser:

- MUD-clone components render.
- Component layout, spacing, hover, focus, and responsive states match the
  MUD-clone preview.
- The Onest font loads.
- `MudIcon` icons render.
- `MudLogo` logos render.
- There are no 404 errors for MUD-clone assets in the browser network tab.

Then run the production build:

```bash
npm run build
```

If your project has TypeScript checks, run them too:

```bash
npm run typecheck
```

## Open The MUD-clone Preview Pages

The preview pages live in the `mud-clone` repository itself. They are not part
of the project that consumes `@evg-org/mud-clone` as a dependency.

To open the preview pages locally, clone and run the MUD-clone preview:

```bash
git clone https://github.com/evg-org/mud-clone.git
cd mud-clone
npm install
npm run dev:preview
```

Open the Vite URL printed in the terminal. It is usually:

```text
http://localhost:5173
```

Common direct preview paths:

- `/intro`
- `/colors`
- `/typography`
- `/buttons`
- `/input-text`
- `/input-select`
- `/table`
- `/modal`
- `/icons`
- `/assets`

To verify that the preview builds for production, run:

```bash
npm run build:preview
```

The hosted GitHub Pages preview is live at:

```text
https://evg-org.github.io/mud-clone/
```

## Updating To A New Version

When a new MUD-clone release is available, update the package version in the
consuming project's `package.json`:

```json
{
  "dependencies": {
    "@evg-org/mud-clone": "^1.1.0"
  }
}
```

Then reinstall:

```bash
npm install
```

Commit the updated `package.json` and lockfile in the consuming project.

## Troubleshooting

| Error | Likely cause | Fix |
| --- | --- | --- |
| `E401 Unauthorized` | npm reached GitHub Packages but no valid token was provided. | Check that `GITHUB_TOKEN` or `NODE_AUTH_TOKEN` is set for the same command that runs `npm install`, `npm ci`, or `npm view`. For local installs, keep the auth token line in `~/.npmrc`, not the repo `.npmrc`. |
| `E403 Forbidden` | The token is valid but does not have package read access. | Use a personal access token classic with `read:packages`, or in GitHub Actions ensure `permissions: packages: read` is present. |
| npm tries `registry.npmjs.org` or reports package not found | The `@evg-org` scope is not mapped to GitHub Packages. | Add `@evg-org:registry=https://npm.pkg.github.com` to the consuming repo `.npmrc`, then reinstall. |

### `Cannot find module "@evg-org/mud-clone"`

Reinstall dependencies:

```bash
npm install
```

If it still fails, confirm the package has been published to the selected
registry and that the consuming project has registry access.

### CSS or fonts do not apply

Confirm all three CSS imports exist near the app root:

```tsx
import "@evg-org/mud-clone/styles/fonts.css";
import "@evg-org/mud-clone/styles/design-system.css";
import "@evg-org/mud-clone/styles/components.css";
```

Custom app CSS should come after these imports.

### Icons or logos do not render

Use the documented components:

```tsx
import { MudIcon } from "@evg-org/mud-clone/components/mud-icon";
import { MudLogo } from "@evg-org/mud-clone/components/mud-logo";
```

Then check the browser network tab for missing assets.

### React version mismatch

The current package supports React 18.2+ and React 19. If your project uses a
different React major version, align with the MUD-clone maintainer before
continuing.

## Do Not Do This

- Do not copy files from `mud-clone/src` into your project.
- Do not import from `@evg-org/mud-clone/src` or
  `@evg-org/mud-clone/dist` directly.
- Do not edit files inside `node_modules/@evg-org/mud-clone`.
- Do not configure Tailwind to scan `@evg-org/mud-clone` unless you are
  intentionally debugging package internals; import `styles/components.css`
  instead.
- Do not depend on the `main` branch unless you are testing unreleased changes.

Use package imports and versioned releases instead.
