import { Control, useController } from "react-hook-form";
import { Select } from "~/components/inputs";
import { api } from "~/utils/api";
import { LiftSchema } from "~/utils/shapes";

type SelectExerciseProps = {
  control: Control<LiftSchema>;
};

const { useQuery } = api.exercise.getAll;

export const SelectExercise = ({ control }: SelectExerciseProps) => {
  const {
    field: { onChange, value },
  } = useController({ name: "exerciseId", control });
  const { data, isLoading } = useQuery();

  return isLoading ? (
    <p>loading...</p>
  ) : (
    <Select onChange={onChange} defaultValue={value || "default"}>
      <option disabled value="default">
        Select an exercise
      </option>

      {data?.map((exercise) => (
        <option key={exercise.id} value={exercise.id}>
          {exercise.title}
        </option>
      ))}
    </Select>
  );
};
