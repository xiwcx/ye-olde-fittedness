import Link, { LinkProps } from "next/link";

export const ButtonLink = ({
  children,
  ...linkProps
}: FC<Omit<LinkProps, "className">>) => {
  return (
    <Link {...linkProps} className="btn-primary btn">
      {children}
    </Link>
  );
};
