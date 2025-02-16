import { asc, count, eq } from "drizzle-orm"
import { z } from "zod"
import { isCuid } from "@/lib/utils"
import { createMaterialSchema } from "@/lib/schemas"
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure
} from "@/server/api/trpc"
import { material } from "@/server/db/schema"

export const materialRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(
      z.object({
        page: z.number().transform(page => page - 1),
        limit: z.number().default(30)
      })
    )
    .query(async ({ ctx, input }) => {
      const limit = input.limit
      const countQuery = ctx.db
        .select({
          count: count()
        })
        .from(material)
        .then(result => result[0]!.count)
      return await Promise.all([
        ctx.db.query.material.findMany({
          limit,
          offset: input.page * input.page - 1
        }),
        countQuery
      ])
    }),
  getLast: publicProcedure
    .input(
      z.object({
        page: z.number().transform(page => page - 1)
      })
    )
    .query(async ({ ctx }) => {
      return ctx.db.query.material.findMany({
        where: eq(material.status, "accepted"),
        limit: 10,
        orderBy: [asc(material.publishedAt)]
      })
    }),
  getById: publicProcedure
    .input(
      z.object({
        id: z.string()
      })
    )
    .query(async ({ ctx, input }) => {
      if (!isCuid(input.id)) return undefined

      return await ctx.db.query.material.findFirst({
        where: eq(material.id, input.id)
      })
    }),
  create: protectedProcedure
    .input(createMaterialSchema)
    .mutation(async ({ ctx, input }) => {
      const result = await ctx.db.insert(material).values({
        ...input,
        userId: ctx.session.user.id
      })

      return result
    })
})
