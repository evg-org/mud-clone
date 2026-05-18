import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { MudIcon } from "./mud-icon";
import { cn } from "./utils";

const numericInputControlVariants = cva(
  [
    "box-border flex w-full min-w-0 items-center gap-[var(--spacing-8)] overflow-hidden rounded-[var(--border-radius-8)] border bg-[var(--color-background-base-default)] py-0",
    "transition-[color,box-shadow,border-color,background-color]",
    "hover:border-2 focus-within:border-2 focus-within:ring-[4px] focus-within:ring-offset-0",
    "data-[preview-state=hover]:border-2 data-[preview-state=focus]:border-2 data-[preview-state=loading]:border-2",
    "data-[readonly=true]:border-transparent data-[readonly=true]:bg-[var(--color-background-base-secondary)]",
    "data-[disabled=true]:pointer-events-none data-[disabled=true]:cursor-not-allowed data-[disabled=true]:border-[var(--color-border-disabled-default)] data-[disabled=true]:bg-[var(--color-background-disabled-default)]",
  ],
  {
    variants: {
      inputSize: {
        lg: "h-[48px] px-[var(--spacing-16)]",
        md: "h-[40px] px-[var(--spacing-12)]",
      },
      tone: {
        default:
          "border-[var(--color-border-base-default)] hover:border-[var(--color-border-base-tertiary)] focus-within:border-[var(--color-border-brand-default)] focus-within:ring-[var(--blue-sky-200)] data-[preview-state=hover]:border-[var(--color-border-base-tertiary)] data-[preview-state=focus]:border-[var(--color-border-brand-default)] data-[preview-state=focus]:ring-[4px] data-[preview-state=focus]:ring-[var(--blue-sky-200)] data-[preview-state=loading]:border-[var(--color-border-brand-default)] data-[preview-state=loading]:ring-[4px] data-[preview-state=loading]:ring-[var(--blue-sky-200)]",
        destructive:
          "border-[var(--color-border-danger-default)] hover:border-[var(--color-border-danger-default)] focus-within:border-[var(--color-border-danger-default)] focus-within:ring-[var(--red-200)] data-[preview-state=hover]:border-[var(--color-border-danger-default)] data-[preview-state=focus]:border-[var(--color-border-danger-default)] data-[preview-state=focus]:ring-[4px] data-[preview-state=focus]:ring-[var(--red-200)] data-[preview-state=loading]:border-[var(--color-border-danger-default)] data-[preview-state=loading]:ring-[4px] data-[preview-state=loading]:ring-[var(--red-200)]",
        success:
          "border-[var(--color-border-positive-default)] hover:border-[var(--color-border-positive-default)] focus-within:border-[var(--color-border-positive-default)] focus-within:ring-[var(--green-200)] data-[preview-state=hover]:border-[var(--color-border-positive-default)] data-[preview-state=focus]:border-[var(--color-border-positive-default)] data-[preview-state=focus]:ring-[4px] data-[preview-state=focus]:ring-[var(--green-200)] data-[preview-state=loading]:border-[var(--color-border-positive-default)] data-[preview-state=loading]:ring-[4px] data-[preview-state=loading]:ring-[var(--green-200)]",
      },
    },
    defaultVariants: {
      inputSize: "lg",
      tone: "default",
    },
  },
);

type NumericInputTone = NonNullable<
  VariantProps<typeof numericInputControlVariants>["tone"]
>;
type NumericInputSize = NonNullable<
  VariantProps<typeof numericInputControlVariants>["inputSize"]
>;
type NumericInputPreviewState = "default" | "filled" | "focus" | "hover" | "loading";

type NumericInputProps = Omit<React.ComponentProps<"input">, "prefix" | "size"> &
  VariantProps<typeof numericInputControlVariants> & {
    assistiveText?: React.ReactNode;
    clearable?: boolean;
    inputClassName?: string;
    label?: React.ReactNode;
    leadingIcon?: React.ReactNode;
    loading?: boolean;
    mandatory?: boolean;
    onClear?: () => void;
    prefix?: React.ReactNode;
    previewState?: NumericInputPreviewState;
    suffix?: React.ReactNode;
  };

const assistiveToneIcons: Record<NumericInputTone, string | undefined> = {
  default: undefined,
  destructive: "Filled/20/circle-error-filled",
  success: "Filled/20/circle-checkmark-filled",
};

const assistiveToneClassNames: Record<NumericInputTone, string> = {
  default: "[color:var(--color-text-base-secondary)]",
  destructive: "[color:var(--color-text-danger-default)]",
  success: "[color:var(--color-text-positive-default)]",
};

function resolveNumericInputTone(
  tone: NumericInputProps["tone"],
  ariaInvalid: React.ComponentProps<"input">["aria-invalid"],
) {
  return ariaInvalid ? "destructive" : tone ?? "default";
}

function hasDisplayValue(
  value: React.ComponentProps<"input">["value"],
  defaultValue: React.ComponentProps<"input">["defaultValue"],
) {
  if (value !== undefined) {
    return String(value).length > 0;
  }

  return defaultValue !== undefined && String(defaultValue).length > 0;
}

function NumericInput({
  "aria-describedby": ariaDescribedBy,
  "aria-invalid": ariaInvalid,
  assistiveText,
  className,
  clearable = false,
  defaultValue,
  disabled,
  id,
  inputClassName,
  inputMode = "decimal",
  inputSize,
  label = "Label",
  leadingIcon,
  loading = false,
  mandatory = false,
  onClear,
  prefix,
  previewState = "default",
  readOnly,
  required,
  suffix,
  tone,
  type = "text",
  value,
  ...props
}: NumericInputProps) {
  const generatedId = React.useId();
  const inputId = id ?? generatedId;
  const assistiveId = `${inputId}-assistive`;
  const resolvedTone = resolveNumericInputTone(tone, ariaInvalid);
  const resolvedSize = inputSize ?? "lg";
  const resolvedPreviewState = loading ? "loading" : previewState;
  const showPrefix = prefix !== undefined && prefix !== null;
  const showSuffix = suffix !== undefined && suffix !== null;
  const showClearButton =
    clearable && !disabled && !readOnly && (hasDisplayValue(value, defaultValue) || onClear);
  const describedBy =
    [ariaDescribedBy, assistiveText ? assistiveId : undefined]
      .filter(Boolean)
      .join(" ") || undefined;
  const adornmentClassName = cn(
    "inline-flex shrink-0 items-center justify-center [font-family:var(--app-font-family-sans)] [font-size:18px] [font-weight:var(--font-weight-medium)] [letter-spacing:0] [line-height:28px] [color:var(--color-text-base-tertiary)]",
    disabled && "[color:var(--color-text-disabled-on-disabled)]",
  );

  return (
    <div
      data-size={resolvedSize}
      data-slot="numeric-input"
      data-tone={resolvedTone}
      className={cn("grid w-full min-w-0 gap-[var(--spacing-8)]", className)}
    >
      {label && (
        <label
          className="flex min-w-0 items-center gap-[var(--spacing-4)] [font-family:var(--app-font-family-sans)] [font-size:var(--text-body-sm-font-size)] [font-weight:var(--text-body-sm-font-weight)] [line-height:20px] [color:var(--color-text-base-secondary)]"
          htmlFor={inputId}
        >
          <span className="min-w-0 overflow-hidden text-ellipsis whitespace-nowrap">
            {label}
          </span>
          {(mandatory || required) && (
            <span
              aria-hidden="true"
              className="[color:var(--color-text-danger-default)]"
            >
              *
            </span>
          )}
        </label>
      )}
      <div
        data-disabled={disabled ? true : undefined}
        data-preview-state={
          resolvedPreviewState === "default" || resolvedPreviewState === "filled"
            ? undefined
            : resolvedPreviewState
        }
        data-readonly={readOnly ? true : undefined}
        data-slot="numeric-input-control"
        className={numericInputControlVariants({
          inputSize: resolvedSize,
          tone: resolvedTone,
        })}
      >
        {showPrefix && (
          <span className={adornmentClassName} data-slot="numeric-input-prefix">
            {prefix}
          </span>
        )}
        {leadingIcon && (
          <span
            data-slot="numeric-input-leading-icon"
            className={cn(
              "inline-flex shrink-0 items-center justify-center [color:var(--color-icon-base-secondary)] [&>[data-slot=mud-icon]]:size-full",
              disabled && "[color:var(--color-icon-disabled-on-disabled)]",
              resolvedSize === "md"
                ? "size-[var(--spacing-20)]"
                : "size-[var(--spacing-24)]",
            )}
          >
            {leadingIcon}
          </span>
        )}
        <input
          aria-describedby={describedBy}
          aria-invalid={ariaInvalid}
          className={cn(
            "min-w-0 flex-1 bg-transparent [font-family:var(--app-font-family-sans)] [font-weight:var(--text-body-md-font-weight)] [letter-spacing:0] [color:var(--color-text-base-default)] outline-none placeholder:[color:var(--color-text-base-tertiary)]",
            "disabled:cursor-not-allowed disabled:[color:var(--color-text-disabled-on-disabled)] disabled:placeholder:[color:var(--color-text-disabled-on-disabled)]",
            resolvedSize === "md"
              ? "[font-size:var(--text-body-sm-font-size)] [line-height:20px]"
              : "[font-size:var(--text-body-md-font-size)] [line-height:24px]",
            inputClassName,
          )}
          defaultValue={defaultValue}
          disabled={disabled}
          id={inputId}
          inputMode={inputMode}
          readOnly={readOnly}
          required={required}
          type={type}
          value={value}
          {...props}
        />
        {showClearButton && (
          <button
            aria-label="Clear input"
            className="inline-flex size-[var(--spacing-20)] shrink-0 items-center justify-center rounded-[var(--border-radius-full)] bg-[rgba(18,18,18,0.1)] [color:var(--color-icon-base-secondary)] hover:bg-[var(--color-background-base-tertiary)]"
            disabled={disabled}
            onClick={onClear}
            type="button"
          >
            <MudIcon name="Outlined/16/cross-small" size="sm" />
          </button>
        )}
        {loading && (
          <span
            aria-hidden="true"
            className="size-[var(--spacing-20)] shrink-0 animate-spin rounded-[var(--border-radius-full)] border-2 border-[var(--color-border-brand-default)] border-l-transparent"
            data-slot="numeric-input-spinner"
          />
        )}
        {showSuffix && (
          <span className={adornmentClassName} data-slot="numeric-input-suffix">
            {suffix}
          </span>
        )}
      </div>
      {assistiveText && (
        <div
          className={cn(
            "flex min-w-0 items-start gap-[var(--spacing-6)] [font-family:var(--app-font-family-sans)] [font-size:var(--text-body-sm-font-size)] [font-weight:var(--text-body-sm-font-weight)] [line-height:20px]",
            assistiveToneClassNames[resolvedTone],
          )}
          data-slot="numeric-input-assistive"
          id={assistiveId}
        >
          {assistiveToneIcons[resolvedTone] && (
            <MudIcon
              className="shrink-0"
              name={assistiveToneIcons[resolvedTone]}
              size="md"
            />
          )}
          <span className="min-w-0 flex-1 overflow-hidden text-ellipsis">
            {assistiveText}
          </span>
        </div>
      )}
    </div>
  );
}

export { NumericInput, numericInputControlVariants };
export type {
  NumericInputPreviewState,
  NumericInputProps,
  NumericInputSize,
  NumericInputTone,
};
