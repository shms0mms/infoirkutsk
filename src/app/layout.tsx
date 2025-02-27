import { Analytics } from "@vercel/analytics/react"
import { type Metadata } from "next"
import { Comfortaa, Inter, Noto_Sans, Press_Start_2P } from "next/font/google"
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
const pressStart2p = Press_Start_2P({
  subsets: ["cyrillic", "latin"],
  variable: "--font-press-start-2p",
  weight: ["400"]
})
const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter"
})
const notoSans = Noto_Sans({
  subsets: ["latin", "cyrillic"],
  variable: "--font-noto-sans"
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
      className={cn(
        inter.variable,
        comfortaa.variable,
        pressStart2p.variable,
        notoSans.variable,
        "font-inter"
      )}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/icon.svg" sizes="any" type="image/svg+" />
      </head>
      <body cz-shortcut-listen="false">
        <Providers>
          {children}
          {modal}
        </Providers>
        <Analytics />
        <div className="font-pressStart2p fixed bottom-1 right-1 text-sm opacity-30 hidden lg:block">
          Разработано командой WinCode
        </div>
      </body>
    </html>
  )
}
