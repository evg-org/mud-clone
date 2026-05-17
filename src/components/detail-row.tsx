import * as React from "react";

import { cn } from "./utils";

type DetailRowLayout = "inline" | "stacked";
type DetailRowSeparator = "none" | "top" | "bottom";
type DetailRowLabelSize = "sm" | "xs";
type DetailRowLineClamp = 1 | 2 | 3 | 4 | 5 | "none";
type DetailRowValueSize = "none" | "sm" | "md" | "responsive";

type DetailRowProps = Omit<React.ComponentProps<"div">, "children"> & {
  children?: React.ReactNode;
  desktopGap?: string;
  desktopLabelWidth?: string;
  fallback?: React.ReactNode;
  gap?: string;
  label: React.ReactNode;
  labelClassName?: string;
  labelLineClamp?: DetailRowLineClamp;
  labelSize?: DetailRowLabelSize;
  labelWidth?: string;
  layout?: DetailRowLayout;
  minHeight?: string;
  paddingY?: string;
  separator?: DetailRowSeparator;
  value?: React.ReactNode;
  valueClassName?: string;
  valueLineClamp?: DetailRowLineClamp;
  valueSize?: DetailRowValueSize;
};

const labelSizeClassName: Record<DetailRowLabelSize, string> = {
  sm: "[font-size:var(--text-body-sm-font-size)] [font-weight:var(--text-body-sm-font-weight)] [line-height:var(--text-body-sm-line-height)]",
  xs: "[font-size:13px] [font-weight:400] [line-height:20px]",
};

const valueSizeClassName: Record<DetailRowValueSize, string> = {
  none: "",
  sm: "[font-size:var(--text-body-sm-500-font-size)] [font-weight:var(--text-body-sm-500-font-weight)] [line-height:var(--text-body-sm-500-line-height)]",
  md: "[font-size:var(--text-body-md-500-font-size)] [font-weight:var(--text-body-md-500-font-weight)] [line-height:var(--text-body-md-500-line-height)]",
  responsive:
    "[font-size:var(--text-body-sm-500-font-size)] [font-weight:var(--text-body-sm-500-font-weight)] [line-height:var(--text-body-sm-500-line-height)] md:[font-size:var(--text-body-md-500-font-size)] md:[line-height:var(--text-body-md-500-line-height)]",
};

const lineClampClassName: Record<DetailRowLineClamp, string> = {
  1: "line-clamp-1",
  2: "line-clamp-2",
  3: "line-clamp-3",
  4: "line-clamp-4",
  5: "line-clamp-5",
  none: "",
};

function DetailRow({
  children,
  className,
  desktopGap,
  desktopLabelWidth,
  fallback = "Nespecificat",
  gap = "var(--spacing-8)",
  label,
  labelClassName,
  labelLineClamp = 2,
  labelSize = "sm",
  labelWidth = "130px",
  layout = "inline",
  minHeight = "24px",
  paddingY = "0px",
  separator = "none",
  style,
  value,
  valueClassName,
  valueLineClamp = 5,
  valueSize = "responsive",
  ...props
}: DetailRowProps) {
  const content = children ?? value ?? fallback;
  const isTextValue =
    typeof content === "number" || typeof content === "string";
  const resolvedDesktopLabelWidth =
    desktopLabelWidth ?? (labelWidth === "130px" ? "160px" : labelWidth);
  const rowStyle = {
    "--detail-row-gap": gap,
    "--detail-row-gap-md": desktopGap ?? gap,
    "--detail-row-label-width": labelWidth,
    "--detail-row-label-width-md": resolvedDesktopLabelWidth,
    "--detail-row-min-height": minHeight,
    "--detail-row-padding-y": paddingY,
    ...style,
  } as React.CSSProperties;

  return (
    <div
      data-slot="detail-row"
      className={cn(
        "grid min-h-[var(--detail-row-min-height)] items-center gap-[var(--detail-row-gap)] py-[var(--detail-row-padding-y)] md:gap-[var(--detail-row-gap-md)]",
        layout === "inline"
          ? "grid-cols-[var(--detail-row-label-width)_minmax(0,1fr)] md:grid-cols-[var(--detail-row-label-width-md)_minmax(0,1fr)]"
          : "md:grid-cols-[var(--detail-row-label-width-md)_minmax(0,1fr)]",
        separator === "top" && "border-t border-[var(--color-border-base-default)]",
        separator === "bottom" && "border-b border-[var(--color-border-base-default)]",
        className,
      )}
      style={rowStyle}
      {...props}
    >
      <p
        data-slot="detail-row-label"
        className={cn(
          "min-w-0 [word-break:break-word] [font-family:var(--app-font-family-sans)] [letter-spacing:0] [color:var(--color-text-base-secondary)]",
          labelSizeClassName[labelSize],
          lineClampClassName[labelLineClamp],
          labelClassName,
        )}
      >
        {label}
      </p>
      <div
        data-slot="detail-row-value"
        className={cn(
          "min-w-0 [word-break:break-word] [font-family:var(--app-font-family-sans)] [letter-spacing:0] [color:var(--color-text-base-default)]",
          valueSizeClassName[valueSize],
          valueClassName,
        )}
      >
        {isTextValue ? (
          <span
            data-slot="detail-row-value-text"
            className={cn("block min-w-0", lineClampClassName[valueLineClamp])}
          >
            {content}
          </span>
        ) : (
          content
        )}
      </div>
    </div>
  );
}

function DetailRowDivider({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      aria-hidden="true"
      data-slot="detail-row-divider"
      className={cn(
        "h-[4px] w-full max-w-[1200px] border-t border-[var(--color-border-base-default)] opacity-30",
        className,
      )}
      {...props}
    />
  );
}

export { DetailRow, DetailRowDivider };
export type {
  DetailRowLabelSize,
  DetailRowLineClamp,
  DetailRowLayout,
  DetailRowProps,
  DetailRowSeparator,
  DetailRowValueSize,
};
