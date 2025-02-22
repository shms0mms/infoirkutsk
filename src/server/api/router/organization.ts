import { eq } from "drizzle-orm"
import { z } from "zod"
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc"
import { organization } from "@/server/db/schema"

export const organizationRouter = createTRPCRouter({
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.query.organization.findFirst({
        where: eq(organization.id, input.id)
      })
    }),

  getAll: publicProcedure.query(async ({ ctx, input }) => {
    return await ctx.db.query.organization.findMany()
  })
})
