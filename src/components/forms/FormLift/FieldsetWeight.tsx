import { type Control, useController } from "react-hook-form";
import { Select, TextInput } from "~/components/inputs";
import { type LiftSchema } from "~/utils/shapes";
import convert from "convert";
import { useMemo, useState } from "react";
import { A } from "@mobily/ts-belt";

type ControlledFieldsetWeightProps = {
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

type FieldsetWeightProps = {
  onChange: (weightInGrams: number) => void;
  weightInGrams: number;
};

const convertFromGrams = (weightInGrams: number | string, unit: WeightOption) =>
  Math.round(convert(Number(weightInGrams), storedUnit).to(unit));
const convertToGrams = (weight: number | string, unit: WeightOption) =>
  Math.round(convert(Number(weight), unit).to(storedUnit));

export const FieldsetWeight = ({
  onChange,
  weightInGrams = 0,
}: FieldsetWeightProps) => {
  const [unit, setUnit] = useState<WeightOption>("lb");
  const displayWeight = useMemo(
    () => String(convertFromGrams(weightInGrams, unit)),
    [unit, weightInGrams]
  );

  return (
    <fieldset className="grid grid-cols-3 gap-4">
      <TextInput
        onChange={({ target: { value = "0" } }) =>
          onChange(convertToGrams(Number(value), unit))
        }
        className="col-span-2"
        value={displayWeight}
        type="number"
      />

      <Select
        onChange={({ target: { value } }) => {
          if (isWeightOption(value)) {
            setUnit(value);
            onChange(convertToGrams(displayWeight, value));
          }
        }}
        defaultValue={unit}
      >
        {weightOptionElements}
      </Select>
    </fieldset>
  );
};

export const ControlledFieldsetWeight = ({
  control,
}: ControlledFieldsetWeightProps) => {
  const {
    field: { onChange, value },
  } = useController({ name: "weight", control });

  return <FieldsetWeight onChange={onChange} weightInGrams={value} />;
};
