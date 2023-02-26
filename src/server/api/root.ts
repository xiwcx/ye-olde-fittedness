import { createTRPCRouter } from "~/server/api/trpc";
import { exerciseRouter, liftRouter } from "./routers";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  exercise: exerciseRouter,
  lift: liftRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
