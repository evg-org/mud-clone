"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cva, type VariantProps } from "class-variance-authority";

import { MudIcon } from "./mud-icon";
import { cn } from "./utils";

const modalContentVariants = cva(
  [
    "fixed left-1/2 top-1/2 z-50 flex max-h-[calc(100vh-2rem)] w-[90vw] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden border border-[var(--color-border-base-default)] bg-[var(--color-background-base-default)] [color:var(--color-text-base-default)]",
    "shadow-[var(--drop-shadow-300)]",
    "duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
  ],
  {
    variants: {
      size: {
        sm: "max-w-[320px]",
        md: "max-w-[590px]",
        lg: "max-w-[720px]",
        fullscreen:
          "h-dvh max-h-dvh w-screen max-w-none rounded-none border-0 shadow-none",
      },
      animation: {
        zoom: "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        fade: "",
        slide:
          "data-[state=closed]:slide-out-to-bottom-[var(--spacing-40)] data-[state=open]:slide-in-from-bottom-[var(--spacing-40)]",
      },
      radius: {
        default: "rounded-[var(--border-radius-16)] max-[680px]:rounded-[var(--border-radius-12)]",
        none: "rounded-none",
      },
    },
    compoundVariants: [
      {
        size: "fullscreen",
        radius: "default",
        className: "rounded-none",
      },
    ],
    defaultVariants: {
      animation: "zoom",
      radius: "default",
      size: "md",
    },
  },
);

function Modal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="modal" {...props} />;
}

function ModalTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="modal-trigger" {...props} />;
}

function ModalPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="modal-portal" {...props} />;
}

function ModalClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="modal-close" {...props} />;
}

function ModalOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="modal-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-[var(--color-background-alpha-overlay-dark)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        className,
      )}
      {...props}
    />
  );
}

function ModalContent({
  animation,
  children,
  className,
  hideClose = false,
  radius,
  size,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> &
  VariantProps<typeof modalContentVariants> & {
    hideClose?: boolean;
  }) {
  return (
    <ModalPortal>
      <ModalOverlay />
      <DialogPrimitive.Content
        data-slot="modal-content"
        className={cn(modalContentVariants({ animation, radius, size }), className)}
        {...props}
      >
        {!hideClose && (
          <DialogPrimitive.Close className="absolute right-[var(--spacing-20)] top-[var(--spacing-24)] z-10 inline-flex size-[var(--spacing-32)] items-center justify-center rounded-[var(--border-radius-full)] border-0 bg-[var(--color-background-base-tertiary)] [color:var(--color-icon-base-secondary)] outline-none transition-[background-color,box-shadow] hover:bg-[var(--color-background-base-tertiary-active)] focus-visible:ring-[3px] focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-background">
            <MudIcon name="Outlined/16/cross-large" size="sm" />
            <span className="sr-only">Închide</span>
          </DialogPrimitive.Close>
        )}
        {children}
      </DialogPrimitive.Content>
    </ModalPortal>
  );
}

function ModalImage({
  alt = "",
  className,
  ...props
}: React.ComponentProps<"img">) {
  return (
    <div
      data-slot="modal-image"
      className="h-[220px] w-full shrink-0 overflow-hidden bg-[var(--color-background-base-secondary)]"
    >
      <img
        alt={alt}
        className={cn("block size-full object-cover", className)}
        {...props}
      />
    </div>
  );
}

function ModalHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="modal-header"
      className={cn(
        "grid gap-[var(--spacing-8)] px-[var(--spacing-32)] pb-0 pr-[var(--spacing-48)] pt-[var(--spacing-24)]",
        className,
      )}
      {...props}
    />
  );
}

function ModalTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="modal-title"
      className={cn(
        "line-clamp-3 break-words [font-family:var(--app-font-family-sans)] [font-size:var(--text-heading-h3-sm-font-size)] [font-weight:var(--text-heading-h3-sm-font-weight)] [line-height:var(--text-heading-h3-sm-line-height)] [letter-spacing:var(--text-heading-h3-sm-letter-spacing)] [color:var(--color-text-base-default)]",
        className,
      )}
      {...props}
    />
  );
}

function ModalDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="modal-description"
      className={cn(
        "[font-family:var(--app-font-family-sans)] [font-size:var(--text-body-sm-font-size)] [line-height:var(--text-body-sm-line-height)] [color:var(--color-text-base-secondary)]",
        className,
      )}
      {...props}
    />
  );
}

function ModalBody({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="modal-body"
      className={cn(
        "flex max-h-[calc(64vh-4px)] flex-col gap-[var(--spacing-16)] overflow-y-auto px-[var(--spacing-32)] py-[var(--spacing-24)] pr-[var(--spacing-20)] [font-family:var(--app-font-family-sans)] [font-size:var(--text-body-md-font-size)] [line-height:var(--text-body-md-line-height)] [color:var(--color-text-base-secondary)]",
        className,
      )}
      {...props}
    />
  );
}

function ModalFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="modal-footer"
      className={cn(
        "flex flex-col-reverse gap-[var(--spacing-8)] px-[var(--spacing-20)] pb-[var(--spacing-24)] pt-[var(--spacing-12)] sm:flex-row sm:justify-end",
        className,
      )}
      {...props}
    />
  );
}

export {
  Modal,
  ModalBody,
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalImage,
  ModalOverlay,
  ModalPortal,
  ModalTitle,
  ModalTrigger,
  modalContentVariants,
};
