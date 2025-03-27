import { EventCard } from "@/components/events/event-card"
import { api } from "@/trpc/server"

export default async function Events() {
  const events = await api.event.getAll()
  return (
    <section className="container pt-10 w-full h-full">
      {" "}
      <h2 className="mb-4 text-2xl font-bold md:mb-6 md:text-4xl">
        Мероприятия/конкурсы
      </h2>
      {!!events?.length ? (
        <>
          <div className="grid lg:grid-cols-2 gap-10 md:grid-cols-1 grid-cols-[290px]">
            {events?.map(event => <EventCard key={event.id} {...event} />)}
          </div>
        </>
      ) : (
        <div className="text-center text-foreground/60 w-full min-h-screen flex items-center justify-center">
          Пока еще нет мероприятий
        </div>
      )}
    </section>
  )
}
