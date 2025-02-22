import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Settings } from "@/components/blocks/settings"

export default function SettingsPage() {
  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardTitle>Настройки</CardTitle>
        <CardDescription>Настройка вашего профиля</CardDescription>
      </CardHeader>
      <CardContent>
        <Settings />
      </CardContent>
    </Card>
  )
}
