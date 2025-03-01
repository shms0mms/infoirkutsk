"use client"

import { Trash2 } from "lucide-react"
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
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { api } from "@/trpc/react"

export function CategoryCard({
  name,
  slug,
  id
}: {
  name: string
  slug: string
  id: string
}) {
  const utils = api.useUtils()
  const { mutate: remove } = api.category.delete.useMutation({
    onSuccess: () => {
      utils.category.getAll.refetch()
      toast.success("Категория удалена")
    }
  })
  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <div className="space-y-1">
          <h3 className="font-semibold tracking-tight">{name}</h3>
          <p className="text-sm text-muted-foreground">/{slug}</p>
        </div>
      </CardContent>
      <CardFooter>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="sm">
              <Trash2 className="h-4 w-4 mr-2" />
              Удалить
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
              <AlertDialogAction onClick={() => remove({ id })}>
                Продолжить
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  )
}
