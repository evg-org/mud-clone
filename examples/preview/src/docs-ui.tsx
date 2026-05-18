import type { CSSProperties, ReactNode } from "react";

export function mudTypographyStyle(
  viewport: "desktop" | "mobile",
  token: string,
): CSSProperties {
  return {
    fontFamily: `var(--text-${viewport}-${token}-font-family)`,
    fontSize: `var(--text-${viewport}-${token}-font-size)`,
    fontWeight: `var(--text-${viewport}-${token}-font-weight)`,
    letterSpacing: `var(--text-${viewport}-${token}-letter-spacing)`,
    lineHeight: `var(--text-${viewport}-${token}-line-height)`,
  };
}

export function PageHeader({
  description,
  eyebrow,
  title,
}: {
  description: ReactNode;
  eyebrow: string;
  title: string;
}) {
  return (
    <header className="docs-hero">
      <div>
        <p className="docs-kicker">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </header>
  );
}

export function ExampleCard({
  children,
  description,
  title,
}: {
  children: ReactNode;
  description?: string;
  title: string;
}) {
  return (
    <article className="example-card">
      <header className="example-card-header">
        <h3>{title}</h3>
        {description && <p>{description}</p>}
      </header>
      <div className="example-card-surface">{children}</div>
    </article>
  );
}

export function ColorSwatch({ label, token }: { label: string; token: string }) {
  return (
    <div className="color-swatch">
      <span
        aria-hidden="true"
        className="color-swatch-chip"
        style={{ background: `var(${token})` }}
      />
      <span>
        <strong>{label}</strong>
        <code>{token}</code>
      </span>
    </div>
  );
}
