import { G } from "@mobily/ts-belt";
import { type NextPage } from "next";
import { useRouter } from "next/router";
import { FormLift } from "~/components/forms/FormLift/FormLift";
import { api } from "~/utils/api";
import { getStringFromQueryParam } from "~/utils/helpers";

const {
  getOne: { useQuery },
  update: { useMutation },
} = api.lift;

const EditLiftPage: NextPage = () => {
  const { query, push } = useRouter();
  const id = getStringFromQueryParam(query.id);
  const { isLoading, data } = useQuery(id, { cacheTime: 0 });
  const { isLoading: isSubmitting, mutate } = useMutation({
    onSuccess: () => push("/"),
  });

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <FormLift
      isSubmitting={isSubmitting}
      initialValues={G.isNotNullable(data) ? data : undefined}
      onSubmit={(data) => mutate({ id, ...data })}
    />
  );
};

export default EditLiftPage;
