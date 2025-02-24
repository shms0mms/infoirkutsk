"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { DocumentsList } from "@/components/documents/dashboard/documents-list"
import { api } from "@/trpc/react"

export default function DashboardDocuments() {
  const { data: documents, isLoading } =
    api.document.getUserDocuments.useQuery()

  return (
    <>
      <header className="flex h-14 shrink-0 items-center gap-2">
        <div className="flex flex-1 items-center gap-2 px-3">
          <SidebarTrigger />
        </div>
      </header>
      <div className="my-20 flex h-full w-full flex-col gap-16">
        <section className="flex h-full container w-full flex-col items-center ">
          <h1 className="text-2xl font-bold mb-5">Ваши документы</h1>
          <DocumentsList isLoading={isLoading} documents={documents!} />
        </section>
      </div>
    </>
  )
}
