# Standalone Readiness

This document tracks what is needed before `mud-clone/` can be copied into its
own GitHub repository and used as an independent design-system package.

Last checked: 2026-07-12.

## Current Assessment

Status: **publish-gate ready pending npm access and manual registry publish**.

Standalone packaging work is intentionally on hold while RSC usage hardening is
active. Current promotion priorities and RSC source-of-truth rules are tracked
in [`RSC_USAGE_HARDENING.md`](./RSC_USAGE_HARDENING.md).

The reusable source files are already concentrated under `mud-clone/src`, and
the current audit did not find direct imports from RSC app paths inside
`mud-clone/src`. The package now has explicit dependency metadata, generated
asset registries, declaration output, built package export paths, a
package-owned Vite build check, a preview, scoped package identity, Changesets,
and release-readiness CI. The main remaining work is npm registry access and a
deliberate manual publish of the approved version.

## Two-Repository Usage Plan

The intended long-term relationship is:

- **Official MUD repository**: reference source for upstream design decisions,
  assets, and component behavior.
- **MUD-clone repository**: our reusable React design-system implementation and
  source of truth for shared UI. Target GitHub repository:
  [`evg-org/mud-clone`](https://github.com/evg-org/mud-clone.git).
- **RSC repository**: the product/prototype application that consumes MUD-clone
  and keeps product-specific pages, routing, workflows, and domain data.

The extraction flow should be:

1. Continue hardening `mud-clone/` inside the RSC repository until reusable
   foundations, assets, and reviewed components live there consistently.
2. Finish remaining standalone readiness items: registry access and explicit
   approval for the package version being published.
3. Create the separate MUD-clone GitHub repository. Done:
   [`evg-org/mud-clone`](https://github.com/evg-org/mud-clone.git).
4. Copy or move the `mud-clone` package contents into that repository. Done:
   the initial package snapshot is pushed to `origin/main`.
5. Make RSC consume MUD-clone as a dependency instead of relying on the local
   source folder. Short-term local link is in place with
   `mud-clone: file:../mud-clone`.
6. Replace local source-path usage and temporary RSC shims with package imports
   where practical.
7. Use versioned `@evg-org/mud-clone` releases to update RSC intentionally.

Recommended connection model:

- **Short term**: use a local file dependency while validating same-machine
  changes before the scoped package is published.
- **Long term**: publish `@evg-org/mud-clone` with SemVer releases, then update
  the RSC dependency version when a release is ready to adopt.

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
| Standalone GitHub repository | Created | Target repository exists at `https://github.com/evg-org/mud-clone.git`, and the initial package snapshot is pushed to `main`. | Keep future reusable DS changes flowing into the standalone repo first. |
| RSC source coupling | Reduced | The package `src` directory does not import `src/app`, `@/`, or RSC page/domain modules. RSC now declares `mud-clone: file:../mud-clone`, resolves package imports through the installed local link, and runs `check:mud-clone-link` before build. RSC compatibility shims still exist. | Keep shims temporary; replace direct source-path usage with package imports after the package name/export strategy is settled. |
| Vite coupling | Reduced | `MudLogo` uses a generated source registry. `MudIcon` still uses Vite `import.meta.glob` for lazy icon URL loading, and the package build normalizes emitted icon/logo URLs so consumers resolve package-owned assets instead of app-root `/assets` paths. | Keep generated registries and build asset normalization in sync; revisit only if a future package target cannot consume `new URL` asset references. |
| Package exports | Ready for internal handoff | `mud-clone/package.json` exports the root barrel, every current component subpath, and the CSS foundation files from built `dist` paths. Type conditions point to matching declaration files. | Revisit only if the public package name or output layout changes. |
| Package dependencies | Mostly ready | `mud-clone/package.json` now lists React peers and the current Radix, CVA, utility, and icon dependencies used by source files. Versions match the parent app baseline. | Revisit peer-versus-direct dependency policy before publication. |
| Package scripts/files | Release-ready | `mud-clone/package.json` now declares a narrowed publish allowlist, `sideEffects`, asset generation/check scripts, declaration generation, build asset copying, build output validation, package build, clean consumer validation, preview scripts, Changesets scripts, and `check:release`. | Revisit only if the registry target changes. |
| Package build | Mostly ready | `mud-clone/vite.config.ts` can build the root barrel and current component subpaths as an ES module library bundle. `npm run build` also emits declarations, copies CSS/font assets, and validates exported build artifacts. | Verify a clean consumer install before release. |
| CSS and font assets | Mostly ready | CSS uses relative font URLs to copied Onest files under `mud-clone/src/assets/fonts/onest`; the package build now copies styles to `dist/styles` and fonts to `dist/assets/fonts`. | Verify asset URL behavior again in a clean consuming app before release. |
| Icon and logo assets | Mostly ready | MUD assets are copied under `mud-clone/src/assets/mud` and resolved by generated registries consumed by `MudIcon`/`MudLogo`. | Decide whether to ship all copied assets or prune to a documented supported set. |
| Documentation | Good baseline | `DESIGN_SYSTEM.md`, `COMPONENT_SOURCES.md`, `MIGRATION_NOTES.md`, and `CONTRIBUTING.md` exist. | Add install/import examples and standalone package usage docs. |
| Examples/preview | In progress | `examples/preview` is a package-owned, page-based Vite reference surface that imports MUD-clone primitives through `@mud-clone` aliases and documents foundations, components, and reusable RSC patterns. | Keep adding focused page routes when new reusable primitives are added. |
| Attribution/license | Documented, needs approval before release | `ATTRIBUTION.md` records upstream MUD, copied assets, Onest font, and license cautions. The package remains `UNLICENSED`. | Get explicit legal/publication clearance before open-source licensing or package publication. |
| Package name | Decided | Current `name` is `@evg-org/mud-clone`, `version` is `1.0.0`, and package metadata is publish-enabled. | Publish only after npm access and release owner approval are confirmed. |
| Versioning/release process | Configured | Changesets, `CHANGELOG.md`, SemVer policy, `check:release`, and release-readiness CI are in place. | Configure registry token and publish only after approval. |

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
- [x] Package-owned asset strategy is generated or build-normalized instead of
  depending on consumer app-root asset paths.
- [x] Declaration output and built export paths are configured for internal
  package handoff.
- [x] License and upstream MUD attribution notes are documented.
- [x] Page-based examples/preview exists.
- [x] Two-repository usage plan is documented.
- [x] Separate MUD-clone GitHub repository exists.
- [x] Package build output validates exported JS, CSS, and font artifacts.
- [x] Initial package snapshot is copied to and pushed from the standalone repo.
- [x] RSC has a short-term local dependency link to the standalone repo.
- [x] RSC build validates the local MUD-clone dependency link.
- [x] Package build emits declaration types and finalized CSS/assets paths.
- [x] `npm run check:consumer` validates clean local tarball consumption,
  documented imports, CSS/font assets, icon/logo assets, Radix-backed
  components, and TypeScript declarations.
- [x] Final package name is `@evg-org/mud-clone`.
- [x] Versioning, changelog, and release-readiness workflow are configured.
- [x] Package metadata is publish-enabled by omitting `private: true`.
- [ ] npm registry access is configured for the release owner.
- [ ] Registry publication of `@evg-org/mud-clone@1.0.0` is completed.

## Recommended Next Steps When Standalone Work Resumes

1. Repeat `npm run check:release` before each release candidate.
2. Confirm npm registry access and approval for the exact version.
3. Publish the approved package version manually.
4. Expand the preview as new reusable primitives are added.

## Declaration And Export Path Decision

Decision: package exports now point at built `dist` artifacts, and each
component export has a matching `types` condition.

Reasons:

- Internal consumers should import the package like a real dependency instead
  of relying on source-path exports.
- `tsc -p tsconfig.declarations.json` emits declaration files for the root
  barrel and component subpaths.
- `npm run check` validates package export source inputs before build, while
  `npm run build` validates the emitted JavaScript, declarations, CSS, and font
  assets under `dist`.
- CSS foundation exports point at `dist/styles`, and copied font assets live
  under `dist/assets/fonts`.

## Asset Registry Decision

Decision: replace runtime asset globs with generated source registries.

Files:

- `scripts/generate-asset-registries.mjs`
- `src/generated/mud-icons.ts`
- `src/generated/mud-logos.ts`

Reasons:

- Runtime components no longer depend on Vite-only `import.meta.glob`.
- `MudIcon` and `MudLogo` import normal TypeScript registry modules.
- Registry output is deterministic and checked by `npm run check`.
- `new URL(..., import.meta.url).href` keeps asset references explicit and
  works with the current package Vite build.

Commands:

```bash
npm run generate:assets
npm run check
npm run build
```
