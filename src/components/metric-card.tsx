import * as React from "react";

import { MudIcon } from "./mud-icon";
import { cn } from "./utils";

type MetricCardLayout = "responsive" | "horizontal" | "vertical";

type MetricCardProps = Omit<React.ComponentProps<"button">, "children"> & {
  label: React.ReactNode;
  layout?: MetricCardLayout;
  showChevron?: boolean;
  value: React.ReactNode;
};

const layoutClassName: Record<MetricCardLayout, string> = {
  horizontal:
    "min-h-[88px] [&_[data-slot=metric-card-content]]:flex-row [&_[data-slot=metric-card-content]]:items-center [&_[data-slot=metric-card-content]]:justify-between",
  responsive:
    "min-h-[88px] md:min-h-[116px] lg:min-h-[92px] [&_[data-slot=metric-card-content]]:flex-row [&_[data-slot=metric-card-content]]:items-center [&_[data-slot=metric-card-content]]:justify-between md:[&_[data-slot=metric-card-content]]:flex-col md:[&_[data-slot=metric-card-content]]:items-start md:[&_[data-slot=metric-card-content]]:justify-between lg:[&_[data-slot=metric-card-content]]:flex-row lg:[&_[data-slot=metric-card-content]]:items-center",
  vertical:
    "min-h-[116px] [&_[data-slot=metric-card-content]]:flex-col [&_[data-slot=metric-card-content]]:items-start [&_[data-slot=metric-card-content]]:justify-between",
};

function MetricCard({
  className,
  label,
  layout = "responsive",
  showChevron = true,
  type = "button",
  value,
  ...props
}: MetricCardProps) {
  return (
    <button
      data-slot="metric-card"
      type={type}
      className={cn(
        "group w-full cursor-pointer rounded-[var(--border-radius-12)] border border-[var(--color-border-base-default)] bg-[var(--color-background-base-default)] text-left outline-none transition-[border-color] hover:border-[var(--color-border-brand-default)] focus-visible:border-[var(--focus-ring)] focus-visible:ring-[3px] focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-60",
        layoutClassName[layout],
        className,
      )}
      {...props}
    >
      <span
        data-slot="metric-card-content"
        className="flex size-full gap-[var(--spacing-12)] px-[var(--spacing-20)] py-[var(--spacing-20)] md:px-[var(--spacing-24)] md:py-[var(--spacing-24)] lg:py-[var(--spacing-32)]"
      >
        <span
          data-slot="metric-card-label"
          className="min-w-0 flex-1 [font-family:var(--app-font-family-sans)] [font-size:var(--text-body-lg-500-font-size)] [font-weight:var(--text-body-lg-500-font-weight)] [line-height:var(--text-body-lg-500-line-height)] [letter-spacing:var(--text-body-lg-500-letter-spacing)] [color:var(--color-text-base-default)]"
        >
          {label}
        </span>
        <span
          data-slot="metric-card-value-group"
          className="flex shrink-0 items-center gap-[var(--spacing-12)] [color:var(--color-text-brand-default)]"
        >
          <span
            data-slot="metric-card-value"
            className="[font-family:var(--app-font-family-sans)] [font-size:var(--text-heading-h3-sm-font-size)] [font-weight:var(--text-heading-h3-sm-font-weight)] [line-height:var(--text-heading-h3-sm-line-height)] [letter-spacing:var(--text-heading-h3-sm-letter-spacing)]"
          >
            {value}
          </span>
          {showChevron && (
            <MudIcon
              aria-hidden="true"
              className="size-[var(--spacing-24)]"
              name="Outlined/24/chevron-right-small"
            />
          )}
        </span>
      </span>
    </button>
  );
}

function MetricCardGrid({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="metric-card-grid"
      className={cn(
        "grid w-full grid-cols-1 gap-[var(--spacing-12)] md:grid-cols-3",
        className,
      )}
      {...props}
    />
  );
}

export { MetricCard, MetricCardGrid };
export type { MetricCardLayout, MetricCardProps };
