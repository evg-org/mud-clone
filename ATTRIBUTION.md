# Attribution And License Notes

This file records third-party design-system and asset sources used by
MUD-clone. It is documentation only and does not grant a license to use,
publish, or redistribute this package.

## Package Status

MUD-clone is currently marked `UNLICENSED` and `private` in `package.json`.
Before copying this folder into a public repository, publishing it as a package,
or using it outside the current RSC project, the intended use should be checked
against the upstream MUD license terms and, if needed, confirmed with AGE.

## Moldova MUD / Modelul Unitar De Design

Upstream:

- Name: Modelul Unitar de Design / Moldova government MUD design system.
- Owner/administrator: Agenția de Guvernare Electronică, Republic of Moldova.
- Repository: <https://github.com/egov-moldova/design-system/tree/main>
- Public reference: <https://mud.egov.md>
- AGE public information page:
  <https://www.egov.md/ro/node/40993>
- Reported license: Creative Commons Attribution-NonCommercial-NoDerivatives
  4.0 International, <https://creativecommons.org/licenses/by-nc-nd/4.0/>.

Local MUD-derived or copied material:

- Foundation CSS and token names in `src/styles/design-system.css`.
- MUD icons and logos in `src/assets/mud`.
- MUD visual behavior and state references documented in
  `docs/COMPONENT_SOURCES.md`.
- React component implementations that map MUD visual patterns into typed
  primitives.

Current copied-source reference:

- Source comments in local foundation CSS identify upstream
  `egov-moldova/design-system` commit
  `eb9370580402a29ab7e7917aeca905e107b0bd77`.

MUD-clone changes:

- MUD-clone is a React/TypeScript implementation, not a direct copy of the
  upstream HTML/SCSS/JavaScript structure.
- Local reusable extensions and intentional differences are recorded in
  `docs/MIGRATION_NOTES.md`.
- Generated asset registries in `src/generated` are local build helpers for
  copied MUD assets.

Required caution:

- CC BY-NC-ND 4.0 includes non-commercial and no-derivatives restrictions.
- Publishing, distributing, or reusing MUD-clone outside the current project may
  require explicit permission or confirmation from AGE.
- Do not imply endorsement by AGE, the Government of the Republic of Moldova,
  or upstream MUD maintainers.

## Onest Font

The Onest font files are copied through the MUD source materials and stored in
`src/assets/fonts/onest`. Font declarations live in `src/styles/fonts.css`.

Upstream:

- Project: <https://github.com/simpals/onest>
- License file:
  <https://raw.githubusercontent.com/simpals/onest/main/OFL.txt>
- Reported license: SIL Open Font License, Version 1.1.
- Copyright: 2021 The Onest Project Authors.

When replacing, updating, subsetting, or redistributing the font files, keep the
OFL notice available with the package materials.

## Maintenance Rules

- When copied MUD assets or foundations are updated, record the upstream source
  and commit/date in this file or in the relevant source comments.
- When adding a new third-party asset, add its source, owner, local path, and
  license note here.
- Keep `docs/STANDALONE_READINESS.md` in sync with the current legal and
  attribution status.
