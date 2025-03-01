import { Suspense } from "react"
import { DashboardCategories } from "./dashboard-categories"

export default function DashboardDocumentsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DashboardCategories />
    </Suspense>
  )
}
