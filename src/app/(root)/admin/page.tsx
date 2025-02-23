"use client"

import { Button } from "@/components/ui/button"
import { giveRole } from "@/lib/admin"

export default function AdminPage() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <Button type="button" className="" onClick={giveRole}>
        Выдать роль админа
      </Button>
    </div>
  )
}
