import clsx from "clsx";
import { useContext } from "react";
import {
  Control,
  FieldValues,
  Path,
  useController,
  UseControllerProps,
} from "react-hook-form";
import { InputWrapperContext } from "./InputWrapper";

type TextInputProps = {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: "text" | "number" | "date";
  value?: string;
};

export const TextInput = ({
  onChange,
  placeholder,
  type = "text",
  value,
}: TextInputProps) => {
  const { isError } = useContext(InputWrapperContext);
  const inputClassnames = clsx(
    "input-bordered",
    "input",
    "w-full",
    "max-w-xs",
    { "input-error": isError }
  );

  return (
    <input
      className={inputClassnames}
      onChange={onChange}
      placeholder={placeholder}
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
}

export const ControlledTextInput = <TFieldValues extends FieldValues>({
  control,
  name,
}: ControlledTextInputProps<TFieldValues>) => {
  const {
    field: { onChange, value },
  } = useController({
    control,
    name,
  });

  return <TextInput onChange={onChange} value={value} />;
};
