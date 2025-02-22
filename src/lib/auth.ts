import {
  adminClient,
  inferAdditionalFields,
  phoneNumberClient
} from "better-auth/client/plugins"
import { createAuthClient } from "better-auth/react"
import { type auth } from "@/server/auth"
import { getBaseUrl } from "@/trpc/react"

export const authClient = createAuthClient({
  baseURL: getBaseUrl(),
  plugins: [
    adminClient(),
    phoneNumberClient(),
    inferAdditionalFields<typeof auth>()
  ]
})

export const { signIn, signOut, useSession, signUp } = authClient
