"use client"

import { EventCard } from "./event-card"
import { api } from "@/trpc/react"

export function DashboardEvents() {
  const { data: categories } = api.event.getAll.useQuery()
  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 p-4">
      <div className="grid gap-4 sm:grid-cols-2">
        {categories?.map(category => (
          <EventCard key={category.id} {...category} />
        ))}
        {categories?.length === 0 && (
          <p className="text-muted-foreground col-span-full text-center py-6">
            Мероприятия/конкурсы не найдены
          </p>
        )}
      </div>
    </div>
  )
}
