import Link, { type LinkProps } from "next/link";
import { type PropsWithChildren } from "~/utils/types";

export const ButtonLink = ({
  children,
  ...linkProps
}: PropsWithChildren<Omit<LinkProps, "className">>) => {
  return (
    <Link {...linkProps} className="btn-primary btn">
      {children}
    </Link>
  );
};
