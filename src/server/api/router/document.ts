// TODO: setup this with notes
import { z } from "zod"
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc"

export const documentRouter = createTRPCRouter({
  getAll: protectedProcedure
    .input(
      z.object({
        page: z.number().transform(page => page - 1),
        titleTerm: z.string().optional(),
        descriptionTerm: z.string().optional(),
        publishedAtFrom: z.date().optional(),
        publishedAtTo: z.date().optional()
      })
    )
    .query(({ ctx, input }) => {
      return ctx.db.query.documents.findMany({
        limit: 30,
        offset: input.page * input.page - 1
      })
    })
})
