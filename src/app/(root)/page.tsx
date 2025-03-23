import { ArrowUpRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Balance from "react-wrap-balancer"
import { Button } from "@/components/ui/button"
import { Beam } from "@/components/ui/grid-beam"
import { Spotlight } from "@/components/ui/spotlight"
import { TextGenerateEffect } from "@/components/ui/text-generate-effect"
import { DocumentCard } from "@/components/documents/document-card"
import { EventCard } from "@/components/events/event-card"
import { MaterialCard } from "@/components/materials/material-card"
import { siteConfig } from "@/config"
import { api } from "@/trpc/server"

export default async function Home() {
  const [[materials], [documents], events] = await Promise.all([
    api.material.getLast({ page: 1 }),
    api.document.getLast({ page: 1 }),
    api.event.getAll()
  ])
  return (
    <div className="min-h-[calc(100vh-var(--dashboard-header-size))]) overflow-x-hidden relative rounded dark:bg-grid-white/[0.02] flex flex-col gap-20 pb-10">
      <Spotlight />

      <section className="container mt-4 min-h-[100vh] flex flex-col justify-center">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left relative">
            <Beam className="-mt-12 -ml-2 hidden xl:block" />
            <h1 className="my-6 text-pretty text-4xl font-bold lg:text-4xl">
              {siteConfig.title}
            </h1>
            <Balance>
              <TextGenerateEffect
                words={siteConfig.description}
                duration={0.25}
                className="!text-sm font-normal sm:!text-base md:!text-lg mb-8 max-w-xl text-muted-foreground lg:text-xl"
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
          <Image
            className="hidden lg:block"
            alt="root"
            src={"/root.png"}
            width={600}
            height={600}
          />
        </div>
      </section>
      <section className="container">
        {!!materials?.length && (
          <>
            <h2 className="mb-4 text-2xl font-bold md:mb-6 md:text-4xl">
              Последние опубликованные материалы
            </h2>
            <div className="grid lg:grid-cols-2 gap-10 grid-cols-1">
              {materials?.map(material => (
                <MaterialCard {...material} key={material.id} />
              ))}
            </div>
          </>
        )}
      </section>

      <section className="container">
        {!!documents?.length && (
          <>
            <h2 className="mb-4 text-2xl font-bold md:mb-6 md:text-4xl">
              Последние документы
            </h2>
            <div className="grid lg:grid-cols-2 gap-10 md:grid-cols-1 grid-cols-[290px]">
              {documents?.map(document => (
                <DocumentCard key={document.id} {...document} />
              ))}
            </div>
          </>
        )}
      </section>
      <section className="container">
        {!!events?.length && (
          <>
            <h2 className="mb-4 text-2xl font-bold md:mb-6 md:text-4xl">
              Мероприятия/конкурсы
            </h2>
            <div className="grid lg:grid-cols-2 gap-10 md:grid-cols-1 grid-cols-[290px]">
              {events?.map(event => <EventCard key={event.id} {...event} />)}
            </div>
          </>
        )}
      </section>
    </div>
  )
}
