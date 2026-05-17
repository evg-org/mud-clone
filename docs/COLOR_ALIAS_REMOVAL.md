# Color Alias Removal

This document tracks the removal of the local `--app-color-*` compatibility
layer. Upstream MUD provides primitive colors and semantic color tokens, but it
does not provide `--app-color-*` aliases. New code should use MUD semantic
color tokens directly.

## Rule

- Do not add new `--app-color-*` aliases.
- Do not use `--app-color-*` in new component or page code.
- Keep existing aliases only until current usage is migrated.
- Remove alias definitions only after all usage has moved to MUD semantic
  tokens.

## Alias Map

| Temporary alias | MUD semantic replacement |
| --- | --- |
| `--app-color-background` | `--color-background-base-default` |
| `--app-color-surface` | `--color-background-base-default` |
| `--app-color-surface-subtle` | `--color-background-base-secondary` |
| `--app-color-surface-muted` | `--color-background-base-tertiary` |
| `--app-color-surface-inverse` | `--color-background-base-inverse-default` |
| `--app-color-surface-brand` | `--color-background-brand-default` |
| `--app-color-surface-brand-hover` | `--color-background-brand-default-hover` |
| `--app-color-surface-brand-active` | `--color-background-brand-default-active` |
| `--app-color-surface-brand-muted` | `--color-background-brand-secondary` |
| `--app-color-surface-brand-muted-hover` | `--color-background-brand-secondary-hover` |
| `--app-color-surface-brand-muted-active` | `--color-background-brand-secondary-active` |
| `--app-color-surface-danger` | `--color-background-danger-default` |
| `--app-color-surface-danger-hover` | `--color-background-danger-default-hover` |
| `--app-color-surface-danger-active` | `--color-background-danger-default-active` |
| `--app-color-surface-danger-muted` | `--color-background-danger-secondary` |
| `--app-color-surface-disabled` | `--color-background-disabled-default` |
| `--app-color-text-primary` | `--color-text-base-default` |
| `--app-color-text-secondary` | `--color-text-base-secondary` |
| `--app-color-text-tertiary` | `--color-text-base-tertiary` |
| `--app-color-text-inverse` | `--color-text-base-inverse-default` |
| `--app-color-text-on-color` | `--color-text-base-inverse-on-color` |
| `--app-color-text-brand` | `--color-text-brand-default` |
| `--app-color-text-brand-hover` | `--color-text-brand-default-hover` |
| `--app-color-text-brand-on-muted` | `--color-text-brand-on-secondary` |
| `--app-color-text-danger` | `--color-text-danger-default` |
| `--app-color-text-disabled` | `--color-text-disabled-default` |
| `--app-color-link-primary` | `--color-link-primary-default` |
| `--app-color-link-primary-hover` | `--color-link-primary-hover` |
| `--app-color-link-primary-visited` | `--color-link-primary-visited` |
| `--app-color-link-strict` | `--color-link-strict-default` |
| `--app-color-link-strict-hover` | `--color-link-strict-hover` |
| `--app-color-link-white` | `--color-link-white-default` |
| `--app-color-icon-inverse` | `--color-icon-base-inverse-on-color` |
| `--app-color-border-default` | `--color-border-base-default` |
| `--app-color-border-subtle` | `--color-border-base-secondary` |
| `--app-color-border-strong` | `--color-border-base-strong` |
| `--app-color-border-brand` | `--color-border-brand-default` |
| `--app-color-border-danger` | `--color-border-danger-default` |
| `--app-color-border-disabled` | `--color-border-disabled-default` |
| `--app-color-focus-ring` | `--focus-ring` |

## Migration Order

1. [x] Stop documenting `--app-color-*` as foundation colors.
2. [x] Mark `--app-color-*` aliases as temporary compatibility.
3. [x] Migrate MUD-clone playground/documentation CSS.
4. [x] Migrate MUD-clone component CSS/classes.
5. [x] Migrate RSC compatibility bridge and active pages/components.
6. [x] Migrate or retire experiment/prototype import surfaces.
7. [x] Remove `--app-color-*` definitions after usage reaches zero.

## Verification

The removed aliases are guarded by `check:colors` scripts in both the RSC app
and MUD-clone. These checks fail if `--app-color-*` appears again in runtime
source:

```bash
npm run check:colors
npm --prefix mud-clone run check:colors
```

After each migration slice:

```bash
npm --prefix mud-clone run check
npm --prefix mud-clone run build:playground
```

Run the root build when the RSC app or shared root CSS is touched:

```bash
npm run build
```
