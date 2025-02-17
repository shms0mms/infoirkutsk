"use client"

import Link from "next/link"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar"
import { useSession } from "@/lib/auth"
import { type SidebarNav } from "@/lib/sidebar"

export function NavMain({ navigation }: { navigation: SidebarNav["navMain"] }) {
  const { data } = useSession()
  return (
    <SidebarMenu>
      {navigation
        .filter(n => data?.user.role === n.permissions)
        .map(item => {
          const children = (
            <>
              <item.icon />
              <span>{item.title}</span>
            </>
          )
          return (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild={"href" in item}
                isActive={item.isActive}
                onClick={"action" in item ? item.action : undefined}
              >
                {"href" in item ? (
                  <Link href={item.href}>{children}</Link>
                ) : (
                  children
                )}
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        })}
    </SidebarMenu>
  )
}
