import { Settings } from "@/components/blocks/settings"
import { Modal } from "@/components/modal"

export default function SettingsPage() {
  return (
    <Modal title="Настройки" description="Настройка вашего профиля">
      <Settings />
    </Modal>
  )
}
