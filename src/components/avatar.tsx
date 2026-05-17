"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

import { cn } from "./utils";

type AvatarSize =
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
type NormalizedAvatarSize = "xs" | "sm" | "md" | "lg" | "xl";
type AvatarBackground = "neutral" | "white";
type AvatarNotification =
  | "dot"
  | number
  | {
      count?: number;
      label?: string;
      type?: "dot" | "number";
    };

const avatarSizeAliases: Record<AvatarSize, NormalizedAvatarSize> = {
  xs: "xs",
  sm: "sm",
  md: "md",
  lg: "lg",
  xl: "xl",
  "extra-small": "xs",
  small: "sm",
  medium: "md",
  large: "lg",
  "extra-large": "xl",
};

const avatarSizeClassName: Record<NormalizedAvatarSize, string> = {
  xs: "size-[24px] [&_[data-slot=avatar-icon]]:size-[16px]",
  sm: "size-[32px] [&_[data-slot=avatar-icon]]:size-[16px]",
  md: "size-[40px] [&_[data-slot=avatar-icon]]:size-[20px]",
  lg: "size-[48px] [&_[data-slot=avatar-icon]]:size-[24px]",
  xl: "size-[72px] [&_[data-slot=avatar-icon]]:size-[24px]",
};

const avatarFallbackSizeClassName: Record<NormalizedAvatarSize, string> = {
  xs: "[font-size:12px] [line-height:16px]",
  sm: "[font-size:14px] [line-height:20px]",
  md: "[font-size:14px] [line-height:20px]",
  lg: "[font-size:16px] [line-height:24px]",
  xl: "[font-size:18px] [line-height:28px]",
};

const avatarNotificationOffsetClassName: Record<NormalizedAvatarSize, string> = {
  xs: "right-[-3px] top-[-3px]",
  sm: "right-[-4px] top-[-4px]",
  md: "right-[-2px] top-[-2px]",
  lg: "right-[-3px] top-[-3px]",
  xl: "right-[-3px] top-[-3px]",
};

const avatarNotificationNumberSizeClassName: Record<
  NormalizedAvatarSize,
  string
> = {
  xs: "h-[12px] min-w-[12px] px-[var(--spacing-2)] [font-size:var(--text-caption-sm-font-size)] [font-weight:var(--text-caption-sm-font-weight)] [line-height:var(--text-caption-sm-line-height)]",
  sm: "h-[16px] min-w-[16px] px-[var(--spacing-2)] [font-size:var(--text-caption-md-500-font-size)] [font-weight:var(--text-caption-md-500-font-weight)] [line-height:var(--text-caption-md-500-line-height)]",
  md: "h-[16px] min-w-[16px] px-[var(--spacing-2)] [font-size:var(--text-caption-md-500-font-size)] [font-weight:var(--text-caption-md-500-font-weight)] [line-height:var(--text-caption-md-500-line-height)]",
  lg: "h-[20px] min-w-[20px] px-[var(--spacing-4)] [font-size:var(--text-caption-md-500-font-size)] [font-weight:var(--text-caption-md-500-font-weight)] [line-height:var(--text-caption-md-500-line-height)]",
  xl: "h-[24px] min-w-[24px] px-[var(--spacing-4)] [font-size:var(--text-body-sm-500-font-size)] [font-weight:var(--text-body-sm-500-font-weight)] [line-height:var(--text-body-sm-500-line-height)]",
};

const avatarNotificationDotSizeClassName: Record<NormalizedAvatarSize, string> = {
  xs: "size-[12px] min-h-[12px] min-w-[12px] p-0",
  sm: "size-[16px] min-h-[16px] min-w-[16px] p-0",
  md: "size-[16px] min-h-[16px] min-w-[16px] p-0",
  lg: "size-[20px] min-h-[20px] min-w-[20px] p-0",
  xl: "size-[24px] min-h-[24px] min-w-[24px] p-0",
};

const avatarNotificationDotInnerSizeClassName: Partial<
  Record<NormalizedAvatarSize, string>
> = {
  sm: "size-[2px]",
  md: "size-[2px]",
  lg: "size-[3px]",
  xl: "size-[3px]",
};

const avatarStackOverlapClassName: Record<NormalizedAvatarSize, string> = {
  xs: "-space-x-[8px]",
  sm: "-space-x-[10px]",
  md: "-space-x-[12px]",
  lg: "-space-x-[14px]",
  xl: "-space-x-[20px]",
};

const avatarBackgroundClassName: Record<AvatarBackground, string> = {
  neutral:
    "bg-[var(--color-background-base-tertiary)] [&_[data-slot=avatar-fallback]]:bg-[var(--color-background-base-tertiary)]",
  white:
    "bg-[var(--color-background-base-default)] [&_[data-slot=avatar-fallback]]:bg-[var(--color-background-base-default)]",
};

function normalizeAvatarSize(size: AvatarSize | null | undefined) {
  return avatarSizeAliases[size ?? "md"];
}

function getNotificationConfig(notification: AvatarNotification | undefined) {
  if (!notification) return null;

  if (notification === "dot") {
    return { label: "Notificare nouă", text: null, type: "dot" as const };
  }

  if (typeof notification === "number") {
    return {
      label: `${notification} notificări`,
      text: notification > 99 ? "99+" : String(notification),
      type: "number" as const,
    };
  }

  if (notification.type === "dot") {
    return {
      label: notification.label ?? "Notificare nouă",
      text: null,
      type: "dot" as const,
    };
  }

  const count = notification.count ?? 0;

  return {
    label: notification.label ?? `${count} notificări`,
    text: count > 99 ? "99+" : String(count),
    type: "number" as const,
  };
}

function AvatarNotificationBadge({
  notification,
  size,
}: {
  notification: AvatarNotification;
  size: NormalizedAvatarSize;
}) {
  const config = getNotificationConfig(notification);
  const dotInnerClassName =
    config?.type === "dot"
      ? avatarNotificationDotInnerSizeClassName[size]
      : undefined;

  if (!config) return null;

  return (
    <span
      aria-label={config.label}
      data-slot="avatar-notification"
      role="status"
      className={cn(
        "absolute z-10 inline-flex items-center justify-center overflow-hidden rounded-[var(--border-radius-full)] bg-[var(--color-background-danger-default)] [font-family:var(--app-font-family-sans)] [letter-spacing:0] [color:var(--color-text-base-inverse-on-color)]",
        avatarNotificationOffsetClassName[size],
        config.type === "dot"
          ? avatarNotificationDotSizeClassName[size]
          : avatarNotificationNumberSizeClassName[size],
      )}
    >
      {dotInnerClassName ? (
        <span
          aria-hidden="true"
          className={cn(
            "block shrink-0 rounded-[var(--border-radius-full)] bg-[var(--color-text-base-inverse-on-color)]",
            dotInnerClassName,
          )}
        />
      ) : (
        config.text
      )}
    </span>
  );
}

function Avatar({
  background = "neutral",
  className,
  children,
  focused = false,
  notification,
  size = "md",
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root> & {
  background?: AvatarBackground;
  focused?: boolean;
  notification?: AvatarNotification;
  size?: AvatarSize;
}) {
  const normalizedSize = normalizeAvatarSize(size);

  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      data-size={normalizedSize}
      className={cn(
        "group/avatar relative inline-flex shrink-0 rounded-[var(--border-radius-full)] align-middle focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-white",
        avatarSizeClassName[normalizedSize],
        avatarBackgroundClassName[background],
        focused &&
          "ring-[3px] ring-[var(--focus-ring)] ring-offset-2 ring-offset-white",
        className,
      )}
      {...props}
    >
      {children}
      {notification && (
        <AvatarNotificationBadge
          notification={notification}
          size={normalizedSize}
        />
      )}
    </AvatarPrimitive.Root>
  );
}

function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn(
        "aspect-square size-full rounded-[var(--border-radius-full)] object-cover",
        className,
      )}
      {...props}
    />
  );
}

function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "flex size-full items-center justify-center rounded-[var(--border-radius-full)] bg-[var(--color-background-base-tertiary)] [font-family:var(--app-font-family-sans)] [font-weight:var(--app-font-weight-medium)] [letter-spacing:0] [color:var(--color-text-base-secondary)] group-data-[size=xs]/avatar:[font-size:12px] group-data-[size=xs]/avatar:[line-height:16px] group-data-[size=sm]/avatar:[font-size:14px] group-data-[size=sm]/avatar:[line-height:20px] group-data-[size=md]/avatar:[font-size:14px] group-data-[size=md]/avatar:[line-height:20px] group-data-[size=lg]/avatar:[font-size:16px] group-data-[size=lg]/avatar:[line-height:24px] group-data-[size=xl]/avatar:[font-size:18px] group-data-[size=xl]/avatar:[line-height:28px]",
        className,
      )}
      {...props}
    />
  );
}

function AvatarPersonIcon({
  className,
  ...props
}: React.ComponentProps<"svg">) {
  return (
    <svg
      aria-hidden="true"
      className={cn("shrink-0 [color:var(--color-icon-base-secondary)]", className)}
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        clipRule="evenodd"
        d="M12 3.9A3.6 3.6 0 1 0 12 11.1 3.6 3.6 0 0 0 12 3.9ZM6.6 7.5a5.4 5.4 0 1 1 10.8 0 5.4 5.4 0 0 1-10.8 0ZM8 15.9A3.1 3.1 0 0 0 4.9 19v1a.9.9 0 1 1-1.8 0v-1A4.9 4.9 0 0 1 8 14.1h8a4.9 4.9 0 0 1 4.9 4.9v1a.9.9 0 1 1-1.8 0v-1a3.1 3.1 0 0 0-3.1-3.1H8Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
}

function AvatarIconFallback({
  className,
  icon = "person",
  ...props
}: Omit<React.ComponentProps<typeof AvatarPrimitive.Fallback>, "children"> & {
  icon?: React.ReactElement | string;
}) {
  const iconNode = React.isValidElement<{ className?: string }>(icon) ? (
    React.cloneElement(icon, {
      className: cn("[color:var(--color-icon-base-secondary)]", icon.props.className),
      "data-slot": "avatar-icon",
    } as React.HTMLAttributes<HTMLElement>)
  ) : (
    <AvatarPersonIcon data-icon-name={icon} data-slot="avatar-icon" />
  );

  return (
    <AvatarFallback className={className} {...props}>
      {iconNode}
    </AvatarFallback>
  );
}

function AvatarStack({
  className,
  size = "md",
  ...props
}: React.ComponentProps<"div"> & {
  size?: AvatarSize;
}) {
  const normalizedSize = normalizeAvatarSize(size);

  return (
    <div
      data-slot="avatar-stack"
      className={cn(
        "flex items-center [&_[data-slot=avatar]]:ring-2 [&_[data-slot=avatar]]:ring-[var(--color-background-base-default)]",
        avatarStackOverlapClassName[normalizedSize],
        className,
      )}
      {...props}
    />
  );
}

function AvatarStackOverflow({
  className,
  count,
  size = "md",
  ...props
}: React.ComponentProps<"span"> & {
  count: number;
  size?: AvatarSize;
}) {
  const normalizedSize = normalizeAvatarSize(size);

  return (
    <span
      data-slot="avatar-stack-overflow"
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-[var(--border-radius-full)] bg-[var(--color-background-base-tertiary)] [font-family:var(--app-font-family-sans)] [font-weight:var(--app-font-weight-medium)] [color:var(--color-text-base-secondary)] ring-2 ring-[var(--color-background-base-default)]",
        avatarSizeClassName[normalizedSize],
        avatarFallbackSizeClassName[normalizedSize],
        className,
      )}
      {...props}
    >
      +{count}
    </span>
  );
}

export {
  Avatar,
  AvatarFallback,
  AvatarIconFallback,
  AvatarImage,
  AvatarStack,
  AvatarStackOverflow,
};
export type { AvatarBackground, AvatarNotification, AvatarSize };
