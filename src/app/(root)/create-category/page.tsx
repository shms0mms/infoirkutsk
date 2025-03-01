import { Suspense } from "react"
import { CreateCategoryForm } from "@/app/@modal/(.)create-category/create-category-form"

export default function CreateDocument() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CreateCategoryForm />
    </Suspense>
  )
}
