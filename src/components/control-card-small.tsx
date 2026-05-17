import * as React from "react";

import { Button } from "./button";
import { MudIcon } from "./mud-icon";
import { Tag } from "./tag";
import { cn } from "./utils";

type ControlCardSmallLayout = "responsive" | "desktop" | "mobile";

type ControlCardSmallProps = Omit<
  React.ComponentProps<"article">,
  "children" | "onClick"
> & {
  address: React.ReactNode;
  controlNumber: React.ReactNode;
  detailsLabel?: React.ReactNode;
  layout?: ControlCardSmallLayout;
  name: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  showDetailsAction?: boolean;
  statusIcon?: string;
  statusLabel: React.ReactNode;
  statusTone?: React.ComponentProps<typeof Tag>["tone"];
  statusVariant?: React.ComponentProps<typeof Tag>["variant"];
};

const rootLayoutClassName: Record<ControlCardSmallLayout, string> = {
  desktop:
    "w-[480px] px-[var(--spacing-24)] pb-[var(--spacing-24)] pt-[var(--spacing-20)]",
  mobile: "w-[340px] px-[var(--spacing-20)] py-[var(--spacing-16)]",
  responsive:
    "w-full max-w-[340px] px-[var(--spacing-20)] py-[var(--spacing-16)] md:max-w-[480px] md:px-[var(--spacing-24)] md:pb-[var(--spacing-24)] md:pt-[var(--spacing-20)]",
};

const contentLayoutClassName: Record<ControlCardSmallLayout, string> = {
  desktop: "gap-[var(--spacing-16)]",
  mobile: "gap-[var(--spacing-12)]",
  responsive: "gap-[var(--spacing-12)] md:gap-[var(--spacing-16)]",
};

const bodyLayoutClassName: Record<ControlCardSmallLayout, string> = {
  desktop: "gap-[var(--spacing-4)]",
  mobile: "gap-[var(--spacing-2)]",
  responsive: "gap-[var(--spacing-2)] md:gap-[var(--spacing-4)]",
};

const numberTypographyClassName: Record<ControlCardSmallLayout, string> = {
  desktop: "text-[20px] leading-[28px] tracking-[-0.2px]",
  mobile: "text-[18px] leading-[26px] tracking-[-0.18px]",
  responsive:
    "text-[18px] leading-[26px] tracking-[-0.18px] md:text-[20px] md:leading-[28px] md:tracking-[-0.2px]",
};

const nameTypographyClassName: Record<ControlCardSmallLayout, string> = {
  desktop: "text-[18px] leading-[26px] tracking-[-0.18px]",
  mobile: "text-[16px] leading-[24px] tracking-[-0.16px]",
  responsive:
    "text-[16px] leading-[24px] tracking-[-0.16px] md:text-[18px] md:leading-[26px] md:tracking-[-0.18px]",
};

const statusIconNameMap: Record<string, string> = {
  calendar: "Outlined/16/calendar",
  "checkmark-small": "Outlined/16/checkmark-small",
  clock: "Outlined/20/clock",
  time: "Outlined/20/clock",
};

function resolveStatusIconName(icon: string) {
  return statusIconNameMap[icon] ?? icon;
}

function ControlCardSmall({
  address,
  className,
  controlNumber,
  detailsLabel = "Vezi detalii",
  layout = "responsive",
  name,
  onClick,
  showDetailsAction = true,
  statusIcon,
  statusLabel,
  statusTone = "neutral",
  statusVariant = "outlined",
  ...props
}: ControlCardSmallProps) {
  return (
    <article
      data-layout={layout}
      data-slot="control-card-small"
      className={cn(
        "w-full rounded-[var(--border-radius-12)] border border-[var(--color-border-base-default)] bg-[var(--color-background-base-default)] text-left",
        "flex flex-col items-start gap-[var(--spacing-20)]",
        rootLayoutClassName[layout],
        className,
      )}
      {...props}
    >
      <div
        data-slot="control-card-small-content"
        className={cn(
          "flex w-full min-w-0 flex-col items-start",
          contentLayoutClassName[layout],
        )}
      >
        <div className="flex w-full min-w-0 items-center gap-[var(--spacing-20)]">
          <span
            data-slot="control-card-small-number"
            className={cn(
              "flex min-w-0 flex-[1_0_0] items-center gap-[var(--spacing-4)] whitespace-nowrap [font-family:var(--app-font-family-sans)] [font-weight:var(--app-font-weight-bold)] [color:var(--color-text-base-default)]",
              numberTypographyClassName[layout],
            )}
          >
            <span aria-hidden="true" className="shrink-0">
              #{" "}
            </span>
            <span className="min-w-0 truncate">{controlNumber}</span>
          </span>

          <Tag
            className={cn(
              "h-[24px] min-w-[32px] max-w-[52%] gap-[var(--spacing-4)] overflow-hidden pl-[var(--spacing-6)] pr-[var(--spacing-8)] py-0 text-[14px] leading-[20px] [&>[data-slot=mud-icon]]:size-[var(--spacing-16)]",
              (statusTone === "accent" || statusTone === "warning") &&
                "![color:var(--color-text-warning-on-secondary)]",
            )}
            size="md"
            tone={statusTone}
            variant={statusVariant}
          >
            {statusIcon && (
              <MudIcon name={resolveStatusIconName(statusIcon)} size="sm" />
            )}
            <span className="min-w-0 truncate">{statusLabel}</span>
          </Tag>
        </div>

        <div
          data-slot="control-card-small-body"
          className={cn(
            "grid w-full min-w-0 [color:var(--color-text-base-default)]",
            bodyLayoutClassName[layout],
          )}
        >
          <h3
            data-slot="control-card-small-name"
            className={cn(
              "min-w-0 truncate [font-family:var(--app-font-family-sans)] [font-weight:var(--app-font-weight-bold)]",
              nameTypographyClassName[layout],
            )}
          >
            {name}
          </h3>
          <p className="min-w-0 truncate [font-family:var(--app-font-family-sans)] text-[14px] [font-weight:var(--app-font-weight-regular)] leading-[20px] tracking-[var(--app-letter-spacing-default)]">
            {address}
          </p>
        </div>
      </div>

      {showDetailsAction && (
        <div
          data-slot="control-card-small-action"
          className="shrink-0"
        >
          <Button
            className="h-[32px] min-h-[32px] min-w-[52px] gap-[var(--spacing-6)] py-0 pl-[var(--spacing-12)] pr-[var(--spacing-8)]"
            onClick={onClick}
            radius="sm"
            size="sm"
            type="button"
            variant="secondary"
          >
            {detailsLabel}
            <MudIcon name="Outlined/16/chevron-right" size="sm" />
          </Button>
        </div>
      )}
    </article>
  );
}

export { ControlCardSmall };
export type { ControlCardSmallLayout, ControlCardSmallProps };
