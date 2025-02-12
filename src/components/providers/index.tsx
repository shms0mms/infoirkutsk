"use client"

import { SpeedInsights } from "@vercel/speed-insights/next"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { Toaster } from "@/components/ui/sonner"
import { AuthToastProvider } from "./auth-toast-provider"
import { UserSettingsStoreProvider } from "./user-settings-store-provider"
import { TRPCReactProvider } from "@/trpc/react"

export function Providers({ children }: React.PropsWithChildren) {
  return (
    <TRPCReactProvider>
      <NextThemesProvider attribute="class" defaultTheme="light`" enableSystem>
        <UserSettingsStoreProvider>
          <AuthToastProvider>{children}</AuthToastProvider>
        </UserSettingsStoreProvider>
      </NextThemesProvider>
      <Toaster />
      <SpeedInsights />
    </TRPCReactProvider>
  )
}
