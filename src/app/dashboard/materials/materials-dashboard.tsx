"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MaterialsList } from "@/components/materials/dashboard/materials-list"
import { tabsNav } from "./tabs-nav"
import { api } from "@/trpc/react"

export function MaterialsDashboard() {
  const searchParams = useSearchParams()
  const tab = searchParams.get("tab") || "all"

  const { data, isLoading } = api.material.getUserMaterials.useQuery({
    tab
  })
  const materials = data?.[0]!

  return (
    <>
      <header className="flex h-14 shrink-0 items-center gap-2">
        <div className="flex flex-1 items-center gap-2 px-3">
          <SidebarTrigger />
        </div>
      </header>
      <div className="my-20 flex h-full w-full flex-col gap-16">
        <section className="flex h-full w-full flex-col items-center justify-center">
          <Tabs className="w-full container h-full" defaultValue={tab ?? "all"}>
            <TabsList className="w-full mb-5">
              {tabsNav.map(t => (
                <TabsTrigger
                  asChild
                  className="w-full"
                  key={t.value}
                  value={t.value}
                >
                  <Link href={t.href}>{t.label}</Link>
                </TabsTrigger>
              ))}
            </TabsList>
            {["all", "published", "unpublished", "requests", "drafts"].map(
              s => (
                <TabsContent className="w-full h-full" key={s} value={s}>
                  <MaterialsList
                    isLoading={isLoading}
                    tab={tab}
                    materials={materials}
                  />
                </TabsContent>
              )
            )}
          </Tabs>
        </section>
      </div>
    </>
  )
}
