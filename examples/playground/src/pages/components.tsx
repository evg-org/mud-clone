import {
  Fragment,
  type ComponentProps,
  type CSSProperties,
  type ReactNode,
} from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarIconFallback,
  AvatarImage,
  AvatarStack,
  AvatarStackOverflow,
  Badge,
  Button,
  Checkbox,
  CheckboxField,
  DetailRow,
  FilterChip,
  InputChip,
  Link,
  RadioField,
  RadioGroup,
  RadioGroupItem,
  SearchInput,
  Separator,
  Switch,
  TableCard,
  TableCardAction,
  TableCardContent,
  TableCardHeader,
  TableCardRow,
  TableCardRows,
  TableCardSeparator,
  TableCardTitle,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  InfoTag,
  Tag,
  TagGroup,
  TextArea,
  TextInput,
} from "@mud-clone";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@mud-clone/components/dialog";
import {
  Menu,
  MenuCheckboxItem,
  MenuContent,
  MenuItem,
  MenuLabel,
  MenuRadioGroup,
  MenuRadioItem,
  MenuSeparator,
  MenuShortcut,
  MenuTrigger,
} from "@mud-clone/components/menu";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from "@mud-clone/components/modal";
import { MudIcon } from "@mud-clone/components/mud-icon";
import { SelectionCard } from "@mud-clone/components/selection-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@mud-clone/components/select";
import {
  Table,
  TableActionButton,
  TableBody,
  TableCell,
  TableCheckbox,
  TableHead,
  TableHeader,
  TableRow,
  TableSortButton,
} from "@mud-clone/components/table";
import { controls } from "../docs-data";
import { ExampleCard, PageHeader } from "../docs-ui";
import avatarStack1Src from "../assets/avatar-stack-1.png";
import avatarStack2Src from "../assets/avatar-stack-2.png";
import avatarStack3Src from "../assets/avatar-stack-3.png";

type ButtonVariant = ComponentProps<typeof Button>["variant"];

type ButtonPreviewOption = {
  activeBg: string;
  hoverBg: string;
  label: string;
  stateFg: string;
  variant?: ButtonVariant;
};

const filledButtonOptions: ButtonPreviewOption[] = [
  {
    activeBg: "var(--app-control-primary-bg-active)",
    hoverBg: "var(--app-control-primary-bg-hover)",
    label: "Primary",
    stateFg: "var(--app-control-primary-fg)",
  },
  {
    activeBg: "var(--app-control-secondary-bg-active)",
    hoverBg: "var(--app-control-secondary-bg-hover)",
    label: "Secondary",
    stateFg: "var(--app-control-secondary-fg)",
    variant: "secondary",
  },
  {
    activeBg: "var(--app-control-strict-bg-active)",
    hoverBg: "var(--app-control-strict-bg-hover)",
    label: "Strict",
    stateFg: "var(--app-control-strict-fg)",
    variant: "strict",
  },
  {
    activeBg: "var(--app-control-neutral-bg-active)",
    hoverBg: "var(--app-control-neutral-bg-hover)",
    label: "Neutral",
    stateFg: "var(--app-control-neutral-fg)",
    variant: "neutral",
  },
  {
    activeBg: "var(--app-control-danger-bg-active)",
    hoverBg: "var(--app-control-danger-bg-hover)",
    label: "Destructive",
    stateFg: "var(--app-control-danger-fg)",
    variant: "destructive",
  },
];

const outlinedButtonOptions: ButtonPreviewOption[] = [
  {
    activeBg: "var(--app-control-primary-bg-active)",
    hoverBg: "var(--app-control-primary-bg-hover)",
    label: "Primary",
    stateFg: "var(--app-control-primary-fg)",
    variant: "outline-primary",
  },
  {
    activeBg: "var(--app-control-strict-bg-active)",
    hoverBg: "var(--app-control-strict-bg-hover)",
    label: "Strict",
    stateFg: "var(--app-control-strict-fg)",
    variant: "outline-strict",
  },
  {
    activeBg: "var(--app-control-danger-bg-active)",
    hoverBg: "var(--app-control-danger-bg-hover)",
    label: "Destructive",
    stateFg: "var(--app-control-danger-fg)",
    variant: "outline-destructive",
  },
];

const textButtonOptions: ButtonPreviewOption[] = [
  {
    activeBg: "var(--color-background-brand-secondary-active)",
    hoverBg: "var(--color-background-brand-secondary-hover)",
    label: "Primary",
    stateFg: "var(--color-text-brand-default)",
    variant: "text-primary",
  },
  {
    activeBg: "var(--color-background-base-tertiary-active)",
    hoverBg: "var(--color-background-base-tertiary-hover)",
    label: "Strict",
    stateFg: "var(--color-text-base-default)",
    variant: "text-strict",
  },
  {
    activeBg: "var(--color-background-danger-secondary-active)",
    hoverBg: "var(--color-background-danger-secondary)",
    label: "Destructive",
    stateFg: "var(--color-text-danger-default)",
    variant: "text-destructive",
  },
];

function buttonStateStyle(option: ButtonPreviewOption): CSSProperties {
  return {
    "--button-preview-active-bg": option.activeBg,
    "--button-preview-hover-bg": option.hoverBg,
    "--button-preview-state-fg": option.stateFg,
  } as CSSProperties;
}

function ButtonStateMatrix({ options }: { options: ButtonPreviewOption[] }) {
  return (
    <div className="button-state-matrix">
      <div className="button-state-row button-state-row-head">
        <span>option</span>
        <span>default</span>
        <span>hover</span>
        <span>active</span>
        <span>focus</span>
        <span>loading</span>
        <span>disabled</span>
      </div>
      {options.map((option) => (
        <div
          className="button-state-row"
          key={option.label}
          style={buttonStateStyle(option)}
        >
          <span>{option.label.toLowerCase()}</span>
          <Button className="button-state-control" variant={option.variant}>
            Default
          </Button>
          <Button
            className="button-state-control"
            data-preview-state="hover"
            variant={option.variant}
          >
            Hover
          </Button>
          <Button
            className="button-state-control"
            data-preview-state="active"
            variant={option.variant}
          >
            Active
          </Button>
          <Button
            className="button-state-control button-state-focus"
            variant={option.variant}
          >
            Focus
          </Button>
          <Button
            aria-label={`${option.label} loading`}
            className="button-state-control"
            loading
            variant={option.variant}
          />
          <Button
            className="button-state-control"
            disabled
            variant={option.variant}
          >
            Disabled
          </Button>
        </div>
      ))}
    </div>
  );
}

type CheckboxInputSize = NonNullable<ComponentProps<typeof Checkbox>["inputSize"]>;
type CheckboxPreviewMode = "checked" | "indeterminate" | "unchecked";
type CheckboxPreviewStateOption = "default" | "disabled" | "error" | "focus";

const checkboxSupportingText =
  "Moldova's digital evolution is at the heart of seamless public service delivery.";

const checkboxSizeRows: {
  inputSize: CheckboxInputSize;
  mode: CheckboxPreviewMode;
}[] = [
  { inputSize: "md", mode: "unchecked" },
  { inputSize: "sm", mode: "unchecked" },
  { inputSize: "md", mode: "checked" },
  { inputSize: "sm", mode: "checked" },
  { inputSize: "md", mode: "indeterminate" },
  { inputSize: "sm", mode: "indeterminate" },
];

const checkboxStateRows: {
  mode: CheckboxPreviewMode;
  state: CheckboxPreviewStateOption;
}[] = [
  { mode: "unchecked", state: "default" },
  { mode: "unchecked", state: "focus" },
  { mode: "unchecked", state: "disabled" },
  { mode: "unchecked", state: "error" },
  { mode: "checked", state: "default" },
  { mode: "checked", state: "focus" },
  { mode: "checked", state: "disabled" },
  { mode: "indeterminate", state: "default" },
  { mode: "indeterminate", state: "focus" },
];

const checkboxLabelStateRows: {
  mode: CheckboxPreviewMode;
  state: CheckboxPreviewStateOption;
}[] = [
  { mode: "unchecked", state: "default" },
  { mode: "checked", state: "default" },
  { mode: "unchecked", state: "focus" },
  { mode: "checked", state: "focus" },
  { mode: "unchecked", state: "disabled" },
  { mode: "checked", state: "disabled" },
  { mode: "indeterminate", state: "default" },
  { mode: "indeterminate", state: "focus" },
  { mode: "unchecked", state: "error" },
];

function checkboxDefaultChecked(mode: CheckboxPreviewMode) {
  if (mode === "checked") {
    return true;
  }

  return mode === "indeterminate" ? "indeterminate" : false;
}

function checkboxSizeLabel(inputSize: CheckboxInputSize) {
  return inputSize === "md" ? "medium" : "small";
}

function CheckboxPreviewSpec({
  mode,
  primary,
}: {
  mode: CheckboxPreviewMode;
  primary: string;
}) {
  return (
    <div className="checkbox-preview-spec">
      <span>{primary}</span>
      <span>{mode}</span>
    </div>
  );
}

function CheckboxPreviewItem({
  inputSize = "md",
  mode = "unchecked",
  state = "default",
}: {
  inputSize?: CheckboxInputSize;
  mode?: CheckboxPreviewMode;
  state?: CheckboxPreviewStateOption;
}) {
  return (
    <div className="checkbox-preview-item">
      <Checkbox
        defaultChecked={checkboxDefaultChecked(mode)}
        disabled={state === "disabled"}
        inputSize={inputSize}
        invalid={state === "error"}
        previewState={state === "focus" ? "focus" : "default"}
      />
      <CheckboxPreviewSpec
        mode={mode}
        primary={state === "default" ? checkboxSizeLabel(inputSize) : state}
      />
    </div>
  );
}

function CheckboxFieldPreviewItem({
  inputSize = "md",
  mode = "unchecked",
  state = "default",
  supportingText = false,
}: {
  inputSize?: CheckboxInputSize;
  mode?: CheckboxPreviewMode;
  state?: CheckboxPreviewStateOption;
  supportingText?: boolean;
}) {
  return (
    <div className="checkbox-field-preview-item">
      <CheckboxField
        defaultChecked={checkboxDefaultChecked(mode)}
        disabled={state === "disabled"}
        errorMessage={state === "error" ? "Error message" : undefined}
        inputSize={inputSize}
        invalid={state === "error"}
        label="Transforming Services"
        previewState={state === "focus" ? "focus" : "default"}
        supportingText={supportingText ? checkboxSupportingText : undefined}
      />
      <CheckboxPreviewSpec
        mode={mode}
        primary={state === "default" ? checkboxSizeLabel(inputSize) : state}
      />
    </div>
  );
}

function CheckboxLabelStateColumn({ supportingText }: { supportingText?: boolean }) {
  return (
    <div className="checkbox-label-state-column">
      <p>{supportingText ? "supporting-text" : "label-only"}</p>
      {checkboxLabelStateRows.map((item) => (
        <CheckboxFieldPreviewItem
          key={`${supportingText ? "support" : "label"}-${item.state}-${item.mode}`}
          mode={item.mode}
          state={item.state}
          supportingText={supportingText}
        />
      ))}
    </div>
  );
}

type RadioInputSize = NonNullable<ComponentProps<typeof RadioGroupItem>["inputSize"]>;
type RadioPreviewMode = "selected" | "unselected";
type RadioPreviewStateOption = "default" | "disabled" | "error" | "focus";

const radioSupportingText =
  "Moldova's digital evolution is at the heart of seamless public service delivery.";
const radioPreviewValue = "radio-preview-option";

const radioSizeRows: {
  inputSize: RadioInputSize;
  mode: RadioPreviewMode;
}[] = [
  { inputSize: "md", mode: "unselected" },
  { inputSize: "sm", mode: "unselected" },
  { inputSize: "md", mode: "selected" },
  { inputSize: "sm", mode: "selected" },
];

const radioStateRows: {
  mode: RadioPreviewMode;
  state: RadioPreviewStateOption;
}[] = [
  { mode: "unselected", state: "default" },
  { mode: "unselected", state: "focus" },
  { mode: "unselected", state: "disabled" },
  { mode: "unselected", state: "error" },
  { mode: "selected", state: "default" },
  { mode: "selected", state: "focus" },
  { mode: "selected", state: "disabled" },
];

const radioLabelStateRows: {
  mode: RadioPreviewMode;
  state: RadioPreviewStateOption;
}[] = [
  { mode: "unselected", state: "default" },
  { mode: "selected", state: "default" },
  { mode: "unselected", state: "focus" },
  { mode: "selected", state: "focus" },
  { mode: "unselected", state: "disabled" },
  { mode: "selected", state: "disabled" },
  { mode: "unselected", state: "error" },
];

function radioGroupValue(mode: RadioPreviewMode) {
  return mode === "selected" ? radioPreviewValue : "";
}

function radioSizeLabel(inputSize: RadioInputSize) {
  return inputSize === "md" ? "medium" : "small";
}

function RadioPreviewSpec({
  mode,
  primary,
}: {
  mode: RadioPreviewMode;
  primary: string;
}) {
  return (
    <div className="radio-preview-spec">
      <span>{primary}</span>
      <span>{mode}</span>
    </div>
  );
}

function RadioPreviewItem({
  inputSize = "md",
  mode = "unselected",
  state = "default",
}: {
  inputSize?: RadioInputSize;
  mode?: RadioPreviewMode;
  state?: RadioPreviewStateOption;
}) {
  return (
    <div className="radio-preview-item">
      <RadioGroup
        aria-label={`Radio ${state} ${mode}`}
        className="radio-single-group"
        value={radioGroupValue(mode)}
      >
        <RadioGroupItem
          disabled={state === "disabled"}
          inputSize={inputSize}
          invalid={state === "error"}
          previewState={state === "focus" ? "focus" : "default"}
          value={radioPreviewValue}
        />
      </RadioGroup>
      <RadioPreviewSpec
        mode={mode}
        primary={state === "default" ? radioSizeLabel(inputSize) : state}
      />
    </div>
  );
}

function RadioFieldPreviewItem({
  inputSize = "md",
  mode = "unselected",
  state = "default",
  supportingText = false,
}: {
  inputSize?: RadioInputSize;
  mode?: RadioPreviewMode;
  state?: RadioPreviewStateOption;
  supportingText?: boolean;
}) {
  return (
    <div className="radio-field-preview-item">
      <RadioGroup
        aria-label={`Radio field ${state} ${mode}`}
        className="radio-single-group"
        value={radioGroupValue(mode)}
      >
        <RadioField
          disabled={state === "disabled"}
          errorMessage={state === "error" ? "Error message" : undefined}
          inputSize={inputSize}
          invalid={state === "error"}
          label="Transforming Services"
          previewState={state === "focus" ? "focus" : "default"}
          supportingText={supportingText ? radioSupportingText : undefined}
          value={radioPreviewValue}
        />
      </RadioGroup>
      <RadioPreviewSpec
        mode={mode}
        primary={state === "default" ? radioSizeLabel(inputSize) : state}
      />
    </div>
  );
}

function RadioLabelStateColumn({ supportingText }: { supportingText?: boolean }) {
  return (
    <div className="radio-label-state-column">
      <p>{supportingText ? "supporting-text" : "label-only"}</p>
      {radioLabelStateRows.map((item) => (
        <RadioFieldPreviewItem
          key={`${supportingText ? "support" : "label"}-${item.state}-${item.mode}`}
          mode={item.mode}
          state={item.state}
          supportingText={supportingText}
        />
      ))}
    </div>
  );
}

type SwitchPreviewMode = "off" | "on";
type SwitchPreviewStateOption = "default" | "disabled" | "focus";

const switchStateRows: {
  mode: SwitchPreviewMode;
  state: SwitchPreviewStateOption;
}[] = [
  { mode: "off", state: "default" },
  { mode: "off", state: "focus" },
  { mode: "off", state: "disabled" },
  { mode: "on", state: "default" },
  { mode: "on", state: "focus" },
  { mode: "on", state: "disabled" },
];

function SwitchPreviewSpec({
  primary,
  secondary,
}: {
  primary: string;
  secondary: string;
}) {
  return (
    <div className="switch-preview-spec">
      <span>{primary}</span>
      <span>{secondary}</span>
    </div>
  );
}

function SwitchPreviewItem({
  mode,
  state,
}: {
  mode: SwitchPreviewMode;
  state: SwitchPreviewStateOption;
}) {
  return (
    <div className="switch-preview-item">
      <Switch
        aria-label={`Switch ${state} ${mode}`}
        defaultChecked={mode === "on"}
        disabled={state === "disabled"}
        previewState={state === "focus" ? "focus" : "default"}
      />
      <SwitchPreviewSpec primary={state} secondary={mode} />
    </div>
  );
}

type FilterChipStateOption = "default" | "disabled" | "focus" | "hover";
type ChipSelectionMode = "single" | "multiple";

const filterChipStates: FilterChipStateOption[] = [
  "default",
  "hover",
  "focus",
  "disabled",
];
const filterChipPrimaryStates: FilterChipStateOption[] = [
  "default",
  "hover",
  "focus",
];

function ChipPreviewSpec({
  primary,
  secondary,
}: {
  primary: string;
  secondary?: string;
}) {
  return (
    <div className="chip-preview-spec">
      <span>{primary}</span>
      {secondary ? <span>{secondary}</span> : null}
    </div>
  );
}

function ChipPreviewItem({
  children,
  primary,
  secondary,
}: {
  children: ReactNode;
  primary: string;
  secondary?: string;
}) {
  return (
    <div className="chip-preview-item">
      {children}
      <ChipPreviewSpec primary={primary} secondary={secondary} />
    </div>
  );
}

function FilterChipStateItem({
  mode,
  state,
}: {
  mode: ChipSelectionMode;
  state: FilterChipStateOption | "selected";
}) {
  const selected = state === "selected";

  return (
    <ChipPreviewItem primary={state}>
      <FilterChip
        disabled={state === "disabled"}
        label="Label"
        previewState={
          state === "focus" || state === "hover" ? state : "default"
        }
        selected={selected}
        selectionMode={mode}
      />
    </ChipPreviewItem>
  );
}

function FilterChipExample({ mode }: { mode: ChipSelectionMode }) {
  const selectedIndexes = mode === "multiple" ? [0, 2] : [0];

  return (
    <div className="chip-example-row">
      {Array.from({ length: 7 }, (_, index) => (
        <FilterChip
          key={`${mode}-${index}`}
          label="Label"
          selected={selectedIndexes.includes(index)}
          selectionMode={mode}
        />
      ))}
    </div>
  );
}

function InputChipStateItem({
  avatar = false,
  state,
}: {
  avatar?: boolean;
  state: FilterChipStateOption;
}) {
  return (
    <ChipPreviewItem primary={state}>
      <InputChip
        avatarSrc={avatar ? avatarStack1Src : undefined}
        disabled={state === "disabled"}
        label="Label"
        previewState={
          state === "focus" || state === "hover" ? state : "default"
        }
      />
    </ChipPreviewItem>
  );
}

type LinkSize = ComponentProps<typeof Link>["size"];
type LinkVariant = ComponentProps<typeof Link>["variant"];
type LinkWeight = ComponentProps<typeof Link>["weight"];

type LinkPreviewStyle = {
  label: string;
  variant?: LinkVariant;
};

const linkStyles: LinkPreviewStyle[] = [
  {
    label: "Primary",
  },
  {
    label: "Strict",
    variant: "strict",
  },
  {
    label: "White",
    variant: "white",
  },
];

const linkSizes: { label: string; size: LinkSize }[] = [
  { label: "large", size: "lg" },
  { label: "medium", size: "md" },
  { label: "small", size: "sm" },
  { label: "extra-small", size: "xs" },
];

const linkWeights: { label: string; weight: LinkWeight }[] = [
  { label: "regular 400", weight: "regular" },
  { label: "medium 500", weight: "medium" },
];

type TextInputTone = NonNullable<ComponentProps<typeof TextInput>["tone"]>;
type TextInputSize = NonNullable<ComponentProps<typeof TextInput>["inputSize"]>;
type TextInputPreviewState = ComponentProps<typeof TextInput>["previewState"];

const textInputTones: { label: string; tone: TextInputTone }[] = [
  { label: "default", tone: "default" },
  { label: "warning", tone: "warning" },
  { label: "destructive", tone: "destructive" },
  { label: "success", tone: "success" },
];

const textInputStateRows: {
  defaultValue?: string;
  disabled?: boolean;
  label: string;
  mandatory?: boolean;
  previewState?: TextInputPreviewState;
}[] = [
  { label: "default" },
  { label: "hover", previewState: "hover" },
  { label: "focus-empty", previewState: "focus" },
  { defaultValue: "Placeholder", label: "focus-populated", previewState: "focus" },
  { defaultValue: "Placeholder", label: "loading", previewState: "loading" },
  { defaultValue: "Placeholder", label: "filled" },
  { disabled: true, label: "disabled" },
  { label: "mandatory", mandatory: true },
];

function inputIconSize(inputSize: TextInputSize) {
  return inputSize === "md" ? "md" : "lg";
}

function inputEmailIconName(inputSize: TextInputSize) {
  return inputSize === "md" ? "Outlined/20/envelope" : "Outlined/24/envelope";
}

function TextInputPreviewItem({
  children,
  label,
}: {
  children: ReactNode;
  label: string;
}) {
  return (
    <div className="text-input-preview-item">
      <span>{label}</span>
      {children}
    </div>
  );
}

function TextInputEmailIcon({ inputSize }: { inputSize: TextInputSize }) {
  return (
    <MudIcon
      name={inputEmailIconName(inputSize)}
      size={inputIconSize(inputSize)}
    />
  );
}

function TextInputChevronIcon({ inputSize }: { inputSize: TextInputSize }) {
  return <MudIcon name="Outlined/20/chevron-bottom" size={inputIconSize(inputSize)} />;
}

function TextInputStateColumn({
  label,
  tone,
}: {
  label: string;
  tone: TextInputTone;
}) {
  return (
    <div className="text-input-state-column">
      {textInputStateRows.map((state) => (
        <TextInputPreviewItem
          key={`${label}-${state.label}`}
          label={`${label}: ${state.label}`}
        >
          <TextInput
            defaultValue={state.defaultValue}
            disabled={state.disabled}
            mandatory={state.mandatory}
            placeholder="Placeholder"
            previewState={state.previewState}
            required={state.mandatory}
            tone={tone}
          />
        </TextInputPreviewItem>
      ))}
    </div>
  );
}

function TextInputVariationSet({ inputSize }: { inputSize: TextInputSize }) {
  return (
    <div className="text-input-preview-row">
      <TextInputPreviewItem label="icon-none">
        <TextInput inputSize={inputSize} placeholder="Placeholder" />
      </TextInputPreviewItem>
      <TextInputPreviewItem label="icon-leading">
        <TextInput
          inputSize={inputSize}
          leadingIcon={<TextInputEmailIcon inputSize={inputSize} />}
          placeholder="Placeholder"
        />
      </TextInputPreviewItem>
      <TextInputPreviewItem label="icon-trailing">
        <TextInput
          inputSize={inputSize}
          placeholder="Placeholder"
          trailingIcon={<TextInputChevronIcon inputSize={inputSize} />}
        />
      </TextInputPreviewItem>
      <TextInputPreviewItem label="icon-both">
        <TextInput
          inputSize={inputSize}
          leadingIcon={<TextInputEmailIcon inputSize={inputSize} />}
          placeholder="Placeholder"
          trailingIcon={<TextInputChevronIcon inputSize={inputSize} />}
        />
      </TextInputPreviewItem>
    </div>
  );
}

type TextAreaTone = NonNullable<ComponentProps<typeof TextArea>["tone"]>;
type TextAreaPreviewState = ComponentProps<typeof TextArea>["previewState"];

const textAreaStateRows: Record<
  TextAreaTone,
  {
    defaultValue?: string;
    disabled?: boolean;
    label: string;
    mandatory?: boolean;
    previewState?: TextAreaPreviewState;
  }[]
> = {
  default: [
    { label: "default" },
    { label: "hover", previewState: "hover" },
    { label: "focus-empty", previewState: "focus" },
    { defaultValue: "Placeholder", label: "focus-populated", previewState: "focus" },
    { defaultValue: "Placeholder", label: "filled" },
    { disabled: true, label: "disabled" },
    { label: "mandatory", mandatory: true },
  ],
  destructive: [
    { label: "default" },
    { label: "hover", previewState: "hover" },
    { label: "focus-empty", previewState: "focus" },
    { defaultValue: "Placeholder", label: "focus-populated", previewState: "focus" },
    { defaultValue: "Placeholder", label: "filled" },
    { label: "mandatory", mandatory: true },
  ],
};

const textAreaOverflowValue =
  "By continuing, you acknowledge that all associated records, user access permissions, linked metadata, and historical logs related to this entry will be deleted. If this item is currently shared across multiple teams or integrated with external systems, those connections may also be disrupted. It is strongly recommended that you double-check all dependencies and ensure that appropriate backups have been made.";

const textAreaLongLabel =
  "Moldova's digital evolution is at the heart of seamless public service delivery";

const textAreaLongAssistive =
  "Moldova's digital evolution is at the heart of seamless public service delivery, providing citizens with easy access to essential information.";

function TextAreaPreviewItem({
  children,
  label,
}: {
  children: ReactNode;
  label: string;
}) {
  return (
    <div className="text-area-preview-item">
      <span>{label}</span>
      {children}
    </div>
  );
}

function TextAreaStateColumn({ tone }: { tone: TextAreaTone }) {
  return (
    <div className="text-area-state-column">
      {textAreaStateRows[tone].map((state) => (
        <TextAreaPreviewItem
          key={`${tone}-${state.label}`}
          label={`${tone}: ${state.label}`}
        >
          <TextArea
            defaultValue={state.defaultValue}
            disabled={state.disabled}
            mandatory={state.mandatory}
            placeholder="Placeholder"
            previewState={state.previewState}
            required={state.mandatory}
            tone={tone}
          />
        </TextAreaPreviewItem>
      ))}
    </div>
  );
}

type SearchInputShape = NonNullable<ComponentProps<typeof SearchInput>["shape"]>;
type SearchInputSize = NonNullable<ComponentProps<typeof SearchInput>["inputSize"]>;
type SearchInputPreviewState = NonNullable<
  ComponentProps<typeof SearchInput>["previewState"]
>;

const searchInputStateRows: {
  disabled?: boolean;
  label: string;
  loading?: boolean;
  previewState?: SearchInputPreviewState;
  value?: string;
}[] = [
  { label: "default" },
  { label: "hover", previewState: "hover" },
  { label: "focus-empty", previewState: "focus-empty" },
  { label: "focus-populated", previewState: "focus-populated", value: "Placeholder" },
  { label: "loading", loading: true, value: "Placeholder" },
  { label: "filled", previewState: "filled", value: "Placeholder" },
  { disabled: true, label: "disabled" },
];

function SearchInputPreviewItem({
  children,
  label,
}: {
  children: ReactNode;
  label: string;
}) {
  return (
    <div className="search-input-preview-item">
      <span>{label}</span>
      {children}
    </div>
  );
}

function SearchInputPreviewField({
  disabled = false,
  inputSize = "lg",
  loading = false,
  previewState = "default",
  shape = "rectangular",
  showSubmitButton = false,
  value,
}: {
  disabled?: boolean;
  inputSize?: SearchInputSize;
  loading?: boolean;
  previewState?: SearchInputPreviewState;
  shape?: SearchInputShape;
  showSubmitButton?: boolean;
  value?: string;
}) {
  const hasClearButton = Boolean(value && !loading && !disabled);

  return (
    <SearchInput
      defaultValue={value}
      disabled={disabled}
      inputSize={inputSize}
      loading={loading}
      onClear={hasClearButton ? () => undefined : undefined}
      placeholder="Placeholder"
      previewState={previewState}
      shape={shape}
      showSubmitButton={showSubmitButton}
    />
  );
}

function SearchInputStateColumn({ shape }: { shape: SearchInputShape }) {
  return (
    <div className="search-input-state-column">
      {searchInputStateRows.map((state) => (
        <SearchInputPreviewItem
          key={`${shape}-${state.label}`}
          label={state.label}
        >
          <SearchInputPreviewField
            disabled={state.disabled}
            loading={state.loading}
            previewState={state.previewState}
            shape={shape}
            value={state.value}
          />
        </SearchInputPreviewItem>
      ))}
    </div>
  );
}

type SelectInputTone = NonNullable<ComponentProps<typeof SelectTrigger>["tone"]>;
type SelectInputSize = Extract<
  NonNullable<ComponentProps<typeof SelectTrigger>["size"]>,
  "lg" | "md"
>;
type SelectInputPreviewState = ComponentProps<typeof SelectTrigger>["previewState"];

const selectInputStateRows: Record<
  SelectInputTone,
  {
    disabled?: boolean;
    label: string;
    mandatory?: boolean;
    previewState?: SelectInputPreviewState;
  }[]
> = {
  default: [
    { label: "default" },
    { label: "hover", previewState: "hover" },
    { label: "focus", previewState: "focus" },
    { label: "filled", previewState: "filled" },
    { disabled: true, label: "disabled" },
    { label: "mandatory", mandatory: true },
  ],
  destructive: [
    { label: "default" },
    { label: "hover", previewState: "hover" },
    { label: "focus", previewState: "focus" },
    { label: "filled", previewState: "filled" },
    { disabled: true, label: "disabled" },
  ],
};

const selectInputLongLabel =
  "Moldova's digital evolution is at the heart of seamless public service delivery";

const selectInputLongAssistive =
  "Moldova's digital evolution is at the heart of seamless public service delivery, providing citizens with easy access to essential information.";

const selectInputOptions = ["Option 1", "Option 2", "Option 3", "Option 4", "Option 5"];

function SelectInputPreviewItem({
  children,
  label,
}: {
  children: ReactNode;
  label: string;
}) {
  return (
    <div className="select-input-preview-item">
      <span>{label}</span>
      {children}
    </div>
  );
}

function SelectInputPreviewField({
  assistiveText,
  disabled = false,
  inputSize = "lg",
  label = "Label",
  mandatory = false,
  placeholder = "Placeholder",
  previewState = "default",
  tone = "default",
}: {
  assistiveText?: ReactNode;
  disabled?: boolean;
  inputSize?: SelectInputSize;
  label?: ReactNode;
  mandatory?: boolean;
  placeholder?: string;
  previewState?: SelectInputPreviewState;
  tone?: SelectInputTone;
}) {
  const filled = previewState === "filled";

  return (
    <div className="select-input-preview-field">
      {label && (
        <label className="select-input-preview-label">
          <span>{label}</span>
          {mandatory && (
            <span
              aria-hidden="true"
              className="select-input-preview-mandatory"
            >
              *
            </span>
          )}
        </label>
      )}
      <Select defaultValue={filled ? "placeholder" : undefined} disabled={disabled}>
        <SelectTrigger
          aria-invalid={tone === "destructive" ? true : undefined}
          disabled={disabled}
          previewState={previewState}
          size={inputSize}
          tone={tone}
        >
          <SelectValue placeholder={placeholder}>
            {filled ? placeholder : undefined}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="placeholder">{placeholder}</SelectItem>
          {selectInputOptions.map((option) => (
            <SelectItem key={option} value={option.toLowerCase().replace(" ", "-")}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {assistiveText && (
        <div
          className="select-input-preview-assistive"
          data-tone={tone}
        >
          {tone === "destructive" && (
            <MudIcon
              name="Filled/20/circle-error-filled"
              size="md"
            />
          )}
          <span>{assistiveText}</span>
        </div>
      )}
    </div>
  );
}

function SelectInputStateColumn({ tone }: { tone: SelectInputTone }) {
  return (
    <div className="select-input-state-column">
      {selectInputStateRows[tone].map((state) => (
        <SelectInputPreviewItem
          key={`${tone}-${state.label}`}
          label={`${tone}: ${state.label}`}
        >
          <SelectInputPreviewField
            disabled={state.disabled}
            mandatory={state.mandatory}
            previewState={state.previewState}
            tone={tone}
          />
        </SelectInputPreviewItem>
      ))}
    </div>
  );
}

type MenuPreviewKind = "contextual" | "selection";
type MenuPreviewLeading = "checkbox" | "icon" | "none" | "radio";
type MenuPreviewRowState =
  | "active"
  | "default"
  | "disabled"
  | "focus"
  | "hover"
  | "selected";

const menuOptionLabels = [
  "Option 1",
  "Option 2",
  "Option 3",
  "Option 4",
  "Option 5",
  "Option 6",
];

const menuPreviewIcons = [
  "Outlined/20/shield",
  "Outlined/20/business",
  "Outlined/20/settings",
  "Outlined/20/edit",
  "Outlined/20/rotate-arrow",
  "Outlined/20/qr-code",
];

function MenuPreviewLabel({
  children,
  label,
}: {
  children: ReactNode;
  label: string;
}) {
  return (
    <div className="menu-preview-example">
      <span>{label}</span>
      {children}
    </div>
  );
}

function MenuPreviewLeadingControl({
  index,
  leading,
}: {
  index: number;
  leading: MenuPreviewLeading;
}) {
  if (leading === "icon") {
    return <MudIcon name={menuPreviewIcons[index]} size="md" />;
  }

  if (leading === "checkbox") {
    return <span aria-hidden="true" className="menu-preview-checkbox" />;
  }

  if (leading === "radio") {
    return <span aria-hidden="true" className="menu-preview-radio" />;
  }

  return null;
}

function MenuPreviewRow({
  index,
  kind,
  label,
  leading = "none",
  state = "default",
}: {
  index: number;
  kind: MenuPreviewKind;
  label: string;
  leading?: MenuPreviewLeading;
  state?: MenuPreviewRowState;
}) {
  const selected = state === "selected";

  return (
    <div
      className="menu-preview-row-item"
      data-kind={kind}
      data-state={state}
    >
      <MenuPreviewLeadingControl index={index} leading={leading} />
      <span className="menu-preview-row-label">{label}</span>
      {kind === "selection" && selected && (
        <MudIcon
          className="menu-preview-checkmark"
          name="Outlined/24/checkmark-small"
          size="lg"
        />
      )}
    </div>
  );
}

function MenuPreviewSurface({
  controlledIndex = 1,
  kind = "contextual",
  leading = "none",
  longHeading = false,
  longOption = false,
  optionCount = 6,
  rowState = "default",
  scrollable = false,
  segmented = false,
  sectionHeading = false,
}: {
  controlledIndex?: number;
  kind?: MenuPreviewKind;
  leading?: MenuPreviewLeading;
  longHeading?: boolean;
  longOption?: boolean;
  optionCount?: number;
  rowState?: MenuPreviewRowState;
  scrollable?: boolean;
  segmented?: boolean;
  sectionHeading?: boolean;
}) {
  const options = scrollable
    ? [...menuOptionLabels, "Option 7", "Option 8", "Option 9", "Option 10"]
    : menuOptionLabels.slice(0, optionCount);

  return (
    <div className="menu-preview-surface" data-scrollable={scrollable}>
      {options.map((option, index) => {
        const controlledRow = index === controlledIndex;
        const label =
          longOption && controlledRow
            ? "This is a very long menu option that will likely not fit within a single line"
            : option;
        const state = controlledRow ? rowState : "default";

        return (
          <Fragment key={`${option}-${index}`}>
            {index === 3 && (segmented || sectionHeading) && (
              <div className="menu-preview-segment" role="presentation">
                <span />
                {sectionHeading && (
                  <p>
                    {longHeading
                      ? "This is a very long heading that will likely not fit within a single line"
                      : "Section Heading"}
                  </p>
                )}
              </div>
            )}
            <MenuPreviewRow
              index={index}
              kind={kind}
              label={label}
              leading={leading}
              state={state}
            />
          </Fragment>
        );
      })}
    </div>
  );
}

type TagTone = NonNullable<ComponentProps<typeof Tag>["tone"]>;
type TagVariant = NonNullable<ComponentProps<typeof Tag>["variant"]>;

const tagTones: { label: string; tone: TagTone }[] = [
  { label: "muted", tone: "muted" },
  { label: "neutral", tone: "neutral" },
  { label: "accent", tone: "accent" },
  { label: "success", tone: "success" },
  { label: "brand", tone: "brand" },
  { label: "danger", tone: "danger" },
];

const tagVariantsPreview: { label: string; variant: TagVariant }[] = [
  { label: "subtle", variant: "subtle" },
  { label: "strong", variant: "strong" },
  { label: "outlined", variant: "outlined" },
];

function TagLeadingIcon({ tone }: { tone: TagTone }) {
  return (
    <MudIcon
      name={
        tone === "danger"
          ? "Outlined/16/circle-error"
          : "Outlined/16/checkmark-small"
      }
      size="sm"
    />
  );
}

function TagPreviewItem({
  children,
  label,
}: {
  children: ReactNode;
  label: string;
}) {
  return (
    <div className="tag-preview-item">
      {children}
      <span>{label}</span>
    </div>
  );
}

function TagStyleMatrix({ withIcon = false }: { withIcon?: boolean }) {
  return (
    <div className="tag-preview-style-grid">
      {tagTones.map(({ label, tone }) => (
        <div
          className="tag-preview-style-column"
          key={`${withIcon ? "icon" : "text"}-${label}`}
        >
          {tagVariantsPreview.map(({ label: variantLabel, variant }) => (
            <TagPreviewItem
              key={`${label}-${variantLabel}`}
              label={`${label}-${variantLabel}`}
            >
              <Tag tone={tone} variant={variant}>
                {withIcon && <TagLeadingIcon tone={tone} />}
                Label
              </Tag>
            </TagPreviewItem>
          ))}
        </div>
      ))}
    </div>
  );
}

type BadgeSize = ComponentProps<typeof Badge>["size"];
type BadgeVariant = ComponentProps<typeof Badge>["variant"];

const numberedBadgeStyles: { label: string; variant: BadgeVariant }[] = [
  { label: "dark", variant: "dark" },
  { label: "light", variant: "light" },
  { label: "neutral", variant: "neutral" },
  { label: "accent", variant: "accent" },
];

const numberedBadgeSizes: { label: string; size: BadgeSize }[] = [
  { label: "extra-large", size: "extra-large" },
  { label: "large", size: "large" },
  { label: "medium", size: "medium" },
];

const notificationDotSizes: { label: string; size: BadgeSize }[] = [
  { label: "extra-small", size: "extra-small" },
  { label: "small", size: "small" },
  { label: "medium", size: "medium" },
  { label: "large", size: "large" },
  { label: "extra-large", size: "extra-large" },
];

const notificationNumberedSizes: { label: string; size: BadgeSize }[] = [
  { label: "small", size: "small" },
  { label: "medium", size: "medium" },
  { label: "large", size: "large" },
  { label: "extra-large", size: "extra-large" },
];

const badgeBehaviorCounts = [
  { label: "1-digit-number", value: "2" },
  { label: "2-digit-number", value: "12" },
  { label: "3-digit-number", value: "256" },
  { label: "4-digit-number", value: "1K+" },
];

type AvatarSize = ComponentProps<typeof Avatar>["size"];

const avatarSizes: { label: string; pixels: string; size: AvatarSize }[] = [
  { label: "extra-small", pixels: "24px", size: "extra-small" },
  { label: "small", pixels: "32px", size: "small" },
  { label: "medium", pixels: "40px", size: "medium" },
  { label: "large", pixels: "48px", size: "large" },
  { label: "extra-large", pixels: "72px", size: "extra-large" },
];

function AvatarPhoto({
  focused,
  notification,
  size,
  src = avatarStack1Src,
}: {
  focused?: boolean;
  notification?: ComponentProps<typeof Avatar>["notification"];
  size: AvatarSize;
  src?: string;
}) {
  return (
    <Avatar focused={focused} notification={notification} size={size}>
      <AvatarImage alt="" src={src} />
    </Avatar>
  );
}

function AvatarPreviewItem({
  children,
  label,
  pixels,
}: {
  children: ReactNode;
  label: string;
  pixels?: string;
}) {
  return (
    <div className="avatar-preview-item">
      {children}
      <div className="avatar-preview-spec">
        <span>{label}</span>
        {pixels ? <span>{pixels}</span> : null}
      </div>
    </div>
  );
}

export function ButtonsPage() {
  return (
    <div className="docs-page">
      <PageHeader
        description="Button variants, sizing, states, and shapes follow the MUD button component frames."
        eyebrow="Components"
        title="Buttons"
      />
      <div className="component-grid one">
        <ExampleCard title="Filled buttons options and states">
          <div className="button-preview-stack">
            <ButtonStateMatrix options={filledButtonOptions} />
            <div className="button-preview-row">
              <span>sizes</span>
              <div className="inline-demo">
                <Button size="lg">Large</Button>
                <Button size="md">Medium</Button>
                <Button size="sm">Small</Button>
              </div>
            </div>
            <div className="button-preview-row">
              <span>icons</span>
              <div className="inline-demo">
                <Button>
                  <MudIcon name="Outlined/20/plus-large" />
                  Leading
                </Button>
                <Button>
                  Trailing
                  <MudIcon name="Outlined/20/chevron-bottom-small" />
                </Button>
                <Button aria-label="Add" size="icon-lg">
                  <MudIcon name="Outlined/20/plus-large" />
                </Button>
              </div>
            </div>
          </div>
        </ExampleCard>

        <ExampleCard title="Outlined buttons options and states">
          <div className="button-preview-stack">
            <ButtonStateMatrix options={outlinedButtonOptions} />
            <div className="button-preview-row">
              <span>sizes</span>
              <div className="inline-demo">
                <Button size="lg" variant="outline-primary">
                  Large
                </Button>
                <Button size="md" variant="outline-primary">
                  Medium
                </Button>
                <Button size="sm" variant="outline-primary">
                  Small
                </Button>
              </div>
            </div>
            <div className="button-preview-row">
              <span>shapes</span>
              <div className="inline-demo">
                <Button variant="outline-primary">Rectangular</Button>
                <Button radius="pill" variant="outline-primary">
                  Circular
                </Button>
              </div>
            </div>
          </div>
        </ExampleCard>

        <ExampleCard title="Text buttons options and states">
          <div className="button-preview-stack">
            <ButtonStateMatrix options={textButtonOptions} />
            <div className="button-preview-row">
              <span>sizes</span>
              <div className="inline-demo">
                <Button size="lg" variant="text-primary">
                  Large
                </Button>
                <Button size="md" variant="text-primary">
                  Medium
                </Button>
                <Button size="sm" variant="text-primary">
                  Small
                </Button>
              </div>
            </div>
            <div className="button-preview-row">
              <span>shapes</span>
              <div className="inline-demo">
                <Button variant="text-primary">Rectangular</Button>
                <Button radius="pill" variant="text-primary">
                  Circular
                </Button>
              </div>
            </div>
          </div>
        </ExampleCard>
      </div>
    </div>
  );
}

export function CheckboxPage() {
  return (
    <div className="docs-page">
      <PageHeader
        description="Checkboxes allow users to select one or more items from a set and can turn an option on or off."
        eyebrow="Components"
        title="Checkbox"
      />
      <div className="component-grid one">
        <ExampleCard title="Sizes">
          <div className="checkbox-size-grid">
            {checkboxSizeRows.map((item) => (
              <CheckboxPreviewItem
                inputSize={item.inputSize}
                key={`${item.inputSize}-${item.mode}`}
                mode={item.mode}
              />
            ))}
          </div>
        </ExampleCard>

        <ExampleCard title="States">
          <div className="checkbox-state-grid">
            {checkboxStateRows.map((item) => (
              <CheckboxPreviewItem
                key={`${item.state}-${item.mode}`}
                mode={item.mode}
                state={item.state}
              />
            ))}
          </div>
        </ExampleCard>

        <ExampleCard title="Label Group Sizes">
          <div className="checkbox-label-size-grid">
            <div className="checkbox-label-state-column">
              <p>label-only</p>
              <CheckboxFieldPreviewItem />
              <CheckboxFieldPreviewItem inputSize="sm" />
            </div>
            <div className="checkbox-label-state-column">
              <p>supporting-text</p>
              <CheckboxFieldPreviewItem supportingText />
              <CheckboxFieldPreviewItem inputSize="sm" supportingText />
            </div>
          </div>
        </ExampleCard>

        <ExampleCard title="Label Group States">
          <div className="checkbox-label-state-grid">
            <CheckboxLabelStateColumn />
            <CheckboxLabelStateColumn supportingText />
          </div>
        </ExampleCard>
      </div>
    </div>
  );
}

export function RadioButtonPage() {
  return (
    <div className="docs-page">
      <PageHeader
        description="The role of a radio button is to provide users with a selection mechanism for mutually exclusive options within a set. Radio buttons typically allow users to choose one option from a predefined list, conveying clarity and ease of interaction."
        eyebrow="Components"
        title="Radio Button"
      />
      <div className="component-grid one">
        <ExampleCard title="Sizes">
          <div className="radio-size-grid">
            {radioSizeRows.map((item) => (
              <RadioPreviewItem
                inputSize={item.inputSize}
                key={`${item.inputSize}-${item.mode}`}
                mode={item.mode}
              />
            ))}
          </div>
        </ExampleCard>

        <ExampleCard title="States">
          <div className="radio-state-grid">
            {radioStateRows.map((item) => (
              <RadioPreviewItem
                key={`${item.state}-${item.mode}`}
                mode={item.mode}
                state={item.state}
              />
            ))}
          </div>
        </ExampleCard>

        <ExampleCard title="Label Group Sizes">
          <div className="radio-label-size-grid">
            <div className="radio-label-state-column">
              <p>label-only</p>
              <RadioFieldPreviewItem />
              <RadioFieldPreviewItem inputSize="sm" />
            </div>
            <div className="radio-label-state-column">
              <p>supporting-text</p>
              <RadioFieldPreviewItem supportingText />
              <RadioFieldPreviewItem inputSize="sm" supportingText />
            </div>
          </div>
        </ExampleCard>

        <ExampleCard title="Label Group States">
          <div className="radio-label-state-grid">
            <RadioLabelStateColumn />
            <RadioLabelStateColumn supportingText />
          </div>
        </ExampleCard>
      </div>
    </div>
  );
}

export function SwitchPage() {
  return (
    <div className="docs-page">
      <PageHeader
        description="The role of a switch or toggle component is to provide users with a clear and intuitive way to toggle between two states, such as enabling or disabling a setting, switching a feature on or off, or toggling between different modes."
        eyebrow="Components"
        title="Switch"
      />
      <div className="component-grid one">
        <ExampleCard title="States">
          <div className="switch-state-grid">
            {switchStateRows.map((item) => (
              <SwitchPreviewItem
                key={`${item.state}-${item.mode}`}
                mode={item.mode}
                state={item.state}
              />
            ))}
          </div>
        </ExampleCard>
      </div>
    </div>
  );
}

export function ChipPage() {
  return (
    <div className="docs-page">
      <PageHeader
        description="Chips allow users to filter content or make a choice from a set of options within a compact area."
        eyebrow="Components"
        title="Chip"
      />
      <div className="component-grid one">
        <ExampleCard
          description="Filter chips use tags or descriptive words to filter content. They can be a good alternative to segmented buttons or checkboxes when viewing a list or search results."
          title="Filter Chip"
        >
          <div className="chip-preview-stack">
            <section className="chip-preview-section">
              <h4>Types</h4>
              <div className="chip-preview-row">
                <ChipPreviewItem primary="mono-selection">
                  <FilterChip label="Label" selected />
                </ChipPreviewItem>
                <ChipPreviewItem primary="multi-selection">
                  <FilterChip label="Label" selected selectionMode="multiple" />
                </ChipPreviewItem>
              </div>
            </section>

            <section className="chip-preview-section">
              <h4>States</h4>
              <div className="chip-state-stack">
                <div className="chip-state-group">
                  <h5>Mono-Selection</h5>
                  <div className="chip-state-grid">
                    {filterChipPrimaryStates.map((state) => (
                      <FilterChipStateItem
                        key={`single-${state}`}
                        mode="single"
                        state={state}
                      />
                    ))}
                    <FilterChipStateItem mode="single" state="selected" />
                    <FilterChipStateItem mode="single" state="disabled" />
                  </div>
                  <p>Example</p>
                  <FilterChipExample mode="single" />
                </div>

                <div className="chip-state-group">
                  <h5>Multi-Selection</h5>
                  <div className="chip-state-grid">
                    {filterChipPrimaryStates.map((state) => (
                      <FilterChipStateItem
                        key={`multiple-${state}`}
                        mode="multiple"
                        state={state}
                      />
                    ))}
                    <FilterChipStateItem mode="multiple" state="selected" />
                    <FilterChipStateItem mode="multiple" state="disabled" />
                  </div>
                  <p>Example</p>
                  <FilterChipExample mode="multiple" />
                </div>
              </div>
            </section>

            <section className="chip-preview-section">
              <h4>Variations</h4>
              <div className="chip-preview-row">
                <ChipPreviewItem primary="numbered-badge">
                  <FilterChip counter={1} label="Label" />
                </ChipPreviewItem>
                <ChipPreviewItem primary="numbered-badge">
                  <FilterChip counter={1} label="Label" selected />
                </ChipPreviewItem>
              </div>
            </section>
          </div>
        </ExampleCard>

        <ExampleCard
          description="Input chips represent discrete pieces of information entered by a user, such as filter options within a search field. They enable user input and verify that input by converting text into chips."
          title="Input Chip"
        >
          <div className="chip-preview-stack">
            <section className="chip-preview-section">
              <h4>Types</h4>
              <div className="chip-preview-row">
                <ChipPreviewItem primary="simple">
                  <InputChip label="Label" />
                </ChipPreviewItem>
                <ChipPreviewItem primary="w/ avatar">
                  <InputChip avatarSrc={avatarStack1Src} label="Label" />
                </ChipPreviewItem>
              </div>
            </section>

            <section className="chip-preview-section">
              <h4>States</h4>
              <div className="chip-input-state-grid">
                {filterChipStates.map((state) => (
                  <InputChipStateItem key={`input-simple-${state}`} state={state} />
                ))}
                {filterChipStates.map((state) => (
                  <InputChipStateItem
                    avatar
                    key={`input-avatar-${state}`}
                    state={state}
                  />
                ))}
              </div>
            </section>
          </div>
        </ExampleCard>
      </div>
    </div>
  );
}

export function LinksPage() {
  return (
    <div className="docs-page">
      <PageHeader
        description="Links navigate between pages, sections, or external resources while preserving MUD typography, color, underline, and state rules."
        eyebrow="Components"
        title="Links"
      />
      <div className="component-grid one">
        <ExampleCard title="Link sizes">
          <div className="link-preview-row">
            {linkSizes.map(({ label, size }) => (
              <div className="link-preview-item" key={label}>
                <Link href="/links" size={size} visited={false}>
                  Link
                </Link>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </ExampleCard>

        <ExampleCard title="Link weights">
          <div className="link-preview-row">
            {linkWeights.map(({ label, weight }) => (
              <div className="link-preview-item" key={label}>
                <Link
                  href="/links"
                  size="lg"
                  visited={false}
                  weight={weight}
                >
                  Link
                </Link>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </ExampleCard>

        <ExampleCard title="Link variations">
          <div className="link-preview-row">
            <div className="link-preview-item">
              <Link href="/links" size="lg" visited={false}>
                Link
              </Link>
              <span>underline</span>
            </div>
            <div className="link-preview-item">
              <Link
                href="/links"
                size="lg"
                underline={false}
                visited={false}
              >
                Link
              </Link>
              <span>underline-none</span>
            </div>
          </div>
        </ExampleCard>

        <ExampleCard title="Link styles">
          <div className="link-preview-row">
            {linkStyles.map((style) => (
              <div
                className="link-preview-item"
                key={style.label}
              >
                {style.variant === "white" ? (
                  <span className="inverse-surface compact">
                    <Link
                      href="/links"
                      size="lg"
                      variant={style.variant}
                      visited={false}
                    >
                      Link
                    </Link>
                  </span>
                ) : (
                  <Link
                    href="/links"
                    size="lg"
                    variant={style.variant}
                    visited={false}
                  >
                    Link
                  </Link>
                )}
                <span>{style.label.toLowerCase()}</span>
              </div>
            ))}
          </div>
        </ExampleCard>

        <ExampleCard title="Link states">
          <div className="link-preview-row">
            <div className="link-preview-item">
              <Link href="/links" size="lg" visited={false}>
                Link
              </Link>
              <span>default</span>
            </div>
            <div className="link-preview-item">
              <Link
                className="link-preview-state"
                data-preview-state="hover"
                href="/links"
                size="lg"
                visited={false}
              >
                Link
              </Link>
              <span>hover</span>
            </div>
            <div className="link-preview-item">
              <Link
                className="link-preview-state link-preview-focus"
                href="/links"
                size="lg"
                visited={false}
              >
                Link
              </Link>
              <span>focus</span>
            </div>
            <div className="link-preview-item">
              <Link
                className="link-preview-state"
                data-preview-state="visited"
                href="/links"
                size="lg"
              >
                Link
              </Link>
              <span>visited</span>
            </div>
          </div>
        </ExampleCard>

      </div>
    </div>
  );
}

export function MenuPage() {
  return (
    <div className="docs-page">
      <PageHeader
        description="Menus present compact lists of actions or options while preserving consistent selection, state, and overflow behavior."
        eyebrow="Components"
        title="Menu"
      />
      <div className="component-grid one">
        <ExampleCard
          description="The selection menu is used when a compact dropdown closes after one option is chosen."
          title="Selection menu"
        >
          <div className="menu-preview-section">
            <div>
              <h3 className="menu-preview-subtitle">Breakpoints</h3>
              <div className="menu-preview-grid menu-preview-grid-tight">
                <MenuPreviewLabel label="desktop">
                  <MenuPreviewSurface kind="selection" rowState="selected" />
                </MenuPreviewLabel>
                <MenuPreviewLabel label="mobile">
                  <div className="menu-mobile-frame">
                    <div className="menu-mobile-sheet">
                      <MenuPreviewSurface kind="selection" rowState="selected" />
                    </div>
                  </div>
                </MenuPreviewLabel>
              </div>
            </div>
            <div>
              <h3 className="menu-preview-subtitle">States</h3>
              <div className="menu-preview-grid">
                <MenuPreviewLabel label="unselected">
                  <MenuPreviewSurface kind="selection" />
                </MenuPreviewLabel>
                <MenuPreviewLabel label="unselected: hover">
                  <MenuPreviewSurface kind="selection" rowState="hover" />
                </MenuPreviewLabel>
                <MenuPreviewLabel label="selected">
                  <MenuPreviewSurface kind="selection" rowState="selected" />
                </MenuPreviewLabel>
                <MenuPreviewLabel label="disabled">
                  <MenuPreviewSurface kind="selection" rowState="disabled" />
                </MenuPreviewLabel>
              </div>
            </div>
            <div>
              <h3 className="menu-preview-subtitle">Edge cases</h3>
              <div className="menu-preview-grid menu-preview-grid-tight">
                <MenuPreviewLabel label="truncation: unselected">
                  <MenuPreviewSurface kind="selection" longOption />
                </MenuPreviewLabel>
                <MenuPreviewLabel label="truncation: selected">
                  <MenuPreviewSurface
                    kind="selection"
                    longOption
                    rowState="selected"
                  />
                </MenuPreviewLabel>
              </div>
            </div>
          </div>
        </ExampleCard>

        <ExampleCard
          description="Contextual menus adapt to the user's current context and can contain actions, settings, selection controls, and grouped sections."
          title="Contextual menu"
        >
          <div className="menu-preview-section">
            <div>
              <h3 className="menu-preview-subtitle">States</h3>
              <div className="menu-preview-grid">
                <MenuPreviewLabel label="default">
                  <MenuPreviewSurface />
                </MenuPreviewLabel>
                <MenuPreviewLabel label="hover">
                  <MenuPreviewSurface rowState="hover" />
                </MenuPreviewLabel>
                <MenuPreviewLabel label="active">
                  <MenuPreviewSurface rowState="active" />
                </MenuPreviewLabel>
                <MenuPreviewLabel label="focus">
                  <MenuPreviewSurface rowState="focus" />
                </MenuPreviewLabel>
                <MenuPreviewLabel label="disabled">
                  <MenuPreviewSurface rowState="disabled" />
                </MenuPreviewLabel>
              </div>
            </div>
            <div>
              <h3 className="menu-preview-subtitle">Variations</h3>
              <div className="menu-preview-grid">
                <MenuPreviewLabel label="none">
                  <MenuPreviewSurface />
                </MenuPreviewLabel>
                <MenuPreviewLabel label="icon">
                  <MenuPreviewSurface leading="icon" />
                </MenuPreviewLabel>
                <MenuPreviewLabel label="checkbox">
                  <MenuPreviewSurface leading="checkbox" />
                </MenuPreviewLabel>
                <MenuPreviewLabel label="radio-button">
                  <MenuPreviewSurface leading="radio" />
                </MenuPreviewLabel>
                <MenuPreviewLabel label="segmented">
                  <MenuPreviewSurface segmented />
                </MenuPreviewLabel>
                <MenuPreviewLabel label="segmented: section-heading">
                  <MenuPreviewSurface sectionHeading />
                </MenuPreviewLabel>
              </div>
            </div>
          </div>
        </ExampleCard>

        <ExampleCard
          description="Scrolling appears when the menu content extends beyond the available popover height."
          title="Scrollable content"
        >
          <div className="menu-preview-grid menu-preview-grid-tight">
            <MenuPreviewLabel label="scrollable">
              <MenuPreviewSurface scrollable />
            </MenuPreviewLabel>
          </div>
        </ExampleCard>

        <ExampleCard title="Edge cases">
          <div className="menu-preview-grid menu-preview-grid-tight">
            <MenuPreviewLabel label="option-label-truncation">
              <MenuPreviewSurface longOption />
            </MenuPreviewLabel>
            <MenuPreviewLabel label="heading-truncation">
              <MenuPreviewSurface longHeading sectionHeading />
            </MenuPreviewLabel>
          </div>
        </ExampleCard>
      </div>
    </div>
  );
}

export function SeparatorPage() {
  return (
    <div className="docs-page">
      <PageHeader
        description="A Separator creates clear boundaries between groups of content or interface components without adding visual clutter."
        eyebrow="Components"
        title="Separator"
      />
      <div className="component-grid one">
        <ExampleCard title="Sizes">
          <div className="separator-preview-grid">
            <div className="separator-preview-item">
              <span className="separator-preview-label">0.5: extra-thin</span>
              <Separator thickness="extra-thin" />
            </div>
            <div className="separator-preview-item">
              <span className="separator-preview-label">1: thin</span>
              <Separator />
            </div>
            <div className="separator-preview-item">
              <span className="separator-preview-label">1.5: medium</span>
              <Separator thickness="medium" />
            </div>
            <div className="separator-preview-item">
              <span className="separator-preview-label">2: thick</span>
              <Separator thickness="thick" />
            </div>
          </div>
        </ExampleCard>

        <ExampleCard title="Styles">
          <div className="separator-preview-grid separator-preview-grid-three">
            <div className="separator-preview-item">
              <span className="separator-preview-label">subtle</span>
              <Separator />
            </div>
            <div className="separator-preview-item">
              <span className="separator-preview-label">mild</span>
              <Separator tone="mild" />
            </div>
            <div className="separator-preview-item">
              <span className="separator-preview-label">strong</span>
              <Separator tone="strong" />
            </div>
          </div>
        </ExampleCard>
      </div>
    </div>
  );
}

export function SelectionPage() {
  return (
    <div className="docs-page">
      <PageHeader
        description="Selectable card rows for account, role, or profile switching surfaces."
        eyebrow="Custom Components"
        title="Selection"
      />
      <div className="component-grid">
        <ExampleCard
          title="Selection cards"
        >
          <div className="control-stack" style={{ maxWidth: 380, width: "100%" }}>
            <SelectionCard layout="desktop">Administrator companie</SelectionCard>
            <SelectionCard layout="desktop" selected>
              Contabil
            </SelectionCard>
            <SelectionCard layout="mobile">Reprezentant</SelectionCard>
            <SelectionCard layout="mobile" selected>
              Inspector
            </SelectionCard>
          </div>
        </ExampleCard>
      </div>
    </div>
  );
}

export function TagsPage() {
  return (
    <div className="docs-page">
      <PageHeader
        description="Tags categorize or label content inside an interface. Use tags for item state and info tags for lightweight contextual metadata."
        eyebrow="Components"
        title="Tags"
      />
      <div className="component-grid one">
        <ExampleCard
          description="Tags communicate item states such as active, pending, completed, or rejected."
          title="Tag sizes"
        >
          <div className="tag-preview-row">
            <TagPreviewItem label="medium">
              <Tag tone="success" variant="strong">
                Label
              </Tag>
            </TagPreviewItem>
            <TagPreviewItem label="small">
              <Tag size="sm" tone="success" variant="strong">
                Label
              </Tag>
            </TagPreviewItem>
          </div>
        </ExampleCard>

        <ExampleCard title="Tag variations">
          <div className="tag-preview-row">
            <TagPreviewItem label="icon-none">
              <Tag tone="neutral" variant="subtle">
                Label
              </Tag>
            </TagPreviewItem>
            <TagPreviewItem label="icon-leading">
              <Tag tone="neutral" variant="subtle">
                <MudIcon name="Outlined/16/checkmark-small" size="sm" />
                Label
              </Tag>
            </TagPreviewItem>
          </div>
        </ExampleCard>

        <ExampleCard title="Tag types">
          <div className="tag-preview-row">
            <TagPreviewItem label="subtle">
              <Tag tone="neutral" variant="subtle">
                Label
              </Tag>
            </TagPreviewItem>
            <TagPreviewItem label="strong">
              <Tag tone="neutral" variant="strong">
                Label
              </Tag>
            </TagPreviewItem>
            <TagPreviewItem label="outlined">
              <Tag tone="neutral" variant="outlined">
                Label
              </Tag>
            </TagPreviewItem>
          </div>
        </ExampleCard>

        <ExampleCard title="Tag styles">
          <div className="tag-preview-stack">
            <div>
              <h3 className="tag-preview-subtitle">Icon-none</h3>
              <TagStyleMatrix />
            </div>
            <div>
              <h3 className="tag-preview-subtitle">Icon-leading</h3>
              <TagStyleMatrix withIcon />
            </div>
          </div>
        </ExampleCard>

        <ExampleCard
          description="Horizontal tag groups use 8px spacing between tags."
          title="Tag group"
        >
          <div className="tag-preview-row">
            <TagGroup>
              <Tag tone="accent" variant="strong">
                Label
              </Tag>
              <Tag tone="neutral" variant="subtle">
                Label
              </Tag>
              <Tag tone="neutral" variant="subtle">
                Label
              </Tag>
              <Tag tone="neutral" variant="subtle">
                Label
              </Tag>
            </TagGroup>
            <span className="tag-preview-note">horizontal-stack</span>
          </div>
        </ExampleCard>

        <ExampleCard
          description="Info tags display supplementary metadata such as timestamps, article categories, or content status."
          title="Info tag"
        >
          <div className="tag-preview-stack">
            <div>
              <h3 className="tag-preview-subtitle">Variations</h3>
              <div className="tag-preview-row">
                <TagPreviewItem label="icon-none">
                  <InfoTag>Info</InfoTag>
                </TagPreviewItem>
                <TagPreviewItem label="icon-leading">
                  <InfoTag>
                    <MudIcon name="Outlined/16/time" size="sm" />
                    Info
                  </InfoTag>
                </TagPreviewItem>
              </div>
            </div>
            <div>
              <h3 className="tag-preview-subtitle">Types</h3>
              <div className="tag-preview-row">
                <TagPreviewItem label="strong">
                  <InfoTag>
                    <MudIcon name="Outlined/16/time" size="sm" />
                    Info
                  </InfoTag>
                </TagPreviewItem>
                <TagPreviewItem label="subtle">
                  <InfoTag variant="subtle">
                    <MudIcon name="Outlined/16/time" size="sm" />
                    Info
                  </InfoTag>
                </TagPreviewItem>
              </div>
            </div>
          </div>
        </ExampleCard>
      </div>
    </div>
  );
}

export function InputTextPage() {
  return (
    <div className="docs-page">
      <PageHeader
        description="Text inputs collect user-entered values with consistent labels, sizing, validation tones, icons, and assistive messages."
        eyebrow="Components"
        title="Input: Text"
      />
      <div className="component-grid one">
        <ExampleCard title="Styles">
          <div className="text-input-preview-row">
            <TextInputPreviewItem label="default">
              <TextInput placeholder="Placeholder" />
            </TextInputPreviewItem>
            <TextInputPreviewItem label="warning">
              <TextInput
                leadingIcon={<TextInputEmailIcon inputSize="lg" />}
                placeholder="Placeholder"
                tone="warning"
              />
            </TextInputPreviewItem>
            <TextInputPreviewItem label="destructive">
              <TextInput placeholder="Placeholder" tone="destructive" />
            </TextInputPreviewItem>
          </div>
        </ExampleCard>

        <ExampleCard title="Sizes">
          <div className="text-input-preview-row">
            <TextInputPreviewItem label="medium">
              <TextInput inputSize="md" placeholder="Placeholder" />
            </TextInputPreviewItem>
            <TextInputPreviewItem label="large">
              <TextInput placeholder="Placeholder" />
            </TextInputPreviewItem>
          </div>
        </ExampleCard>

        <ExampleCard title="Variations">
          <div className="text-input-preview-stack">
            <div>
              <h3 className="text-input-preview-subtitle">Medium</h3>
              <TextInputVariationSet inputSize="md" />
            </div>
            <div>
              <h3 className="text-input-preview-subtitle">Large</h3>
              <TextInputVariationSet inputSize="lg" />
            </div>
          </div>
        </ExampleCard>

        <ExampleCard title="States">
          <div className="text-input-state-grid">
            {textInputTones.map(({ label, tone }) => (
              <TextInputStateColumn key={label} label={label} tone={tone} />
            ))}
          </div>
          <div className="text-input-preview-row text-input-preview-row-single">
            <TextInputPreviewItem label="default: read-only">
              <TextInput
                defaultValue="Placeholder"
                placeholder="Placeholder"
                readOnly
                trailingIcon={
                  <MudIcon name="Outlined/24/checkmark-small" size="lg" tone="positive" />
                }
              />
            </TextInputPreviewItem>
          </div>
        </ExampleCard>

        <ExampleCard
          description="Assistive text gives additional guidance below the field and uses the same tone as the input state."
          title="Assistive text"
        >
          <div className="text-input-preview-row">
            <TextInputPreviewItem label="default">
              <TextInput
                assistiveText="Helper message displayed here"
                placeholder="Placeholder"
              />
            </TextInputPreviewItem>
            <TextInputPreviewItem label="warning">
              <TextInput
                assistiveText="Warning message displayed here"
                placeholder="Placeholder"
                tone="warning"
              />
            </TextInputPreviewItem>
            <TextInputPreviewItem label="destructive">
              <TextInput
                assistiveText="Error message displayed here"
                placeholder="Placeholder"
                tone="destructive"
              />
            </TextInputPreviewItem>
            <TextInputPreviewItem label="success">
              <TextInput
                assistiveText="Success message displayed here"
                placeholder="Placeholder"
                tone="success"
              />
            </TextInputPreviewItem>
          </div>
        </ExampleCard>

        <ExampleCard
          description="Long values keep the input width stable while the visible text position reflects the current cursor or scroll position."
          title="Overflow"
        >
          <div className="text-input-preview-row">
            <TextInputPreviewItem label="click-inside">
              <TextInput
                defaultValue="By continuing, you acknowledge th"
                placeholder="Placeholder"
                previewState="focus"
              />
            </TextInputPreviewItem>
            <TextInputPreviewItem label="overflow-left">
              <TextInput
                defaultValue="propriate backups have been made."
                placeholder="Placeholder"
                previewState="focus"
              />
            </TextInputPreviewItem>
            <TextInputPreviewItem label="overflow-right">
              <TextInput
                defaultValue="By continuing, you acknowledg..."
                placeholder="Placeholder"
              />
            </TextInputPreviewItem>
          </div>
        </ExampleCard>

        <ExampleCard
          description="The clear button appears as a trailing control when the input contains text."
          title="Clearing input"
        >
          <div className="text-input-preview-row">
            <TextInputPreviewItem label="focus">
              <TextInput
                clearable
                defaultValue="Populating"
                onClear={() => undefined}
                placeholder="Placeholder"
                previewState="focus"
              />
            </TextInputPreviewItem>
            <TextInputPreviewItem label="filled">
              <TextInput
                clearable
                defaultValue="Populated"
                onClear={() => undefined}
                placeholder="Placeholder"
              />
            </TextInputPreviewItem>
          </div>
        </ExampleCard>
      </div>
    </div>
  );
}

export function InputTextareaPage() {
  return (
    <div className="docs-page">
      <PageHeader
        description="Textareas support longer multi-line content with labels, validation, captions, character counters, and stable overflow behavior."
        eyebrow="Components"
        title="Input: Textarea"
      />
      <div className="component-grid one">
        <ExampleCard title="Styles">
          <div className="text-area-preview-row">
            <TextAreaPreviewItem label="default">
              <TextArea placeholder="Placeholder" />
            </TextAreaPreviewItem>
            <TextAreaPreviewItem label="destructive">
              <TextArea placeholder="Placeholder" tone="destructive" />
            </TextAreaPreviewItem>
          </div>
        </ExampleCard>

        <ExampleCard title="States">
          <div className="text-area-state-grid">
            <TextAreaStateColumn tone="default" />
            <TextAreaStateColumn tone="destructive" />
          </div>
        </ExampleCard>

        <ExampleCard
          description="Assistive text gives persistent guidance below the field and follows the field tone."
          title="Assistive text"
        >
          <div className="text-area-preview-row">
            <TextAreaPreviewItem label="default">
              <TextArea
                assistiveText="Helper message displayed here"
                placeholder="Placeholder"
              />
            </TextAreaPreviewItem>
            <TextAreaPreviewItem label="destructive">
              <TextArea
                assistiveText="Error message displayed here"
                placeholder="Placeholder"
                tone="destructive"
              />
            </TextAreaPreviewItem>
          </div>
        </ExampleCard>

        <ExampleCard
          description="A character counter is displayed when a character limit is set and updates as the user types."
          title="Character counter"
        >
          <div className="text-area-preview-row">
            <TextAreaPreviewItem label="default">
              <TextArea
                characterCounter="0/500"
                placeholder="Placeholder"
                showCharacterCounter
              />
            </TextAreaPreviewItem>
            <TextAreaPreviewItem label="w/ assistive-text">
              <TextArea
                assistiveText="Helper message displayed here"
                characterCounter="0/500"
                placeholder="Placeholder"
                showCharacterCounter
              />
            </TextAreaPreviewItem>
          </div>
        </ExampleCard>

        <ExampleCard title="Specifications">
          <div className="text-area-preview-row">
            <TextAreaPreviewItem label="spacings">
              <TextArea placeholder="Placeholder" />
            </TextAreaPreviewItem>
            <TextAreaPreviewItem label="scrollable-content">
              <TextArea
                defaultValue={textAreaOverflowValue}
                placeholder="Placeholder"
                textareaClassName="text-area-scrollable-content"
              />
            </TextAreaPreviewItem>
          </div>
        </ExampleCard>

        <ExampleCard
          description="Long labels and assistive messages keep the control width stable while truncating text to the intended line count."
          title="Edge cases"
        >
          <div className="text-area-preview-row">
            <TextAreaPreviewItem label="label">
              <TextArea label={textAreaLongLabel} placeholder="Placeholder" />
              <p className="text-area-preview-note">
                The top label should be truncated on the first line.
              </p>
            </TextAreaPreviewItem>
            <TextAreaPreviewItem label="assistive-text">
              <TextArea
                assistiveText={textAreaLongAssistive}
                placeholder="Placeholder"
              />
              <p className="text-area-preview-note">
                The assistive text should be truncated on the second line.
              </p>
            </TextAreaPreviewItem>
          </div>
        </ExampleCard>
      </div>
    </div>
  );
}

export function InputSearchPage() {
  return (
    <div className="docs-page">
      <PageHeader
        description="Search inputs let users enter queries quickly with consistent shapes, sizing, clear actions, submit controls, and interaction states."
        eyebrow="Components"
        title="Input: Search"
      />
      <div className="component-grid one">
        <ExampleCard title="Shapes">
          <div className="search-input-preview-row">
            <SearchInputPreviewItem label="rectangular">
              <SearchInputPreviewField />
            </SearchInputPreviewItem>
            <SearchInputPreviewItem label="circular">
              <SearchInputPreviewField shape="circular" />
            </SearchInputPreviewItem>
          </div>
        </ExampleCard>

        <ExampleCard title="Sizes">
          <div className="search-input-preview-row">
            <SearchInputPreviewItem label="medium">
              <SearchInputPreviewField inputSize="md" />
            </SearchInputPreviewItem>
            <SearchInputPreviewItem label="large">
              <SearchInputPreviewField />
            </SearchInputPreviewItem>
          </div>
        </ExampleCard>

        <ExampleCard title="Variations">
          <div className="search-input-preview-row">
            <SearchInputPreviewItem label="rectangular: w/ button">
              <SearchInputPreviewField
                previewState="focus-populated"
                showSubmitButton
                value="Placeholder"
              />
            </SearchInputPreviewItem>
            <SearchInputPreviewItem label="circular: w/ button">
              <SearchInputPreviewField
                previewState="focus-populated"
                shape="circular"
                showSubmitButton
                value="Placeholder"
              />
            </SearchInputPreviewItem>
          </div>
        </ExampleCard>

        <ExampleCard title="States">
          <div className="search-input-state-grid">
            <SearchInputStateColumn shape="rectangular" />
            <SearchInputStateColumn shape="circular" />
          </div>
        </ExampleCard>
      </div>
    </div>
  );
}

export function InputSelectPage() {
  return (
    <div className="docs-page">
      <PageHeader
        description="Select inputs choose one value from a known set of options with consistent labels, sizing, validation, menus, and assistive messages."
        eyebrow="Components"
        title="Input: Select"
      />
      <div className="component-grid one">
        <ExampleCard title="Styles">
          <div className="select-input-preview-row">
            <SelectInputPreviewItem label="default">
              <SelectInputPreviewField />
            </SelectInputPreviewItem>
            <SelectInputPreviewItem label="destructive">
              <SelectInputPreviewField tone="destructive" />
            </SelectInputPreviewItem>
          </div>
        </ExampleCard>

        <ExampleCard title="Sizes">
          <div className="select-input-preview-row">
            <SelectInputPreviewItem label="medium">
              <SelectInputPreviewField inputSize="md" />
            </SelectInputPreviewItem>
            <SelectInputPreviewItem label="large">
              <SelectInputPreviewField />
            </SelectInputPreviewItem>
          </div>
        </ExampleCard>

        <ExampleCard title="States">
          <div className="select-input-state-grid">
            <SelectInputStateColumn tone="default" />
            <SelectInputStateColumn tone="destructive" />
          </div>
        </ExampleCard>

        <ExampleCard
          description="Assistive text gives persistent guidance below the field and follows the field tone."
          title="Assistive text"
        >
          <div className="select-input-preview-row">
            <SelectInputPreviewItem label="default">
              <SelectInputPreviewField assistiveText="Helper message displayed here" />
            </SelectInputPreviewItem>
            <SelectInputPreviewItem label="destructive">
              <SelectInputPreviewField
                assistiveText="Error message displayed here"
                tone="destructive"
              />
            </SelectInputPreviewItem>
          </div>
        </ExampleCard>

        <ExampleCard
          description="Long labels, values, and assistive messages keep the control width stable while truncating to the intended line count."
          title="Edge cases"
        >
          <div className="select-input-preview-row">
            <SelectInputPreviewItem label="label">
              <SelectInputPreviewField label={selectInputLongLabel} />
              <p className="select-input-preview-note">
                The top label should be truncated on the first line.
              </p>
            </SelectInputPreviewItem>
            <SelectInputPreviewItem label="input-text">
              <SelectInputPreviewField
                placeholder={selectInputLongAssistive}
                previewState="filled"
              />
              <p className="select-input-preview-note">
                Content that extends beyond the width of the field is truncated before the icon.
              </p>
            </SelectInputPreviewItem>
            <SelectInputPreviewItem label="assistive-text">
              <SelectInputPreviewField assistiveText={selectInputLongAssistive} />
              <p className="select-input-preview-note">
                The assistive text should be truncated on the second line.
              </p>
            </SelectInputPreviewItem>
          </div>
        </ExampleCard>
      </div>
    </div>
  );
}

export function BadgesPage() {
  return (
    <div className="docs-page">
      <PageHeader
        description="Badges represent compact counts, notification dots, or short numeric indicators. Use tags instead for long semantic status labels."
        eyebrow="Components"
        title="Badges"
      />
      <div className="component-grid one">
        <ExampleCard title="Numbered badge styles">
          <div className="badge-preview-row">
            {numberedBadgeStyles.map(({ label, variant }) => (
              <div className="badge-preview-item" key={label}>
                <Badge size="large" variant={variant}>
                  1
                </Badge>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </ExampleCard>

        <ExampleCard title="Numbered badge sizes">
          <div className="badge-preview-row">
            {numberedBadgeSizes.map(({ label, size }) => (
              <div className="badge-preview-item" key={label}>
                <Badge size={size} variant="accent">
                  1
                </Badge>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </ExampleCard>

        <ExampleCard title="Numbered badge usage and behavior">
          <div className="badge-preview-stack">
            <div className="badge-preview-row">
              <div className="badge-filter-chip">
                <span>Label</span>
                <Badge size="medium" variant="light">
                  1
                </Badge>
              </div>
              <div className="badge-tabs-preview">
                <span>Label</span>
                <Badge size="extra-large" variant="neutral">
                  1
                </Badge>
              </div>
            </div>

            <div className="badge-preview-row">
              {badgeBehaviorCounts.map(({ label, value }) => (
                <div className="badge-filter-behavior" key={label}>
                  <div className="badge-filter-chip">
                    <span>Label</span>
                    <Badge size="large" variant="light">
                      {value}
                    </Badge>
                  </div>
                  <span className="badge-preview-caption">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </ExampleCard>

        <ExampleCard title="Notification badge types">
          <div className="badge-preview-row">
            <div className="badge-preview-item">
              <Badge size="large" type="dot" variant="notification" />
              <span>dot</span>
            </div>
            <div className="badge-preview-item">
              <Badge size="large" type="numbered" variant="notification">
                1
              </Badge>
              <span>numbered</span>
            </div>
          </div>
        </ExampleCard>

        <ExampleCard title="Notification badge sizes">
          <div className="badge-preview-stack">
            <div className="badge-preview-row badge-size-row">
              {notificationDotSizes.map(({ label, size }) => (
                <div className="badge-preview-item stacked" key={label}>
                  <Badge size={size} type="dot" variant="notification" />
                  <span>{label}</span>
                  <span className="badge-preview-detail">dot</span>
                </div>
              ))}
            </div>
            <div className="badge-preview-row badge-size-row">
              {notificationNumberedSizes.map(({ label, size }) => (
                <div className="badge-preview-item stacked" key={label}>
                  <Badge size={size} type="numbered" variant="notification">
                    1
                  </Badge>
                  <span>{label}</span>
                  <span className="badge-preview-detail">numbered</span>
                </div>
              ))}
            </div>
          </div>
        </ExampleCard>

        <ExampleCard title="Notification badge usage and behavior">
          <div className="badge-preview-stack">
            <div className="badge-preview-row">
              <div className="badge-sidebar-example">
                <MudIcon name="Outlined/20/page-text" size="md" />
                <span>Primary Label</span>
                <Badge size="extra-large" type="numbered" variant="notification">
                  1
                </Badge>
              </div>
              <span className="badge-avatar-example">
                <Avatar size="md">
                  <AvatarFallback>MD</AvatarFallback>
                </Avatar>
                <Badge
                  className="badge-avatar-notification md"
                  size="medium"
                  type="numbered"
                  variant="notification"
                >
                  1
                </Badge>
              </span>
            </div>

            <div className="badge-preview-row">
              {badgeBehaviorCounts.map(({ label, value }) => (
                <div className="badge-avatar-behavior" key={label}>
                  <span className="badge-avatar-example">
                    <Avatar size="lg">
                      <AvatarFallback>MD</AvatarFallback>
                    </Avatar>
                    <Badge
                      className="badge-avatar-notification lg"
                      size="large"
                      type="numbered"
                      variant="notification"
                    >
                      {value}
                    </Badge>
                  </span>
                  <span className="badge-preview-caption">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </ExampleCard>
      </div>
    </div>
  );
}

export function AvatarsPage() {
  return (
    <div className="docs-page">
      <PageHeader
        description="Avatars represent users or entities through photos, initials, icon fallbacks, notification indicators, and compact stacks."
        eyebrow="Components"
        title="Avatars"
      />
      <div className="component-grid one">
        <ExampleCard title="Types">
          <div className="avatar-preview-row">
            <AvatarPreviewItem label="photo">
              <AvatarPhoto size="medium" />
            </AvatarPreviewItem>
            <AvatarPreviewItem label="initials">
              <Avatar size="medium">
                <AvatarFallback>OP</AvatarFallback>
              </Avatar>
            </AvatarPreviewItem>
            <AvatarPreviewItem label="icon">
              <Avatar size="medium">
                <AvatarIconFallback />
              </Avatar>
            </AvatarPreviewItem>
          </div>
        </ExampleCard>

        <ExampleCard title="States">
          <div className="avatar-preview-row">
            <AvatarPreviewItem label="default">
              <AvatarPhoto size="medium" />
            </AvatarPreviewItem>
            <AvatarPreviewItem label="focus">
              <AvatarPhoto focused size="medium" />
            </AvatarPreviewItem>
          </div>
        </ExampleCard>

        <ExampleCard title="Sizes">
          <div className="avatar-preview-stack">
            <div className="avatar-preview-row">
              {avatarSizes.map(({ label, pixels, size }) => (
                <AvatarPreviewItem
                  key={`photo-${label}`}
                  label={label}
                  pixels={pixels}
                >
                  <AvatarPhoto size={size} />
                </AvatarPreviewItem>
              ))}
            </div>
            <div className="avatar-preview-row">
              {avatarSizes.map(({ label, pixels, size }) => (
                <AvatarPreviewItem
                  key={`initials-${label}`}
                  label={label}
                  pixels={pixels}
                >
                  <Avatar size={size}>
                    <AvatarFallback>OP</AvatarFallback>
                  </Avatar>
                </AvatarPreviewItem>
              ))}
            </div>
            <div className="avatar-preview-row">
              {avatarSizes.map(({ label, pixels, size }) => (
                <AvatarPreviewItem
                  key={`icon-${label}`}
                  label={label}
                  pixels={pixels}
                >
                  <Avatar size={size}>
                    <AvatarIconFallback />
                  </Avatar>
                </AvatarPreviewItem>
              ))}
            </div>
          </div>
        </ExampleCard>

        <ExampleCard title="Notifications">
          <div className="avatar-preview-stack">
            <div>
              <h3 className="avatar-preview-subtitle">Numbered</h3>
              <div className="avatar-preview-row">
                {avatarSizes.map(({ label, pixels, size }) => (
                  <AvatarPreviewItem
                    key={`numbered-${label}`}
                    label={label}
                    pixels={pixels}
                  >
                    <AvatarPhoto notification={1} size={size} />
                  </AvatarPreviewItem>
                ))}
              </div>
            </div>
            <div>
              <h3 className="avatar-preview-subtitle">Dot</h3>
              <div className="avatar-preview-row">
                {avatarSizes.map(({ label, pixels, size }) => (
                  <AvatarPreviewItem
                    key={`dot-${label}`}
                    label={label}
                    pixels={pixels}
                  >
                    <AvatarPhoto notification="dot" size={size} />
                  </AvatarPreviewItem>
                ))}
              </div>
            </div>
          </div>
        </ExampleCard>

        <ExampleCard title="Stacks">
          <div className="avatar-preview-stack">
            <p className="avatar-preview-description">
              Avatar stacks represent a group of users or entities in a compact
              visual format.
            </p>
            <div className="avatar-preview-row">
              <div className="avatar-preview-stack-item">
                <span>{"<=3-items"}</span>
                <AvatarStack size="medium">
                  <Avatar size="medium">
                    <AvatarImage alt="" src={avatarStack1Src} />
                  </Avatar>
                  <Avatar size="medium">
                    <AvatarImage alt="" src={avatarStack2Src} />
                  </Avatar>
                  <Avatar size="medium">
                    <AvatarImage alt="" src={avatarStack3Src} />
                  </Avatar>
                </AvatarStack>
              </div>
              <div className="avatar-preview-stack-item">
                <span>{">3-items"}</span>
                <AvatarStack size="medium">
                  <Avatar size="medium">
                    <AvatarImage alt="" src={avatarStack1Src} />
                  </Avatar>
                  <Avatar size="medium">
                    <AvatarImage alt="" src={avatarStack2Src} />
                  </Avatar>
                  <Avatar size="medium">
                    <AvatarImage alt="" src={avatarStack3Src} />
                  </Avatar>
                  <AvatarStackOverflow count={5} size="medium" />
                </AvatarStack>
              </div>
            </div>
          </div>
        </ExampleCard>
      </div>
    </div>
  );
}

type TablePreviewDensity = Extract<
  NonNullable<ComponentProps<typeof Table>["density"]>,
  "desktop" | "mobile"
>;
type TablePreviewHeaderStyle = NonNullable<
  ComponentProps<typeof Table>["headerStyle"]
>;

const tableHeaders = Array.from({ length: 6 }, () => "Title");
const tableRows = Array.from({ length: 5 }, () =>
  Array.from({ length: 6 }, () => "Value"),
);

function TablePreviewLabel({ children }: { children: ReactNode }) {
  return <p className="table-preview-label">{children}</p>;
}

function TablePreviewItem({
  children,
  label,
}: {
  children: ReactNode;
  label: string;
}) {
  return (
    <div className="table-preview-item">
      <TablePreviewLabel>{label}</TablePreviewLabel>
      <div className="table-preview-scroll">{children}</div>
    </div>
  );
}

function TableDemo({
  columns = 6,
  density = "desktop",
  headerStyle = "subtle",
  sortColumns = [],
  width = 860,
  zebra = true,
}: {
  columns?: number;
  density?: TablePreviewDensity;
  headerStyle?: TablePreviewHeaderStyle;
  sortColumns?: number[];
  width?: number;
  zebra?: boolean;
}) {
  const visibleHeaders = tableHeaders.slice(0, columns);
  const visibleRows = tableRows.map((row) => row.slice(0, columns));
  const tableStyle = { minWidth: width, width } satisfies CSSProperties;

  return (
    <Table
      className="table-preview-demo-table"
      density={density}
      headerStyle={headerStyle}
      responsive={false}
      style={tableStyle}
      zebra={zebra}
    >
      <TableHeader>
        <TableRow>
          {visibleHeaders.map((header, index) => (
            <TableHead key={`${header}-${index}`}>
              {sortColumns.includes(index) ? (
                <TableSortButton>{header}</TableSortButton>
              ) : (
                header
              )}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {visibleRows.map((row, rowIndex) => (
          <TableRow key={`row-${rowIndex}`}>
            {row.map((cell, cellIndex) => (
              <TableCell key={`${rowIndex}-${cellIndex}`}>{cell}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function TableDataTypePreview({
  children,
  dataType,
  label,
  width,
}: {
  children: ReactNode;
  dataType: ComponentProps<typeof TableCell>["dataType"];
  label: string;
  width: number;
}) {
  const tableStyle = { minWidth: width, width } satisfies CSSProperties;

  return (
    <TablePreviewItem label={label}>
      <Table
        className="table-preview-data-table"
        responsive={false}
        style={tableStyle}
        zebra={false}
      >
        <TableBody>
          <TableRow>
            <TableCell dataType={dataType}>{children}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TablePreviewItem>
  );
}

function TableLongTextDemo() {
  const tableStyle = { minWidth: 520, width: 520 } satisfies CSSProperties;
  const labelColumnStyle = {
    color: "var(--color-text-base-default)",
    fontSize: "var(--text-body-sm-font-size)",
    fontWeight: "var(--text-body-sm-font-weight)",
    lineHeight: "var(--text-body-sm-line-height)",
  } satisfies CSSProperties;

  return (
    <Table
      headerStyle="white"
      responsive={false}
      style={tableStyle}
      zebra={false}
    >
      <TableHeader>
        <TableRow>
          <TableHead
            maxLines="none"
            style={{ ...labelColumnStyle, width: 168 }}
          >
            Header clamp
          </TableHead>
          <TableHead maxLines={2}>
            Very long value column title that should stop after the second line
            with an ellipsis visible in the header preview before the full
            sentence can continue
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell maxLines="none" style={labelColumnStyle}>
            Value clamp
          </TableCell>
          <TableCell>
            Agenția Națională pentru Siguranța Alimentelor și Protecția
            Consumatorilor din Republica Moldova gestionează un volum extins de
            informații despre control, autoritate, companie, adresă, persoane de
            contact, documente asociate, note operaționale și alte detalii care
            pot depăși spațiul disponibil într-un tabel compact. Textul continuă
            cu observații suplimentare, termene, responsabilități, verificări și
            context administrativ care trebuie protejat de o limită vizuală
            sigură.
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell maxLines="none" style={labelColumnStyle}>
            Link clamp
          </TableCell>
          <TableCell dataType="link">
            <Link href="#" visited={false}>
              Vezi detalii despre controlul planificat pentru compania
              EcoConstruct Chișinău Est, inclusiv istoricul cererilor,
              documentele atașate, rezultatele anterioare și următoarele acțiuni
              necesare. Textul linkului continuă intenționat pentru a demonstra
              că și valorile de tip link se opresc după cinci linii.
            </Link>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell maxLines="none" style={labelColumnStyle}>
            Tag wrapping
          </TableCell>
          <TableCell dataType="tag">
            <TagGroup>
              <Tag size="md" tone="brand" variant="outlined">
                Planificat
              </Tag>
              <Tag size="md" tone="positive" variant="outlined">
                Finalizat
              </Tag>
              <Tag size="md" tone="neutral" variant="subtle">
                Control repetat cu text lung
              </Tag>
            </TagGroup>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

export function TablePage() {
  return (
    <div className="docs-page">
      <PageHeader
        description="Desktop tables organize row data with sortable headers, consistent spacing, and status-rich cells."
        eyebrow="Components"
        title="Table"
      />
      <div className="component-grid one">
        <ExampleCard title="Breakpoints">
          <div className="table-preview-grid two">
            <TablePreviewItem label="desktop">
              <TableDemo width={860} />
            </TablePreviewItem>
            <TablePreviewItem label="mobile">
              <TableDemo density="mobile" width={560} />
            </TablePreviewItem>
          </div>
        </ExampleCard>

        <ExampleCard title="Header Styles">
          <div className="table-preview-stack">
            <div className="table-preview-grid two">
              <TablePreviewItem label="subtle">
                <TableDemo headerStyle="subtle" width={860} />
              </TablePreviewItem>
              <TablePreviewItem label="strong">
                <TableDemo headerStyle="strong" width={860} />
              </TablePreviewItem>
            </div>
            <TablePreviewItem label="white">
              <TableDemo headerStyle="white" width={860} />
            </TablePreviewItem>
          </div>
        </ExampleCard>

        <ExampleCard title="Header Variations">
          <div className="table-preview-grid two">
            <TablePreviewItem label="icon-none">
              <TableDemo columns={5} width={860} />
            </TablePreviewItem>
            <TablePreviewItem label="trailing-icon">
              <TableDemo columns={5} sortColumns={[1, 3]} width={860} />
            </TablePreviewItem>
          </div>
        </ExampleCard>

        <ExampleCard title="Row Styles">
          <div className="table-preview-grid two">
            <TablePreviewItem label="default">
              <TableDemo
                columns={5}
                headerStyle="strong"
                width={547}
                zebra={false}
              />
            </TablePreviewItem>
            <TablePreviewItem label="zebra">
              <TableDemo columns={5} headerStyle="strong" width={860} />
            </TablePreviewItem>
          </div>
        </ExampleCard>

        <ExampleCard title="Data Types">
          <div className="table-preview-data-grid">
            <TableDataTypePreview dataType="text" label="text" width={144}>
              Value
            </TableDataTypePreview>
            <TableDataTypePreview dataType="number" label="number" width={144}>
              Value
            </TableDataTypePreview>
            <TableDataTypePreview dataType="link" label="link" width={144}>
              <Link href="#">Link</Link>
            </TableDataTypePreview>
            <TableDataTypePreview dataType="tag" label="tag" width={100}>
              <Tag size="md" tone="neutral" variant="subtle">
                Label
              </Tag>
            </TableDataTypePreview>
            <TableDataTypePreview dataType="checkbox" label="checkbox" width={68}>
              <TableCheckbox />
            </TableDataTypePreview>
            <TableDataTypePreview dataType="action" label="Action" width={68}>
              <TableActionButton />
            </TableDataTypePreview>
          </div>
        </ExampleCard>

        <ExampleCard title="Long Content">
          <TablePreviewItem label="title: 2 lines, value: 5 lines">
            <TableLongTextDemo />
          </TablePreviewItem>
        </ExampleCard>

      </div>
    </div>
  );
}

function TableCardPreviewAction({ label }: { label: string }) {
  return (
    <Button
      aria-label={label}
      className="table-card-preview-action"
      size="icon-sm"
      type="button"
      variant="ghost"
    >
      <MudIcon name="Outlined/24/more-horizontal" size="md" />
    </Button>
  );
}

function TableCardStatusTag() {
  return (
    <Tag size="md" tone="neutral" variant="outlined">
      <MudIcon name="Outlined/24/signature" />
      Semnată
    </Tag>
  );
}

function TableCardControlLinks() {
  return (
    <span className="detail-row-link-list">
      <span className="detail-row-link-item">
        <Link href="#control-578242" size="sm" underline={false} visited={false} weight="medium">
          #578242
        </Link>
        <span className="detail-row-comma">,</span>
      </span>
      <span className="detail-row-link-item">
        <Link href="#control-723737" size="sm" underline={false} visited={false} weight="medium">
          #723737
        </Link>
      </span>
    </span>
  );
}

function TableCardPreview({
  title,
  titleHref,
}: {
  title: string;
  titleHref?: string;
}) {
  return (
    <TableCard className="table-card-preview-card">
      <TableCardContent>
        <TableCardHeader>
          {titleHref ? (
            <TableCardTitle asChild tone="link">
              <a href={titleHref}>{title}</a>
            </TableCardTitle>
          ) : (
            <TableCardTitle>{title}</TableCardTitle>
          )}
          <TableCardAction>
            <TableCardPreviewAction label={`More actions for ${title}`} />
          </TableCardAction>
        </TableCardHeader>
        <TableCardSeparator />
        <TableCardRows>
          <TableCardRow label="Tip">Contestația controlului</TableCardRow>
          <TableCardSeparator />
          <TableCardRow label="Actualizat pe">12.01.2026</TableCardRow>
          <TableCardSeparator />
          <TableCardRow label="Statut">
            <TableCardStatusTag />
          </TableCardRow>
          <TableCardSeparator />
          <TableCardRow
            label="Controale"
            valueClassName="overflow-visible"
          >
            <TableCardControlLinks />
          </TableCardRow>
        </TableCardRows>
      </TableCardContent>
    </TableCard>
  );
}

export function TableCardPage() {
  return (
    <div className="docs-page">
      <PageHeader
        description="Table Card presents the same record structure in a compact card format for narrow surfaces."
        eyebrow="Components"
        title="Table Card"
      />
      <div className="component-grid one">
        <ExampleCard title="Usage examples">
          <div className="table-card-preview-stack">
            <TableCardPreview title="Simple title" />
            <TableCardPreview
              title="Link as title"
              titleHref="/table-card"
            />
          </div>
        </ExampleCard>

        <ExampleCard title="Long content">
          <div className="table-card-preview-stack">
            <TableCardPreview
              title="Plan intern de conformitate operațională value value value value value value value value value value value"
              titleHref="/table-card"
            />
          </div>
        </ExampleCard>
      </div>
    </div>
  );
}

export const TablesPage = TablePage;

export function OverlaysTabsPage() {
  return (
    <div className="docs-page">
      <PageHeader
        description="Overlay and tab primitives use Radix behavior with MUD-clone styling."
        eyebrow="Components"
        title="Overlays & Tabs"
      />
      <div className="component-grid">
        <ExampleCard title="Modal and dialog">
          <div className="inline-demo">
            <Modal>
              <ModalTrigger asChild>
                <Button variant="outline-neutral">Deschide modal</Button>
              </ModalTrigger>
              <ModalContent>
                <ModalHeader>
                  <ModalTitle>Detalii control</ModalTitle>
                  <ModalDescription>
                    Exemplu compact pentru verificarea modalului MUD-clone.
                  </ModalDescription>
                </ModalHeader>
                <ModalBody>
                  <DetailRow label="Companie">EcoConstruct Cahul</DetailRow>
                  <DetailRow label="Statut">
                    <Tag tone="warning" variant="outlined">
                      În proces
                    </Tag>
                  </DetailRow>
                </ModalBody>
                <ModalFooter>
                  <Button variant="outline-neutral">Anulează</Button>
                  <Button>Confirmă</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="secondary">Deschide dialog</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Confirmare</DialogTitle>
                  <DialogDescription>
                    Dialogul folosește același strat de fundații și focus.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline-neutral">Renunță</Button>
                  <Button>Aplică</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </ExampleCard>

        <ExampleCard title="Tabs">
          <Tabs defaultValue="active">
            <TabsList>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="done">Finalizate</TabsTrigger>
            </TabsList>
            <TabsContent value="active">
              <div className="tab-panel">2 controale active</div>
            </TabsContent>
            <TabsContent value="done">
              <div className="tab-panel">1 control finalizat</div>
            </TabsContent>
          </Tabs>
        </ExampleCard>
      </div>
    </div>
  );
}
