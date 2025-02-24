import { Suspense } from "react"
import { Pagination } from "@/components/ui/pagination"
import { MaterialCard } from "@/components/materials/material-card"
import { api } from "@/trpc/server"

export default async function MaterialsPage({
  searchParams
}: {
  searchParams: Promise<{
    page: string
  }>
}) {
  const { page } = await searchParams
  const limit = 10
  const [data, count] = await api.material.getAll({
    page: isNaN(+page) ? 2 : +page + 1,
    limit
  })

  return (
    <section className="container py-10">
      <h2 className="mb-4 text-2xl font-bold md:mb-6 md:text-4xl">Материалы</h2>
      <div className="grid mb-10 grid-cols-2 gap-10">
        {!!data?.length
          ? data.map(material => (
              <MaterialCard key={material.id} {...material} />
            ))
          : null}
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <Pagination currentPage={+page! || 1} totalPages={count / limit} />
      </Suspense>
    </section>
  )
}
