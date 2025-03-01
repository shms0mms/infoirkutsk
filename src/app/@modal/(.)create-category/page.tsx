import { Suspense } from "react"
import { Modal } from "@/components/modal"
import { CreateCategoryForm } from "./create-category-form"

export default function CreateProjectPage() {
  return (
    <Modal title="Создать категорию" description="Создайте категорию материала">
      <Suspense fallback={<div>Loading...</div>}>
        <CreateCategoryForm />
      </Suspense>
    </Modal>
  )
}
