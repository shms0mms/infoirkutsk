import { ArrowUpRight } from "lucide-react"
import Link from "next/link"
import Balance from "react-wrap-balancer"
import { Button } from "@/components/ui/button"
import { Beam } from "@/components/ui/grid-beam"
import { Spotlight } from "@/components/ui/spotlight"
import { TextGenerateEffect } from "@/components/ui/text-generate-effect"
import { DocumentCard } from "@/components/documents/document-card"
import { MaterialCard } from "@/components/materials/material-card"
import { siteConfig } from "@/config"
import { MaterialSchema } from "@/lib/schemas"

export default function Home() {
  const exampleMaterial: MaterialSchema = {
    title: "Интерактивные уроки по алгоритмизации",
    description:
      "Этот материал содержит серию интерактивных уроков, направленных на обучение основам алгоритмизации. Включает в себя презентации, практические задания и тесты для закрепления материала.",
    fileType: "pdf",
    fileUrl: "/path/to/your/file.pdf",
    author: "Иванов Иван Иванович",
    publishedAt: new Date("2023-06-15T14:30:00Z"),
    status: "accepted"
  }
  const exampleDocument = {
    title: "Приказ о проведении итоговой аттестации по информатике",
    description:
      "Этот документ содержит информацию о порядке проведения итоговой аттестации по информатике в текущем учебном году, включая даты проведения экзаменов, требования к оборудованию и программному обеспечению, а также критерии оценивания.",
    link: "https://example.com/documents/order-final-exam-informatics.pdf",
    publishedAt: "2023-05-20T10:00:00Z"
  }

  return (
    <div className="min-h-[calc(100vh-var(--dashboard-header-size))]) overflow-x-hidden relative rounded dark:bg-grid-white/[0.02]">
      <Spotlight />

      <section className="container mt-4 min-h-[100vh] flex flex-col justify-center">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left relative">
            <Beam className="-mt-12 -ml-2 hidden xl:block" />
            <h1 className="my-6 text-pretty text-4xl font-bold lg:text-6xl">
              {siteConfig.title}
            </h1>
            <Balance>
              <TextGenerateEffect
                words={siteConfig.description}
                duration={0.25}
                className="!text-sm sm:!text-base md:!text-lg mb-8 max-w-xl text-muted-foreground lg:text-xl"
              />
            </Balance>
            <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
              <Button asChild className="w-full flex items-center sm:w-auto">
                <Link href="/create-material" prefetch={true}>
                  Загрузить свой первый материал
                  <ArrowUpRight className="ml-2 size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      <section className="container min-h-[100vh] mb-10">
        <h2 className="mb-4 text-2xl font-bold md:mb-6 md:text-4xl">
          Последние опубликованные материалы
        </h2>
        <div className="grid grid-cols-2 gap-10">
          <MaterialCard {...exampleMaterial} />
          <MaterialCard {...exampleMaterial} />
          <MaterialCard {...exampleMaterial} />
          <MaterialCard {...exampleMaterial} />
        </div>
      </section>

      <section className="container min-h-[100vh]">
        <h2 className="mb-4 text-2xl font-bold md:mb-6 md:text-4xl">
          Последние документы
        </h2>
        <div className="grid grid-cols-2 gap-10">
          <DocumentCard {...exampleDocument} />
          <DocumentCard {...exampleDocument} />
          <DocumentCard {...exampleDocument} />
          <DocumentCard {...exampleDocument} />
        </div>
      </section>
    </div>
  )
}
