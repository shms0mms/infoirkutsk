import { and, between, count, gte, like, lte } from "drizzle-orm"
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
        publishedAtFrom: z
          .string()
          .optional()
          .transform(date => {
            return date ? new Date(decodeURIComponent(date)) : undefined
          }),
        publishedAtTo: z
          .string()
          .optional()
          .transform(date => {
            return date ? new Date(decodeURIComponent(date)) : undefined
          }),
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

      if (input.titleTerm) {
        whereConditions.push(like(document.title, input.titleTerm))
      }
      if (input.descriptionTerm) {
        whereConditions.push(like(document.description, input.descriptionTerm))
      }
      if (input.publishedAtFrom && input.publishedAtTo) {
        whereConditions.push(
          between(
            document.createdAt,
            input.publishedAtFrom,
            input.publishedAtTo
          )
        )
      }
      if (input.publishedAtFrom) {
        whereConditions.push(gte(document.createdAt, input.publishedAtFrom))
      }
      if (input.publishedAtTo) {
        whereConditions.push(lte(document.createdAt, input.publishedAtTo))
      }

      const whereClause =
        whereConditions.length > 1
          ? and(...whereConditions)
          : whereConditions[0]

      const documentsQuery = ctx.db
        .select()
        .from(document)
        .where(whereClause)
        .limit(limit)
        .offset(input.page * input.limit)
      return Promise.all([documentsQuery, countQuery])
    })
})
