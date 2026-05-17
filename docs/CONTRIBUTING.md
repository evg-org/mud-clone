# Contribution Rules

These rules keep MUD-clone usable as the RSC source of truth now and as a
standalone design-system repository later.

Before making UI changes, decide whether the change is reusable design-system
work, product-specific RSC work, or a temporary migration bridge.

## Where Changes Belong

| Change type | Location | Examples |
| --- | --- | --- |
| Reusable design-system primitive | `mud-clone/src/components` | Button, Link, Select, Table, TableCard, DetailRow, MetricCard, Modal, Dialog. |
| Foundation token, asset, or style | `mud-clone/src/styles` or `mud-clone/src/assets` | Color aliases, typography, shadows, spacing, Onest fonts, MUD icons, MUD logos. |
| Package documentation | `mud-clone/docs` | Source references, migration notes, contribution rules, standalone package guidance. |
| RSC product composition | RSC app files outside `mud-clone` | Pages, routes, mock/domain data, workflow-specific layouts, product-specific copy. |
| Temporary compatibility shim | `src/app/components/ui` | Re-exporting a migrated MUD-clone primitive from the old RSC import path. |

Default rule: if the UI pattern is reusable without RSC domain data, put the
implementation in `mud-clone`. If it needs route data, workflow state, or
product-specific copy to make sense, keep that composition in RSC.

## Required Upstream Check

Before changing a MUD-mapped primitive:

1. Open [`COMPONENT_SOURCES.md`](./COMPONENT_SOURCES.md).
2. Inspect the listed upstream MUD HTML, SCSS, asset, CSS, or JavaScript
   sources.
3. Preserve upstream MUD visual states unless
   [`MIGRATION_NOTES.md`](./MIGRATION_NOTES.md) records an intentional
   MUD-clone difference.
4. Update `COMPONENT_SOURCES.md` if a new upstream source becomes relevant.
5. Update `MIGRATION_NOTES.md` if the local implementation intentionally
   differs from upstream MUD.

For MUD-clone extensions that have no one-to-one upstream component, anchor the
decision to nearby MUD foundations: typography, spacing, borders, radius,
shadows, icons, or table/card patterns.

## Adding Or Changing A Component

Use this workflow for reusable component work:

1. Check whether an existing primitive already covers the design.
2. If a new primitive is needed, create or update it under
   `mud-clone/src/components`.
3. Use MUD semantic `--color-*` tokens for color decisions and established
   non-color foundation variables for spacing, radius, type, shadows, focus,
   and sizing. Do not add new `--app-color-*` aliases.
4. Add or update the package export in `mud-clone/package.json`.
5. Add the component to the root `@mud-clone` barrel only when it is
   lightweight and does not load the MUD icon/logo registry.
6. Keep asset-heavy components subpath-only.
7. If RSC still imports the old path, keep `src/app/components/ui/...` as a
   compatibility shim that re-exports from `@mud-clone`.
8. Update docs when ownership, export policy, source references, or intentional
   differences change.
9. If MUD icon or logo assets changed, run
   `npm --prefix mud-clone run generate:assets`.
10. Run `npm --prefix mud-clone run check`.
11. Run `npm run build` from the repository root.
12. Remove generated `dist` unless the task explicitly needs build artifacts.

## Applying New Designs

When implementing new designs in RSC:

- Use `Button` for command actions.
- Use `Link` for navigation and inline text links.
- Use `Select`, `Menu`, or `DropdownMenu` for dropdown-like controls.
- Use `Table` with `TableCard` for responsive tabular data.
- Use `DetailRow` for repeated label/value rows.
- Use `Pagination` for paged record sets.
- Use `MetricCard` for dashboard count/action cards.
- Use `ControlCardSmall` for compact control-case preview cards.
- Use `SectionHeading` for reusable section titles and title/count headings.
- Use `Tag` for semantic statuses and `Badge` for counters or notification
  dots.
- Use `Modal` or `Dialog` for overlays.
- Use `Input`, `Textarea`, `SearchInput`, `Checkbox`, `RadioGroup`, `Switch`,
  and `Tabs` instead of recreating controls in pages.
- Use `MudIcon` and `MudLogo` for MUD-provided assets.

If the design repeats a pattern that is not covered here, first consider
whether it should become a MUD-clone extension. Document the decision in
[`MIGRATION_NOTES.md`](./MIGRATION_NOTES.md).

## What Stays In RSC

Keep these out of MUD-clone unless they are generalized first:

- Routes and page shells.
- Domain data, selectors, mock data, and API adapters.
- Workflow-specific modal content.
- Product-specific cards that encode RSC business meaning.
- Header/profile/notification behavior until split into reusable surface and
  product state.
- Generated Figma imports unless cleaned into reusable primitives.

## Review Checklist

Before finishing a design-system change:

- The reusable implementation lives in `mud-clone/src`.
- RSC shim files contain no independent styling or behavior.
- Upstream MUD references were checked and recorded when relevant.
- Intentional differences were recorded in `MIGRATION_NOTES.md`.
- Exports follow the root-versus-subpath policy.
- Generated asset registries are up to date when MUD icons or logos changed.
- Components use tokens instead of raw CSS values where tokens exist.
- `npm run build` passes.
