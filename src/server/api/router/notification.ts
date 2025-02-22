import { eq } from "drizzle-orm"
import { z } from "zod"
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc"
import { notifications } from "@/server/db/schema"

export const notificationsRouter = createTRPCRouter({
  getUserNotifications: protectedProcedure
    .input(
      z.object({
        role: z.enum(["user", "moderator"]).default("user")
      })
    )
    .query(async ({ ctx, input }) => {
      if (input.role === "moderator")
        return await ctx.db.query.notifications.findMany({
          where: eq(notifications.fromUser, true)
        })
      else
        return await ctx.db.query.notifications.findMany({
          where: eq(notifications.userId, ctx.session.user.id)
        })
    }),
  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
        link: z.string().url(),
        userId: z.string().optional(),
        fromUser: z.boolean().default(false)
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(notifications).values(input)
    }),

  delete: protectedProcedure
    .input(
      z.object({
        id: z.string()
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(notifications).where(eq(notifications.id, input.id))
    })
})
