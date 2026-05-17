import * as React from "react";

import { MudIcon } from "./mud-icon";
import { cn } from "./utils";

type SelectionCardLayout = "desktop" | "mobile" | "responsive";

type SelectionCardProps = Omit<React.ComponentProps<"button">, "children"> & {
  children: React.ReactNode;
  layout?: SelectionCardLayout;
  selected?: boolean;
  showIndicator?: boolean;
};

const rootLayoutClassName: Record<SelectionCardLayout, string> = {
  desktop: "rounded-[var(--border-radius-12)]",
  mobile: "rounded-[var(--border-radius-8)]",
  responsive:
    "rounded-[var(--border-radius-8)] md:rounded-[var(--border-radius-12)]",
};

const contentLayoutClassName: Record<SelectionCardLayout, string> = {
  desktop:
    "gap-[var(--spacing-16)] px-[var(--spacing-16)] py-[var(--spacing-12)] pr-[var(--spacing-24)]",
  mobile:
    "gap-[var(--spacing-12)] px-[var(--spacing-12)] py-[var(--spacing-12)] pr-[var(--spacing-20)]",
  responsive:
    "gap-[var(--spacing-12)] px-[var(--spacing-12)] py-[var(--spacing-12)] pr-[var(--spacing-20)] md:gap-[var(--spacing-16)] md:px-[var(--spacing-16)] md:pr-[var(--spacing-24)]",
};

const labelTypographyClassName: Record<SelectionCardLayout, string> = {
  desktop:
    "[font-size:var(--text-body-sm-500-font-size)] [line-height:var(--text-body-sm-500-line-height)]",
  mobile:
    "[font-size:var(--text-body-md-500-font-size)] [line-height:var(--text-body-md-500-line-height)]",
  responsive:
    "[font-size:var(--text-body-md-500-font-size)] [line-height:var(--text-body-md-500-line-height)] md:[font-size:var(--text-body-sm-500-font-size)] md:[line-height:var(--text-body-sm-500-line-height)]",
};

const indicatorSizeClassName: Record<SelectionCardLayout, string> = {
  desktop:
    "size-[var(--spacing-20)] [&_[data-slot=mud-icon]]:size-[var(--spacing-16)]",
  mobile:
    "size-[var(--spacing-24)] [&_[data-slot=mud-icon]]:size-[var(--spacing-20)]",
  responsive:
    "size-[var(--spacing-24)] [&_[data-slot=mud-icon]]:size-[var(--spacing-20)] md:size-[var(--spacing-20)] md:[&_[data-slot=mud-icon]]:size-[var(--spacing-16)]",
};

function SelectionCard({
  children,
  className,
  layout = "responsive",
  selected = false,
  showIndicator = true,
  type = "button",
  ...props
}: SelectionCardProps) {
  return (
    <button
      data-selected={selected ? true : undefined}
      data-slot="selection-card"
      type={type}
      className={cn(
        "relative flex min-h-[62px] w-full cursor-pointer appearance-none items-stretch border-0 bg-[var(--color-background-base-default)] p-0 text-left outline-none",
        "transition-colors hover:bg-[var(--color-background-base-secondary)] focus-visible:ring-[2px] focus-visible:ring-[var(--color-border-brand-default)] focus-visible:ring-offset-[2px] focus-visible:ring-offset-[var(--color-background-base-default)]",
        selected &&
          "bg-[var(--color-background-brand-secondary)] hover:bg-[var(--color-background-brand-secondary-hover)]",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-60",
        rootLayoutClassName[layout],
        className,
      )}
      {...props}
    >
      <span
        data-slot="selection-card-content"
        className={cn(
          "flex min-h-[inherit] w-full min-w-0 items-center justify-between",
          contentLayoutClassName[layout],
        )}
      >
        <span
          data-slot="selection-card-label"
          className={cn(
            "min-w-0 flex-1 truncate [font-family:var(--app-font-family-sans)] [font-weight:var(--app-font-weight-medium)] [letter-spacing:0] [color:var(--color-text-base-default)]",
            labelTypographyClassName[layout],
          )}
        >
          {children}
        </span>
        {selected && showIndicator && (
          <span
            aria-hidden="true"
            data-slot="selection-card-indicator"
            className={cn(
              "flex shrink-0 items-center justify-center [color:var(--color-text-brand-default)]",
              indicatorSizeClassName[layout],
            )}
          >
            <MudIcon name="Outlined/20/checkmark-small" />
          </span>
        )}
      </span>
      <span
        aria-hidden="true"
        data-slot="selection-card-border"
        className={cn(
          "pointer-events-none absolute inset-0 border border-[var(--color-border-base-default)]",
          rootLayoutClassName[layout],
          selected && "border-2 border-[var(--color-border-brand-default)]",
        )}
      />
    </button>
  );
}

export { SelectionCard };
export type { SelectionCardLayout, SelectionCardProps };
