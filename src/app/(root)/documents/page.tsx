import { Suspense } from "react"
import { Pagination } from "@/components/ui/pagination"
import { DocumentCard } from "@/components/documents/document-card"
import { FilterPanel } from "./filter-panel"
import { DocumentSchema, FiltersSchema } from "@/lib/schemas"
import { api } from "@/trpc/server"

export default async function DocumentsPage({
  searchParams
}: {
  searchParams: Promise<{ page: string } & FiltersSchema>
}) {
  const { page, ...filters } = await searchParams
  const pageQuery = page ? (isNaN(+page) ? 1 : +page) : 1
  const limit = 10

  const [documents, count] = await api.document.getAll({
    page: pageQuery,
    limit,
    ...filters
  })

  return (
    <div className="container py-10">
      <h2 className="mb-6 text-2xl font-bold md:text-4xl">Документы</h2>
      <div className="flex flex-col md:flex-row gap-10">
        <aside className="w-full md:w-1/4">
          <div className="sticky top-4">
            <h3 className="text-lg font-semibold mb-4">Фильтры</h3>
            <Suspense fallback={<div>Loading...</div>}>
              <FilterPanel initialFilters={filters} />
            </Suspense>
          </div>
        </aside>
        <main className="w-full md:w-3/4">
          {documents?.length ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
              {documents.map((document: DocumentSchema) => (
                <DocumentCard key={document.id} {...document} />
              ))}
            </div>
          ) : (
            <p className="text-center text-xl text-gray-500">
              Документы не найдены
            </p>
          )}
          <Suspense fallback={<div>Loading...</div>}>
            <Pagination
              currentPage={pageQuery}
              totalPages={documents.length ? count / limit : 0}
            />
          </Suspense>
        </main>
      </div>
    </div>
  )
}
