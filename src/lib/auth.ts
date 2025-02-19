import { adminClient } from "better-auth/client/plugins"
import { phoneNumber } from "better-auth/plugins"
import { createAuthClient } from "better-auth/react"
import { getBaseUrl } from "@/trpc/react"

export const authClient = createAuthClient({
  baseURL: getBaseUrl(),
  plugins: [
    adminClient(),
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

export const { signIn, signOut, useSession } = authClient
