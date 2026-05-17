"use client";

import * as React from "react";
import { cva } from "class-variance-authority";

import { Checkbox } from "./checkbox";
import { MudIcon } from "./mud-icon";
import { cn } from "./utils";

type TableHeaderStyle = "strong" | "subtle" | "white";
type TableDensity = "desktop" | "mobile";
type TableDensityProp = TableDensity | "default";
type TableDataType =
  | "action"
  | "checkbox"
  | "link"
  | "number"
  | "tag"
  | "text";
type TableSortDirection = "asc" | "desc" | "none";
type LegacyTableVariant = TableHeaderStyle | "default";
type TableMaxLines = number | "none" | false;

const tableVariants = cva(
  [
    "w-full table-fixed caption-bottom border-collapse [font-family:var(--app-font-family-sans)] [font-size:var(--text-body-sm-font-size)] [letter-spacing:0] [line-height:var(--text-body-sm-line-height)] [color:var(--color-text-base-default)]",
    "[&_th]:h-[48px] [&_th]:px-[var(--spacing-24)] [&_th]:py-[var(--spacing-8)] [&_th]:text-left [&_th]:align-middle [&_th]:[font-size:var(--text-body-sm-500-font-size)] [&_th]:[font-weight:var(--text-body-sm-500-font-weight)] [&_th]:[line-height:var(--text-body-sm-500-line-height)]",
    "[&_td]:h-[48px] [&_td]:border-b-[length:var(--border-width-0-5)] [&_td]:border-[var(--color-border-base-default)] [&_td]:bg-[var(--color-background-base-default)] [&_td]:px-[var(--spacing-24)] [&_td]:py-[var(--spacing-8)] [&_td]:align-middle [&_td]:text-[var(--color-text-base-secondary)] [&_td]:[font-size:var(--text-body-sm-font-size)] [&_td]:[font-weight:var(--text-body-sm-font-weight)] [&_td]:[line-height:var(--text-body-sm-line-height)] [&_td]:transition-colors",
    "[&_tbody_tr:last-child_td]:border-b-0 [&_tbody_tr[data-zebra=true]_td]:bg-[var(--color-background-base-secondary)] [&_tbody_tr[data-state=selected]_td]:bg-[var(--color-background-brand-secondary)]",
  ],
  {
    variants: {
      density: {
        desktop: "",
        mobile:
          "[&_th]:px-[var(--spacing-16)] [&_td]:px-[var(--spacing-16)]",
      },
      headerStyle: {
        strong:
          "[&_thead_th]:border-b-0 [&_thead_th]:bg-[var(--color-background-base-inverse-default)] [&_thead_th]:text-[var(--color-text-base-inverse-on-color)]",
        subtle:
          "[&_thead_th]:border-b-0 [&_thead_th]:bg-[var(--color-background-base-tertiary)] [&_thead_th]:text-[var(--color-text-base-default)]",
        white:
          "[&_thead_th]:border-b-[length:var(--border-width-0-5)] [&_thead_th]:border-[var(--color-border-base-default)] [&_thead_th]:bg-[var(--color-background-base-default)] [&_thead_th]:text-[var(--color-text-base-default)]",
      },
      hover: {
        true: "[&_tbody_tr:hover_td]:bg-[var(--color-background-base-tertiary)]",
        false: "",
      },
      zebra: {
        true: "[&_tbody_tr:nth-child(even)_td]:bg-[var(--color-background-base-secondary)]",
        false: "",
      },
    },
    defaultVariants: {
      density: "desktop",
      headerStyle: "subtle",
      hover: true,
      zebra: true,
    },
  },
);

const tableCellVariants = cva("", {
  variants: {
    dataType: {
      action: "text-center",
      checkbox: "text-center",
      link:
        "text-left [&_[data-slot=link]]:inline [&_[data-slot=link]]:break-words [&_[data-slot=link]]:whitespace-normal",
      number: "text-center",
      tag:
        "text-center [&_[data-slot=tag-group]]:flex [&_[data-slot=tag-group]]:w-full [&_[data-slot=tag-group]]:max-w-full",
      text: "text-left",
    },
  },
  defaultVariants: {
    dataType: "text",
  },
});

function normalizeDensity(density?: TableDensityProp): TableDensity {
  return density === "mobile" ? "mobile" : "desktop";
}

function normalizeHeaderStyle(
  headerStyle?: TableHeaderStyle,
  legacyVariant?: LegacyTableVariant,
): TableHeaderStyle {
  if (headerStyle) {
    return headerStyle;
  }

  if (legacyVariant === "default") {
    return "strong";
  }

  return legacyVariant ?? "subtle";
}

function resolveMaxLines(
  maxLines: TableMaxLines | undefined,
  defaultMaxLines: number,
): number | null {
  if (maxLines === false || maxLines === "none") {
    return null;
  }

  const resolvedMaxLines = maxLines ?? defaultMaxLines;

  if (!Number.isFinite(resolvedMaxLines) || resolvedMaxLines < 1) {
    return null;
  }

  return Math.floor(resolvedMaxLines);
}

function getLineClampStyle(maxLines: number | null) {
  if (maxLines === null) {
    return undefined;
  }

  return {
    display: "-webkit-box",
    overflow: "hidden",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: maxLines,
  } as React.CSSProperties;
}

function TableClampedContent({
  children,
  defaultMaxLines,
  maxLines,
}: {
  children: React.ReactNode;
  defaultMaxLines: number;
  maxLines?: TableMaxLines;
}) {
  const resolvedMaxLines = resolveMaxLines(maxLines, defaultMaxLines);

  return (
    <div
      data-slot="table-clamped-content"
      className={cn(
        "block min-w-0 break-words",
        resolvedMaxLines !== null && "text-ellipsis",
      )}
      style={getLineClampStyle(resolvedMaxLines)}
    >
      {children}
    </div>
  );
}

function isTableSortButtonChild(
  children: React.ReactNode,
): children is React.ReactElement<TableSortButtonProps> {
  return React.isValidElement(children) && children.type === TableSortButton;
}

function isPlainTableCellContent(children: React.ReactNode): boolean {
  if (typeof children === "string" || typeof children === "number") {
    return true;
  }

  if (Array.isArray(children)) {
    return children.every(isPlainTableCellContent);
  }

  return false;
}

function shouldClampTableCellContent(
  dataType: TableDataType,
  children: React.ReactNode,
) {
  return (
    dataType === "link" ||
    ((dataType === "text" || dataType === "number") &&
      isPlainTableCellContent(children))
  );
}

type TableProps = React.ComponentProps<"table"> & {
  containerClassName?: string;
  density?: TableDensityProp;
  headerStyle?: TableHeaderStyle;
  hover?: boolean;
  responsive?: boolean;
  /** @deprecated Use `headerStyle` instead. */
  variant?: LegacyTableVariant;
  zebra?: boolean;
  /** @deprecated Use `zebra` instead. */
  striped?: boolean;
};

type TableRowProps = React.ComponentProps<"tr"> & {
  zebra?: boolean;
};

type TableHeadProps = React.ComponentProps<"th"> & {
  maxLines?: TableMaxLines;
};

type TableCellProps = React.ComponentProps<"td"> & {
  dataType?: TableDataType;
  maxLines?: TableMaxLines;
};

type TableSortButtonProps = React.ComponentProps<"button"> & {
  direction?: TableSortDirection;
  maxLines?: TableMaxLines;
};

type TableCheckboxProps = React.ComponentProps<typeof Checkbox>;

type TableActionButtonProps = React.ComponentProps<"button">;

function Table({
  className,
  containerClassName,
  density,
  headerStyle,
  hover,
  responsive = true,
  striped,
  variant,
  zebra,
  ...props
}: TableProps) {
  const resolvedDensity = normalizeDensity(density);
  const resolvedHeaderStyle = normalizeHeaderStyle(headerStyle, variant);
  const resolvedZebra = zebra ?? striped ?? true;

  return (
    <div
      data-slot="table-container"
      className={cn(
        "relative w-full bg-[var(--color-background-base-default)]",
        responsive && "overflow-x-auto",
        containerClassName,
      )}
    >
      <table
        data-header-style={resolvedHeaderStyle}
        data-slot="table"
        className={cn(
          tableVariants({
            density: resolvedDensity,
            headerStyle: resolvedHeaderStyle,
            hover,
            zebra: resolvedZebra,
          }),
          className,
        )}
        {...props}
      />
    </div>
  );
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn(className)}
      {...props}
    />
  );
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn(className)}
      {...props}
    />
  );
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "[font-weight:var(--text-body-sm-500-font-weight)] [&>tr]:last:border-b-0",
        className,
      )}
      {...props}
    />
  );
}

function TableRow({ className, zebra, ...props }: TableRowProps) {
  return (
    <tr
      data-slot="table-row"
      data-zebra={zebra ? true : undefined}
      className={cn(className)}
      {...props}
    />
  );
}

function TableHead({
  children,
  className,
  maxLines = 2,
  ...props
}: TableHeadProps) {
  const content = isTableSortButtonChild(children)
    ? React.cloneElement(children, {
        maxLines: children.props.maxLines ?? maxLines,
      })
    : (
        <TableClampedContent defaultMaxLines={2} maxLines={maxLines}>
          {children}
        </TableClampedContent>
      );

  return (
    <th
      data-slot="table-head"
      className={cn(
        "relative whitespace-normal [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className,
      )}
      {...props}
    >
      {content}
    </th>
  );
}

function TableCell({
  children,
  className,
  dataType = "text",
  maxLines = 5,
  ...props
}: TableCellProps) {
  const content = shouldClampTableCellContent(dataType, children) ? (
    <TableClampedContent defaultMaxLines={5} maxLines={maxLines}>
      {children}
    </TableClampedContent>
  ) : (
    children
  );

  return (
    <td
      data-slot="table-cell"
      data-type={dataType}
      className={cn(
        tableCellVariants({ dataType }),
        "[&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className,
      )}
      {...props}
    >
      {content}
    </td>
  );
}

function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn(
        "mt-[var(--spacing-16)] [color:var(--color-text-base-secondary)]",
        className,
      )}
      {...props}
    />
  );
}

function TableSortButton({
  children,
  className,
  direction = "none",
  maxLines = 2,
  ...props
}: TableSortButtonProps) {
  const isAscending = direction === "asc";
  const isSorted = direction !== "none";
  const resolvedMaxLines = resolveMaxLines(maxLines, 2);
  const ariaSort =
    direction === "asc" ? "ascending" : direction === "desc" ? "descending" : "none";

  return (
    <button
      aria-sort={ariaSort}
      className={cn(
        "inline-flex w-full min-w-0 cursor-pointer items-center gap-[var(--spacing-6)] border-0 bg-transparent p-0 text-left [font:inherit] [color:inherit]",
        className,
      )}
      type="button"
      {...props}
    >
      <span
        className={cn(
          "min-w-0 flex-1 break-words",
          resolvedMaxLines !== null && "text-ellipsis",
        )}
        style={getLineClampStyle(resolvedMaxLines)}
      >
        {children}
      </span>
      <MudIcon
        aria-hidden="true"
        className={cn(
          "size-[var(--spacing-16)] shrink-0",
          isAscending && "rotate-180",
        )}
        name={
          isSorted
            ? "Outlined/16/chevron-bottom-small"
            : "Outlined/20/chevron-grabber"
        }
      />
    </button>
  );
}

function TableCheckbox({
  "aria-label": ariaLabel = "Select row",
  ...props
}: TableCheckboxProps) {
  return <Checkbox aria-label={ariaLabel} inputSize="sm" {...props} />;
}

function TableActionButton({
  "aria-label": ariaLabel = "Edit",
  children,
  className,
  ...props
}: TableActionButtonProps) {
  return (
    <button
      aria-label={ariaLabel}
      className={cn(
        "inline-flex size-[var(--spacing-20)] items-center justify-center border-0 bg-transparent p-0 text-[var(--color-icon-base-default)] outline-none focus-visible:shadow-[0_0_0_1px_var(--white-1000),0_0_0_3px_var(--blue-sky-500)]",
        className,
      )}
      type="button"
      {...props}
    >
      {children ?? (
        <MudIcon
          aria-hidden="true"
          className="size-[var(--spacing-20)]"
          name="Outlined/20/edit"
        />
      )}
    </button>
  );
}

export {
  Table,
  TableActionButton,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
  TableCheckbox,
  TableSortButton,
  tableCellVariants,
  tableVariants,
};

export type {
  TableActionButtonProps,
  TableCellProps,
  TableDataType,
  TableDensity,
  TableDensityProp,
  TableHeaderStyle,
  TableProps,
  TableCheckboxProps,
  TableHeadProps,
  TableMaxLines,
  TableRowProps,
  TableSortButtonProps,
  TableSortDirection,
};
