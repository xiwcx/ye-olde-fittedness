import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, InputWrapper } from "../inputs";
import { ControlledTextInput } from "../inputs/TextInput";
import { exerciseSchema, type ExerciseSchema } from "~/utils/shapes";

type FormExerciseProps = {
  defaultValues?: ExerciseSchema;
  isSubmitting: boolean;
  onSubmit: (data: ExerciseSchema) => void;
};

export const FormExercise = ({
  defaultValues,
  isSubmitting,
  onSubmit,
}: FormExerciseProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ExerciseSchema>({
    defaultValues,
    resolver: zodResolver(exerciseSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputWrapper label="Title" error={errors.title?.message}>
        <ControlledTextInput control={control} name="title" />
      </InputWrapper>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
};
