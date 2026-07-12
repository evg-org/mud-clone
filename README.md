# MUD-clone

MUD-clone is the RSC project's React implementation of the Moldova government
MUD design system, extended with reusable product patterns developed during the
RSC project.

The package is intended for internal developer consumption as
`@evg-org/mud-clone`.
Use the built package for application imports, and use the preview as the
canonical visual reference for foundations, components, and composed patterns.

## Start Here For Developers

Install dependencies and build the package before linking or consuming it:

```bash
npm install
npm run build
```

For local internal consumption from another app, use a local file dependency or
workspace link that points at this package root:

```json
{
  "dependencies": {
    "@evg-org/mud-clone": "file:../mud-clone"
  }
}
```

The first scoped registry release is `@evg-org/mud-clone@1.0.0`. The package
keeps `private: true` until legal and publication approval is granted, so do not
publish to npm until that approval is recorded. After publication, consuming
apps should install the scoped package from the chosen registry:

```bash
npm install @evg-org/mud-clone@^1.0.0
```

The package rename from `mud-clone` to `@evg-org/mud-clone` is a one-time
manual consumer migration. After that migration, automated dependency update
PRs can track SemVer releases.

Import the package CSS once near the application root, before rendering
MUD-clone components:

```tsx
import "@evg-org/mud-clone/styles/fonts.css";
import "@evg-org/mud-clone/styles/design-system.css";
```

Use root imports for the convenience component surface:

```tsx
import { Button, Tag, TextInput } from "@evg-org/mud-clone";

export function ExampleForm() {
  return (
    <form>
      <TextInput label="Request number" placeholder="578242" />
      <Tag tone="warning" variant="outlined">In process</Tag>
      <Button type="submit">Submit</Button>
    </form>
  );
}
```

Use subpath imports when a component is not exposed on the root barrel or when
you want a narrow import for an asset-heavy surface:

```tsx
import { MudIcon } from "@evg-org/mud-clone/components/mud-icon";
import { Table, TableBody, TableCell, TableRow } from "@evg-org/mud-clone/components/table";
```

## Import Contract

Package exports point at built files under `dist` and include declaration files
for TypeScript autocomplete and prop validation.

Root imports from `@evg-org/mud-clone` cover the common component surface: `Accordion`,
`Avatar`, `Badge`, `Button`, `Checkbox`, `DateInput`, `DetailRow`,
`FileInput`, `FileInputItem`, `FilterChip`, `Icon`, `InfoTag`, `Input`, `InputChip`, `Link`,
`NumericInput`, `PhoneNumberInput`, `RadioGroup`, `SearchInput`, `Separator`,
`SectionHeading`, `SegmentedControl`, `Switch`, `TableCard`, `Tabs`, `Tag`, `Tooltip`,
`TextArea`, `Textarea`, and `TextInput`.

Every component also has a subpath export. Prefer subpaths for icons, logos,
tables, selects, overlays, menus, pagination, and less common product patterns:

```tsx
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@evg-org/mud-clone/components/select";
import { Table, TableHead, TableHeader, TableRow } from "@evg-org/mud-clone/components/table";
import { Toast } from "@evg-org/mud-clone/components/toast";
import { MudLogo } from "@evg-org/mud-clone/components/mud-logo";
```

CSS exports are:

```tsx
import "@evg-org/mud-clone/styles/fonts.css";
import "@evg-org/mud-clone/styles/design-system.css";
```

The font CSS references package-owned Onest files copied into `dist/assets` by
`npm run build`. MUD icons and logos resolve package-owned assets and should be
used through `MudIcon` and `MudLogo`.

## Component Status

Status is based on the current preview navigation review flags.

| Area | Status | Notes |
| --- | --- | --- |
| Foundations: colors, typography, spacing, radius, elevation, icons | Stable | Use as the current token and asset baseline. |
| Assets foundation page | Needs review | Asset inventory is present, but final supported asset set may still be pruned. |
| Core components: Accordion, Avatar, Badge, Button, Checkbox, Chip, Date Input, Input: File, Link, Menu, Numeric Input, Radio Group, Search, Segmented Control, Select, Separator, Switch, Table, Tabs, Tag, Text inputs, Toast Message, Tooltip | Stable | Use these for new internal development. |
| Reusable patterns: Detail Row, Section Heading, Table Card | Stable | Preferred for repeated detail, section title, and responsive table-card layouts. |
| Modal | Stable | Figma-backed Modal is the package overlay component. The former Dialog export was removed because Figma defines Modal, not a separate dialog primitive. |
| Pulled-back components | RSC-owned | `MetricCard`, `MetricCardGrid`, and `ControlCardSmall` were removed from MUD-clone because they encode RSC dashboard/control-domain behavior. Create a fresh generalized card API if a reusable pattern is needed later. |
| Deprecated components | Compatibility only | `SelectionCard` remains exported from `@evg-org/mud-clone/components/selection-card` only to avoid breaking existing imports. It is RSC-specific, new usage should live in the consuming product app, and it will be removed from MUD-clone in a future cleanup. |

## Usage Recipes

### Form Controls

```tsx
import { Button, TextInput } from "@evg-org/mud-clone";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@evg-org/mud-clone/components/select";

export function PermitSearchForm() {
  return (
    <form className="grid gap-[var(--spacing-16)]">
      <TextInput
        clearable
        label="Request number"
        placeholder="Enter request number"
      />
      <Select defaultValue="all">
        <SelectTrigger aria-label="Status">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All statuses</SelectItem>
          <SelectItem value="planned">Planned</SelectItem>
          <SelectItem value="in-process">In process</SelectItem>
        </SelectContent>
      </Select>
      <Button type="submit">Search</Button>
    </form>
  );
}
```

### Table Layout

```tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@evg-org/mud-clone/components/table";
import { Tag } from "@evg-org/mud-clone";

export function RequestsTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Request</TableHead>
          <TableHead>Company</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>#578242</TableCell>
          <TableCell>EcoConstruct Cahul</TableCell>
          <TableCell dataType="tag">
            <Tag tone="warning" variant="outlined">In process</Tag>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
```

### Status Pattern

```tsx
import { Badge, Tag } from "@evg-org/mud-clone";
import { MudIcon } from "@evg-org/mud-clone/components/mud-icon";

export function StatusSummary() {
  return (
    <div className="flex items-center gap-[var(--spacing-12)]">
      <Tag tone="positive" variant="outlined">
        <MudIcon name="Outlined/16/checkmark-small" size="sm" />
        Finalized
      </Tag>
      <Badge tone="brand">3</Badge>
    </div>
  );
}
```

## Preview

Run the preview to inspect the package visually:

```bash
npm run dev:preview
npm run build:preview
```

The preview is the canonical visual catalog for this phase. It covers an intro
page, foundations, component states, and composed reusable patterns. Storybook
is intentionally deferred until package usage, type output, exports, and handoff
docs are stable; if added later, use it for isolated state review and visual
regression, not as a replacement for the preview.

## Package Scripts

```bash
npm run check            # generated assets, package exports, color aliases, typography aliases
npm run build            # library JS, declaration files, CSS assets, font assets, build validation
npm run check:consumer   # build, pack, install, typecheck, and bundle a clean temp consumer app
npm run check:release    # full release-readiness gate for CI and release candidates
npm run build:types      # declaration-only TypeScript output
npm run build:preview    # production preview build
npm run changeset        # create release notes and a SemVer bump entry
npm run version          # apply pending Changesets to package metadata and changelog
npm run release          # publish after legal/publication approval and token setup
npm run dev:preview      # local preview server
npm run build:playground # compatibility alias for build:preview
npm run dev:playground   # compatibility alias for dev:preview
npm run prepare          # lifecycle hook used by private Git installs
```

## Documentation

- [Attribution and license notes](./ATTRIBUTION.md)
- [Design system source of truth](./docs/DESIGN_SYSTEM.md)
- [Component source references](./docs/COMPONENT_SOURCES.md)
- [Using MUD-clone in another project](./docs/USING_MUD_CLONE.md)
- [Release process](./docs/RELEASES.md)
- [Changelog](./CHANGELOG.md)
- [Migration notes](./docs/MIGRATION_NOTES.md)
- [Design system usage audit](./docs/DESIGN_SYSTEM_USAGE_AUDIT.md)
- [Contribution rules](./docs/CONTRIBUTING.md)
- [RSC usage hardening](./docs/RSC_USAGE_HARDENING.md)
- [Standalone readiness](./docs/STANDALONE_READINESS.md)

## Ownership Rules

Reusable implementation belongs in `src/components`, `src/styles`, and
`src/assets`. Product-specific pages, routes, mock data, API adapters, and
workflow-specific copy stay in consuming applications.

Before changing a MUD-mapped primitive, check
[`docs/COMPONENT_SOURCES.md`](./docs/COMPONENT_SOURCES.md), preserve upstream
visual states unless an intentional difference is documented, and update
[`docs/MIGRATION_NOTES.md`](./docs/MIGRATION_NOTES.md) when behavior diverges.
