"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { cva, type VariantProps } from "class-variance-authority";

import { MudIcon } from "./mud-icon";
import { cn } from "./utils";

const selectTriggerVariants = cva(
  [
    "box-border flex w-full min-w-0 cursor-pointer items-center justify-between gap-[var(--spacing-8)] whitespace-nowrap rounded-[var(--border-radius-8)] border bg-[var(--color-background-base-default)] py-0 outline-none",
    "[font-family:var(--app-font-family-sans)] [font-weight:var(--text-body-md-font-weight)] [letter-spacing:0] [color:var(--color-text-base-default)]",
    "transition-[color,box-shadow,background-color,border-color]",
    "hover:border-2 focus-visible:border-2 focus-visible:ring-[4px] focus-visible:ring-offset-0 data-[state=open]:border-2 data-[state=open]:ring-[4px] data-[state=open]:ring-offset-0 data-[preview-state=hover]:border-2 data-[preview-state=focus]:border-2 data-[preview-state=focus]:ring-[4px]",
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:border-[var(--color-border-disabled-default)] disabled:bg-[var(--color-background-disabled-default)] disabled:[color:var(--color-text-disabled-on-disabled)] disabled:opacity-100 disabled:[&_[data-slot=mud-icon]]:[color:var(--color-icon-disabled-on-disabled)]",
    "data-[placeholder]:[color:var(--color-text-base-tertiary)] disabled:data-[placeholder]:[color:var(--color-text-disabled-on-disabled)]",
    "*:data-[slot=select-value]:min-w-0 *:data-[slot=select-value]:overflow-hidden *:data-[slot=select-value]:text-ellipsis *:data-[slot=select-value]:whitespace-nowrap *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-[var(--spacing-8)] *:data-[slot=mud-icon]:pointer-events-none *:data-[slot=mud-icon]:shrink-0 *:data-[slot=mud-icon]:transition-transform [&[data-state=open]_[data-slot=mud-icon]]:rotate-180",
  ],
  {
    variants: {
      size: {
        default:
          "h-[var(--app-control-height-lg)] px-[var(--spacing-16)] [font-size:var(--text-body-md-font-size)] [line-height:24px]",
        lg: "h-[var(--app-control-height-lg)] px-[var(--spacing-16)] [font-size:var(--text-body-md-font-size)] [line-height:24px]",
        md: "h-[var(--app-control-height-md)] px-[var(--spacing-12)] [font-size:var(--text-body-sm-font-size)] [line-height:20px]",
        sm: "h-[var(--app-control-height-md)] px-[var(--spacing-12)] [font-size:var(--text-body-sm-font-size)] [line-height:20px]",
      },
      tone: {
        default:
          "border-[var(--color-border-base-default)] hover:border-[var(--color-border-base-tertiary)] focus-visible:border-[var(--color-border-brand-default)] focus-visible:ring-[var(--blue-sky-200)] data-[state=open]:border-[var(--color-border-brand-default)] data-[state=open]:ring-[var(--blue-sky-200)] data-[preview-state=hover]:border-[var(--color-border-base-tertiary)] data-[preview-state=focus]:border-[var(--color-border-brand-default)] data-[preview-state=focus]:ring-[var(--blue-sky-200)]",
        destructive:
          "border-[var(--color-border-danger-default)] hover:border-[var(--color-border-danger-default)] focus-visible:border-[var(--color-border-danger-default)] focus-visible:ring-[var(--red-200)] data-[state=open]:border-[var(--color-border-danger-default)] data-[state=open]:ring-[var(--red-200)] data-[preview-state=hover]:border-[var(--color-border-danger-default)] data-[preview-state=focus]:border-[var(--color-border-danger-default)] data-[preview-state=focus]:ring-[var(--red-200)]",
      },
    },
    defaultVariants: {
      size: "default",
      tone: "default",
    },
  },
);

type SelectTone = NonNullable<VariantProps<typeof selectTriggerVariants>["tone"]>;
type SelectSize = NonNullable<VariantProps<typeof selectTriggerVariants>["size"]>;
type SelectPreviewState = "default" | "filled" | "focus" | "hover";

function Select({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />;
}

function SelectGroup({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />;
}

function SelectValue({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />;
}

function SelectTrigger({
  className,
  size = "default",
  previewState = "default",
  tone,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
  previewState?: SelectPreviewState;
  size?: SelectSize;
  tone?: SelectTone;
}) {
  const resolvedTone = props["aria-invalid"] ? "destructive" : tone ?? "default";
  const iconIsMedium = size === "md" || size === "sm";

  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      data-tone={resolvedTone}
      data-preview-state={previewState === "default" || previewState === "filled" ? undefined : previewState}
      className={cn(selectTriggerVariants({ size, tone: resolvedTone }), className)}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <MudIcon
          className="[color:var(--color-icon-base-secondary)]"
          name={iconIsMedium ? "Outlined/20/chevron-bottom" : "Outlined/24/chevron-bottom"}
          size={iconIsMedium ? "md" : "lg"}
        />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

function SelectContent({
  className,
  children,
  position = "popper",
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        className={cn(
          "relative z-[2000] box-border max-h-[300px] w-[var(--radix-select-trigger-width)] min-w-[var(--radix-select-trigger-width)] origin-(--radix-select-content-transform-origin) overflow-hidden rounded-[var(--border-radius-16)] border-0 bg-[var(--color-background-base-default)] p-0 [color:var(--color-text-base-default)] shadow-[var(--drop-shadow-300)] outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          position === "popper" &&
            "data-[side=bottom]:translate-y-[var(--spacing-8)] data-[side=left]:-translate-x-[var(--spacing-8)] data-[side=right]:translate-x-[var(--spacing-8)] data-[side=top]:-translate-y-[var(--spacing-8)]",
          className,
        )}
        position={position}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(
            "flex flex-col gap-[var(--spacing-4)] overflow-y-auto p-[var(--spacing-8)]",
            position === "popper" &&
              "w-full scroll-my-[var(--spacing-4)]",
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn(
        "px-[var(--spacing-8)] py-[var(--spacing-6)] [font-size:var(--text-caption-md-font-size)] [line-height:var(--text-caption-md-line-height)] [color:var(--color-text-base-tertiary)]",
        className,
      )}
      {...props}
    />
  );
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "relative flex min-h-[44px] w-full shrink-0 cursor-pointer select-none items-center gap-[var(--spacing-12)] overflow-hidden rounded-[var(--border-radius-8)] py-[var(--spacing-12)] pl-[var(--spacing-16)] pr-[44px] [font-family:var(--app-font-family-sans)] [font-size:var(--text-body-sm-500-font-size)] [font-weight:var(--text-body-sm-500-font-weight)] [line-height:var(--text-body-sm-500-line-height)] [letter-spacing:var(--text-body-sm-500-letter-spacing)] [color:var(--color-text-base-secondary)] outline-none",
        "focus:bg-[var(--color-background-base-default-hover)] focus-visible:shadow-[inset_0_0_0_2px_var(--blue-sky-500)] data-[highlighted]:bg-[var(--color-background-base-default-hover)] data-[highlighted]:[color:var(--color-text-base-secondary)] data-[state=checked]:bg-[var(--color-background-base-secondary)] data-[state=checked]:[color:var(--color-text-brand-default)] data-[state=checked]:focus:[color:var(--color-text-brand-default)] data-[state=checked]:data-[highlighted]:[color:var(--color-text-brand-default)]",
        "data-[disabled]:pointer-events-none data-[disabled]:cursor-not-allowed data-[disabled]:[color:var(--color-text-disabled-default)] *:data-[slot=mud-icon]:pointer-events-none *:data-[slot=mud-icon]:shrink-0",
        className,
      )}
      {...props}
    >
      <SelectPrimitive.ItemIndicator asChild>
        <span className="absolute right-[var(--spacing-12)] top-1/2 flex size-[var(--spacing-24)] -translate-y-1/2 items-center justify-center [color:var(--color-text-brand-default)]">
          <MudIcon name="Outlined/24/checkmark-small" size="lg" />
        </span>
      </SelectPrimitive.ItemIndicator>
      <span
        className="line-clamp-2 min-w-0 flex-1 break-words"
        data-slot="select-item-text"
      >
        <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      </span>
    </SelectPrimitive.Item>
  );
}

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn(
        "pointer-events-none my-[var(--spacing-2)] h-px bg-[var(--color-border-base-default)]",
        className,
      )}
      {...props}
    />
  );
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className,
      )}
      {...props}
    >
      <MudIcon name="Outlined/20/chevron-top" size="sm" />
    </SelectPrimitive.ScrollUpButton>
  );
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className,
      )}
      {...props}
    >
      <MudIcon name="Outlined/16/chevron-bottom" size="sm" />
    </SelectPrimitive.ScrollDownButton>
  );
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  selectTriggerVariants,
};
export type { SelectPreviewState, SelectSize, SelectTone };
