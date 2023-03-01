import { type NextPage } from "next";
import { useRouter } from "next/router";
import { FormLift } from "~/components/forms/FormLift/FormLift";
import { api } from "~/utils/api";

const { useMutation } = api.lift.create;

const AddLiftPage: NextPage = () => {
  const { push } = useRouter();
  const { isLoading, mutate } = useMutation({
    onSuccess: () => push("/"),
  });

  return <FormLift isSubmitting={isLoading} onSubmit={mutate} />;
};

export default AddLiftPage;
