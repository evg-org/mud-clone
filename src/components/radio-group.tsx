"use client";

import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cva, type VariantProps } from "class-variance-authority";

import { MudIcon } from "./mud-icon";
import { cn } from "./utils";

const radioGroupItemVariants = cva(
  [
    "group shrink-0 overflow-hidden rounded-[var(--border-radius-full)] border-2 bg-[var(--color-background-base-default)] outline-none transition-[box-shadow,background-color,border-color]",
    "border-[var(--color-border-base-secondary)] data-[state=checked]:border-[var(--color-border-brand-default)]",
    "focus-visible:shadow-[0_0_0_1px_var(--white-1000),0_0_0_3px_var(--blue-sky-500)] data-[preview-state=focus]:shadow-[0_0_0_1px_var(--white-1000),0_0_0_3px_var(--blue-sky-500)]",
    "aria-invalid:!border-[var(--color-border-danger-default)] aria-invalid:!bg-[var(--color-background-base-default)]",
    "disabled:pointer-events-none disabled:cursor-not-allowed data-[disabled=true]:!border-[var(--color-border-disabled-default)] data-[disabled=true]:!bg-[var(--color-background-disabled-default)]",
  ],
  {
    variants: {
      inputSize: {
        md: "size-[var(--spacing-24)]",
        sm: "size-[var(--spacing-20)]",
      },
    },
    defaultVariants: {
      inputSize: "md",
    },
  },
);

type RadioInputSize = NonNullable<
  VariantProps<typeof radioGroupItemVariants>["inputSize"]
>;
type RadioPreviewState = "default" | "focus";

type RadioGroupProps = React.ComponentProps<typeof RadioGroupPrimitive.Root>;

type RadioGroupItemProps = Omit<
  React.ComponentProps<typeof RadioGroupPrimitive.Item>,
  "asChild"
> &
  VariantProps<typeof radioGroupItemVariants> & {
    invalid?: boolean;
    previewState?: RadioPreviewState;
  };

function RadioGroup({
  className,
  ...props
}: RadioGroupProps) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn("grid gap-[var(--spacing-12)]", className)}
      {...props}
    />
  );
}

function RadioGroupItem({
  "aria-invalid": ariaInvalid,
  className,
  inputSize = "md",
  invalid = false,
  previewState = "default",
  ...props
}: RadioGroupItemProps) {
  const dotSize = inputSize === "sm" ? "size-[10px]" : "size-[var(--spacing-12)]";

  return (
    <RadioGroupPrimitive.Item
      {...props}
      aria-invalid={invalid ? true : ariaInvalid}
      data-disabled={props.disabled ? true : undefined}
      data-preview-state={previewState === "focus" ? "focus" : undefined}
      data-slot="radio-group-item"
      className={cn(radioGroupItemVariants({ inputSize }), className)}
    >
      <RadioGroupPrimitive.Indicator
        forceMount
        data-slot="radio-group-indicator"
        className="flex size-full items-center justify-center data-[state=unchecked]:hidden"
      >
        <span
          className={cn(
            "rounded-[var(--border-radius-full)] bg-[var(--color-background-brand-default)] group-data-[disabled=true]:bg-[var(--color-background-disabled-secondary)]",
            dotSize,
          )}
        />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
}

type RadioFieldProps = Omit<
  React.ComponentProps<"label">,
  "children" | "onChange"
> &
  Pick<
    RadioGroupItemProps,
    | "disabled"
    | "invalid"
    | "previewState"
    | "value"
  > & {
    errorMessage?: React.ReactNode;
    inputSize?: RadioInputSize;
    itemClassName?: string;
    label: React.ReactNode;
    supportingText?: React.ReactNode;
  };

function RadioField({
  className,
  disabled,
  errorMessage,
  inputSize = "md",
  invalid = false,
  itemClassName,
  label,
  previewState,
  supportingText,
  value,
  ...props
}: RadioFieldProps) {
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
      data-slot="radio-field"
      className={cn(
        "inline-flex min-w-0 gap-[var(--spacing-12)] p-0",
        hasSupportingText ? "items-start" : "items-center",
        disabled ? "cursor-not-allowed" : "cursor-pointer",
        className,
      )}
      {...props}
    >
      <RadioGroupItem
        className={itemClassName}
        disabled={disabled}
        inputSize={inputSize}
        invalid={hasError}
        previewState={previewState}
        value={value}
      />
      <span
        className={cn(
          "grid min-w-0 gap-[var(--spacing-2)]",
          hasError && "gap-[var(--spacing-6)]",
        )}
      >
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

export { RadioField, RadioGroup, RadioGroupItem, radioGroupItemVariants };
export type {
  RadioFieldProps,
  RadioGroupItemProps,
  RadioGroupProps,
  RadioInputSize,
  RadioPreviewState,
};
