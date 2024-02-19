import { createNextApiHandler } from "@trpc/server/adapters/next";
import { appRouter } from "@/lib/server/api/root";
import { createTRPCContext } from "@/lib/server/api/trpc";

// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext: createTRPCContext,
  onError: ({ path, error }) => {
    console.error(`❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`);
  },
});
