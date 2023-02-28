import { A } from "@mobily/ts-belt";
import clsx from "clsx";
import Link from "next/link";

type PageProps = {
  page: number;
  currentPage: number;
};

const Page = ({ page, currentPage }: PageProps) => (
  <Link
    className={clsx("btn", { "btn-active": page === currentPage })}
    href={{ query: { skip: page } }}
  >
    {page}
  </Link>
);

type PaginationProps = {
  currentPage?: number;
  totalPages?: number;
};

export const Pagination = ({
  currentPage = 1,
  totalPages = 1,
}: PaginationProps) => (
  <div className="btn-group">
    {A.range(1, totalPages).map((page) => (
      <Page key={page} page={page} currentPage={currentPage} />
    ))}
  </div>
);
