import { G, S } from "@mobily/ts-belt";

export const isNonEmptyString = (value: unknown): value is string =>
  G.isString(value) && S.isNotEmpty(value);
