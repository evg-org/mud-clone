import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

const iconVariants = cva("inline-flex shrink-0 items-center justify-center", {
  variants: {
    size: {
      sm: "size-[var(--spacing-16)]",
      md: "size-[var(--spacing-20)]",
      lg: "size-[var(--spacing-24)]",
      xl: "size-[var(--spacing-32)]",
    },
    tone: {
      default: "[color:var(--color-icon-base-default)]",
      secondary: "[color:var(--color-icon-base-secondary)]",
      tertiary: "[color:var(--color-icon-base-tertiary)]",
      brand: "[color:var(--color-text-brand-default)]",
      positive: "[color:var(--color-icon-positive-default)]",
      warning: "[color:var(--color-icon-warning-default)]",
      danger: "[color:var(--color-icon-danger-default)]",
      inverse: "[color:var(--color-icon-base-inverse-on-color)]",
    },
  },
  defaultVariants: {
    size: "md",
    tone: "default",
  },
});

function Icon({
  className,
  size,
  tone,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof iconVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="icon"
      className={cn(iconVariants({ size, tone }), className)}
      {...props}
    />
  );
}

export { Icon, iconVariants };
