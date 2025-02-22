import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { nextCookies } from "better-auth/next-js"
import { admin, phoneNumber } from "better-auth/plugins"
import { db } from "./db"
import { env } from "@/env"
import * as schema from "@/server/db/schema"

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: schema.user,
      session: schema.session,
      account: schema.account,
      verification: schema.verification
    }
  }),

  socialProviders: {
    google: {
      enabled: true,
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET
    }
  },

  user: {},
  emailAndPassword: {
    enabled: true
  },

  plugins: [
    nextCookies(),
    admin(),
    phoneNumber({
      sendOTP: async ({ phoneNumber, code }, request) => {
        try {
          const response = await fetch("/api/send-otp", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ phoneNumber, code })
          })

          if (!response.ok) throw new Error("Ошибка отправки кода")
          console.log(`OTP отправлен на ${phoneNumber}`)
        } catch (error) {
          console.error("Ошибка отправки SMS:", error)
          throw new Error("Не удалось отправить код подтверждения")
        }
      }
    })
  ]
})

export type Session = typeof auth.$Infer.Session
