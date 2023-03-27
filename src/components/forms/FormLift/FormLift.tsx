import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type LiftSchema, liftSchema } from "~/utils/shapes";
import {
  Checkbox,
  InputWrapper,
  Button,
  ControlledTextInput,
  ControlledSelect,
} from "../../inputs";
import { SelectExercise } from "./SelectExercise";
import { A } from "@mobily/ts-belt";
import { ControlledFieldsetWeight } from "./FieldsetWeight";
import { DevTool } from "@hookform/devtools";

type PartialLiftSchema = Partial<LiftSchema>;

const defaultValues: PartialLiftSchema = {
  attempted: false,
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
  initialValues?: PartialLiftSchema;
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
        <ControlledTextInput
          control={control}
          name="date"
          type="datetime-local"
        />
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
        <ControlledFieldsetWeight control={control} />
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
