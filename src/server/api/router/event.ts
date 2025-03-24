import { eq } from "drizzle-orm"
import { z } from "zod"
import {
  createTRPCRouter,
  moderatorProcedure,
  publicProcedure
} from "@/server/api/trpc"
import { event } from "@/server/db/schema"

export const eventRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.event.findMany()
  }),
  create: moderatorProcedure
    .input(
      z.object({
        name: z.string().min(1, "Название мероприятия должно быть указано"),
        link: z.string().min(1, "Ссылка на мероприятие"),
        description: z
          .string()
          .min(1, "Описание мероприятия должно быть указано")
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.insert(event).values({
        ...input
      })
    }),
  getById: publicProcedure
    .input(
      z.object({
        id: z.string()
      })
    )
    .query(async ({ ctx, input }) => {
      const { id } = input
      return await ctx.db.query.event.findFirst({
        where: eq(event.id, id)
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

      const existingCategory = await ctx.db.query.event.findFirst({
        where: eq(event.id, id)
      })

      if (!existingCategory) {
        throw new Error("Мероприятие не найдено")
      }

      await ctx.db.delete(event).where(eq(event.id, id))

      return { success: true, message: "Мероприятие успешно удалено" }
    })
})
