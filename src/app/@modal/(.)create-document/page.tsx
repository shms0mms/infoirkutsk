import { Modal } from "@/components/modal"
import { CreateDocumentForm } from "./create-document-form"

export default function CreateProjectPage() {
  return (
    <Modal
      title="Создать материал"
      description="Создайте материал и поделитесь им с другими участниками"
    >
      <CreateDocumentForm />
    </Modal>
  )
}
