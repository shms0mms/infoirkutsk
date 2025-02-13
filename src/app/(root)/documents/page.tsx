"use client"

import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import { Pagination } from "@/components/ui/pagination"
import { DocumentCard } from "@/components/documents/document-card"
import { FilterPanel } from "./filter-panel"

export default function DocumentsPage() {
  const searchParams = useSearchParams()
  const page = searchParams.get("page")
  const exampleDocument = {
    title: "Приказ о проведении итоговой аттестации по информатике",
    description:
      "Этот документ содержит информацию о порядке проведения итоговой аттестации по информатике в текущем учебном году, включая даты проведения экзаменов, требования к оборудованию и программному обеспечению, а также критерии оценивания.",
    link: "https://example.com/documents/order-final-exam-informatics.pdf",
    publishedAt: "2023-05-20T10:00:00Z"
  }

  const handleFilterChange = (filters: any) => {
    // Here you would typically update the documents based on the filters
    console.log("Filters applied:", filters)
    // You might want to fetch new data or filter the existing data here
  }

  return (
    <Suspense>
      <div className="container py-10">
        <h2 className="mb-6 text-2xl font-bold md:text-4xl">Документы</h2>
        <div className="flex flex-col md:flex-row gap-10">
          <aside className="w-full md:w-1/4">
            <div className="sticky top-4">
              <h3 className="text-lg font-semibold mb-4">Фильтры</h3>
              <FilterPanel onFilterChange={handleFilterChange} />
            </div>
          </aside>
          <main className="w-full md:w-3/4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
              <DocumentCard {...exampleDocument} />
              <DocumentCard {...exampleDocument} />
              <DocumentCard {...exampleDocument} />
              <DocumentCard {...exampleDocument} />
            </div>
            <Pagination currentPage={+page! || 1} totalPages={10} />
          </main>
        </div>
      </div>
    </Suspense>
  )
}
