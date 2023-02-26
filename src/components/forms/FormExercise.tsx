import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, InputWrapper, Select } from "../inputs";
import { TextInput } from "../inputs/TextInput";

const exerciseSchema = z.object({ title: z.string() });
type ExerciseSchema = z.infer<typeof exerciseSchema>;

export const FormExercise = () => {
  const { handleSubmit } = useForm<ExerciseSchema>({
    resolver: zodResolver(exerciseSchema),
  });

  return (
    <form onSubmit={handleSubmit((d) => console.log(d))}>
      <InputWrapper label="Title">
        <TextInput />
      </InputWrapper>

      <Button type="submit">Submit</Button>
    </form>
  );
};
