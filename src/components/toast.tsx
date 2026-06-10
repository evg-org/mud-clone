"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { MudIcon } from "./mud-icon";
import { cn } from "./utils";

const toastVariants = cva(
  [
    "flex w-[350px] max-w-full overflow-hidden rounded-[var(--border-radius-8)] [font-family:var(--app-font-family-sans)]",
    "transition-[opacity,transform] duration-200 ease-out",
    "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-top-2",
    "data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
  ],
  {
    variants: {
      tone: {
        error:
          "bg-[var(--color-background-danger-default)] text-[var(--color-text-base-inverse-on-color)]",
        info:
          "bg-[var(--color-background-brand-default)] text-[var(--color-text-base-inverse-on-color)]",
        success:
          "bg-[var(--color-background-positive-default)] text-[var(--color-text-base-inverse-on-color)]",
        warning:
          "bg-[var(--color-background-warning-accent)] text-[var(--color-text-base-default-on-color)]",
      },
    },
    defaultVariants: {
      tone: "info",
    },
  },
);

type ToastTone = NonNullable<VariantProps<typeof toastVariants>["tone"]>;
type ToastPreviewState = "default" | "focus" | "hover";
type ToastState = "closed" | "open";

type ToastProps = Omit<React.ComponentProps<"div">, "children" | "title"> &
  VariantProps<typeof toastVariants> & {
    action?: React.ReactNode;
    children?: React.ReactNode;
    closeLabel?: string;
    dismissible?: boolean;
    heading?: React.ReactNode;
    icon?: React.ReactNode;
    onDismiss?: () => void;
    previewState?: ToastPreviewState;
    state?: ToastState;
  };

const toastIconNames: Record<ToastTone, string> = {
  error: "Filled/24/circle-error-filled",
  info: "Filled/24/circle-info-filled",
  success: "Filled/24/circle-checkmark-filled",
  warning: "Filled/24/warning-filled",
};

const toastRoleByTone: Record<ToastTone, "alert" | "status"> = {
  error: "alert",
  info: "status",
  success: "status",
  warning: "alert",
};

function Toast({
  action,
  children,
  className,
  closeLabel = "Dismiss notification",
  dismissible = true,
  heading,
  icon,
  onDismiss,
  previewState = "default",
  role,
  state = "open",
  tone,
  ...props
}: ToastProps) {
  const resolvedTone = tone ?? "info";
  const hasHeading = heading !== undefined && heading !== null;
  const isWarning = resolvedTone === "warning";
  const content = children ?? "We inform you about service changes.";
  const closeHoverClassName = isWarning
    ? "hover:bg-[var(--black-200-alpha)] data-[preview-state=hover]:bg-[var(--black-200-alpha)]"
    : "hover:bg-[var(--white-200-alpha)] data-[preview-state=hover]:bg-[var(--white-200-alpha)]";

  return (
    <div
      data-slot="toast"
      data-state={state}
      role={role ?? toastRoleByTone[resolvedTone]}
      className={cn(
        toastVariants({ tone: resolvedTone }),
        hasHeading
          ? "items-start gap-[var(--spacing-16)] px-[var(--spacing-12)] pb-[var(--spacing-16)] pt-[var(--spacing-12)]"
          : "items-center gap-[var(--spacing-16)] p-[var(--spacing-12)]",
        className,
      )}
      {...props}
    >
      <span
        aria-hidden="true"
        className="inline-flex size-[var(--spacing-28)] shrink-0 items-center justify-center p-[var(--spacing-2)]"
        data-slot="toast-icon"
      >
        {icon ?? (
          <MudIcon
            className="size-[var(--spacing-24)]"
            name={toastIconNames[resolvedTone]}
          />
        )}
      </span>
      <span
        className={cn(
          "min-w-0 flex-1",
          hasHeading
            ? "grid gap-[var(--spacing-8)]"
            : "flex items-center gap-[var(--spacing-8)]",
        )}
        data-slot="toast-content"
      >
        <span
          className={cn(
            "min-w-0",
            hasHeading ? "grid gap-[var(--spacing-6)]" : "block",
          )}
          data-slot="toast-copy"
        >
          {hasHeading && (
            <strong
              className="line-clamp-2 block overflow-hidden text-ellipsis [font-size:18px] [font-weight:var(--ds-font-weight-semibold)] [letter-spacing:0] [line-height:26px]"
              data-slot="toast-heading"
            >
              {heading}
            </strong>
          )}
          <span
            className="block overflow-hidden text-ellipsis [font-size:var(--text-body-sm-font-size)] [font-weight:var(--text-body-sm-font-weight)] [letter-spacing:0] [line-height:var(--text-body-sm-line-height)]"
            data-slot="toast-description"
          >
            {content}
          </span>
        </span>
        {action && (
          <span
            className="inline-flex min-h-[24px] shrink-0 items-center [font-size:var(--text-body-md-font-size)] [font-weight:var(--text-body-md-font-weight)] [letter-spacing:0] [line-height:var(--text-body-md-line-height)] underline underline-offset-[3px]"
            data-slot="toast-action"
          >
            {action}
          </span>
        )}
      </span>
      {dismissible && (
        <span className="relative size-[var(--spacing-16)] shrink-0" data-slot="toast-close-frame">
          <button
            aria-label={closeLabel}
            className={cn(
              "absolute left-1/2 top-1/2 inline-flex size-[var(--spacing-32)] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[var(--border-radius-4)] border-0 bg-transparent p-0 text-current outline-none transition-[background-color,box-shadow]",
              "[@media(pointer:coarse)]:size-[var(--spacing-40)]",
              "focus-visible:shadow-[0_0_0_2px_var(--white-1000),0_0_0_5px_var(--blue-sky-500)] data-[preview-state=focus]:shadow-[0_0_0_2px_var(--white-1000),0_0_0_5px_var(--blue-sky-500)]",
              closeHoverClassName,
            )}
            data-preview-state={previewState === "default" ? undefined : previewState}
            data-slot="toast-close"
            onClick={onDismiss}
            type="button"
          >
            <MudIcon className="size-[var(--spacing-16)]" name="Outlined/16/cross-large" />
          </button>
        </span>
      )}
    </div>
  );
}

export { Toast, toastVariants };
export type { ToastPreviewState, ToastProps, ToastState, ToastTone };
