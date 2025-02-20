"use client"

import { formatDistanceToNow } from "date-fns"
import { ru } from "date-fns/locale"
import { useParams } from "next/navigation"
import { Avatar, AvatarFallback } from "../ui/avatar"
import { api } from "@/trpc/react"

export function Comments() {
  const { materialId } = useParams<{ materialId: string }>()
  const { data: comments } = api.comment.getComments.useQuery({
    materialId
  })
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Комментарии</h2>
      {!!comments?.length ? (
        <ul className="space-y-4">
          {comments.map(comment => (
            <li className="py-4">
              <div className="flex items-start space-x-4">
                <Avatar>
                  <AvatarFallback>
                    {comment.fromUserId.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold">
                      User ID: {comment.fromUserId}
                    </h4>
                    <p className="text-xs text-gray-500">
                      {formatDistanceToNow(
                        new Date(comment.createdAt?.toString()!),
                        {
                          addSuffix: true,
                          locale: ru
                        }
                      )}
                    </p>
                  </div>
                  <p className="text-sm text-gray-700">{comment.content}</p>
                  {comment.toUserId !== comment.fromUserId && (
                    <p className="text-xs text-gray-500">
                      В ответ пользователю: {comment.toUserId}
                    </p>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">Пока нет комментариев. Будьте первым!</p>
      )}
    </div>
  )
}
