"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { MudIcon } from "./mud-icon";
import { cn } from "./utils";

const inputChipRemoveIconSvg =
  '<svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M5.61969 5.21967C5.91259 4.92678 6.38746 4.92678 6.68035 5.21967L10.4 8.93934L14.1197 5.21967C14.4126 4.92678 14.8875 4.92678 15.1804 5.21967C15.4732 5.51256 15.4732 5.98744 15.1804 6.28033L11.4607 10L15.1804 13.7197C15.4732 14.0126 15.4732 14.4874 15.1804 14.7803C14.8875 15.0732 14.4126 15.0732 14.1197 14.7803L10.4 11.0607L6.68035 14.7803C6.38746 15.0732 5.91259 15.0732 5.61969 14.7803C5.3268 14.4874 5.3268 14.0126 5.61969 13.7197L9.33936 10L5.61969 6.28033C5.3268 5.98744 5.3268 5.51256 5.61969 5.21967Z" fill="black"/></svg>';
const inputChipRemoveIconMask = `url("data:image/svg+xml,${encodeURIComponent(
  inputChipRemoveIconSvg,
)}")`;

type ChipPreviewState = "default" | "focus" | "hover";
type FilterChipSelectionMode = "single" | "multiple";

const filterChipVariants = cva(
  [
    "inline-flex h-[36px] min-w-[60px] w-fit shrink-0 select-none items-center justify-center overflow-hidden rounded-[var(--border-radius-full)] border border-transparent py-0",
    "gap-[var(--spacing-8)] px-[var(--spacing-16)] [font-family:var(--app-font-family-sans)] [font-size:var(--text-body-sm-500-font-size)] [font-weight:var(--text-body-sm-500-font-weight)] [letter-spacing:0] [line-height:var(--text-body-sm-500-line-height)]",
    "bg-[var(--color-background-base-tertiary)] text-[var(--color-text-base-default)] transition-[background-color,color,box-shadow]",
    "hover:bg-[var(--color-background-base-tertiary-hover)] focus-visible:shadow-[0_0_0_2px_var(--white-1000),0_0_0_5px_var(--blue-sky-500)]",
    "data-[preview-state=hover]:bg-[var(--color-background-base-tertiary-hover)] data-[preview-state=focus]:shadow-[0_0_0_2px_var(--white-1000),0_0_0_5px_var(--blue-sky-500)]",
    "data-[selected=true]:bg-[var(--color-background-base-inverse-default)] data-[selected=true]:text-[var(--color-text-base-inverse-on-color)]",
    "data-[selected=true]:hover:bg-[var(--color-background-base-inverse-default-hover)] data-[selected=true][data-preview-state=hover]:bg-[var(--color-background-base-inverse-default-hover)]",
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-[var(--color-background-disabled-default)] disabled:text-[var(--color-text-disabled-on-disabled)]",
  ],
);

type FilterChipProps = Omit<React.ComponentProps<"button">, "children"> &
  VariantProps<typeof filterChipVariants> & {
    counter?: number | string;
    indicator?: boolean;
    label: React.ReactNode;
    previewState?: ChipPreviewState;
    selected?: boolean;
    selectionMode?: FilterChipSelectionMode;
  };

function FilterChip({
  className,
  counter,
  disabled,
  indicator = false,
  label,
  previewState = "default",
  selected = false,
  selectionMode = "single",
  type = "button",
  ...props
}: FilterChipProps) {
  const showCheck = selected && selectionMode === "multiple";
  const hasCompactLeadingContent = showCheck || indicator;
  const hasCompactTrailingContent = counter !== undefined && counter !== null;

  return (
    <button
      data-preview-state={previewState === "default" ? undefined : previewState}
      data-selected={selected ? true : undefined}
      data-slot="filter-chip"
      disabled={disabled}
      type={type}
      className={cn(
        filterChipVariants(),
        hasCompactLeadingContent && "pl-[var(--spacing-12)]",
        hasCompactTrailingContent && "pr-[var(--spacing-12)]",
        (hasCompactLeadingContent || hasCompactTrailingContent) &&
          "gap-[var(--spacing-4)]",
        className,
      )}
      {...props}
    >
      {showCheck ? (
        <MudIcon
          aria-hidden="true"
          className="size-[var(--spacing-16)] shrink-0"
          name="Outlined/20/checkmark-small"
        />
      ) : null}
      {indicator ? (
        <span
          aria-hidden="true"
          className="size-[var(--spacing-8)] shrink-0 rounded-[var(--border-radius-full)] bg-[var(--color-background-danger-default)]"
          data-slot="filter-chip-indicator"
        />
      ) : null}
      <span className="min-w-0 overflow-hidden text-ellipsis whitespace-nowrap">
        {label}
      </span>
      {hasCompactTrailingContent ? (
        <span
          className="inline-flex h-[16px] min-w-[16px] shrink-0 items-center justify-center rounded-[var(--border-radius-full)] bg-[var(--color-background-base-default)] px-[var(--spacing-2)] [font-size:var(--text-caption-md-500-font-size)] [font-weight:var(--text-caption-md-500-font-weight)] [line-height:var(--text-caption-md-500-line-height)] text-[var(--color-text-base-default)]"
          data-slot="filter-chip-counter"
        >
          {counter}
        </span>
      ) : null}
    </button>
  );
}

const inputChipVariants = cva(
  [
    "inline-flex h-[36px] w-fit max-w-full shrink-0 select-none items-center overflow-hidden rounded-[var(--border-radius-full)] [font-family:var(--app-font-family-sans)] [font-size:var(--text-body-sm-500-font-size)] [font-weight:var(--text-body-sm-500-font-weight)] [letter-spacing:0] [line-height:var(--text-body-sm-500-line-height)] transition-[background-color,border-color,color]",
  ],
  {
    variants: {
      variant: {
        avatar:
          "min-w-[100px] gap-[var(--spacing-6)] border-[1.5px] border-[var(--color-border-base-default)] bg-[var(--color-background-base-default)] py-[var(--spacing-6)] pl-[var(--spacing-6)] pr-[var(--spacing-8)] text-[var(--color-text-base-default)] data-[disabled=true]:border-[var(--color-border-disabled-default)] data-[disabled=true]:text-[var(--color-text-disabled-default)]",
        simple:
          "min-w-[64px] justify-center gap-[var(--spacing-4)] bg-[var(--color-background-base-tertiary)] py-0 pl-[var(--spacing-16)] pr-[var(--spacing-12)] text-[var(--color-text-base-default)] data-[disabled=true]:bg-[var(--color-background-disabled-default)] data-[disabled=true]:text-[var(--color-text-disabled-on-disabled)]",
      },
    },
    defaultVariants: {
      variant: "simple",
    },
  },
);

type InputChipProps = Omit<React.ComponentProps<"span">, "children"> &
  VariantProps<typeof inputChipVariants> & {
    avatarAlt?: string;
    avatarSrc?: string;
    disabled?: boolean;
    label: React.ReactNode;
    onRemove?: () => void;
    previewState?: ChipPreviewState;
    removable?: boolean;
    removeLabel?: string;
  };

function InputChip({
  avatarAlt = "",
  avatarSrc,
  className,
  disabled = false,
  label,
  onRemove,
  previewState = "default",
  removable = true,
  removeLabel = "Remove",
  variant,
  ...props
}: InputChipProps) {
  const normalizedVariant = variant ?? (avatarSrc ? "avatar" : "simple");
  const closeClassName = cn(
    "inline-flex size-[var(--spacing-20)] shrink-0 items-center justify-center rounded-[var(--border-radius-full)] text-[var(--color-icon-base-default)] outline-none transition-[background-color,box-shadow,color]",
    "hover:bg-[var(--color-background-base-tertiary-hover)] focus-visible:shadow-[0_0_0_1px_var(--white-1000),0_0_0_3px_var(--blue-sky-500)]",
    previewState === "hover" &&
      "bg-[var(--color-background-base-tertiary-hover)]",
    previewState === "focus" &&
      "shadow-[0_0_0_1px_var(--white-1000),0_0_0_3px_var(--blue-sky-500)]",
    disabled &&
      "pointer-events-none text-[var(--color-icon-disabled-on-disabled)]",
  );
  const closeIcon = (
    <span
      aria-hidden="true"
      className="size-[var(--spacing-20)] shrink-0"
      data-slot="input-chip-remove-icon"
      style={{
        WebkitMaskImage: inputChipRemoveIconMask,
        WebkitMaskPosition: "center",
        WebkitMaskRepeat: "no-repeat",
        WebkitMaskSize: "contain",
        backgroundColor: "currentColor",
        maskImage: inputChipRemoveIconMask,
        maskPosition: "center",
        maskRepeat: "no-repeat",
        maskSize: "contain",
      }}
    />
  );

  return (
    <span
      data-disabled={disabled ? true : undefined}
      data-preview-state={previewState === "default" ? undefined : previewState}
      data-slot="input-chip"
      className={cn(inputChipVariants({ variant: normalizedVariant }), className)}
      {...props}
    >
      {avatarSrc ? (
        <span
          className={cn(
            "relative size-[var(--spacing-24)] shrink-0 overflow-hidden rounded-[var(--border-radius-full)]",
            disabled && "opacity-60",
          )}
          data-slot="input-chip-avatar"
        >
          <img
            alt={avatarAlt}
            className="size-full object-cover"
            draggable={false}
            src={avatarSrc}
          />
        </span>
      ) : null}
      <span className="min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-center">
        {label}
      </span>
      {removable ? (
        onRemove && !disabled ? (
          <button
            aria-label={removeLabel}
            className={closeClassName}
            data-slot="input-chip-remove"
            onClick={onRemove}
            type="button"
          >
            {closeIcon}
          </button>
        ) : (
          <span
            aria-hidden="true"
            className={closeClassName}
            data-slot="input-chip-remove"
          >
            {closeIcon}
          </span>
        )
      ) : null}
    </span>
  );
}

function ChipGroup({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="chip-group"
      className={cn(
        "inline-flex flex-wrap items-center gap-[var(--spacing-8)]",
        className,
      )}
      {...props}
    />
  );
}

export {
  ChipGroup,
  FilterChip,
  InputChip,
  filterChipVariants,
  inputChipVariants,
};
export type {
  ChipPreviewState,
  FilterChipProps,
  FilterChipSelectionMode,
  InputChipProps,
};
