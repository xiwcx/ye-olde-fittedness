import { useContext } from "react";
import { InputWrapperContext } from "./InputWrapper";
import { clsx } from "clsx";

type SelectProps = {
  children: React.ReactNode;
};

export const Select = ({ children }: SelectProps) => {
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

  return <select className={selectClassNames}>{children}</select>;
};
