import { Suspense } from "react"
import { DashboardEvents } from "./dashboard-events"

export default function DashboardDocumentsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DashboardEvents />
    </Suspense>
  )
}
