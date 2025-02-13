import { count } from "drizzle-orm"
import { z } from "zod"
import { isCuid } from "@/lib/utils"
import { CreateMaterialSchema } from "@/lib/schemas"
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure
} from "@/server/api/trpc"
import { materials } from "@/server/db/schema"

export const materialRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(
      z.object({
        page: z.number().transform(page => page - 1)
      })
    )
    .query(async ({ ctx, input }) => {
      const countQuery = ctx.db
        .select({
          count: count()
        })
        .from(materials)

      const tasksQuery = ctx.db.query.materials.findMany({
        limit: 30,
        offset: input.page * input.page - 1
      })
      const result = await Promise.all([countQuery, tasksQuery])
      const tasksCount = result[0][0]!.count
      const tasks = result[1]
      return [tasksCount, tasks]
    }),
  getLast: publicProcedure
    .input(
      z.object({
        page: z.number().transform(page => page - 1)
      })
    )
    .query(async ({ ctx, input }) => {
      const countQuery = ctx.db
        .select({
          count: count()
        })
        .from(materials)

      const tasksQuery = ctx.db.query.materials.findMany({
        limit: 30,
        offset: input.page * input.page - 1
      })
      const result = await Promise.all([countQuery, tasksQuery])
      const tasksCount = result[0][0]!.count
      const tasks = result[1]
      return [tasksCount, tasks]
    }),
  getById: publicProcedure
    .input(
      z.object({
        id: z.string()
      })
    )
    .query(async ({ ctx, input }) => {
      if (!isCuid(input.id)) return undefined

      return await ctx.db.query.materials.findFirst({
        where: (materialsTable, { eq }) => eq(materialsTable.id, input.id)
      })
    }),

  create: protectedProcedure.mutation(async ({ ctx, input }) => {
    const material: CreateMaterialSchema = input as any as CreateMaterialSchema
    const result = await ctx.db.insert(materials).values({
      ...material,
      userId: ctx.session.user.id
    })

    return result
  })
})
