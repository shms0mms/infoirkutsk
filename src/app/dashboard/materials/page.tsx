import { SidebarTrigger } from "@/components/ui/sidebar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default async function DashboardPage() {
  return (
    <>
      <header className="flex h-14 shrink-0 items-center gap-2">
        <div className="flex flex-1 items-center gap-2 px-3">
          <SidebarTrigger />
        </div>
      </header>
      <div className="my-20 flex flex-col gap-16">
        <section className="flex flex-col items-center justify-center">
          <Tabs defaultValue="published-materials">
            <TabsList>
              <TabsTrigger value="published-materials">
                Опубликованные материалы
              </TabsTrigger>
              <TabsTrigger value="unpublished-materials">
                Неопубликованные материалы
              </TabsTrigger>
              <TabsTrigger value="requests">
                На рассмотрении модератором
              </TabsTrigger>
              <TabsTrigger value="drafts">Черновики</TabsTrigger>
            </TabsList>
            <TabsContent value="published-materials">
              Опубликованные материалы
            </TabsContent>

            <TabsContent value="unpublished-materials">
              Неопубликованные материалы
            </TabsContent>

            <TabsContent value="requests">
              На рассмотрении модератором
            </TabsContent>
            <TabsContent value="drafts">Черновики</TabsContent>
          </Tabs>
        </section>
      </div>
    </>
  )
}
