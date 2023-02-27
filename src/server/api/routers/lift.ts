import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { liftSchema } from "~/utils/shapes";

export const liftRouter = createTRPCRouter({
  create: protectedProcedure.input(liftSchema).mutation(({ ctx, input }) =>
    ctx.prisma.lift.create({
      data: { ...input, userId: ctx.session.user.id },
    })
  ),

  getAll: protectedProcedure.query(({ ctx }) =>
    ctx.prisma.lift.findMany({
      where: { userId: ctx.session.user.id },
      include: { exercise: true },
    })
  ),

  getOne: protectedProcedure.input(z.string()).query(({ ctx, input }) =>
    ctx.prisma.lift.findUnique({
      where: { id: input },
    })
  ),

  update: protectedProcedure
    .input(liftSchema.extend({ id: z.string() }))
    .mutation(({ ctx, input }) =>
      ctx.prisma.lift.update({ where: { id: input.id }, data: input })
    ),
});
