import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { MudIcon } from "./mud-icon";
import { cn } from "./utils";

const uploadIconAssetPath = "../assets/mud/images/upload-icon.svg";
const uploadIconSrc = new URL(uploadIconAssetPath, import.meta.url).href;

const fileInputZoneVariants = cva(
  [
    "box-border flex min-h-[158px] w-full min-w-0 flex-col items-center justify-center overflow-hidden rounded-[var(--border-radius-8)] border-[length:var(--border-width-1-5)] px-[var(--spacing-24)] py-[var(--spacing-32)]",
    "gap-[var(--spacing-20)] bg-[var(--color-background-base-default)] text-center [font-family:var(--app-font-family-sans)]",
    "transition-[background-color,border-color,box-shadow,color] duration-200 ease-in-out",
    "focus-within:border-[var(--color-border-brand-default)] focus-within:shadow-[0_0_0_2px_var(--white-1000),0_0_0_5px_var(--blue-sky-500)]",
    "data-[disabled=true]:pointer-events-none data-[disabled=true]:border-[var(--color-border-disabled-default)] data-[disabled=true]:[color:var(--color-text-disabled-default)]",
  ],
  {
    variants: {
      previewState: {
        active:
          "border-solid border-[var(--color-border-brand-default)] bg-[var(--color-background-brand-secondary)]",
        default:
          "border-dashed border-[var(--color-border-base-secondary)] hover:border-[var(--color-border-brand-default)]",
        disabled:
          "border-dashed border-[var(--color-border-disabled-default)] [color:var(--color-text-disabled-default)]",
        focus:
          "border-dashed border-[var(--color-border-base-secondary)] shadow-[0_0_0_2px_var(--white-1000),0_0_0_5px_var(--blue-sky-500)]",
        hover:
          "border-dashed border-[var(--color-border-brand-default)]",
      },
    },
    defaultVariants: {
      previewState: "default",
    },
  },
);

const fileInputItemVariants = cva(
  [
    "box-border flex w-full min-w-0 overflow-hidden rounded-[var(--border-radius-8)] [font-family:var(--app-font-family-sans)]",
    "transition-[background-color,border-color,color] duration-200 ease-in-out",
  ],
  {
    variants: {
      state: {
        error:
          "min-h-[48px] flex-col items-start justify-center gap-[var(--spacing-6)] border-[length:var(--border-width-1-5)] border-[var(--color-border-danger-default)] bg-[var(--color-background-base-secondary)] px-[var(--spacing-16)] py-[12px]",
        success:
          "h-[48px] items-center gap-[var(--spacing-20)] bg-[var(--color-background-base-tertiary)] px-[var(--spacing-16)] py-0",
        uploaded:
          "h-[48px] items-center gap-[var(--spacing-20)] bg-[var(--color-background-base-tertiary)] px-[var(--spacing-16)] py-0",
        uploading:
          "h-[48px] items-center gap-[var(--spacing-20)] bg-[var(--color-background-base-tertiary)] px-[var(--spacing-16)] py-0",
      },
    },
    defaultVariants: {
      state: "uploaded",
    },
  },
);

type FileInputPreviewState = NonNullable<
  VariantProps<typeof fileInputZoneVariants>["previewState"]
>;

type FileInputItemState = NonNullable<
  VariantProps<typeof fileInputItemVariants>["state"]
>;

type FileInputProps = Omit<React.ComponentPropsWithoutRef<"div">, "children"> &
  VariantProps<typeof fileInputZoneVariants> & {
    actionLabel?: React.ReactNode;
    activeLabel?: React.ReactNode;
    captionFormats?: React.ReactNode;
    captionSize?: React.ReactNode;
    disabled?: boolean;
    dragLabel?: React.ReactNode;
    inputId?: string;
    inputProps?: Omit<
      React.ComponentPropsWithoutRef<"input">,
      "className" | "disabled" | "id" | "type"
    >;
    showFormats?: boolean;
    showSize?: boolean;
  };

type FileInputItemProps = Omit<React.ComponentPropsWithoutRef<"div">, "children"> &
  VariantProps<typeof fileInputItemVariants> & {
    errorMessage?: React.ReactNode;
    fileName?: React.ReactNode;
    fileSize?: React.ReactNode;
    icon?: React.ReactNode;
    onRemove?: () => void;
    removeLabel?: string;
    showRemove?: boolean;
    thumbnail?: React.ReactNode;
  };

function FileInput({
  actionLabel = "choose files",
  activeLabel = "Drop files to upload",
  captionFormats = "Supported formats: jpg, png, pdf",
  captionSize = "Maximum size: 100 MB",
  className,
  disabled,
  dragLabel = "Drag and drop or",
  inputId,
  inputProps,
  previewState = "default",
  showFormats = true,
  showSize = true,
  ...props
}: FileInputProps) {
  const generatedId = React.useId();
  const resolvedInputId = inputId ?? generatedId;
  const resolvedState = disabled ? "disabled" : previewState;
  const isActive = resolvedState === "active";

  return (
    <div
      data-disabled={disabled ? true : undefined}
      data-preview-state={resolvedState}
      data-slot="file-input"
      className={cn("grid w-full min-w-0 gap-[var(--spacing-12)]", className)}
      {...props}
    >
      <label
        data-disabled={disabled ? true : undefined}
        data-slot="file-input-zone"
        htmlFor={resolvedInputId}
        className={cn(
          fileInputZoneVariants({ previewState: resolvedState }),
          disabled ? "cursor-not-allowed" : "cursor-pointer",
        )}
      >
        <input
          className="sr-only"
          disabled={disabled}
          id={resolvedInputId}
          type="file"
          {...inputProps}
        />
        {isActive ? (
          <span
            data-slot="file-input-active-label"
            className="[font-size:var(--text-body-md-font-size)] [font-weight:var(--text-body-md-font-weight)] [line-height:var(--text-body-md-line-height)] [color:var(--color-text-base-default)]"
          >
            {activeLabel}
          </span>
        ) : (
          <>
            <span
              aria-hidden="true"
              data-slot="file-input-icon"
              className={cn(
                "inline-flex size-[48px] shrink-0 items-center justify-center rounded-[var(--border-radius-full)] bg-[var(--color-background-base-tertiary)] [color:var(--color-icon-base-default)]",
                disabled &&
                  "bg-[var(--color-background-disabled-default)] [color:var(--color-icon-disabled-on-disabled)]",
              )}
            >
              <MudIcon name="Outlined/24/cloud-upload" size="lg" />
            </span>
            <span
              data-slot="file-input-copy"
              className="flex max-w-full flex-wrap items-center justify-center gap-[var(--spacing-6)] [font-size:var(--text-body-md-font-size)] [font-weight:var(--text-body-md-font-weight)] [line-height:var(--text-body-md-line-height)]"
            >
              <span
                className={cn(
                  "[color:var(--color-text-base-default)]",
                  disabled && "[color:var(--color-text-disabled-default)]",
                )}
              >
                {dragLabel}
              </span>
              <span
                data-slot="file-input-action"
                className={cn(
                  "border-b border-current [color:var(--color-text-brand-default)]",
                  disabled && "[color:var(--color-text-disabled-default)]",
                )}
              >
                {actionLabel}
              </span>
            </span>
          </>
        )}
      </label>
      {(showFormats || showSize) && (
        <div
          data-slot="file-input-captions"
          className={cn(
            "flex min-w-0 items-center justify-end gap-[var(--spacing-24)] [font-family:var(--app-font-family-sans)] [font-size:var(--text-body-sm-font-size)] [font-weight:var(--text-body-sm-font-weight)] [line-height:var(--text-body-sm-line-height)] [color:var(--color-text-base-tertiary)]",
            disabled && "[color:var(--color-text-disabled-default)]",
          )}
        >
          {showFormats && (
            <span className="min-w-0 flex-1 overflow-hidden text-ellipsis">
              {captionFormats}
            </span>
          )}
          {showSize && (
            <span className="shrink-0 whitespace-nowrap text-right">
              {captionSize}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

function FileInputItem({
  className,
  errorMessage = "File exceeds size limit, max size is 100 MB",
  fileName = "Filename.pdf",
  fileSize = "1.8 MB",
  icon,
  onRemove,
  removeLabel = "Remove file",
  showRemove,
  state = "uploaded",
  thumbnail,
  ...props
}: FileInputItemProps) {
  const showError = state === "error" && Boolean(errorMessage);
  const isError = state === "error";
  const showFileIcon = !isError;
  const showRemoveButton =
    showRemove ?? (state === "uploaded" || isError || Boolean(onRemove));

  return (
    <div
      data-slot="file-input-item"
      data-state={state}
      className={cn(
        fileInputItemVariants({ state }),
        showError && "min-h-[80px]",
        className,
      )}
      {...props}
    >
      <div
        data-slot="file-input-item-row"
        className={cn(
          "flex w-full min-w-0 items-center gap-[var(--spacing-20)]",
        )}
      >
        <span
          data-slot="file-input-item-main"
          className={cn(
            "flex min-w-0 flex-1 items-center",
            showFileIcon && "gap-[var(--spacing-12)]",
          )}
        >
          {showFileIcon && (
            <span
              aria-hidden="true"
              data-slot="file-input-item-icon"
              className="inline-flex h-[32px] w-[24px] shrink-0 items-center justify-center [color:var(--color-icon-base-tertiary)]"
            >
              {thumbnail ?? icon ?? (
                <img
                  alt=""
                  className="block h-[32px] w-[24px]"
                  draggable={false}
                  src={uploadIconSrc}
                />
              )}
            </span>
          )}
          <span
            data-slot="file-input-item-text"
            className="flex min-w-0 flex-1 items-baseline gap-[var(--spacing-6)]"
          >
            <strong className="min-w-0 overflow-hidden text-ellipsis whitespace-nowrap [font-size:var(--text-body-sm-500-font-size)] [font-weight:var(--text-body-sm-500-font-weight)] [line-height:var(--text-body-sm-500-line-height)] [color:var(--color-text-base-default)]">
              {fileName}
            </strong>
            {fileSize && (
              <>
                <span
                  aria-hidden="true"
                  className="shrink-0 [font-size:var(--text-caption-md-font-size)] [font-weight:var(--text-caption-md-font-weight)] [line-height:var(--text-caption-md-line-height)] [color:var(--color-text-base-tertiary)]"
                >
                  •
                </span>
                <span className="shrink-0 [font-size:var(--text-body-sm-font-size)] [font-weight:var(--text-body-sm-font-weight)] [line-height:var(--text-body-sm-line-height)] [color:var(--color-text-base-tertiary)]">
                  {fileSize}
                </span>
              </>
            )}
          </span>
        </span>
        {state === "uploading" && (
          <span
            aria-label="Uploading"
            data-slot="file-input-item-spinner"
            role="status"
            className="size-[var(--spacing-16)] shrink-0 animate-spin rounded-[var(--border-radius-full)] border-2 border-[var(--color-border-brand-default)] border-l-transparent"
          />
        )}
        {state === "success" && (
          <MudIcon
            aria-label="Uploaded"
            className="shrink-0 [color:var(--color-icon-positive-default)]"
            name="Filled/20/circle-checkmark-filled"
            size="md"
          />
        )}
        {isError && (
          <MudIcon
            aria-label="Upload error"
            className="shrink-0 [color:var(--color-icon-danger-default)]"
            name="Filled/20/circle-error-filled"
            size="md"
          />
        )}
        {showRemoveButton && state !== "uploading" && state !== "success" && (
          <button
            aria-label={removeLabel}
            className="inline-flex size-[var(--spacing-16)] shrink-0 items-center justify-center rounded-[var(--border-radius-4)] [color:var(--color-icon-base-secondary)] hover:bg-[var(--color-background-base-secondary)]"
            onClick={onRemove}
            type="button"
          >
            <MudIcon name="Outlined/16/cross-large" size="sm" />
          </button>
        )}
      </div>
      {showError && (
        <div
          data-slot="file-input-item-error"
          className="grid w-full gap-[var(--spacing-6)]"
        >
          <span
            aria-hidden="true"
            data-slot="file-input-item-error-separator"
            className="block h-px w-full bg-[var(--color-border-base-secondary)]"
          />
          <p className="m-0 min-w-0 overflow-hidden text-ellipsis [font-size:var(--text-caption-md-font-size)] [font-weight:var(--text-caption-md-font-weight)] [line-height:var(--text-caption-md-line-height)] [color:var(--color-text-danger-default)]">
            {errorMessage}
          </p>
        </div>
      )}
    </div>
  );
}

export {
  FileInput,
  FileInputItem,
  fileInputItemVariants,
  fileInputZoneVariants,
};
export type {
  FileInputItemProps,
  FileInputItemState,
  FileInputPreviewState,
  FileInputProps,
};
