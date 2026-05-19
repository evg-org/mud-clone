import * as React from "react";

import { MudIcon } from "./mud-icon";
import { cn } from "./utils";

type PaginationProps = React.ComponentProps<"nav">;

function Pagination({
  "aria-label": ariaLabel = "Pagination",
  className,
  ...props
}: PaginationProps) {
  return (
    <nav
      role="navigation"
      aria-label={ariaLabel}
      data-slot="pagination"
      className={cn("flex w-full justify-center", className)}
      {...props}
    />
  );
}

type PaginationContentProps = React.ComponentProps<"ul">;

function PaginationContent({ className, ...props }: PaginationContentProps) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn(
        "flex flex-row items-center gap-[var(--spacing-16)]",
        className,
      )}
      {...props}
    />
  );
}

type PaginationItemProps = React.ComponentProps<"li">;

function PaginationItem({ ...props }: PaginationItemProps) {
  return <li data-slot="pagination-item" {...props} />;
}

type PaginationLinkPreviewState = "hover" | "focus";
type PaginationLinkSize =
  | "control"
  | "control-sm"
  | "default"
  | "icon"
  | "icon-lg"
  | "icon-sm"
  | "lg"
  | "md"
  | "page"
  | "page-sm"
  | "sm";

type PaginationLinkProps = {
  disabled?: boolean;
  isActive?: boolean;
  previewState?: PaginationLinkPreviewState;
  size?: PaginationLinkSize;
} & React.ComponentProps<"a">;

function PaginationLink({
  className,
  disabled = false,
  onClick,
  isActive,
  previewState,
  size = "page",
  tabIndex,
  ...props
}: PaginationLinkProps) {
  const isControl =
    size === "control" ||
    size === "control-sm" ||
    size === "default" ||
    size === "lg" ||
    size === "md" ||
    size === "sm";
  const isCompactPage = size === "page-sm" || size === "icon-sm";

  return (
    <a
      aria-current={isActive ? "page" : undefined}
      aria-disabled={disabled ? true : undefined}
      data-slot="pagination-link"
      data-active={isActive ? true : undefined}
      data-disabled={disabled ? true : undefined}
      data-preview-state={previewState}
      tabIndex={disabled ? -1 : tabIndex}
      onClick={(event) => {
        if (disabled) {
          event.preventDefault();
          return;
        }

        onClick?.(event);
      }}
      className={cn(
        "inline-flex items-center justify-center border border-transparent [font-family:var(--app-font-family-sans)] [font-size:var(--text-body-sm-500-font-size)] [font-weight:var(--text-body-sm-500-font-weight)] [line-height:var(--text-body-sm-500-line-height)] [letter-spacing:0] outline-none transition-[background-color,box-shadow,color]",
        "focus-visible:z-10 focus-visible:shadow-[0_0_0_2px_var(--white-1000),0_0_0_5px_var(--blue-sky-500)] data-[preview-state=focus]:z-10 data-[preview-state=focus]:shadow-[0_0_0_2px_var(--white-1000),0_0_0_5px_var(--blue-sky-500)]",
        size === "control-sm"
          ? "size-[32px] min-w-[32px] gap-0 rounded-[var(--border-radius-6)] p-0"
          : isControl
            ? "h-[40px] min-w-[56px] gap-[var(--spacing-6)] rounded-[var(--border-radius-6)] px-[var(--spacing-12)]"
            : isCompactPage
              ? "size-[32px] min-w-[32px] rounded-[var(--border-radius-4)] px-0"
              : "size-[40px] min-w-[40px] rounded-[var(--border-radius-4)] px-0",
        isActive
          ? "bg-[var(--color-background-brand-default)] [color:var(--color-text-base-inverse-on-color)] hover:bg-[var(--color-background-brand-default-hover)]"
          : "bg-transparent [color:var(--color-text-base-default)] hover:bg-[var(--color-background-base-tertiary-hover)] active:bg-[var(--color-background-base-tertiary-active)] data-[preview-state=hover]:bg-[var(--color-background-base-tertiary-hover)]",
        disabled &&
          "pointer-events-none bg-transparent [color:var(--color-text-disabled-default)]",
        size === "control-sm"
          ? "[&_[data-slot=mud-icon]]:size-[16px]"
          : "[&_[data-slot=mud-icon]]:size-[20px]",
        className,
      )}
      {...props}
    />
  );
}

function PaginationPrevious({
  children = "Previous",
  className,
  disabled,
  size = "control",
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  const isCompactControl = size === "control-sm";

  return (
    <PaginationLink
      aria-label="Previous page"
      disabled={disabled}
      size={size}
      className={cn(
        isCompactControl
          ? "p-0"
          : "pl-[var(--spacing-12)] pr-[var(--spacing-16)]",
        className,
      )}
      {...props}
    >
      <MudIcon
        name={
          isCompactControl
            ? "Outlined/16/chevron-left"
            : "Outlined/20/chevron-left"
        }
      />
      {!isCompactControl && <span className="hidden sm:inline">{children}</span>}
    </PaginationLink>
  );
}

function PaginationNext({
  children = "Next",
  className,
  disabled,
  size = "control",
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  const isCompactControl = size === "control-sm";

  return (
    <PaginationLink
      aria-label="Next page"
      disabled={disabled}
      size={size}
      className={cn(
        isCompactControl
          ? "p-0"
          : "pl-[var(--spacing-16)] pr-[var(--spacing-12)]",
        className,
      )}
      {...props}
    >
      {!isCompactControl && <span className="hidden sm:inline">{children}</span>}
      <MudIcon
        name={
          isCompactControl
            ? "Outlined/16/chevron-right"
            : "Outlined/20/chevron-right"
        }
      />
    </PaginationLink>
  );
}

type PaginationEllipsisSize = "default" | "sm";

type PaginationEllipsisProps = React.ComponentProps<"span"> & {
  previewState?: PaginationLinkPreviewState;
  size?: PaginationEllipsisSize;
};

function PaginationEllipsis({
  className,
  previewState,
  size = "default",
  ...props
}: PaginationEllipsisProps) {
  return (
    <span
      data-slot="pagination-ellipsis"
      data-preview-state={previewState}
      className={cn(
        "relative flex items-center justify-center rounded-[var(--border-radius-4)] [font-family:var(--app-font-family-sans)] [font-size:var(--text-body-sm-500-font-size)] [font-weight:var(--text-body-sm-500-font-weight)] [line-height:var(--text-body-sm-500-line-height)] [letter-spacing:0] [color:var(--color-text-base-default)] data-[preview-state=hover]:bg-[var(--color-background-base-tertiary-hover)]",
        size === "sm" ? "size-[32px]" : "size-[40px]",
        className,
      )}
      {...props}
    >
      <span aria-hidden="true">...</span>
      <span className="sr-only">More pages</span>
    </span>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};
export type {
  PaginationContentProps,
  PaginationEllipsisProps,
  PaginationItemProps,
  PaginationLinkProps,
  PaginationProps,
  PaginationEllipsisSize,
  PaginationLinkPreviewState,
  PaginationLinkSize,
};
