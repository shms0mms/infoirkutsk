import { Suspense } from "react"
import { MaterialsDashboard } from "./materials-dashboard"

export default function DashboardPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MaterialsDashboard />
    </Suspense>
  )
}
