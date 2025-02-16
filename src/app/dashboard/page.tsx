import { SidebarTrigger } from "@/components/ui/sidebar"
import { DashboardLinks } from "./dashboard-links"

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
          <h2 className="text-3xl font-bold mb-5">
            Выберите пункт, который вас интересует
          </h2>
          <DashboardLinks />
        </section>
      </div>
    </>
  )
}
