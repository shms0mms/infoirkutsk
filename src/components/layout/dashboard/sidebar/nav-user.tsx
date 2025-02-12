"use client"

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles
} from "lucide-react"
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
import { Skeleton } from "@/components/ui/skeleton"
import { signOut, useSession } from "@/lib/auth"

export function NavUser() {
  const { isMobile } = useSidebar()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <UserInfo />
              <ChevronsUpDown className="ml-auto size-4" />
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
                <UserInfo />
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem className="gap-2.5">
                <Sparkles />
                Upgrade to Pro
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem className="gap-2.5">
                <BadgeCheck />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2.5">
                <CreditCard />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2.5">
                <Bell />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <UserLogout className="gap-2.5" />
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

function UserInfo() {
  const { data: session } = useSession()

  return (
    <>
      {session ? (
        <Avatar className="h-8 w-8 rounded-lg">
          <AvatarImage src={session.user.image!} alt={session.user.name} />
          <AvatarFallback className="rounded-lg">
            {session.user.name.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      ) : (
        <Skeleton className="h-8 w-8" />
      )}
      <div className="grid flex-1 text-left text-sm leading-tight">
        {session ? (
          <>
            <span className="truncate font-semibold">{session.user.name}</span>
            <span className="truncate text-xs">{session.user.email}</span>
          </>
        ) : (
          <>
            <Skeleton className="h-6 w-10" />
            <Skeleton className="h-4 w-16" />
          </>
        )}
      </div>
    </>
  )
}

type UserMenuProps = {
  className?: string
}

function UserLogout({ className }: UserMenuProps) {
  const router = useRouter()

  return (
    <DropdownMenuItem
      onClick={async () => {
        await signOut()

        toast.success(`Successfully signed out.`)
        router.push("/")
      }}
      className={className}
    >
      <LogOut />
      Log out
    </DropdownMenuItem>
  )
}
