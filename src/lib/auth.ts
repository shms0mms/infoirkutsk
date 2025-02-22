import { adminClient, phoneNumberClient } from "better-auth/client/plugins"
import { createAuthClient } from "better-auth/react"
import { getBaseUrl } from "@/trpc/react"

export const authClient = createAuthClient({
  baseURL: getBaseUrl(),
  plugins: [adminClient(), phoneNumberClient()]
})

export const { signIn, signOut, useSession, signUp } = authClient
