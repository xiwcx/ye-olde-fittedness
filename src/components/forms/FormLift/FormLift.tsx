import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LiftSchema, liftSchema } from "~/utils/shapes";
import {
  Checkbox,
  InputWrapper,
  Button,
  ControlledTextInput,
  ControlledSelect,
} from "../../inputs";
import { SelectExercise } from "./SelectExercise";
import { A } from "@mobily/ts-belt";
import { FieldsetWeight } from "./FieldsetWeight";
import { SetOptional } from "type-fest";
import { DevTool } from "@hookform/devtools";

type LiftSchemaWithOptionalExercise = SetOptional<LiftSchema, "exerciseId">;

const defaultValues: LiftSchemaWithOptionalExercise = {
  attempted: false,
  date: new Date(),
  repQuantity: 10,
  setQuantity: 5,
  weight: 0,
};

const numberOptionElements = A.range(1, 20).map((n) => (
  <option value={n} key={n}>
    {n}
  </option>
));

type FormLiftProps = {
  initialValues?: LiftSchemaWithOptionalExercise;
  isSubmitting: boolean;
  onSubmit: (d: LiftSchema) => void;
};

export const FormLift = ({
  initialValues = defaultValues,
  isSubmitting,
  onSubmit,
}: FormLiftProps) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<LiftSchema>({
    defaultValues: initialValues,
    resolver: zodResolver(liftSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputWrapper label="Date" error={errors.date?.message}>
        <ControlledTextInput control={control} name="date" type="date" />
      </InputWrapper>

      <InputWrapper label="Exercise" error={errors.exerciseId?.message}>
        <SelectExercise control={control} />
      </InputWrapper>

      <InputWrapper label="Sets" error={errors.setQuantity?.message}>
        <ControlledSelect control={control} name="setQuantity" type="number">
          {numberOptionElements}
        </ControlledSelect>
      </InputWrapper>

      <InputWrapper label="Reps" error={errors.repQuantity?.message}>
        <ControlledSelect control={control} name="repQuantity" type="number">
          {numberOptionElements}
        </ControlledSelect>
      </InputWrapper>

      <InputWrapper label="Weight" error={errors.weight?.message}>
        <FieldsetWeight control={control} />
      </InputWrapper>

      <InputWrapper label="Attempted">
        <Checkbox />
      </InputWrapper>

      <DevTool control={control} />

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
};
