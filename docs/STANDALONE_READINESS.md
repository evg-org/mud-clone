# Standalone Readiness

This document tracks what is needed before `mud-clone/` can be copied into its
own GitHub repository and used as an independent design-system package.

Last checked: 2026-05-17.

## Current Assessment

Status: **not standalone-ready yet, but source coupling is low**.

Standalone packaging work is intentionally on hold while RSC usage hardening is
active. Current promotion priorities and RSC source-of-truth rules are tracked
in [`RSC_USAGE_HARDENING.md`](./RSC_USAGE_HARDENING.md).

The reusable source files are already concentrated under `mud-clone/src`, and
the current audit did not find direct imports from RSC app paths inside
`mud-clone/src`. The package now has explicit dependency metadata, generated
asset registries, a package-owned Vite build check, and a minimal playground.
The main remaining work is declaration output, final built export paths, legal
clearance, naming, and versioning.

## Two-Repository Usage Plan

The intended long-term relationship is:

- **Official MUD repository**: reference source for upstream design decisions,
  assets, and component behavior.
- **MUD-clone repository**: our reusable React design-system implementation and
  source of truth for shared UI. Target GitHub repository:
  [`evgheniif/mud-clone`](https://github.com/evgheniif/mud-clone.git).
- **RSC repository**: the product/prototype application that consumes MUD-clone
  and keeps product-specific pages, routing, workflows, and domain data.

The extraction flow should be:

1. Continue hardening `mud-clone/` inside the RSC repository until reusable
   foundations, assets, and reviewed components live there consistently.
2. Finish standalone readiness items: declaration output, final built export
   paths, package/repo name, legal clearance, dependency policy, and versioning.
3. Create the separate MUD-clone GitHub repository. Done:
   [`evgheniif/mud-clone`](https://github.com/evgheniif/mud-clone.git).
4. Copy or move the `mud-clone` package contents into that repository. Done:
   the initial package snapshot is pushed to `origin/main`.
5. Make RSC consume MUD-clone as a dependency instead of relying on the local
   source folder. Short-term local link is in place with
   `mud-clone: file:../mud-clone`.
6. Replace local source-path usage and temporary RSC shims with package imports
   where practical.
7. Use versioned MUD-clone releases to update RSC intentionally.

Recommended connection model:

- **Short term**: use a Git dependency or local link while validating the split
  and testing changes across both repositories.
- **Long term**: publish MUD-clone as a private package with SemVer releases,
  then update the RSC dependency version when a release is ready to adopt.

Workflow rules after the split:

- Reusable design-system changes happen in MUD-clone first.
- RSC updates its MUD-clone dependency version when it is ready to consume a
  change.
- Product-specific code stays in RSC and composes MUD-clone primitives.
- Official MUD updates are reviewed manually and selectively applied to
  MUD-clone; they are not synced automatically.

## Inventory

| Area | Status | Notes | Next action |
| --- | --- | --- | --- |
| Standalone GitHub repository | Created | Target repository exists at `https://github.com/evgheniif/mud-clone.git`, and the initial package snapshot is pushed to `main`. | Keep future reusable DS changes flowing into the standalone repo first. |
| RSC source coupling | Reduced | The package `src` directory does not import `src/app`, `@/`, or RSC page/domain modules. RSC now declares `mud-clone: file:../mud-clone` and resolves `@mud-clone` through the installed local link at `node_modules/mud-clone/src`. RSC compatibility shims still exist. | Keep shims temporary; replace direct source-path usage with final package imports after the package name/export strategy is settled. |
| Vite coupling | Reduced | `MudIcon` and `MudLogo` use generated source registries instead of runtime `import.meta.glob`. The registries use explicit `new URL(..., import.meta.url).href` asset references. | Keep generated registries in sync; revisit only if a future package target cannot consume `new URL` asset references. |
| Package exports | Mostly ready | `mud-clone/package.json` exports the root barrel, every current component subpath, and the CSS foundation files from source paths. Built export paths are intentionally deferred, but `check:build-output` now validates matching `dist` artifacts after `build`. | Decide final built export paths after declaration output and final asset output paths are settled. |
| Package dependencies | Mostly ready | `mud-clone/package.json` now lists React peers and the current Radix, CVA, utility, and icon dependencies used by source files. Versions match the parent app baseline. | Revisit peer-versus-direct dependency policy before publication. |
| Package scripts/files | Partially ready | `mud-clone/package.json` now declares `files`, `sideEffects`, asset generation/check scripts, build asset copying, build output validation, package build, and playground scripts. | Add a package-owned type declaration output step before publication. |
| Package build | Partially ready | `mud-clone/vite.config.ts` can build the root barrel and current component subpaths as an ES module library bundle. `npm --prefix mud-clone run build` also copies CSS/font assets and validates exported build artifacts. Type declaration output is intentionally deferred for now. | Add declaration output and final built export paths. |
| CSS and font assets | Mostly ready | CSS uses relative font URLs to copied Onest files under `mud-clone/src/assets/fonts/onest`; the package build now copies styles to `dist/styles` and fonts to `dist/assets/fonts`. | Verify asset URL behavior again after final package export paths are chosen. |
| Icon and logo assets | Mostly ready | MUD assets are copied under `mud-clone/src/assets/mud` and resolved by generated registries consumed by `MudIcon`/`MudLogo`. | Decide whether to ship all copied assets or prune to a documented supported set. |
| Documentation | Good baseline | `DESIGN_SYSTEM.md`, `COMPONENT_SOURCES.md`, `MIGRATION_NOTES.md`, and `CONTRIBUTING.md` exist. | Add install/import examples and standalone package usage docs. |
| Examples/playground | In progress | `examples/playground` is a package-owned, page-based Vite reference surface that imports MUD-clone primitives through `@mud-clone` aliases and documents foundations, components, and reusable RSC patterns. | Keep adding focused page routes when new reusable primitives are added. |
| Attribution/license | Documented, needs review before release | `ATTRIBUTION.md` records upstream MUD, copied assets, Onest font, and license cautions. The package remains `UNLICENSED` and `private`. | Get explicit legal/publication clearance before public repo creation or package publication. |
| Package name | Undecided | Current `name` is `mud-clone`, `private` is `true`, and `version` is `0.0.0`. | Decide final package/repo name before publishing or copying. |
| Versioning/release process | Missing | No release policy exists. | Decide SemVer policy, changelog format, and how RSC consumes updates after split. |

## External Dependencies Found In Source

These imports must be reflected in standalone package metadata before the
package is copied out:

- `@radix-ui/react-avatar`
- `@radix-ui/react-checkbox`
- `@radix-ui/react-dialog`
- `@radix-ui/react-dropdown-menu`
- `@radix-ui/react-radio-group`
- `@radix-ui/react-select`
- `@radix-ui/react-slot`
- `@radix-ui/react-switch`
- `@radix-ui/react-tabs`
- `class-variance-authority`
- `clsx`
- `lucide-react`
- `react`
- `react-dom`
- `tailwind-merge`

`react` and `react-dom` should stay peer dependencies. The remaining packages
need an explicit dependency policy before standalone extraction.

## Copy Readiness Checklist

- [x] Reusable implementation lives under `mud-clone/src`.
- [x] No direct RSC app imports were found in `mud-clone/src`.
- [x] Component and style subpath exports exist for current primitives.
- [x] Package metadata lists current required runtime dependencies.
- [x] Package has an initial package-owned export check script.
- [x] Package build emits package JavaScript and assets for the current source.
- [x] Asset registry strategy uses generated source registries instead of
  runtime `import.meta.glob`.
- [x] Declaration output and built export paths are explicitly deferred until
  after final package output paths are settled.
- [x] License and upstream MUD attribution notes are documented.
- [x] Page-based examples/playground exists.
- [x] Two-repository usage plan is documented.
- [x] Separate MUD-clone GitHub repository exists.
- [x] Package build output validates exported JS, CSS, and font artifacts.
- [x] Initial package snapshot is copied to and pushed from the standalone repo.
- [x] RSC has a short-term local dependency link to the standalone repo.
- [ ] Package build emits declaration types and finalized CSS/assets paths.
- [ ] Legal/publication clearance for standalone release is confirmed.
- [ ] Final package/repo name is decided.
- [ ] Versioning and RSC update workflow are decided.

## Recommended Next Steps When Standalone Work Resumes

1. Add declaration output and decide final built export paths.
2. Confirm legal/publication clearance for standalone release.
3. Decide package name and release/update flow.
4. Expand the playground as new reusable primitives are added.

## Declaration And Export Path Decision

Decision: keep package exports pointed at source paths for now and defer
declaration output until final package output paths are settled.

Reasons:

- The current workspace does not have a local `tsc` binary available.
- Adding declaration generation now would require new TypeScript tooling or a
  declaration plugin before the package extraction model is finalized.
- `MudIcon` and `MudLogo` now use generated registries, but the final built
  output shape may still change when declaration and asset output paths are
  finalized.
- Source-path exports are still useful inside the current RSC/Vite app and are
  already covered by `npm --prefix mud-clone run check`.
- `npm --prefix mud-clone run build` now validates that matching JavaScript,
  CSS, and font artifacts exist under `dist`, but the package manifest still
  intentionally exposes source paths until declaration and final distribution
  paths are decided.

This should be revisited after deciding declaration tooling and final
distribution paths.

## Asset Registry Decision

Decision: replace runtime asset globs with generated source registries.

Files:

- `scripts/generate-asset-registries.mjs`
- `src/generated/mud-icons.ts`
- `src/generated/mud-logos.ts`

Reasons:

- Runtime components no longer depend on Vite-only `import.meta.glob`.
- `MudIcon` and `MudLogo` import normal TypeScript registry modules.
- Registry output is deterministic and checked by
  `npm --prefix mud-clone run check`.
- `new URL(..., import.meta.url).href` keeps asset references explicit and
  works with the current package Vite build.

Commands:

```bash
npm --prefix mud-clone run generate:assets
npm --prefix mud-clone run check
npm --prefix mud-clone run build
```
