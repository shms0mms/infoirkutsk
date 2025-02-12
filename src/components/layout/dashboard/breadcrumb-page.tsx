"use client"

import { useParams } from "next/navigation"
import { BreadcrumbPage } from "@/components/ui/breadcrumb"
import { Skeleton } from "@/components/ui/skeleton"
import { TextMorph } from "@/components/ui/text-morph"
import { title } from "@/lib/utils"

type DashboardBreadcrumbPageProps = {
  defaultTitle?: string
}

export const DashboardBreadcrumbPage: React.FC<
  DashboardBreadcrumbPageProps
> = ({ defaultTitle }) => {
  const { projectId, noteId } = useParams<{
    projectId: string
    noteId?: string
  }>()

  return (
    <BreadcrumbPage className="line-clamp-1">
      {false && !defaultTitle ? (
        <Skeleton className="h-7 w-36" />
      ) : (
        <TextMorph>{title(defaultTitle ?? "")}</TextMorph>
      )}
    </BreadcrumbPage>
  )
}
