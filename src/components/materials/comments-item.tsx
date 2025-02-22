import { formatDistanceToNow } from "date-fns"
import { ru } from "date-fns/locale"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { CommentSchema } from "@/lib/schemas"
import { api } from "@/trpc/react"

export function CommentsItem(comment: CommentSchema) {
  const { data: user } = api.user.getById.useQuery({ id: comment.fromUserId })
  return (
    <li className="py-4">
      <div className="flex items-start space-x-4">
        <Avatar>
          <AvatarImage src={user?.image!} />
          <AvatarFallback>{user?.name.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-1">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold">{user?.name}</h4>
            <p className="text-xs text-gray-500">
              {formatDistanceToNow(new Date(comment.createdAt?.toString()!), {
                addSuffix: true,
                locale: ru
              })}
            </p>
          </div>
          <p className="text-sm text-gray-700">{comment.content}</p>
        </div>
      </div>
    </li>
  )
}
