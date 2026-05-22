import { ExampleCard, PageHeader } from "../docs-ui";

const whatMudCloneIs = [
  "A local React component library built from MUD foundations, tokens, assets, and selected reusable product patterns.",
  "A practical preview for prototyping, visual checks, and implementation discussions.",
  "A working catalog of the components currently available in this package.",
];

const whatMudCloneIsNot = [
  "Not the official MUD website, official documentation, or official design-system preview.",
  "Not reviewed, endorsed, or approved for development by the official MUD maintainers.",
  "Not a guarantee that every component exactly matches upstream MUD or every production accessibility requirement.",
  "Not a place for product-specific business workflows or domain-only components.",
];

const previewUsage = [
  "Use it for prototypes, component review, implementation alignment, and early product UI exploration.",
  "Before production use, verify critical decisions against official MUD sources, project requirements, and accessibility expectations.",
  "Treat components marked for review as provisional until they are checked and documented.",
];

function IntroList({ items }: { items: string[] }) {
  return (
    <ul className="intro-list">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export function IntroPage() {
  return (
    <div className="docs-page intro-page">
      <PageHeader
        description="An independent, contributor-built React implementation and visual preview inspired by Moldova's MUD / Unitar design system. It helps teams prototype, inspect component states, and align product UI work before using or extending the package."
        eyebrow="Preview"
        title="MUD-clone"
      />

      <div className="component-grid two">
        <ExampleCard title="What MUD-clone is">
          <IntroList items={whatMudCloneIs} />
        </ExampleCard>

        <ExampleCard title="What MUD-clone is not">
          <IntroList items={whatMudCloneIsNot} />
        </ExampleCard>
      </div>

      <ExampleCard title="How to use this preview">
        <IntroList items={previewUsage} />
      </ExampleCard>

      <ExampleCard
        description="Use official MUD references for upstream design decisions."
        title="Source of truth"
      >
        <div className="intro-source-list">
          <a href="https://mud.egov.md" rel="noreferrer" target="_blank">
            Official MUD public reference
          </a>
          <a
            href="https://github.com/egov-moldova/design-system/tree/main"
            rel="noreferrer"
            target="_blank"
          >
            Upstream MUD repository
          </a>
        </div>
      </ExampleCard>
    </div>
  );
}
