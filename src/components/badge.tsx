import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

type BadgeSize =
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "extra-small"
  | "small"
  | "medium"
  | "large"
  | "extra-large";
type BadgeVariant =
  | "accent"
  | "dark"
  | "light"
  | "neutral"
  | "notification"
  | "default"
  | "destructive"
  | "danger"
  | "info"
  | "outline"
  | "positive"
  | "secondary"
  | "solid-accent"
  | "solid-dark"
  | "solid-light"
  | "solid-neutral"
  | "solid-notification"
  | "subtle-accent"
  | "subtle-dark"
  | "subtle-light"
  | "subtle-neutral"
  | "outlined-accent"
  | "outlined-dark"
  | "outlined-light"
  | "outlined-neutral"
  | "warning";
type BadgeType = "dot" | "numbered";
type NormalizedBadgeSize =
  | "extra-small"
  | "small"
  | "medium"
  | "large"
  | "extra-large";
type NumberedBadgeSize = "medium" | "large" | "extra-large";
type NormalizedBadgeVariant = "accent" | "dark" | "light" | "neutral" | "notification";

const sizeAliases: Record<BadgeSize, NormalizedBadgeSize> = {
  xs: "extra-small",
  sm: "small",
  md: "medium",
  lg: "large",
  xl: "extra-large",
  "extra-small": "extra-small",
  small: "small",
  medium: "medium",
  large: "large",
  "extra-large": "extra-large",
};

const variantAliases: Record<BadgeVariant, NormalizedBadgeVariant> = {
  accent: "accent",
  dark: "dark",
  default: "dark",
  destructive: "notification",
  danger: "notification",
  info: "neutral",
  light: "light",
  neutral: "neutral",
  notification: "notification",
  outline: "neutral",
  "outlined-accent": "accent",
  "outlined-dark": "dark",
  "outlined-light": "light",
  "outlined-neutral": "neutral",
  positive: "neutral",
  secondary: "neutral",
  "solid-accent": "accent",
  "solid-dark": "dark",
  "solid-light": "light",
  "solid-neutral": "neutral",
  "solid-notification": "notification",
  "subtle-accent": "accent",
  "subtle-dark": "dark",
  "subtle-light": "light",
  "subtle-neutral": "neutral",
  warning: "accent",
};

const variantStyle: Record<NormalizedBadgeVariant, React.CSSProperties> = {
  accent: {
    backgroundColor: "var(--color-background-warning-accent)",
    color: "var(--color-text-base-default-on-color)",
  },
  dark: {
    backgroundColor: "var(--color-background-base-inverse-default)",
    color: "var(--color-text-base-inverse-on-color)",
  },
  light: {
    backgroundColor: "var(--color-background-base-default)",
    color: "var(--color-text-base-default)",
  },
  neutral: {
    backgroundColor: "var(--color-background-base-tertiary)",
    color: "var(--color-text-base-default)",
  },
  notification: {
    backgroundColor: "var(--color-background-danger-default)",
    color: "var(--color-text-base-inverse-on-color)",
  },
};

const captionSmallClassName =
  "[font-size:var(--text-caption-sm-font-size)] [font-weight:var(--text-caption-sm-font-weight)] [line-height:var(--text-caption-sm-line-height)]";
const captionMediumStrongClassName =
  "[font-size:var(--text-caption-md-500-font-size)] [font-weight:var(--text-caption-md-500-font-weight)] [line-height:var(--text-caption-md-500-line-height)]";
const bodySmallStrongClassName =
  "[font-size:var(--text-body-sm-500-font-size)] [font-weight:var(--text-body-sm-500-font-weight)] [line-height:var(--text-body-sm-500-line-height)]";

const numberedSizeClassName: Record<NumberedBadgeSize, string> = {
  medium: `h-[16px] min-w-[16px] px-[var(--spacing-2)] ${captionMediumStrongClassName}`,
  large: `h-[20px] min-w-[20px] px-[var(--spacing-4)] ${captionMediumStrongClassName}`,
  "extra-large": `h-[24px] min-w-[24px] px-[var(--spacing-8)] ${bodySmallStrongClassName}`,
};

const notificationNumberedSizeClassName: Record<NormalizedBadgeSize, string> = {
  "extra-small": `h-[12px] min-w-[12px] px-[var(--spacing-2)] ${captionSmallClassName}`,
  small: `h-[12px] min-w-[12px] px-[var(--spacing-2)] ${captionSmallClassName}`,
  medium: `h-[16px] min-w-[16px] px-[var(--spacing-2)] ${captionMediumStrongClassName}`,
  large: `h-[20px] min-w-[20px] px-[var(--spacing-4)] ${captionMediumStrongClassName}`,
  "extra-large": `h-[24px] min-w-[24px] px-[var(--spacing-4)] ${bodySmallStrongClassName}`,
};

const notificationDotSizeClassName: Record<NormalizedBadgeSize, string> = {
  "extra-small": "size-[8px] min-h-[8px] min-w-[8px] p-0",
  small: "size-[12px] min-h-[12px] min-w-[12px] p-0",
  medium: "size-[16px] min-h-[16px] min-w-[16px] p-0",
  large: "size-[20px] min-h-[20px] min-w-[20px] p-0",
  "extra-large": "size-[24px] min-h-[24px] min-w-[24px] p-0",
};

const notificationDotInnerSizeClassName: Partial<Record<NormalizedBadgeSize, string>> = {
  medium: "size-[2px]",
  large: "size-[3px]",
  "extra-large": "size-[3px]",
};

function normalizeSize(size: BadgeSize | null | undefined) {
  return sizeAliases[size ?? "medium"];
}

function normalizeNumberedSize(size: NormalizedBadgeSize): NumberedBadgeSize {
  if (size === "large" || size === "extra-large") return size;

  return "medium";
}

function normalizeVariant(variant: BadgeVariant | null | undefined) {
  return variantAliases[variant ?? "accent"];
}

const badgeVariants = cva(
  [
    "inline-flex w-fit shrink-0 items-center justify-center whitespace-nowrap rounded-[var(--border-radius-full)] border border-transparent py-[var(--spacing-0)]",
    "[font-family:var(--app-font-family-sans)] [letter-spacing:0]",
    "transition-[color,box-shadow,background-color,border-color] overflow-hidden",
    "focus-visible:border-[var(--focus-ring)] focus-visible:ring-[var(--focus-ring)] focus-visible:ring-[3px] focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "aria-invalid:border-[var(--color-border-danger-default)] aria-invalid:ring-[var(--color-background-danger-secondary)]",
  ],
  {
    variants: {
      size: {
        medium: numberedSizeClassName.medium,
        large: numberedSizeClassName.large,
        "extra-large": numberedSizeClassName["extra-large"],
      },
      variant: {
        accent: "",
        dark: "",
        light: "",
        neutral: "",
        notification: "",
      },
    },
    defaultVariants: {
      variant: "accent",
      size: "medium",
    },
  },
);

function Badge({
  className,
  size,
  type,
  variant,
  asChild = false,
  children,
  style,
  ...props
}: React.ComponentProps<"span"> &
  Omit<VariantProps<typeof badgeVariants>, "size" | "variant"> & {
    asChild?: boolean;
    size?: BadgeSize;
    type?: BadgeType;
    variant?: BadgeVariant;
  }) {
  const Comp = asChild ? Slot : "span";
  const normalizedSize = normalizeSize(size);
  const normalizedVariant = normalizeVariant(
    variant ?? (type === "dot" ? "notification" : undefined),
  );
  const isNotification = normalizedVariant === "notification";
  const resolvedType: BadgeType =
    type ?? (isNotification && !children ? "dot" : "numbered");
  const numberedSize = normalizeNumberedSize(normalizedSize);
  const dotInnerClassName =
    resolvedType === "dot"
      ? notificationDotInnerSizeClassName[normalizedSize]
      : undefined;

  return (
    <Comp
      data-slot="badge"
      className={cn(
        isNotification
          ? badgeVariants({ variant: "notification" })
          : badgeVariants({ size: numberedSize, variant: normalizedVariant }),
        isNotification &&
          (resolvedType === "dot"
            ? notificationDotSizeClassName[normalizedSize]
            : notificationNumberedSizeClassName[normalizedSize]),
        className,
      )}
      style={{
        ...variantStyle[normalizedVariant],
        ...style,
      }}
      {...props}
    >
      {resolvedType === "dot" && dotInnerClassName ? (
        <span
          aria-hidden="true"
          className={cn(
            "inline-block shrink-0 rounded-[var(--border-radius-full)]",
            dotInnerClassName,
          )}
          data-slot="badge-dot"
          style={{
            backgroundColor: "var(--color-text-base-inverse-on-color)",
          }}
        />
      ) : (
        children
      )}
    </Comp>
  );
}

export { Badge, badgeVariants };
