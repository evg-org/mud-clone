import type { ReactNode } from "react";
import {
  Button,
  DetailRow,
  Link,
  SectionHeading,
  Separator,
  Tag,
} from "@mud-clone";
import { ControlCardSmall } from "@mud-clone/components/control-card-small";
import { MetricCard, MetricCardGrid } from "@mud-clone/components/metric-card";
import { MudIcon } from "@mud-clone/components/mud-icon";
import { controls } from "../docs-data";
import { ExampleCard, PageHeader } from "../docs-ui";

export function MetricsPage() {
  return (
    <div className="docs-page">
      <PageHeader
        description="Reusable dashboard summary cards, using responsive desktop/mobile variants."
        eyebrow="Custom Components"
        title="Metric Cards"
      />
      <ExampleCard title="Dashboard metrics">
        <MetricCardGrid>
          <MetricCard label="Controale active" value="2" />
          <MetricCard label="Documente solicitate" value="11" />
          <MetricCard label="Cereri trimise" value="0" />
        </MetricCardGrid>
      </ExampleCard>
    </div>
  );
}

export function ControlCardsPage() {
  return (
    <div className="docs-page">
      <PageHeader
        description="Compact cards for control previews on dashboard-like surfaces."
        eyebrow="Custom Components"
        title="Control Cards"
      />
      <ExampleCard title="Desktop and mobile variants">
        <div className="control-card-grid">
          <ControlCardSmall
            address={controls[1].address}
            controlNumber={controls[1].number}
            layout="desktop"
            name={controls[1].company}
            statusIcon={controls[1].statusIcon}
            statusLabel={controls[1].statusLabel}
            statusTone={controls[1].statusTone}
          />
          <ControlCardSmall
            address={controls[0].address}
            controlNumber={controls[0].number}
            layout="mobile"
            name={controls[0].company}
            statusIcon={controls[0].statusIcon}
            statusLabel={controls[0].statusLabel}
            statusTone={controls[0].statusTone}
          />
        </div>
      </ExampleCard>
    </div>
  );
}

function SectionHeadingPreviewAction() {
  return (
    <Button size="sm" type="button" variant="secondary">
      <MudIcon name="Outlined/16/plus-large" size="sm" />
      Button
    </Button>
  );
}

export function SectionHeadingPage() {
  return (
    <div className="docs-page">
      <PageHeader
        description="Section titles with optional count and action slots for custom page sections."
        eyebrow="Custom Components"
        title="Section Heading"
      />
      <div className="section-heading-preview-stack">
        <ExampleCard title="Variants">
          <div className="section-heading-variant-grid">
            <div className="section-heading-preview-item">
              <p className="section-heading-preview-label">Desktop</p>
              <SectionHeading
                action={<SectionHeadingPreviewAction />}
                className="section-heading-preview-desktop"
                count={5}
                device="desktop"
              >
                Title
              </SectionHeading>
            </div>
            <div className="section-heading-preview-item">
              <p className="section-heading-preview-label">Mobile</p>
              <SectionHeading
                action={<SectionHeadingPreviewAction />}
                className="section-heading-preview-mobile"
                count={5}
                device="mobile"
              >
                Title
              </SectionHeading>
            </div>
          </div>
        </ExampleCard>

        <ExampleCard title="Usage examples">
          <div className="section-heading-usage-surface">
            <div className="section-heading-usage-item">
              <SectionHeading className="section-heading-preview-example" device="desktop">
                Title only
              </SectionHeading>
              <p className="section-heading-preview-copy">
                A short paragraph follows the section title and keeps the content aligned with
                the heading width.
              </p>
            </div>
            <div className="section-heading-usage-item">
              <SectionHeading
                className="section-heading-preview-example"
                count={5}
                device="desktop"
              >
                Title and number
              </SectionHeading>
              <p className="section-heading-preview-copy">
                A short paragraph follows the section title and keeps the content aligned with
                the heading width.
              </p>
            </div>
            <div className="section-heading-usage-item">
              <SectionHeading
                action={<SectionHeadingPreviewAction />}
                className="section-heading-preview-example"
                device="desktop"
              >
                Title and action
              </SectionHeading>
              <p className="section-heading-preview-copy">
                A short paragraph follows the section title and keeps the content aligned with
                the heading width.
              </p>
            </div>
            <div className="section-heading-usage-item">
              <SectionHeading
                action={<SectionHeadingPreviewAction />}
                className="section-heading-preview-example"
                count={5}
                device="desktop"
              >
                Title, number, and action
              </SectionHeading>
              <p className="section-heading-preview-copy">
                A short paragraph follows the section title and keeps the content aligned with
                the heading width.
              </p>
            </div>
          </div>
        </ExampleCard>
      </div>
    </div>
  );
}

function DetailRowPreviewTag({
  children = "Semnată",
  icon = "Outlined/24/signature",
  tone = "neutral",
}: {
  children?: string;
  icon?: string;
  tone?: "brand" | "neutral";
}) {
  return (
    <Tag size="md" tone={tone} variant="outlined">
      <MudIcon name={icon} />
      {children}
    </Tag>
  );
}

function DetailRowPreviewLinks({ device }: { device: "desktop" | "mobile" }) {
  const size = device === "desktop" ? "md" : "sm";

  return (
    <span className="detail-row-link-list">
      <span className="detail-row-link-item">
        <Link href="#control-578242" size={size} underline={false} visited={false} weight="medium">
          #578242
        </Link>
        <span className="detail-row-comma">,</span>
      </span>
      <span className="detail-row-link-item">
        <Link href="#control-723737" size={size} underline={false} visited={false} weight="medium">
          #723737
        </Link>
      </span>
    </span>
  );
}

function DetailRowTagList({ children }: { children: ReactNode }) {
  return <span className="detail-row-tag-list">{children}</span>;
}

function DetailRowDeviceProps({ device }: { device: "desktop" | "mobile" }) {
  return device === "desktop"
    ? {
        desktopLabelWidth: "160px",
        labelWidth: "160px",
        valueSize: "md" as const,
      }
    : {
        desktopLabelWidth: "130px",
        labelWidth: "130px",
        valueSize: "sm" as const,
      };
}

function DetailRowUsageStack({ device }: { device: "desktop" | "mobile" }) {
  const rowProps = DetailRowDeviceProps({ device });

  return (
    <div className="detail-row-sample">
      <p className="detail-row-preview-label">
        {device === "desktop" ? "Desktop" : "Mobile"}
      </p>
      <div className="detail-row-stack">
        <Separator />
        <DetailRow label="Tip" {...rowProps}>
          Contestația controlului
        </DetailRow>
        <Separator />
        <DetailRow label="Actualizat pe" {...rowProps}>
          12.01.2026
        </DetailRow>
        <Separator />
        <DetailRow label="Statut" {...rowProps}>
          <DetailRowTagList>
            <DetailRowPreviewTag />
          </DetailRowTagList>
        </DetailRow>
        <Separator />
        <DetailRow
          label="Controale"
          valueClassName="overflow-visible"
          {...rowProps}
        >
          <DetailRowPreviewLinks device={device} />
        </DetailRow>
        <Separator />
      </div>
    </div>
  );
}

export function DetailRowsPage() {
  return (
    <div className="docs-page">
      <PageHeader
        description="Compact title/content rows for details pages, cards, table cards, and modal content."
        eyebrow="Custom Components"
        title="Detail Row"
      />
      <div className="detail-row-preview-stack">
        <ExampleCard title="Types">
          <div className="detail-row-preview-grid">
            <div className="detail-row-sample">
              <p className="detail-row-preview-label">Desktop</p>
              <DetailRow label="Title" labelWidth="160px" desktopLabelWidth="160px" valueSize="md">
                Value
              </DetailRow>
              <DetailRow label="Title" labelWidth="160px" desktopLabelWidth="160px" valueSize="md">
                <DetailRowPreviewLinks device="desktop" />
              </DetailRow>
              <DetailRow
                label="Title"
                labelWidth="160px"
                desktopLabelWidth="160px"
                valueSize="md"
              >
                <DetailRowTagList>
                  <DetailRowPreviewTag icon="Outlined/16/checkmark-small" tone="brand">
                    Label
                  </DetailRowPreviewTag>
                  <DetailRowPreviewTag icon="Outlined/16/checkmark-small" tone="brand">
                    Label
                  </DetailRowPreviewTag>
                  <DetailRowPreviewTag icon="Outlined/16/checkmark-small" tone="brand">
                    Label
                  </DetailRowPreviewTag>
                </DetailRowTagList>
              </DetailRow>
            </div>
            <div className="detail-row-sample">
              <p className="detail-row-preview-label">Mobile</p>
              <DetailRow label="Title" labelWidth="130px" desktopLabelWidth="130px" valueSize="sm">
                Value
              </DetailRow>
              <DetailRow label="Title" labelWidth="130px" desktopLabelWidth="130px" valueSize="sm">
                <DetailRowPreviewLinks device="mobile" />
              </DetailRow>
              <DetailRow
                label="Title"
                labelWidth="130px"
                desktopLabelWidth="130px"
                valueSize="sm"
              >
                <DetailRowTagList>
                  <DetailRowPreviewTag icon="Outlined/16/checkmark-small" tone="brand">
                    Label
                  </DetailRowPreviewTag>
                  <DetailRowPreviewTag icon="Outlined/16/checkmark-small" tone="brand">
                    Label
                  </DetailRowPreviewTag>
                  <DetailRowPreviewTag icon="Outlined/16/checkmark-small" tone="brand">
                    Label
                  </DetailRowPreviewTag>
                </DetailRowTagList>
              </DetailRow>
            </div>
          </div>
        </ExampleCard>

        <ExampleCard title="Usage examples">
          <div className="detail-row-preview-grid">
            <DetailRowUsageStack device="desktop" />
            <DetailRowUsageStack device="mobile" />
          </div>
        </ExampleCard>

        <ExampleCard title="Long content">
          <div className="detail-row-stack detail-row-long-stack">
            <Separator />
            <DetailRow label="Title title title title title title title title title title title title title title title title title">
              <DetailRowTagList>
                <DetailRowPreviewTag icon="Outlined/16/checkmark-small" tone="brand">
                  Label long
                </DetailRowPreviewTag>
                <DetailRowPreviewTag icon="Outlined/16/checkmark-small" tone="brand">
                  Label mid
                </DetailRowPreviewTag>
                <DetailRowPreviewTag icon="Outlined/16/checkmark-small" tone="brand">
                  Label long long
                </DetailRowPreviewTag>
              </DetailRowTagList>
            </DetailRow>
            <Separator />
            <DetailRow label="Title title title title title title title title title title title title title title title title title">
              Value value value value value value value value value value value value value value value value value value value value value
            </DetailRow>
            <Separator />
          </div>
        </ExampleCard>
      </div>
    </div>
  );
}
