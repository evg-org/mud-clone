import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

const buttonVariants = cva(
  [
    "inline-flex max-w-full items-center justify-center gap-[var(--app-control-gap-md)] overflow-hidden text-ellipsis whitespace-nowrap",
    "rounded-[var(--app-control-radius-md)] border-[length:var(--app-control-border-width)] border-transparent [font-family:var(--app-control-font-family)] [font-weight:var(--app-control-font-weight)] [letter-spacing:var(--app-control-letter-spacing)]",
    "transition-colors duration-200 ease-in-out",
    "outline-none focus-visible:ring-[var(--app-control-focus-ring-width)] focus-visible:ring-[var(--app-control-focus-ring-color)] focus-visible:ring-offset-[length:var(--app-control-focus-ring-offset-width)] focus-visible:ring-offset-[var(--app-control-focus-ring-offset-color)]",
    "disabled:pointer-events-none disabled:[color:var(--app-control-disabled-fg)] data-[loading=true]:pointer-events-none",
    "aria-invalid:border-[var(--color-border-danger-default)] aria-invalid:ring-[var(--color-background-danger-secondary)]",
    "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-[var(--app-control-icon-md)] [&_svg]:shrink-0 [&_[data-slot=mud-icon]]:pointer-events-none [&_[data-slot=mud-icon]]:size-[var(--app-control-icon-md)] [&_[data-slot=mud-icon]]:shrink-0",
  ],
  {
    variants: {
      variant: {
        default:
          "bg-[var(--app-control-primary-bg)] [color:var(--app-control-primary-fg)] hover:bg-[var(--app-control-primary-bg-hover)] active:bg-[var(--app-control-primary-bg-active)] disabled:border-transparent disabled:bg-[var(--app-control-disabled-bg)]",
        primary:
          "bg-[var(--app-control-primary-bg)] [color:var(--app-control-primary-fg)] hover:bg-[var(--app-control-primary-bg-hover)] active:bg-[var(--app-control-primary-bg-active)] disabled:border-transparent disabled:bg-[var(--app-control-disabled-bg)]",
        strict:
          "bg-[var(--app-control-strict-bg)] [color:var(--app-control-strict-fg)] hover:bg-[var(--app-control-strict-bg-hover)] active:bg-[var(--app-control-strict-bg-active)] disabled:border-transparent disabled:bg-[var(--app-control-disabled-bg)]",
        neutral:
          "bg-[var(--app-control-neutral-bg)] [color:var(--app-control-neutral-fg)] hover:bg-[var(--app-control-neutral-bg-hover)] active:bg-[var(--app-control-neutral-bg-active)] disabled:border-transparent disabled:bg-[var(--app-control-disabled-bg)]",
        destructive:
          "bg-[var(--app-control-danger-bg)] [color:var(--app-control-danger-fg)] hover:bg-[var(--app-control-danger-bg-hover)] active:bg-[var(--app-control-danger-bg-active)] disabled:border-transparent disabled:bg-[var(--app-control-disabled-bg)]",
        outline:
          "border-[var(--app-control-outline-border)] bg-transparent [color:var(--app-control-outline-fg)] hover:border-transparent hover:bg-[var(--app-control-primary-bg-hover)] hover:[color:var(--app-control-primary-fg)] active:border-transparent active:bg-[var(--app-control-primary-bg-active)] active:[color:var(--app-control-primary-fg)] disabled:border-[var(--app-control-disabled-border)] disabled:bg-transparent",
        "outline-primary":
          "border-[var(--app-control-outline-border)] bg-transparent [color:var(--app-control-outline-fg)] hover:border-transparent hover:bg-[var(--app-control-primary-bg-hover)] hover:[color:var(--app-control-primary-fg)] active:border-transparent active:bg-[var(--app-control-primary-bg-active)] active:[color:var(--app-control-primary-fg)] disabled:border-[var(--app-control-disabled-border)] disabled:bg-transparent",
        "outline-secondary":
          "border-[var(--app-control-secondary-bg)] bg-transparent [color:var(--app-control-outline-fg)] hover:border-transparent hover:bg-[var(--app-control-primary-bg-hover)] hover:[color:var(--app-control-primary-fg)] active:border-transparent active:bg-[var(--app-control-primary-bg-active)] active:[color:var(--app-control-primary-fg)] disabled:border-[var(--app-control-disabled-border)] disabled:bg-transparent",
        "outline-strict":
          "border-[var(--app-control-strict-bg)] bg-transparent [color:var(--color-text-base-default)] hover:border-transparent hover:bg-[var(--app-control-strict-bg-hover)] hover:[color:var(--app-control-strict-fg)] active:border-transparent active:bg-[var(--app-control-strict-bg-active)] active:[color:var(--app-control-strict-fg)] disabled:border-[var(--app-control-disabled-border)] disabled:bg-transparent",
        "outline-neutral":
          "border-[var(--app-control-outline-neutral-border)] bg-transparent [color:var(--app-control-outline-neutral-fg)] hover:bg-[var(--color-background-base-secondary)] active:bg-[var(--color-background-base-tertiary)] disabled:border-[var(--app-control-disabled-border)] disabled:bg-transparent",
        "outline-destructive":
          "border-[var(--app-control-danger-outline-border)] bg-transparent [color:var(--app-control-danger-outline-fg)] hover:border-transparent hover:bg-[var(--app-control-danger-bg-hover)] hover:[color:var(--app-control-danger-fg)] active:border-transparent active:bg-[var(--app-control-danger-bg-active)] active:[color:var(--app-control-danger-fg)] disabled:border-[var(--app-control-disabled-border)] disabled:bg-transparent",
        secondary:
          "bg-[var(--app-control-secondary-bg)] [color:var(--app-control-secondary-fg)] hover:bg-[var(--app-control-secondary-bg-hover)] active:bg-[var(--app-control-secondary-bg-active)] disabled:border-transparent disabled:bg-[var(--app-control-disabled-bg)]",
        ghost:
          "bg-transparent [color:var(--color-text-base-default)] hover:bg-[var(--color-background-base-tertiary-hover)] active:bg-[var(--color-background-base-tertiary-active)] disabled:bg-transparent",
        "text-primary":
          "border-transparent bg-transparent [color:var(--color-text-brand-default)] hover:bg-[var(--color-background-brand-secondary-hover)] active:bg-[var(--color-background-brand-secondary-active)] disabled:bg-transparent",
        "text-strict":
          "border-transparent bg-transparent [color:var(--color-text-base-default)] hover:bg-[var(--color-background-base-tertiary-hover)] active:bg-[var(--color-background-base-tertiary-active)] disabled:bg-transparent",
        "text-destructive":
          "border-transparent bg-transparent [color:var(--color-text-danger-default)] hover:bg-[var(--color-background-danger-secondary)] active:bg-[var(--color-background-danger-secondary-active)] disabled:bg-transparent",
        "text-link":
          "h-auto border-0 bg-transparent p-0 [color:var(--color-text-brand-default)] hover:bg-transparent hover:[color:var(--app-control-primary-bg-hover)] active:bg-transparent active:[color:var(--app-control-primary-bg-active)]",
        "text-link-neutral":
          "h-auto border-0 bg-transparent p-0 [color:var(--color-text-base-default)] hover:bg-transparent hover:[color:var(--color-text-brand-default)] active:bg-transparent active:[color:var(--app-control-primary-bg-active)]",
        link: "h-auto rounded-[var(--app-control-radius-xs)] bg-transparent p-0 [color:var(--color-text-brand-default)] underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-[var(--app-control-height-md)] min-w-[var(--app-control-min-width-md)] px-[var(--app-control-padding-x-md)] py-0 [font-size:var(--app-control-font-size-md)] [line-height:var(--app-control-line-height-md)] has-[>svg:first-child]:pl-[var(--app-control-padding-x-md-with-icon)] has-[>svg:last-child]:pr-[var(--app-control-padding-x-md-with-icon)] has-[>[data-slot=mud-icon]:first-child]:pl-[var(--app-control-padding-x-md-with-icon)] has-[>[data-slot=mud-icon]:last-child]:pr-[var(--app-control-padding-x-md-with-icon)] [&_[data-slot=mud-icon]]:size-[var(--app-control-icon-md)]",
        md: "h-[var(--app-control-height-md)] min-w-[var(--app-control-min-width-md)] px-[var(--app-control-padding-x-md)] py-0 [font-size:var(--app-control-font-size-md)] [line-height:var(--app-control-line-height-md)] has-[>svg:first-child]:pl-[var(--app-control-padding-x-md-with-icon)] has-[>svg:last-child]:pr-[var(--app-control-padding-x-md-with-icon)] has-[>[data-slot=mud-icon]:first-child]:pl-[var(--app-control-padding-x-md-with-icon)] has-[>[data-slot=mud-icon]:last-child]:pr-[var(--app-control-padding-x-md-with-icon)] [&_[data-slot=mud-icon]]:size-[var(--app-control-icon-md)]",
        sm: "h-[var(--app-control-height-sm)] min-w-[var(--app-control-min-width-sm)] px-[var(--app-control-padding-x-sm)] py-0 [font-size:var(--app-control-font-size-sm)] [line-height:var(--app-control-line-height-sm)] has-[>svg:first-child]:pl-[var(--app-control-padding-x-sm-with-icon)] has-[>svg:last-child]:pr-[var(--app-control-padding-x-sm-with-icon)] has-[>[data-slot=mud-icon]:first-child]:pl-[var(--app-control-padding-x-sm-with-icon)] has-[>[data-slot=mud-icon]:last-child]:pr-[var(--app-control-padding-x-sm-with-icon)] [&_svg:not([class*='size-'])]:size-[var(--app-control-icon-sm)] [&_[data-slot=mud-icon]]:size-[var(--app-control-icon-sm)]",
        lg: "h-[var(--app-control-height-lg)] min-w-[var(--app-control-min-width-lg)] px-[var(--app-control-padding-x-lg)] py-0 [font-size:var(--app-control-font-size-lg)] [line-height:var(--app-control-line-height-lg)] has-[>svg:first-child]:pl-[var(--app-control-padding-x-lg-with-icon)] has-[>svg:last-child]:pr-[var(--app-control-padding-x-lg-with-icon)] has-[>[data-slot=mud-icon]:first-child]:pl-[var(--app-control-padding-x-lg-with-icon)] has-[>[data-slot=mud-icon]:last-child]:pr-[var(--app-control-padding-x-lg-with-icon)] [&_svg:not([class*='size-'])]:size-[var(--app-control-icon-lg)] [&_[data-slot=mud-icon]]:size-[var(--app-control-icon-lg)]",
        icon: "size-[var(--app-control-height-md)] shrink-0 p-0 [&_svg:not([class*='size-'])]:size-[var(--app-control-icon-md)] [&_[data-slot=mud-icon]]:size-[var(--app-control-icon-md)]",
        "icon-sm": "size-[var(--app-control-height-sm)] shrink-0 p-0 [&_svg:not([class*='size-'])]:size-[var(--app-control-icon-sm)] [&_[data-slot=mud-icon]]:size-[var(--app-control-icon-sm)]",
        "icon-lg": "size-[var(--app-control-height-lg)] shrink-0 p-0 [&_svg:not([class*='size-'])]:size-[var(--app-control-icon-lg)] [&_[data-slot=mud-icon]]:size-[var(--app-control-icon-lg)]",
      },
      radius: {
        default: "rounded-[var(--app-control-radius-md)]",
        sm: "rounded-[var(--app-control-radius-sm)]",
        pill: "rounded-[var(--app-control-radius-full)]",
        square: "rounded-[var(--app-control-radius-xs)]",
      },
    },
    compoundVariants: [
      {
        variant: "link",
        className:
          "min-h-0 border-0 px-0 py-0 hover:bg-transparent active:bg-transparent",
      },
      {
        variant: "text-link",
        className:
          "min-h-0 border-0 px-0 py-0 hover:bg-transparent active:bg-transparent",
      },
      {
        variant: "text-link-neutral",
        className:
          "min-h-0 border-0 px-0 py-0 hover:bg-transparent active:bg-transparent",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "lg",
      radius: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  radius,
  loading = false,
  fullWidth = false,
  asChild = false,
  disabled,
  style,
  children,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    fullWidth?: boolean;
    loading?: boolean;
}) {
  const Comp = asChild ? Slot : "button";
  const isDisabled = Boolean(disabled);
  const controlSize =
    size === "sm" || size === "icon-sm"
      ? "sm"
      : !size || size === "lg" || size === "icon-lg"
        ? "lg"
        : "md";

  return (
    <Comp
      data-slot="button"
      data-loading={loading ? true : undefined}
      aria-busy={loading || undefined}
      aria-disabled={loading || (asChild && isDisabled) ? true : undefined}
      disabled={!asChild ? isDisabled : undefined}
      style={{
        fontFamily: "var(--app-control-font-family)",
        fontSize: `var(--app-control-font-size-${controlSize})`,
        fontWeight: "var(--app-control-font-weight)",
        letterSpacing: "var(--app-control-letter-spacing)",
        lineHeight: `var(--app-control-line-height-${controlSize})`,
        ...style,
      }}
      className={cn(
        buttonVariants({ variant, size, radius }),
        fullWidth && "w-full",
        className,
      )}
      {...props}
    >
      {loading && (
        <span
          aria-hidden="true"
          className="size-[var(--app-control-spinner-size)] animate-spin rounded-full border-2 border-current border-r-transparent"
        />
      )}
      {children}
    </Comp>
  );
}

export { Button, buttonVariants };
