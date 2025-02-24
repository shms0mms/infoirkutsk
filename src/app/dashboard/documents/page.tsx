import { Suspense } from "react"
import DashboardDocuments from "./dashboard-documents"

export default function DashboardDocumentsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DashboardDocuments />
    </Suspense>
  )
}
