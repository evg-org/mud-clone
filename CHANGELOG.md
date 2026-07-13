# @evg-org/mud-clone

## 1.0.1

### Patch Changes

- Loosen React peer dependency range for consuming apps.
- Add a package-owned compiled `styles/components.css` export so consumers do
  not need Tailwind source scanning for MUD-clone component styling.

## 1.0.0

Initial scoped package release baseline for MUD-clone.

- Renames the package identity from `mud-clone` to `@evg-org/mud-clone`.
- Keeps package exports pointed at built `dist` files for root imports, component subpaths, and style imports.
- Enables the package for a manual registry publish while keeping `license: "UNLICENSED"`.
- Establishes Changesets, SemVer policy, and release-readiness validation for future versioned releases.
