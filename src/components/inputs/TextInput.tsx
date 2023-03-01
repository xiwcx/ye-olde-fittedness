import { G } from "@mobily/ts-belt";
import clsx from "clsx";
import { useContext } from "react";
import { format } from "date-fns";
import {
  type Control,
  type FieldValues,
  type Path,
  useController,
} from "react-hook-form";
import { InputWrapperContext } from "./InputWrapper";

type TextInputProps = {
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: "text" | "number" | "datetime-local";
  value?: string;
};

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
      onChange={onChange}
      type={type}
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
