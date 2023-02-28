import type { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

type ButtonProps = {
  disabled?: boolean;
  children: React.ReactNode;
  type?: DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >["type"];
  onClick?: () => void;
};

export const Button = ({ children, disabled, onClick, type }: ButtonProps) => (
  <button
    className="btn-primary btn"
    disabled={disabled}
    onClick={onClick}
    type={type}
  >
    {children}
  </button>
);
