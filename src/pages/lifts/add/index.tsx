import { type NextPage } from "next";
import { useRouter } from "next/router";
import { FormLift } from "~/components/forms/FormLift/FormLift";
import { api } from "~/utils/api";

const { useMutation } = api.lift.create;

const AddLiftPage: NextPage = () => {
  const { push } = useRouter();
  const { mutate } = useMutation({ onSuccess: () => push("/lifts/") });

  return <FormLift onSubmit={mutate} />;
};

export default AddLiftPage;
