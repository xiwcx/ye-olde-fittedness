import { G } from "@mobily/ts-belt";
import { type NextPage } from "next";
import { useRouter } from "next/router";
import { FormExercise } from "~/components/forms/FormExercise";
import { api } from "~/utils/api";

const {
  getOne: { useQuery },
  update: { useMutation },
} = api.exercise;

const getId = (id: unknown) => (G.isString(id) ? id : "");

const EditExercisePage: NextPage = () => {
  const { push, query } = useRouter();
  const id = getId(query.id);
  const { isLoading, data } = useQuery({ id });
  const { isLoading: isSubmitting, mutate } = useMutation({
    onSuccess: () => push("/exercises/"),
  });

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <FormExercise
      defaultValues={G.isNotNullable(data) ? data : undefined}
      isSubmitting={isSubmitting}
      onSubmit={(d) => mutate({ id, ...d })}
    />
  );
};

export default EditExercisePage;
