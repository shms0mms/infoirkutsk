import { count, eq } from "drizzle-orm"
import { z } from "zod"
import {
  createTRPCRouter,
  moderatorProcedure,
  publicProcedure
} from "@/server/api/trpc"
import { material } from "@/server/db/schema"

export const requestsRouter = createTRPCRouter({
  accept: moderatorProcedure
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

      await ctx.db
        .update(material)
        .set({ status: "accepted", publishedAt: new Date() })
        .where(eq(material.id, id))

      return {
        success: true,
        material: existingMaterial,
        message: "Статус материала изменён на 'accepted'"
      }
    }),
  decline: moderatorProcedure
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

      await ctx.db
        .update(material)
        .set({ status: "rejected" })
        .where(eq(material.id, id))

      return {
        success: true,
        material: existingMaterial,
        message: "Статус материала изменён на 'rejected'"
      }
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.material.findMany({
      where: eq(material.status, "in-progress")
    })
  }),
  getRequestsCount: moderatorProcedure.query(async ({ ctx }) => {
    return await ctx.db
      .select({ count: count() })
      .from(material)
      .where(eq(material.status, "in-progress"))
      .then(result => result[0]!.count)
  })
})
