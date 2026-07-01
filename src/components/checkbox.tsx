"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { cva, type VariantProps } from "class-variance-authority";

import { MudIcon } from "./mud-icon";
import { cn } from "./utils";

const checkboxFocusShadow =
  "shadow-[0_0_0_1px_var(--white-1000),0_0_0_3px_var(--blue-sky-500)]";

const checkboxVariants = cva(
  [
    "peer shrink-0 overflow-hidden border-2 bg-[var(--color-background-base-default)] [color:var(--color-icon-base-inverse-on-color)] outline-none transition-[color,box-shadow,background-color,border-color]",
    "border-[var(--color-border-base-secondary)] data-[state=checked]:border-[var(--color-background-brand-default)] data-[state=checked]:bg-[var(--color-background-brand-default)] data-[state=indeterminate]:border-[var(--color-background-brand-default)] data-[state=indeterminate]:bg-[var(--color-background-brand-default)]",
    "focus-visible:shadow-[0_0_0_1px_var(--white-1000),0_0_0_3px_var(--blue-sky-500)] data-[preview-state=focus]:shadow-[0_0_0_1px_var(--white-1000),0_0_0_3px_var(--blue-sky-500)]",
    "aria-invalid:!border-[var(--color-border-danger-default)] aria-invalid:!bg-[var(--color-background-base-default)] aria-invalid:![color:var(--color-icon-danger-default)]",
    "disabled:pointer-events-none disabled:cursor-not-allowed data-[disabled=true]:!border-[var(--color-border-disabled-default)] data-[disabled=true]:!bg-[var(--color-background-disabled-default)] data-[disabled=true]:![color:var(--color-icon-disabled-default)]",
  ],
  {
    variants: {
      inputSize: {
        md: "size-[var(--spacing-24)] rounded-[var(--border-radius-6)]",
        sm: "size-[var(--spacing-20)] rounded-[var(--border-radius-6)]",
      },
    },
    defaultVariants: {
      inputSize: "md",
    },
  },
);

type CheckboxSize = NonNullable<VariantProps<typeof checkboxVariants>["inputSize"]>;
type CheckboxPreviewState = "default" | "focus";

type CheckboxProps = Omit<
  React.ComponentProps<typeof CheckboxPrimitive.Root>,
  "asChild"
> &
  VariantProps<typeof checkboxVariants> & {
    invalid?: boolean;
    previewState?: CheckboxPreviewState;
  };

function Checkbox({
  "aria-invalid": ariaInvalid,
  className,
  inputSize = "md",
  invalid = false,
  previewState = "default",
  ...props
}: CheckboxProps) {
  const iconSize = inputSize === "sm" ? "sm" : "md";
  const iconDimension = inputSize === "sm" ? "16" : "20";

  return (
    <CheckboxPrimitive.Root
      {...props}
      aria-invalid={invalid ? true : ariaInvalid}
      data-disabled={props.disabled ? true : undefined}
      data-preview-state={previewState === "focus" ? "focus" : undefined}
      data-slot="checkbox"
      className={cn(checkboxVariants({ inputSize }), className)}
    >
      <CheckboxPrimitive.Indicator
        forceMount
        data-slot="checkbox-indicator"
        className="group flex size-full items-center justify-center text-current data-[state=unchecked]:hidden"
      >
        <MudIcon
          className="group-data-[state=indeterminate]:hidden"
          name={`Outlined/${iconDimension}/checkmark-small`}
          size={iconSize}
        />
        <MudIcon
          className="hidden group-data-[state=indeterminate]:inline-flex"
          name={`Outlined/${iconDimension}/minus-small`}
          size={iconSize}
        />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

type CheckboxFieldProps = Omit<
  React.ComponentProps<"label">,
  "children" | "onChange"
> &
  Pick<
    CheckboxProps,
    | "checked"
    | "defaultChecked"
    | "disabled"
    | "invalid"
    | "name"
    | "onCheckedChange"
    | "previewState"
    | "required"
    | "value"
  > & {
    checkboxClassName?: string;
    errorMessage?: React.ReactNode;
    inputSize?: CheckboxSize;
    label: React.ReactNode;
    supportingText?: React.ReactNode;
  };

function CheckboxField({
  checked,
  checkboxClassName,
  className,
  defaultChecked,
  disabled,
  errorMessage,
  inputSize = "md",
  invalid = false,
  label,
  name,
  onCheckedChange,
  previewState,
  required,
  supportingText,
  value,
  ...props
}: CheckboxFieldProps) {
  const hasSupportingText = Boolean(supportingText);
  const hasError = Boolean(errorMessage) || invalid;
  const labelTextSize =
    inputSize === "sm"
      ? "[font-size:var(--text-body-sm-500-font-size)] [font-weight:var(--text-body-sm-500-font-weight)] [line-height:var(--text-body-sm-500-line-height)]"
      : "[font-size:var(--text-body-md-500-font-size)] [font-weight:var(--text-body-md-500-font-weight)] [line-height:var(--text-body-md-500-line-height)]";
  const supportingTextSize =
    inputSize === "sm"
      ? "[font-size:var(--text-caption-md-font-size)] [line-height:var(--text-caption-md-line-height)]"
      : "[font-size:var(--text-body-sm-font-size)] [line-height:var(--text-body-sm-line-height)]";

  return (
    <label
      data-disabled={disabled ? true : undefined}
      data-slot="checkbox-field"
      className={cn(
        "inline-flex min-w-0 gap-[var(--spacing-12)] p-0",
        hasSupportingText ? "items-start" : "items-center",
        disabled ? "cursor-not-allowed" : "cursor-pointer",
        className,
      )}
      {...props}
    >
      <Checkbox
        checked={checked}
        className={checkboxClassName}
        defaultChecked={defaultChecked}
        disabled={disabled}
        inputSize={inputSize}
        invalid={hasError}
        name={name}
        onCheckedChange={onCheckedChange}
        previewState={previewState}
        required={required}
        value={value}
      />
      <span className="grid min-w-0 gap-[var(--spacing-4)]">
        <span
          className={cn(
            "min-w-0 [font-family:var(--app-font-family-sans)] [color:var(--color-text-base-default)]",
            labelTextSize,
            disabled && "[color:var(--color-text-disabled-default)]",
          )}
        >
          {label}
        </span>
        {supportingText ? (
          <span
            className={cn(
              "max-w-[300px] [font-family:var(--app-font-family-sans)] [font-weight:var(--text-body-sm-font-weight)] [color:var(--color-text-base-tertiary)]",
              supportingTextSize,
              disabled && "[color:var(--color-text-disabled-default)]",
            )}
          >
            {supportingText}
          </span>
        ) : null}
        {errorMessage ? (
          <span className="inline-flex min-w-0 items-center gap-[var(--spacing-4)] [font-size:var(--text-caption-md-font-size)] [line-height:var(--text-caption-md-line-height)] [color:var(--color-text-danger-default)]">
            <MudIcon name="Filled/16/circle-error-filled" size="sm" />
            <span>{errorMessage}</span>
          </span>
        ) : null}
      </span>
    </label>
  );
}

export { Checkbox, CheckboxField, checkboxFocusShadow, checkboxVariants };
export type { CheckboxFieldProps, CheckboxPreviewState, CheckboxProps, CheckboxSize };
