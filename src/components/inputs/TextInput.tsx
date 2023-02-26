import clsx from "clsx";
import { useContext } from "react";
import { InputWrapperContext } from "./InputWrapper";

type TextInputProps = {
  placeholder?: string;
  value?: string;
};

export const TextInput = ({ placeholder, value }: TextInputProps) => {
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
      type="text"
      placeholder={placeholder}
      className={inputClassnames}
      value={value}
    />
  );
};
