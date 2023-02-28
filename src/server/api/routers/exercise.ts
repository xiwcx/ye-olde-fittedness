import { take } from "@mobily/ts-belt/dist/types/Array";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { getTotalPages } from "~/utils/routers";
import { exerciseSchema, paginationSchema } from "~/utils/shapes";

export const exerciseRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) =>
    ctx.prisma.exercise.findMany({
      where: { userId: ctx.session.user.id },
      orderBy: { title: "asc" },
    })
  ),

  getMany: protectedProcedure
    .input(paginationSchema)
    .query(async ({ ctx, input: { page, limit } }) => {
      const skip = (page - 1) * limit;
      const where = { userId: ctx.session.user.id };
      const exercises = await ctx.prisma.exercise.findMany({
        orderBy: { title: "asc" },
        skip,
        take: limit,
        where,
      });
      const count = await ctx.prisma.exercise.count({ where });

      return {
        count,
        exercises,
        page,
        limit,
        totalPages: getTotalPages(limit, count),
      };
    }),

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
