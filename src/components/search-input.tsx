import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { MudIcon } from "./mud-icon";
import { cn } from "./utils";

const searchInputVariants = cva(
  [
    "box-border flex w-full min-w-0 items-center gap-[var(--spacing-8)] overflow-hidden border bg-[var(--color-background-base-default)] py-0 transition-[box-shadow,border-color,background-color]",
    "hover:border-2 focus-within:border-2 focus-within:border-[var(--color-border-brand-default)] focus-within:ring-[4px] focus-within:ring-[var(--blue-sky-200)] focus-within:ring-offset-0",
    "data-[preview-state=hover]:border-2 data-[preview-state=hover]:border-[var(--color-border-base-tertiary)] data-[preview-state=focus-empty]:border-2 data-[preview-state=focus-empty]:border-[var(--color-border-brand-default)] data-[preview-state=focus-empty]:ring-[4px] data-[preview-state=focus-empty]:ring-[var(--blue-sky-200)] data-[preview-state=focus-populated]:border-2 data-[preview-state=focus-populated]:border-[var(--color-border-brand-default)] data-[preview-state=focus-populated]:ring-[4px] data-[preview-state=focus-populated]:ring-[var(--blue-sky-200)] data-[preview-state=loading]:border-2 data-[preview-state=loading]:border-[var(--color-border-brand-default)] data-[preview-state=loading]:ring-[4px] data-[preview-state=loading]:ring-[var(--blue-sky-200)]",
    "data-[disabled=true]:pointer-events-none data-[disabled=true]:cursor-not-allowed data-[disabled=true]:border-[var(--color-border-disabled-default)] data-[disabled=true]:bg-[var(--color-background-disabled-default)]",
    "data-[with-button=true]:pr-[var(--spacing-4)]",
  ],
  {
    variants: {
      inputSize: {
        lg: "h-[var(--app-control-height-lg)] px-[var(--spacing-16)]",
        md: "h-[var(--app-control-height-md)] px-[var(--spacing-12)]",
      },
      shape: {
        circular: "rounded-[var(--border-radius-full)]",
        rectangular: "rounded-[var(--border-radius-8)]",
      },
      state: {
        default: "border-[var(--color-border-base-default)]",
        filled: "border-[var(--color-border-base-default)]",
        "focus-empty":
          "border-2 border-[var(--color-border-brand-default)] ring-[4px] ring-[var(--blue-sky-200)]",
        "focus-populated":
          "border-2 border-[var(--color-border-brand-default)] ring-[4px] ring-[var(--blue-sky-200)]",
        hover: "border-2 border-[var(--color-border-base-tertiary)]",
        loading:
          "border-2 border-[var(--color-border-brand-default)] ring-[4px] ring-[var(--blue-sky-200)]",
      },
    },
    defaultVariants: {
      inputSize: "lg",
      shape: "rectangular",
      state: "default",
    },
  },
);

type SearchInputSize = NonNullable<VariantProps<typeof searchInputVariants>["inputSize"]>;
type SearchInputShape = NonNullable<VariantProps<typeof searchInputVariants>["shape"]>;
type SearchInputPreviewState = NonNullable<VariantProps<typeof searchInputVariants>["state"]>;

function SearchInput({
  className,
  inputClassName,
  inputSize = "lg",
  loading = false,
  onClear,
  onSubmitSearch,
  previewState = "default",
  shape = "rectangular",
  showSubmitButton = false,
  submitButtonClassName,
  submitButtonLabel = "Submit search",
  value,
  defaultValue,
  disabled,
  ...props
}: Omit<React.ComponentProps<"input">, "type"> & {
  inputClassName?: string;
  inputSize?: SearchInputSize;
  loading?: boolean;
  onClear?: () => void;
  onSubmitSearch?: () => void;
  previewState?: SearchInputPreviewState;
  shape?: SearchInputShape;
  showSubmitButton?: boolean;
  submitButtonClassName?: string;
  submitButtonLabel?: string;
}) {
  const hasValue =
    value !== undefined
      ? String(value).length > 0
      : defaultValue !== undefined && String(defaultValue).length > 0;
  const resolvedState = loading ? "loading" : previewState;
  const showClearButton = Boolean(onClear && hasValue && !disabled && !loading);
  const iconSize = inputSize === "md" ? "md" : "lg";

  return (
    <div
      data-slot="search-input"
      data-disabled={disabled ? true : undefined}
      data-preview-state={resolvedState === "default" || resolvedState === "filled" ? undefined : resolvedState}
      data-shape={shape}
      data-size={inputSize}
      data-with-button={showSubmitButton ? true : undefined}
      className={cn(
        searchInputVariants({
          inputSize,
          shape,
          state: disabled ? "default" : resolvedState,
        }),
        className,
      )}
    >
      <MudIcon
        aria-hidden="true"
        className={cn(
          "shrink-0 [color:var(--color-icon-base-secondary)]",
          disabled && "[color:var(--color-icon-disabled-on-disabled)]",
        )}
        name={inputSize === "md" ? "Outlined/20/search" : "Outlined/24/search"}
        size={iconSize}
      />
      <input
        disabled={disabled}
        data-slot="search-input-control"
        type="search"
        value={value}
        defaultValue={defaultValue}
        className={cn(
          "min-w-0 flex-1 bg-transparent [font-family:var(--app-font-family-sans)] [font-weight:var(--text-body-md-font-weight)] [letter-spacing:0] [color:var(--color-text-base-default)] outline-none placeholder:[color:var(--color-text-base-tertiary)]",
          "disabled:cursor-not-allowed disabled:[color:var(--color-text-disabled-on-disabled)] disabled:placeholder:[color:var(--color-text-disabled-on-disabled)]",
          inputSize === "md"
            ? "[font-size:var(--text-body-sm-font-size)] [line-height:20px]"
            : "[font-size:var(--text-body-md-font-size)] [line-height:24px]",
          inputClassName,
        )}
        {...props}
      />
      {showClearButton && (
        <button
          aria-label="Șterge căutarea"
          className="inline-flex size-[var(--spacing-20)] shrink-0 items-center justify-center rounded-[var(--border-radius-full)] bg-[rgba(18,18,18,0.1)] [color:var(--color-icon-base-secondary)] hover:bg-[var(--color-background-base-tertiary)]"
          onClick={onClear}
          type="button"
        >
          <MudIcon name="Outlined/16/cross-small" size="sm" />
        </button>
      )}
      {loading && (
        <span
          aria-hidden="true"
          data-slot="search-input-spinner"
          className="size-[var(--spacing-20)] shrink-0 animate-spin rounded-[var(--border-radius-full)] border-2 border-[var(--color-border-brand-default)] border-l-transparent"
        />
      )}
      {showSubmitButton && (
        <button
          aria-label={submitButtonLabel}
          className={cn(
            "inline-flex size-[var(--spacing-40)] shrink-0 items-center justify-center bg-[var(--color-background-brand-default)] [color:var(--color-text-base-inverse-on-color)] hover:bg-[var(--color-background-brand-default-hover)]",
            shape === "circular"
              ? "rounded-[var(--border-radius-full)]"
              : "rounded-[var(--border-radius-6)]",
            submitButtonClassName,
          )}
          disabled={disabled}
          onClick={onSubmitSearch}
          type="button"
        >
          <MudIcon
            className="rotate-180"
            name="Outlined/20/arrow-left"
            size="md"
          />
        </button>
      )}
    </div>
  );
}

export { SearchInput, searchInputVariants };
export type { SearchInputPreviewState, SearchInputShape, SearchInputSize };
