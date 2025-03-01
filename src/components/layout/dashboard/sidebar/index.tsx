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
import { useSession } from "@/lib/auth"
import { UserSchema } from "@/lib/schemas"
import { useSidebarNav } from "@/lib/sidebar"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const sidebar = useSidebarNav()
  const { data } = useSession()
  const user = data?.user as unknown as UserSchema
  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader>
        <NavMain navigation={sidebar.navMain} />
      </SidebarHeader>
      <SidebarContent></SidebarContent>
      <SidebarFooter>
        <NavUser user={user!} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
