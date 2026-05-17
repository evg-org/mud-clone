"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

const switchVariants = cva(
  [
    "group peer inline-flex h-[28px] w-[48px] shrink-0 items-center overflow-hidden rounded-[var(--border-radius-full)] bg-[var(--color-background-base-tertiary-active)] outline-none transition-[background-color,box-shadow]",
    "data-[state=checked]:bg-[var(--color-background-brand-default)]",
    "focus-visible:shadow-[0_0_0_1px_var(--white-1000),0_0_0_3px_var(--blue-sky-500)] data-[preview-state=focus]:shadow-[0_0_0_1px_var(--white-1000),0_0_0_3px_var(--blue-sky-500)]",
    "disabled:cursor-not-allowed data-[disabled=true]:!bg-[var(--color-background-disabled-default)]",
  ],
);

type SwitchPreviewState = "default" | "focus";

type SwitchProps = Omit<
  React.ComponentProps<typeof SwitchPrimitive.Root>,
  "asChild"
> &
  VariantProps<typeof switchVariants> & {
    previewState?: SwitchPreviewState;
  };

function Switch({
  className,
  disabled,
  previewState = "default",
  ...props
}: SwitchProps) {
  return (
    <SwitchPrimitive.Root
      {...props}
      data-disabled={disabled ? true : undefined}
      data-preview-state={previewState === "focus" ? "focus" : undefined}
      data-slot="switch"
      disabled={disabled}
      className={cn(switchVariants(), className)}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "pointer-events-none block size-[var(--spacing-24)] rounded-[var(--border-radius-full)] bg-[var(--color-background-base-default)] shadow-[var(--drop-shadow-100)] ring-0 transition-transform data-[state=checked]:translate-x-[22px] data-[state=unchecked]:translate-x-[2px] group-data-[disabled=true]:shadow-none",
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch, switchVariants };
export type { SwitchPreviewState, SwitchProps };
