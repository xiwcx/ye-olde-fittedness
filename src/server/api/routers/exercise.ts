import { A, F, pipe } from "@mobily/ts-belt";
import type { Exercise } from "@prisma/client";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { caseInsensitiveCompare } from "~/utils/helpers";
import { getTotalPages } from "~/utils/routers";
import {
  exerciseSchema,
  paginationInputSchema,
  type PaginationReturnSchema,
} from "~/utils/shapes";

/**
 * Prisma supports case-insensitive filtering, but not sorting.
 * There is an open issue since 2020: https://github.com/prisma/prisma/issues/5068
 *
 * There is a pgsql-specific native mappint, `@db.Citext`, but that relies upon
 * the `citext` extension, which in turn relies upon the a prisma preview
 * feature (`postgresqlExtensions`). Which either doesn't work or doesn't work with
 * Railway provisioned databases.
 *
 * So maybe revisit this if there are enough exercises stored that this sort becomes
 * inefficient.
 */
const getSortedExercises = (exercises: Exercise[]) =>
  pipe(
    exercises,
    A.sort((a, b) => caseInsensitiveCompare(a.name, b.name)),
    F.toMutable
  );

export const exerciseRouter = createTRPCRouter({
  create: protectedProcedure.input(exerciseSchema).mutation(({ ctx, input }) =>
    ctx.prisma.exercise.create({
      data: { name: input.name, userId: ctx.session.user.id },
    })
  ),

  getAll: protectedProcedure.query(async ({ ctx }) => {
    const exercises = await ctx.prisma.exercise.findMany({
      where: { userId: ctx.session.user.id },
    });

    return getSortedExercises(exercises);
  }),

  getMany: protectedProcedure
    .input(paginationInputSchema)
    .query<PaginationReturnSchema<{ exercises: Exercise[] }>>(
      async ({ ctx, input: { page, limit } }) => {
        const skip = (page - 1) * limit;
        const where = { userId: ctx.session.user.id };
        const exercises = await ctx.prisma.exercise.findMany({
          skip,
          take: limit,
          where,
        });
        const count = await ctx.prisma.exercise.count({ where });

        return {
          count,
          exercises: getSortedExercises(exercises),
          page,
          limit,
          totalPages: getTotalPages(limit, count),
        };
      }
    ),

  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) =>
      ctx.prisma.exercise.findFirst({
        where: { id: input.id, userId: ctx.session.user.id },
      })
    ),

  update: protectedProcedure
    .input(exerciseSchema.extend({ id: z.string() }))
    .mutation(({ ctx, input }) =>
      ctx.prisma.exercise.update({ data: input, where: { id: input.id } })
    ),
});
