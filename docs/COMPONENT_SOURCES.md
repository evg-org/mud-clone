# Component Sources

This document records the upstream MUD files to inspect when changing a
MUD-clone primitive.

Reference repository:

- <https://github.com/egov-moldova/design-system/tree/main>

Checked against upstream `main` on 2026-05-12.

## Foundations

| Local area | Upstream MUD references | Notes |
| --- | --- | --- |
| Tokens, semantic values, spacing, radius, shadows | `Components/scss/abstracts/_tokens.scss`, `Components/scss/abstracts/_variables.scss`, `Components/scss/abstracts/_colors.scss`, `Components/scss/abstracts/_borders.scss`, `Components/scss/base/_drop-shadows.scss`, `Components/css/main.css` | Color work should use MUD semantic `--color-*` tokens. Existing `--app-color-*` aliases are temporary compatibility only. |
| Typography | `Components/typography.html`, `Components/scss/abstracts/_typography.scss`, `Components/scss/base/_typography.scss`, `Components/css/main.css` | Local typography follows the MUD/Figma desktop and mobile specs while keeping MUD-compatible alias names. |
| Fonts | `Components/assets/fonts` | Local Onest files live in `src/assets/fonts/onest` and are wired by `src/styles/fonts.css`. |
| Icons | `Components/assets/icons`, `Components/assets/sprite1.svg`, `Components/icons.html` | Local icons live in `src/assets/mud/icons` and are exposed through `MudIcon`. |
| Logos | `Components/assets/logos` | Local logos live in `src/assets/mud/logos` and are exposed through `MudLogo`. |

## Components

| Local primitive | Upstream MUD references | Local notes |
| --- | --- | --- |
| `Avatar` | `Components/avatar.html`, `Components/scss/components/avatar` | Uses MUD avatar sizing, fallback, icon, focus, notification, and stack patterns. |
| `Badge` | `Components/badge.html`, `Components/scss/components/forms/_badge.scss`, `Components/scss/components/forms/_badge-notification.scss` | Use for compact counters, notification dots, or short numeric indicators. Do not use for long status labels. |
| `Button` | `Components/buttons.html`, `Components/scss/base/_buttons.scss` | MUD command-button foundation. Local implementation keeps product variants through tokens. |
| `Checkbox` | `Components/checkbox.html`, `Components/scss/components/forms/_checkboxes.scss` | Subpath-only in MUD-clone because it loads `MudIcon` for the checkmark. |
| `DropdownMenu` / `Menu` | `Components/dropdown.html`, `Components/scss/components/_dropdown.scss`, `Components/scss/components/_dropdown-doc.scss`, `Components/scss/components/_menu.scss`, `Components/scss/components/_menu-doc.scss`, `Components/js/dropdown.js`, `Components/js/dropdown-select.js` | Use for contextual menus, selection menus, separators, submenu headings, checkbox/radio items, scrollable content, and selected states. |
| `FileInput` / `FileInputItem` | Figma `File Input`, `Components/input-preview.html`, `Components/scss/components/forms/_input.scss`, `Components/assets/icons` | File upload shell for button-based and drag-and-drop uploads, uploaded file rows, uploading/success/error states, focus/hover/active/disabled states, captions, and desktop/mobile widths. Keep upload transport and file validation logic in the consuming app. |
| `Icon` | `Components/icons.html`, `Components/assets/icons`, `Components/assets/sprite1.svg` | Local `Icon` is the generic size/tone wrapper; `MudIcon` resolves copied MUD assets. |
| `Input` | `Components/input-preview.html`, `Components/scss/components/forms/_input.scss`, `Components/css/main.css` | Shared text input shell. Also used as a visual base for some field-like controls. |
| `DateInput` | Figma `Date Input`, `Components/input-preview.html`, `Components/scss/components/forms/_input.scss`, `Components/assets/icons` | Date entry shell for `DD/MM/YYYY` formatted manual entry, calendar affordance, default/destructive tones, validation messages, mandatory state, and label/assistive truncation. |
| `Link` | `Components/link.html`, `Components/scss/components/_link.scss` | Supports MUD link sizes, primary/strict/white styles, underline variants, visited state control, pointer/touch target sizing, and local regular/medium typography weight selection. |
| `Modal` | Figma `Modal`, `Components/modals.html`, `Components/scss/components/_modal.scss`, `Components/js/modal.js` | Canonical overlay component. MUD-clone does not expose a separate dialog primitive because Figma defines Modal as the reusable overlay surface. |
| `MudIcon` | `Components/assets/icons`, `Components/assets/sprite1.svg` | Local asset helper for copied MUD SVG icons. |
| `MudLogo` | `Components/assets/logos` | Local asset helper for copied MUD SVG logos. |
| `NumericInput` | Figma `Numeric Input`, `Components/input-preview.html`, `Components/scss/components/forms/_input.scss`, `Components/assets/icons` | Numeric field shell for amounts and quantities, including prefix/suffix adornments, optional leading icon, validation tones, loading, disabled, mandatory, read-only, and assistive text states. |
| `PhoneNumberInput` | Figma `Phone Number Input`, `Components/input-preview.html`, `Components/scss/components/forms/_input.scss`, `Components/assets/icons` | Phone field shell with country-code prefix, local/international selector variants, validation tones, loading, disabled, mandatory, clear button, country menu previews, and assistive text states. |
| `RadioGroup` | `Components/radio-buttons.html`, `Components/scss/components/forms/_radio-buttons.scss` | Root-safe primitive because it does not load the MUD icon registry. |
| `SearchInput` | `Components/search-input-preview.html`, `Components/scss/components/forms/_search-input.scss`, `Components/js/search.js` | Subpath-only because it loads `MudIcon`. |
| `SegmentedControl` | Figma `Segmented Controls`, typography, spacing, radius, color, shadow, and focus tokens | Compact single-selection control for two to five closely related choices, including desktop/mobile heights, equal-width segments, selected/unselected modes, hover/focus states, separators, and label truncation. |
| `Select` | `Components/dropdown.html`, `Components/scss/components/forms/_select.scss`, `Components/scss/components/forms/_input.scss`, `Components/js/dropdown-select.js`, `Components/css/main.css` | Maps MUD select trigger, dropdown shadow, option states, selected checkmark, focus, disabled, and invalid states onto Radix Select. |
| `Switch` | `Components/switch.html`, `Components/scss/components/forms/_switch.scss`, `Components/js/toggler.js` | Root-safe primitive because it does not load the MUD icon registry. |
| `Table` | `Components/table.html`, `Components/scss/components/_table.scss` | Large-screen table primitives, including wrapper, header, row, sortable-header patterns, local long-content clamps for table titles and values, and `TagGroup` wrapping inside tag cells. |
| `Tabs` | Figma `Tabs`, `Components/tabs.html`, `Components/scss/components/forms/_tabs.scss` | Root-safe primitive for tabbed views, including desktop/mobile sizing, selected underline, focus ring, icon, badge, and overflow indicator states. |
| `Tag` | `Components/tags.html`, `Components/scss/components/forms/_tags.scss` | Use for status labels and semantic chips. Local implementation covers status-tag and info-tag variants and includes optional `truncate` for constrained layouts. |
| `Tooltip` | Figma `Tooltip`, typography, shadow, radius, spacing, and icon tokens | Tooltip bubble and hover/focus wrapper for short contextual hints, including large/small sizes, top/bottom arrows, start/center/end arrow alignment, close-button coach tooltip variant, and target-size guidance. |
| `Toast` | Figma `Toast Message`, typography, color, spacing, radius, icon, and motion tokens | Toast feedback surface for info, success, warning, and error messages with heading/text-only variants, optional action link, optional dismiss button, desktop/mobile placement guidance, stacking guidance, and truncation behavior. Keep queues, timers, portals, and notification routing in the consuming app. |
| `Textarea` | `Components/textarea.html`, `Components/scss/components/forms/_input.scss`, `Components/css/main.css` | Shared multi-line text input shell aligned with input typography, border, focus, invalid, disabled, and placeholder states. |

## MUD-clone Extensions

These primitives are reusable MUD-clone additions. They should still be checked
against nearby MUD foundations, but they do not have a direct one-to-one MUD
component file.

| Local primitive | Upstream anchors | Notes |
| --- | --- | --- |
| `DetailRow` | `Components/table.html`, `Components/scss/components/_table.scss`, typography and spacing tokens | Reusable label/value row for cards, details pages, tables on small screens, and modals. |
| `Pagination` | Link, icon, typography, spacing, radius, color, and focus tokens | Reusable paged record-set navigation created for RSC and promoted to MUD-clone. Subpath-only because it loads `MudIcon`. |
| `SectionHeading` | Typography, spacing, and color tokens | Reusable section title and title/count pattern created for RSC and promoted to MUD-clone. |
| `TableCard` | `Components/table.html`, `Components/scss/components/_table.scss`, typography, spacing, radius, and border tokens | Small-screen alternative view for tabular records. |

## Pulled Back To RSC

`MetricCard`, `MetricCardGrid`, and `ControlCardSmall` were removed from
MUD-clone and pulled back to RSC because they encode RSC dashboard and
control-domain behavior. They should not be imported from MUD-clone. If a
generic reusable card pattern is needed later, add it as a new MUD-clone
extension with a fresh API and new source notes.

`SelectionCard` is deprecated compatibility only. It was pulled back to RSC
because it encodes RSC profile/role-switching behavior rather than a generic
design-system primitive. The subpath export remains temporarily to avoid
breaking existing imports, but new usage should live in the consuming product
app and the component will be removed from MUD-clone in a future cleanup. If a
generic reusable selection-card pattern is needed later, create a generalized
component with a fresh API and new source notes.

## How To Use This File

When changing a primitive:

- Inspect the listed upstream HTML and SCSS first.
- Check `Components/css/main.css` when generated selectors or responsive
  variables matter.
- Check the relevant upstream JavaScript only for interaction behavior. Local
  React primitives should keep using accessible React/Radix behavior where
  already established.
- Update this document when a new primitive is added or when an upstream source
  path changes.
