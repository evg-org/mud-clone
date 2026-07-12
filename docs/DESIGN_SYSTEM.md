# MUD-clone Design System

## Source Of Truth

MUD-clone is the local React implementation of Moldova's government MUD /
Unitar Design System, enhanced with reusable product patterns developed during
the RSC project.

External reference:

- Upstream repository: <https://github.com/egov-moldova/design-system/tree/main>
- Public reference linked by upstream: <https://mud.egov.md>

Component-level upstream references are tracked in
[`COMPONENT_SOURCES.md`](./COMPONENT_SOURCES.md).
Intentional differences between upstream MUD and MUD-clone are tracked in
[`MIGRATION_NOTES.md`](./MIGRATION_NOTES.md).
Rules for adding or changing reusable primitives are tracked in
[`CONTRIBUTING.md`](./CONTRIBUTING.md).
Current RSC usage hardening and promotion priorities are tracked in
[`RSC_USAGE_HARDENING.md`](./RSC_USAGE_HARDENING.md).
Standalone extraction readiness is tracked in
[`STANDALONE_READINESS.md`](./STANDALONE_READINESS.md).
Color alias removal is tracked in
[`COLOR_ALIAS_REMOVAL.md`](./COLOR_ALIAS_REMOVAL.md).
Foundation usage and reviewed component adoption are tracked in
[`DESIGN_SYSTEM_USAGE_AUDIT.md`](./DESIGN_SYSTEM_USAGE_AUDIT.md).

The upstream repository is a reference source, not a vendored dependency. Local
tokens, assets, and React primitives live in this package so product work can
move predictably while still tracking MUD.

Standalone extraction work is currently paused. The active priority is making
RSC consistently use `mud-clone` as its design-system source of truth.

## Local Foundations

The current package baseline is:

- `src/styles/design-system.css`: MUD-derived palette, typography, spacing,
  radius, shadows, semantic tokens, and temporary compatibility aliases.
- `src/styles/fonts.css`: Onest font declarations.
- `src/assets/fonts/onest`: copied Onest font files.
- `src/assets/mud`: copied MUD icons and logos.
- `src/components/mud-icon.tsx`: helper for MUD icons.
- `src/components/mud-logo.tsx`: helper for MUD logos.

## Consuming App Integration

When a consuming app imports source-path components from `mud-clone/src`, its
Tailwind entry must include `mud-clone/src/**/*.{js,ts,jsx,tsx}` as a source.
For RSC, this is done in `src/styles/tailwind.css`.

The CSS/font files record the upstream commit used for the initial extraction:

```text
eb9370580402a29ab7e7917aeca905e107b0bd77
```

## Component Ownership

Reusable design-system primitives belong in `src/components`.

Product-specific pages, domain data, routing, workflows, and one-off product
composition belong in the consuming application, not in MUD-clone.

When a component is migrated into MUD-clone, the consuming app may keep an old
import path as a compatibility shim during migration, but the implementation
must live here.

## Export Policy

Use the root `@evg-org/mud-clone` barrel only for lightweight components that
do not load asset registries.

Use component subpaths for components that load MUD icon/logo registries or are
otherwise better kept isolated from unrelated imports.

Every migrated component should also have a package subpath export so future
standalone package consumers can import narrowly.

Root exports:

- `Avatar`
- `Badge`
- `Button`
- `DateInput`
- `DetailRow`
- `FileInput` and `FileInputItem`
- `Icon`
- `Input`
- `Link`
- `NumericInput`
- `PhoneNumberInput`
- `RadioGroup` and `RadioGroupItem`
- `SectionHeading`
- `SegmentedControl` and `SegmentedControlItem`
- `Switch`
- `TableCard` and related `TableCard*` primitives
- `Tabs` and related `Tabs*` primitives
- `Tag`
- `Tooltip`
- `Textarea`

Subpath-only exports:

- `@evg-org/mud-clone/components/checkbox`
- `@evg-org/mud-clone/components/dropdown-menu`
- `@evg-org/mud-clone/components/menu`
- `@evg-org/mud-clone/components/modal`
- `@evg-org/mud-clone/components/mud-icon`
- `@evg-org/mud-clone/components/mud-logo`
- `@evg-org/mud-clone/components/pagination`
- `@evg-org/mud-clone/components/search-input`
- `@evg-org/mud-clone/components/select`
- `@evg-org/mud-clone/components/table`
- `@evg-org/mud-clone/components/toast`
- `@evg-org/mud-clone/styles/design-system.css`
- `@evg-org/mud-clone/styles/fonts.css`

Deprecated compatibility-only subpath export:

- `@evg-org/mud-clone/components/selection-card` remains available to avoid
  breaking existing imports, but `SelectionCard` is RSC-specific and should not
  be used for new MUD-clone work. New usage should live in the consuming
  product app; this export will be removed from MUD-clone in a future cleanup.

## Primitive Usage Rules

When implementing a new design, first identify whether the design maps to an
existing primitive. Do not recreate these patterns ad hoc in product pages.

- Actions: use `Button` for command buttons, icon-only buttons, and text
  actions.
- Links: use `Link` for navigation and inline text links. It supports
  `primary`, `strict`, and `white` styles; `lg`, `md`, `sm`, and `xs` sizes;
  `regular` and `medium` typography weights; underline variants; optional
  visited styling; and pointer/touch target sizing.
- Menus: use `Menu` or `DropdownMenu` for compact action menus, contextual
  menus, menu groups, separators, checkbox/radio items, and submenus.
- Tables and record lists: use `Table` for large-screen tabular data and
  `TableCard` for small-screen card alternatives. `TableHead` truncates long
  titles after 2 lines by default; text, link, and number `TableCell` values
  truncate after 5 lines by default. Use `maxLines="none"` only when the full
  value is required and the row may expand. For multiple tags in one cell, wrap
  `Tag` items in `TagGroup` inside `TableCell dataType="tag"` so the tags wrap
  onto following lines within the cell width.
- Section headings: use `SectionHeading` for section titles and title/count
  combinations that use the shared heading-small typography.
- Detail rows: use `DetailRow` for label/value rows in cards, details pages,
  and modals.
- Pagination: use `Pagination` and related primitives from
  `@evg-org/mud-clone/components/pagination` for paged record sets.
- Selects and dropdown-like inputs: use `Select`; do not hand-code trigger,
  dropdown, selected, hover, focus, or disabled states in pages.
- Status labels and semantic chips: use `Tag` for statuses such as planned, in
  process, finalized, signed, or validation states. Use `Badge` only for
  compact counters, notification dots, or short numeric indicators. `Tag` now
  supports `truncate` for constrained layouts (set `truncate` to `true`), while
  the default behavior keeps full labels untruncated and allows horizontal
  growth when space allows.
- Modals: use `Modal` for overlay flows, including compact confirmations.
  MUD-clone does not ship a separate dialog primitive because Figma defines
  Modal as the overlay component.
- Tabbed views: use `Tabs`, `TabsList`, `TabsTrigger`, and `TabsContent`.
- Tooltips: use `Tooltip` for brief contextual hints on hover/focus and
  `TooltipBubble` for static documentation/previews. Keep rich walkthrough or
  product-tour state in the consuming app.
- Toast messages: use `Toast` from `@evg-org/mud-clone/components/toast` for
  brief event feedback. Keep toast queues, timers, portals, routing, and
  product-specific notification behavior in the consuming app.
- Checkboxes: use `Checkbox`.
- Radio controls: use `RadioGroup` and `RadioGroupItem`.
- Segmented controls: use `SegmentedControl` for compact single-choice mode
  switches with concise labels.
- Switches: use `Switch`.
- Text, numeric, phone, date, search, and file inputs: use `Input`,
  `NumericInput`, `PhoneNumberInput`, `DateInput`, `Textarea`, `SearchInput`,
  and `FileInput`. Use `FileInputItem` for uploaded file rows.
- Icons and logos: use `MudIcon` and `MudLogo`; do not paste inline SVGs for
  MUD-provided assets.
- Typography: use semantic text tokens or established text primitives. Do not
  hard-code font families, sizes, weights, or line heights when a token exists.
- Foundations: use MUD semantic color variables such as
  `--color-background-*`, `--color-text-*`, `--color-border-*`,
  `--color-link-*`, and `--color-icon-*` for color. Existing `--app-color-*`
  aliases are temporary compatibility only and should not be used in new code.
  For typography, use responsive MUD `--text-*` tokens; the former
  `--app-type-*` compatibility aliases have been removed and are blocked by
  checks. Spacing, radius, and elevation aliases are under audit; do not add
  new general-purpose `--app-space-*`, `--app-radius-*`, or `--app-shadow-*`
  aliases. Continue using existing aliases only while current code is being
  migrated. Avoid raw hex colors and arbitrary pixel values unless they
  introduce a reusable local token.

## Upstream Update Checks

From time to time, compare upstream `main` against the recorded source commit:

```bash
git ls-remote https://github.com/egov-moldova/design-system.git refs/heads/main
```

If upstream changed, inspect the diff before copying anything:

```bash
git clone --depth 1 https://github.com/egov-moldova/design-system.git /tmp/mud-design-system
```

Review these areas first:

- Token or SCSS changes that affect color, type, spacing, radius, focus, or
  semantic component values.
- New or renamed icons/logos under upstream component assets.
- Component CSS that maps directly to existing primitives such as `Button`,
  `Input`, `Select`, `Badge`, `Modal`, `Table`, `Tabs`, and navigation
  elements.

When adopting upstream changes, update local files intentionally and refresh
the source commit comments in touched files. Do not add new `--app-color-*`
aliases; keep existing ones only until current usage has been migrated to MUD
semantic color tokens.

## Implementation Audit

Before finishing UI work, check:

- Are repeated records implemented with `Table` plus `TableCard` where
  appropriate?
- Are label/value rows using `DetailRow`?
- Are actions using shared `Button` variants without local typography or
  padding overrides?
- Are navigation and inline text links using `Link`?
- Are compact action/contextual menus using `Menu` primitives?
- Are statuses using `Tag`, and counters/dots using `Badge`?
- Are selects/dropdowns using `Select`?
- Are modal/overlay/feedback patterns using `Modal`, `Tooltip`, or `Toast`?
- Are icons/logos coming from `MudIcon` or `MudLogo`?
- Are typography, shadows, borders, spacing, and colors token-based?

## Pulled Back To RSC

`MetricCard`, `MetricCardGrid`, and `ControlCardSmall` were removed from
MUD-clone and pulled back to RSC because they encode RSC dashboard and
control-domain behavior. They should not be imported from MUD-clone. If a
generic reusable card pattern is needed later, create a new generalized
component with a fresh API instead of restoring these RSC-specific components.
