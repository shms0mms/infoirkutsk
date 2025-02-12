import { Analytics } from "@vercel/analytics/react"
import { type Metadata } from "next"
import { Comfortaa, Inter } from "next/font/google"
import { type PropsWithChildren } from "react"
import { Providers } from "@/components/providers"
import { cn } from "@/lib/utils"
import { siteConfig } from "@/config"
import "@/styles/globals.css"

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`
  },
  description: siteConfig.description
}
const comfortaa = Comfortaa({
  subsets: ["latin"],
  variable: "--font-comfortaa"
})
const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter"
})

type RootLayoutProps = {
  modal: React.ReactNode
}

export default async function RootLayout({
  children,
  modal
}: Readonly<PropsWithChildren<RootLayoutProps>>) {
  return (
    <html
      lang="en"
      className={cn(inter.variable, comfortaa.variable, "font-inter")}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/icon.svg" sizes="any" type="image/svg+" />
      </head>
      <body>
        <Providers>
          {children}
          {modal}
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
