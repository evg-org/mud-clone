# Release Process

MUD-clone releases use the scoped package name `@evg-org/mud-clone`.

Package metadata is publish-enabled, but registry publication must remain a
manual release owner action. The selected registry is GitHub Packages at
`https://npm.pkg.github.com`. Do not run a registry publish until GitHub package
access and approval for the exact version are confirmed.

Publish auth requires a GitHub token with `write:packages`. Consumers installing
from GitHub Packages need registry access for the `@evg-org` scope and a token
with `read:packages`.

## Version Policy

- Patch: bug fixes and visual fixes that do not break component APIs, exports,
  token behavior, CSS contracts, or peer dependency expectations.
- Minor: additive components, props, exports, assets, or documented behavior.
- Major: breaking exports, removed components, changed token behavior, changed
  CSS contracts, incompatible visual behavior, or peer dependency changes.

Prereleases and canaries are intentionally deferred. Use stable SemVer releases
until a consuming app has a concrete need for early integration packages.

## Changesets

Every release-affecting PR should include a Changeset entry:

```bash
npm run changeset
```

Release notes must call out:

- new components or exports;
- visual behavior changes;
- breaking changes;
- migration notes for consumers.

Version and publish commands are available for the future registry release flow:

```bash
npm run version
npm run release
```

`npm run release` must only be used after the GitHub Packages token is
configured and approval for the exact version is recorded.

## Release Readiness

Run the full release gate before a release candidate:

```bash
npm run check:release
```

The gate validates generated asset registries, package exports, color and
typography token usage, built declarations, copied CSS/font/icon/logo assets,
compiled component CSS, the preview build, a clean packed-consumer app, and the
npm tarball contents. It builds the package once, then packs and consumer-tests
the resulting `dist` output with lifecycle scripts disabled so `prepare` does
not rebuild during the release gate.

The package rename from `mud-clone` to `@evg-org/mud-clone` is a one-time manual
consumer migration. After consumers adopt the scoped package, automated update
PRs can track SemVer releases.
