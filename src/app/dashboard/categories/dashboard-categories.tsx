"use client"

import { useSearchParams } from "next/navigation"
import { CategoryCard } from "./category-card"
import { CategorySearchForm } from "./category-search-form"
import { api } from "@/trpc/react"

export function DashboardCategories() {
  const searchParams = useSearchParams()
  const { data: categories } = api.category.getAll.useQuery({
    name: searchParams.get("nameTerm") ?? ""
  })
  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 p-4">
      <CategorySearchForm />
      <div className="grid gap-4 sm:grid-cols-2">
        {categories?.map(category => (
          <CategoryCard key={category.id} {...category} />
        ))}
        {categories?.length === 0 && (
          <p className="text-muted-foreground col-span-full text-center py-6">
            Категории не найдены
          </p>
        )}
      </div>
    </div>
  )
}
