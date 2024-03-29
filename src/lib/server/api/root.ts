import { testRouter } from "@/lib/server/api/routers/test";
import { createTRPCRouter } from "@/lib/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  test: testRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
