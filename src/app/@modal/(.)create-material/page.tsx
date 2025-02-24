import { Suspense } from "react"
import { Modal } from "@/components/modal"
import { CreateMaterialForm } from "./create-material-form"

export default function CreateProjectPage() {
  return (
    <Modal
      title="Создать материал"
      description="Создайте материал и поделитесь им с другими участниками"
    >
      <Suspense fallback={<div>Loading...</div>}>
        <CreateMaterialForm />
      </Suspense>
    </Modal>
  )
}
