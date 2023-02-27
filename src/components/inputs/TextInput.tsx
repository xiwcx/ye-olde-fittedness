import { G } from "@mobily/ts-belt";
import clsx from "clsx";
import { useContext } from "react";
import { Control, FieldValues, Path, useController } from "react-hook-form";
import { InputWrapperContext } from "./InputWrapper";

type TextInputProps = {
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: "text" | "number" | "date";
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
    case "date":
      return new Date(value);
    case "number":
      return Number(value);
    default:
      return String(value);
  }
};

const getValue = (value: unknown): string => {
  // @ts-expect-error - gudard narrows to `never` for some reason, issue filed: https://github.com/mobily/ts-belt/issues/73
  if (G.isDate(value)) return value.toISOString().split("T")[0];
  if (G.isNumber(value)) return value.toString();

  return String(value);
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
