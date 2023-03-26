import { G } from "@mobily/ts-belt";
import clsx from "clsx";
import {
  type DetailedHTMLProps,
  type InputHTMLAttributes,
  useContext,
} from "react";
import { format } from "date-fns";
import {
  type Control,
  type FieldValues,
  type Path,
  useController,
} from "react-hook-form";
import { InputWrapperContext } from "./InputWrapper";

type InputType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>["type"];

type NarrowedInputType = Extract<
  InputType,
  "datetime-local" | "number" | "text"
>;

type TextInputProps = {
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: NarrowedInputType;
  value?: string;
};

const inputTypes = new Map<NarrowedInputType, NarrowedInputType>([
  ["text", "text"],
  ["number", "text"],
  ["datetime-local", "datetime-local"],
]);

type InputMode = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>["inputMode"];

const inputModes = new Map<InputType, InputMode>([
  ["text", undefined],
  ["number", "numeric"],
  ["datetime-local", undefined],
]);

export const TextInput = ({
  className,
  onChange,
  type = "text",
  value,
}: TextInputProps) => {
  const { isError } = useContext(InputWrapperContext);
  const inputClassnames = clsx(
    "input-bordered",
    "input",
    "w-full",
    "max-w-xs",
    className,
    { "input-error": isError }
  );

  return (
    <input
      className={inputClassnames}
      inputMode={inputModes.get(type)}
      onChange={(e) => onChange(e)}
      type={inputTypes.get(type)}
      value={value}
    />
  );
};

interface ControlledTextInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends Path<TFieldValues> = Path<TFieldValues>
> {
  control: Control<TFieldValues>;
  name: TName;
  type?: TextInputProps["type"];
}

const setValue = (
  type: TextInputProps["type"],
  value: string | number | Date
) => {
  switch (type) {
    case "datetime-local":
      return new Date(value);
    case "number":
      return Number(value);
    default:
      return String(value);
  }
};

const getValue = (value: unknown): string => {
  if (G.isDate(value)) return format(value, "yyyy-MM-dd'T'HH:mm");
  if (G.isNumber(value)) return value.toString();

  return String(value || "");
};

export const ControlledTextInput = <TFieldValues extends FieldValues>({
  control,
  name,
  type,
}: ControlledTextInputProps<TFieldValues>) => {
  const {
    field: { onChange, value },
  } = useController({
    control,
    name,
  });

  return (
    <TextInput
      onChange={(e) => onChange(setValue(type, e.target.value))}
      value={getValue(value)}
      type={type}
    />
  );
};
