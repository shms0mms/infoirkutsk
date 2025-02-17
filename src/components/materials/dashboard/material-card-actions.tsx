"use client"

import { ReloadIcon } from "@radix-ui/react-icons"
import { Download, Edit, Send, Trash } from "lucide-react"
import Link from "next/link"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip"
import { useMaterial } from "@/hooks/use-material"
import { MaterialSchema } from "@/lib/schemas"

export const MaterialCardActions = ({
  material,
  setIsEditing
}: {
  material: MaterialSchema
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const { createRequest, deleteMaterial } = useMaterial()
  return (
    <div className="flex items-center justify-end gap-2 w-full">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant={"outline"} size={"icon"} asChild>
              <Link href={material.fileUrl} download target="_blank">
                <Download size={16} />
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Скачать материал</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant={"destructive"}
            size={"icon"}
            color="red"
            onClick={() => {}}
          >
            <Trash size={16} />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Вы уверены?</AlertDialogTitle>
            <AlertDialogDescription>
              Это действие приведет к безвозратному удалению вашего материала,
              вы точно хотите это сделать?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteMaterial({ id: material.id })}
            >
              Продолжить
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={"outline"}
              size={"icon"}
              onClick={() => setIsEditing(true)}
            >
              <Edit size={16} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Редактировать</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {material.status === "draft" && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size={"icon"}
                variant="outline"
                onClick={() => createRequest({ id: material.id })}
              >
                <Send size={16} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Отправить заявку на публикацию</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
      {material.status === "rejected" && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size={"icon"}
                variant="outline"
                onClick={() => createRequest({ id: material.id })}
              >
                <ReloadIcon width={16} height={16} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              Заново отправить заявку на публикацию
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  )
}
