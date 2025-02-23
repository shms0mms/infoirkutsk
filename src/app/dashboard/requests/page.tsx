"use client"

import { formatDistanceToNow } from "date-fns"
import { ru } from "date-fns/locale"
import { CheckCircle, FileIcon, Loader2, XCircle } from "lucide-react"
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
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip"
import { api } from "@/trpc/react"

export default function RequestsDashboardPage() {
  const { data, isLoading } = api.requests.getAll.useQuery()
  const { mutate: notify } = api.notifications.create.useMutation()
  const utils = api.useUtils()
  const { mutate: accept } = api.requests.accept.useMutation({
    onSuccess: data => {
      utils.requests.getAll.invalidate()
      notify({
        description: `Ваша заявка на публикацию материала ${data.material.title} принята!`,
        title: "Ваша заявка принята",
        link: "/dashboard/materials?tab=published",
        userId: data.material.userId
      })
    }
  })
  const { mutate: decline } = api.requests.decline.useMutation({
    onSuccess: data => {
      utils.requests.getAll.invalidate()
      notify({
        description: `Ваша заявка на публикацию материала ${data.material.title} отклонена!`,
        title: "Ваша заявка отклонена",
        link: "/dashboard/materials?tab=unpublished",
        userId: data.material.userId
      })
    }
  })

  return (
    <div className="container py-4 h-full">
      <h1 className="mb-4 text-2xl font-bold">Материалы на проверке</h1>
      {!!data?.length ? (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {data?.map(material => (
            <Card key={material.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <h3 className="text-xs font-medium break-all">
                      {material.title}
                    </h3>

                    <p className="mt-1 text-[10px] text-muted-foreground break-all">
                      <span className="text-sm">Автор: </span>
                      {material.author} •{" "}
                    </p>
                  </div>
                  <Badge
                    variant="secondary"
                    className="shrink-0 bg-foreground/10 text-xs"
                  >
                    {material.fileType?.toUpperCase()}
                  </Badge>
                </div>
                <p className="text-xs mt-4 font-medium break-all">
                  {material.description}
                </p>
                <div className="mt-3 flex items-center justify-between gap-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <a
                          href={material.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary"
                        >
                          <FileIcon className="h-3 w-3" />
                          Просмотреть
                        </a>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Открыть в новой вкладке</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <div className="flex gap-2">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 px-2 text-xs text-destructive hover:bg-destructive/10 hover:text-destructive"
                        >
                          <XCircle className="mr-1 h-3 w-3" />
                          Отклонить
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Вы уверены?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Вы точно хотите отклонить заявку на публикацию?
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Отмена</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => decline({ id: material.id })}
                          >
                            Продолжить
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="sm" className="h-7 px-2 text-xs">
                          <CheckCircle className="mr-1 h-3 w-3" />
                          Принять
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Вы уверены?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Вы точно хотите принять заявку на публикацию?
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Отмена</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => accept({ id: material.id })}
                          >
                            Продолжить
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
                <div className="text-right text-sm mt-5 text-foreground/60">
                  {formatDistanceToNow(new Date(material.createdAt!), {
                    addSuffix: true,
                    locale: ru
                  })}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : isLoading ? (
        <div className="flex justify-center w-full h-full items-center">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <p className="text-center text-muted-foreground">
          Нет материалов на проверке
        </p>
      )}
    </div>
  )
}
