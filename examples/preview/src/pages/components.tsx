import {
  Fragment,
  type ComponentProps,
  type CSSProperties,
  type ReactNode,
} from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
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
  DateInput,
  DetailRow,
  FileInput,
  FileInputItem,
  FilterChip,
  InputChip,
  Link,
  NumericInput,
  PhoneNumberInput,
  RadioField,
  RadioGroup,
  RadioGroupItem,
  SearchInput,
  SegmentedControl,
  SegmentedControlItem,
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
  TabsList,
  TabsTrigger,
  Tooltip,
  TooltipBubble,
  InfoTag,
  Tag,
  TagGroup,
  TextArea,
  TextInput,
} from "@mud-clone";
import { Toast } from "@mud-clone/components/toast";
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
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@mud-clone/components/pagination";
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

type SegmentedPreviewState = "default" | "focus" | "hover";

const segmentedControlLongLabel =
  "Moldova's digital evolution is at the heart of seamless public service delivery";

function getSegmentedControlItems(count: number, labels?: readonly string[]) {
  return Array.from({ length: count }, (_, index) => ({
    label: labels?.[index] ?? "Label",
    value: `segment-${index + 1}`,
  }));
}

function SegmentedControlPreviewItem({
  children,
  label,
  note,
}: {
  children: ReactNode;
  label: string;
  note?: ReactNode;
}) {
  return (
    <div className="segmented-preview-item">
      <p>{label}</p>
      {children}
      {note ? <span>{note}</span> : null}
    </div>
  );
}

function SegmentedControlStateItem({
  state,
}: {
  state: SegmentedPreviewState;
}) {
  const previewState = state === "default" ? undefined : state;

  return (
    <SegmentedControlPreviewItem label={state}>
      <SegmentedControl
        aria-label={`Segmented control ${state} preview`}
        value="segment-1"
      >
        <SegmentedControlItem label="Label" value="segment-1" />
        <SegmentedControlItem
          label="Label"
          previewState={previewState}
          value="segment-2"
        />
      </SegmentedControl>
    </SegmentedControlPreviewItem>
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
type NumericInputTone = NonNullable<ComponentProps<typeof NumericInput>["tone"]>;
type NumericInputSize = NonNullable<ComponentProps<typeof NumericInput>["inputSize"]>;
type NumericInputPreviewState = ComponentProps<typeof NumericInput>["previewState"];
type DateInputTone = NonNullable<ComponentProps<typeof DateInput>["tone"]>;
type DateInputSize = NonNullable<ComponentProps<typeof DateInput>["inputSize"]>;
type DateInputPreviewState = ComponentProps<typeof DateInput>["previewState"];
type PhoneNumberInputTone = NonNullable<ComponentProps<typeof PhoneNumberInput>["tone"]>;
type PhoneNumberInputSize = NonNullable<ComponentProps<typeof PhoneNumberInput>["inputSize"]>;
type PhoneNumberInputPreviewState = ComponentProps<typeof PhoneNumberInput>["previewState"];

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

const numericInputTones: { label: string; tone: NumericInputTone }[] = [
  { label: "default", tone: "default" },
  { label: "destructive", tone: "destructive" },
  { label: "success", tone: "success" },
];

const numericInputStateRows: Record<
  NumericInputTone,
  {
    defaultValue?: string;
    disabled?: boolean;
    label: string;
    loading?: boolean;
    mandatory?: boolean;
    previewState?: NumericInputPreviewState;
    readOnly?: boolean;
  }[]
> = {
  default: [
    { label: "default" },
    { label: "hover", previewState: "hover" },
    { label: "focus-empty", previewState: "focus" },
    { defaultValue: "12345", label: "focus-populated", previewState: "focus" },
    { defaultValue: "12345", label: "loading", loading: true },
    { defaultValue: "12345", label: "filled" },
    { disabled: true, label: "disabled" },
    { label: "mandatory", mandatory: true },
    { defaultValue: "12345", label: "read-only", readOnly: true },
  ],
  destructive: [
    { label: "default" },
    { label: "hover", previewState: "hover" },
    { label: "focus-empty", previewState: "focus" },
    { defaultValue: "12345", label: "focus-populated", previewState: "focus" },
    { defaultValue: "12345", label: "loading", loading: true },
    { defaultValue: "12345", label: "filled" },
    { disabled: true, label: "disabled" },
    { label: "mandatory", mandatory: true },
  ],
  success: [
    { label: "default" },
    { label: "hover", previewState: "hover" },
    { label: "focus-empty", previewState: "focus" },
    { defaultValue: "12345", label: "focus-populated", previewState: "focus" },
    { defaultValue: "12345", label: "loading", loading: true },
    { defaultValue: "12345", label: "filled" },
    { disabled: true, label: "disabled" },
    { label: "mandatory", mandatory: true },
  ],
};

const dateInputTones: { label: string; tone: DateInputTone }[] = [
  { label: "default", tone: "default" },
  { label: "destructive", tone: "destructive" },
];

const dateInputStateRows: Record<
  DateInputTone,
  {
    defaultValue?: string;
    disabled?: boolean;
    label: string;
    mandatory?: boolean;
    previewState?: DateInputPreviewState;
  }[]
> = {
  default: [
    { label: "default" },
    { label: "hover", previewState: "hover" },
    { defaultValue: "15/04/2025", label: "focus-populated", previewState: "focus" },
    { defaultValue: "15/04/2025", label: "filled" },
    { disabled: true, label: "disabled" },
    { label: "mandatory", mandatory: true },
  ],
  destructive: [
    { label: "default" },
    { label: "hover", previewState: "hover" },
    { defaultValue: "15/04/2025", label: "focus-populated", previewState: "focus" },
    { defaultValue: "15/04/2025", label: "filled" },
    { disabled: true, label: "disabled" },
  ],
};

const phoneNumberInputTones: { label: string; tone: PhoneNumberInputTone }[] = [
  { label: "default", tone: "default" },
  { label: "warning", tone: "warning" },
  { label: "destructive", tone: "destructive" },
  { label: "success", tone: "success" },
];

const phoneNumberInputStateRows: Record<
  PhoneNumberInputTone,
  {
    defaultValue?: string;
    disabled?: boolean;
    label: string;
    loading?: boolean;
    mandatory?: boolean;
    previewState?: PhoneNumberInputPreviewState;
  }[]
> = {
  default: [
    { label: "default" },
    { label: "hover", previewState: "hover" },
    { label: "focus-empty", previewState: "focus" },
    { defaultValue: "69  123  456", label: "focus-populated", previewState: "focus" },
    { defaultValue: "69  123  456", label: "loading", loading: true },
    { defaultValue: "69  123  456", label: "filled" },
    { disabled: true, label: "disabled" },
    { label: "mandatory", mandatory: true },
  ],
  warning: [
    { label: "default" },
    { label: "hover", previewState: "hover" },
    { label: "focus-empty", previewState: "focus" },
    { defaultValue: "69  123  456", label: "focus-populated", previewState: "focus" },
    { defaultValue: "69  123  456", label: "filled" },
    { disabled: true, label: "disabled" },
    { label: "mandatory", mandatory: true },
  ],
  destructive: [
    { label: "default" },
    { label: "hover", previewState: "hover" },
    { label: "focus-empty", previewState: "focus" },
    { defaultValue: "69  123  456", label: "focus-populated", previewState: "focus" },
    { defaultValue: "69  123  456", label: "loading", loading: true },
    { defaultValue: "69  123  456", label: "filled" },
    { disabled: true, label: "disabled" },
    { label: "mandatory", mandatory: true },
  ],
  success: [
    { label: "default" },
    { label: "hover", previewState: "hover" },
    { label: "focus-empty", previewState: "focus" },
    { defaultValue: "69  123  456", label: "focus-populated", previewState: "focus" },
    { defaultValue: "69  123  456", label: "loading", loading: true },
    { defaultValue: "69  123  456", label: "filled" },
    { disabled: true, label: "disabled" },
    { label: "mandatory", mandatory: true },
  ],
};

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

function NumericInputCoinsIcon({ inputSize }: { inputSize: NumericInputSize }) {
  return (
    <MudIcon
      name="Outlined/24/coins"
      size={inputSize === "md" ? "md" : "lg"}
    />
  );
}

function NumericInputPreviewItem({
  children,
  label,
}: {
  children: ReactNode;
  label: string;
}) {
  return (
    <div className="numeric-input-preview-item">
      <span>{label}</span>
      {children}
    </div>
  );
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

function NumericInputVariationSet({ inputSize }: { inputSize: NumericInputSize }) {
  return (
    <div className="numeric-input-preview-row">
      <NumericInputPreviewItem label="none">
        <NumericInput inputSize={inputSize} placeholder="12345" />
      </NumericInputPreviewItem>
      <NumericInputPreviewItem label="prefix">
        <NumericInput inputSize={inputSize} placeholder="12345" prefix="€" />
      </NumericInputPreviewItem>
      <NumericInputPreviewItem label="suffix">
        <NumericInput inputSize={inputSize} placeholder="12345" suffix="lei" />
      </NumericInputPreviewItem>
      <NumericInputPreviewItem label="icon-leading">
        <NumericInput
          inputSize={inputSize}
          leadingIcon={<NumericInputCoinsIcon inputSize={inputSize} />}
          placeholder="12345"
          suffix="lei"
        />
      </NumericInputPreviewItem>
    </div>
  );
}

function NumericInputStateColumn({
  label,
  tone,
}: {
  label: string;
  tone: NumericInputTone;
}) {
  return (
    <div className="numeric-input-state-column">
      {numericInputStateRows[tone].map((state) => (
        <NumericInputPreviewItem
          key={`${label}-${state.label}`}
          label={`${label}: ${state.label}`}
        >
          <NumericInput
            defaultValue={state.defaultValue}
            disabled={state.disabled}
            loading={state.loading}
            mandatory={state.mandatory}
            placeholder="12345"
            previewState={state.previewState}
            readOnly={state.readOnly}
            required={state.mandatory}
            suffix="lei"
            tone={tone}
          />
        </NumericInputPreviewItem>
      ))}
    </div>
  );
}

function DateInputPreviewItem({
  children,
  label,
  note,
}: {
  children: ReactNode;
  label: string;
  note?: ReactNode;
}) {
  return (
    <div className="date-input-preview-item">
      <span>{label}</span>
      {children}
      {note && <p className="date-input-preview-note">{note}</p>}
    </div>
  );
}

function DateInputStateColumn({
  label,
  tone,
}: {
  label: string;
  tone: DateInputTone;
}) {
  return (
    <div className="date-input-state-column">
      {dateInputStateRows[tone].map((state) => (
        <DateInputPreviewItem
          key={`${label}-${state.label}`}
          label={`${label}: ${state.label}`}
        >
          <DateInput
            defaultValue={state.defaultValue}
            disabled={state.disabled}
            inputSize="lg"
            mandatory={state.mandatory}
            previewState={state.previewState}
            required={state.mandatory}
            tone={tone}
          />
        </DateInputPreviewItem>
      ))}
    </div>
  );
}

function DateInputSizeExample({
  inputSize,
  label,
}: {
  inputSize: DateInputSize;
  label: string;
}) {
  return (
    <DateInputPreviewItem label={label}>
      <DateInput inputSize={inputSize} />
    </DateInputPreviewItem>
  );
}

function PhoneNumberInputPreviewItem({
  children,
  label,
  note,
}: {
  children: ReactNode;
  label: string;
  note?: ReactNode;
}) {
  return (
    <div className="phone-number-input-preview-item">
      <span>{label}</span>
      {children}
      {note && <p className="phone-number-input-preview-note">{note}</p>}
    </div>
  );
}

function PhoneNumberInputStateColumn({
  label,
  tone,
}: {
  label: string;
  tone: PhoneNumberInputTone;
}) {
  return (
    <div className="phone-number-input-state-column">
      {phoneNumberInputStateRows[tone].map((state) => (
        <PhoneNumberInputPreviewItem
          key={`${label}-${state.label}`}
          label={`${label}: ${state.label}`}
        >
          <PhoneNumberInput
            defaultValue={state.defaultValue}
            disabled={state.disabled}
            loading={state.loading}
            mandatory={state.mandatory}
            previewState={state.previewState}
            required={state.mandatory}
            tone={tone}
          />
        </PhoneNumberInputPreviewItem>
      ))}
    </div>
  );
}

function PhoneNumberInputSizeExample({
  inputSize,
  label,
}: {
  inputSize: PhoneNumberInputSize;
  label: string;
}) {
  return (
    <PhoneNumberInputPreviewItem label={label}>
      <PhoneNumberInput inputSize={inputSize} />
    </PhoneNumberInputPreviewItem>
  );
}

type PhoneCountryOption = {
  code: string;
  flag: string;
  name: string;
  selected?: boolean;
};

const phoneCountryOptions: PhoneCountryOption[] = [
  { code: "+262", flag: "🇾🇹", name: "Mayotte" },
  { code: "+52", flag: "🇲🇽", name: "Mexico" },
  { code: "+373", flag: "🇲🇩", name: "Moldova", selected: true },
  { code: "+377", flag: "🇲🇨", name: "Monaco" },
  { code: "+976", flag: "🇲🇳", name: "Mongolia" },
  { code: "+382", flag: "🇲🇪", name: "Montenegro" },
  { code: "+1", flag: "🇲🇸", name: "Montserrat" },
  { code: "+212", flag: "🇲🇦", name: "Morocco" },
];

const scrolledPhoneCountryOptions: PhoneCountryOption[] = [
  { code: "+230", flag: "🇲🇺", name: "Mauritius" },
  ...phoneCountryOptions,
];

const filteredPhoneCountryOptions = phoneCountryOptions.slice(2);

function PhoneCountryMenu({
  options,
  searchValue,
  scrollable = false,
}: {
  options: PhoneCountryOption[];
  searchValue?: string;
  scrollable?: boolean;
}) {
  return (
    <div
      className="phone-number-country-menu"
      data-scrollable={scrollable ? true : undefined}
    >
      <SearchInput
        defaultValue={searchValue}
        inputSize="md"
        placeholder="Search country"
        previewState={searchValue ? "focus-populated" : "focus-empty"}
        shape="rectangular"
      />
      <div className="phone-number-country-menu-list">
        {options.map((option) => (
          <div
            className="phone-number-country-menu-row"
            data-selected={option.selected ? true : undefined}
            key={`${option.name}-${option.code}`}
          >
            <div className="phone-number-country-menu-main">
              <span className="phone-number-country-menu-flag">{option.flag}</span>
              <span className="phone-number-country-menu-label">
                <span>{option.name}</span>
                <span>{option.code}</span>
              </span>
            </div>
            {option.selected && (
              <MudIcon
                className="phone-number-country-menu-check"
                name="Outlined/24/checkmark-small"
                size="lg"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function PhoneCountrySelectorExample({
  label,
  options,
  scrollable,
  searchValue,
}: {
  label: string;
  options: PhoneCountryOption[];
  scrollable?: boolean;
  searchValue?: string;
}) {
  return (
    <PhoneNumberInputPreviewItem label={label}>
      <div className="phone-number-country-example">
        <PhoneNumberInput countrySelectable />
        <PhoneCountryMenu
          options={options}
          scrollable={scrollable}
          searchValue={searchValue}
        />
      </div>
    </PhoneNumberInputPreviewItem>
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

type FileInputPreviewState = ComponentProps<typeof FileInput>["previewState"];
type FileInputItemState = ComponentProps<typeof FileInputItem>["state"];

const fileInputExampleIconSrc = new URL(
  "../../../../src/assets/mud/images/upload-icon-example.svg",
  import.meta.url,
).href;

const fileInputZoneStateRows: {
  disabled?: boolean;
  label: string;
  previewState?: FileInputPreviewState;
}[] = [
  { label: "default" },
  { label: "hover", previewState: "hover" },
  { label: "active", previewState: "active" },
  { label: "focus", previewState: "focus" },
  { disabled: true, label: "disabled" },
];

const fileInputItemStateRows: {
  errorMessage?: ReactNode;
  fileSize?: string;
  label: string;
  state: FileInputItemState;
}[] = [
  { label: "uploading", state: "uploading" },
  { label: "success", state: "success" },
  { label: "uploaded", state: "uploaded" },
  { errorMessage: null, fileSize: "102.8 MB", label: "error", state: "error" },
  {
    errorMessage: "File exceeds size limit, max size is 100 MB",
    fileSize: "102.8 MB",
    label: "error-message",
    state: "error",
  },
];

function FileInputPreviewItem({
  children,
  label,
}: {
  children: ReactNode;
  label: string;
}) {
  return (
    <div className="file-input-preview-item">
      <span>{label}</span>
      {children}
    </div>
  );
}

function FileInputUploadGroup({
  imagePreview = false,
  multiple = false,
}: {
  imagePreview?: boolean;
  multiple?: boolean;
}) {
  return (
    <div className="file-input-upload-group">
      <div className="file-input-upload-copy">
        <strong>Upload files</strong>
        <span>Supported formats: jpg, png, pdf. Maximum size: 100 MB</span>
      </div>
      <Button className="w-[106px] justify-self-start" radius="sm" size="md">
        Choose file
      </Button>
      <div className="file-input-file-list">
        <FileInputItem
          fileName="Filename.pdf"
          fileSize="1.8 MB"
          thumbnail={
            imagePreview ? (
              <img
                alt=""
                className="file-input-preview-thumbnail"
                draggable={false}
                src={fileInputExampleIconSrc}
              />
            ) : undefined
          }
        />
        {multiple && <FileInputItem fileName="Filename.pdf" fileSize="1.8 MB" />}
      </div>
      {imagePreview && (
        <p className="file-input-preview-note">
          Uploaded images can show a live preview thumbnail before recognition.
        </p>
      )}
    </div>
  );
}

function FileInputZoneStateGrid() {
  return (
    <div className="file-input-zone-state-grid">
      {fileInputZoneStateRows.map((state) => (
        <FileInputPreviewItem key={state.label} label={state.label}>
          <FileInput
            disabled={state.disabled}
            inputProps={{ multiple: true }}
            previewState={state.previewState}
          />
          {!state.disabled && (
            <div className="file-input-file-list">
              <FileInputItem fileName="Filename.pdf" fileSize="1.8 MB" />
              <FileInputItem fileName="Filename.pdf" fileSize="1.8 MB" />
            </div>
          )}
        </FileInputPreviewItem>
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
        <ExampleCard title="Sizes: Desktop">
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

export function SegmentedControlPage() {
  return (
    <div className="docs-page">
      <PageHeader
        description="Segmented controls present a compact set of closely related choices and keep the current selection visible."
        eyebrow="Components"
        title="Segmented Controls"
      />
      <div className="component-grid one">
        <ExampleCard title="Breakpoints">
          <div className="segmented-preview-row">
            <SegmentedControlPreviewItem label="desktop">
              <SegmentedControl
                aria-label="Desktop segmented control preview"
                items={getSegmentedControlItems(2)}
              />
            </SegmentedControlPreviewItem>
            <SegmentedControlPreviewItem label="mobile">
              <div className="segmented-mobile-frame">
                <SegmentedControl
                  aria-label="Mobile segmented control preview"
                  items={getSegmentedControlItems(2)}
                  size="mobile"
                />
              </div>
            </SegmentedControlPreviewItem>
          </div>
        </ExampleCard>

        <ExampleCard title="Types">
          <div className="segmented-preview-row">
            {[2, 3, 4, 5].map((count) => (
              <SegmentedControlPreviewItem
                key={`segments-${count}`}
                label={`${count}-segments`}
              >
                <SegmentedControl
                  aria-label={`${count} segment preview`}
                  items={getSegmentedControlItems(count)}
                />
              </SegmentedControlPreviewItem>
            ))}
          </div>
        </ExampleCard>

        <ExampleCard title="Mode">
          <div className="segmented-preview-row">
            <SegmentedControlPreviewItem label="selected">
              <SegmentedControl
                aria-label="Selected segment preview"
                items={getSegmentedControlItems(2)}
                value="segment-1"
              />
            </SegmentedControlPreviewItem>
            <SegmentedControlPreviewItem label="unselected">
              <SegmentedControl
                aria-label="Unselected segment preview"
                items={getSegmentedControlItems(2)}
                value="segment-2"
              />
            </SegmentedControlPreviewItem>
          </div>
        </ExampleCard>

        <ExampleCard title="States">
          <div className="segmented-preview-row">
            {(["default", "hover", "focus"] as const).map((state) => (
              <SegmentedControlStateItem key={state} state={state} />
            ))}
          </div>
        </ExampleCard>

        <ExampleCard title="Edge Cases">
          <div className="segmented-preview-row">
            <SegmentedControlPreviewItem
              label="truncation"
              note="Long labels truncate on a single line with an ellipsis."
            >
              <SegmentedControl
                aria-label="Segmented control truncation preview"
                className="w-[329px]"
                equalWidth
                items={getSegmentedControlItems(2, [
                  segmentedControlLongLabel,
                  "Services, Always at Your Fingertips",
                ])}
              />
            </SegmentedControlPreviewItem>
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

const accordionServiceItems = [
  {
    heading: "Certificate request",
    supportingText: "Submit and track a public service request.",
  },
  {
    heading: "Application status",
    supportingText: "Review current processing stage and next steps.",
  },
  {
    heading: "Payment confirmation",
    supportingText: "Check fees, receipts, and payment references.",
  },
  {
    heading: "Appointment details",
    supportingText: "Manage office visits and digital appointments.",
  },
  {
    heading: "Document delivery",
    supportingText: "Choose pickup, courier, or digital delivery.",
  },
];

function AccordionServiceRows() {
  return (
    <div className="accordion-service-list">
      {accordionServiceItems.map((item) => (
        <div className="accordion-service-row" key={item.heading}>
          <div className="accordion-service-copy">
            <strong>{item.heading}</strong>
            <span>{item.supportingText}</span>
          </div>
          <Tag tone="neutral">Label</Tag>
        </div>
      ))}
    </div>
  );
}

function AccordionPreview({
  className,
  defaultValue = "",
}: {
  className?: string;
  defaultValue?: string;
}) {
  return (
    <Accordion className={className} defaultValue={defaultValue}>
      <AccordionItem value="overview">
        <AccordionTrigger
          heading="Accordion Heading"
          supportingText="Supporting Text"
        />
        <AccordionContent>
          <AccordionServiceRows />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="services">
        <AccordionTrigger
          heading="Accordion Heading"
          supportingText="Supporting Text"
        />
        <AccordionContent>
          <AccordionServiceRows />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="documents">
        <AccordionTrigger
          heading="Accordion Heading"
          supportingText="Supporting Text"
        />
        <AccordionContent>
          <AccordionServiceRows />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export function AccordionPage() {
  return (
    <div className="docs-page">
      <PageHeader
        description="The Accordion component organizes long content into expandable sections while keeping the entire header row as the interaction target."
        eyebrow="Components"
        title="Accordion"
      />
      <div className="component-grid one">
        <ExampleCard
          description="The header uses desktop and mobile typography from the Figma spec, with a 48px circular icon target."
          title="Breakpoints"
        >
          <div className="accordion-preview-stack">
            <div className="accordion-preview-item">
              <span>desktop</span>
              <AccordionPreview className="accordion-preview-desktop" />
            </div>
            <div className="accordion-preview-item">
              <span>mobile</span>
              <AccordionPreview className="accordion-preview-mobile" />
            </div>
          </div>
        </ExampleCard>

        <ExampleCard
          description="The open section switches the heading to the brand color and exposes the content slot below the trigger."
          title="States"
        >
          <div className="accordion-preview-stack">
            <div className="accordion-preview-item">
              <span>desktop</span>
              <AccordionPreview
                className="accordion-preview-desktop"
                defaultValue="services"
              />
            </div>
            <div className="accordion-preview-item">
              <span>mobile</span>
              <AccordionPreview
                className="accordion-preview-mobile"
                defaultValue="services"
              />
            </div>
            <div className="accordion-preview-item">
              <span>hover</span>
              <AccordionPreview className="accordion-preview-desktop accordion-preview-hover" />
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

type PaginationPageValue = number | "...";

type PaginationDemoProps = {
  activePage: number;
  compact?: boolean;
  overflowMenu?: ReactNode;
  overflowActive?: boolean;
  pages: PaginationPageValue[];
  showNext?: boolean;
  showPrevious?: boolean;
};

function PaginationDemo({
  activePage,
  compact = false,
  overflowMenu,
  overflowActive = false,
  pages,
  showNext = true,
  showPrevious = true,
}: PaginationDemoProps) {
  const controlSize = compact ? "control-sm" : "control";
  const ellipsisSize = compact ? "sm" : "default";
  const pageSize = compact ? "page-sm" : "page";

  return (
    <Pagination className="justify-start">
      <PaginationContent
        className={
          compact
            ? "pagination-preview-content compact"
            : "pagination-preview-content"
        }
      >
        {showPrevious && (
          <PaginationItem className="pagination-preview-control-before">
            <PaginationPrevious href="#" size={controlSize} />
          </PaginationItem>
        )}
        {pages.map((page, index) => {
          const isActiveOverflow = overflowActive && index === 1;

          return (
            <PaginationItem key={`${page}-${index}`}>
              {page === "..." ? (
                isActiveOverflow && overflowMenu ? (
                  <div className="pagination-overflow-anchor">
                    <PaginationEllipsis size={ellipsisSize} previewState="hover" />
                    <div className="pagination-overflow-menu" aria-hidden="true">
                      {overflowMenu}
                    </div>
                  </div>
                ) : (
                  <PaginationEllipsis
                    size={ellipsisSize}
                    previewState={isActiveOverflow ? "hover" : undefined}
                  />
                )
              ) : (
                <PaginationLink
                  href="#"
                  isActive={page === activePage}
                  size={pageSize}
                >
                  {page}
                </PaginationLink>
              )}
            </PaginationItem>
          );
        })}
        {showNext && (
          <PaginationItem className="pagination-preview-control-after">
            <PaginationNext href="#" size={controlSize} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}

function PaginationPreviewLabel({
  children,
  label,
}: {
  children: ReactNode;
  label: string;
}) {
  return (
    <div className="pagination-preview-item">
      <span className="pagination-preview-label">{label}</span>
      {children}
    </div>
  );
}

export function PaginationPage() {
  return (
    <div className="docs-page">
      <PageHeader
        description="Pagination organizes content into logical, manageable groups, dividing it across pages based on the relevance of results. It offers a clear, structured way for users to navigate through information."
        eyebrow="Components"
        title="Pagination"
      />

      <div className="component-grid one">
        <ExampleCard title="Breakpoints">
          <div className="pagination-breakpoint-grid">
            <PaginationPreviewLabel label="desktop">
              <PaginationDemo
                activePage={1}
                pages={[1, 2, 3, 4, 5, 6, 7]}
                showPrevious={false}
              />
            </PaginationPreviewLabel>
            <PaginationPreviewLabel label="mobile">
              <PaginationDemo
                activePage={1}
                compact
                pages={[1, 2, 3, 4, 5]}
                showPrevious={false}
              />
            </PaginationPreviewLabel>
          </div>
        </ExampleCard>

        <ExampleCard title="States">
          <div className="pagination-state-grid">
            <PaginationPreviewLabel label="selected">
              <PaginationLink href="#" isActive>
                1
              </PaginationLink>
            </PaginationPreviewLabel>
            <PaginationPreviewLabel label="selected: focus">
              <PaginationLink href="#" isActive previewState="focus">
                1
              </PaginationLink>
            </PaginationPreviewLabel>
            <PaginationPreviewLabel label="unselected">
              <PaginationLink href="#">1</PaginationLink>
            </PaginationPreviewLabel>
            <PaginationPreviewLabel label="unselected: hover">
              <PaginationLink href="#" previewState="hover">
                1
              </PaginationLink>
            </PaginationPreviewLabel>
            <PaginationPreviewLabel label="unselected: focus">
              <PaginationLink href="#" previewState="focus">
                1
              </PaginationLink>
            </PaginationPreviewLabel>
          </div>
        </ExampleCard>

        <ExampleCard
          description="When pages are truncated, the minimum visible pagination range is five slots. Avoid showing pagination when there is only one page."
          title="Pagination logic"
        >
          <div className="pagination-logic-grid">
            <PaginationPreviewLabel label="first-page">
              <PaginationDemo
                activePage={1}
                pages={[1, 2, 3, 4, 5, 6, 7]}
                showPrevious={false}
              />
            </PaginationPreviewLabel>
            <PaginationPreviewLabel label="first-page: leading-overflow">
              <PaginationDemo
                activePage={1}
                pages={[1, 2, 3, 4, 5, "...", 27]}
                showPrevious={false}
              />
            </PaginationPreviewLabel>
            <PaginationPreviewLabel label="last-page">
              <PaginationDemo
                activePage={7}
                pages={[1, 2, 3, 4, 5, 6, 7]}
                showNext={false}
              />
            </PaginationPreviewLabel>
            <PaginationPreviewLabel label="last-page: trailing-overflow">
              <PaginationDemo
                activePage={27}
                pages={[1, "...", 23, 24, 25, 26, 27]}
                showNext={false}
              />
            </PaginationPreviewLabel>
            <PaginationPreviewLabel label="leading-overflow">
              <PaginationDemo
                activePage={3}
                pages={[1, 2, 3, 4, 5, "...", 27]}
              />
            </PaginationPreviewLabel>
            <PaginationPreviewLabel label="leading-and-trailing-overflow">
              <PaginationDemo
                activePage={15}
                pages={[1, "...", 14, 15, 16, "...", 27]}
              />
            </PaginationPreviewLabel>
            <PaginationPreviewLabel label="trailing-overflow">
              <PaginationDemo
                activePage={25}
                pages={[1, "...", 23, 24, 25, 26, 27]}
              />
            </PaginationPreviewLabel>
          </div>
        </ExampleCard>

        <ExampleCard
          description="Interacting with an overflow element reveals a compact page jump menu."
          title="Overflow interaction"
        >
          <div className="pagination-overflow-preview">
            <PaginationDemo
              activePage={9}
              overflowMenu={["2", "3", "4", "5", "6", "7"].map((item) => (
                <span key={item}>{item}</span>
              ))}
              overflowActive
              pages={[1, "...", 8, 9, 10, "...", 20]}
            />
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
          description="Use `truncate` only for constrained contexts like narrow table cells."
          title="Tag truncation"
        >
          <div className="tag-preview-row">
            <TagPreviewItem label="truncate=false">
              <Tag tone="neutral" variant="subtle">
                Etichetă prelungită pentru stare fără tăiere vizuală
              </Tag>
            </TagPreviewItem>
            <TagPreviewItem label="truncate=true">
              <Tag
                className="max-w-[220px]"
                tone="neutral"
                variant="subtle"
                truncate
              >
                Etichetă prelungită pentru stare cu tăiere vizuală
              </Tag>
            </TagPreviewItem>
          </div>
        </ExampleCard>

        <ExampleCard
          description="Horizontal tag groups use 8px spacing between tags."
          title="Tag group"
        >
          <div className="tag-preview-row">
            <TagGroup>
              <Tag tone="accent" variant="strong" truncate={false}>
                Label
              </Tag>
              <Tag tone="neutral" variant="subtle" truncate={false}>
                Label
              </Tag>
              <Tag tone="neutral" variant="subtle" truncate={false}>
                Label
              </Tag>
              <Tag tone="neutral" variant="subtle" truncate={false}>
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
                <TagPreviewItem label="truncate=true">
                  <InfoTag className="max-w-[220px]" truncate>
                    <MudIcon name="Outlined/16/time" size="sm" />
                    Informație extinsă pentru tag de metadată
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

export function InputNumericPage() {
  return (
    <div className="docs-page">
      <PageHeader
        description="Numeric inputs collect quantities, amounts, and financial values with consistent sizing, validation tones, unit adornments, and assistive messages."
        eyebrow="Components"
        title="Input: Numeric"
      />
      <div className="component-grid one">
        <ExampleCard title="Styles">
          <div className="numeric-input-preview-row">
            <NumericInputPreviewItem label="default">
              <NumericInput placeholder="12345" />
            </NumericInputPreviewItem>
            <NumericInputPreviewItem label="destructive">
              <NumericInput placeholder="12345" tone="destructive" />
            </NumericInputPreviewItem>
            <NumericInputPreviewItem label="success">
              <NumericInput placeholder="12345" tone="success" />
            </NumericInputPreviewItem>
          </div>
        </ExampleCard>

        <ExampleCard title="Sizes">
          <div className="numeric-input-preview-row">
            <NumericInputPreviewItem label="medium">
              <NumericInput inputSize="md" placeholder="12345" />
            </NumericInputPreviewItem>
            <NumericInputPreviewItem label="large">
              <NumericInput placeholder="12345" />
            </NumericInputPreviewItem>
          </div>
        </ExampleCard>

        <ExampleCard title="Variations">
          <div className="numeric-input-preview-stack">
            <div>
              <h3 className="numeric-input-preview-subtitle">Medium</h3>
              <NumericInputVariationSet inputSize="md" />
            </div>
            <div>
              <h3 className="numeric-input-preview-subtitle">Large</h3>
              <NumericInputVariationSet inputSize="lg" />
            </div>
          </div>
        </ExampleCard>

        <ExampleCard title="States">
          <div className="numeric-input-state-grid">
            {numericInputTones.map(({ label, tone }) => (
              <NumericInputStateColumn key={label} label={label} tone={tone} />
            ))}
          </div>
        </ExampleCard>

        <ExampleCard
          description="Assistive text conveys additional guidance about the input field, such as how the value will be used."
          title="Assistive text"
        >
          <div className="numeric-input-preview-row">
            <NumericInputPreviewItem label="default">
              <NumericInput
                assistiveText="Helper message displayed here"
                placeholder="12345"
                suffix="lei"
              />
            </NumericInputPreviewItem>
            <NumericInputPreviewItem label="destructive">
              <NumericInput
                assistiveText="Error message displayed here"
                placeholder="12345"
                suffix="lei"
                tone="destructive"
              />
            </NumericInputPreviewItem>
            <NumericInputPreviewItem label="success">
              <NumericInput
                assistiveText="Success message displayed here"
                placeholder="12345"
                suffix="lei"
                tone="success"
              />
            </NumericInputPreviewItem>
          </div>
        </ExampleCard>
      </div>
    </div>
  );
}

export function InputDatePage() {
  return (
    <div className="docs-page">
      <PageHeader
        description="Date inputs collect calendar dates with consistent manual-entry formatting, validation states, calendar affordances, and assistive messages."
        eyebrow="Components"
        title="Input: Date"
      />
      <div className="component-grid one">
        <ExampleCard title="Styles">
          <div className="date-input-preview-row">
            <DateInputPreviewItem label="default">
              <DateInput />
            </DateInputPreviewItem>
            <DateInputPreviewItem label="destructive">
              <DateInput tone="destructive" />
            </DateInputPreviewItem>
          </div>
        </ExampleCard>

        <ExampleCard title="Sizes">
          <div className="date-input-preview-row">
            <DateInputSizeExample inputSize="md" label="medium" />
            <DateInputSizeExample inputSize="lg" label="large" />
          </div>
        </ExampleCard>

        <ExampleCard title="States">
          <div className="date-input-state-grid">
            {dateInputTones.map(({ label, tone }) => (
              <DateInputStateColumn key={label} label={label} tone={tone} />
            ))}
          </div>
        </ExampleCard>

        <ExampleCard
          description="These examples document the intended manual-entry flow for dates and segment validation."
          title="Behavior"
        >
          <div className="date-input-preview-row">
            <DateInputPreviewItem
              label="default"
              note="The placeholder should guide users on the date format."
            >
              <DateInput />
            </DateInputPreviewItem>
            <DateInputPreviewItem
              label="focus: empty"
              note="The placeholder remains visible while the empty input is focused."
            >
              <DateInput previewState="focus" />
            </DateInputPreviewItem>
            <DateInputPreviewItem
              label="focus: date-populated"
              note="After a valid day, the slash separator is inserted and focus moves to month entry."
            >
              <DateInput defaultValue="15/" previewState="focus" />
            </DateInputPreviewItem>
            <DateInputPreviewItem
              label="focus: month-populated"
              note="After a valid month, the slash separator is inserted and focus moves to year entry."
            >
              <DateInput defaultValue="15/04/" previewState="focus" />
            </DateInputPreviewItem>
            <DateInputPreviewItem label="focus: fully-populated">
              <DateInput defaultValue="15/04/2025" previewState="focus" />
            </DateInputPreviewItem>
            <DateInputPreviewItem
              label="backspace"
              note="Backspace should erase within the segment or return to the previous segment."
            >
              <DateInput defaultValue="15/04/20" previewState="focus" />
            </DateInputPreviewItem>
          </div>
        </ExampleCard>

        <ExampleCard
          description="Each date segment should validate while the user types so invalid values are caught immediately."
          title="Validation"
        >
          <div className="date-input-preview-row">
            <DateInputPreviewItem label="DD-error">
              <DateInput
                assistiveText="Day must be between 01 and 31"
                defaultValue="45"
                previewState="focus"
                tone="destructive"
              />
            </DateInputPreviewItem>
            <DateInputPreviewItem label="MM-error">
              <DateInput
                assistiveText="Month must be between 01 and 12"
                defaultValue="15/18"
                previewState="focus"
                tone="destructive"
              />
            </DateInputPreviewItem>
            <DateInputPreviewItem label="YYYY-error">
              <DateInput
                assistiveText="Enter a valid year"
                defaultValue="15/04/1550"
                previewState="focus"
                tone="destructive"
              />
            </DateInputPreviewItem>
          </div>
        </ExampleCard>

        <ExampleCard
          description="Assistive text conveys additional guidance about the input field and should stay concise."
          title="Assistive text"
        >
          <div className="date-input-preview-row">
            <DateInputPreviewItem label="default">
              <DateInput assistiveText="Helper message displayed here" />
            </DateInputPreviewItem>
            <DateInputPreviewItem label="destructive">
              <DateInput
                assistiveText="Error message displayed here"
                tone="destructive"
              />
            </DateInputPreviewItem>
          </div>
        </ExampleCard>

        <ExampleCard
          description="Long labels and assistive text should truncate inside the field width."
          title="Edge Cases"
        >
          <div className="date-input-preview-row">
            <DateInputPreviewItem
              label="label"
              note="The top label should truncate on the first line."
            >
              <DateInput label="Moldova's digital evolution is at the heart of seamless public service delivery" />
            </DateInputPreviewItem>
            <DateInputPreviewItem
              label="assistive-text"
              note="The assistive text should truncate on the second line."
            >
              <DateInput assistiveText="Moldova's digital evolution is at the heart of seamless public service delivery, providing citizens with easy access to essential information." />
            </DateInputPreviewItem>
          </div>
        </ExampleCard>
      </div>
    </div>
  );
}

export function InputPhoneNumberPage() {
  return (
    <div className="docs-page">
      <PageHeader
        description="Phone number inputs collect national or international phone values with a country code prefix, validation tones, selector states, and assistive messages."
        eyebrow="Components"
        title="Input: Phone Number"
      />
      <div className="component-grid one">
        <ExampleCard title="Types">
          <div className="phone-number-input-preview-row">
            <PhoneNumberInputPreviewItem label="local">
              <PhoneNumberInput />
            </PhoneNumberInputPreviewItem>
            <PhoneNumberInputPreviewItem label="international">
              <PhoneNumberInput countrySelectable />
            </PhoneNumberInputPreviewItem>
          </div>
        </ExampleCard>

        <ExampleCard title="Styles">
          <div className="phone-number-input-preview-row">
            {phoneNumberInputTones.map(({ label, tone }) => (
              <PhoneNumberInputPreviewItem key={label} label={label}>
                <PhoneNumberInput tone={tone} />
              </PhoneNumberInputPreviewItem>
            ))}
          </div>
        </ExampleCard>

        <ExampleCard title="Sizes">
          <div className="phone-number-input-preview-row">
            <PhoneNumberInputSizeExample inputSize="md" label="medium" />
            <PhoneNumberInputSizeExample inputSize="lg" label="large" />
          </div>
        </ExampleCard>

        <ExampleCard title="States">
          <div className="phone-number-input-state-grid">
            {phoneNumberInputTones.map(({ label, tone }) => (
              <PhoneNumberInputStateColumn key={label} label={label} tone={tone} />
            ))}
          </div>
        </ExampleCard>

        <ExampleCard
          description="Country selection is shown as a composed menu preview. Filtering, search, and selection behavior should remain product logic unless a generic selector API is introduced."
          title="Country selector"
        >
          <div className="phone-number-input-country-grid">
            <PhoneCountrySelectorExample
              label="default"
              options={phoneCountryOptions}
            />
            <PhoneCountrySelectorExample
              label="scrolled"
              options={scrolledPhoneCountryOptions}
              scrollable
            />
            <PhoneCountrySelectorExample
              label="filtered"
              options={filteredPhoneCountryOptions}
              searchValue="Mo"
            />
          </div>
        </ExampleCard>

        <ExampleCard
          description="Assistive text conveys additional guidance about the input field and should stay concise."
          title="Assistive text"
        >
          <div className="phone-number-input-preview-row">
            <PhoneNumberInputPreviewItem label="default">
              <PhoneNumberInput assistiveText="Helper message displayed here" />
            </PhoneNumberInputPreviewItem>
            <PhoneNumberInputPreviewItem label="warning">
              <PhoneNumberInput
                assistiveText="Warning message displayed here"
                tone="warning"
              />
            </PhoneNumberInputPreviewItem>
            <PhoneNumberInputPreviewItem label="destructive">
              <PhoneNumberInput
                assistiveText="Error message displayed here"
                tone="destructive"
              />
            </PhoneNumberInputPreviewItem>
            <PhoneNumberInputPreviewItem label="success">
              <PhoneNumberInput
                assistiveText="Success message displayed here"
                tone="success"
              />
            </PhoneNumberInputPreviewItem>
          </div>
        </ExampleCard>

        <ExampleCard
          description="The clear button appears when the field is focused or populated and clear behavior is supplied by the product."
          title="Edge Cases"
        >
          <div className="phone-number-input-preview-row">
            <PhoneNumberInputPreviewItem
              label="focus"
              note="A populated focused field may show a clear affordance."
            >
              <PhoneNumberInput
                clearable
                defaultValue="69  123"
                onClear={() => undefined}
                previewState="focus"
              />
            </PhoneNumberInputPreviewItem>
            <PhoneNumberInputPreviewItem
              label="assistive-text"
              note="The assistive text should truncate on the second line."
            >
              <PhoneNumberInput assistiveText="Moldova's digital evolution is at the heart of seamless public service delivery, providing citizens with easy access to essential information." />
            </PhoneNumberInputPreviewItem>
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

export function FileInputPage() {
  return (
    <div className="docs-page">
      <PageHeader
        description="File inputs let users select, upload, and review one or more files through button-based flows or drag-and-drop zones."
        eyebrow="Components"
        title="Input: File"
      />
      <div className="component-grid one">
        <ExampleCard
          description="Button-based upload flows pair a normal command button with one or more uploaded file rows."
          title="Upload Button"
        >
          <div className="file-input-preview-row">
            <FileInputPreviewItem label="single-upload">
              <FileInputUploadGroup />
            </FileInputPreviewItem>
            <FileInputPreviewItem label="multiple-upload">
              <FileInputUploadGroup multiple />
            </FileInputPreviewItem>
            <FileInputPreviewItem label="image-preview">
              <FileInputUploadGroup imagePreview multiple />
            </FileInputPreviewItem>
          </div>
        </ExampleCard>

        <ExampleCard title="File Items">
          <div className="file-input-item-state-grid">
            {fileInputItemStateRows.map((item) => (
              <FileInputPreviewItem key={item.label} label={item.label}>
                <FileInputItem
                  errorMessage={item.errorMessage}
                  fileName="Filename.pdf"
                  fileSize={item.fileSize}
                  state={item.state}
                />
              </FileInputPreviewItem>
            ))}
          </div>
        </ExampleCard>

        <ExampleCard
          description="The drop zone gives users a larger target for drag-and-drop uploads while preserving the same file list pattern."
          title="Drag and Drop Zone"
        >
          <div className="file-input-preview-row">
            <FileInputPreviewItem label="desktop">
              <FileInput inputProps={{ multiple: true }} />
            </FileInputPreviewItem>
            <FileInputPreviewItem label="mobile">
              <FileInput className="file-input-preview-mobile" inputProps={{ multiple: true }} />
            </FileInputPreviewItem>
          </div>
        </ExampleCard>

        <ExampleCard title="States">
          <FileInputZoneStateGrid />
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
              <Tag size="md" tone="neutral" variant="subtle" truncate>
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
              <Tag size="md" tone="neutral" variant="subtle" truncate>
                Etichetă de control foarte lungă pentru acțiuni
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

type TabsPreviewMode = "selected" | "unselected";
type TabsPreviewSize = NonNullable<ComponentProps<typeof TabsList>["size"]>;

function TabsPreviewItem({
  children,
  label,
}: {
  children: ReactNode;
  label: string;
}) {
  return (
    <div className="tabs-preview-item">
      <span>{label}</span>
      {children}
    </div>
  );
}

function TabsPageIcon() {
  return <MudIcon name="Outlined/20/page-text" size="md" />;
}

function TabsExample({
  badge = false,
  className,
  icon = false,
  mode = "selected",
  previewState,
  showOverflowIndicator = false,
  size = "md",
  tabCount = 2,
}: {
  badge?: boolean;
  className?: string;
  icon?: boolean;
  mode?: TabsPreviewMode;
  previewState?: ComponentProps<typeof TabsTrigger>["previewState"];
  showOverflowIndicator?: boolean;
  size?: TabsPreviewSize;
  tabCount?: number;
}) {
  const activeValue =
    mode === "selected" ? "tab-1" : `tab-${Math.min(tabCount, 3)}`;

  return (
    <Tabs className={className} defaultValue={activeValue}>
      <TabsList size={size} showOverflowIndicator={showOverflowIndicator}>
        {Array.from({ length: tabCount }, (_, index) => {
          const value = `tab-${index + 1}`;
          const isPrimaryPreviewTab = index === 0;

          return (
            <TabsTrigger
              badge={isPrimaryPreviewTab && badge ? 1 : undefined}
              key={value}
              leadingIcon={isPrimaryPreviewTab && icon ? <TabsPageIcon /> : undefined}
              previewState={isPrimaryPreviewTab ? previewState : undefined}
              value={value}
            >
              Label
            </TabsTrigger>
          );
        })}
      </TabsList>
    </Tabs>
  );
}

function TabsVariationSet({ size }: { size: TabsPreviewSize }) {
  return (
    <div className="tabs-preview-stack">
      <p className="tabs-preview-subtitle">
        {size === "sm" ? "Mobile" : "Desktop"}
      </p>
      <div className="tabs-preview-row">
        <TabsPreviewItem label="regular: selected">
          <TabsExample size={size} />
        </TabsPreviewItem>
        <TabsPreviewItem label="icon: selected">
          <TabsExample icon size={size} />
        </TabsPreviewItem>
        <TabsPreviewItem label="badge: selected">
          <TabsExample badge size={size} />
        </TabsPreviewItem>
        <TabsPreviewItem label="icon, badge: selected">
          <TabsExample badge icon size={size} />
        </TabsPreviewItem>
      </div>
      <div className="tabs-preview-row">
        <TabsPreviewItem label="regular: unselected">
          <TabsExample mode="unselected" size={size} />
        </TabsPreviewItem>
        <TabsPreviewItem label="icon: unselected">
          <TabsExample icon mode="unselected" size={size} />
        </TabsPreviewItem>
        <TabsPreviewItem label="badge: unselected">
          <TabsExample badge mode="unselected" size={size} />
        </TabsPreviewItem>
        <TabsPreviewItem label="icon, badge: unselected">
          <TabsExample badge icon mode="unselected" size={size} />
        </TabsPreviewItem>
      </div>
    </div>
  );
}

export function TabsPage() {
  return (
    <div className="docs-page">
      <PageHeader
        description="Tabs let users switch between closely related views while keeping the active selection visible."
        eyebrow="Components"
        title="Tabs"
      />
      <div className="component-grid one">
        <ExampleCard title="Breakpoints">
          <div className="tabs-preview-row">
            <TabsPreviewItem label="desktop">
              <TabsExample tabCount={5} />
            </TabsPreviewItem>
            <TabsPreviewItem label="mobile">
              <TabsExample size="sm" tabCount={5} />
            </TabsPreviewItem>
          </div>
        </ExampleCard>

        <ExampleCard title="Variations">
          <TabsVariationSet size="md" />
          <TabsVariationSet size="sm" />
        </ExampleCard>

        <ExampleCard title="States">
          <div className="tabs-preview-row">
            <TabsPreviewItem label="selected">
              <TabsExample />
            </TabsPreviewItem>
            <TabsPreviewItem label="unselected">
              <TabsExample mode="unselected" />
            </TabsPreviewItem>
            <TabsPreviewItem label="selected: focus">
              <TabsExample previewState="focus" />
            </TabsPreviewItem>
            <TabsPreviewItem label="unselected: focus">
              <TabsExample mode="unselected" previewState="focus" tabCount={3} />
            </TabsPreviewItem>
          </div>
        </ExampleCard>

        <ExampleCard title="Tabs w/ Overflow">
          <div className="tabs-preview-row">
            <TabsPreviewItem label="overflowing: right">
              <div className="tabs-overflow-frame">
                <TabsExample showOverflowIndicator tabCount={5} />
              </div>
            </TabsPreviewItem>
            <TabsPreviewItem label="overflowing: right">
              <div className="tabs-overflow-frame">
                <TabsExample showOverflowIndicator tabCount={5} />
              </div>
            </TabsPreviewItem>
          </div>
        </ExampleCard>
      </div>
    </div>
  );
}

const tooltipLongText =
  "Moldova's digital evolution is at the heart of seamless public service delivery.";

function TooltipPreviewItem({
  children,
  label,
}: {
  children: ReactNode;
  label: string;
}) {
  return (
    <div className="tooltip-preview-item">
      <span>{label}</span>
      {children}
    </div>
  );
}

function TooltipInfoButton({ focus = false, hover = false }: { focus?: boolean; hover?: boolean }) {
  return (
    <Button
      aria-label="More information"
      className="tooltip-info-button"
      data-focus-preview={focus ? true : undefined}
      data-hover-preview={hover ? true : undefined}
      size="icon-sm"
      type="button"
      variant="ghost"
    >
      <MudIcon name="Filled/16/circle-info-filled" size="sm" />
    </Button>
  );
}

export function TooltipPage() {
  return (
    <div className="docs-page">
      <PageHeader
        description="Tooltips provide brief contextual information on hover or focus without adding persistent content to the interface."
        eyebrow="Components"
        title="Tooltip"
      />
      <div className="component-grid one">
        <ExampleCard title="Sizes">
          <div className="tooltip-preview-grid tooltip-preview-grid-compact">
            <TooltipPreviewItem label="large">
              <TooltipBubble />
            </TooltipPreviewItem>
            <TooltipPreviewItem label="small">
              <TooltipBubble size="sm" />
            </TooltipPreviewItem>
          </div>
        </ExampleCard>

        <ExampleCard title="Variations">
          <div className="tooltip-preview-grid tooltip-preview-grid-compact">
            <TooltipPreviewItem label="arrow-down">
              <TooltipBubble />
            </TooltipPreviewItem>
            <TooltipPreviewItem label="arrow-up">
              <TooltipBubble arrowPosition="top" />
            </TooltipPreviewItem>
          </div>
        </ExampleCard>

        <ExampleCard title="Specifications">
          <div className="tooltip-preview-grid">
            <TooltipPreviewItem label="content">
              <TooltipBubble
                align="start"
                className="w-[240px]"
                content={tooltipLongText}
              />
              <p className="tooltip-preview-note">
                Tooltip content should stay brief and wrap without truncating the
                message.
              </p>
            </TooltipPreviewItem>
            <TooltipPreviewItem label="max-width">
              <TooltipBubble
                align="start"
                className="w-[300px]"
                content={`${tooltipLongText} providing citizens with easy`}
              />
              <p className="tooltip-preview-note">
                Keep the maximum width at 300px so the tooltip remains scannable.
              </p>
            </TooltipPreviewItem>
            <TooltipPreviewItem label="min-width">
              <TooltipBubble
                align="start"
                className="w-[150px]"
                content="Hello"
              />
            </TooltipPreviewItem>
          </div>
        </ExampleCard>

        <ExampleCard title="Position">
          <div className="tooltip-preview-grid">
            <TooltipPreviewItem label="left">
              <TooltipBubble
                align="start"
                content={tooltipLongText}
              />
            </TooltipPreviewItem>
            <TooltipPreviewItem label="middle">
              <TooltipBubble content={tooltipLongText} />
            </TooltipPreviewItem>
            <TooltipPreviewItem label="right">
              <TooltipBubble
                align="end"
                content={tooltipLongText}
              />
            </TooltipPreviewItem>
          </div>
        </ExampleCard>

        <ExampleCard
          description="The interactive wrapper opens on hover and focus. These examples keep the visible state pinned for preview."
          title="Appearance and Dismissal"
        >
          <div className="tooltip-preview-grid tooltip-preview-grid-compact">
            <TooltipPreviewItem label="hover">
              <div className="tooltip-trigger-demo">
                <TooltipBubble content={tooltipLongText} />
                <TooltipInfoButton hover />
              </div>
              <p className="tooltip-preview-note">
                Hover tooltips dismiss when the pointer leaves the trigger.
              </p>
            </TooltipPreviewItem>
            <TooltipPreviewItem label="focus">
              <div className="tooltip-trigger-demo">
                <TooltipBubble content={tooltipLongText} />
                <TooltipInfoButton focus />
              </div>
              <p className="tooltip-preview-note">
                Focus tooltips dismiss when focus moves away.
              </p>
            </TooltipPreviewItem>
            <TooltipPreviewItem label="interactive">
              <Tooltip content={tooltipLongText}>
                <TooltipInfoButton />
              </Tooltip>
              <p className="tooltip-preview-note">
                Move over or focus the trigger to show the tooltip.
              </p>
            </TooltipPreviewItem>
          </div>
        </ExampleCard>

        <ExampleCard title="Coach Tooltips">
          <div className="tooltip-preview-grid tooltip-preview-grid-compact">
            <TooltipPreviewItem label="w/ close-button">
              <TooltipBubble closeButton />
            </TooltipPreviewItem>
          </div>
        </ExampleCard>
      </div>
    </div>
  );
}

function ModalPreviewCloseButton({
  state = "default",
}: {
  state?: "default" | "hover" | "focus";
}) {
  return (
    <span
      aria-hidden="true"
      className="modal-preview-close"
      data-state={state}
    >
      <MudIcon name="Outlined/16/cross-large" size="sm" />
    </span>
  );
}

const modalPreviewParagraphs = [
  "You are about to proceed with this action, which may affect your access to certain government services.",
  "Please review the details carefully before confirming. If you continue, any changes made will be final and may require additional steps to reverse.",
];

function ModalStaticPreview({
  action = "primary",
  image = false,
  mobile = false,
  noFooter = false,
  scroll = false,
  size = "medium",
}: {
  action?: "primary" | "destructive";
  image?: boolean;
  mobile?: boolean;
  noFooter?: boolean;
  scroll?: boolean;
  size?: "medium" | "small";
}) {
  const buttonSize = size === "small" ? "md" : "lg";

  return (
    <div
      className="modal-preview-card"
      data-mobile={mobile ? true : undefined}
      data-scroll={scroll ? true : undefined}
      data-size={size}
    >
      {image && (
        <div className="modal-preview-image" aria-hidden="true">
          <div />
        </div>
      )}
      <div className="modal-preview-header">
        <h3>Confirm Your Action</h3>
        <ModalPreviewCloseButton />
      </div>
      <div className="modal-preview-body">
        {modalPreviewParagraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        {scroll && (
          <>
            <p>
              Additional content stays inside the modal body while the header
              and footer remain anchored for long confirmation flows.
            </p>
            <p>
              This keeps actions visible without expanding the modal beyond the
              viewport height.
            </p>
          </>
        )}
      </div>
      {!noFooter && (
        <div className="modal-preview-footer">
          <Button radius="pill" size={buttonSize} variant="outline-neutral">
            Button
          </Button>
          <Button
            radius="pill"
            size={buttonSize}
            variant={action === "destructive" ? "destructive" : "primary"}
          >
            Confirm & Proceed
          </Button>
        </div>
      )}
    </div>
  );
}

function ModalCloseStatePreview() {
  return (
    <div className="modal-close-state-grid">
      <div className="modal-close-state-item">
        <span>default</span>
        <ModalPreviewCloseButton />
      </div>
      <div className="modal-close-state-item">
        <span>hover</span>
        <ModalPreviewCloseButton state="hover" />
      </div>
      <div className="modal-close-state-item">
        <span>focus</span>
        <ModalPreviewCloseButton state="focus" />
      </div>
    </div>
  );
}

function ModalLivePreview({ size }: { size: "medium" | "small" }) {
  const isSmall = size === "small";
  const buttonSize = isSmall ? "md" : "lg";

  return (
    <Modal>
      <ModalTrigger asChild>
        <Button>Open {size} modal</Button>
      </ModalTrigger>
      <ModalContent size={isSmall ? "sm" : "md"}>
        <ModalHeader>
          <ModalTitle>Confirm Your Action</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <ModalDescription className="m-0">
            {modalPreviewParagraphs[0]}
          </ModalDescription>
          <p className="m-0">{modalPreviewParagraphs[1]}</p>
        </ModalBody>
        <ModalFooter>
          <Button radius="pill" size={buttonSize} variant="outline-neutral">
            Button
          </Button>
          <Button radius="pill" size={buttonSize}>
            Confirm & Proceed
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

const toastTones = ["info", "warning", "success", "error"] as const;

function ToastActionLink() {
  return (
    <a href="#toast-message" onClick={(event) => event.preventDefault()}>
      Click here
    </a>
  );
}

function ToastPreviewItem({
  children,
  label,
}: {
  children: ReactNode;
  label: string;
}) {
  return (
    <div className="toast-preview-item">
      <span>{label}</span>
      {children}
    </div>
  );
}

function ToastScreenPreview({
  mobile = false,
  stack = false,
}: {
  mobile?: boolean;
  stack?: boolean;
}) {
  return (
    <div className={mobile ? "toast-mobile-frame" : "toast-desktop-frame"}>
      <div className="toast-screen-surface">
        <div className="toast-screen-toolbar" />
        <div
          className={`toast-screen-stack ${
            mobile ? "toast-screen-stack-mobile" : "toast-screen-stack-desktop"
          }`}
        >
          {stack && (
            <Toast
              dismissible={false}
              heading="Message heading"
              tone="success"
            >
              We inform you about service changes.
            </Toast>
          )}
          <Toast heading="Message heading">
            We inform you about service changes.
          </Toast>
        </div>
      </div>
    </div>
  );
}

export function ToastPage() {
  return (
    <div className="docs-page" id="toast-message">
      <PageHeader
        description="Toast messages provide brief contextual feedback after an event. The component covers the visual surface; placement, timing, queues, and product-specific notification logic stay in the consuming app."
        eyebrow="Components"
        title="Toast Message"
      />
      <div className="component-grid one">
        <ExampleCard title="Breakpoints">
          <div className="toast-breakpoint-grid">
            <ToastPreviewItem label="desktop">
              <ToastScreenPreview />
            </ToastPreviewItem>
            <ToastPreviewItem label="mobile">
              <ToastScreenPreview mobile />
            </ToastPreviewItem>
          </div>
        </ExampleCard>

        <ExampleCard
          description="Each tone maps to a semantic message type: info, warning, success, or error."
          title="Styles"
        >
          <div className="toast-preview-row">
            {toastTones.map((tone) => (
              <ToastPreviewItem key={tone} label={tone}>
                <Toast heading="Message heading" tone={tone}>
                  We inform you about service changes.
                </Toast>
              </ToastPreviewItem>
            ))}
          </div>
        </ExampleCard>

        <ExampleCard title="Variations">
          <div className="toast-preview-grid">
            <ToastPreviewItem label="w/ heading">
              <Toast heading="Message heading">
                We inform you about service changes.
              </Toast>
            </ToastPreviewItem>
            <ToastPreviewItem label="w/ link">
              <Toast action={<ToastActionLink />} heading="Message heading">
                We inform you about service changes.
              </Toast>
            </ToastPreviewItem>
            <ToastPreviewItem label="close: n/a">
              <Toast dismissible={false} heading="Message heading">
                We inform you about service changes.
              </Toast>
            </ToastPreviewItem>
            <ToastPreviewItem label="text-only">
              <Toast>We inform you about service changes.</Toast>
            </ToastPreviewItem>
            <ToastPreviewItem label="text-only w/ link">
              <Toast action={<ToastActionLink />}>
                We inform you about service changes.
              </Toast>
            </ToastPreviewItem>
            <ToastPreviewItem label="text-only close: n/a">
              <Toast dismissible={false}>
                We inform you about service changes.
              </Toast>
            </ToastPreviewItem>
          </div>
        </ExampleCard>

        <ExampleCard title="States">
          <div className="toast-preview-row">
            <ToastPreviewItem label="default">
              <Toast heading="Message heading">
                We inform you about service changes.
              </Toast>
            </ToastPreviewItem>
            <ToastPreviewItem label="hover">
              <Toast heading="Message heading" previewState="hover">
                We inform you about service changes.
              </Toast>
            </ToastPreviewItem>
            <ToastPreviewItem label="focus">
              <Toast heading="Message heading" previewState="focus">
                We inform you about service changes.
              </Toast>
            </ToastPreviewItem>
          </div>
        </ExampleCard>

        <ExampleCard
          description="Desktop toasts appear at the top-right. Mobile toasts sit near the bottom above persistent navigation or system UI."
          title="Placement"
        >
          <div className="toast-breakpoint-grid">
            <ToastPreviewItem label="default-placement: desktop">
              <ToastScreenPreview />
            </ToastPreviewItem>
            <ToastPreviewItem label="default-placement: mobile">
              <ToastScreenPreview mobile />
            </ToastPreviewItem>
            <ToastPreviewItem label="vertical-stack: desktop">
              <ToastScreenPreview stack />
            </ToastPreviewItem>
          </div>
        </ExampleCard>

        <ExampleCard title="Behavior">
          <div className="toast-preview-grid">
            <ToastPreviewItem label="auto-dismissive">
              <Toast dismissible={false} heading="Message heading" tone="success">
                We inform you about service changes.
              </Toast>
            </ToastPreviewItem>
            <ToastPreviewItem label="manually-dismissive">
              <Toast
                action={<ToastActionLink />}
                heading="Message heading"
                tone="warning"
              >
                We inform you about service changes.
              </Toast>
            </ToastPreviewItem>
          </div>
        </ExampleCard>

        <ExampleCard title="Truncation">
          <div className="toast-preview-grid">
            <ToastPreviewItem label="heading">
              <Toast
                dismissible={false}
                heading="Your session is about to expire due to inactivity. Save your changes or continue your activity to stay signed in."
                tone="warning"
              >
                For your security, we will automatically log you out in 2
                minutes.
              </Toast>
            </ToastPreviewItem>
            <ToastPreviewItem label="body">
              <Toast
                dismissible={false}
                heading="Your session has expired"
                tone="warning"
              >
                For your security, we will automatically log you out in 2
                minutes. Save your changes or continue your activity to stay
                signed in.
              </Toast>
            </ToastPreviewItem>
          </div>
        </ExampleCard>
      </div>
    </div>
  );
}

export function ModalPage() {
  return (
    <div className="docs-page">
      <PageHeader
        description="Modal interrupts the current task with focused content and disables the rest of the page until it is dismissed."
        eyebrow="Components"
        title="Modal"
      />
      <div className="component-grid one">
        <ExampleCard title="Breakpoints">
          <div className="modal-preview-grid">
            <div className="modal-preview-item">
              <span>desktop</span>
              <ModalStaticPreview />
            </div>
            <div className="modal-preview-item">
              <span>mobile</span>
              <ModalStaticPreview mobile />
            </div>
          </div>
        </ExampleCard>

        <ExampleCard title="Sizes: Desktop">
          <div className="modal-preview-grid">
            <div className="modal-preview-item">
              <span>medium</span>
              <ModalStaticPreview />
            </div>
            <div className="modal-preview-item">
              <span>small</span>
              <ModalStaticPreview size="small" />
            </div>
          </div>
        </ExampleCard>

        <ExampleCard title="Types">
          <div className="modal-preview-grid">
            <div className="modal-preview-item">
              <span>primary action</span>
              <ModalStaticPreview />
            </div>
            <div className="modal-preview-item">
              <span>destructive action</span>
              <ModalStaticPreview action="destructive" />
            </div>
          </div>
        </ExampleCard>

        <ExampleCard title="Variations">
          <div className="modal-preview-grid">
            <div className="modal-preview-item">
              <span>image</span>
              <ModalStaticPreview image />
            </div>
            <div className="modal-preview-item">
              <span>footer: n/a</span>
              <ModalStaticPreview noFooter />
            </div>
          </div>
        </ExampleCard>

        <ExampleCard title="States">
          <ModalCloseStatePreview />
        </ExampleCard>

        <ExampleCard title="Scrollbar Content">
          <div className="modal-preview-grid">
            <div className="modal-preview-item">
              <span>long content</span>
              <ModalStaticPreview scroll />
            </div>
          </div>
        </ExampleCard>

        <ExampleCard title="Preview">
          <div className="modal-live-preview">
            <ModalLivePreview size="medium" />
            <ModalLivePreview size="small" />
          </div>
        </ExampleCard>
      </div>
    </div>
  );
}
