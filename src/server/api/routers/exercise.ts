import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { exerciseSchema } from "~/utils/shapes";

export const exerciseRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) =>
    ctx.prisma.exercise.findMany({
      where: { userId: ctx.session.user.id },
    })
  ),
  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) =>
      ctx.prisma.exercise.findFirst({
        where: { id: input.id, userId: ctx.session.user.id },
      })
    ),
  create: protectedProcedure.input(exerciseSchema).mutation(({ ctx, input }) =>
    ctx.prisma.exercise.create({
      data: { title: input.title, userId: ctx.session.user.id },
    })
  ),
  update: protectedProcedure
    .input(exerciseSchema.extend({ id: z.string() }))
    .mutation(({ ctx, input }) =>
      ctx.prisma.exercise.update({ data: input, where: { id: input.id } })
    ),
});
