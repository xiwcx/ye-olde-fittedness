import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { getTotalPages } from "~/utils/routers";
import {
  type LiftWithExercise,
  type PaginationReturnSchema,
  liftSchema,
  paginationInputSchema,
} from "~/utils/shapes";

export const liftRouter = createTRPCRouter({
  create: protectedProcedure.input(liftSchema).mutation(({ ctx, input }) =>
    ctx.prisma.lift.create({
      data: { ...input, userId: ctx.session.user.id },
    })
  ),

  getMany: protectedProcedure.input(paginationInputSchema).query<
    PaginationReturnSchema<{
      lifts: LiftWithExercise[];
    }>
  >(async ({ ctx, input: { page, limit } }) => {
    const skip = (page - 1) * limit;
    const where = { userId: ctx.session.user.id };
    const lifts = await ctx.prisma.lift.findMany({
      skip,
      take: limit,
      where,
      include: { exercise: true },
      orderBy: { date: "desc" },
    });
    const count = await ctx.prisma.lift.count({ where });

    return {
      count,
      lifts,
      page,
      limit,
      totalPages: getTotalPages(limit, count),
    };
  }),

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
