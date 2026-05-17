import * as React from "react";

import { cn } from "./utils";

type SeparatorThickness = "extra-thin" | "thin" | "medium" | "thick";
type SeparatorTone = "subtle" | "mild" | "strong";

type SeparatorProps = React.ComponentProps<"div"> & {
  decorative?: boolean;
  thickness?: SeparatorThickness;
  tone?: SeparatorTone;
};

const separatorThicknessValue: Record<SeparatorThickness, string> = {
  "extra-thin": "0.5px",
  thin: "1px",
  medium: "1.5px",
  thick: "2px",
};

const separatorToneColor: Record<SeparatorTone, string> = {
  subtle: "var(--color-border-base-default)",
  mild: "var(--color-border-base-secondary)",
  strong: "var(--color-border-base-tertiary)",
};

function Separator({
  className,
  decorative = true,
  style,
  thickness = "thin",
  tone = "subtle",
  ...props
}: SeparatorProps) {
  const separatorStyle = {
    "--separator-color": separatorToneColor[tone],
    "--separator-thickness": separatorThicknessValue[thickness],
    ...style,
  } as React.CSSProperties;

  return (
    <div
      aria-hidden={decorative ? true : undefined}
      aria-orientation={decorative ? undefined : "horizontal"}
      data-slot="separator"
      data-thickness={thickness}
      data-tone={tone}
      role={decorative ? undefined : "separator"}
      className={cn(
        "flex w-full items-center px-0 py-[var(--spacing-2)]",
        className,
      )}
      style={separatorStyle}
      {...props}
    >
      <span
        aria-hidden="true"
        className="block h-[var(--separator-thickness)] w-full rounded-[var(--border-radius-full)] bg-[var(--separator-color)]"
      />
    </div>
  );
}

export { Separator };
export type { SeparatorProps, SeparatorThickness, SeparatorTone };
