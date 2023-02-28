import { PropsWithChildren } from "~/utils/types";
import { Pagination } from "../Pagination";

type ListLayoutProps = {
  cta: React.ReactNode;
  pagination: React.ReactNode;
};

export const ListLayout = ({
  children,
  cta,
  pagination,
}: PropsWithChildren<ListLayoutProps>) => {
  return (
    <>
      <header className="mb-4 flex justify-end">{cta}</header>

      {children}

      <footer>{pagination}</footer>
    </>
  );
};
