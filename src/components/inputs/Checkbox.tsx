import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

type ButtonProps = {
  disabled?: boolean;
  checked?: boolean;
};

export const Checkbox = ({ disabled, checked }: ButtonProps) => {
  return <input type="checkbox" checked={checked} className="checkbox" />;
};
