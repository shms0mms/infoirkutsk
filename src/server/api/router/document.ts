import { count, gte, like, lte, or } from "drizzle-orm"
import { z } from "zod"
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc"
import { document } from "@/server/db/schema"

export const documentRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(
      z.object({
        page: z.number().transform(page => page - 1),
        titleTerm: z.string().optional(),
        descriptionTerm: z.string().optional(),
        publishedAtFrom: z.date().optional(),
        publishedAtTo: z.date().optional(),
        status: z.string().optional(),
        limit: z.number().default(30)
      })
    )
    .query(async ({ ctx, input }) => {
      const limit = input.limit

      const countQuery = ctx.db
        .select({ count: count() })
        .from(document)
        .then(result => result[0]!.count)

      const whereConditions = []
      console.log(input)

      if (input.titleTerm) {
        whereConditions.push(like(document.title, input.titleTerm))
      }
      if (input.descriptionTerm) {
        whereConditions.push(like(document.description, input.descriptionTerm))
      }
      if (input.publishedAtFrom) {
        whereConditions.push(gte(document.createdAt, input.publishedAtFrom))
      }
      if (input.publishedAtTo) {
        whereConditions.push(lte(document.createdAt, input.publishedAtTo))
      }

      const whereClause =
        whereConditions.length > 1 ? or(...whereConditions) : whereConditions[0]

      const documentsQuery = ctx.db
        .select()
        .from(document)
        .where(whereClause)
        .limit(limit)
        .offset(input.page * input.limit)
      return Promise.all([documentsQuery, countQuery])
    })
})
