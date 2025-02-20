import { eq } from "drizzle-orm"
import { z } from "zod"
import { createCommentSchema } from "@/lib/schemas"
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure
} from "@/server/api/trpc"
import { comment } from "@/server/db/schema"

export const commentRouter = createTRPCRouter({
  create: protectedProcedure
    .input(createCommentSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.insert(comment).values(input)
    }),

  getComments: publicProcedure
    .input(
      z.object({
        materialId: z.string()
      })
    )
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.comment.findMany({
        where: eq(comment.materialId, input.materialId)
      })
    })
})
