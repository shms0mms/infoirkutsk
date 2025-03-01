"use client"

import Link from "next/link"
import { WinCodeLogo } from "@/components/ui/wincode-logo"
import { footerLinks, footerNav } from "./footer-nav"

export function Footer() {
  return (
    <footer className="container flex flex-col gap-4 py-10 text-center">
      <Link href={"https://academy-wincode.com/"}>
        <WinCodeLogo />
      </Link>
      <div>
        <ul className="flex items-center gap-2">
          {footerLinks.map((item, id) => (
            <li
              className="w-6 h-6 rounded-full p-1 flex items-center justify-center"
              key={id}
            >
              <Link href={item.href}>
                <item.icon className="w-6 h-6" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <nav className="flex gap-7 flex-col md:flex-row">
        {footerNav.map(f => (
          <ul key={f.id} className="flex flex-col gap-2 items-start">
            {f.items.map(item => (
              <li key={item.title}>
                <Link
                  className="text-muted-foreground hover:text-primary"
                  href={item.href}
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        ))}
      </nav>
      <p className="text-sm text-muted-foreground">&copy; 2025 WinCode</p>
    </footer>
  )
}
