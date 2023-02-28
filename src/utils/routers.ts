export const getTotalPages = (limit: number, count: number) =>
  Math.ceil(count / limit);
