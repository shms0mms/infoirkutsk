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
import { createEventSchema, CreateEventSchema } from "@/lib/schemas"
import { router } from "@/server/api/router"
import { api } from "@/trpc/react"

export function CreateEventForm() {
  const utils = api.useUtils()
  const router = useRouter()
  const { mutate: create } = api.event.create.useMutation({
    onSuccess: () => {
      utils.category.getAll.invalidate()

      toast.success("Мероприятие/конкурс успешно создано")
      router.push("/dashboard/events")
    },
    onError: error => {
      toast.error(`Ошибка: ${error.message}`)
    }
  })

  const form = useForm<CreateEventSchema>({
    resolver: zodResolver(createEventSchema),
    defaultValues: {
      name: "",
      description: "",
      link: ""
    }
  })

  const onSubmit: SubmitHandler<CreateEventSchema> = async data => {
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
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Краткое описание</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Описание" />
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
            <FormItem>
              <FormLabel>
                Оставьте ссылку на ваше мероприятие или конкурс
              </FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  className="max-h-[200px]"
                  placeholder="Ссылка на мероприятие/конкурс"
                />
              </FormControl>
              <FormMessage>{form.formState.errors.link?.message}</FormMessage>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Создать мероприятие/конкурс
        </Button>
      </form>
    </Form>
  )
}
