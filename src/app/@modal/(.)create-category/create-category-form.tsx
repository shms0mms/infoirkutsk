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
import { CreateCategorySchema, createCategorySchema } from "@/lib/schemas"
import { api } from "@/trpc/react"

export function CreateCategoryForm() {
  const utils = api.useUtils()
  const { mutate: notify } = api.notifications.create.useMutation()
  const router = useRouter()
  const { mutate: create } = api.category.create.useMutation({
    onSuccess: () => {
      utils.category.getAll.invalidate()
      notify({
        description: "Вы успешно создали категорию!",
        title: "Новая категория",
        link: "/dashboard/categories",
        fromUser: true
      })
      router.push("/dashboard/categories")
      toast.success("Категория успешно создана")
    },
    onError: error => {
      toast.error(`Ошибка: ${error.message}`)
    }
  })

  const form = useForm<CreateCategorySchema>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: "",
      slug: ""
    }
  })

  const onSubmit: SubmitHandler<CreateCategorySchema> = async data => {
    create(data)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2 flex flex-col gap-3"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Название</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Название" />
              </FormControl>
              <FormMessage>{form.formState.errors.name?.message}</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Введите слово для поиска (пример: konkurs)</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  className="max-h-[200px]"
                  placeholder="Описание"
                />
              </FormControl>
              <FormMessage>{form.formState.errors.slug?.message}</FormMessage>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Создать категорию
        </Button>
      </form>
    </Form>
  )
}
