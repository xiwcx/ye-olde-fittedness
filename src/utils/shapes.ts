import { z } from "zod";

export const paginationSchema = z.object({
  page: z.number(),
  limit: z.number(),
});

export const exerciseSchema = z.object({ name: z.string() });
export type ExerciseSchema = z.infer<typeof exerciseSchema>;

export const liftSchema = z.object({
  attempted: z.boolean(),
  exerciseId: z.string(),
  date: z.date(),
  repQuantity: z.number(),
  setQuantity: z.number(),
  weight: z.number().min(1, { message: "no weight is just cardio" }),
});
export type LiftSchema = z.infer<typeof liftSchema>;
