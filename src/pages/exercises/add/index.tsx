import { type NextPage } from "next";
import { useRouter } from "next/router";
import { FormExercise } from "~/components/forms/FormExercise";
import { api } from "~/utils/api";

const { useMutation } = api.exercise.create;

const AddExercisePage: NextPage = () => {
  const { push } = useRouter();
  const { isLoading, mutate } = useMutation({
    onSuccess: () => push("/exercises/"),
  });

  return <FormExercise isSubmitting={isLoading} onSubmit={mutate} />;
};

export default AddExercisePage;
