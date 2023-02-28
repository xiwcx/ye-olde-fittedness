import { type Control, useController } from "react-hook-form";
import { Select, TextInput } from "~/components/inputs";
import { type LiftSchema } from "~/utils/shapes";
import convert from "convert";
import { useMemo, useState } from "react";
import { A } from "@mobily/ts-belt";

type FieldsetWeightProps = {
  control: Control<LiftSchema>;
};

type WeightOption = (typeof weightOptions)[number];

const storedUnit = "gram";
const weightOptions = ["lb", "kg"] as const;
const weightOptionElements = weightOptions.map((w) => (
  <option value={w} key={w}>
    {w}
  </option>
));
const isWeightOption = (o: unknown): o is WeightOption =>
  A.includes(weightOptions, o);
const getNewWeightInGrams = (value: string, unit: WeightOption) =>
  Math.round(convert(Number(value), unit).to(storedUnit));

export const FieldsetWeight = ({ control }: FieldsetWeightProps) => {
  const {
    field: { onChange, value: weightInGrams },
  } = useController({ name: "weight", control });
  const [unit, setUnit] = useState<WeightOption>("lb");
  const displayWeight = useMemo(
    () => String(Math.round(convert(weightInGrams, storedUnit).to(unit))),
    [unit, weightInGrams]
  );

  return (
    <fieldset className="grid grid-cols-3 gap-4">
      <TextInput
        onChange={({ target: { value = "0" } }) => {
          onChange(getNewWeightInGrams(value, unit));
        }}
        className="col-span-2"
        value={displayWeight}
        type="number"
      />

      <Select
        onChange={({ target: { value } }) => {
          if (isWeightOption(value)) {
            setUnit(value);
            onChange(getNewWeightInGrams(displayWeight, value));
          }
        }}
        defaultValue={"default"}
      >
        {weightOptionElements}
      </Select>
    </fieldset>
  );
};
