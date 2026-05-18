"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

type SegmentedControlSize = "desktop" | "mobile";
type SegmentedControlPreviewState = "default" | "focus" | "hover";

type SegmentedControlOption = {
  disabled?: boolean;
  label: React.ReactNode;
  leadingIcon?: React.ReactNode;
  value: string;
};

type SegmentedControlContextValue = {
  disabled?: boolean;
  equalWidth?: boolean;
  onValueChange: (value: string) => void;
  previewState: SegmentedControlPreviewState;
  size: SegmentedControlSize;
  value?: string;
};

const SegmentedControlContext =
  React.createContext<SegmentedControlContextValue | null>(null);

const segmentedControlVariants = cva(
  [
    "inline-flex max-w-full select-none items-center overflow-hidden rounded-[var(--border-radius-full)] bg-[var(--color-background-base-tertiary)]",
    "gap-[var(--spacing-6)] [font-family:var(--app-font-family-sans)]",
  ],
  {
    variants: {
      size: {
        desktop: "p-[var(--spacing-6)]",
        mobile: "w-[343px] p-[var(--spacing-4)]",
      },
    },
    defaultVariants: {
      size: "desktop",
    },
  },
);

const segmentedControlItemVariants = cva(
  [
    "relative inline-flex max-w-full shrink-0 items-center justify-center gap-[var(--spacing-6)] rounded-[var(--border-radius-full)] border-0 px-[var(--spacing-16)] py-0",
    "[font-family:var(--app-font-family-sans)] [font-size:var(--text-body-sm-500-font-size)] [font-weight:var(--text-body-sm-font-weight)] [letter-spacing:0] [line-height:var(--text-body-sm-500-line-height)]",
    "outline-none transition-[background-color,box-shadow,color] duration-150",
    "text-[var(--color-text-base-secondary)] hover:bg-[var(--color-background-base-tertiary-hover)]",
    "focus-visible:shadow-[0_0_0_2px_var(--white-1000),0_0_0_5px_var(--blue-sky-500)]",
    "data-[preview-state=hover]:bg-[var(--color-background-base-tertiary-hover)] data-[preview-state=focus]:shadow-[0_0_0_2px_var(--white-1000),0_0_0_5px_var(--blue-sky-500)]",
    "data-[selected=true]:bg-[var(--color-background-base-inverse-default)] data-[selected=true]:[color:var(--color-text-base-inverse-on-color)] data-[selected=true]:[font-weight:var(--text-body-sm-500-font-weight)]",
    "data-[selected=true]:hover:bg-[var(--color-background-base-inverse-default-hover)] data-[selected=true][data-preview-state=hover]:bg-[var(--color-background-base-inverse-default-hover)]",
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-transparent disabled:text-[var(--color-text-disabled-default)]",
    "disabled:data-[selected=true]:bg-[var(--color-background-disabled-default)] disabled:data-[selected=true]:text-[var(--color-text-disabled-on-disabled)]",
    "[&_[data-slot=segmented-control-icon]]:size-[var(--spacing-20)] [&_[data-slot=segmented-control-icon]]:shrink-0",
  ],
  {
    variants: {
      equalWidth: {
        false: "min-w-[68px]",
        true: "min-w-[68px] flex-1",
      },
      size: {
        desktop: "h-[40px]",
        mobile: "h-[44px]",
      },
    },
    defaultVariants: {
      equalWidth: false,
      size: "desktop",
    },
  },
);

type SegmentedControlItemProps = Omit<
  React.ComponentProps<"button">,
  "children" | "value"
> &
  VariantProps<typeof segmentedControlItemVariants> & {
    children?: React.ReactNode;
    label?: React.ReactNode;
    leadingIcon?: React.ReactNode;
    previewState?: SegmentedControlPreviewState;
    selected?: boolean;
    separator?: boolean;
    value: string;
  };

function SegmentedControlItem({
  children,
  className,
  disabled,
  equalWidth,
  label,
  leadingIcon,
  onClick,
  previewState,
  selected,
  separator = false,
  size,
  type = "button",
  value,
  ...props
}: SegmentedControlItemProps) {
  const context = React.useContext(SegmentedControlContext);
  const isDisabled = disabled || context?.disabled;
  const isSelected = selected ?? context?.value === value;
  const resolvedPreviewState =
    previewState ?? (isSelected ? context?.previewState : "default") ?? "default";
  const resolvedSize = size ?? context?.size ?? "desktop";
  const resolvedEqualWidth = equalWidth ?? context?.equalWidth ?? false;

  return (
    <button
      aria-pressed={isSelected}
      data-preview-state={
        resolvedPreviewState === "default" ? undefined : resolvedPreviewState
      }
      data-selected={isSelected ? true : undefined}
      data-slot="segmented-control-item"
      disabled={isDisabled}
      onClick={(event) => {
        onClick?.(event);

        if (!event.defaultPrevented && !isDisabled) {
          context?.onValueChange(value);
        }
      }}
      type={type}
      className={cn(
        segmentedControlItemVariants({
          equalWidth: resolvedEqualWidth,
          size: resolvedSize,
        }),
        className,
      )}
      {...props}
    >
      {leadingIcon ? (
        <span aria-hidden="true" data-slot="segmented-control-icon">
          {leadingIcon}
        </span>
      ) : null}
      <span className="min-w-0 overflow-hidden text-ellipsis whitespace-nowrap">
        {label ?? children}
      </span>
      {separator && !isSelected ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-[-3px] top-1/2 h-[16px] w-px -translate-y-1/2 bg-[var(--color-border-base-default)]"
          data-slot="segmented-control-separator"
        />
      ) : null}
    </button>
  );
}

type SegmentedControlProps = Omit<
  React.ComponentProps<"div">,
  "defaultValue" | "onChange"
> &
  VariantProps<typeof segmentedControlVariants> & {
    defaultValue?: string;
    disabled?: boolean;
    equalWidth?: boolean;
    items?: readonly SegmentedControlOption[];
    onValueChange?: (value: string) => void;
    previewState?: SegmentedControlPreviewState;
    value?: string;
  };

function SegmentedControl({
  children,
  className,
  defaultValue,
  disabled = false,
  equalWidth,
  items,
  onValueChange,
  previewState = "default",
  size = "desktop",
  value,
  ...props
}: SegmentedControlProps) {
  const firstEnabledValue = React.useMemo(
    () => items?.find((item) => !item.disabled)?.value,
    [items],
  );
  const [internalValue, setInternalValue] = React.useState(
    defaultValue ?? firstEnabledValue,
  );
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const handleValueChange = React.useCallback(
    (nextValue: string) => {
      if (nextValue === currentValue) {
        return;
      }

      if (!isControlled) {
        setInternalValue(nextValue);
      }

      onValueChange?.(nextValue);
    },
    [currentValue, isControlled, onValueChange],
  );

  const contextValue = React.useMemo<SegmentedControlContextValue>(
    () => ({
      disabled,
      equalWidth: equalWidth ?? size === "mobile",
      onValueChange: handleValueChange,
      previewState,
      size: size ?? "desktop",
      value: currentValue,
    }),
    [
      currentValue,
      disabled,
      equalWidth,
      handleValueChange,
      previewState,
      size,
    ],
  );

  return (
    <SegmentedControlContext.Provider value={contextValue}>
      <div
        data-disabled={disabled ? true : undefined}
        data-slot="segmented-control"
        className={cn(segmentedControlVariants({ size }), className)}
        role="group"
        {...props}
      >
        {items
          ? items.map((item, index) => {
              const nextItem = items[index + 1];
              const showSeparator =
                index < items.length - 1 &&
                item.value !== currentValue &&
                nextItem?.value !== currentValue;

              return (
                <SegmentedControlItem
                  disabled={item.disabled}
                  key={item.value}
                  label={item.label}
                  leadingIcon={item.leadingIcon}
                  separator={showSeparator}
                  value={item.value}
                />
              );
            })
          : children}
      </div>
    </SegmentedControlContext.Provider>
  );
}

export {
  SegmentedControl,
  SegmentedControlItem,
  segmentedControlItemVariants,
  segmentedControlVariants,
};
export type {
  SegmentedControlItemProps,
  SegmentedControlOption,
  SegmentedControlPreviewState,
  SegmentedControlProps,
  SegmentedControlSize,
};
