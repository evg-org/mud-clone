# RSC Usage Hardening

This document tracks the work needed to make `mud-clone/` the practical
source of truth for RSC UI work before we add more product components.

Last checked: 2026-05-17.

## Current Decision

Standalone package publication readiness is on hold for now, but RSC now has a
short-term local dependency link to the standalone MUD-clone repository:
`mud-clone: file:../mud-clone`.

The active priority is RSC design-system usage hardening:

- New reusable UI implementation belongs in the standalone repo's `src`
  directory.
- Existing `src/app/components/ui` files should either be compatibility shims
  or explicitly app-owned exceptions.
- RSC pages should compose with `mud-clone` primitives instead of recreating
  styles locally.
- Product workflows, routing, domain data, generated page shells, and
  business-specific cards stay in RSC until generalized.

## Current Source Of Truth

The standalone repo's `src` directory already owns the migrated foundations and
core primitives:

- Foundations, Onest fonts, MUD icons, and MUD logos.
- `Avatar`, `Badge`, `Button`, `DetailRow`, `Icon`, `Input`, `Link`,
  `RadioGroup`, `SectionHeading`, `Switch`, `Tabs`, `TableCard`, `Tag`, and
  `Textarea`.
- Subpath primitives for `Checkbox`, `ControlCardSmall`, `Dialog`,
  `DropdownMenu`, `Menu`, `MetricCard`, `Modal`, `MudIcon`, `MudLogo`,
  `Pagination`, `SearchInput`, `Select`, and `Table`.

The old RSC paths under `src/app/components/ui` remain useful during migration,
but their long-term role is compatibility only. When a file is a shim, it
should not contain independent styling or behavior.

RSC must also keep the linked package source in `src/styles/tailwind.css`
source scanning while it consumes source-path components. The current short-term
path is `../../node_modules/mud-clone/src/**/*.{js,ts,jsx,tsx}`. Otherwise
MUD-clone utility classes will not be emitted in the app stylesheet.

RSC now runs `npm run check:mud-clone-link` before the normal prototype,
foundation, and component checks. That guard verifies:

- `package.json` and `package-lock.json` use `mud-clone: file:../mud-clone`.
- `node_modules/mud-clone` is a local link to the standalone repo.
- Runtime Vite/Tailwind/preview paths do not point back to the old in-repo
  `mud-clone` source folder.

The color, typography, and foundation alias checks also scan
`node_modules/mud-clone` so they validate the linked standalone source, not the
old local copy.

## Current RSC Usage

Direct `@mud-clone` usage already exists in active RSC pages:

- `src/app/pages/Controale.tsx` uses `DetailRow` and `SectionHeading` from
  `@mud-clone`.
- `src/app/pages/Documente.tsx` uses `Button`, `TableCard`, `Tag`, `Link`,
  `Select`, `Table`, `Pagination`, and `Modal` through `@mud-clone` or
  component subpaths.
- `src/app/pages/Cereri.tsx` uses `Input`, `Textarea`, `Dialog`, and `DropdownMenu`
  through `@mud-clone` or component subpaths.
- `src/app/pages/Workspace.tsx` uses `MetricCard` and `ControlCardSmall`
  through component subpaths.

Several active pages still import migrated primitives through compatibility
shims. That is acceptable while migration is in progress, but new work should
prefer direct `@mud-clone` imports once the relevant primitive already lives in
`mud-clone`.

## Promote Before Adding Similar New Work

These are the remaining RSC UI implementations that should be promoted before
we create new variations of the same pattern.

Completed in Phase 6:

- `SectionHeading` now lives in `mud-clone/src/components/section-heading.tsx`.
- `Textarea` now lives in `mud-clone/src/components/textarea.tsx`.
- `Pagination` now lives in `mud-clone/src/components/pagination.tsx`.

| Priority | Component | Current path | Recommendation |
| --- | --- | --- | --- |
| P1 | PersonCard | `src/app/components/ui/person-card.tsx` | Promote when it is needed outside the current company modal flow, or before adding another person/entity card. Treat as a MUD-clone extension built on `Avatar`. |
| P1 | NotificationCard | `src/app/components/ui/notification-card.tsx` | Promote the reusable card surface once product notification data/actions stay outside it. Keep `NotificationList` and routing behavior app-owned for now. |
| P2 | Carousel | `src/app/components/ui/carousel.tsx` | Audit before any promotion. It is currently experiment-driven, so do not move it until a real RSC design needs it. |

## Keep App-Owned For Now

These pieces should not be moved into `mud-clone` yet because they encode RSC
product structure, routing, generated Figma output, or domain behavior:

- `src/app/components/company/CompanyCard.tsx`
- `src/app/components/notifications/NotificationCenter.tsx`
- `src/app/components/notifications/NotificationList.tsx`
- `src/app/components/notifications/NotificationsMenu.tsx`
- `src/app/components/ProfileMenu.tsx`
- `src/app/components/WorkspaceHeader.tsx`
- `src/app/components/WorkspaceMobileMenu.tsx`
- `src/app/components/PublicHeader.tsx`
- `src/app/components/HeroSection.tsx`
- `src/app/components/NoutatiSection.tsx`
- `src/app/components/StickyHeader.tsx`
- Page files, route state, domain data, mock data, and API adapters.

Some of these may later split into reusable surfaces plus product state. Do
that only when the reusable boundary is obvious and there is at least one real
reuse case.

## Legacy UI Inventory

`src/app/components/ui` still contains many non-migrated or unused shadcn-style
files, including `accordion`, `alert`, `alert-dialog`, `aspect-ratio`,
`breadcrumb`, `calendar`, `card`, `chart`, `chip`, `collapsible`, `command`,
`context-menu`, `cookie-banner`, `drawer`, `form`, `hover-card`, `input-otp`,
`label`, `menubar`, `navigation-menu`, `popover`, `progress`,
`progress-tracker`, `resizable`, `scroll-area`, `separator`, `sheet`,
`sidebar`, `skeleton`, `slider`, `sonner`, `spinner`, `stat-card`, `toggle`,
`toggle-group`, `tooltip`, and `use-mobile`.

Do not delete these blindly. First audit active imports, experiment imports,
and generated Figma imports. Then decide whether each file should be promoted,
kept app-owned, or removed.

## Workflow For New RSC Designs

Before implementing a new design:

1. Check whether the UI pattern is already covered by `mud-clone`.
2. If it is covered, use the `@mud-clone` root export or component subpath.
3. If it is a reusable pattern that currently exists only under
   `src/app/components/ui`, promote it into `mud-clone` before creating a new
   variant.
4. If it is product-specific, keep it in RSC and compose it from `mud-clone`
   primitives.
5. Keep old RSC import paths as shims only when they are still needed during
   migration.
6. Update `COMPONENT_SOURCES.md` for MUD-backed components.
7. Update `MIGRATION_NOTES.md` for MUD-clone extensions or intentional
   differences.
8. Run the relevant MUD-clone checks in the standalone repo.
9. Run `npm run build` in RSC.
10. If the playground is affected, run
    `npm run build:playground` in the standalone repo.

## Recommended Phase 6 Order

1. [x] Promote `SectionHeading`.
2. [x] Promote `Textarea`.
3. [x] Promote `Pagination`.
4. Promote or explicitly defer `PersonCard`.
5. Promote or explicitly defer `NotificationCard`.
6. Clean up direct active-page imports so migrated primitives are imported from
   `@mud-clone` instead of old shims where practical.
7. Audit legacy `src/app/components/ui` files for remove/promote/keep
   decisions.

## Standalone Work Hold

Do not continue declaration output, final built export paths, package naming,
legal release review, or versioning work until standalone publication work
resumes.

The package-readiness notes remain in `STANDALONE_READINESS.md`, but they are
not the current next step.
