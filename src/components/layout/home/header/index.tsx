import Link from "next/link"
import { UserNav } from "@/components/layout/dashboard/user-nav"
import { Navigation } from "@/components/layout/home/header/navigation"
import { MobileNav } from "@/components/layout/home/mobile-nav"
import { siteConfig } from "@/config"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-muted backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:bg-muted/25 dark:shadow-secondary">
      <div className="mx-4 flex h-14 items-center justify-between gap-8 sm:mx-8">
        <div className="flex w-full items-center gap-x-10">
          <Link
            href="/"
            className="flex max-md:hidden font-bold items-center gap-2 text-base  lg:text-xl"
          >
            <span>{siteConfig.title}</span>
          </Link>
          <MobileNav />
          <Navigation />
        </div>

        <div className="flex w-full max-w-[130px] justify-end">
          <UserNav />
        </div>
      </div>
    </header>
  )
}
