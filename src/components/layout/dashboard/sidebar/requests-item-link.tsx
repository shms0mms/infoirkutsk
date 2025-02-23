"use client"

import { Send } from "lucide-react"
import Link from "next/link"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { api } from "@/trpc/react"

export function RequestsItemLink() {
  const { data: requestsCount } = api.requests.getRequestsCount.useQuery()
  return (
    <DropdownMenuItem
      asChild
      className="flex items-center gap-2 relative cursor-pointer"
    >
      <Link href="/dashboard/requests">
        <Send size={12} />
        Заявки на публикацию
        {!!requestsCount && (
          <span className="absolute right-0 top-1/2 -translate-y-1/2 px-1.5 rounded-full bg-red-500 flex items-center justify-center text-white">
            {requestsCount}
          </span>
        )}
      </Link>
    </DropdownMenuItem>
  )
}
