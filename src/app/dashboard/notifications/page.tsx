import { SidebarTrigger } from "@/components/ui/sidebar"
import { NotificationCard } from "@/components/notifications/notification-card"
import { api } from "@/trpc/server"

export default async function NotificationsPage() {
  const notifications = await api.notifications.getUserNotifications()
  return (
    <>
      <header className="flex h-14 shrink-0 items-center gap-2">
        <div className="flex flex-1 items-center gap-2 px-3">
          <SidebarTrigger />
        </div>
      </header>
      <div className="my-20 flex flex-col gap-16">
        <section className="flex flex-col gap-5 w-full h-full items-center justify-center">
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
