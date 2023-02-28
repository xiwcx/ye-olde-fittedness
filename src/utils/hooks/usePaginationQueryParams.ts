import { useRouter } from "next/router";

export const usePaginationQueryParams = () => {
  const { query } = useRouter();
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;

  return { page, limit };
};
