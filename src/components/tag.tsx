import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

const tagVariants = cva(
  [
    "inline-flex h-[24px] min-w-[32px] w-fit shrink-0 select-none items-center justify-center overflow-hidden whitespace-nowrap rounded-[var(--border-radius-4)] border border-transparent px-[var(--spacing-8)] py-0",
    "gap-[var(--spacing-0)] [font-family:var(--app-font-family-sans)] [font-size:var(--text-body-sm-500-font-size)] [font-weight:var(--text-body-sm-500-font-weight)] [letter-spacing:0] [line-height:20px]",
    "transition-[color,background-color,border-color]",
    "[&>svg]:pointer-events-none [&>svg]:size-[var(--spacing-16)] [&>svg]:shrink-0",
    "[&>[data-slot=mud-icon]]:pointer-events-none [&>[data-slot=mud-icon]]:size-[var(--spacing-16)] [&>[data-slot=mud-icon]]:shrink-0",
  ],
  {
    variants: {
      tone: {
        brand:
          "data-[variant=subtle]:bg-[var(--color-background-brand-secondary)] data-[variant=subtle]:text-[var(--color-text-brand-on-secondary)] data-[variant=strong]:bg-[var(--color-background-brand-default)] data-[variant=strong]:text-[var(--color-text-base-inverse-on-color)] data-[variant=outlined]:border-[var(--color-border-brand-default)] data-[variant=outlined]:bg-transparent data-[variant=outlined]:text-[var(--color-text-brand-default)]",
        accent:
          "data-[variant=subtle]:bg-[var(--color-background-warning-secondary)] data-[variant=subtle]:text-[var(--color-text-warning-on-secondary)] data-[variant=strong]:bg-[var(--color-background-warning-accent)] data-[variant=strong]:text-[var(--color-text-base-default)] data-[variant=outlined]:border-[var(--color-border-warning-default)] data-[variant=outlined]:bg-transparent data-[variant=outlined]:text-[var(--color-text-warning-default)]",
        danger:
          "data-[variant=subtle]:bg-[var(--color-background-danger-secondary)] data-[variant=subtle]:text-[var(--color-text-danger-on-secondary)] data-[variant=strong]:bg-[var(--color-background-danger-default)] data-[variant=strong]:text-[var(--color-text-base-inverse-on-color)] data-[variant=outlined]:border-[var(--color-border-danger-default)] data-[variant=outlined]:bg-transparent data-[variant=outlined]:text-[var(--color-text-danger-default)]",
        info:
          "data-[variant=subtle]:bg-[var(--color-background-brand-secondary)] data-[variant=subtle]:text-[var(--color-text-base-secondary)] data-[variant=strong]:bg-[var(--color-background-brand-default)] data-[variant=strong]:text-[var(--color-text-base-inverse-on-color)] data-[variant=outlined]:border-[var(--color-border-brand-default)] data-[variant=outlined]:bg-transparent data-[variant=outlined]:text-[var(--color-text-brand-default)]",
        muted:
          "data-[variant=subtle]:bg-[var(--color-background-base-default)] data-[variant=subtle]:text-[var(--color-text-base-tertiary)] data-[variant=strong]:bg-[var(--color-background-base-inverse-default-active)] data-[variant=strong]:text-[var(--color-text-base-inverse-on-color)] data-[variant=outlined]:border-[var(--color-border-base-default)] data-[variant=outlined]:bg-transparent data-[variant=outlined]:text-[var(--color-text-base-tertiary)]",
        neutral:
          "data-[variant=subtle]:bg-[var(--color-background-base-tertiary)] data-[variant=subtle]:text-[var(--color-text-base-default)] data-[variant=strong]:bg-[var(--color-background-base-inverse-default)] data-[variant=strong]:text-[var(--color-text-base-inverse-on-color)] data-[variant=outlined]:border-[var(--color-border-base-default)] data-[variant=outlined]:bg-transparent data-[variant=outlined]:text-[var(--color-text-base-default)]",
        positive:
          "data-[variant=subtle]:bg-[var(--color-background-positive-secondary)] data-[variant=subtle]:text-[var(--color-text-positive-on-secondary)] data-[variant=strong]:bg-[var(--color-background-positive-default)] data-[variant=strong]:text-[var(--color-text-base-inverse-on-color)] data-[variant=outlined]:border-[var(--color-border-positive-default)] data-[variant=outlined]:bg-transparent data-[variant=outlined]:text-[var(--color-text-positive-on-secondary)]",
        success:
          "data-[variant=subtle]:bg-[var(--color-background-positive-secondary)] data-[variant=subtle]:text-[var(--color-text-positive-on-secondary)] data-[variant=strong]:bg-[var(--color-background-positive-default)] data-[variant=strong]:text-[var(--color-text-base-inverse-on-color)] data-[variant=outlined]:border-[var(--color-border-positive-default)] data-[variant=outlined]:bg-transparent data-[variant=outlined]:text-[var(--color-text-positive-on-secondary)]",
        warning:
          "data-[variant=subtle]:bg-[var(--color-background-warning-secondary)] data-[variant=subtle]:text-[var(--color-text-warning-on-secondary)] data-[variant=strong]:bg-[var(--color-background-warning-accent)] data-[variant=strong]:text-[var(--color-text-base-default)] data-[variant=outlined]:border-[var(--color-border-warning-default)] data-[variant=outlined]:bg-transparent data-[variant=outlined]:text-[var(--color-text-warning-default)]",
      },
      size: {
        sm: "h-[20px] px-[var(--spacing-6)] [font-size:var(--text-caption-md-500-font-size)] [line-height:16px] has-[>[data-slot=mud-icon]]:gap-[var(--spacing-4)] has-[>[data-slot=mud-icon]]:pl-[var(--spacing-4)] has-[>[data-slot=mud-icon]]:pr-[var(--spacing-6)] [&>[data-slot=mud-icon]]:size-[12px]",
        md: "h-[24px] px-[var(--spacing-8)] [font-size:var(--text-body-sm-500-font-size)] [line-height:20px] has-[>[data-slot=mud-icon]]:gap-[var(--spacing-4)] has-[>[data-slot=mud-icon]]:pl-[var(--spacing-6)] has-[>[data-slot=mud-icon]]:pr-[var(--spacing-8)]",
        lg: "h-[28px] px-[var(--spacing-12)] [font-size:var(--text-body-sm-500-font-size)] [line-height:20px] has-[>[data-slot=mud-icon]]:gap-[var(--spacing-4)] has-[>[data-slot=mud-icon]]:pl-[var(--spacing-8)] has-[>[data-slot=mud-icon]]:pr-[var(--spacing-12)]",
      },
      variant: {
        outlined: "",
        strong: "",
        subtle: "",
      },
    },
    defaultVariants: {
      tone: "neutral",
      size: "md",
      variant: "subtle",
    },
  },
);

const infoTagVariants = cva(
  [
    "inline-flex h-[24px] min-w-[32px] w-fit shrink-0 select-none items-center justify-center overflow-hidden whitespace-nowrap rounded-[var(--border-radius-4)] px-[var(--spacing-6)] py-0",
    "gap-[var(--spacing-0)] border border-transparent [font-family:var(--app-font-family-sans)] [font-size:var(--text-body-sm-font-size)] [font-weight:var(--text-body-sm-font-weight)] [letter-spacing:0] [line-height:20px]",
    "transition-[color,background-color,border-color]",
    "[&>svg]:pointer-events-none [&>svg]:size-[var(--spacing-16)] [&>svg]:shrink-0",
    "[&>[data-slot=mud-icon]]:pointer-events-none [&>[data-slot=mud-icon]]:size-[var(--spacing-16)] [&>[data-slot=mud-icon]]:shrink-0",
    "has-[>[data-slot=mud-icon]]:gap-[var(--spacing-4)] has-[>[data-slot=mud-icon]]:pl-[var(--spacing-4)] has-[>[data-slot=mud-icon]]:pr-[var(--spacing-6)]",
  ],
  {
    variants: {
      variant: {
        strong:
          "bg-[var(--color-background-brand-secondary)] text-[var(--color-text-base-secondary)]",
        subtle: "bg-transparent text-[var(--color-text-base-tertiary)]",
      },
    },
    defaultVariants: {
      variant: "strong",
    },
  },
);

function Tag({
  className,
  size,
  tone,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof tagVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="tag"
      data-variant={variant ?? "subtle"}
      className={cn(tagVariants({ tone, size, variant }), className)}
      {...props}
    />
  );
}

function InfoTag({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof infoTagVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="info-tag"
      data-variant={variant ?? "strong"}
      className={cn(infoTagVariants({ variant }), className)}
      {...props}
    />
  );
}

function TagGroup({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="tag-group"
      className={cn(
        "inline-flex flex-wrap items-center gap-[var(--spacing-8)]",
        className,
      )}
      {...props}
    />
  );
}

export { InfoTag, Tag, TagGroup, infoTagVariants, tagVariants };
