# MUD-clone

MUD-clone is the RSC project's React implementation of the Moldova government
MUD design system, enhanced with reusable patterns developed during the RSC
project.

This folder is intended to become the design-system source of truth for RSC and
later be moved or copied into a standalone GitHub repository.

## Current Status

`mud-clone/` is now the source of truth for the migrated foundations and core
primitives used by RSC. Standalone packaging work is intentionally on hold
while the project hardens day-to-day RSC usage of this source of truth.

Migrated foundations:

- MUD-derived tokens and app aliases in `src/styles/design-system.css`.
- Onest font declarations in `src/styles/fonts.css`.
- Onest font files in `src/assets/fonts/onest`.
- MUD icons and logos in `src/assets/mud`.

Root exports from `@mud-clone`:

- `Avatar`
- `Badge`
- `Button`
- `DetailRow`
- `Icon`
- `Input`
- `Link`
- `RadioGroup` and `RadioGroupItem`
- `SectionHeading`
- `Switch`
- `TableCard` and related `TableCard*` primitives
- `Tabs` and related `Tabs*` primitives
- `Tag`
- `Textarea`

Subpath-only exports:

- `@mud-clone/components/checkbox`
- `@mud-clone/components/control-card-small`
- `@mud-clone/components/dropdown-menu`
- `@mud-clone/components/dialog`
- `@mud-clone/components/menu`
- `@mud-clone/components/metric-card`
- `@mud-clone/components/modal`
- `@mud-clone/components/mud-icon`
- `@mud-clone/components/mud-logo`
- `@mud-clone/components/pagination`
- `@mud-clone/components/search-input`
- `@mud-clone/components/select`
- `@mud-clone/components/table`
- `@mud-clone/styles/design-system.css`
- `@mud-clone/styles/fonts.css`

## Export Policy

Use the root `@mud-clone` barrel only for lightweight components that do not
load asset registries.

Use component subpaths for components that load MUD icon/logo registries or are
otherwise better kept isolated from unrelated imports. This keeps imports such
as `Button`, `Input`, and `Link` from pulling in the full icon registry.

Every migrated component should also have a package subpath export so future
standalone package consumers can import narrowly.

Current Batch D split:

- Root-safe controls: `Tabs`, `RadioGroup`, and `Switch`.
- Subpath-only controls/overlays: `Modal`, `Dialog`, and `Checkbox`, because
  they load `MudIcon`.

## Documentation

- [Attribution and license notes](./ATTRIBUTION.md)
- [Design system source of truth](./docs/DESIGN_SYSTEM.md)
- [Component source references](./docs/COMPONENT_SOURCES.md)
- [Migration notes](./docs/MIGRATION_NOTES.md)
- [Design system usage audit](./docs/DESIGN_SYSTEM_USAGE_AUDIT.md)
- [Contribution rules](./docs/CONTRIBUTING.md)
- [RSC usage hardening](./docs/RSC_USAGE_HARDENING.md)
- [Standalone readiness](./docs/STANDALONE_READINESS.md)

## Playground

The package has a Vite playground in `examples/playground` for inspecting
MUD-clone foundations, components, and reusable RSC patterns outside the app.
It is intentionally lightweight, but structured like a documentation/reference
surface: each sidebar item has its own route, with token groups, component
variants, and composition examples on focused pages.

From the repository root:

```bash
npm --prefix mud-clone run dev:playground
npm --prefix mud-clone run build:playground
```

Useful foundation routes:

- `/foundations/colors`
- `/foundations/typography`
- `/foundations/spacing`
- `/foundations/borders-radius`
- `/foundations/elevation`
- `/foundations/icons-logos`

## RSC Compatibility

The old RSC files under `src/app/components/ui` remain as compatibility shims
while migration is in progress. New source-of-truth changes should happen in
`mud-clone/src`, not in the shim files.

App-specific pages, domain data, routing, and product workflows stay in RSC.
