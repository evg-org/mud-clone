# Using MUD-clone In Another Project

This guide is for anyone who needs to use `@evg-org/mud-clone` in a separate
React/Vite project.

`@evg-org/mud-clone` is the scoped package identity for versioned releases. The
repository is public, but the package remains `private: true` and `UNLICENSED`
until legal and publication approval is granted. Do not treat public repository
visibility as open-source reuse permission.

The first scoped package release is:

```text
@evg-org/mud-clone@1.0.0
```

The rename from `mud-clone` to `@evg-org/mud-clone` is a one-time manual
consumer migration. After that migration, automated dependency update PRs can
track SemVer releases.

## What You Need

- A React/Vite project.
- Node.js and npm installed.
- Access to the package registry selected for `@evg-org/mud-clone`.

## 1. Install MUD-clone

After the scoped package is published, install the package from the selected
registry:

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

## 2. Import The Styles Once

Import the MUD-clone font and design-system CSS once near the root of your app.
For a Vite app, this is usually `src/main.tsx`, `src/main.jsx`, or
`src/main.ts`.

```tsx
import "@evg-org/mud-clone/styles/fonts.css";
import "@evg-org/mud-clone/styles/design-system.css";

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
```

If your app has custom CSS overrides, import those after the MUD-clone CSS.

## 3. Use Components

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

## 4. Verify It Works In The Project

Run the project locally:

```bash
npm run dev
```

Check these things in the browser:

- MUD-clone components render.
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

### `Cannot find module "@evg-org/mud-clone"`

Reinstall dependencies:

```bash
npm install
```

If it still fails, confirm the package has been published to the selected
registry and that the consuming project has registry access.

### CSS or fonts do not apply

Confirm both CSS imports exist near the app root:

```tsx
import "@evg-org/mud-clone/styles/fonts.css";
import "@evg-org/mud-clone/styles/design-system.css";
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

The current package expects React 18. If your project uses a different React
major version, align with the MUD-clone maintainer before continuing.

## Do Not Do This

- Do not copy files from `mud-clone/src` into your project.
- Do not import from `@evg-org/mud-clone/src` or
  `@evg-org/mud-clone/dist` directly.
- Do not edit files inside `node_modules/@evg-org/mud-clone`.
- Do not depend on the `main` branch unless you are testing unreleased changes.

Use package imports and versioned releases instead.
