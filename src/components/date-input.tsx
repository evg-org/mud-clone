import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { MudIcon } from "./mud-icon";
import { cn } from "./utils";

const dateInputControlVariants = cva(
  [
    "box-border flex w-full min-w-0 items-center gap-[var(--spacing-8)] overflow-hidden rounded-[var(--border-radius-8)] border bg-[var(--color-background-base-default)] py-0",
    "transition-[color,box-shadow,border-color,background-color]",
    "hover:border-2 focus-within:border-2 focus-within:ring-[4px] focus-within:ring-offset-0",
    "data-[preview-state=hover]:border-2 data-[preview-state=focus]:border-2",
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
          "border-[var(--color-border-base-default)] hover:border-[var(--color-border-base-tertiary)] focus-within:border-[var(--color-border-brand-default)] focus-within:ring-[var(--blue-sky-200)] data-[preview-state=hover]:border-[var(--color-border-base-tertiary)] data-[preview-state=focus]:border-[var(--color-border-brand-default)] data-[preview-state=focus]:ring-[4px] data-[preview-state=focus]:ring-[var(--blue-sky-200)]",
        destructive:
          "border-[var(--color-border-danger-default)] hover:border-[var(--color-border-danger-default)] focus-within:border-[var(--color-border-danger-default)] focus-within:ring-[var(--red-200)] data-[preview-state=hover]:border-[var(--color-border-danger-default)] data-[preview-state=focus]:border-[var(--color-border-danger-default)] data-[preview-state=focus]:ring-[4px] data-[preview-state=focus]:ring-[var(--red-200)]",
      },
    },
    defaultVariants: {
      inputSize: "lg",
      tone: "default",
    },
  },
);

type DateInputTone = NonNullable<
  VariantProps<typeof dateInputControlVariants>["tone"]
>;
type DateInputSize = NonNullable<
  VariantProps<typeof dateInputControlVariants>["inputSize"]
>;
type DateInputPreviewState = "default" | "filled" | "focus" | "hover";

type DateInputProps = Omit<React.ComponentProps<"input">, "size"> &
  VariantProps<typeof dateInputControlVariants> & {
    assistiveText?: React.ReactNode;
    calendarButtonLabel?: string;
    clearable?: boolean;
    inputClassName?: string;
    label?: React.ReactNode;
    mandatory?: boolean;
    onCalendarClick?: () => void;
    onClear?: () => void;
    previewState?: DateInputPreviewState;
    showCalendarIcon?: boolean;
    trailingIcon?: React.ReactNode;
  };

const assistiveToneIcons: Record<DateInputTone, string | undefined> = {
  default: undefined,
  destructive: "Filled/20/circle-error-filled",
};

const assistiveToneClassNames: Record<DateInputTone, string> = {
  default: "[color:var(--color-text-base-secondary)]",
  destructive: "[color:var(--color-text-danger-default)]",
};

function resolveDateInputTone(
  tone: DateInputProps["tone"],
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

function DateInput({
  "aria-describedby": ariaDescribedBy,
  "aria-invalid": ariaInvalid,
  assistiveText,
  calendarButtonLabel = "Open calendar",
  className,
  clearable = false,
  defaultValue,
  disabled,
  id,
  inputClassName,
  inputMode = "numeric",
  inputSize,
  label = "Label",
  mandatory = false,
  onCalendarClick,
  onClear,
  placeholder = "DD/MM/YYYY",
  previewState = "default",
  readOnly,
  required,
  showCalendarIcon = true,
  tone,
  trailingIcon,
  type = "text",
  value,
  ...props
}: DateInputProps) {
  const generatedId = React.useId();
  const inputId = id ?? generatedId;
  const assistiveId = `${inputId}-assistive`;
  const resolvedTone = resolveDateInputTone(tone, ariaInvalid);
  const resolvedSize = inputSize ?? "lg";
  const showClearButton =
    clearable && !disabled && !readOnly && (hasDisplayValue(value, defaultValue) || onClear);
  const describedBy =
    [ariaDescribedBy, assistiveText ? assistiveId : undefined]
      .filter(Boolean)
      .join(" ") || undefined;
  const calendarIcon = trailingIcon ?? (
    <MudIcon
      name={resolvedSize === "md" ? "Outlined/20/calendar" : "Outlined/24/calendar"}
      size={resolvedSize === "md" ? "md" : "lg"}
    />
  );
  const iconClassName = cn(
    "inline-flex shrink-0 items-center justify-center [color:var(--color-icon-base-default)] [&>[data-slot=mud-icon]]:size-full",
    disabled && "[color:var(--color-icon-disabled-on-disabled)]",
    resolvedSize === "md" ? "size-[var(--spacing-20)]" : "size-[var(--spacing-24)]",
  );

  return (
    <div
      data-size={resolvedSize}
      data-slot="date-input"
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
          previewState === "default" || previewState === "filled"
            ? undefined
            : previewState
        }
        data-readonly={readOnly ? true : undefined}
        data-slot="date-input-control"
        className={dateInputControlVariants({
          inputSize: resolvedSize,
          tone: resolvedTone,
        })}
      >
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
          placeholder={placeholder}
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
        {showCalendarIcon && onCalendarClick ? (
          <button
            aria-label={calendarButtonLabel}
            className={iconClassName}
            disabled={disabled || readOnly}
            onClick={onCalendarClick}
            type="button"
          >
            {calendarIcon}
          </button>
        ) : showCalendarIcon ? (
          <span
            aria-hidden="true"
            className={iconClassName}
            data-slot="date-input-calendar-icon"
          >
            {calendarIcon}
          </span>
        ) : null}
      </div>
      {assistiveText && (
        <div
          className={cn(
            "flex min-w-0 items-start gap-[var(--spacing-4)] [font-family:var(--app-font-family-sans)] [font-size:var(--text-body-sm-font-size)] [font-weight:var(--text-body-sm-font-weight)] [line-height:20px]",
            assistiveToneClassNames[resolvedTone],
          )}
          data-slot="date-input-assistive"
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

export { DateInput, dateInputControlVariants };
export type {
  DateInputPreviewState,
  DateInputProps,
  DateInputSize,
  DateInputTone,
};
