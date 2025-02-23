"use client"

import { Edit, Trash } from "lucide-react"
import { toast } from "sonner"
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
import { DocumentSchema } from "@/lib/schemas"
import { api } from "@/trpc/react"

export const DocumentCardActions = ({
  document,
  setIsEditing
}: {
  document: DocumentSchema
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const utils = api.useUtils()

  const { mutate: remove } = api.document.delete.useMutation({
    onSuccess: () => {
      utils.document.getUserDocuments.invalidate()
      toast.success("Документ удален")
      setIsEditing(false)
    }
  })

  return (
    <div className="flex items-center justify-end gap-2 w-full">
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
              Это действие приведет к безвозратному удалению вашего документа,
              вы точно хотите это сделать?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction onClick={() => remove({ id: document.id })}>
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
    </div>
  )
}
