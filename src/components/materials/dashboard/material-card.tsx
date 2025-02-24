"use client"

import { Suspense, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardDescription, CardTitle } from "@/components/ui/card"
import { MaterialCardActions } from "./material-card-actions"
import { MaterialCardForm } from "./material-card-form"
import { MaterialSchema } from "@/lib/schemas"

export function MaterialCard(material: MaterialSchema) {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <Card className="relative">
      {isEditing ? (
        <MaterialCardForm setIsEditing={setIsEditing} material={material} />
      ) : (
        <div className="flex flex-col gap-1 h-full">
          <div className="flex flex-col gap-3 flex-1">
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl font-bold overflow-hidden text-ellipsis md:max-w-[290px] max-w-[490px]">
                {material.title}
              </CardTitle>
              <Badge
                variant="secondary"
                className={"bg-foreground/10 text-blue-800"}
              >
                📄 {material.fileType?.toUpperCase()}
              </Badge>
            </div>
            <CardDescription className="mt-2  overflow-hidden text-ellipsis md:max-w-[290px] max-w-[490px]">
              Автор: {material.author}
            </CardDescription>
            <p>Описание: {material.description}</p>
          </div>

          <Suspense fallback={<div>Loading...</div>}>
            <MaterialCardActions
              material={material}
              setIsEditing={setIsEditing}
            />
          </Suspense>
        </div>
      )}
    </Card>
  )
}
