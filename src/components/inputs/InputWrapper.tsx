import { createContext } from "react";
import { isNonEmptyString } from "~/utils/helpers";

type InputWrapperProps = {
  children: React.ReactNode;
  error?: string;
  label?: string;
  labelAlt?: string;
};

type InputWrapperContext = {
  isError: boolean;
};

export const InputWrapperContext = createContext<InputWrapperContext>({
  isError: false,
});

export const InputWrapper = ({
  children,
  error,
  label,
  labelAlt,
}: InputWrapperProps) => {
  const hasError = isNonEmptyString(error);

  return (
    <div className="form-control w-full max-w-xs">
      <label className="label">
        {isNonEmptyString(label) && <span className="label-text">{label}</span>}
      </label>

      <InputWrapperContext.Provider value={{ isError: hasError }}>
        {children}
      </InputWrapperContext.Provider>

      <label className="label">
        {isNonEmptyString(label) && (
          <span className="label-text-alt">{labelAlt}</span>
        )}
      </label>
    </div>
  );
};
