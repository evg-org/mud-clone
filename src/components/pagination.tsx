import * as React from "react";

import { Button, buttonVariants } from "./button";
import { MudIcon } from "./mud-icon";
import { cn } from "./utils";

type PaginationProps = React.ComponentProps<"nav">;

function Pagination({ className, ...props }: PaginationProps) {
  return (
    <nav
      role="navigation"
      aria-label="Paginare"
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  );
}

type PaginationContentProps = React.ComponentProps<"ul">;

function PaginationContent({ className, ...props }: PaginationContentProps) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn(
        "flex flex-row items-center gap-[var(--spacing-4)]",
        className,
      )}
      {...props}
    />
  );
}

type PaginationItemProps = React.ComponentProps<"li">;

function PaginationItem({ ...props }: PaginationItemProps) {
  return <li data-slot="pagination-item" {...props} />;
}

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<React.ComponentProps<typeof Button>, "size"> &
  React.ComponentProps<"a">;

function PaginationLink({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) {
  return (
    <a
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      className={cn(
        buttonVariants({
          variant: isActive ? "primary" : "ghost",
          size,
          radius: "sm",
        }),
        "min-w-[var(--spacing-32)] [font-size:var(--text-body-sm-500-font-size)] [line-height:var(--text-body-sm-500-line-height)]",
        className,
      )}
      {...props}
    />
  );
}

function PaginationPrevious({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Pagina precedentă"
      size="default"
      className={cn("gap-1 px-2.5 sm:pl-2.5", className)}
      {...props}
    >
      <MudIcon name="Outlined/20/chevron-left" />
      <span className="hidden sm:block">Anterior</span>
    </PaginationLink>
  );
}

function PaginationNext({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Pagina următoare"
      size="default"
      className={cn("gap-1 px-2.5 sm:pr-2.5", className)}
      {...props}
    >
      <span className="hidden sm:block">Următor</span>
      <MudIcon name="Outlined/20/chevron-right" />
    </PaginationLink>
  );
}

type PaginationEllipsisProps = React.ComponentProps<"span">;

function PaginationEllipsis({ className, ...props }: PaginationEllipsisProps) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn(
        "flex size-[var(--spacing-32)] items-center justify-center [color:var(--color-text-base-secondary)]",
        className,
      )}
      {...props}
    >
      <MudIcon name="Outlined/24/more-horizontal" size="sm" />
      <span className="sr-only">Mai multe pagini</span>
    </span>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};
export type {
  PaginationContentProps,
  PaginationEllipsisProps,
  PaginationItemProps,
  PaginationLinkProps,
  PaginationProps,
};
