import { Modal } from "@/components/modal"
import { CreateMaterialForm } from "./create-material-form"

export default function CreateProjectPage() {
  return (
    <Modal
      title="Создать материал"
      description="Создайте материал и поделитесь им с другими участниками"
    >
      <CreateMaterialForm />
    </Modal>
  )
}
