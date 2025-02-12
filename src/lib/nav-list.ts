export type NavItem = {
  title: string
  href: string
}

export const navigation: NavItem[] = [
  {
    title: "Панель управления",
    href: "/dashboard"
  },
  {
    title: "Материалы",
    href: "/materials"
  },
  {
    title: "Нормативные документы",
    href: "/documents"
  }
]
