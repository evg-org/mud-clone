import * as React from "react";

import { cn } from "./utils";

type SectionHeadingProps = {
  action?: React.ReactNode;
  actionClassName?: string;
  children: React.ReactNode;
  className?: string;
  count?: React.ReactNode;
  countClassName?: string;
  countColor?: string;
  device?: "desktop" | "mobile" | "responsive";
  titleClassName?: string;
};

const sectionHeadingRootClassName = {
  desktop: "flex flex-row items-center gap-[var(--spacing-16)]",
  mobile: "flex flex-col items-start gap-[var(--spacing-16)]",
  responsive:
    "flex flex-col items-start gap-[var(--spacing-16)] md:flex-row md:items-center",
};

const sectionHeadingTitleGroupClassName = {
  desktop: "flex min-w-0 flex-1 items-start gap-[var(--spacing-12)]",
  mobile:
    "flex w-full flex-wrap content-start items-start gap-[var(--spacing-12)]",
  responsive:
    "flex w-full flex-wrap content-start items-start gap-[var(--spacing-12)] md:w-auto md:min-w-0 md:flex-1 md:flex-nowrap",
};

const sectionHeadingTitleClassName = {
  desktop:
    "[font-family:var(--text-desktop-heading-sm-font-family)] [font-size:var(--text-desktop-heading-sm-font-size)] [font-weight:var(--text-desktop-heading-sm-font-weight)] [line-height:var(--text-desktop-heading-sm-line-height)] [letter-spacing:var(--text-desktop-heading-sm-letter-spacing)]",
  mobile:
    "[font-family:var(--text-mobile-heading-sm-font-family)] [font-size:var(--text-mobile-heading-sm-font-size)] [font-weight:var(--text-mobile-heading-sm-font-weight)] [line-height:var(--text-mobile-heading-sm-line-height)] [letter-spacing:var(--text-mobile-heading-sm-letter-spacing)]",
  responsive:
    "[font-family:var(--text-heading-h3-sm-font-family)] [font-size:var(--text-heading-h3-sm-font-size)] [font-weight:var(--text-heading-h3-sm-font-weight)] [line-height:var(--text-heading-h3-sm-line-height)] [letter-spacing:var(--text-heading-h3-sm-letter-spacing)]",
};

const sectionHeadingActionClassName = {
  desktop: "shrink-0",
  mobile: "w-full shrink-0",
  responsive: "w-full shrink-0 md:w-auto",
};

function SectionHeading({
  action,
  actionClassName,
  children,
  className,
  count,
  countClassName,
  countColor,
  device = "responsive",
  titleClassName,
}: SectionHeadingProps) {
  return (
    <div
      data-slot="section-heading"
      data-device={device}
      className={cn(
        "max-w-full shrink-0 [font-family:var(--app-font-family-sans)]",
        sectionHeadingRootClassName[device],
        className,
      )}
    >
      <div
        data-slot="section-heading-title-group"
        className={cn(
          "[word-break:break-word]",
          sectionHeadingTitleGroupClassName[device],
        )}
      >
        <h2
          className={cn(
            "m-0 min-w-0 [color:var(--color-text-base-default)]",
            sectionHeadingTitleClassName[device],
            titleClassName,
          )}
        >
          {children}
        </h2>
        {count !== undefined && (
          <p
            className={cn(
              "m-0 shrink-0 [color:var(--black-400-alpha)]",
              sectionHeadingTitleClassName[device],
              countClassName,
            )}
            style={countColor ? { color: countColor } : undefined}
          >
            {count}
          </p>
        )}
      </div>
      {action !== undefined && (
        <div
          data-slot="section-heading-action"
          className={cn(sectionHeadingActionClassName[device], actionClassName)}
        >
          {action}
        </div>
      )}
    </div>
  );
}

export { SectionHeading };
export type { SectionHeadingProps };
