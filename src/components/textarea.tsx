import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { MudIcon } from "./mud-icon";
import { cn } from "./utils";

const textareaVariants = cva(
  [
    "box-border flex h-[150px] w-full min-w-0 resize-y rounded-[var(--border-radius-8)] border bg-[var(--color-background-base-default)] px-[var(--spacing-16)] py-[var(--spacing-12)]",
    "[font-family:var(--app-font-family-sans)] [font-size:var(--text-body-md-font-size)] [font-weight:var(--text-body-md-font-weight)] [line-height:24px] [letter-spacing:0] [color:var(--color-text-base-default)] outline-none",
    "transition-[color,box-shadow,border-color,background-color] placeholder:[color:var(--color-text-base-tertiary)]",
    "selection:bg-[var(--color-background-brand-default)] selection:[color:var(--color-text-base-inverse-on-color)]",
    "hover:border-2 focus-visible:border-2 focus-visible:ring-[4px] focus-visible:ring-offset-0",
    "data-[preview-state=hover]:border-2 data-[preview-state=focus]:border-2",
    "aria-invalid:border-[var(--color-border-danger-default)] aria-invalid:focus-visible:border-[var(--color-border-danger-default)] aria-invalid:focus-visible:ring-[var(--red-200)]",
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:border-[var(--color-border-disabled-default)] disabled:bg-[var(--color-background-disabled-default)] disabled:[color:var(--color-text-disabled-on-disabled)] disabled:placeholder:[color:var(--color-text-disabled-on-disabled)]",
  ],
  {
    variants: {
      tone: {
        default:
          "border-[var(--color-border-base-default)] hover:border-[var(--color-border-base-tertiary)] focus-visible:border-[var(--color-border-brand-default)] focus-visible:ring-[var(--blue-sky-200)] data-[preview-state=hover]:border-[var(--color-border-base-tertiary)] data-[preview-state=focus]:border-[var(--color-border-brand-default)] data-[preview-state=focus]:ring-[4px] data-[preview-state=focus]:ring-[var(--blue-sky-200)]",
        destructive:
          "border-[var(--color-border-danger-default)] hover:border-[var(--color-border-danger-default)] focus-visible:border-[var(--color-border-danger-default)] focus-visible:ring-[var(--red-200)] data-[preview-state=hover]:border-[var(--color-border-danger-default)] data-[preview-state=focus]:border-[var(--color-border-danger-default)] data-[preview-state=focus]:ring-[4px] data-[preview-state=focus]:ring-[var(--red-200)]",
      },
    },
    defaultVariants: {
      tone: "default",
    },
  },
);

type TextareaTone = NonNullable<VariantProps<typeof textareaVariants>["tone"]>;
type TextareaPreviewState = "default" | "filled" | "focus" | "hover";

type TextareaProps = React.ComponentProps<"textarea"> &
  VariantProps<typeof textareaVariants> & {
    previewState?: TextareaPreviewState;
  };

type TextAreaProps = TextareaProps & {
  assistiveText?: React.ReactNode;
  characterCounter?: React.ReactNode;
  label?: React.ReactNode;
  mandatory?: boolean;
  showCharacterCounter?: boolean;
  textareaClassName?: string;
};

const assistiveToneClassNames: Record<TextareaTone, string> = {
  default: "[color:var(--color-text-base-secondary)]",
  destructive: "[color:var(--color-text-danger-default)]",
};

function resolveTone(
  tone: TextareaProps["tone"],
  ariaInvalid: React.ComponentProps<"textarea">["aria-invalid"],
) {
  return ariaInvalid ? "destructive" : tone ?? "default";
}

function Textarea({
  "aria-invalid": ariaInvalid,
  className,
  previewState = "default",
  tone,
  ...props
}: TextareaProps) {
  const resolvedTone = resolveTone(tone, ariaInvalid);

  return (
    <textarea
      aria-invalid={ariaInvalid}
      data-slot="textarea"
      data-preview-state={previewState === "default" || previewState === "filled" ? undefined : previewState}
      data-tone={resolvedTone}
      className={cn(textareaVariants({ tone: resolvedTone }), className)}
      {...props}
    />
  );
}

function TextArea({
  "aria-describedby": ariaDescribedBy,
  "aria-invalid": ariaInvalid,
  assistiveText,
  characterCounter,
  className,
  id,
  label = "Label",
  mandatory = false,
  maxLength,
  required,
  showCharacterCounter = false,
  textareaClassName,
  tone,
  value,
  defaultValue,
  ...props
}: TextAreaProps) {
  const generatedId = React.useId();
  const textareaId = id ?? generatedId;
  const assistiveId = `${textareaId}-assistive`;
  const resolvedTone = resolveTone(tone, ariaInvalid);
  const currentLength =
    value !== undefined
      ? String(value).length
      : defaultValue !== undefined
        ? String(defaultValue).length
        : 0;
  const resolvedCounter =
    characterCounter ?? (maxLength ? `${currentLength}/${maxLength}` : undefined);
  const shouldShowCounter = showCharacterCounter || Boolean(characterCounter);
  const describedBy = [ariaDescribedBy, assistiveText ? assistiveId : undefined]
    .filter(Boolean)
    .join(" ") || undefined;

  return (
    <div
      data-slot="text-area"
      data-tone={resolvedTone}
      className={cn("grid w-full min-w-0 gap-[var(--spacing-8)]", className)}
    >
      {label && (
        <label
          className="flex min-w-0 items-center gap-[var(--spacing-4)] [font-family:var(--app-font-family-sans)] [font-size:var(--text-body-sm-font-size)] [font-weight:var(--text-body-sm-font-weight)] [line-height:20px] [color:var(--color-text-base-secondary)]"
          htmlFor={textareaId}
        >
          <span className="min-w-0 overflow-hidden text-ellipsis whitespace-nowrap">
            {label}
          </span>
          {(mandatory || required) && (
            <span
              aria-hidden="true"
              className="[color:var(--color-text-danger-default)]"
            >
              *
            </span>
          )}
        </label>
      )}
      <Textarea
        aria-describedby={describedBy}
        aria-invalid={ariaInvalid}
        defaultValue={defaultValue}
        id={textareaId}
        className={textareaClassName}
        maxLength={maxLength}
        required={required}
        tone={resolvedTone}
        value={value}
        {...props}
      />
      {(assistiveText || shouldShowCounter) && (
        <div
          className="flex min-w-0 items-start justify-end gap-[var(--spacing-16)]"
          data-slot="text-area-captions"
        >
          {assistiveText && (
            <div
              className={cn(
                "flex min-w-[36px] flex-1 items-start gap-[var(--spacing-4)] [font-family:var(--app-font-family-sans)] [font-size:var(--text-body-sm-font-size)] [font-weight:var(--text-body-sm-font-weight)] [line-height:20px]",
                assistiveToneClassNames[resolvedTone],
              )}
              data-slot="text-area-assistive"
              id={assistiveId}
            >
              {resolvedTone === "destructive" && (
                <MudIcon
                  className="mt-0 shrink-0"
                  name="Filled/20/circle-error-filled"
                  size="md"
                />
              )}
              <span className="min-w-0 flex-1 overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">
                {assistiveText}
              </span>
            </div>
          )}
          {shouldShowCounter && (
            <span
              className="shrink-0 whitespace-nowrap text-right [font-family:var(--app-font-family-sans)] [font-size:var(--text-body-sm-font-size)] [font-weight:var(--text-body-sm-font-weight)] [line-height:20px] [color:var(--color-text-base-tertiary)]"
              data-slot="text-area-counter"
            >
              {resolvedCounter}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export { Textarea, TextArea, textareaVariants };
export type { TextareaProps, TextareaPreviewState, TextareaTone, TextAreaProps };
