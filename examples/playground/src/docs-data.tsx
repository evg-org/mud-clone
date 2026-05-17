import { Tag } from "@mud-clone";
import { MudIcon } from "@mud-clone/components/mud-icon";

export const defaultRoute = "/colors";

export const navGroups = [
  {
    label: "Foundations",
    items: [
      { href: "/colors", label: "Colors", needsReview: false },
      { href: "/typography", label: "Typography", needsReview: false },
      { href: "/spacing", label: "Spacing", needsReview: false },
      { href: "/borders-radius", label: "Borders & Radius", needsReview: false },
      { href: "/elevation", label: "Elevation", needsReview: false },
      { href: "/icons", label: "Icons", needsReview: false },
      { href: "/assets", label: "Assets", needsReview: true },
    ],
  },
  {
    label: "Components",
    items: [
      { href: "/avatars", label: "Avatars", needsReview: false },
      { href: "/buttons", label: "Buttons", needsReview: false, visualGroup: "actions" },
      { href: "/links", label: "Links", needsReview: false, visualGroup: "actions" },
      { href: "/tags", label: "Tags", needsReview: false, visualGroup: "status-labels" },
      { href: "/badges", label: "Badges", needsReview: false, visualGroup: "status-labels" },
      { href: "/checkbox", label: "Checkbox", needsReview: false, visualGroup: "selection-controls" },
      { href: "/radio-button", label: "Radio Button", needsReview: false, visualGroup: "selection-controls" },
      { href: "/switch", label: "Switch", needsReview: false, visualGroup: "selection-controls" },
      { href: "/chip", label: "Chip", needsReview: false, visualGroup: "selection-controls" },
      { href: "/input-text", label: "Input: Text", needsReview: false, visualGroup: "inputs" },
      { href: "/input-textarea", label: "Input: Textarea", needsReview: false, visualGroup: "inputs" },
      { href: "/input-search", label: "Input: Search", needsReview: false, visualGroup: "inputs" },
      { href: "/input-select", label: "Input: Select", needsReview: false, visualGroup: "inputs" },
      { href: "/menu", label: "Menu", needsReview: false },
      { href: "/separator", label: "Separator", needsReview: false },
      { href: "/table", label: "Table", needsReview: false },
    ],
  },
  {
    label: "Custom Components",
    items: [
      { href: "/table-card", label: "Table Card", needsReview: false },
      { href: "/detail-row", label: "Detail Row", needsReview: false },
      { href: "/section-heading", label: "Section Heading", needsReview: false },
      { href: "/selection", label: "Selection", needsReview: true },
      { href: "/overlays-tabs", label: "Overlays & Tabs", needsReview: true },
      { href: "/metric-cards", label: "Metric Cards", needsReview: true },
      { href: "/control-cards", label: "Control Cards", needsReview: true },
    ],
  },
];

export const controls = [
  {
    address: "or. Cahul, str. Independenței 10",
    company: "EcoConstruct Cahul",
    date: "31 Martie 2026",
    id: "# 578242",
    number: "578242",
    statusIcon: "Outlined/16/time",
    statusLabel: "În proces",
    statusTone: "warning" as const,
    status: (
      <Tag tone="warning" variant="outlined">
        <MudIcon name="Outlined/16/time" size="sm" />
        În proces
      </Tag>
    ),
  },
  {
    address: "mun. Chișinău, str. Alba Iulia 75",
    company: "EcoConstruct Grup",
    date: "21 Iulie 2026",
    id: "# 723737",
    number: "723737",
    statusIcon: "Outlined/16/calendar",
    statusLabel: "Planificat",
    statusTone: "brand" as const,
    status: (
      <Tag tone="brand" variant="outlined">
        <MudIcon name="Outlined/16/calendar" size="sm" />
        Planificat
      </Tag>
    ),
  },
  {
    address: "mun. Bălți, str. Ștefan cel Mare 182",
    company: "EcoConstruct Bălți Nord",
    date: "7 Februarie 2025",
    id: "# 662473",
    number: "662473",
    statusIcon: "Outlined/16/checkmark-small",
    statusLabel: "Finalizat",
    statusTone: "positive" as const,
    status: (
      <Tag tone="positive" variant="outlined">
        <MudIcon name="Outlined/16/checkmark-small" size="sm" />
        Finalizat
      </Tag>
    ),
  },
];

export type ColorTokenGroup = {
  label: string;
  tokens: [string, string][];
};

export const primitiveColorGroups: ColorTokenGroup[] = [
  {
    label: "Base",
    tokens: [
      ["--black-1000", "black"],
      ["--white-1000", "white"],
    ],
  },
  {
    label: "Black Alpha",
    tokens: [
      ["--black-100-alpha", "100 alpha"],
      ["--black-200-alpha", "200 alpha"],
      ["--black-300-alpha", "300 alpha"],
      ["--black-400-alpha", "400 alpha"],
      ["--black-500-alpha", "500 alpha"],
    ],
  },
  {
    label: "Gray Alpha",
    tokens: [
      ["--gray-100-alpha", "100 alpha"],
      ["--gray-200-alpha", "200 alpha"],
      ["--gray-300-alpha", "300 alpha"],
      ["--gray-400-alpha", "400 alpha"],
      ["--gray-500-alpha", "500 alpha"],
    ],
  },
  {
    label: "White Alpha",
    tokens: [
      ["--white-100-alpha", "100 alpha"],
      ["--white-200-alpha", "200 alpha"],
      ["--white-300-alpha", "300 alpha"],
      ["--white-400-alpha", "400 alpha"],
      ["--white-500-alpha", "500 alpha"],
    ],
  },
  {
    label: "Gray",
    tokens: [
      ["--gray-100", "100"],
      ["--gray-200", "200"],
      ["--gray-250", "250"],
      ["--gray-300", "300"],
      ["--gray-400", "400"],
      ["--gray-500", "500"],
      ["--gray-600", "600"],
      ["--gray-700", "700"],
      ["--gray-800", "800"],
      ["--gray-900", "900"],
    ],
  },
  {
    label: "Blue Sky",
    tokens: [
      ["--blue-sky-100", "100"],
      ["--blue-sky-150", "150"],
      ["--blue-sky-200", "200"],
      ["--blue-sky-300", "300"],
      ["--blue-sky-400", "400"],
      ["--blue-sky-500", "500"],
      ["--blue-sky-600", "600"],
      ["--blue-sky-700", "700"],
      ["--blue-sky-800", "800"],
      ["--blue-sky-900", "900"],
    ],
  },
  {
    label: "Lavender",
    tokens: [
      ["--lavender-100", "100"],
      ["--lavender-200", "200"],
      ["--lavender-300", "300"],
      ["--lavender-400", "400"],
      ["--lavender-500", "500"],
      ["--lavender-600", "600"],
      ["--lavender-700", "700"],
      ["--lavender-800", "800"],
      ["--lavender-900", "900"],
    ],
  },
  {
    label: "Purple",
    tokens: [
      ["--purple-100", "100"],
      ["--purple-200", "200"],
      ["--purple-300", "300"],
      ["--purple-400", "400"],
      ["--purple-500", "500"],
      ["--purple-600", "600"],
      ["--purple-700", "700"],
      ["--purple-800", "800"],
      ["--purple-900", "900"],
    ],
  },
  {
    label: "Magenta",
    tokens: [
      ["--magenta-100", "100"],
      ["--magenta-200", "200"],
      ["--magenta-300", "300"],
      ["--magenta-400", "400"],
      ["--magenta-500", "500"],
      ["--magenta-600", "600"],
      ["--magenta-700", "700"],
      ["--magenta-800", "800"],
      ["--magenta-900", "900"],
    ],
  },
  {
    label: "Forest Green",
    tokens: [
      ["--forest-green-100", "100"],
      ["--forest-green-150", "150"],
      ["--forest-green-200", "200"],
      ["--forest-green-300", "300"],
      ["--forest-green-400", "400"],
      ["--forest-green-500", "500"],
      ["--forest-green-600", "600"],
      ["--forest-green-700", "700"],
      ["--forest-green-800", "800"],
      ["--forest-green-900", "900"],
    ],
  },
  {
    label: "Green",
    tokens: [
      ["--green-50", "50"],
      ["--green-100", "100"],
      ["--green-200", "200"],
      ["--green-300", "300"],
      ["--green-400", "400"],
      ["--green-500", "500"],
      ["--green-600", "600"],
      ["--green-700", "700"],
      ["--green-800", "800"],
      ["--green-900", "900"],
    ],
  },
  {
    label: "Apricot",
    tokens: [
      ["--apricot-50", "50"],
      ["--apricot-100", "100"],
      ["--apricot-200", "200"],
      ["--apricot-300", "300"],
      ["--apricot-400", "400"],
      ["--apricot-500", "500"],
      ["--apricot-600", "600"],
      ["--apricot-700", "700"],
      ["--apricot-800", "800"],
      ["--apricot-900", "900"],
    ],
  },
  {
    label: "Red",
    tokens: [
      ["--red-50", "50"],
      ["--red-100", "100"],
      ["--red-200", "200"],
      ["--red-300", "300"],
      ["--red-400", "400"],
      ["--red-500", "500"],
      ["--red-600", "600"],
      ["--red-700", "700"],
      ["--red-800", "800"],
      ["--red-900", "900"],
    ],
  },
];

export const semanticColorGroups: ColorTokenGroup[] = [
  {
    label: "Text",
    tokens: [
      ["--color-text-base-default", "Base default"],
      ["--color-text-base-secondary", "Base secondary"],
      ["--color-text-base-tertiary", "Base tertiary"],
      ["--color-text-base-default-on-color", "Base on color"],
      ["--color-text-base-secondary-on-color", "Secondary on color"],
      ["--color-text-base-inverse-default", "Inverse default"],
      ["--color-text-base-inverse-on-color", "Inverse on color"],
      ["--color-text-brand-default", "Brand default"],
      ["--color-text-brand-default-hover", "Brand hover"],
      ["--color-text-brand-on-secondary", "Brand on secondary"],
      ["--color-text-brand-visited", "Brand visited"],
      ["--color-text-disabled-default", "Disabled default"],
      ["--color-text-disabled-on-disabled", "Disabled on disabled"],
      ["--color-text-positive-default", "Positive default"],
      ["--color-text-positive-on-secondary", "Positive on secondary"],
      ["--color-text-warning-default", "Warning default"],
      ["--color-text-warning-on-secondary", "Warning on secondary"],
      ["--color-text-danger-default", "Danger default"],
      ["--color-text-danger-on-secondary", "Danger on secondary"],
    ],
  },
  {
    label: "Icon",
    tokens: [
      ["--color-icon-base-default", "Base default"],
      ["--color-icon-base-secondary", "Base secondary"],
      ["--color-icon-base-tertiary", "Base tertiary"],
      ["--color-icon-base-default-on-color", "Base on color"],
      ["--color-icon-base-secondary-on-color", "Secondary on color"],
      ["--color-icon-base-inverse-default", "Inverse default"],
      ["--color-icon-base-inverse-on-color", "Inverse on color"],
      ["--color-icon-brand-default", "Brand default"],
      ["--color-icon-brand-on-secondary", "Brand on secondary"],
      ["--color-icon-brand-visited", "Brand visited"],
      ["--color-icon-disabled-default", "Disabled default"],
      ["--color-icon-disabled-on-disabled", "Disabled on disabled"],
      ["--color-icon-positive-default", "Positive default"],
      ["--color-icon-positive-on-secondary", "Positive on secondary"],
      ["--color-icon-warning-default", "Warning default"],
      ["--color-icon-warning-on-secondary", "Warning on secondary"],
      ["--color-icon-danger-default", "Danger default"],
      ["--color-icon-danger-on-secondary", "Danger on secondary"],
    ],
  },
  {
    label: "Link",
    tokens: [
      ["--color-link-primary-default", "Primary default"],
      ["--color-link-primary-hover", "Primary hover"],
      ["--color-link-primary-visited", "Primary visited"],
      ["--color-link-strict-default", "Strict default"],
      ["--color-link-strict-hover", "Strict hover"],
      ["--color-link-white-default", "White default"],
    ],
  },
  {
    label: "Background",
    tokens: [
      ["--color-background-base-default", "Base default"],
      ["--color-background-base-default-hover", "Base hover"],
      ["--color-background-base-default-active", "Base active"],
      ["--color-background-base-secondary", "Base secondary"],
      ["--color-background-base-secondary-hover", "Base secondary hover"],
      ["--color-background-base-secondary-active", "Base secondary active"],
      ["--color-background-base-tertiary", "Base tertiary"],
      ["--color-background-base-tertiary-hover", "Base tertiary hover"],
      ["--color-background-base-tertiary-active", "Base tertiary active"],
      ["--color-background-base-inverse-default", "Inverse default"],
      ["--color-background-base-inverse-default-hover", "Inverse hover"],
      ["--color-background-base-inverse-default-active", "Inverse active"],
      ["--color-background-brand-default", "Brand default"],
      ["--color-background-brand-default-hover", "Brand hover"],
      ["--color-background-brand-default-active", "Brand active"],
      ["--color-background-brand-secondary", "Brand secondary"],
      ["--color-background-brand-secondary-hover", "Brand secondary hover"],
      ["--color-background-brand-secondary-active", "Brand secondary active"],
      ["--color-background-brand-tertiary", "Brand tertiary"],
      ["--color-background-disabled-default", "Disabled default"],
      ["--color-background-disabled-secondary", "Disabled secondary"],
      ["--color-background-alpha-overlay-dark", "Overlay dark"],
      ["--color-background-alpha-overlay-light", "Overlay light"],
      ["--color-background-alpha-large-surface", "Large surface alpha"],
      ["--color-background-positive-default", "Positive default"],
      ["--color-background-positive-default-hover", "Positive hover"],
      ["--color-background-positive-default-active", "Positive active"],
      ["--color-background-positive-secondary", "Positive secondary"],
      ["--color-background-positive-secondary-active", "Positive secondary active"],
      ["--color-background-warning-default", "Warning default"],
      ["--color-background-warning-default-hover", "Warning hover"],
      ["--color-background-warning-default-active", "Warning active"],
      ["--color-background-warning-secondary", "Warning secondary"],
      ["--color-background-warning-secondary-active", "Warning secondary active"],
      ["--color-background-warning-accent", "Warning accent"],
      ["--color-background-danger-default", "Danger default"],
      ["--color-background-danger-default-hover", "Danger hover"],
      ["--color-background-danger-default-active", "Danger active"],
      ["--color-background-danger-secondary", "Danger secondary"],
      ["--color-background-danger-secondary-hover", "Danger secondary hover"],
      ["--color-background-danger-secondary-active", "Danger secondary active"],
    ],
  },
  {
    label: "Border",
    tokens: [
      ["--color-border-base-default", "Base default"],
      ["--color-border-base-secondary", "Base secondary"],
      ["--color-border-base-tertiary", "Base tertiary"],
      ["--color-border-base-strong", "Base strong"],
      ["--color-border-base-subtle", "Base subtle"],
      ["--color-border-brand-default", "Brand default"],
      ["--color-border-disabled-default", "Disabled default"],
      ["--color-border-positive-default", "Positive default"],
      ["--color-border-warning-default", "Warning default"],
      ["--color-border-danger-default", "Danger default"],
    ],
  },
];

export const typographySamples = {
  display: "Building a More Accessible and Efficient Digital Government",
  heading: "Registrul de Stat al Controalelor",
  body: "Pe-un picior de plai, pe-o gură de rai, iată vin în cale, se cobor la vale trei turme de miei.",
  caption: "Unified Design System of the Republic of Moldova",
};

export const desktopTypographyRows = [
  {
    label: "Display Hero Large",
    sample: typographySamples.display,
    token: "display-lg",
    values: "56px / 140% / 600 / -2%",
  },
  {
    label: "Display Hero Medium",
    sample: typographySamples.display,
    token: "display-md",
    values: "48px / 140% / 600 / -2%",
  },
  {
    label: "Heading Large",
    sample: typographySamples.heading,
    token: "heading-lg",
    values: "40px / 150% / 500 / -2%",
  },
  {
    label: "Heading Medium",
    sample: typographySamples.heading,
    token: "heading-md",
    values: "32px / 150% / 500 / -2%",
  },
  {
    label: "Heading Small",
    sample: typographySamples.heading,
    token: "heading-sm",
    values: "24px / 150% / 500 / -1%",
  },
  {
    label: "Heading Extra Small",
    sample: typographySamples.heading,
    token: "heading-xs",
    values: "20px / 150% / 500 / -1%",
  },
  {
    label: "Heading Extra-Extra Small",
    sample: typographySamples.heading,
    token: "heading-2xs",
    values: "18px / 150% / 500 / -1%",
  },
  {
    label: "Body Large",
    sample: typographySamples.body,
    token: "body-lg",
    values: "18px / 150% / 400 / 0%",
  },
  {
    label: "Body Large 500",
    sample: typographySamples.body,
    token: "body-lg-500",
    values: "18px / 150% / 500 / 0%",
  },
  {
    label: "Body Default",
    sample: typographySamples.body,
    token: "body-md",
    values: "16px / 140% / 400 / 0%",
  },
  {
    label: "Body Default 500",
    sample: typographySamples.body,
    token: "body-md-500",
    values: "16px / 140% / 500 / 0%",
  },
  {
    label: "Body Small",
    sample: typographySamples.body,
    token: "body-sm",
    values: "14px / 140% / 400 / 0%",
  },
  {
    label: "Body Small 500",
    sample: typographySamples.body,
    token: "body-sm-500",
    values: "14px / 140% / 500 / 0%",
  },
  {
    label: "Caption Medium",
    sample: typographySamples.caption,
    token: "caption-md",
    values: "12px / 140% / 400 / 0%",
  },
  {
    label: "Caption Medium 500",
    sample: typographySamples.caption,
    token: "caption-md-500",
    values: "12px / 140% / 500 / 0%",
  },
  {
    label: "Caption Small",
    sample: typographySamples.caption,
    token: "caption-sm",
    values: "10px / 140% / 400 / 0%",
  },
];

export const mobileTypographyRows = [
  {
    label: "Display Hero Large",
    sample: typographySamples.display,
    token: "display-lg",
    values: "48px / 140% / 600 / -2%",
  },
  {
    label: "Display Hero Medium",
    sample: typographySamples.display,
    token: "display-md",
    values: "40px / 140% / 600 / -2%",
  },
  {
    label: "Heading Large",
    sample: typographySamples.heading,
    token: "heading-lg",
    values: "32px / 150% / 500 / -2%",
  },
  {
    label: "Heading Medium",
    sample: typographySamples.heading,
    token: "heading-md",
    values: "28px / 150% / 500 / -1%",
  },
  {
    label: "Heading Small",
    sample: typographySamples.heading,
    token: "heading-sm",
    values: "22px / 150% / 500 / -1%",
  },
  {
    label: "Heading Extra Small",
    sample: typographySamples.heading,
    token: "heading-xs",
    values: "18px / 150% / 500 / -1%",
  },
  {
    label: "Heading Extra-Extra Small",
    sample: typographySamples.heading,
    token: "heading-2xs",
    values: "16px / 150% / 500 / -1%",
  },
  {
    label: "Body Large",
    sample: typographySamples.body,
    token: "body-lg",
    values: "18px / 150% / 400 / 0%",
  },
  {
    label: "Body Large 500",
    sample: typographySamples.body,
    token: "body-lg-500",
    values: "18px / 150% / 500 / 0%",
  },
  {
    label: "Body Default",
    sample: typographySamples.body,
    token: "body-md",
    values: "16px / 140% / 400 / 0%",
  },
  {
    label: "Body Default 500",
    sample: typographySamples.body,
    token: "body-md-500",
    values: "16px / 140% / 500 / 0%",
  },
  {
    label: "Body Small",
    sample: typographySamples.body,
    token: "body-sm",
    values: "14px / 140% / 400 / 0%",
  },
  {
    label: "Body Small 500",
    sample: typographySamples.body,
    token: "body-sm-500",
    values: "14px / 140% / 500 / 0%",
  },
  {
    label: "Caption Medium",
    sample: typographySamples.caption,
    token: "caption-md",
    values: "12px / 140% / 400 / 0%",
  },
  {
    label: "Caption Medium 500",
    sample: typographySamples.caption,
    token: "caption-md-500",
    values: "12px / 140% / 500 / 0%",
  },
  {
    label: "Caption Small",
    sample: typographySamples.caption,
    token: "caption-sm",
    values: "10px / 140% / 400 / 0%",
  },
];

export const spacingTokens = [
  { px: "0px", rem: "0rem", token: "0" },
  { px: "2px", rem: "0.125rem", token: "2" },
  { px: "4px", rem: "0.25rem", token: "4" },
  { px: "6px", rem: "0.375rem", token: "6" },
  { px: "8px", rem: "0.5rem", token: "8" },
  { px: "12px", rem: "0.75rem", token: "12" },
  { px: "16px", rem: "1rem", token: "16" },
  { px: "20px", rem: "1.25rem", token: "20" },
  { px: "24px", rem: "1.5rem", token: "24" },
  { px: "32px", rem: "2rem", token: "32" },
  { px: "40px", rem: "2.5rem", token: "40" },
  { px: "48px", rem: "3rem", token: "48" },
  { px: "56px", rem: "3.5rem", token: "56" },
  { px: "64px", rem: "4rem", token: "64" },
  { px: "80px", rem: "5rem", token: "80" },
  { px: "96px", rem: "6rem", token: "96" },
  { px: "120px", rem: "7.5rem", token: "120" },
];

export const radiusTokens = [
  { cssVar: "--border-radius-0", px: "0px", rem: "0rem", token: "--border-radius-0" },
  { cssVar: "--border-radius-4", px: "4px", rem: "0.25rem", token: "--border-radius-4" },
  { cssVar: "--border-radius-6", px: "6px", rem: "0.375rem", token: "--border-radius-6" },
  { cssVar: "--border-radius-8", px: "8px", rem: "0.5rem", token: "--border-radius-8" },
  { cssVar: "--border-radius-12", px: "12px", rem: "0.75rem", token: "--border-radius-12" },
  { cssVar: "--border-radius-16", px: "16px", rem: "1rem", token: "--border-radius-16" },
  { cssVar: "--border-radius-24", px: "24px", rem: "1.5rem", token: "--border-radius-24" },
  { cssVar: "--border-radius-32", px: "32px", rem: "2rem", token: "--border-radius-32" },
  { cssVar: "--border-radius-full", px: "999px", rem: "62rem", token: "--border-radius-full" },
];

export const borderWidthTokens = [
  { cssVar: "--border-width-0-5", px: "0.5px", rem: "0.03125rem", token: "--border-width-0.5" },
  { cssVar: "--border-width-1", px: "1px", rem: "0.0625rem", token: "--border-width-1" },
  { cssVar: "--border-width-1-5", px: "1.5px", rem: "0.09375rem", token: "--border-width-1.5" },
  { cssVar: "--border-width-2", px: "2px", rem: "0.125rem", token: "--border-width-2" },
  { cssVar: "--border-width-3", px: "3px", rem: "0.187rem", token: "--border-width-3" },
];

export const shadowTokens = [
  {
    cssVar: "--drop-shadow-100",
    token: "--drop-shadow-100",
    values: ["0 0 0.5px rgba(0,0,0,0.3)", "0 1px 3px rgba(0,0,0,0.15)"],
  },
  {
    cssVar: "--drop-shadow-100-inverse",
    token: "--drop-shadow-100-inverse",
    values: ["0 0 0.5px rgba(0,0,0,0.3)", "0 -1px 3px rgba(0,0,0,0.15)"],
  },
  {
    cssVar: "--drop-shadow-200",
    token: "--drop-shadow-200",
    values: [
      "0 0 0.5px rgba(0,0,0,0.18)",
      "0 3px 8px rgba(0,0,0,0.08)",
      "0 1px 3px rgba(0,0,0,0.08)",
    ],
  },
  {
    cssVar: "--drop-shadow-300",
    token: "--drop-shadow-300",
    values: [
      "0 0 0.5px rgba(0,0,0,0.15)",
      "0 1px 3px rgba(0,0,0,0.08)",
      "0 5px 12px rgba(0,0,0,0.08)",
    ],
  },
  {
    cssVar: "--drop-shadow-400",
    token: "--drop-shadow-400",
    values: [
      "0 0 0.5px rgba(0,0,0,0.12)",
      "0 10px 24px rgba(0,0,0,0.08)",
      "0 2px 8px rgba(0,0,0,0.08)",
    ],
  },
  {
    cssVar: "--drop-shadow-500",
    token: "--drop-shadow-500",
    values: [
      "0 3px 12px rgba(0,0,0,0.05)",
      "0 0 .5px rgba(0,0,0,0.08)",
      "0 12px 32px rgba(0,0,0,0.12)",
      "0 2px 5px rgba(0,0,0,0.1)",
    ],
  },
  {
    cssVar: "--drop-shadow-600",
    token: "--drop-shadow-600",
    values: [
      "0 3px 12px rgba(0,0,0,0.05)",
      "0 0 .5px rgba(0,0,0,0.08)",
      "0 16px 48px rgba(0,0,0,0.14)",
      "0 6px 12px rgba(0,0,0,0.1)",
    ],
  },
];
