import { eq } from "drizzle-orm"
import { z } from "zod"
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc"
import { user } from "@/server/db/schema"

export const userRouter = createTRPCRouter({
  getById: publicProcedure
    .input(
      z.object({
        id: z.string()
      })
    )
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.user.findFirst({
        where: eq(user.id, input.id)
      })
    })
})
