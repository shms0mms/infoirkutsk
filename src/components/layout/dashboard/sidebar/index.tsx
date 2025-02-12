"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail
} from "@/components/ui/sidebar"
import { NavMain } from "@/components/layout/dashboard/sidebar/nav-main"
import { NavUser } from "./nav-user"
import { useSidebarNav } from "@/lib/sidebar"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const sidebar = useSidebarNav()

  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader>
        <NavMain navigation={sidebar.navMain} />
      </SidebarHeader>
      <SidebarContent></SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
