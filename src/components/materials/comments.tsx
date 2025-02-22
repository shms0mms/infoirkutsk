"use client"

import { Loader } from "lucide-react"
import { useParams } from "next/navigation"
import { CommentsItem } from "./comments-item"
import { api } from "@/trpc/react"

export function Comments() {
  const { materialId } = useParams<{ materialId: string }>()
  const { data: comments, isLoading } = api.comment.getComments.useQuery({
    materialId
  })

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Комментарии</h2>
      {!!comments?.length ? (
        <ul className="space-y-4">
          {comments.map(comment => (
            <CommentsItem {...comment} key={comment.id} />
          ))}
        </ul>
      ) : isLoading ? (
        <Loader className="animate-spin" />
      ) : (
        <p className="text-gray-500">Пока нет комментариев. Будьте первым!</p>
      )}
    </div>
  )
}
