"use client"

import { useSearchParams } from "next/navigation"
import { Pagination } from "@/components/ui/pagination"
import { MaterialCard } from "@/components/materials/material-card"
import { FILE_TYPE, STATUS } from "@/lib/schemas"

export default function MaterialsPage({}) {
  const searchParams = useSearchParams()
  const page = searchParams.get("page")

  const exampleMaterial = {
    title: "Интерактивные уроки по алгоритмизации",
    description:
      "Этот материал содержит серию интерактивных уроков, направленных на обучение основам алгоритмизации. Включает в себя презентации, практические задания и тесты для закрепления материала.",
    fileType: FILE_TYPE.pdf,
    fileUrl: "/path/to/your/file.pdf",
    author: "Иванов Иван Иванович",
    publishedAt: new Date("2023-06-15T14:30:00Z"),
    status: STATUS.accepted
  }
  return (
    <section className="container py-10">
      <h2 className="mb-4 text-2xl font-bold md:mb-6 md:text-4xl">Материалы</h2>
      {/* Здесь будет фильтрация */}
      <div className="grid mb-10 grid-cols-2 gap-10">
        <MaterialCard {...exampleMaterial} />
        <MaterialCard {...exampleMaterial} />
        <MaterialCard {...exampleMaterial} />
        <MaterialCard {...exampleMaterial} />
      </div>
      <Pagination currentPage={+page! || 1} totalPages={10} />
    </section>
  )
}
