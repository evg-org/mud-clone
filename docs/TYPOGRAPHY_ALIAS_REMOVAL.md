# Typography Alias Removal

This document records the completed removal of the local `--app-type-*`
compatibility aliases. These aliases were useful while RSC pages were being
migrated into MUD-clone, but they duplicated the responsive MUD typography token
layer.

## Rule

- Do not add new `--app-type-*` aliases.
- Do not use `--app-type-*` in new component or page code.
- Prefer responsive MUD typography tokens such as `--text-heading-h3-sm-*`,
  `--text-body-md-*`, and `--text-caption-md-*`.
- `check:typography` blocks `--app-type-*` from returning in runtime source.

## Historical Alias Map

Each alias maps property-by-property. For example,
`--app-type-heading-sm-font-size` maps to
`--text-heading-h3-sm-font-size`.

| Local alias prefix | Preferred responsive token prefix |
| --- | --- |
| `--app-type-display-lg-*` | `--text-display-lg-*` |
| `--app-type-display-md-*` | `--text-display-md-*` |
| `--app-type-heading-lg-*` | `--text-heading-h1-lg-*` |
| `--app-type-heading-md-*` | `--text-heading-h2-md-*` |
| `--app-type-heading-sm-*` | `--text-heading-h3-sm-*` |
| `--app-type-heading-xs-*` | `--text-heading-h4-xs-*` |
| `--app-type-heading-2xs-*` | `--text-heading-h5-2xs-*` |
| `--app-type-body-lg-*` | `--text-body-lg-*` |
| `--app-type-body-lg-strong-*` | `--text-body-lg-500-*` |
| `--app-type-body-md-*` | `--text-body-md-*` |
| `--app-type-body-md-strong-*` | `--text-body-md-500-*` |
| `--app-type-body-sm-*` | `--text-body-sm-*` |
| `--app-type-body-sm-strong-*` | `--text-body-sm-500-*` |
| `--app-type-caption-*` | `--text-caption-md-*` |
| `--app-type-caption-strong-*` | `--text-caption-md-500-*` |
| `--app-type-caption-sm-*` | `--text-caption-sm-*` |

## Migration Order

1. [x] Document `--app-type-*` as temporary compatibility.
2. [x] Migrate MUD-clone preview/documentation CSS.
3. [x] Migrate MUD-clone component CSS/classes.
4. [x] Migrate RSC compatibility bridge and active pages/components.
   - [x] Root reusable UI components in `src/app/components/ui`.
   - [x] Root control support tokens in `src/styles/design-system.css`.
   - [x] Active RSC page and feature component usage.
   - [x] Root compatibility typography utilities in `src/styles/theme.css`.
5. [x] Migrate or retire experiment/prototype import surfaces.
6. [x] Remove `--app-type-*` definitions after usage reaches zero.
7. [x] Add a guardrail check so the alias layer does not return.

## Verification

After each migration slice:

```bash
npm --prefix mud-clone run check
npm --prefix mud-clone run build:preview
```

Run the root build when the RSC app or shared root CSS is touched:

```bash
npm run build
```
