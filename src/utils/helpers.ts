import { G, S } from "@mobily/ts-belt";

export const isNonEmptyString = (value: unknown): value is string =>
  G.isString(value) && S.isNotEmpty(value);

export const getStringFromQueryParam = (str: string | string[] | undefined) =>
  G.isString(str) ? str : "";
