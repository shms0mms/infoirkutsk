"use client"

import { Icons } from "./icons"

export function WinCodeLogo({ className }: { className?: string }) {
  return (
    <>
      <div className="block dark:hidden">
        <Icons.logoBlack className={className} />
      </div>
      <div className="hidden dark:block">
        <Icons.logoWhite className={className} />
      </div>
    </>
  )
}
