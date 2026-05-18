"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

type TabsSize = "desktop" | "md" | "mobile" | "sm";
type NormalizedTabsSize = "md" | "sm";
type TabsPreviewState = "focus";

const TabsSizeContext = React.createContext<NormalizedTabsSize>("md");

const tabsListVariants = cva(
  [
    "inline-flex max-w-full items-start border-b-[length:var(--border-width-1)] border-solid border-[var(--color-border-base-default)]",
    "bg-[var(--color-background-base-default)] [color:var(--color-text-base-secondary)]",
  ],
  {
    variants: {
      size: {
        md: "",
        sm: "",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

const tabsTriggerVariants = cva(
  [
    "relative z-0 inline-flex min-w-0 shrink-0 items-center justify-center gap-[var(--spacing-8)] overflow-hidden whitespace-nowrap",
    "border-x-0 border-t-0 border-b-[length:var(--border-width-2)] border-solid border-transparent bg-transparent",
    "[font-family:var(--app-font-family-sans)] [letter-spacing:0] [color:var(--color-text-base-secondary)]",
    "outline-none transition-[border-color,box-shadow,color] duration-150",
    "data-[state=active]:border-[var(--color-border-brand-default)] data-[state=active]:[color:var(--color-text-brand-default)]",
    "focus-visible:z-10 focus-visible:shadow-[0_0_0_2px_var(--white-1000),0_0_0_5px_var(--blue-sky-500)]",
    "data-[preview-state=focus]:z-10 data-[preview-state=focus]:shadow-[0_0_0_2px_var(--white-1000),0_0_0_5px_var(--blue-sky-500)]",
    "disabled:pointer-events-none disabled:[color:var(--color-text-disabled-default)] disabled:data-[state=active]:border-[var(--color-border-disabled-default)]",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-[var(--spacing-20)]",
    "[&_[data-slot=mud-icon]]:pointer-events-none [&_[data-slot=mud-icon]]:size-[var(--spacing-20)] [&_[data-slot=mud-icon]]:shrink-0",
  ],
  {
    variants: {
      size: {
        md: [
          "h-[48px] px-[var(--spacing-16)] py-0",
          "[font-size:var(--text-body-md-font-size)] [font-weight:var(--text-body-md-font-weight)] [line-height:var(--text-body-md-line-height)]",
          "data-[state=active]:[font-weight:var(--text-body-md-500-font-weight)]",
        ],
        sm: [
          "h-[40px] px-[var(--spacing-12)] py-0",
          "[font-size:var(--text-body-sm-font-size)] [font-weight:var(--text-body-sm-font-weight)] [line-height:var(--text-body-sm-line-height)]",
          "data-[state=active]:[font-weight:var(--text-body-sm-500-font-weight)]",
        ],
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

const tabsTriggerBadgeClassName: Record<NormalizedTabsSize, string> = {
  md: [
    "inline-flex h-[24px] min-w-[24px] shrink-0 items-center justify-center rounded-[var(--border-radius-full)]",
    "bg-[var(--color-background-base-tertiary)] px-[var(--spacing-8)] py-0",
    "[font-family:var(--app-font-family-sans)] [font-size:var(--text-body-sm-500-font-size)] [font-weight:var(--text-body-sm-500-font-weight)] [line-height:var(--text-body-sm-500-line-height)]",
    "[color:var(--color-text-base-default)]",
  ].join(" "),
  sm: [
    "inline-flex h-[20px] min-w-[20px] shrink-0 items-center justify-center rounded-[var(--border-radius-full)]",
    "bg-[var(--color-background-base-tertiary)] px-[var(--spacing-4)] py-0",
    "[font-family:var(--app-font-family-sans)] [font-size:var(--text-caption-md-500-font-size)] [font-weight:var(--text-caption-md-500-font-weight)] [line-height:var(--text-caption-md-500-line-height)]",
    "[color:var(--color-text-base-default)]",
  ].join(" "),
};

function normalizeTabsSize(size: TabsSize | null | undefined): NormalizedTabsSize {
  return size === "sm" || size === "mobile" ? "sm" : "md";
}

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-[var(--spacing-8)]", className)}
      {...props}
    />
  );
}

type TabsOverflowIndicatorProps = React.ComponentProps<"span"> & {
  size?: TabsSize;
};

function TabsOverflowIndicator({
  className,
  size,
  ...props
}: TabsOverflowIndicatorProps) {
  const resolvedSize = normalizeTabsSize(size);

  return (
    <span
      aria-hidden="true"
      data-slot="tabs-overflow-indicator"
      className={cn(
        "pointer-events-none absolute bottom-0 right-0 top-0 z-20 flex items-center justify-end bg-gradient-to-l from-[var(--color-background-base-default)] via-[var(--color-background-base-default)] via-[67%] to-transparent pl-[var(--spacing-16)] pr-[var(--spacing-4)] [color:var(--color-icon-base-default)]",
        resolvedSize === "md"
          ? "w-[44px] pb-[var(--spacing-8)] pt-[var(--spacing-12)]"
          : "w-[40px] pb-[var(--spacing-6)] pt-[var(--spacing-10)]",
        className,
      )}
      {...props}
    >
      <span className="relative block size-[var(--spacing-24)] shrink-0">
        <span className="absolute left-[8px] top-[7px] block size-[8px] rotate-[-45deg] border-b-[length:var(--border-width-1-5)] border-r-[length:var(--border-width-1-5)] border-solid border-current" />
      </span>
    </span>
  );
}

type TabsListProps = Omit<
  React.ComponentProps<typeof TabsPrimitive.List>,
  "size"
> &
  Omit<VariantProps<typeof tabsListVariants>, "size"> & {
    showOverflowIndicator?: boolean;
    size?: TabsSize;
  };

function TabsList({
  children,
  className,
  showOverflowIndicator = false,
  size = "md",
  ...props
}: TabsListProps) {
  const resolvedSize = normalizeTabsSize(size);
  const list = (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(tabsListVariants({ size: resolvedSize }), className)}
      {...props}
    >
      {children}
    </TabsPrimitive.List>
  );

  return (
    <TabsSizeContext.Provider value={resolvedSize}>
      {showOverflowIndicator ? (
        <div
          className="relative inline-flex max-w-full"
          data-slot="tabs-list-overflow-frame"
        >
          {list}
          <TabsOverflowIndicator size={resolvedSize} />
        </div>
      ) : (
        list
      )}
    </TabsSizeContext.Provider>
  );
}

type TabsTriggerProps = Omit<
  React.ComponentProps<typeof TabsPrimitive.Trigger>,
  "size"
> &
  Omit<VariantProps<typeof tabsTriggerVariants>, "size"> & {
    badge?: React.ReactNode;
    leadingIcon?: React.ReactNode;
    previewState?: TabsPreviewState;
    size?: TabsSize;
  };

function TabsTrigger({
  badge,
  children,
  className,
  leadingIcon,
  previewState,
  size,
  ...props
}: TabsTriggerProps) {
  const contextSize = React.useContext(TabsSizeContext);
  const resolvedSize = size ? normalizeTabsSize(size) : contextSize;

  return (
    <TabsPrimitive.Trigger
      data-preview-state={previewState}
      data-slot="tabs-trigger"
      className={cn(tabsTriggerVariants({ size: resolvedSize }), className)}
      {...props}
    >
      <span
        className="flex min-w-0 items-center gap-[var(--spacing-6)]"
        data-slot="tabs-trigger-content"
      >
        {leadingIcon ? (
          <span aria-hidden="true" data-slot="tabs-trigger-icon">
            {leadingIcon}
          </span>
        ) : null}
        <span className="min-w-0 overflow-hidden text-ellipsis whitespace-nowrap">
          {children}
        </span>
      </span>
      {badge !== undefined && badge !== null ? (
        <span
          className={tabsTriggerBadgeClassName[resolvedSize]}
          data-slot="tabs-trigger-badge"
        >
          {badge}
        </span>
      ) : null}
    </TabsPrimitive.Trigger>
  );
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  );
}

export {
  Tabs,
  TabsContent,
  TabsList,
  TabsOverflowIndicator,
  TabsTrigger,
  tabsListVariants,
  tabsTriggerVariants,
};
export type {
  TabsListProps,
  TabsOverflowIndicatorProps,
  TabsPreviewState,
  TabsSize,
  TabsTriggerProps,
};
