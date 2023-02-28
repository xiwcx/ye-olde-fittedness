import clsx from "clsx";
import { createContext } from "react";
import { isNonEmptyString } from "~/utils/helpers";
import type { PropsWithChildren } from "~/utils/types";

type InputWrapperProps = {
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
}: PropsWithChildren<InputWrapperProps>) => {
  const hasError = isNonEmptyString(error);
  const isLabelAltShown = hasError || isNonEmptyString(labelAlt);
  const labelAltClasses = clsx("label-text-alt", { "text-error": hasError });

  return (
    <div className="form-control w-full max-w-xs">
      <label className="label">
        {isNonEmptyString(label) && <span className="label-text">{label}</span>}
      </label>

      <InputWrapperContext.Provider value={{ isError: hasError }}>
        {children}
      </InputWrapperContext.Provider>

      <label className="label">
        {isLabelAltShown && (
          <span className={labelAltClasses}>
            {error || labelAlt} {/* error should take precedence */}
          </span>
        )}
      </label>
    </div>
  );
};
