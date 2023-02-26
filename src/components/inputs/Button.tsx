import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

type ButtonProps = {
  disabled?: boolean;
  children: React.ReactNode;
  type?: DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >["type"];
};

export const Button = ({ children, disabled, type }: ButtonProps) => {
  return (
    <button className="btn-primary btn" disabled={disabled} type={type}>
      {children}
    </button>
  );
};
