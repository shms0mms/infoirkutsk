import { Bell, FileTextIcon, FolderIcon, GitPullRequest } from "lucide-react"
import Link from "next/link"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"

export function DashboardLink({
  href,
  title,
  desc,
  icon
}: {
  href: string
  title: string
  desc: string
  icon: React.ReactNode
}) {
  return (
    <Link href={href} className="transition-transform hover:scale-105">
      <Card>
        <CardHeader className="flex flex-row items-center space-x-4">
          {icon}
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{desc}</CardDescription>
          </div>
        </CardHeader>
      </Card>
    </Link>
  )
}

export function DashboardLinks() {
  return (
    <div className="flex flex-col space-y-4 w-full max-w-7xl">
      <DashboardLink
        href="/dashboard/documents"
        title="Документы"
        desc="Ваши документы"
        icon={<FileTextIcon size={24} className="text-blue-500" />}
      />

      <DashboardLink
        href="/dashboard/materials"
        title="Материалы"
        desc="Методические разработки и учебные материалы"
        icon={<FolderIcon size={24} className="text-blue-500" />}
      />

      <DashboardLink
        href="/dashboard/requests"
        title="Заявки на публикацию"
        desc="Вы, как модератор, одобряете/отклоняете публикацию той или иной заявки на публикацию"
        icon={<GitPullRequest size={24} className="text-blue-500" />}
      />

      <DashboardLink
        href="/dashboard/notifications"
        title="Ваши уведомления"
        desc="Уведомления о публикации и обновлениях ваших материалов"
        icon={<Bell size={24} className="text-yellow-500" />}
      />
    </div>
  )
}
