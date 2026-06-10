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
| Modal | Figma defines Modal as the overlay component; MUD-clone no longer exposes a separate `Dialog` primitive. | The previous generic dialog API was not backed by the Figma source and made compact confirmation flows look like a separate design-system component. | Use `Modal` for overlay flows, including compact confirmations. If a different reusable overlay pattern is needed later, create a new generalized component with a fresh API after a Figma review. |
| Tooltip | MUD-clone exposes `Tooltip` and `TooltipBubble` as typed React primitives. | The Figma tooltip spec defines bubble sizes, top/bottom arrows, arrow alignment, close-button coach variants, hover/focus display, and target-size guidance. | Use `Tooltip` for brief contextual hover/focus hints. Keep rich onboarding/product-tour state in the consuming app, and use `TooltipBubble` only for static previews or composed documentation surfaces. |
| Toast message | MUD-clone exposes `Toast` as a typed React feedback surface. | The Figma Toast Message spec defines semantic tones, heading and text-only variants, action link and dismiss affordances, desktop/mobile placement, stacking, motion, and truncation guidance. | Use `Toast` for brief event feedback. Keep queue management, auto-dismiss timers, portals, routing, and notification workflow behavior in the consuming app. |
| Link | MUD has visited-state styling; MUD-clone lets visited styling be disabled and exposes regular/medium typography weights. | App routes often should not visually change after a visit; table/action links sometimes need 500 weight without local class overrides. | Use `visited={false}` and either `weight="regular"` or `weight="medium"` intentionally per use case. |
| Tag and Badge | MUD-clone keeps `Tag` for semantic status labels and `Badge` for compact counters/dots. | RSC designs used tags visually where badge-like status labels appeared. | Status text belongs in `Tag`; notification counts, dots, and compact counters belong in `Badge`. `Tag` and `InfoTag` also support `truncate` for constrained containers. |
| Segmented control | MUD-clone exposes `SegmentedControl` and `SegmentedControlItem` as typed React primitives. | The Figma segmented control spec defines desktop/mobile sizing, two-to-five segment guidance, selected/unselected modes, hover/focus states, equal-width behavior, separators, and truncation. | Use `SegmentedControl` for compact single-choice mode switches. Prefer two to five concise labels, and use `equalWidth` when segments belong to one fixed-width choice set. |
| Date input | MUD-clone exposes `DateInput` as a typed React primitive for manual `DD/MM/YYYY` date entry. | The Figma date input repeats the shared input shell with a calendar affordance, segment validation states, mandatory state, and assistive text. | Use `DateInput` for date entry instead of recreating calendar-icon field chrome in product pages. Keep date parsing and calendar-popover behavior in product logic unless a generic picker API is introduced. |
| Numeric input | MUD-clone exposes `NumericInput` as a typed React primitive for amount and quantity fields. | The Figma numeric input variants repeat the shared input shell with numeric adornments, validation tones, loading, disabled, mandatory, read-only, and assistive states. | Use `NumericInput` for numeric text entry instead of recreating prefix/suffix field chrome in product pages. |
| Phone number input | MUD-clone exposes `PhoneNumberInput` as a typed React primitive for phone entry field chrome. | The Figma phone input repeats the shared input shell with country-code prefix, local/international selector variants, validation tones, loading, disabled, mandatory, clear button, country selector previews, and assistive states. | Use `PhoneNumberInput` for phone number entry instead of recreating country-prefix field chrome in product pages. Keep parsing, formatting, and country-search behavior in product logic unless a generic selector API is introduced. |
| File input | MUD-clone exposes `FileInput` and `FileInputItem` as typed React primitives for upload UI chrome. | The Figma file input covers upload-button flows, drag-and-drop zones, file rows, upload progress, success, error, focus, hover, active, disabled, and desktop/mobile widths. | Use `FileInput` for the upload target and `FileInputItem` for uploaded file rows. Keep actual upload transport, file validation, drag event handling, and preview generation in product logic. |
| Textarea | MUD-clone exposes `Textarea` as a typed React primitive using the shared input shell tokens. | The RSC form flow needs a reusable multi-line input consistent with `Input`. | Use `Textarea` instead of page-local `<textarea>` styling. |
| Avatar | MUD-clone supports MUD avatar sizes/types and adds a white background option. | RSC header/profile surfaces need this local variant. | Treat the white background as a MUD-clone extension and document further avatar variants here. |
| Table alternatives | MUD-clone has `TableCard` as a small-screen alternative to `Table`. | RSC needs mobile/tablet representations of table rows. | Use `Table` for large-screen tabular data and `TableCard` for small-screen record cards. |
| Detail rows | MUD-clone has `DetailRow` for label/value rows in cards, details pages, and modals. | The pattern repeats across RSC but has no one-to-one upstream component. | Use `DetailRow` instead of recreating two-cell label/content rows. |
| Control preview cards | Removed from MUD-clone. `ControlCardSmall` was pulled back to RSC. | The component encodes RSC control-domain behavior rather than a generic design-system primitive. | Do not import it from MUD-clone. Keep the RSC-owned implementation in RSC, and create a new generalized card API later if a reusable pattern emerges. |
| Pagination | MUD-clone has `Pagination` primitives for paged record sets. | RSC needs the same pagination shell across table/list views, and the implementation follows the Figma pagination control sizing, states, overflow, and icon behavior. | Use `@mud-clone/components/pagination`; keep it subpath-only while it loads `MudIcon`. |
| Metric cards | Removed from MUD-clone. `MetricCard` and `MetricCardGrid` were pulled back to RSC. | The components encode RSC dashboard behavior rather than a generic design-system primitive. | Do not import them from MUD-clone. Keep the RSC-owned implementation in RSC, and create a new generalized card API later if a reusable pattern emerges. |
| Selection cards | Deprecated compatibility only. `SelectionCard` was pulled back to RSC. | The component encodes RSC profile/role-switching behavior rather than a generic design-system primitive. | Do not add new usage from MUD-clone. Keep new usage in the consuming product app. The subpath export remains only to avoid breaking existing imports and will be removed in a future cleanup. If a generic reusable card pattern is needed later, create a new generalized component with a fresh API. |
| Section headings | MUD-clone has `SectionHeading` for section titles and title/count combinations. | RSC repeats this heading pattern across pages and needs consistent heading-small typography with optional color override. | Use `SectionHeading` instead of recreating section title/count typography in pages. |

## Change Classification

Before changing or adding a component, classify the work:

| Classification | Belongs in | Examples |
| --- | --- | --- |
| Direct MUD mapping | `mud-clone/src` | Button, Select, Link, Tag, Badge, Avatar, Table, Modal styles. |
| MUD-clone extension | `mud-clone/src` plus this document | `DetailRow`, `TableCard`, optional Link visited behavior. |
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
