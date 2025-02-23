"use client"

import { useState } from "react"
import { Card, CardDescription, CardTitle } from "@/components/ui/card"
import { DocumentCardActions } from "./document-card-actions"
import { DocumentCardForm } from "./document-card-form"
import { DocumentSchema } from "@/lib/schemas"

export function DocumentCard(document: DocumentSchema) {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <Card className="relative">
      {isEditing ? (
        <DocumentCardForm setIsEditing={setIsEditing} document={document} />
      ) : (
        <div className="flex flex-col gap-1 h-full">
          <div className="flex flex-col gap-3 flex-1">
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl font-bold overflow-hidden text-ellipsis md:max-w-[290px] max-w-[490px]">
                {document.title}
              </CardTitle>
            </div>
            <CardDescription className="mt-2  overflow-hidden text-ellipsis md:max-w-[290px] max-w-[490px]">
              Описание: {document.description}
            </CardDescription>
          </div>

          <DocumentCardActions
            document={document}
            setIsEditing={setIsEditing}
          />
        </div>
      )}
    </Card>
  )
}
