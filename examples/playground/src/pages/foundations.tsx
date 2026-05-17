import {
  borderWidthTokens,
  desktopTypographyRows,
  mobileTypographyRows,
  primitiveColorGroups,
  radiusTokens,
  semanticColorGroups,
  shadowTokens,
  spacingTokens,
} from "../docs-data";
import { ColorSwatch, ExampleCard, PageHeader, mudTypographyStyle } from "../docs-ui";
import { MudIcon, mudIconNames } from "@mud-clone/components/mud-icon";
import { MudLogo } from "@mud-clone/components/mud-logo";

type TypographyRow = {
  label: string;
  sample: string;
  token: string;
  values?: string;
};

type ColorGroup = {
  label: string;
  tokens: [string, string][];
};

function isCanonicalIconPath(name: string) {
  return name.startsWith("Outlined/") || name.startsWith("Filled/");
}

function iconBaseName(name: string) {
  return (name.split("/").pop() ?? name).replace(/-filled$/, "");
}

function sortIconNames(names: string[]) {
  return [...names].sort((first, second) => {
    const baseNameCompare = iconBaseName(first).localeCompare(iconBaseName(second));

    if (baseNameCompare !== 0) {
      return baseNameCompare;
    }

    return first.localeCompare(second);
  });
}

const canonicalIconNames = mudIconNames.filter(isCanonicalIconPath);

function groupIconNamesByBaseName(names: string[]) {
  const groups = names.reduce<Map<string, string[]>>((nextGroups, name) => {
    const baseName = iconBaseName(name);
    const groupNames = nextGroups.get(baseName) ?? [];

    groupNames.push(name);
    nextGroups.set(baseName, groupNames);

    return nextGroups;
  }, new Map());

  return Array.from(groups.entries())
    .sort(([first], [second]) => first.localeCompare(second))
    .map(([key, groupNames]) => ({
      key,
      label: key,
      names: sortIconNames(groupNames),
    }));
}

const canonicalIconGroups = groupIconNamesByBaseName(canonicalIconNames);

function iconPreviewProps(name: string) {
  const sourceSize = name.match(/^(?:Outlined|Filled)\/(12|16|20|24)\//)?.[1] ?? "24";

  return {
    className: "icon-token-preview",
    style: { height: `${sourceSize}px`, width: `${sourceSize}px` },
  };
}

function TypographyRows({
  rows,
  tokenPrefix,
  viewport,
}: {
  rows: TypographyRow[];
  tokenPrefix: string;
  viewport: "desktop" | "mobile";
}) {
  return (
    <div className="type-list">
      {rows.map((row) => (
        <div className="type-row full" key={`${tokenPrefix}-${row.token}`}>
          <div className="type-meta">
            <strong>{row.label}</strong>
            <code>{tokenPrefix}{row.token}</code>
            {row.values && <span>{row.values}</span>}
          </div>
          <p style={mudTypographyStyle(viewport, row.token)}>{row.sample}</p>
        </div>
      ))}
    </div>
  );
}

function ColorTokenSection({
  description,
  groups,
  title,
}: {
  description: string;
  groups: ColorGroup[];
  title: string;
}) {
  return (
    <section className="docs-token-section">
      <header className="docs-token-section-header">
        <h2>{title}</h2>
        <p>{description}</p>
      </header>
      <div className="foundation-grid">
        {groups.map((group) => (
          <ExampleCard key={group.label} title={group.label}>
            <div className="color-grid">
              {group.tokens.map(([token, label]) => (
                <ColorSwatch key={token} label={label} token={token} />
              ))}
            </div>
          </ExampleCard>
        ))}
      </div>
    </section>
  );
}

export function ColorsPage() {
  return (
    <div className="docs-page">
      <PageHeader
        description="Full color foundation view: primitive palette tokens and meaning-based semantic color tokens from MUD. Product code should use semantic color tokens, not the temporary RSC compatibility aliases."
        eyebrow="Foundations"
        title="Colors"
      />
      <ColorTokenSection
        description="Raw MUD color scales. Use these only when defining or reviewing semantic tokens."
        groups={primitiveColorGroups}
        title="Primitive colors"
      />
      <ColorTokenSection
        description="Meaning-based MUD tokens for backgrounds, borders, text, links, and icons."
        groups={semanticColorGroups}
        title="Semantic colors"
      />
    </div>
  );
}

export function TypographyPage() {
  return (
    <div className="docs-page">
      <PageHeader
        description="Full desktop and mobile MUD typography tokens. Runtime code should use the responsive --text-* token layer instead of temporary RSC typography aliases."
        eyebrow="Foundations"
        title="Typography"
      />

      <ExampleCard
        description="Raw MUD desktop tokens. These are the source values used above the mobile breakpoint."
        title="Desktop typography"
      >
        <TypographyRows
          rows={desktopTypographyRows}
          tokenPrefix="--text-desktop-"
          viewport="desktop"
        />
      </ExampleCard>

      <ExampleCard
        description="Raw MUD mobile tokens. These are applied by the responsive aliases at 768px and below."
        title="Mobile typography"
      >
        <TypographyRows
          rows={mobileTypographyRows}
          tokenPrefix="--text-mobile-"
          viewport="mobile"
        />
      </ExampleCard>

    </div>
  );
}

export function SpacingPage() {
  return (
    <div className="docs-page">
      <PageHeader
        description="Spacing is intentionally compact and finite, so component rhythm stays consistent."
        eyebrow="Foundations"
        title="Spacing"
      />
      <ExampleCard title="Spacing tokens">
        <div className="spacing-table">
          <div className="spacing-row spacing-row-head">
            <span>token-name</span>
            <span>value, rem</span>
            <span>value, px</span>
            <span>spacing-preview</span>
          </div>
          {spacingTokens.map(({ px, rem, token }) => (
            <div className="spacing-row" key={token}>
              <code>--spacing-{token}</code>
              <span>{rem}</span>
              <span>{px}</span>
              <span className="spacing-preview">
                <span
                  aria-hidden="true"
                  className="spacing-preview-mark"
                  style={{ width: `var(--spacing-${token})` }}
                />
              </span>
            </div>
          ))}
        </div>
      </ExampleCard>
    </div>
  );
}

export function BordersRadiusPage() {
  return (
    <div className="docs-page">
      <PageHeader
        description="Border radius and width tokens used by controls, cards, fields, and focus states."
        eyebrow="Foundations"
        title="Borders & Radius"
      />
      <ExampleCard title="Radius tokens">
        <div className="border-token-table">
          <div className="border-token-row border-token-row-head">
            <span>token-name</span>
            <span>value, rem</span>
            <span>value, px</span>
            <span>radius-preview</span>
          </div>
          {radiusTokens.map(({ cssVar, px, rem, token }) => (
            <div className="border-token-row" key={token}>
              <code>{token}</code>
              <span>{rem}</span>
              <span>{px}</span>
              <span className="border-token-preview">
                <span
                  aria-hidden="true"
                  className="radius-preview-mark"
                  style={{ borderTopRightRadius: `var(${cssVar})` }}
                />
              </span>
            </div>
          ))}
        </div>
      </ExampleCard>
      <ExampleCard title="Width tokens">
        <div className="border-token-table">
          <div className="border-token-row border-token-row-head">
            <span>token-name</span>
            <span>value, rem</span>
            <span>value, px</span>
            <span>width-preview</span>
          </div>
          {borderWidthTokens.map(({ cssVar, px, rem, token }) => (
            <div className="border-token-row" key={token}>
              <code>{token}</code>
              <span>{rem}</span>
              <span>{px}</span>
              <span className="border-token-preview">
                <span
                  aria-hidden="true"
                  className="width-preview-mark"
                  style={{ borderWidth: `var(${cssVar})` }}
                />
              </span>
            </div>
          ))}
        </div>
      </ExampleCard>
    </div>
  );
}

export function ElevationPage() {
  return (
    <div className="docs-page">
      <PageHeader
        description="Elevation is represented by drop shadow tokens used by menus, cards, overlays, and raised surfaces."
        eyebrow="Foundations"
        title="Elevation"
      />
      <ExampleCard title="Drop Shadow Tokens">
        <div className="shadow-token-table">
          <div className="shadow-token-row shadow-token-row-head">
            <span>token-name</span>
            <span>value</span>
            <span>shadow-preview</span>
          </div>
          {shadowTokens.map(({ cssVar, token, values }) => (
            <div className="shadow-token-row" key={token}>
              <code>{token}</code>
              <span className="shadow-token-values">
                {values.map((value) => (
                  <span key={value}>{value}</span>
                ))}
              </span>
              <span className="shadow-token-preview">
                <span
                  aria-hidden="true"
                  className="shadow-preview-mark"
                  style={{ boxShadow: `var(${cssVar})` }}
                />
              </span>
            </div>
          ))}
        </div>
      </ExampleCard>
    </div>
  );
}

export function IconsLogosPage() {
  return (
    <div className="docs-page">
      <PageHeader
        description="Reviewed canonical MUD icon assets grouped by icon name, with source style and size variants shown together."
        eyebrow="Foundations"
        title="Icons"
      />
      <section className="docs-token-section">
        <div className="icon-group-stack icon-name-group-stack">
          {canonicalIconGroups.map((group) => (
            <ExampleCard
              description={`${group.names.length} canonical variant${group.names.length === 1 ? "" : "s"} across available source styles and sizes.`}
              key={group.key}
              title={group.label}
            >
              <div className="icon-grid icon-group-grid">
                {group.names.map((name) => (
                  <span className="icon-token" key={name} title={name}>
                    <MudIcon name={name} {...iconPreviewProps(name)} />
                    <code>{name}</code>
                  </span>
                ))}
              </div>
            </ExampleCard>
          ))}
        </div>
      </section>
    </div>
  );
}

export function AssetsPage() {
  return (
    <div className="docs-page">
      <PageHeader
        description="Reusable visual assets for products, including logos now and room for decor assets later."
        eyebrow="Foundations"
        title="Assets"
      />
      <div className="foundation-grid">
        <ExampleCard title="Logos">
          <div className="logo-grid">
            <MudLogo className="logo-sample" name="government-logo" />
            <MudLogo className="logo-sample" name="gov" />
            <MudLogo className="logo-sample compact" name="Logo100Percent_Black" />
          </div>
        </ExampleCard>
      </div>
    </div>
  );
}
