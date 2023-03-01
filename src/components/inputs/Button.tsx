import { S } from "@mobily/ts-belt";
import clsx from "clsx";
import type { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

type ButtonProps = {
  disabled?: boolean;
  children: React.ReactNode;
  type?: DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >["type"];
  onClick?: () => void;
  btnTheme?: "" | "primary" | "secondary" | "accent" | "ghost" | "link";
};

export const Button = ({
  btnTheme = "",
  children,
  disabled,
  onClick,
  type,
}: ButtonProps) => {
  const buttonClasses = clsx("btn", {
    [`btn-${btnTheme}`]: S.isNotEmpty(btnTheme),
  });

  return (
    <button
      className={buttonClasses}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};
