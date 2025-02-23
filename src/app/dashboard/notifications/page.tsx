import { headers } from "next/headers"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { NotificationCard } from "@/components/notifications/notification-card"
import { auth } from "@/server/auth"
import { api } from "@/trpc/server"

export default async function NotificationsPage() {
  const session = await auth.api.getSession({
    headers: await headers()
  })
  const notifications = await api.notifications.getUserNotifications({
    role: (session?.user?.role as "user" | "moderator") ?? "user"
  })
  return (
    <>
      <header className="flex h-14 shrink-0 items-center gap-2">
        <div className="flex flex-1 items-center gap-2 px-3">
          <SidebarTrigger />
        </div>
      </header>
      <div className="container">
        <section className="w-full mx-auto">
          {!!notifications?.length ? (
            notifications.map(n => <NotificationCard key={n.id} {...n} />)
          ) : (
            <p className="text-center text-xl text-gray-500">
              Вы еще не получили никаких уведомлений
            </p>
          )}
        </section>
      </div>
    </>
  )
}
