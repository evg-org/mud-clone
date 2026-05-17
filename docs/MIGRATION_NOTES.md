# Migration Notes

This document records intentional differences between upstream MUD and
MUD-clone. Use it when deciding whether a design-system change should follow
upstream exactly, extend MUD-clone, or stay in the consuming product.

Related references:

- [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md): source-of-truth and usage rules.
- [`COMPONENT_SOURCES.md`](./COMPONENT_SOURCES.md): upstream MUD files to
  inspect before changing a primitive.
- [`COLOR_ALIAS_REMOVAL.md`](./COLOR_ALIAS_REMOVAL.md): migration map for
  removing local `--app-color-*` compatibility aliases.
- [`TYPOGRAPHY_ALIAS_REMOVAL.md`](./TYPOGRAPHY_ALIAS_REMOVAL.md): migration
  map for the removed local `--app-type-*` compatibility aliases.

## Terms

- **Upstream MUD**: the reference implementation in
  <https://github.com/egov-moldova/design-system/tree/main>.
- **MUD-clone**: this package's React implementation of MUD, with reusable
  enhancements added during RSC work.
- **RSC integration**: product pages, domain data, routing, workflows, and
  compatibility shims in the current RSC app.

## Current Differences

| Area | Difference | Reason | Rule |
| --- | --- | --- | --- |
| Implementation model | Upstream MUD provides HTML, SCSS, assets, generated CSS, and small JavaScript helpers. MUD-clone provides TypeScript React primitives. | RSC needs reusable app components with typed props and accessible behavior. | Preserve MUD visual states, but implement interactions with React/Radix primitives where already established. |
| Color token API | MUD-clone keeps MUD primitive and semantic color tokens. Existing `--app-color-*` aliases are local compatibility aliases, not upstream MUD tokens. | The aliases were useful during RSC migration, but they duplicate MUD semantic color intent and make the public foundation harder to understand. | Do not add new `--app-color-*` aliases. Use MUD semantic color tokens for new code and migrate existing alias usage before removal. |
| Typography | MUD-clone follows the MUD/Figma desktop and mobile scale, with local heading and strong text weight resolved through `--ds-font-weight-semibold`, currently `500`. The former `--app-type-*` aliases were removed after migration to responsive `--text-*` tokens. | The RSC prototype chose medium headings as the reusable product baseline, and the aliases helped migration from page-local styles. | Use responsive MUD `--text-*` typography tokens/classes for new code. Do not add `--app-type-*` usage, and do not hard-code font size, line height, letter spacing, or weight in pages. |
| Shadows | MUD-clone stores MUD/Figma shadow presets as foundation tokens such as `--app-shadow-300`. | Dropdowns and overlays need the layered shadow effect without fake border styling. | Use shadow tokens for popovers/dropdowns; add an actual border only when the component spec calls for one. |
| Assets | Fonts, MUD icons, and MUD logos are copied into `mud-clone/src/assets`. | The package should work without loading assets from upstream at runtime. | Use `MudIcon` and `MudLogo`; update copied assets intentionally after an upstream review. |
| Exports | Some primitives are root exports, while asset-heavy primitives stay subpath-only. | Importing `Button`, `Input`, or `Link` should not pull in the full icon/logo registry. | Root barrel exports are for lightweight primitives. Components that load `MudIcon` or `MudLogo` should remain subpath-only. |
| Compatibility shims | RSC keeps old files under `src/app/components/ui` that re-export MUD-clone components. | This lets product migration proceed incrementally. | New implementation work belongs in `mud-clone/src`, not in shim files. |
| Select and Menu | Visual states follow MUD/Figma, while behavior is implemented through Radix Select and Radix Dropdown Menu. | Radix provides keyboard, focus, and ARIA behavior that the React app needs. | Preserve MUD dimensions, selected state, hover, focus, disabled, invalid, shadow, and icon sizing when changing visuals. |
| Modal and Dialog | Upstream has modal examples; MUD-clone exposes both `Modal` and `Dialog`. | RSC has richer product overlays and compact generic dialog flows. | Use `Modal` for content/product overlays and `Dialog` for compact confirmation or generic flows. |
| Link | MUD has visited-state styling; MUD-clone lets visited styling be disabled and exposes regular/medium typography weights. | App routes often should not visually change after a visit; table/action links sometimes need 500 weight without local class overrides. | Use `visited={false}` and either `weight="regular"` or `weight="medium"` intentionally per use case. |
| Tag and Badge | MUD-clone keeps `Tag` for semantic status labels and `Badge` for compact counters/dots. | RSC designs used tags visually where badge-like status labels appeared. | Status text belongs in `Tag`; notification counts, dots, and compact counters belong in `Badge`. |
| Textarea | MUD-clone exposes `Textarea` as a typed React primitive using the shared input shell tokens. | The RSC form flow needs a reusable multi-line input consistent with `Input`. | Use `Textarea` instead of page-local `<textarea>` styling. |
| Avatar | MUD-clone supports MUD avatar sizes/types and adds a white background option. | RSC header/profile surfaces need this local variant. | Treat the white background as a MUD-clone extension and document further avatar variants here. |
| Table alternatives | MUD-clone has `TableCard` as a small-screen alternative to `Table`. | RSC needs mobile/tablet representations of table rows. | Use `Table` for large-screen tabular data and `TableCard` for small-screen record cards. |
| Detail rows | MUD-clone has `DetailRow` for label/value rows in cards, details pages, and modals. | The pattern repeats across RSC but has no one-to-one upstream component. | Use `DetailRow` instead of recreating two-cell label/content rows. |
| Control preview cards | MUD-clone has `ControlCardSmall` for compact control-case previews. | RSC needs a reusable dashboard card for control cases with desktop, mobile, and responsive layouts. | Keep control data in the app; keep the reusable card shell in MUD-clone. Use the component subpath because it loads `MudIcon`. |
| Pagination | MUD-clone has `Pagination` primitives for paged record sets. | RSC needs the same pagination shell across table/list views, and the current implementation builds on `Button` and `MudIcon`. | Use `@mud-clone/components/pagination`; keep it subpath-only while it loads `MudIcon`. |
| Metric cards | MUD-clone has `MetricCard` and `MetricCardGrid` for dashboard count/action cards. | The pattern is reusable beyond RSC but not a direct upstream primitive. | Keep product text/data in the app; keep the reusable card shell in MUD-clone. |
| Selection cards | MUD-clone has `SelectionCard` for larger selectable rows. | RSC profile role switching needs a selectable card row that is larger than compact menu items. | Keep role/profile data in the app; keep the reusable selectable shell in MUD-clone. Use the component subpath because it loads `MudIcon`. |
| Section headings | MUD-clone has `SectionHeading` for section titles and title/count combinations. | RSC repeats this heading pattern across pages and needs consistent heading-small typography with optional color override. | Use `SectionHeading` instead of recreating section title/count typography in pages. |

## Change Classification

Before changing or adding a component, classify the work:

| Classification | Belongs in | Examples |
| --- | --- | --- |
| Direct MUD mapping | `mud-clone/src` | Button, Select, Link, Tag, Badge, Avatar, Table, Modal styles. |
| MUD-clone extension | `mud-clone/src` plus this document | `DetailRow`, `TableCard`, `MetricCard`, optional Link visited behavior. |
| Product composition | RSC app | Page layouts, route-specific headers, mock/domain data, workflow-specific modals. |
| Temporary migration bridge | RSC app shim files | Re-exports from `src/app/components/ui` to `@mud-clone`. |

If a design introduces a repeated UI pattern and it can be described without
RSC domain data, prefer a MUD-clone extension over a product-only component.

## Workflow For Future Changes

1. Check [`COMPONENT_SOURCES.md`](./COMPONENT_SOURCES.md) for upstream files.
2. Compare the design against upstream MUD and this migration note.
3. Decide whether the change is a direct mapping, a MUD-clone extension, or
   product composition.
4. Put reusable implementation changes in `mud-clone/src`.
5. Keep old RSC import paths as shims only while migration is incomplete.
6. Update `DESIGN_SYSTEM.md`, `COMPONENT_SOURCES.md`, or this document when a
   rule, source, or intentional difference changes.
7. Run `npm run build` from the repository root and remove generated `dist`
   unless the user asks to keep build artifacts.
