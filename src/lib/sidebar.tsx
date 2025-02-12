import {
  FileIcon,
  FilesIcon,
  FileText,
  FolderIcon,
  Home,
  LayoutDashboard
} from "lucide-react"
import { useParams, usePathname } from "next/navigation"
import { type FC } from "react"

type LogoComponent = FC<{ className?: string }>

export type SidebarNote = {
  id: string
  name: string
  href: string
  emoji: React.ReactNode
  private: boolean
  isPinned: boolean
  isActive: boolean
} & { type: "note" }

export type SidebarFolder = {
  id: string
  name: string
  emoji: React.ReactNode
  folders?: SidebarFolder[]
  notes?: SidebarNote[]
} & { type: "folder" }

export type SidebarNav = {
  navMain: ({
    title: string
    icon: LogoComponent
    isActive: boolean
  } & ({ href: string } | { action: () => void }))[]
}
export function useSidebarNav(): SidebarNav {
  const pathname = usePathname()
  const { materialId } = useParams<{
    materialId: string
  }>()

  return {
    navMain: [
      {
        title: "Главная",
        href: "/",
        icon: Home,
        isActive: pathname === "/"
      },
      {
        title: "Панель управления",
        href: "/dashboard",
        icon: LayoutDashboard,
        isActive: pathname === "/projects"
      },
      {
        title: "Мои материалы",
        href: "/projects/materials",
        icon: FilesIcon,
        isActive: pathname === "/projects/materials"
      },
      {
        title: "Мои документы",
        href: "/projects/documents",
        icon: FileText,
        isActive: pathname === "/projects/documents"
      }
    ]
  }
}
function Emoji({
  emoji,
  type
}: {
  emoji: string | null
  type: "note" | "folder"
}) {
  return emoji ? (
    <span className="text-lg">{emoji}</span>
  ) : type === "note" ? (
    <FileIcon size={18} />
  ) : (
    <FolderIcon size={18} />
  )
}
