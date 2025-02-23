import { and, asc, between, count, eq, gte, like, lte } from "drizzle-orm"
import { z } from "zod"
import {
  createTRPCRouter,
  moderatorProcedure,
  publicProcedure
} from "@/server/api/trpc"
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
    }),
  getLast: publicProcedure
    .input(
      z.object({
        page: z.number().transform(page => page - 1)
      })
    )
    .query(async ({ ctx }) => {
      return await Promise.all([
        ctx.db.query.document.findMany({
          limit: 10,
          orderBy: [asc(document.createdAt)]
        })
      ])
    }),
  create: moderatorProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
        link: z.string().url(),
        publishedAt: z.date()
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.insert(document).values({
        ...input,
        userId: ctx.session?.user?.id!
      })
    }),
  getUserDocuments: moderatorProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.document.findMany({
      where: eq(document.userId, ctx?.session?.user?.id!)
    })
  }),
  update: moderatorProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
        link: z.string(),
        id: z.string()
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input

      const existingDocument = await ctx.db.query.document.findFirst({
        where: eq(document.id, id)
      })

      if (!existingDocument) {
        throw new Error("Материал не найден")
      }

      if (existingDocument.userId !== ctx?.session?.user?.id) {
        throw new Error("У вас нет прав для редактирования этого материала")
      }

      await ctx.db.update(document).set(data).where(eq(document.id, id))

      return { success: true, message: "Документ успешно обновлён" }
    }),
  delete: moderatorProcedure
    .input(
      z.object({
        id: z.string()
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id } = input

      const existingDocument = await ctx.db.query.document.findFirst({
        where: eq(document.id, id)
      })

      if (!existingDocument) {
        throw new Error("Документ не найден")
      }

      if (existingDocument.userId !== ctx?.session?.user?.id) {
        throw new Error("У вас нет прав для удаления этого документа")
      }

      await ctx.db.delete(document).where(eq(document.id, id))

      return { success: true, message: "Документ успешно удалён" }
    })
})
