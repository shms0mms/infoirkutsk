import { eq, ilike } from "drizzle-orm"
import { z } from "zod"
import {
  createTRPCRouter,
  moderatorProcedure,
  publicProcedure
} from "@/server/api/trpc"
import { category, organization } from "@/server/db/schema"

export const categoryRouter = createTRPCRouter({
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.query.category.findFirst({
        where: eq(organization.id, input.id)
      })
    }),

  getAll: publicProcedure
    .input(
      z.object({
        name: z.string().optional()
      })
    )
    .query(async ({ ctx, input }) => {
      console.log(input.name)

      return await ctx.db.query.category.findMany({
        where: input.name ? ilike(category.name, input.name) : undefined
      })
    }),
  create: moderatorProcedure
    .input(
      z.object({
        name: z.string().min(1, "Название категории должно быть указано"),
        slug: z.string().min(1, "Название категории должно быть указано")
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.insert(category).values({
        ...input
      })
    }),
  delete: moderatorProcedure
    .input(
      z.object({
        id: z.string()
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id } = input

      const existingCategory = await ctx.db.query.category.findFirst({
        where: eq(category.id, id)
      })

      if (!existingCategory) {
        throw new Error("Категория не найдена")
      }

      await ctx.db.delete(category).where(eq(category.id, id))

      return { success: true, message: "Категория успешно удалена" }
    })
})
