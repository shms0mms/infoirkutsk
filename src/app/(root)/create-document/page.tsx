import { Suspense } from "react"
import { CreateDocumentForm } from "../../@modal/(.)create-document/create-document-form"

export default function CreateDocument() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CreateDocumentForm />
    </Suspense>
  )
}
