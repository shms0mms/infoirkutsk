"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { SubmitHandler, useForm } from "react-hook-form"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CreateDocumentSchema, createDocumentSchema } from "@/lib/schemas"
import { api } from "@/trpc/react"

export function CreateDocumentForm() {
  const utils = api.useUtils()
  const { mutate: notify } = api.notifications.create.useMutation()
  const router = useRouter()
  const { mutate: create } = api.document.create.useMutation({
    onSuccess: () => {
      utils.document.getUserDocuments.invalidate()
      notify({
        description: "Вы успешно загрузили документ!",
        title: "Новый документ",
        link: "/dashboard/documents",
        fromUser: true
      })
      toast.success("Документ успешно создан")
      router.push("/dashboard/documents")
    },
    onError: error => {
      toast.error(`Ошибка: ${error.message}`)
    }
  })

  const form = useForm<CreateDocumentSchema>({
    resolver: zodResolver(createDocumentSchema),
    defaultValues: {
      description: "",
      link: "",
      title: ""
    }
  })

  const onSubmit: SubmitHandler<CreateDocumentSchema> = async data => {
    create({ ...data, publishedAt: new Date() })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2`">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Заголовок</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Заголовок" />
              </FormControl>
              <FormMessage>{form.formState.errors.title?.message}</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Описание</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  className="max-h-[200px]"
                  placeholder="Описание"
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.description?.message}
              </FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="link"
          render={({ field }) => (
            <FormItem className="mb-2">
              <FormLabel>Ссылка на документ</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Ссылка на документ" />
              </FormControl>
              <FormMessage>{form.formState.errors.link?.message}</FormMessage>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Создать документ
        </Button>
      </form>
    </Form>
  )
}
