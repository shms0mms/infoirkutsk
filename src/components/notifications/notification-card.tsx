import { formatDistanceToNow } from "date-fns"
import { ru } from "date-fns/locale"
import { ClockIcon, ExternalLinkIcon, UserIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { NotificationSchema } from "@/lib/schemas"

export function NotificationCard({
  id,
  title,
  description,
  link,
  createdAt,
  userId
}: NotificationSchema) {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
        <CardDescription className="flex items-center space-x-2">
          <ClockIcon className="w-4 h-4" />
          <span>
            {formatDistanceToNow(new Date(createdAt), {
              addSuffix: true,
              locale: ru
            })}
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 mb-4">{description}</p>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <UserIcon className="w-4 h-4" />
          <span>ID пользователя: {userId}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          variant="outline"
          onClick={() => window.open(link, "_blank")}
        >
          <ExternalLinkIcon className="mr-2 h-4 w-4" /> Открыть ссылку
        </Button>
      </CardFooter>
    </Card>
  )
}
