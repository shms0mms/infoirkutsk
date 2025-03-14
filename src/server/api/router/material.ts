import { and, asc, count, eq, or } from "drizzle-orm"
import { z } from "zod"
import { createMaterialSchema, materialSchema } from "@/lib/schemas"
import {
  createTRPCRouter,
  moderatorProcedure,
  protectedProcedure,
  publicProcedure
} from "@/server/api/trpc"
import { category, material } from "@/server/db/schema"

export const materialRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(
      z.object({
        page: z.number().transform(page => page - 1),
        limit: z.number().default(30),
        slug: z.string().optional()
      })
    )
    .query(async ({ ctx, input }) => {
      const limit = input.limit
      let categoryQuery = null
      if (input.slug) {
        categoryQuery = await ctx.db.query.category.findFirst({
          where: eq(category.slug, input.slug!)
        })
      }
      const countQuery = ctx.db
        .select({
          count: count()
        })
        .from(material)
        .where(
          categoryQuery ? eq(material.categoryId, categoryQuery.id) : undefined
        )
        .then(result => result[0]!.count)

      return await Promise.all([
        ctx.db.query.material.findMany({
          limit,
          offset: input.page * limit,
          where: categoryQuery
            ? eq(material.categoryId, categoryQuery.id)
            : undefined
        }),
        countQuery
      ])
    }),

  getRequests: moderatorProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.material.findMany({
      where: eq(material.status, "in-progress")
    })
  }),

  getLast: publicProcedure
    .input(
      z.object({
        page: z.number().transform(page => page - 1)
      })
    )
    .query(async ({ ctx }) => {
      return await Promise.all([
        ctx.db.query.material.findMany({
          where: eq(material.status, "accepted"),
          limit: 10,
          orderBy: [asc(material.publishedAt)]
        })
      ])
    }),

  getById: publicProcedure
    .input(
      z.object({
        id: z.string()
      })
    )
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.material.findFirst({
        where: eq(material.id, input.id)
      })
    }),

  update: protectedProcedure
    .input(
      materialSchema.pick({
        title: true,
        description: true,
        fileType: true,
        fileUrl: true,
        author: true,
        status: true,
        publishedAt: true,
        id: true,
        categoryId: true
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input

      const existingMaterial = await ctx.db.query.material.findFirst({
        where: eq(material.id, id)
      })

      if (!existingMaterial) {
        throw new Error("Материал не найден")
      }

      if (existingMaterial.userId !== ctx.session.user.id) {
        throw new Error("У вас нет прав для редактирования этого материала")
      }

      await ctx.db.update(material).set(data).where(eq(material.id, id))

      return { success: true, message: "Материал успешно обновлён" }
    }),

  create: protectedProcedure
    .input(createMaterialSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.insert(material).values({
        ...input,
        userId: ctx.session.user.id
      })
    }),

  createRequest: protectedProcedure
    .input(
      z.object({
        id: z.string()
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id } = input

      const existingMaterial = await ctx.db.query.material.findFirst({
        where: eq(material.id, id)
      })

      if (!existingMaterial) {
        throw new Error("Материал не найден")
      }

      if (existingMaterial.userId !== ctx.session.user.id) {
        throw new Error("У вас нет прав для изменения этого материала")
      }

      await ctx.db
        .update(material)
        .set({ status: "in-progress" })
        .where(eq(material.id, id))

      return {
        success: true,
        message: "Статус материала изменён на 'in-progress'"
      }
    }),

  getUserMaterials: protectedProcedure
    .input(
      z.object({
        tab: z.string().default("all")
      })
    )
    .query(async ({ ctx, input }) => {
      const { tab } = input

      const tabFilters = {
        published: eq(material.status, "accepted"),
        unpublished: or(eq(material.status, "rejected")),
        requests: eq(material.status, "in-progress"),
        drafts: eq(material.status, "draft")
      } as const

      const whereCondition =
        tab === "all"
          ? eq(material.userId, ctx.session.user.id)
          : and(
              eq(material.userId, ctx.session.user.id),
              tabFilters[tab as keyof typeof tabFilters]
            )

      const materials = ctx.db.query.material.findMany({
        where: whereCondition
      })

      return await Promise.all([materials])
    }),
  delete: protectedProcedure
    .input(
      z.object({
        id: z.string()
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id } = input

      const existingMaterial = await ctx.db.query.material.findFirst({
        where: eq(material.id, id)
      })

      if (!existingMaterial) {
        throw new Error("Материал не найден")
      }

      if (existingMaterial.userId !== ctx.session.user.id) {
        throw new Error("У вас нет прав для удаления этого материала")
      }

      await ctx.db.delete(material).where(eq(material.id, id))

      return { success: true, message: "Материал успешно удален" }
    })
})
