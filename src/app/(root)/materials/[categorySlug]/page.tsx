import Link from "next/link"
import { Suspense } from "react"
import { Pagination } from "@/components/ui/pagination"
import { MaterialCard } from "@/components/materials/material-card"
import { api } from "@/trpc/server"

export default async function MaterialsPage({
  searchParams,
  params
}: {
  searchParams: Promise<{
    page: string
  }>
  params: Promise<{
    categorySlug: string
  }>
}) {
  const { page } = await searchParams
  const { categorySlug } = await params
  const limit = 10
  const [[data, count], categories] = await Promise.all([
    api.material.getAll({
      page: isNaN(+page) ? 2 : +page + 1,
      limit,
      slug: categorySlug
    }),
    api.category.getAll({
      name: ""
    })
  ])
  return (
    <section className="container py-10">
      <h2 className="mb-4 text-2xl font-bold md:mb-6 md:text-4xl">Материалы</h2>
      <ul className="flex flex-wrap w-full items-center gap-3 mb-5">
        {[
          {
            name: "Вернуться",
            slug: "",
            id: "wefjiwefo"
          },
          ...categories
        ]?.map(category => (
          <li
            className="bg-primary-foreground rounded-md px-4 py-2 hover:bg-primary transition-all duration-300 hover:text-background"
            key={category.id}
          >
            <Link href={`/materials/${category.slug}`}>{category.name}</Link>
          </li>
        ))}
      </ul>
      <div className="grid mb-10 grid-cols-2 gap-10">
        {!!data?.length &&
          data.map(material => (
            <MaterialCard key={material.id} {...material} />
          ))}
      </div>
      {!!!data.length && (
        <p className="text-center text-muted-foreground">
          Материалы не найдены
        </p>
      )}
      <Suspense fallback={<div>Loading...</div>}>
        <Pagination currentPage={+page! || 1} totalPages={count / limit} />
      </Suspense>
    </section>
  )
}
