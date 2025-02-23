"use client"

import { formatDistanceToNow } from "date-fns"
import { ru } from "date-fns/locale"
import { ClockIcon, ExternalLinkIcon, Trash, UserIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { useSession } from "@/lib/auth"
import { NotificationSchema } from "@/lib/schemas"
import { api } from "@/trpc/react"

export function NotificationCard({
  id,
  title,
  description,
  link,
  createdAt,
  userId
}: NotificationSchema) {
  const utils = api.useUtils()
  const { data: session } = useSession()
  const { mutate: remove } = api.notifications.delete.useMutation({
    onSuccess: () => {
      utils.notifications.getUserNotifications.invalidate({
        role: (session?.user.role as "user" | "moderator") ?? "user"
      })
    }
  })
  return (
    <Card className="w-full p-2 relative">
      <CardHeader className="p-0 px-3">
        <Button
          size={"icon"}
          type="button"
          className="absolute hover:bg-destructive bg-destructive text-foreground w-8 h-8 right-2 top-2"
          onClick={() => remove({ id })}
        >
          <Trash size={12} />
        </Button>
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
      <CardContent className="p-0 px-3">
        <p className="text-gray-700 mb-4">{description}</p>
        {!!userId && (
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <UserIcon className="w-4 h-4" />
            <span>ID пользователя: {userId}</span>
          </div>
        )}
      </CardContent>
      <CardFooter className="px-2 pt-0 pb-2">
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
