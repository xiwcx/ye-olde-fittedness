import { A } from "@mobily/ts-belt";
import convert from "convert";

export const WEIGHT_OPTIONS = ["lb", "kg"] as const;

export type WeightOption = (typeof WEIGHT_OPTIONS)[number];

const storedUnit = "gram";

export const isWeightOption = (o: unknown): o is WeightOption =>
  A.includes(WEIGHT_OPTIONS, o);

export const convertFromGrams = (
  weightInGrams: number | string,
  unit: WeightOption
) => Math.round(convert(Number(weightInGrams), storedUnit).to(unit));

export const convertToGrams = (weight: number | string, unit: WeightOption) =>
  Math.round(convert(Number(weight), unit).to(storedUnit));
