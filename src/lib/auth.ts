import { adminClient } from "better-auth/client/plugins"
import { createAuthClient } from "better-auth/react"
import { getBaseUrl } from "@/trpc/react"

export const authClient = createAuthClient({
  baseURL: getBaseUrl(),
  plugins: [adminClient()]
})

export const { signIn, signOut, useSession } = authClient
