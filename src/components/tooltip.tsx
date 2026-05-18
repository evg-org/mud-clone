"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { MudIcon } from "./mud-icon";
import { cn } from "./utils";

const tooltipBubbleVariants = cva(
  [
    "relative flex flex-col gap-0 p-0 [color:var(--color-background-base-inverse-default)]",
  ],
  {
    variants: {
      size: {
        lg: "w-[240px] max-w-[300px]",
        sm: "w-max max-w-[220px]",
      },
    },
    defaultVariants: {
      size: "lg",
    },
  },
);

type TooltipAlign = "center" | "end" | "start";
type TooltipArrowPosition = "bottom" | "top";
type TooltipSide = "bottom" | "top";
type TooltipSize = NonNullable<
  VariantProps<typeof tooltipBubbleVariants>["size"]
>;

type TooltipBubbleProps = Omit<React.ComponentProps<"div">, "content"> &
  VariantProps<typeof tooltipBubbleVariants> & {
    align?: TooltipAlign;
    arrowPosition?: TooltipArrowPosition;
    closeButton?: boolean;
    closeLabel?: string;
    content?: React.ReactNode;
    onClose?: () => void;
    textAlign?: "center" | "start";
  };

type TooltipProps = Omit<React.ComponentProps<"span">, "content"> &
  Omit<TooltipBubbleProps, "onPointerEnter" | "onPointerLeave"> & {
    bubbleClassName?: string;
    content: React.ReactNode;
    defaultOpen?: boolean;
    delayDuration?: number;
    disabled?: boolean;
    forceMount?: boolean;
    onOpenChange?: (open: boolean) => void;
    open?: boolean;
    side?: TooltipSide;
    triggerClassName?: string;
  };

const arrowAlignClassNames: Record<TooltipAlign, string> = {
  center: "justify-center",
  end: "justify-end",
  start: "justify-start",
};

const contentAlignClassNames: Record<TooltipAlign, string> = {
  center: "left-1/2 -translate-x-1/2",
  end: "right-0",
  start: "left-0",
};

function TooltipArrow({
  align = "center",
  position = "bottom",
  size = "lg",
}: {
  align?: TooltipAlign;
  position?: TooltipArrowPosition;
  size?: TooltipSize;
}) {
  const arrowWidth = size === "sm" ? 21.3333 : 32;
  const arrowHeight = size === "sm" ? 8 : 12;
  const arrowViewBox = size === "sm" ? "0 0 21.3333 8" : "0 0 32 12";
  const arrowPath =
    size === "sm"
      ? "M0 0H21.3333C19.5301 0.0977558 17.9174 0.922051 16.7752 2.17325L12.3868 7.21527C11.4762 8.26158 9.85714 8.26158 8.94649 7.21527L4.55748 2.17247C3.41528 0.921705 1.80291 0.0977275 0 0Z"
      : "M0 0H32C29.2951 0.146634 26.8761 1.38308 25.1628 3.25987L18.5803 10.8229C17.2143 12.3924 14.7857 12.3924 13.4197 10.8229L6.83622 3.2587C5.12292 1.38256 2.70436 0.146591 0 0Z";

  return (
    <span
      aria-hidden="true"
      className={cn(
        "flex w-full shrink-0 px-[var(--spacing-12)]",
        size === "sm" ? "h-[8px]" : "h-[12px]",
        arrowAlignClassNames[align],
      )}
      data-slot="tooltip-arrow"
    >
      <svg
        className={cn(
          "block shrink-0 fill-current",
          position === "top" && "-scale-y-100",
        )}
        height={arrowHeight}
        preserveAspectRatio="none"
        viewBox={arrowViewBox}
        width={arrowWidth}
      >
        <path d={arrowPath} />
      </svg>
    </span>
  );
}

function TooltipCloseButton({
  closeLabel,
  onClose,
}: {
  closeLabel: string;
  onClose?: () => void;
}) {
  return (
    <span className="relative size-[var(--spacing-16)] shrink-0">
      <button
        aria-label={closeLabel}
        className="absolute left-1/2 top-1/2 inline-flex size-[32px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[var(--border-radius-4)] border-0 bg-transparent p-0 [color:var(--color-icon-base-inverse-default)] outline-none transition-[background-color,box-shadow] hover:bg-[var(--color-background-base-inverse-default-hover)] focus-visible:ring-[3px] focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background-base-inverse-default)]"
        onClick={onClose}
        type="button"
      >
        <MudIcon name="Outlined/16/cross-large" size="sm" />
      </button>
    </span>
  );
}

function TooltipBubble({
  align = "center",
  arrowPosition = "bottom",
  children,
  className,
  closeButton = false,
  closeLabel = "Close tooltip",
  content,
  onClose,
  role = "tooltip",
  size,
  style,
  textAlign,
  ...props
}: TooltipBubbleProps) {
  const resolvedSize = size ?? "lg";
  const resolvedTextAlign = textAlign ?? (align === "center" ? "center" : "start");
  const tooltipContent = content ?? children ?? "Tooltip";
  const arrow = (
    <TooltipArrow align={align} position={arrowPosition} size={resolvedSize} />
  );

  return (
    <div
      data-size={resolvedSize}
      data-slot="tooltip-bubble"
      role={role}
      className={cn(tooltipBubbleVariants({ size: resolvedSize }), className)}
      style={{
        filter:
          "drop-shadow(0 0 0.25px rgba(0, 0, 0, 0.18)) drop-shadow(0 3px 4px rgba(0, 0, 0, 0.08)) drop-shadow(0 1px 1.5px rgba(0, 0, 0, 0.08))",
        ...style,
      }}
      {...props}
    >
      {arrowPosition === "top" && arrow}
      <div
        className={cn(
          "flex w-full items-start overflow-hidden bg-[var(--color-background-base-inverse-default)] [color:var(--color-text-base-inverse-default)]",
          resolvedSize === "sm"
            ? "gap-0 rounded-[var(--border-radius-4)] px-[var(--spacing-12)] py-[var(--spacing-8)]"
            : closeButton
              ? "gap-[var(--spacing-12)] rounded-[var(--border-radius-6)] py-[var(--spacing-12)] pl-[var(--spacing-16)] pr-[var(--spacing-12)]"
              : "gap-0 rounded-[var(--border-radius-6)] px-[var(--spacing-16)] py-[var(--spacing-12)]",
        )}
        data-slot="tooltip-bubble-content"
      >
        <div
          className={cn(
            "min-w-0 flex-1 break-words [font-family:var(--app-font-family-sans)] [font-size:var(--text-body-sm-font-size)] [font-weight:var(--text-body-sm-font-weight)] [letter-spacing:0] [line-height:var(--text-body-sm-line-height)]",
            resolvedTextAlign === "center" ? "text-center" : "text-left",
          )}
        >
          {tooltipContent}
        </div>
        {closeButton && (
          <TooltipCloseButton closeLabel={closeLabel} onClose={onClose} />
        )}
      </div>
      {arrowPosition === "bottom" && arrow}
    </div>
  );
}

function mergeDescribedBy(
  existing: string | undefined,
  tooltipId: string | undefined,
) {
  return [existing, tooltipId].filter(Boolean).join(" ") || undefined;
}

function Tooltip({
  align = "center",
  arrowPosition,
  bubbleClassName,
  children,
  className,
  closeButton,
  closeLabel,
  content,
  defaultOpen = false,
  delayDuration = 200,
  disabled = false,
  forceMount = false,
  onClose,
  onOpenChange,
  onBlur,
  onFocus,
  onPointerEnter,
  onPointerLeave,
  open,
  side = "top",
  size,
  textAlign,
  triggerClassName,
  ...props
}: TooltipProps) {
  const generatedId = React.useId();
  const tooltipId = props.id ? `${props.id}-content` : generatedId;
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const timeoutRef = React.useRef<number>();
  const isControlled = open !== undefined;
  const isOpen = !disabled && (isControlled ? open : internalOpen);
  const resolvedArrowPosition =
    arrowPosition ?? (side === "top" ? "bottom" : "top");

  const setTooltipOpen = React.useCallback(
    (nextOpen: boolean) => {
      if (!isControlled) {
        setInternalOpen(nextOpen);
      }

      onOpenChange?.(nextOpen);
    },
    [isControlled, onOpenChange],
  );

  const clearOpenTimeout = React.useCallback(() => {
    if (timeoutRef.current !== undefined) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = undefined;
    }
  }, []);

  const showTooltip = React.useCallback(() => {
    clearOpenTimeout();

    if (delayDuration <= 0) {
      setTooltipOpen(true);
      return;
    }

    timeoutRef.current = window.setTimeout(() => {
      setTooltipOpen(true);
      timeoutRef.current = undefined;
    }, delayDuration);
  }, [clearOpenTimeout, delayDuration, setTooltipOpen]);

  const hideTooltip = React.useCallback(() => {
    clearOpenTimeout();
    setTooltipOpen(false);
  }, [clearOpenTimeout, setTooltipOpen]);

  React.useEffect(() => clearOpenTimeout, [clearOpenTimeout]);

  const trigger =
    React.isValidElement<{ "aria-describedby"?: string; className?: string }>(
      children,
    )
      ? React.cloneElement(children, {
          "aria-describedby": mergeDescribedBy(
            children.props["aria-describedby"],
            isOpen ? tooltipId : undefined,
          ),
          className: cn(children.props.className, triggerClassName),
        })
      : (
          <span
            aria-describedby={isOpen ? tooltipId : undefined}
            className={triggerClassName}
            tabIndex={0}
          >
            {children}
          </span>
        );

  return (
    <span
      data-open={isOpen ? true : undefined}
      data-slot="tooltip"
      className={cn("relative inline-flex w-fit", className)}
      onBlur={(event) => {
        onBlur?.(event);

        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          hideTooltip();
        }
      }}
      onFocus={(event) => {
        onFocus?.(event);
        showTooltip();
      }}
      onPointerEnter={(event) => {
        onPointerEnter?.(event);
        showTooltip();
      }}
      onPointerLeave={(event) => {
        onPointerLeave?.(event);
        hideTooltip();
      }}
      {...props}
    >
      {trigger}
      {(isOpen || forceMount) && (
        <TooltipBubble
          align={align}
          aria-hidden={!isOpen ? true : undefined}
          arrowPosition={resolvedArrowPosition}
          className={cn(
            "absolute z-[2000]",
            side === "top"
              ? "bottom-full mb-[var(--spacing-2)]"
              : "top-full mt-[var(--spacing-2)]",
            contentAlignClassNames[align],
            !isOpen && "pointer-events-none opacity-0",
            bubbleClassName,
          )}
          closeButton={closeButton}
          closeLabel={closeLabel}
          content={content}
          id={tooltipId}
          onClose={() => {
            onClose?.();
            hideTooltip();
          }}
          size={size}
          textAlign={textAlign}
        />
      )}
    </span>
  );
}

export { Tooltip, TooltipBubble, tooltipBubbleVariants };
export type {
  TooltipAlign,
  TooltipArrowPosition,
  TooltipBubbleProps,
  TooltipProps,
  TooltipSide,
  TooltipSize,
};
