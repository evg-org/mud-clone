import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

import { DetailRow, type DetailRowProps } from "./detail-row";
import { Separator } from "./separator";
import { cn } from "./utils";

type TableCardTitleTone = "default" | "link";

const tableCardTitleToneClassName: Record<TableCardTitleTone, string> = {
  default: "[color:var(--color-text-base-default)]",
  link: "[color:var(--color-text-brand-default)] hover:[color:var(--color-text-brand-default-hover)] visited:[color:var(--color-text-brand-default)]",
};

function TableCard({
  className,
  highlighted = false,
  ...props
}: React.ComponentProps<"div"> & {
  highlighted?: boolean;
}) {
  return (
    <div
      data-slot="table-card"
      data-highlighted={highlighted ? true : undefined}
      className={cn(
        "relative w-full rounded-[var(--border-radius-12)] bg-[var(--color-background-base-default)]",
        highlighted &&
          "ring-[3px] ring-[var(--focus-ring)] ring-offset-2 ring-offset-white",
        className,
      )}
      {...props}
    >
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 rounded-[var(--border-radius-12)] border border-[var(--color-border-base-default)]",
          highlighted && "border-[var(--color-border-brand-default)]",
        )}
      />
      {props.children}
    </div>
  );
}

function TableCardContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="table-card-content"
      className={cn(
        "flex w-full flex-col items-start px-[var(--spacing-20)] pb-[var(--spacing-16)]",
        className,
      )}
      {...props}
    />
  );
}

function TableCardHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="table-card-header"
      className={cn(
        "flex w-full items-center justify-between gap-[var(--spacing-8)] pb-[var(--spacing-6)] pt-[var(--spacing-12)]",
        className,
      )}
      {...props}
    />
  );
}

function TableCardTitle({
  asChild = false,
  className,
  tone = "default",
  ...props
}: React.ComponentProps<"div"> & {
  asChild?: boolean;
  tone?: TableCardTitleTone;
}) {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      data-slot="table-card-title"
      className={cn(
        "line-clamp-3 min-w-0 flex-1 break-words [font-family:var(--app-font-family-sans)] [font-size:var(--text-heading-h5-2xs-font-size)] [font-weight:var(--text-heading-h5-2xs-font-weight)] [line-height:var(--text-heading-h5-2xs-line-height)] [letter-spacing:0]",
        "[white-space:normal] [text-decoration:none]",
        tableCardTitleToneClassName[tone],
        className,
      )}
      {...props}
    />
  );
}

function TableCardAction({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="table-card-action"
      className={cn(
        "flex size-[var(--spacing-32)] shrink-0 items-center justify-center",
        className,
      )}
      {...props}
    />
  );
}

function TableCardRows({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="table-card-rows"
      className={cn(
        "mt-[var(--spacing-8)] flex w-full flex-col gap-[var(--spacing-8)]",
        className,
      )}
      {...props}
    />
  );
}

function TableCardSeparator({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <Separator
      data-slot="table-card-separator"
      tone="mild"
      className={cn("max-w-[1200px] opacity-30", className)}
      {...props}
    />
  );
}

function TableCardRow({
  children,
  className,
  label,
  valueClassName,
  ...props
}: Omit<DetailRowProps, "children" | "label"> & {
  children: React.ReactNode;
  label: React.ReactNode;
}) {
  return (
    <DetailRow
      data-slot="table-card-row"
      desktopLabelWidth="130px"
      gap="var(--spacing-8)"
      label={label}
      labelWidth="130px"
      layout="inline"
      minHeight="24px"
      paddingY="0px"
      separator="none"
      valueClassName={cn("flex-1", valueClassName)}
      valueSize="sm"
      className={className}
      {...props}
    >
      {children}
    </DetailRow>
  );
}

export {
  TableCard,
  TableCardAction,
  TableCardContent,
  TableCardHeader,
  TableCardRow,
  TableCardRows,
  TableCardSeparator,
  TableCardTitle,
};
export type { TableCardTitleTone };
