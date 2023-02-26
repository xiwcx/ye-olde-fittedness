import { z } from "zod";

export const exerciseSchema = z.object({ title: z.string() });
export type ExerciseSchema = z.infer<typeof exerciseSchema>;
