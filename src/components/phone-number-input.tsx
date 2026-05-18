import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { MudIcon } from "./mud-icon";
import { cn } from "./utils";

const phoneNumberInputControlVariants = cva(
  [
    "box-border flex w-full min-w-0 items-center gap-[var(--spacing-12)] overflow-hidden rounded-[var(--border-radius-8)] border bg-[var(--color-background-base-default)] py-0",
    "transition-[color,box-shadow,border-color,background-color]",
    "hover:border-2 focus-within:border-2 focus-within:ring-[4px] focus-within:ring-offset-0",
    "data-[preview-state=hover]:border-2 data-[preview-state=focus]:border-2 data-[preview-state=loading]:border-2",
    "data-[readonly=true]:border-transparent data-[readonly=true]:bg-[var(--color-background-base-secondary)]",
    "data-[disabled=true]:pointer-events-none data-[disabled=true]:cursor-not-allowed data-[disabled=true]:border-[var(--color-border-disabled-default)] data-[disabled=true]:bg-[var(--color-background-disabled-default)]",
  ],
  {
    variants: {
      inputSize: {
        lg: "h-[48px] pl-[var(--spacing-6)] pr-[var(--spacing-16)]",
        md: "h-[40px] pl-[var(--spacing-4)] pr-[var(--spacing-12)]",
      },
      tone: {
        default:
          "border-[var(--color-border-base-default)] hover:border-[var(--color-border-base-tertiary)] focus-within:border-[var(--color-border-brand-default)] focus-within:ring-[var(--blue-sky-200)] data-[preview-state=hover]:border-[var(--color-border-base-tertiary)] data-[preview-state=focus]:border-[var(--color-border-brand-default)] data-[preview-state=focus]:ring-[4px] data-[preview-state=focus]:ring-[var(--blue-sky-200)] data-[preview-state=loading]:border-[var(--color-border-brand-default)] data-[preview-state=loading]:ring-[4px] data-[preview-state=loading]:ring-[var(--blue-sky-200)]",
        destructive:
          "border-[var(--color-border-danger-default)] hover:border-[var(--color-border-danger-default)] focus-within:border-[var(--color-border-danger-default)] focus-within:ring-[var(--red-200)] data-[preview-state=hover]:border-[var(--color-border-danger-default)] data-[preview-state=focus]:border-[var(--color-border-danger-default)] data-[preview-state=focus]:ring-[4px] data-[preview-state=focus]:ring-[var(--red-200)] data-[preview-state=loading]:border-[var(--color-border-danger-default)] data-[preview-state=loading]:ring-[4px] data-[preview-state=loading]:ring-[var(--red-200)]",
        success:
          "border-[var(--color-border-positive-default)] hover:border-[var(--color-border-positive-default)] focus-within:border-[var(--color-border-positive-default)] focus-within:ring-[var(--green-200)] data-[preview-state=hover]:border-[var(--color-border-positive-default)] data-[preview-state=focus]:border-[var(--color-border-positive-default)] data-[preview-state=focus]:ring-[4px] data-[preview-state=focus]:ring-[var(--green-200)] data-[preview-state=loading]:border-[var(--color-border-positive-default)] data-[preview-state=loading]:ring-[4px] data-[preview-state=loading]:ring-[var(--green-200)]",
        warning:
          "border-[var(--color-border-warning-default)] hover:border-[var(--color-border-warning-default)] focus-within:border-[var(--color-border-warning-default)] focus-within:ring-[var(--apricot-200)] data-[preview-state=hover]:border-[var(--color-border-warning-default)] data-[preview-state=focus]:border-[var(--color-border-warning-default)] data-[preview-state=focus]:ring-[4px] data-[preview-state=focus]:ring-[var(--apricot-200)] data-[preview-state=loading]:border-[var(--color-border-warning-default)] data-[preview-state=loading]:ring-[4px] data-[preview-state=loading]:ring-[var(--apricot-200)]",
      },
    },
    defaultVariants: {
      inputSize: "lg",
      tone: "default",
    },
  },
);

type PhoneNumberInputTone = NonNullable<
  VariantProps<typeof phoneNumberInputControlVariants>["tone"]
>;
type PhoneNumberInputSize = NonNullable<
  VariantProps<typeof phoneNumberInputControlVariants>["inputSize"]
>;
type PhoneNumberInputPreviewState =
  | "default"
  | "filled"
  | "focus"
  | "hover"
  | "loading";

type PhoneNumberInputProps = Omit<React.ComponentProps<"input">, "size"> &
  VariantProps<typeof phoneNumberInputControlVariants> & {
    assistiveText?: React.ReactNode;
    clearable?: boolean;
    countryButtonLabel?: string;
    countryCode?: React.ReactNode;
    countryFlag?: React.ReactNode;
    countrySelectable?: boolean;
    inputClassName?: string;
    label?: React.ReactNode;
    loading?: boolean;
    mandatory?: boolean;
    onClear?: () => void;
    onCountryClick?: () => void;
    previewState?: PhoneNumberInputPreviewState;
  };

const assistiveToneIcons: Record<PhoneNumberInputTone, string | undefined> = {
  default: undefined,
  destructive: "Filled/20/circle-error-filled",
  success: "Filled/20/circle-checkmark-filled",
  warning: "Filled/20/warning-filled",
};

const assistiveToneClassNames: Record<PhoneNumberInputTone, string> = {
  default: "[color:var(--color-text-base-secondary)]",
  destructive: "[color:var(--color-text-danger-default)]",
  success: "[color:var(--color-text-positive-default)]",
  warning: "[color:var(--color-text-warning-default)]",
};

function resolvePhoneNumberInputTone(
  tone: PhoneNumberInputProps["tone"],
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

function PhoneNumberInput({
  "aria-describedby": ariaDescribedBy,
  "aria-invalid": ariaInvalid,
  assistiveText,
  autoComplete = "tel-national",
  className,
  clearable = false,
  countryButtonLabel = "Select country code",
  countryCode = "+373",
  countryFlag = "🇲🇩",
  countrySelectable = false,
  defaultValue,
  disabled,
  id,
  inputClassName,
  inputMode = "tel",
  inputSize,
  label = "Label",
  loading = false,
  mandatory = false,
  onClear,
  onCountryClick,
  placeholder = "XX  XXX  XXX",
  previewState = "default",
  readOnly,
  required,
  tone,
  type = "tel",
  value,
  ...props
}: PhoneNumberInputProps) {
  const generatedId = React.useId();
  const inputId = id ?? generatedId;
  const assistiveId = `${inputId}-assistive`;
  const resolvedTone = resolvePhoneNumberInputTone(tone, ariaInvalid);
  const resolvedSize = inputSize ?? "lg";
  const isLoading = loading || previewState === "loading";
  const resolvedPreviewState = isLoading ? "loading" : previewState;
  const showClearButton =
    clearable && !disabled && !readOnly && (hasDisplayValue(value, defaultValue) || onClear);
  const describedBy =
    [ariaDescribedBy, assistiveText ? assistiveId : undefined]
      .filter(Boolean)
      .join(" ") || undefined;
  const countryContent = (
    <>
      <span
        className={cn(
          "inline-flex shrink-0 items-center justify-center overflow-hidden text-ellipsis [font-family:var(--app-font-family-sans)] [font-weight:var(--font-weight-medium)] [letter-spacing:0] [line-height:1] [color:var(--color-text-base-default)]",
          resolvedSize === "md" ? "[font-size:22px]" : "[font-size:24px]",
          disabled && "opacity-40",
        )}
        data-slot="phone-number-input-country-flag"
      >
        {countryFlag}
      </span>
      <span
        className={cn(
          "inline-flex shrink-0 overflow-hidden text-ellipsis whitespace-nowrap [font-family:var(--app-font-family-sans)] [font-weight:var(--text-body-md-font-weight)] [letter-spacing:0] [color:var(--color-text-base-default)]",
          resolvedSize === "md"
            ? "[font-size:var(--text-body-sm-font-size)] [line-height:20px]"
            : "[font-size:var(--text-body-md-font-size)] [line-height:24px]",
          disabled && "[color:var(--color-text-disabled-on-disabled)]",
        )}
        data-slot="phone-number-input-country-code"
      >
        {countryCode}
      </span>
      {countrySelectable && (
        <MudIcon
          className={cn(
            "shrink-0 [color:var(--color-icon-base-default)]",
            disabled && "[color:var(--color-icon-disabled-on-disabled)]",
          )}
          name="Outlined/16/chevron-bottom"
          size="sm"
        />
      )}
    </>
  );
  const countryClassName = cn(
    "inline-flex shrink-0 items-center justify-center gap-[var(--spacing-4)] rounded-[var(--border-radius-4)] border-0 bg-[var(--color-background-base-secondary)] py-0",
    resolvedSize === "md" ? "h-[32px]" : "h-[36px]",
    countrySelectable ? "px-[var(--spacing-8)]" : "pl-[var(--spacing-8)] pr-[var(--spacing-12)]",
    disabled && "bg-[var(--color-background-disabled-default)]",
  );

  return (
    <div
      data-size={resolvedSize}
      data-slot="phone-number-input"
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
        data-slot="phone-number-input-control"
        className={phoneNumberInputControlVariants({
          inputSize: resolvedSize,
          tone: resolvedTone,
        })}
      >
        {countrySelectable || onCountryClick ? (
          <button
            aria-label={countryButtonLabel}
            className={countryClassName}
            disabled={disabled || readOnly}
            onClick={onCountryClick}
            type="button"
          >
            {countryContent}
          </button>
        ) : (
          <span
            className={countryClassName}
            data-slot="phone-number-input-country"
          >
            {countryContent}
          </span>
        )}
        <input
          aria-describedby={describedBy}
          aria-invalid={ariaInvalid}
          autoComplete={autoComplete}
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
          placeholder={placeholder}
          readOnly={readOnly}
          required={required}
          type={type}
          value={value}
          {...props}
        />
        {isLoading && (
          <span
            aria-hidden="true"
            className="size-[var(--spacing-20)] shrink-0 animate-spin rounded-[var(--border-radius-full)] border-2 border-[var(--color-border-brand-default)] border-l-transparent"
            data-slot="phone-number-input-spinner"
          />
        )}
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
      </div>
      {assistiveText && (
        <div
          className={cn(
            "flex min-w-0 items-start gap-[var(--spacing-4)] [font-family:var(--app-font-family-sans)] [font-size:var(--text-body-sm-font-size)] [font-weight:var(--text-body-sm-font-weight)] [line-height:20px]",
            assistiveToneClassNames[resolvedTone],
          )}
          data-slot="phone-number-input-assistive"
          id={assistiveId}
        >
          {assistiveToneIcons[resolvedTone] && (
            <MudIcon
              className="shrink-0"
              name={assistiveToneIcons[resolvedTone]}
              size="md"
            />
          )}
          <span className="min-w-0 flex-1 overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">
            {assistiveText}
          </span>
        </div>
      )}
    </div>
  );
}

export { PhoneNumberInput, phoneNumberInputControlVariants };
export type {
  PhoneNumberInputPreviewState,
  PhoneNumberInputProps,
  PhoneNumberInputSize,
  PhoneNumberInputTone,
};
