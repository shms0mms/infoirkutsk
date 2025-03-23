import { Suspense } from "react"
import { CreateEventForm } from "@/app/@modal/(.)create-event/create-event-form"

export default function CreateDocument() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CreateEventForm />
    </Suspense>
  )
}
