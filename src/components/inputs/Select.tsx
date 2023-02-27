import { useContext } from "react";
import { Control, FieldValues, Path, useController } from "react-hook-form";
import { clsx } from "clsx";
import { InputWrapperContext } from "./InputWrapper";
import { PropsWithChildren } from "~/utils/types";

type SelectProps = {
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  defaultValue?: string;
};

export const Select = ({
  children,
  onChange,
  defaultValue,
}: PropsWithChildren<SelectProps>) => {
  const { isError } = useContext(InputWrapperContext);
  const selectClassNames = clsx(
    "select",
    "select-bordered",
    "w-full",
    "max-w-xs",
    {
      "select-error": isError,
    }
  );

  return (
    <select
      className={selectClassNames}
      onChange={onChange}
      defaultValue={defaultValue}
    >
      {children}
    </select>
  );
};

interface ControlledSelectProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends Path<TFieldValues> = Path<TFieldValues>
> {
  control: Control<TFieldValues>;
  name: TName;
  type?: "string" | "number";
}

export const ControlledSelect = <TFieldValues extends FieldValues>({
  children,
  control,
  name,
  type = "string",
}: PropsWithChildren<ControlledSelectProps<TFieldValues>>) => {
  const {
    field: { onChange, value },
  } = useController({ control, name });

  return (
    <Select
      onChange={({ target: { value } }) => {
        switch (type) {
          case "number":
            onChange(Number(value));
            break;
          default:
            onChange(value);
        }
      }}
      defaultValue={value}
    >
      {children}
    </Select>
  );
};
