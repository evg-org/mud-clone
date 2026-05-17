"use client";

import * as React from "react";

import { MudIcon } from "./mud-icon";
import { cn } from "./utils";

type AccordionType = "single" | "multiple";
type AccordionValue = string | string[];

type AccordionProps = Omit<
  React.ComponentProps<"div">,
  "defaultValue" | "onChange"
> & {
  collapsible?: boolean;
  defaultValue?: AccordionValue;
  onValueChange?: (value: AccordionValue) => void;
  type?: AccordionType;
  value?: AccordionValue;
};

type AccordionItemProps = React.ComponentProps<"div"> & {
  disabled?: boolean;
  value: string;
};

type AccordionTriggerProps = Omit<
  React.ComponentProps<"button">,
  "children"
> & {
  children?: React.ReactNode;
  heading?: React.ReactNode;
  headingClassName?: string;
  hideIcon?: boolean;
  iconClassName?: string;
  supportingText?: React.ReactNode;
  supportingTextClassName?: string;
};

type AccordionContentProps = React.ComponentProps<"div"> & {
  forceMount?: boolean;
};

type AccordionContextValue = {
  collapsible: boolean;
  isItemOpen: (value: string) => boolean;
  toggleItem: (value: string) => void;
  type: AccordionType;
};

type AccordionItemContextValue = {
  contentId: string;
  disabled: boolean;
  open: boolean;
  toggle: () => void;
  triggerId: string;
  value: string;
};

const AccordionContext = React.createContext<AccordionContextValue | null>(null);
const AccordionItemContext =
  React.createContext<AccordionItemContextValue | null>(null);

function normalizeAccordionValue(
  value: AccordionValue | undefined,
): string[] {
  if (value === undefined || value === "") {
    return [];
  }

  return Array.isArray(value) ? value : [value];
}

function toAccordionValue(values: string[], type: AccordionType): AccordionValue {
  return type === "multiple" ? values : values[0] ?? "";
}

function useAccordionContext(component: string) {
  const context = React.useContext(AccordionContext);

  if (!context) {
    throw new Error(`${component} must be used within Accordion.`);
  }

  return context;
}

function useAccordionItemContext(component: string) {
  const context = React.useContext(AccordionItemContext);

  if (!context) {
    throw new Error(`${component} must be used within AccordionItem.`);
  }

  return context;
}

function Accordion({
  className,
  collapsible = true,
  defaultValue,
  onValueChange,
  type = "single",
  value,
  ...props
}: AccordionProps) {
  const isControlled = value !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = React.useState(() =>
    normalizeAccordionValue(defaultValue),
  );
  const openValues = isControlled
    ? normalizeAccordionValue(value)
    : uncontrolledValue;

  const setOpenValues = React.useCallback(
    (nextValues: string[]) => {
      if (!isControlled) {
        setUncontrolledValue(nextValues);
      }

      onValueChange?.(toAccordionValue(nextValues, type));
    },
    [isControlled, onValueChange, type],
  );

  const context = React.useMemo<AccordionContextValue>(
    () => ({
      collapsible,
      isItemOpen: (itemValue) => openValues.includes(itemValue),
      toggleItem: (itemValue) => {
        const isOpen = openValues.includes(itemValue);

        if (type === "multiple") {
          setOpenValues(
            isOpen
              ? openValues.filter((openValue) => openValue !== itemValue)
              : [...openValues, itemValue],
          );
          return;
        }

        if (isOpen && !collapsible) {
          return;
        }

        setOpenValues(isOpen ? [] : [itemValue]);
      },
      type,
    }),
    [collapsible, openValues, setOpenValues, type],
  );

  return (
    <AccordionContext.Provider value={context}>
      <div
        data-slot="accordion"
        data-type={type}
        className={cn(
          "flex w-full flex-col items-start gap-0",
          className,
        )}
        {...props}
      />
    </AccordionContext.Provider>
  );
}

function AccordionItem({
  className,
  disabled = false,
  value,
  ...props
}: AccordionItemProps) {
  const accordion = useAccordionContext("AccordionItem");
  const reactId = React.useId();
  const open = accordion.isItemOpen(value);
  const triggerId = `accordion-trigger-${reactId}`;
  const contentId = `accordion-content-${reactId}`;

  const itemContext = React.useMemo<AccordionItemContextValue>(
    () => ({
      contentId,
      disabled,
      open,
      toggle: () => accordion.toggleItem(value),
      triggerId,
      value,
    }),
    [accordion, contentId, disabled, open, triggerId, value],
  );

  return (
    <AccordionItemContext.Provider value={itemContext}>
      <div
        data-disabled={disabled ? true : undefined}
        data-slot="accordion-item"
        data-state={open ? "open" : "closed"}
        className={cn(
          "w-full overflow-hidden border-t border-[var(--color-border-base-default)] last:border-b",
          className,
        )}
        {...props}
      />
    </AccordionItemContext.Provider>
  );
}

function AccordionTrigger({
  children,
  className,
  disabled,
  heading,
  headingClassName,
  hideIcon = false,
  iconClassName,
  onClick,
  supportingText,
  supportingTextClassName,
  type = "button",
  ...props
}: AccordionTriggerProps) {
  const item = useAccordionItemContext("AccordionTrigger");
  const isDisabled = disabled || item.disabled;
  const headingContent = heading ?? children;
  const iconName = item.open
    ? "Outlined/20/minus-small"
    : "Outlined/20/plus-small";

  return (
    <button
      aria-controls={item.contentId}
      aria-expanded={item.open}
      data-slot="accordion-trigger"
      data-state={item.open ? "open" : "closed"}
      disabled={isDisabled}
      id={item.triggerId}
      onClick={(event) => {
        onClick?.(event);

        if (!event.defaultPrevented) {
          item.toggle();
        }
      }}
      type={type}
      className={cn(
        "group flex w-full cursor-pointer items-center gap-[var(--spacing-12)] bg-[var(--color-background-base-default)] px-0 py-[var(--spacing-24)] text-left [font-family:var(--app-font-family-sans)] transition-colors",
        "hover:bg-[var(--color-background-base-default-hover)] focus-visible:z-10 focus-visible:outline-none focus-visible:ring-[var(--app-control-focus-ring-width)] focus-visible:ring-[var(--app-control-focus-ring-color)] focus-visible:ring-offset-[var(--app-control-focus-ring-offset-width)] focus-visible:ring-offset-[var(--app-control-focus-ring-offset-color)]",
        "disabled:cursor-not-allowed disabled:[color:var(--color-text-disabled-default)] md:py-[var(--spacing-32)]",
        className,
      )}
      {...props}
    >
      <span className="flex min-w-0 flex-1 flex-col items-start justify-center gap-[var(--spacing-8)] [word-break:break-word]">
        <span
          data-slot="accordion-trigger-heading"
          className={cn(
            "m-0 w-full min-w-0 [font-size:22px] [font-weight:var(--font-weight-semibold)] [letter-spacing:0] [line-height:30px] [color:var(--color-text-base-default)] md:[font-size:24px] md:[line-height:32px]",
            item.open && "[color:var(--color-text-brand-default)]",
            isDisabled && "![color:var(--color-text-disabled-default)]",
            headingClassName,
          )}
        >
          {headingContent}
        </span>
        {supportingText !== undefined && (
          <span
            data-slot="accordion-trigger-supporting-text"
            className={cn(
              "block w-full min-w-0 truncate [font-size:16px] [font-weight:var(--font-weight-regular)] [letter-spacing:0] [line-height:24px] [color:var(--color-text-base-tertiary)]",
              isDisabled && "![color:var(--color-text-disabled-default)]",
              supportingTextClassName,
            )}
          >
            {supportingText}
          </span>
        )}
      </span>
      {!hideIcon && (
        <span
          aria-hidden="true"
          data-slot="accordion-trigger-icon"
          className={cn(
            "flex size-[48px] shrink-0 items-center justify-center rounded-[var(--border-radius-full)] [color:var(--color-icon-base-default)] transition-colors group-hover:bg-[var(--color-background-base-tertiary)] group-active:bg-[var(--color-background-base-tertiary-active)]",
            isDisabled && "![color:var(--color-text-disabled-default)]",
            iconClassName,
          )}
        >
          <MudIcon name={iconName} size="md" />
        </span>
      )}
    </button>
  );
}

function AccordionContent({
  children,
  className,
  forceMount = false,
  role,
  ...props
}: AccordionContentProps) {
  const item = useAccordionItemContext("AccordionContent");

  if (!forceMount && !item.open) {
    return null;
  }

  return (
    <div
      aria-labelledby={item.triggerId}
      data-slot="accordion-content"
      data-state={item.open ? "open" : "closed"}
      hidden={!item.open}
      id={item.contentId}
      role={role ?? "region"}
      className={cn(
        "w-full bg-[var(--color-background-base-default)] pb-[var(--spacing-12)]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
};
export type {
  AccordionContentProps,
  AccordionItemProps,
  AccordionProps,
  AccordionTriggerProps,
  AccordionType,
  AccordionValue,
};
