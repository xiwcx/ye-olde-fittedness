import { PropsWithChildren } from "~/utils/types";

type ListLayoutProps = {
  CTA: React.ReactNode;
};

export const ListLayout = ({
  children,
  CTA,
}: PropsWithChildren<ListLayoutProps>) => {
  return (
    <>
      <header className="mb-4 flex justify-end">{CTA}</header>

      {children}
    </>
  );
};
