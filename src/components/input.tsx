import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { MudIcon } from "./mud-icon";
import { cn } from "./utils";

const inputVariants = cva(
  [
    "box-border flex w-full min-w-0 rounded-[var(--border-radius-8)] border bg-[var(--color-background-base-default)] py-0",
    "[font-family:var(--app-font-family-sans)] [font-weight:var(--text-body-md-font-weight)] [letter-spacing:0] [color:var(--color-text-base-default)] outline-none",
    "transition-[color,box-shadow,border-color,background-color] placeholder:[color:var(--color-text-base-tertiary)]",
    "selection:bg-[var(--color-background-brand-default)] selection:[color:var(--color-text-base-inverse-on-color)]",
    "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:[color:var(--color-text-base-default)]",
    "hover:border-2 focus-visible:border-2 focus-visible:ring-[4px] focus-visible:ring-offset-0",
    "aria-invalid:border-[var(--color-border-danger-default)] aria-invalid:focus-visible:border-[var(--color-border-danger-default)] aria-invalid:focus-visible:ring-[var(--red-200)]",
    "read-only:border-transparent read-only:bg-[var(--color-background-base-secondary)]",
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:border-[var(--color-border-disabled-default)] disabled:bg-[var(--color-background-disabled-default)] disabled:[color:var(--color-text-disabled-on-disabled)] disabled:placeholder:[color:var(--color-text-disabled-on-disabled)]",
  ],
  {
    variants: {
      inputSize: {
        lg: "h-[48px] px-[var(--spacing-16)] [font-size:var(--text-body-md-font-size)] [line-height:24px]",
        md: "h-[40px] px-[var(--spacing-12)] [font-size:var(--text-body-sm-font-size)] [line-height:20px]",
      },
      tone: {
        default:
          "border-[var(--color-border-base-default)] hover:border-[var(--color-border-base-tertiary)] focus-visible:border-[var(--color-border-brand-default)] focus-visible:ring-[var(--blue-sky-200)]",
        destructive:
          "border-[var(--color-border-danger-default)] hover:border-[var(--color-border-danger-default)] focus-visible:border-[var(--color-border-danger-default)] focus-visible:ring-[var(--red-200)]",
        success:
          "border-[var(--color-border-positive-default)] hover:border-[var(--color-border-positive-default)] focus-visible:border-[var(--color-border-positive-default)] focus-visible:ring-[var(--green-200)]",
        warning:
          "border-[var(--color-border-warning-default)] hover:border-[var(--color-border-warning-default)] focus-visible:border-[var(--color-border-warning-default)] focus-visible:ring-[var(--apricot-200)]",
      },
    },
    defaultVariants: {
      inputSize: "lg",
      tone: "default",
    },
  },
);

const textInputControlVariants = cva(
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

type InputTone = NonNullable<VariantProps<typeof inputVariants>["tone"]>;
type InputSize = NonNullable<VariantProps<typeof inputVariants>["inputSize"]>;
type TextInputPreviewState = "default" | "filled" | "focus" | "hover" | "loading";

type InputProps = Omit<React.ComponentProps<"input">, "size"> &
  VariantProps<typeof inputVariants>;

type TextInputProps = Omit<React.ComponentProps<"input">, "size"> &
  VariantProps<typeof textInputControlVariants> & {
    assistiveText?: React.ReactNode;
    clearable?: boolean;
    label?: React.ReactNode;
    leadingIcon?: React.ReactNode;
    mandatory?: boolean;
    onClear?: () => void;
    previewState?: TextInputPreviewState;
    trailingIcon?: React.ReactNode;
  };

const assistiveToneIcons: Record<InputTone, string | undefined> = {
  default: undefined,
  destructive: "Filled/20/circle-error-filled",
  success: "Filled/20/circle-checkmark-filled",
  warning: "Filled/20/warning-filled",
};

const assistiveToneClassNames: Record<InputTone, string> = {
  default: "[color:var(--color-text-base-secondary)]",
  destructive: "[color:var(--color-text-danger-default)]",
  success: "[color:var(--color-text-positive-default)]",
  warning: "[color:var(--color-text-warning-default)]",
};

function resolveTone(
  tone: TextInputProps["tone"],
  ariaInvalid: React.ComponentProps<"input">["aria-invalid"],
) {
  return ariaInvalid ? "destructive" : tone ?? "default";
}

function Input({
  className,
  inputSize,
  tone,
  type,
  ...props
}: InputProps) {
  const resolvedTone = resolveTone(tone, props["aria-invalid"]);

  return (
    <input
      type={type}
      data-slot="input"
      data-tone={resolvedTone}
      data-size={inputSize ?? "lg"}
      className={cn(inputVariants({ inputSize, tone: resolvedTone }), className)}
      {...props}
    />
  );
}

function TextInput({
  "aria-describedby": ariaDescribedBy,
  "aria-invalid": ariaInvalid,
  assistiveText,
  className,
  clearable = false,
  disabled,
  id,
  inputSize,
  label = "Label",
  leadingIcon,
  mandatory = false,
  onClear,
  previewState = "default",
  readOnly,
  required,
  tone,
  trailingIcon,
  value,
  defaultValue,
  ...props
}: TextInputProps) {
  const generatedId = React.useId();
  const inputId = id ?? generatedId;
  const assistiveId = `${inputId}-assistive`;
  const resolvedTone = resolveTone(tone, ariaInvalid);
  const resolvedSize = inputSize ?? "lg";
  const hasValue =
    value !== undefined
      ? String(value).length > 0
      : defaultValue !== undefined && String(defaultValue).length > 0;
  const showClearButton = clearable && !disabled && !readOnly && (hasValue || onClear);
  const describedBy = [ariaDescribedBy, assistiveText ? assistiveId : undefined]
    .filter(Boolean)
    .join(" ") || undefined;

  return (
    <div
      data-slot="text-input"
      data-tone={resolvedTone}
      data-size={resolvedSize}
      className={cn(
        "grid w-full min-w-0 gap-[var(--spacing-8)]",
        className,
      )}
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
        data-slot="text-input-control"
        data-disabled={disabled ? true : undefined}
        data-preview-state={previewState === "default" || previewState === "filled" ? undefined : previewState}
        data-readonly={readOnly ? true : undefined}
        className={textInputControlVariants({
          inputSize: resolvedSize,
          tone: resolvedTone,
        })}
      >
        {leadingIcon && (
          <span
            data-slot="text-input-leading-icon"
            className={cn(
              "inline-flex shrink-0 items-center justify-center [color:var(--color-icon-base-secondary)] [&>[data-slot=mud-icon]]:size-full",
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
          )}
          defaultValue={defaultValue}
          disabled={disabled}
          id={inputId}
          readOnly={readOnly}
          required={required}
          value={value}
          {...props}
        />
        {previewState === "loading" && (
          <span
            aria-hidden="true"
            data-slot="text-input-spinner"
            className="size-[var(--spacing-20)] shrink-0 animate-spin rounded-[var(--border-radius-full)] border-2 border-[var(--color-border-brand-default)] border-l-transparent"
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
        {trailingIcon && (
          <span
            data-slot="text-input-trailing-icon"
            className={cn(
              "inline-flex shrink-0 items-center justify-center [color:var(--color-icon-base-default)] [&>[data-slot=mud-icon]]:size-full",
              resolvedSize === "md"
                ? "size-[var(--spacing-20)]"
                : "size-[var(--spacing-24)]",
            )}
          >
            {trailingIcon}
          </span>
        )}
      </div>
      {assistiveText && (
        <div
          className={cn(
            "flex min-w-0 items-start gap-[var(--spacing-4)] [font-family:var(--app-font-family-sans)] [font-size:var(--text-body-sm-font-size)] [font-weight:var(--text-body-sm-font-weight)] [line-height:20px]",
            assistiveToneClassNames[resolvedTone],
          )}
          data-slot="text-input-assistive"
          id={assistiveId}
        >
          {assistiveToneIcons[resolvedTone] && (
            <MudIcon
              className="mt-0 shrink-0"
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

export { Input, TextInput, inputVariants, textInputControlVariants };
export type { InputProps, InputSize, InputTone, TextInputPreviewState, TextInputProps };
