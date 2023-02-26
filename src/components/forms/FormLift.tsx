import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Checkbox, TextInput, InputWrapper, Button } from "../inputs";

const setSchema = z.object({
  repQuantity: z.number(),
  setQuantity: z.number(),
  setWeight: z.number(),
  attempted: z.boolean(),
});

type SetSchema = z.infer<typeof setSchema>;

export const FormLift = () => {
  const { handleSubmit } = useForm<SetSchema>({
    resolver: zodResolver(setSchema),
  });

  return (
    <form onSubmit={handleSubmit((d) => console.log(d))}>
      <InputWrapper label="Reps">
        <TextInput />
      </InputWrapper>

      <InputWrapper label="Sets">
        <TextInput />
      </InputWrapper>

      <InputWrapper label="Weight">
        <TextInput />
      </InputWrapper>

      <InputWrapper label="Attempted">
        <Checkbox />
      </InputWrapper>

      <Button type="submit">Submit</Button>
    </form>
  );
};
