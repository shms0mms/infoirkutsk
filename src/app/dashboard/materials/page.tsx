"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MaterialsList } from "../../../components/materials/dashboard/materials-list"
import { tabsNav } from "./tabs-nav"
import { api } from "@/trpc/react"

// {
//   searchParams
// }: {
//   searchParams: Promise<{ tab: string }>
// }
export default function DashboardPage() {
  // const { tab } = await searchParams
  // const [materials] = await api.material.getUserMaterials({
  //   tab
  // })
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
      <div className="my-20 flex flex-col gap-16">
        <section className="flex flex-col items-center justify-center">
          <Tabs className="w-full max-w-7xl" defaultValue={tab ?? "all"}>
            <TabsList className="w-full">
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
            <TabsContent value="all">
              <MaterialsList materials={materials} />
            </TabsContent>
            <TabsContent value="published">
              <MaterialsList materials={materials} />
            </TabsContent>
            <TabsContent value="unpublished">
              <MaterialsList materials={materials} />
            </TabsContent>
            <TabsContent value="requests">
              <MaterialsList materials={materials} />
            </TabsContent>
            <TabsContent value="drafts">
              <MaterialsList materials={materials} />
            </TabsContent>
          </Tabs>
        </section>
      </div>
    </>
  )
}
