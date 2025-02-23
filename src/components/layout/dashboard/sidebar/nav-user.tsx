"use client"

import { CaretSortIcon } from "@radix-ui/react-icons"
import { Bell, LogOut, Settings } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from "@/components/ui/sidebar"
import { RequestsItemLink } from "./requests-item-link"
import { signOut } from "@/lib/auth"
import { UserSchema } from "@/lib/schemas"
import { api } from "@/trpc/react"

export function NavUser({ user }: { user: UserSchema }) {
  const { isMobile } = useSidebar()
  const router = useRouter()
  const { data: notificationsCount } =
    api.notifications.getCountOfNotifications.useQuery({
      role: user?.role
    })
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user?.image!} alt={user?.name!} />
                <AvatarFallback className="rounded-lg">
                  {user?.name?.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user?.name}</span>
                <span className="truncate text-xs">{user?.email}</span>
              </div>
              <CaretSortIcon className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={user?.image ?? "/user.svg"}
                    alt={user?.name!}
                  />
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user?.name}</span>
                  <span className="truncate text-xs">{user?.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {user?.role === "moderator" && <RequestsItemLink />}
              <DropdownMenuItem
                asChild
                className="flex items-center relative gap-2 cursor-pointer"
              >
                <Link href={`/dashboard/notifications`}>
                  <Bell size={12} />
                  Уведомления
                  {!!notificationsCount && (
                    <span className="absolute right-0 top-1/2 -translate-y-1/2 px-1.5 rounded-full bg-red-500 flex items-center justify-center text-white">
                      {notificationsCount}
                    </span>
                  )}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                asChild
                className="flex items-center gap-2 cursor-pointer"
              >
                <Link href={`/settings`}>
                  <Settings size={12} />
                  Настройки
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                signOut()
                toast.success(`Вы успешно вышли из системы.`)
                router.push("/")
              }}
              className="flex items-center gap-2 cursor-pointer"
            >
              <LogOut size={12} />
              Выйти
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
