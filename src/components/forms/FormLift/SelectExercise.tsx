import { type Control, useController } from "react-hook-form";
import { Select } from "~/components/inputs";
import { Loading } from "~/components/Loading";
import { api } from "~/utils/api";
import type { LiftSchema } from "~/utils/shapes";

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
    <Loading />
  ) : (
    <Select onChange={onChange} defaultValue={value || "default"}>
      <option disabled value="default">
        Select an exercise
      </option>

      {data?.map((exercise) => (
        <option key={exercise.id} value={exercise.id}>
          {exercise.name}
        </option>
      ))}
    </Select>
  );
};
