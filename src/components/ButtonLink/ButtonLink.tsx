import Link, { LinkProps } from "next/link";

type FC<Props> = {
  children: React.ReactNode;
} & Props;

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
