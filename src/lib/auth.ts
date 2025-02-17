import { adminClient } from "better-auth/client/plugins"
import { phoneNumber } from "better-auth/plugins"
import { createAuthClient } from "better-auth/react"
import { twilioClient } from "./twilio"
import { getBaseUrl } from "@/trpc/react"

export const authClient = createAuthClient({
  baseURL: getBaseUrl(),
  plugins: [
    adminClient(),
    phoneNumber({
      sendOTP: async ({ phoneNumber, code }, request) => {
        try {
          await twilioClient.messages.create({
            body: `Ваш код подтверждения: ${code}`,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: phoneNumber
          })
          console.log(`OTP отправлен на ${phoneNumber}`)
        } catch (error) {
          console.error("Ошибка отправки SMS:", error)
          throw new Error("Не удалось отправить код подтверждения")
        }
      }
    })
  ]
})

export const { signIn, signOut, useSession } = authClient
