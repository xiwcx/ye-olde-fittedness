import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const liftRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) =>
    ctx.prisma.lift.findMany({ where: { userId: ctx.session.user.id } })
  ),
});
