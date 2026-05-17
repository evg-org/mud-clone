# Using MUD-clone In A React/Vite Prototype

This guide is for designers or developers who want to use `mud-clone` in a
separate React/Vite prototype project.

`mud-clone` is currently a private internal design-system package. It is not
published to npm. Install it from the private GitHub repository using the
prototype tag below.

## What You Need

- A React/Vite project.
- Node.js and npm installed.
- Read access to the private GitHub repository:
  `https://github.com/evgheniif/mud-clone`.
- GitHub SSH access configured on your machine.

The current prototype package tag is:

```text
v0.0.1-prototype.1
```

## 1. Confirm GitHub Access

From your terminal, verify that GitHub SSH works:

```bash
ssh -T git@github.com
```

If this fails with a permission error, ask for access to the private
`evgheniif/mud-clone` repository and make sure your SSH key is added to GitHub.

## 2. Install MUD-clone

In your prototype project, install the tagged package:

```bash
npm install git+ssh://git@github.com/evgheniif/mud-clone.git#v0.0.1-prototype.1
```

This adds `mud-clone` to your `package.json`. It should look like this:

```json
{
  "dependencies": {
    "mud-clone": "git+ssh://git@github.com/evgheniif/mud-clone.git#v0.0.1-prototype.1"
  }
}
```

Keep the tag in the dependency string. Do not depend on `main` unless you are
intentionally testing unreleased design-system work.

## 3. Import The Styles Once

Import the MUD-clone font and design-system CSS once near the root of your app.
For a Vite app, this is usually `src/main.tsx`, `src/main.jsx`, or
`src/main.ts`.

```tsx
import "mud-clone/styles/fonts.css";
import "mud-clone/styles/design-system.css";

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
```

If your app has custom CSS overrides, import those after the MUD-clone CSS.

## 4. Use Components

Use root imports for common components:

```tsx
import { Button, Tag, TextInput } from "mud-clone";

export function ExampleForm() {
  return (
    <form>
      <TextInput label="Request number" placeholder="578242" />
      <Tag tone="warning" variant="outlined">
        In process
      </Tag>
      <Button type="submit">Submit</Button>
    </form>
  );
}
```

Use subpath imports for icons, logos, tables, selects, overlays, and other
larger component groups:

```tsx
import { MudIcon } from "mud-clone/components/mud-icon";
import { MudLogo } from "mud-clone/components/mud-logo";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "mud-clone/components/select";
```

Small smoke-test component:

```tsx
import { Button, Tag, TextInput } from "mud-clone";
import { MudIcon } from "mud-clone/components/mud-icon";
import { MudLogo } from "mud-clone/components/mud-logo";

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

## 5. Verify It Works

Run the prototype locally:

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

## Updating To A New Version

When a new MUD-clone prototype tag is shared, update the tag in `package.json`:

```json
{
  "dependencies": {
    "mud-clone": "git+ssh://git@github.com/evgheniif/mud-clone.git#NEW_TAG"
  }
}
```

Then reinstall:

```bash
npm install
```

Commit the updated `package.json` and lockfile in your prototype repo.

## GitHub Actions Or CI

If your prototype builds in GitHub Actions, the workflow also needs read access
to the private `mud-clone` repository.

Use one of these:

- A deploy key with read access to `evgheniif/mud-clone`.
- A GitHub token that can read the private repository.

Without this access, CI installs will fail even if local install works.

## Troubleshooting

### Permission denied when installing

Your machine cannot read the private repository. Confirm SSH access:

```bash
ssh -T git@github.com
```

Then ask for access to `evgheniif/mud-clone` if needed.

### `Cannot find module "mud-clone"`

Reinstall dependencies:

```bash
npm install
```

If it still fails, delete `node_modules` and the lockfile, then install again.

### CSS or fonts do not apply

Confirm both CSS imports exist near the app root:

```tsx
import "mud-clone/styles/fonts.css";
import "mud-clone/styles/design-system.css";
```

Custom app CSS should come after these imports.

### Icons or logos do not render

Use the documented components:

```tsx
import { MudIcon } from "mud-clone/components/mud-icon";
import { MudLogo } from "mud-clone/components/mud-logo";
```

Then check the browser network tab for missing assets.

### React version mismatch

The current prototype package expects React 18. If your project uses a different
React major version, align with the MUD-clone maintainer before continuing.

## Do Not Do This

- Do not copy files from `mud-clone/src` into your prototype.
- Do not import from `mud-clone/src` or `mud-clone/dist` directly.
- Do not edit files inside `node_modules/mud-clone`.
- Do not depend on the `main` branch unless you are testing unreleased changes.

Use the package imports and the tagged Git dependency instead.
