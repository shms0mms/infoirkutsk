import Balancer from "react-wrap-balancer"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { TextGenerateEffect } from "@/components/ui/text-generate-effect"

export default async function DashboardPage() {
  const materials = []
  const documents = []

  return (
    <>
      <header className="flex h-14 shrink-0 items-center gap-2">
        <div className="flex flex-1 items-center gap-2 px-3">
          <SidebarTrigger />
        </div>
      </header>
      <div className="my-20 flex flex-col gap-16">
        <section className="flex flex-col items-center justify-center">
          <h2 className="bg-gradient-to-b from-foreground/25 to-foreground bg-clip-text text-center text-4xl font-bold text-transparent dark:from-neutral-200 dark:to-neutral-600 lg:text-5xl">
            Все твои материалы
          </h2>
          {/*  Здесь табы (активные материалы, неактивные материалы, на рассмотрении) */}
          <Balancer>
            <TextGenerateEffect
              words="Делий своими наработками!"
              duration={0.5}
              className="w-full max-w-96 text-center !text-base md:!text-lg"
            />
          </Balancer>
        </section>
      </div>
    </>
  )
}
