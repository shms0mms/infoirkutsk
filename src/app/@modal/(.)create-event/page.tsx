import { Suspense } from "react"
import { Modal } from "@/components/modal"
import { CreateEventForm } from "./create-event-form"

export default function CreateEventPage() {
  return (
    <Modal
      title="Создать мероприятие/конкурс"
      description="Создайте мероприятие/конкурс"
    >
      <Suspense fallback={<div>Loading...</div>}>
        <CreateEventForm />
      </Suspense>
    </Modal>
  )
}
