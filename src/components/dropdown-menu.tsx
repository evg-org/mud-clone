"use client";

import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";

import { MudIcon } from "./mud-icon";
import { cn } from "./utils";

const menuContentClassName = [
  "z-[2000] flex max-h-[var(--radix-dropdown-menu-content-available-height)] w-[270px] max-w-[calc(100vw_-_var(--spacing-32))] origin-(--radix-dropdown-menu-content-transform-origin) flex-col gap-[var(--spacing-4)] overflow-x-hidden overflow-y-auto rounded-[var(--border-radius-16)] border-0 bg-[var(--color-background-base-default)] p-[var(--spacing-8)] [color:var(--color-text-base-default)] shadow-[var(--drop-shadow-300)] outline-none",
  "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
  "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
].join(" ");

const menuItemClassName = [
  "relative flex min-h-[44px] shrink-0 cursor-pointer select-none items-center gap-[var(--spacing-12)] rounded-[var(--border-radius-8)] py-[var(--spacing-12)] pl-[var(--spacing-16)] pr-[var(--spacing-24)] outline-none",
  "[font-family:var(--app-font-family-sans)] [font-size:var(--text-body-sm-500-font-size)] [font-weight:var(--text-body-sm-500-font-weight)] [line-height:var(--text-body-sm-500-line-height)] [letter-spacing:var(--text-body-sm-500-letter-spacing)] [color:var(--color-text-base-secondary)]",
  "transition-[background-color,color,box-shadow]",
  "active:bg-[var(--color-background-base-default-active)] focus-visible:shadow-[inset_0_0_0_2px_var(--blue-sky-500)]",
  "data-[highlighted]:bg-[var(--color-background-base-default-hover)] data-[highlighted]:[color:var(--color-text-base-secondary)]",
  "data-[state=checked]:bg-[var(--color-background-base-secondary)] data-[state=checked]:[color:var(--color-text-brand-default)]",
  "data-[disabled]:pointer-events-none data-[disabled]:cursor-not-allowed data-[disabled]:[color:var(--color-text-disabled-default)]",
  "data-[variant=destructive]:[color:var(--color-text-danger-default)] data-[variant=destructive]:focus:bg-[var(--color-background-danger-secondary)] data-[variant=destructive]:data-[highlighted]:bg-[var(--color-background-danger-secondary)]",
  "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_[data-slot=mud-icon]]:pointer-events-none [&_[data-slot=mud-icon]]:shrink-0",
].join(" ");

const menuItemLabelClassName =
  "line-clamp-2 min-w-0 flex-1 break-words";

function isMenuShortcutElement(child: React.ReactNode) {
  return React.isValidElement(child) && child.type === DropdownMenuShortcut;
}

function isLeadingIconElement(child: React.ReactNode) {
  return React.isValidElement(child) && child.type === MudIcon;
}

function MenuItemContent({ children }: { children: React.ReactNode }) {
  const leadingChildren: React.ReactNode[] = [];
  const labelChildren: React.ReactNode[] = [];
  const trailingChildren: React.ReactNode[] = [];

  React.Children.forEach(children, (child) => {
    if (isMenuShortcutElement(child)) {
      trailingChildren.push(child);
      return;
    }

    if (labelChildren.length === 0 && isLeadingIconElement(child)) {
      leadingChildren.push(child);
      return;
    }

    labelChildren.push(child);
  });

  return (
    <>
      {leadingChildren}
      {labelChildren.length > 0 && (
        <span
          className={menuItemLabelClassName}
          data-slot="dropdown-menu-item-label"
        >
          {labelChildren}
        </span>
      )}
      {trailingChildren}
    </>
  );
}

function DropdownMenu({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Root>) {
  return <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />;
}

function DropdownMenuPortal({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Portal>) {
  return (
    <DropdownMenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />
  );
}

function DropdownMenuTrigger({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>) {
  return (
    <DropdownMenuPrimitive.Trigger
      data-slot="dropdown-menu-trigger"
      {...props}
    />
  );
}

function DropdownMenuContent({
  className,
  sideOffset = 8,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Content>) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        data-slot="dropdown-menu-content"
        sideOffset={sideOffset}
        className={cn(menuContentClassName, className)}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  );
}

function DropdownMenuGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Group>) {
  return (
    <DropdownMenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />
  );
}

function DropdownMenuItem({
  className,
  children,
  inset,
  variant = "default",
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
  inset?: boolean;
  variant?: "default" | "destructive";
}) {
  return (
    <DropdownMenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        menuItemClassName,
        "data-[inset]:pl-[var(--spacing-32)]",
        className,
      )}
      {...props}
    >
      <MenuItemContent>{children}</MenuItemContent>
    </DropdownMenuPrimitive.Item>
  );
}

function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      className={cn(menuItemClassName, className)}
      checked={checked}
      {...props}
    >
      <span className="pointer-events-none flex size-[var(--spacing-20)] shrink-0 items-center justify-center rounded-[var(--border-radius-6)] border-2 border-[var(--color-border-base-secondary)] bg-[var(--color-background-base-default)] [color:var(--color-text-brand-default)]">
        <DropdownMenuPrimitive.ItemIndicator>
          <MudIcon name="Outlined/16/checkmark-small" size="sm" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      <MenuItemContent>{children}</MenuItemContent>
    </DropdownMenuPrimitive.CheckboxItem>
  );
}

function DropdownMenuRadioGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>) {
  return (
    <DropdownMenuPrimitive.RadioGroup
      data-slot="dropdown-menu-radio-group"
      {...props}
    />
  );
}

function DropdownMenuRadioItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem>) {
  return (
    <DropdownMenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
      className={cn(menuItemClassName, className)}
      {...props}
    >
      <span className="pointer-events-none flex size-[var(--spacing-20)] shrink-0 items-center justify-center rounded-[var(--border-radius-full)] border-2 border-[var(--color-border-base-secondary)] bg-[var(--color-background-base-default)]">
        <DropdownMenuPrimitive.ItemIndicator>
          <span className="size-[var(--spacing-8)] rounded-[var(--border-radius-full)] bg-[var(--color-text-brand-default)]" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      <MenuItemContent>{children}</MenuItemContent>
    </DropdownMenuPrimitive.RadioItem>
  );
}

function DropdownMenuLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Label> & {
  inset?: boolean;
}) {
  return (
    <DropdownMenuPrimitive.Label
      data-slot="dropdown-menu-label"
      data-inset={inset}
      className={cn(
        "min-w-0 overflow-hidden text-ellipsis whitespace-nowrap px-[var(--spacing-16)] py-[var(--spacing-4)] [font-family:var(--app-font-family-sans)] [font-size:var(--text-body-sm-500-font-size)] [font-weight:var(--text-body-sm-500-font-weight)] [line-height:var(--text-body-sm-500-line-height)] [letter-spacing:var(--text-body-sm-500-letter-spacing)] [color:var(--color-text-base-tertiary)] data-[inset]:pl-[var(--spacing-32)]",
        className,
      )}
      {...props}
    />
  );
}

function DropdownMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
  return (
    <DropdownMenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={cn(
        "my-[var(--spacing-2)] h-px bg-[var(--color-border-base-default)]",
        className,
      )}
      {...props}
    />
  );
}

function DropdownMenuShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn(
        "ml-auto [font-size:var(--text-caption-sm-font-size)] [line-height:var(--text-caption-sm-line-height)] [color:var(--color-text-base-tertiary)]",
        className,
      )}
      {...props}
    />
  );
}

function DropdownMenuSub({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Sub>) {
  return <DropdownMenuPrimitive.Sub data-slot="dropdown-menu-sub" {...props} />;
}

function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & {
  inset?: boolean;
}) {
  return (
    <DropdownMenuPrimitive.SubTrigger
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        menuItemClassName,
        "data-[state=open]:bg-[var(--gray-200)] data-[state=open]:[color:var(--color-text-base-default)] data-[inset]:pl-[var(--spacing-32)]",
        className,
      )}
      {...props}
    >
      <MenuItemContent>{children}</MenuItemContent>
      <MudIcon
        className="ml-auto"
        name="Outlined/16/chevron-right-small"
        size="sm"
      />
    </DropdownMenuPrimitive.SubTrigger>
  );
}

function DropdownMenuSubContent({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubContent>) {
  return (
    <DropdownMenuPrimitive.SubContent
      data-slot="dropdown-menu-sub-content"
      className={cn(menuContentClassName, className)}
      {...props}
    />
  );
}

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
};
