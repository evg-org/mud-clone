# Design System Usage Audit

Status: foundation runtime alias migration complete. Foundation alias guardrail
is active; hard-coded value signals are classified. The first reviewed
components have completed a prototype-wide usage audit. The newly reviewed
component set now also includes `Table`, `TableCard`, `DetailRow`,
`Separator`, `SectionHeading`, `Chip`, `Checkbox`, `RadioGroup`, and `Switch`;
their prototype adoption state is classified below. Components that exist in
MUD-clone but are not listed as reviewed are explicitly not considered audited
yet.

Date: 2026-05-17

This audit tracks how the RSC prototype uses the local MUD-clone design system.
It covers both foundation usage and reviewed component adoption so product work
does not recreate design-system behavior page by page.

## Foundation Usage

The foundation section covers the non-color, non-typography foundations that
were added from Figma and MUD: spacing, border radius, and elevations/shadows.
Its purpose is to prevent a second alias layer problem like the previous color
and typography cleanup.

### Scope

Included:

- Spacing tokens.
- Border radius tokens.
- Elevation and drop-shadow tokens.
- Current compatibility aliases for those foundations.
- Hard-coded spacing, radius, and shadow usage that may duplicate tokens.

Excluded:

- Color and typography, which already have their own cleanup paths.
- Product-specific layout dimensions such as page max-widths, grid column
  widths, viewport offsets, and document preview sizes.

### Upstream References

Use the same upstream foundation sources listed in
[`COMPONENT_SOURCES.md`](./COMPONENT_SOURCES.md):

- `Components/scss/abstracts/_tokens.scss`
- `Components/scss/abstracts/_variables.scss`
- `Components/scss/abstracts/_borders.scss`
- `Components/scss/base/_drop-shadows.scss`
- `Components/css/main.css`

### Candidate Public Token API

The cleaner long-term API is the MUD-native token layer:

| Foundation | Preferred token family | Current compatibility aliases |
| --- | --- | --- |
| Spacing | `--spacing-*` | `--app-space-*` |
| Border radius | `--border-radius-*` | `--app-radius-*` |
| Elevation | `--drop-shadow-*` | `--app-shadow-*` |

Component-level tokens may still be useful when they encode component
semantics, for example `--app-control-height-md` or
`--app-control-padding-x-md`. Those should remain backed by MUD-native
foundation tokens and should not become a second general-purpose spacing or
radius scale.

### Source-Of-Truth Alignment

Decision:

- `mud-clone/src/styles/design-system.css` owns foundation token definitions.
- `src/styles/design-system.css` is now only a compatibility entrypoint that
  imports `@mud-clone/styles/design-system.css`.
- RSC already imports `@mud-clone/styles/design-system.css` from
  `src/styles/index.css`, so runtime foundation tokens come from MUD-clone.

This removes the duplicated root token definition file as an ongoing drift
source.

### Previous Token Drift

Before `src/styles/design-system.css` was converted into a compatibility
entrypoint, the stale root copy differed from MUD-clone in these areas:

| Area | Root RSC | MUD-clone | Risk |
| --- | --- | --- | --- |
| Spacing | Has `--spacing-72`; does not have `--spacing-80`, `--spacing-96`, or `--spacing-120`. | Has `--spacing-80`, `--spacing-96`, and `--spacing-120`; does not have `--spacing-72`. | The app and package can render differently depending on which CSS file is loaded. |
| Radius | Does not have `--border-radius-24`. | Has `--border-radius-24`. | A component using radius 24 can work in MUD-clone preview but fail in RSC if only root CSS is active. |
| Full radius | `--border-radius-full: 9999px`. | `--border-radius-full: 999px`. | Values are visually similar for current use, but they are not identical. |
| Shadow 500/600 | Same shadow layers as MUD-clone, but layer order differs. | Same shadow layers as root, but layer order differs. | Multiple shadow layer order can affect final rendering. |
| App aliases | Has `--app-space-72`; does not have `--app-space-80`, `--app-space-96`, `--app-space-120`, or `--app-radius-2xl`. | Has `--app-space-80`, `--app-space-96`, `--app-space-120`, and `--app-radius-2xl`; does not have `--app-space-72`. | Confirms the alias layer can drift too. |

Resolved high-priority finding:

- `--app-space-10` had 10 app/runtime usages but was not defined in
  `mud-clone/src/styles/design-system.css`.
- Those usages were replaced with existing MUD-native spacing tokens:
  `--spacing-8` for compact dropdown notification gaps and `--spacing-12` for
  table action-cell padding and experiment card/grid spacing.

Theme integration cleanup:

- `src/styles/theme.css` no longer maps Tailwind `--spacing-app-*` and
  `--radius-app-*` tokens through the general `--app-space-*` and
  `--app-radius-*` aliases.
- It now maps app and DS spacing/radius theme tokens directly to MUD-native
  `--spacing-*` and `--border-radius-*` tokens.
- Stale `--spacing-app-72` and `--spacing-ds-72` aliases were removed because
  MUD-clone does not define `--spacing-72`.
- MUD-clone spacing values `80`, `96`, and `120`, plus radius values `0`, `24`,
  and `32`, are now represented in the app theme integration.

### Current Usage Inventory

The counts below were gathered from:

- `src/app`
- `mud-clone/src`
- `mud-clone/examples/preview/src`

The scan excludes root and MUD-clone `design-system.css` definitions so counts
represent usage, not declarations.

#### Alias Usage

| Token family | Usage count | Notes |
| --- | ---: | --- |
| `--app-space-*` | 0 | Runtime usage migrated to `--spacing-*`. |
| `--app-radius-*` | 0 | Runtime usage migrated to `--border-radius-*`. |
| `--app-shadow-*` | 0 | Runtime usage migrated to `--drop-shadow-*`. |
| `--spacing-*` | 468 | Includes runtime/component usage and preview/docs data. |
| `--border-radius-*` | 118 | Includes runtime/component usage and preview/docs data. |
| `--drop-shadow-*` | 25 | Includes runtime/component usage and preview/docs data. |

Resolved spacing aliases:

| Alias | Count |
| --- | ---: |
| `--app-space-12` | 0 |
| `--app-space-16` | 0 |
| `--app-space-8` | 0 |
| `--app-space-24` | 0 |
| `--app-space-4` | 0 |
| `--app-space-20` | 0 |
| `--app-space-32` | 0 |
| `--app-space-6` | 0 |
| `--app-space-40` | 0 |
| `--app-space-2` | 0 |
| `--app-space-48` | 0 |
| `--app-space-56` | 0 |

Direct MUD spacing usage:

| Token | Count |
| --- | ---: |
| `--spacing-12` | 111 |
| `--spacing-16` | 83 |
| `--spacing-8` | 73 |
| `--spacing-24` | 46 |
| `--spacing-4` | 41 |
| `--spacing-20` | 30 |
| `--spacing-32` | 26 |
| `--spacing-6` | 21 |
| `--spacing-40` | 15 |
| `--spacing-2` | 12 |
| `--spacing-48` | 8 |
| `--spacing-56` | 2 |

Resolved radius aliases:

| Alias | Count |
| --- | ---: |
| `--app-radius-md` | 0 |
| `--app-radius-full` | 0 |
| `--app-radius-xs` | 0 |
| `--app-radius-sm` | 0 |
| `--app-radius-lg` | 0 |
| `--app-radius-xl` | 0 |

Direct MUD radius usage:

| Token | Count |
| --- | ---: |
| `--border-radius-8` | 28 |
| `--border-radius-full` | 28 |
| `--border-radius-4` | 20 |
| `--border-radius-6` | 20 |
| `--border-radius-12` | 13 |
| `--border-radius-16` | 3 |
| `--border-radius-0` | 2 |
| `--border-radius-24` | 2 |
| `--border-radius-32` | 2 |

Resolved shadow aliases:

| Alias | Count |
| --- | ---: |
| `--app-shadow-300` | 0 |
| `--app-shadow-500` | 0 |

Direct MUD shadow usage:

| Token | Count |
| --- | ---: |
| `--drop-shadow-300` | 11 |
| `--drop-shadow-500` | 4 |
| `--drop-shadow-100` | 2 |
| `--drop-shadow-100-inverse` | 2 |
| `--drop-shadow-200` | 2 |
| `--drop-shadow-400` | 2 |
| `--drop-shadow-600` | 2 |

#### Hard-Coded Value Classification

The following broad scan excludes imported Figma dumps, experiments, and the
preview. These counts are a signal, not an automatic migration list. The
classification separates values that duplicate MUD foundations from values that
are layout, component geometry, or legacy component cleanup.

| Signal | Count | Classification | Action |
| --- | ---: | --- |
| Arbitrary spacing utilities such as `px-[24px]`, `gap-[12px]`, `mt-[32px]` | 36 | 0 are remaining migration targets; 36 are optical or component-specific values. | Exact spacing migration targets are complete. Review the 36 deferred values with their owning component/page. |
| Broader pixel utilities including `size-*`, `w-*`, `h-*`, `min-*`, and `max-*` | 203 | 74 match MUD spacing values, but many are component dimensions rather than spacing. | Do not bulk migrate dimensions. Keep layout dimensions unless they duplicate component API. |
| Arbitrary radius utilities such as `rounded-[12px]` | 3 | 0 are remaining migration targets; 3 are `2px` chart/tooltip micro-radii. | Radius migration targets are complete. Keep `2px` micro-radii unless MUD adds a matching token. |
| Tailwind/custom shadow utilities such as `shadow-md`, `shadow-lg`, or custom `shadow-[...]` | 33 | 10 already use MUD `--drop-shadow-*`; 3 are select focus shadows; 2 are sidebar outline shadows; 18 are Tailwind elevation utilities. | Keep current MUD shadows. Keep select focus shadows as state styling for now. Audit the 18 Tailwind elevation utilities by component. |

#### Spacing Classification

Token-equivalent spacing values should migrate from raw pixel utilities to MUD
tokens, for example `px-[24px]` becomes `px-[var(--spacing-24)]`.

Highest-count files for token-equivalent spacing:

| File | Token-equivalent spacing hits | Classification |
| --- | ---: | --- |
| `src/app/pages/Documente.tsx` | 0 | Completed first cleanup batch; token-equivalent spacing/radius migrated, document preview dimensions kept. |
| `src/app/pages/Cereri.tsx` | 0 | Completed second cleanup batch; token-equivalent spacing/radius migrated, table/card dimensions kept. |
| `src/app/pages/CerereDetalii.tsx` | 0 | Completed third cleanup batch; token-equivalent spacing/radius migrated, timeline dimensions and optical offsets kept. |
| `src/app/pages/Controale.tsx` | 0 | Completed fourth cleanup batch; token-equivalent spacing/radius migrated, control heights and layout dimensions kept. |
| `src/app/components/ProfileMenu.tsx` | 0 | Completed fifth cleanup batch; token-equivalent spacing/radius migrated and repeated initials avatar replaced with the reusable `Avatar`. |
| `src/app/components/company/CompanyCard.tsx` | 0 | Completed sixth cleanup batch; token-equivalent spacing/radius migrated while keeping Modal, DetailRow, PersonCard, Tag, and Button usage. |
| `src/app/pages/Workspace.tsx` | 0 | Completed seventh cleanup batch; token-equivalent page and section spacing migrated, layout max-width kept. |
| `src/app/components/WorkspaceMobileMenu.tsx` | 0 | Completed eighth cleanup batch; token-equivalent spacing/radius migrated while keeping Figma-derived logo/icon geometry. |
| `src/app/pages/ControlDetalii.tsx` | 0 | Completed ninth cleanup batch; token-equivalent table-card separators and page padding migrated while keeping table/detail-card patterns. |
| `src/app/pages/Companii.tsx` | 0 | Completed tenth cleanup batch; token-equivalent page and company-grid spacing migrated, layout max-width kept. |
| `src/app/pages/Notificari.tsx` | 0 | Completed eleventh cleanup batch; token-equivalent page and notification-group spacing migrated, layout max-width kept. |
| `src/app/components/HeroSection.tsx` | 0 | Completed twelfth cleanup batch; token-equivalent hero spacing migrated while keeping fixed image/layout geometry. |
| `src/app/components/NoutatiSection.tsx` | 0 | Completed thirteenth cleanup batch; token-equivalent wrapper padding migrated while keeping imported Figma container geometry. |
| `src/app/components/notifications/NotificationsMenu.tsx` | 0 | Completed fourteenth cleanup batch; token-equivalent dropdown/mobile panel spacing and remaining foundation aliases migrated, dropdown dimensions kept. |
| `mud-clone/src/components/modal.tsx` | 0 | Completed fifteenth cleanup batch; token-equivalent slide animation offsets migrated, modal dimensions kept. |
| `src/app/components/ui/notification-card.tsx` | 0 | Completed fifteenth cleanup batch; token-equivalent tag icon offset migrated. |
| `src/app/components/notifications/NotificationList.tsx` | 0 | Completed fifteenth cleanup batch; token-equivalent empty-state vertical padding migrated, empty-state icon size kept as component geometry. |
| `src/app/components/ui/person-card.tsx` | 0 | Completed with CompanyCard cleanup because the company modal uses this representative card. |

Deferred spacing values should not be bulk migrated. Examples include
`14px`, `18px`, `22px`, `28px`, `36px`, `44px`, the `72px` document modal
header override, negative avatar stack overlap, and small translate offsets;
these usually represent optical adjustments, row heights, document preview
composition, or dimensions from a specific Figma frame. They need
owner-by-owner review.

#### Radius Classification

No token-equivalent radius utilities remain in the scanned runtime scope. Future
token-equivalent radius values should migrate:

| Value | MUD token |
| --- | --- |
| `6px` | `--border-radius-6` |
| `8px` | `--border-radius-8` |
| `12px` | `--border-radius-12` |
| `16px` | `--border-radius-16` |
| `999px` | `--border-radius-full` |

Known `2px` radii are micro-shapes in chart/tooltip surfaces and should stay
until there is a real MUD token or component requirement for them.

#### Shadow Classification

Do not treat every `shadow-*` as an elevation token replacement:

- `shadow-[var(--drop-shadow-300)]` and `shadow-[var(--drop-shadow-500)]` are
  already correct.
- Select focus shadows are state styling, not elevation. They should stay until
  focus tokens are expanded.
- Tailwind `shadow-xs`, `shadow-sm`, `shadow-md`, `shadow-lg`, and `shadow-xl`
  are the remaining risk. Most are in legacy shadcn primitives under
  `src/app/components/ui/*`; a smaller number are in MUD-clone controls.
  These should be audited component-by-component because replacing them can
  change interaction states.

### Initial Interpretation

The general-purpose foundation alias migration is complete:

1. Runtime code uses MUD-native spacing, radius, and shadow token families.
2. Compatibility aliases still exist for temporary backwards compatibility.

The duplicated root foundation definition file has been removed from the active
source-of-truth path. The root theme integration now maps to MUD-native spacing
and radius tokens. Shadow and radius runtime usage now uses MUD-native tokens.
Spacing runtime usage now uses MUD-native tokens too.

The first enforcement guardrail is active. `npm run build` now runs
`npm run check:foundations`, which fails on new runtime usage of
`--app-space-*`, `--app-radius-*`, or `--app-shadow-*`. The only allowed
references are compatibility alias declarations in
`mud-clone/src/styles/design-system.css`.

The remaining risk is classified but not fully migrated hard-coded spacing,
radius, and shadow values.

## Component Adoption Audit

Status: first reviewed-component migration pass complete; initial guardrail is
active.

This section separates three different states:

- A component can **exist in MUD-clone** without being reviewed yet.
- A component can be **reviewed against MUD/Figma/design intent** but still need
  a prototype-wide adoption audit.
- A reviewed component is only considered **adopted** after active prototype
  pages/components have been checked for proper usage and exceptions are
  documented.

### Status Model

| Status field | Meaning |
| --- | --- |
| Review status | Whether the component itself has been reviewed as a design-system primitive. |
| Prototype usage audit | Whether active RSC prototype usage has been checked across `src/app/pages` and `src/app/components`. |
| Adoption status | Whether the prototype uses the reviewed component everywhere appropriate. |
| Guardrail status | Whether an automated check blocks common regressions for that component. |

Review status values:

- `Reviewed`: the component has been checked against MUD, Figma, or the accepted
  MUD-clone extension rule.
- `Not reviewed`: the component may exist in MUD-clone, but it must not be
  treated as accepted or fully audited yet.
- `Candidate`: repeated product pattern identified, but component ownership or
  final API is not decided yet.

Prototype usage audit values:

- `Complete`: active prototype surfaces have been checked.
- `In progress`: audit started but not complete.
- `Not started`: no prototype-wide usage audit yet.
- `Deferred`: intentionally postponed because the surface is legacy,
  experimental, or out of current scope.

Adoption status values:

- `Adopted`: active prototype usage is aligned.
- `Adopted with exceptions`: usage is aligned except for documented exceptions.
- `Partial`: some usage still needs migration.
- `Not adopted`: component exists but active product usage has not moved to it.

### Component Adoption Matrix

Reviewed components with completed prototype-wide usage audit:

| Component | Review status | Prototype usage audit | Adoption status | Guardrail status | Notes |
| --- | --- | --- | --- | --- | --- |
| `Avatar` | Reviewed | Complete | Adopted with exceptions | Manual | `ProfileMenu` and `PersonCard` use `Avatar`; imported Figma headers remain an exception. |
| `Button` | Reviewed | Complete | Adopted with exceptions | Active for new raw product `<button>` usage | Active product actions use `Button`; documented raw-button exceptions remain in legacy/internal primitives. |
| `Link` | Reviewed | Complete | Adopted | Manual | Active navigation/link patterns checked and migrated to reviewed `Link`. |
| `Tag` | Reviewed | Complete | Adopted with exceptions | Manual | Status labels use `Tag`; legacy `Chip` remains deferred for later review. |
| `Badge` | Reviewed | Complete | Adopted with exceptions | Active for notification pseudo-element regression | Notification count uses `Badge`; section heading counts and unread strips are documented non-badge cases. |
| `TextInput` / `Input` | Reviewed | Complete | Adopted with exceptions | Manual | Active product text fields use MUD-clone `Input`; legacy command input remains an internal primitive exception. |
| `TextArea` / `Textarea` | Reviewed | Complete | Adopted | Manual | Active product multiline fields use MUD-clone `Textarea`. |
| `SearchInput` | Reviewed | Complete | Adopted | Manual | No active product search fields are currently present; the local bridge re-exports MUD-clone `SearchInput`. |
| `MudIcon` / `MudLogo` / icon assets | Reviewed | Complete | Adopted with exceptions | Manual | Active product icons use `MudIcon`; Figma-imported logo/header artwork and legacy internal primitives are documented exceptions. |
| `Select` | Reviewed | Complete | Adopted | Manual | Active product select-like form and filter fields use MUD-clone `Select`; page-local trigger style overrides were removed. |
| `Menu` / `DropdownMenu` | Reviewed | Complete | Adopted with exceptions | Manual | Active product action menus use MUD-clone `DropdownMenu`; legacy sidebar, navigation, context-menu, and menubar primitives remain deferred. |
| `Checkbox` | Reviewed | Complete | Adopted | Manual | No active product checkbox fields were found; the local bridge re-exports MUD-clone `Checkbox` for future usage. Legacy contextual/menu checkbox variants remain separate deferred primitives. |
| `RadioGroup` | Reviewed | Complete | Adopted | Manual | No active product radio fields were found; the local bridge re-exports MUD-clone `RadioGroup` for future usage. |
| `Switch` | Reviewed | Complete | Adopted | Manual | No active product switch fields were found; the local bridge re-exports MUD-clone `Switch` for future usage. |
| `Table` | Reviewed | Complete | Adopted | Manual | Active product table surfaces use the canonical `Table` API; the temporary Table v1 reference surface has been removed. |
| `Tabs` | Reviewed | Pending prototype audit | Adopted for new work | Manual | Local primitive now matches the Figma Tabs spec, including desktop/mobile sizing, selected underline, focus, icon, badge, and overflow states. |
| `TableCard` | Reviewed | Complete | Adopted | Manual | Active small-screen record-list alternatives use `TableCard`; row content uses `TableCardRow`, which composes `DetailRow`. |
| `DetailRow` | Reviewed | Complete | Adopted with exceptions | Manual | Active label/value rows use `DetailRow` directly or through `TableCardRow`; timeline/progress/icon grids are documented non-detail-row exceptions. |
| `Separator` | Reviewed | Complete | Adopted with exceptions | Manual | Active standalone component separators use reviewed `Separator`; primitive-specific separators inside command/context/menu/breadcrumb/OTP legacy internals remain deferred. |
| `Pagination` | Reviewed | Pending prototype audit | Adopted for new work | Manual | Canonical paged record-set navigation; preview page documents breakpoints, states, pagination logic, overflow interaction, and accessibility. |
| `SectionHeading` | Reviewed | Complete | Adopted with exceptions | Manual | Active section title/count/action rows use `SectionHeading`; content titles, modal labels, and editorial/public section headings are documented non-section-heading exceptions. |

Reviewed components and foundations that still need prototype-wide usage audit:

| Component | Review status | Prototype usage audit | Adoption status | Guardrail status | Notes |
| --- | --- | --- | --- | --- | --- |
| `Chip` | Reviewed | Deferred | Not adopted | Manual | Reviewed as a chip/filter-style primitive. Status labels remain `Tag`; the legacy local chip primitive stays deferred until chip/filter work is in active scope. |

Existing MUD-clone components that still need formal review and/or
prototype-wide usage audit:

| Component | Review status | Prototype usage audit | Adoption status | Recommended audit priority | Notes |
| --- | --- | --- | --- | --- | --- |
| `PhoneNumberInput` | Not reviewed in this audit | Not started | Partial/unknown | Medium | Exists for phone number fields with country-code prefix and validation states; audit when phone entry appears in active product forms. |
| `Modal` | Reviewed against Figma Modal | Not started | Partial/unknown | Medium | Canonical overlay component. The previous `Dialog` package export was removed because Figma does not define a separate dialog primitive. |
| `SegmentedControl` | Not reviewed in this audit | Not started | Partial/unknown | Medium | Exists for compact single-choice mode switches with two-to-five segments; audit when segmented filters or mode switches appear in active product screens. |
| `Tooltip` | Not reviewed in this audit | Not started | Partial/unknown | Low | Exists for brief contextual hints and static tooltip previews; audit when tooltip/help affordances appear in active product screens. |

Pulled-back components:

`MetricCard`, `MetricCardGrid`, and `ControlCardSmall` were removed from
MUD-clone and returned to RSC ownership because they encode dashboard and
control-domain behavior. They should not be imported from MUD-clone. If a
generic reusable card pattern is needed later, create a new generalized
component with a fresh API.

Goal:

Ensure the RSC prototype uses reviewed MUD-clone components consistently and
does not recreate them locally with page-specific styling.

Audit scope:

- `src/app/pages`
- `src/app/components`
- Exclude `src/app/experiments` unless a pattern is promoted into the product.

Usage rules:

- Actions use `Button`.
- Navigation and inline text links use `Link`.
- Status labels and semantic chips use `Tag`.
- Compact counts, notification numbers, and dots use `Badge`.
- User/entity identity visuals use `Avatar`.
- Icons and logos use `MudIcon` and `MudLogo` with canonical MUD-clone asset
  paths.
- Standard text fields use reviewed `TextInput` / `Input` primitives.
- Phone number fields use `PhoneNumberInput` once reviewed for the active
  product surface.
- Multiline text fields use reviewed `TextArea` / `Textarea` primitives.
- Search fields use reviewed `SearchInput` primitives.
- Select-like form fields use reviewed `Select` primitives.
- Compact actions, contextual lists, and selection menus use reviewed `Menu` /
  `DropdownMenu` primitives.
- Contextual hints use `Tooltip` once reviewed for the active product surface.
- Record tables use reviewed `Table` primitives; avoid page-local table markup
  unless a surface is explicitly deferred.
- Small-screen alternatives for record tables use reviewed `TableCard`
  primitives.
- Label/value rows use reviewed `DetailRow` primitives.
- Reusable page section title, count, and action rows use reviewed
  `SectionHeading` primitives.
- Component separators use reviewed `Separator` primitives instead of
  page-local divider markup when the separator is part of a reusable component
  pattern.
- Standard checkbox fields use reviewed `Checkbox` primitives.
- Standard radio option groups use reviewed `RadioGroup` primitives.
- Compact single-choice mode switches use `SegmentedControl` once reviewed for
  the active product surface.
- Binary settings use reviewed `Switch` primitives.
- Chip/filter-style tokens use reviewed `Chip` primitives; status and semantic
  labels continue to use reviewed `Tag`.
- Page-level layout classes are allowed.
- Component-level styling overrides should move into MUD-clone props or
  variants instead of staying as page-local Tailwind/CSS.

Adoption workflow:

1. Inventory current prototype usage for the reviewed components.
2. Classify each usage as correct, migrate, defer, or intentional exception.
3. Migrate one reviewed component at a time across the prototype.
4. Add lightweight guardrails for repeated violations after the first migration
   pass is stable.
5. Visual-QA each batch against the MUD-clone preview page and the real
   prototype screens on desktop and mobile.

Definition of done for a reviewed component:

- The prototype uses the MUD-clone component everywhere appropriate.
- No page-local recreation remains in active product surfaces.
- Style overrides are layout-only, or the needed behavior is promoted into a
  component prop/variant.
- Build/checks pass.
- Visual QA passes for the relevant desktop and mobile screens.

### Reviewed Component Inventory

Inventory date: 2026-05-17.

Scanned scope:

- `src/app/pages`
- `src/app/components`
- Excluded `src/app/experiments`
- `src/app/components/ui` shim files are treated as bridge code; legacy
  shadcn-style primitives in that folder are deferred unless used directly by
  active product screens.

| Component | Correct usage | Migration candidates | Deferred / exceptions | Notes |
| --- | ---: | ---: | ---: | --- |
| `Avatar` | 3 direct usages | 0 | 1 imported-header review | `ProfileMenu` and `PersonCard` already use `Avatar`. Figma-imported headers still contain profile visuals outside the reviewed component surface. |
| `Button` | 43 direct usages | 0 | 3 | Most command actions already use `Button`. ProfileMenu role selection is intentionally handled by an RSC-local component rather than a MUD-clone button variant. |
| `Link` | 6 direct DS link patterns | 0 overlapping candidates | 0 | `Documente`, `Cereri`, `CerereDetalii`, and `ControlDetalii` use `Link as AppLink` with `RouterLink` for navigation links. Reviewed `Link` supports regular 400 and medium 500 weight options. |
| `Tag` | 11 direct usages | 0 | 1 local chip primitive | Status helpers already wrap `Tag`. `Chip` remains a separate legacy primitive to review when chip/filter work resumes. |
| `Badge` | 1 direct product usage | 0 | 2 | Workspace header notification count now uses `Badge`. `SectionHeading` counts and notification-card unread strips are not badge replacements by default. |
| `TextInput` / `Input` | 4 direct product usages | 0 | 2 internal primitives | `Cereri` uses MUD-clone `Input` for disabled text fields, editable subject, and file attachment control. `CommandInput` remains a command-palette primitive; `SidebarInput` wraps MUD-clone `Input` with sidebar-local styling. |
| `TextArea` / `Textarea` | 1 direct product usage | 0 | 0 | `Cereri` uses MUD-clone `Textarea` for request description. |
| `SearchInput` | 0 direct product usages | 0 | 1 bridge re-export | No active product search fields were found. `src/app/components/ui/search-input.tsx` re-exports MUD-clone `SearchInput` for future usage. |
| `MudIcon` / `MudLogo` / icon assets | 56 direct `MudIcon` usages | 0 | 2 imported-artwork surfaces, 5 legacy internal primitives | Active product icons use canonical MUD-clone `MudIcon` paths. `src/app/components/ui/mud-icon.tsx` and `src/app/components/ui/mud-logo.tsx` are bridge re-exports. No direct active `MudLogo` usage was found yet. |
| `Select` | 3 helper implementations covering 12 product select fields | 0 | 1 menu action surface | `Controale`, `Documente`, and `Cereri` use MUD-clone `Select` for filter and request-form fields. The `Cereri` create-request action is a menu, not a select field, and is tracked with `Menu` / `DropdownMenu`. |
| `Menu` / `DropdownMenu` | 1 direct product menu usage | 0 | 4 legacy/internal menu-like primitives | `Cereri` uses MUD-clone `DropdownMenu` for the create-request action. Local `dropdown-menu` and `menu` bridge files re-export MUD-clone primitives. Sidebar, navigation, context-menu, and menubar primitives are deferred because they are separate legacy/internal surfaces. |
| `Checkbox` | 0 direct product fields | 0 | 1 bridge re-export, legacy contextual/menu variants deferred | No active product checkbox fields were found. `src/app/components/ui/checkbox.tsx` re-exports MUD-clone `Checkbox`; contextual menu checkbox behavior is a separate primitive. |
| `RadioGroup` | 0 direct product fields | 0 | 1 bridge re-export, legacy contextual/menu variants deferred | No active product radio fields were found. `src/app/components/ui/radio-group.tsx` re-exports MUD-clone `RadioGroup`; contextual menu radio behavior is a separate primitive. |
| `SegmentedControl` | 0 direct product usages | 0 | 0 | No active product segmented controls were found. Use for compact single-choice mode switches once a product surface requires this interaction. |
| `Switch` | 0 direct product fields | 0 | 1 bridge re-export | No active product switch fields were found. `src/app/components/ui/switch.tsx` re-exports MUD-clone `Switch`. |
| `Table` | 3 direct product page families | 0 | 0 | `Documente`, `ControlDetalii`, and `Cereri` use the canonical `Table` family with final `headerStyle` and `zebra` props. The temporary Table v1 reference surface has been removed. |
| `TableCard` | 3 direct product page families | 0 | 0 | `Documente`, `ControlDetalii`, and `Cereri` use `TableCard` for small-screen record-list alternatives. `TableCardRow` composes reviewed `DetailRow`, so label/value row behavior stays shared. |
| `DetailRow` | 5 active product surfaces plus `TableCardRow` internals | 0 | Timeline/progress/icon grids are not label/value rows | `Controale`, `CerereDetalii`, `ControlDetalii`, `CompanyCard`, and `Documente` preview metadata use reviewed `DetailRow` directly; `TableCardRow` composes it internally for small-screen table cards. |
| `Separator` | 3 active/bridge surfaces | 0 | Primitive-specific legacy separators deferred | `ProfileMenu` desktop/mobile separators use MUD-clone `Separator`; the local app separator bridge re-exports MUD-clone; `SidebarSeparator` composes the bridge with sidebar-local spacing. Command, context-menu, menubar, breadcrumb, and OTP separators are separate legacy/internal primitives. |
| `SectionHeading` | 7 active product page families | 0 | Content titles, modal labels, and editorial/public headings are not reusable section-heading rows | `Controale`, `Workspace`, `Documente`, `ControlDetalii`, `CerereDetalii`, `Cereri`, and `Notificari` use reviewed `SectionHeading` where a page section title/count/action row is needed. |
| `Chip` | 0 direct product usages | 0 | 1 legacy local primitive | Reviewed as a chip/filter primitive. Current status-like product labels should continue to use `Tag`; `src/app/components/ui/chip.tsx` remains deferred. |

### Table Consolidation Decision

Status: closed. Canonical `Table` implementation and preview are enhanced,
active product usage migration is complete, and the temporary Table v1
reference surface has been removed.

MUD-clone now has one desktop table implementation:

- `Table` in `mud-clone/src/components/table.tsx`

`Table` is used by active RSC product pages through
`@mud-clone/components/table` and `src/app/components/ui/table.tsx`.

Decision:

- `Table` is the canonical public component family.
- The temporary Table v1 compatibility/reference surface has been removed.
- `TableCard` is the reviewed small-screen record-card alternative for table
  data that cannot fit comfortably as a desktop table.

Target canonical API:

| Surface | Final API | Notes |
| --- | --- | --- |
| Root | `Table` | Keep semantic `<table>` markup and the responsive container. |
| Sections | `TableHeader`, `TableBody`, `TableFooter`, `TableCaption` | Keep existing canonical names. |
| Rows/cells | `TableRow`, `TableHead`, `TableCell` | Keep existing canonical names. `TableHead` clamps long titles to 2 lines; text/link/number `TableCell` values clamp to 5 lines, with `maxLines="none"` available for intentional full-content rows. |
| Sorting | `TableSortButton` | Keep canonical name, inherit the 2-line title clamp, and preserve the trailing sort icon behavior. |
| Header styles | `headerStyle="subtle" \| "strong" \| "white"` | Preferred final prop. Replaces current `variant` naming. |
| Density | `density="desktop" \| "mobile"` | Preferred final values. Replaces current `default` density naming. |
| Zebra rows | `zebra={boolean}` | Preferred final prop. Replaces current `striped` naming. |
| Hover rows | `hover={boolean}` | Keep as explicit row interaction styling. |
| Cell data types | `TableCell dataType="text" \| "number" \| "link" \| "tag" \| "checkbox" \| "action"` | Table cell alignment semantics; use the shared `Link` component inside `dataType="link"` cells. Text, number, and link values receive the default value clamp; tags, checkboxes, and actions keep their control layout. For multiple tags, use `TagGroup` inside `dataType="tag"` so tags wrap within the cell width. |
| Utility helpers | `TableCheckbox`, `TableActionButton` | Table-specific controls live on the canonical Table family; status labels should use shared `Tag`, not a table-only status component. |

Compatibility policy:

- During the merge, `Table` may accept old props (`variant`, `striped`, and
  `density="default"`) as deprecated aliases so existing product pages keep
  rendering.
- New code should use `headerStyle`, `zebra`, and `density="desktop" |
  "mobile"` once those props exist.
- Deprecated aliases are kept only for temporary compatibility and should not be
  used by new product code.

Planned implementation steps:

1. Done: enhanced `mud-clone/src/components/table.tsx` with the target API and
   legacy visual/data-type behavior while keeping deprecated `variant`,
   `striped`, and `density="default"` aliases.
2. Done: updated the Table preview page to show the merged API examples
   previously represented by the temporary reference.
3. Done: removed the temporary legacy preview route after active imports were
   migrated.
4. Done: migrated active product usage:
   - `src/app/pages/Documente.tsx`
   - `src/app/pages/ControlDetalii.tsx`
   - raw table markup in `src/app/pages/Cereri.tsx`
5. Done: removed the separate temporary Table v1 component file, package
   subpath export, root exports, preview route, and sidebar item.

#### Current Migration Candidates

Button and link candidates:

No current button or link migration candidates remain in active product pages.

Resolved in the first migration batch:

- `src/app/pages/Cereri.tsx`: table and mobile request subjects now use
  reviewed `Link` with `RouterLink`.
- `src/app/pages/Cereri.tsx`: `ControlLink` now uses reviewed `Link` with
  `RouterLink` and routes to the related control case.
- `src/app/pages/Cereri.tsx`: `MoreButton` now uses reviewed `Button` icon
  styling.

Resolved in the second migration batch:

- `src/app/pages/CerereDetalii.tsx`: back navigation now uses reviewed `Link`
  with `RouterLink`.
- `src/app/pages/ControlDetalii.tsx`: back navigation now uses reviewed `Link`
  with `RouterLink`.

Resolved in the third migration batch:

- `src/app/components/ProfileMenu.tsx`: role selection previously used
  MUD-clone `SelectionCard`, but that component has been pulled back to RSC.
  The MUD-clone export is deprecated compatibility only and should not be used
  for new product work.

Badge candidates:

No current badge migration candidates remain in active product pages.

Resolved in the fourth migration batch:

- `src/app/components/WorkspaceHeader.tsx`: notification count now renders a
  reviewed `Badge` into the imported header action through a React portal,
  replacing the previous CSS `::after` pseudo-element.

Resolved in the fifth audit batch:

- `src/app/pages/Cereri.tsx`: active text fields already use reviewed
  MUD-clone `Input`.
- `src/app/pages/Cereri.tsx`: active multiline field already uses reviewed
  MUD-clone `Textarea`.
- Active product search fields are not currently present; the local
  `SearchInput` bridge points to MUD-clone for future use.

Resolved in the sixth audit batch:

- `src/app/components/NoutatiSection.tsx`: local calendar and chevron SVGs were
  replaced with canonical MUD-clone `MudIcon` usage.
- Active product page and component icons now use reviewed `MudIcon` where an
  icon component is the right abstraction.
- Local `mud-icon` and `mud-logo` bridge files re-export the MUD-clone
  components and asset URL helpers instead of owning a second icon/logo system.

Resolved in the seventh audit batch:

- `src/app/pages/Controale.tsx`: control filter fields already used MUD-clone
  `Select`; local responsive trigger height overrides were removed.
- `src/app/pages/Documente.tsx`: document filter fields already used MUD-clone
  `Select`; local trigger height, radius, padding, and text overrides were
  removed.
- `src/app/pages/Cereri.tsx`: request filters and request-form dropdown fields
  already used MUD-clone `Select`; local top-filter trigger height overrides
  were removed.

Resolved in the eighth audit batch:

- `src/app/pages/Cereri.tsx`: create-request action already used MUD-clone
  `DropdownMenu`; the trigger was changed to use `Button` through
  `DropdownMenuTrigger asChild`.
- `src/app/pages/Cereri.tsx`: local dropdown content width and menu item text
  overrides were removed so the menu uses reviewed MUD-clone defaults.
- Local `dropdown-menu` and `menu` bridge files re-export the MUD-clone
  primitives instead of owning a second menu implementation.

Resolved in the ninth audit batch:

- `src/app/pages/Documente.tsx`: desktop document list now uses final Table
  props (`headerStyle` and `zebra`) instead of deprecated aliases.
- `src/app/pages/ControlDetalii.tsx`: related document and request tables now
  use final Table props (`headerStyle` and `zebra`) instead of deprecated
  aliases.
- `src/app/pages/Cereri.tsx`: request list desktop table was migrated from
  page-local raw table markup to reviewed MUD-clone `Table` primitives.
- Active product pages and components no longer contain raw `<table>` markup,
  `striped`, or `density="default"` Table usage.

Resolved in the tenth audit batch:

- `src/app/pages/Controale.tsx`: control cards already used reviewed
  `DetailRow`.
- `src/app/pages/CerereDetalii.tsx`: request detail metadata already used
  reviewed `DetailRow`.
- `src/app/pages/ControlDetalii.tsx`: control detail metadata already used
  reviewed `DetailRow`.
- `src/app/components/company/CompanyCard.tsx`: company details modal already
  used reviewed `DetailRow`.
- `src/app/pages/Documente.tsx`: document preview metadata was migrated from
  page-local grid rows to reviewed `DetailRow`.
- `src/app/pages/Cereri.tsx`: mobile request card rows were previously
  migrated from a page-local `CardRow` layout to reviewed `DetailRow`; they are
  now represented through reviewed `TableCardRow` in the twelfth audit batch.
- `TableCardRow` composes `DetailRow` internally, so table-card
  label/value rows inherit the reviewed primitive.
- Timeline, progress, and icon/text grids remain intentional non-detail-row
  layouts.

Resolved in the eleventh audit batch:

- `src/app/components/ui/separator.tsx`: local Radix separator implementation
  was replaced with a bridge re-export to reviewed MUD-clone `Separator`.
- `src/app/components/ProfileMenu.tsx`: desktop and mobile local SVG separator
  functions were replaced with reviewed `Separator`.
- `src/app/components/ui/sidebar.tsx`: `SidebarSeparator` now composes the
  reviewed separator bridge with sidebar-local spacing only.
- Command, context-menu, menubar, breadcrumb, and OTP separators remain
  deferred because they are primitive-specific legacy/internal surfaces, not
  standalone product separators.

Resolved in the twelfth audit batch:

- `src/app/pages/Documente.tsx`: mobile and tablet document records already
  used reviewed `TableCard`.
- `src/app/pages/ControlDetalii.tsx`: related document and request cards
  already used reviewed `TableCard`.
- `src/app/pages/Cereri.tsx`: mobile request cards were migrated from a
  page-local bordered card and row layout to reviewed `TableCard`,
  `TableCardRow`, and `TableCardSeparator`.
- `TableCardRow` composes reviewed `DetailRow`, so small-screen table cards
  share the same label/value row primitive as detail screens.

Resolved in the thirteenth audit batch:

- `mud-clone/src/components/section-heading.tsx`: section heading typography now
  uses MUD heading typography tokens instead of hard-coded font size, weight,
  line height, and letter spacing.
- `src/app/pages/Cereri.tsx`: `Toate cererile` and its count were migrated from
  page-local heading/count markup to reviewed `SectionHeading`.
- `src/app/pages/CerereDetalii.tsx`: local `SectionTitle` was removed and
  request detail sections now use reviewed `SectionHeading`.
- `src/app/pages/ControlDetalii.tsx`: the local section header helper now uses
  the `SectionHeading` action slot instead of recreating the title/action row.
- `src/app/pages/Notificari.tsx`: notification period sections now use reviewed
  `SectionHeading`.

Intentional/deferred exceptions:

| File | Pattern | Reason |
| --- | --- | --- |
| `src/app/components/ui/command.tsx` | Internal `CommandPrimitive.Input`. | Command palette primitive; audit separately if command surfaces become active product scope. |
| `src/app/components/ui/notification-card.tsx` | Absolute overlay raw `<button>`. | Intentional card click target; keep unless the card component gets a dedicated DS clickable-card primitive. |
| `src/app/components/ui/sidebar.tsx` | `SidebarInput`, raw buttons, `SidebarMenuBadge`, and sidebar menu primitives. | Legacy shadcn-style sidebar surface; it already wraps MUD-clone `Input`, but sidebar-specific controls are deferred with the rest of the sidebar review. |
| `src/app/components/ui/chip.tsx` | Internal dismiss raw `<button>`. | Legacy local primitive; review when `Chip` is promoted, replaced by `Tag`, or removed. |
| `src/app/components/ProfileMenu.tsx` | Figma-imported logo/header artwork. | Imported visual artwork, not individual system icons. Keep until header/logo surfaces are reviewed as their own components. |
| `src/app/components/WorkspaceMobileMenu.tsx` | Figma-imported logo/header/action SVG artwork. | Imported mobile header/menu artwork, not individual system icons. Keep until the mobile header/menu is promoted into reviewed DS primitives. |
| `src/app/components/ui/carousel.tsx` | Lucide carousel arrows. | Legacy internal shadcn-style primitive; review if carousel enters active product scope. |
| `src/app/components/ui/context-menu.tsx` | Legacy context-menu primitive with lucide state/submenu icons. | Separate contextual primitive, not active product menu scope; review if contextual menus enter product scope. |
| `src/app/components/ui/menubar.tsx` | Legacy menubar primitive with lucide state/submenu icons. | Separate menu-bar primitive, not active product menu scope; review if menubars enter product scope. |
| `src/app/components/ui/resizable.tsx` | Lucide resize handle icon. | Legacy internal utility primitive; not part of active product icon usage. |
| `src/app/components/ui/input-otp.tsx` | Lucide OTP separator icon. | Legacy internal form primitive; audit if OTP is promoted into active product scope. |
| `src/app/components/ui/navigation-menu.tsx` | Navigation menu primitive. | Navigation component, not compact action/dropdown menu; review with navigation surfaces. |

### Component Adoption Guardrails

The first component-adoption guardrail is active. `npm run build` now runs
`npm run check:components`, which fails on:

- new raw `<button>` usage in active `src/app/pages` and `src/app/components`
  surfaces, except the documented deferred internal primitives;
- the old `WorkspaceHeader` notification-count pseudo-element path
  (`data-notification-count`, `data-notification-has-unread`, or notification
  trigger `::after` styling).

Allowed raw-button exceptions are intentionally narrow and count-based:

- `src/app/components/ui/chip.tsx`: one internal dismiss button.
- `src/app/components/ui/notification-card.tsx`: one intentional card click
  target.
- `src/app/components/ui/sidebar.tsx`: one legacy shadcn sidebar trigger.

If a new design needs a button-like or selectable pattern that does not fit
`Button`, `Link`, or `Menu`, keep product-specific behavior in the consuming
app. If a generic reusable card pattern is needed later, create a new
generalized MUD-clone component with a fresh API.

## Recommended Next Actions

1. Review deferred foundation values during the related component review instead
   of migrating them mechanically.
2. Audit Tailwind shadow utilities component-by-component, starting with
   MUD-clone controls before legacy shadcn primitives.
3. Continue formal review for the next unreviewed components:
   `PhoneNumberInput`, `SegmentedControl`, or `Tooltip`.
4. Later, remove `--app-space-*`, `--app-radius-*`, and `--app-shadow-*`
   compatibility aliases once no external or historical references need them.

## Rule For New Work While Audit Is Open

While compatibility aliases remain:

- Do not add new general-purpose `--app-space-*`, `--app-radius-*`, or
  `--app-shadow-*` aliases.
- Prefer existing shared components over page-local spacing/radius/shadow
  styling.
- Do not add raw product `<button>` controls; use reviewed MUD-clone
  primitives or promote a missing pattern first.
- When writing new foundation-level code in `mud-clone`, prefer MUD-native
  `--spacing-*`, `--border-radius-*`, and `--drop-shadow-*` tokens.
- If a component needs a semantic token, name it for the component purpose, not
  as another global scale.
