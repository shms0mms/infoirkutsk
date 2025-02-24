import { Suspense } from "react"
import DashboardMaterials from "./dashboard-materials"

export default function DashboardPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DashboardMaterials />
    </Suspense>
  )
}
