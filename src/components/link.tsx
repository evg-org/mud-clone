import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

const linkVariants = cva(
  [
    "inline-flex items-center gap-[var(--spacing-4)] whitespace-nowrap",
    "[font-family:var(--app-font-family-sans)] [letter-spacing:var(--app-letter-spacing-default)]",
    "[color:var(--app-link-color)] [text-decoration-skip-ink:none] underline-offset-[0.12em] decoration-[1px] transition-colors",
    "hover:[color:var(--app-link-hover)] hover:decoration-[1.5px] visited:[color:var(--app-link-visited)] visited:decoration-[1.5px]",
    "focus-visible:rounded-[var(--border-radius-4)] focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-[var(--blue-sky-500)] focus-visible:ring-offset-[1px] focus-visible:ring-offset-[var(--white-1000)]",
    "aria-disabled:pointer-events-none aria-disabled:[color:var(--color-text-disabled-default)] aria-disabled:no-underline",
    "disabled:pointer-events-none disabled:[color:var(--color-text-disabled-default)] disabled:no-underline",
  ],
  {
    variants: {
      variant: {
        primary:
          "[--app-link-color:var(--color-link-primary-default)] [--app-link-hover:var(--color-link-primary-hover)] [--app-link-visited:var(--color-link-primary-visited)]",
        strict:
          "[--app-link-color:var(--color-link-strict-default)] [--app-link-hover:var(--color-link-strict-hover)] [--app-link-visited:var(--color-link-strict-default)]",
        white:
          "[--app-link-color:var(--color-link-white-default)] [--app-link-hover:var(--color-link-white-default)] [--app-link-visited:var(--color-link-white-default)]",
      },
      size: {
        lg: "[font-size:var(--text-body-lg-font-size)] [line-height:var(--text-body-lg-line-height)]",
        md: "[font-size:var(--text-body-md-font-size)] [line-height:var(--text-body-md-line-height)]",
        sm: "[font-size:var(--text-body-sm-font-size)] [line-height:var(--text-body-sm-line-height)]",
        xs: "[font-size:var(--text-caption-md-font-size)] [line-height:var(--text-caption-md-line-height)]",
      },
      underline: {
        true: "underline",
        false: "no-underline",
      },
      weight: {
        regular: "[font-weight:var(--text-body-md-font-weight)]",
        medium: "[font-weight:var(--text-body-md-500-font-weight)]",
      },
      targetSize: {
        none: "",
        pointer: "min-h-[var(--spacing-32)] px-[var(--spacing-8)]",
        touch: "min-h-[var(--spacing-40)] px-[var(--spacing-12)]",
      },
      visited: {
        true: "",
        false: "[--app-link-visited:var(--app-link-color)]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      underline: true,
      weight: "regular",
      targetSize: "none",
      visited: true,
    },
  },
);

function Link({
  asChild = false,
  className,
  disabled = false,
  variant,
  size,
  underline,
  weight,
  targetSize,
  visited,
  tabIndex,
  ...props
}: LinkProps) {
  const Comp = asChild ? Slot : "a";

  return (
    <Comp
      aria-disabled={disabled || undefined}
      data-slot="link"
      tabIndex={disabled ? -1 : tabIndex}
      className={cn(
        linkVariants({ variant, size, underline, weight, targetSize, visited }),
        className,
      )}
      {...props}
    />
  );
}

type LinkProps = React.ComponentProps<"a"> &
  VariantProps<typeof linkVariants> & {
    asChild?: boolean;
    disabled?: boolean;
  };

type LinkWeight = NonNullable<LinkProps["weight"]>;

export { Link, linkVariants };
export type { LinkProps, LinkWeight };
