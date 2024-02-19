import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/lib/server/api/trpc";

export const testRouter = createTRPCRouter({
  testMutate: publicProcedure
    .input(z.object({ text: z.string() }))
    .mutation(async ({ input }) => {
      return {
        result: input.text,
      };
    }),
});
