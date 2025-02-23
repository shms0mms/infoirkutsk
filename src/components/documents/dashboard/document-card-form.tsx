"use client"

import { zodResolver } from "@hookform/resolvers/zod"
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
import { DocumentSchema, documentSchema } from "@/lib/schemas"
import { api } from "@/trpc/react"

export const DocumentCardForm = ({
  document,
  setIsEditing
}: {
  document: DocumentSchema
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const form = useForm<DocumentSchema>({
    defaultValues: document,
    resolver: zodResolver(documentSchema)
  })
  const utils = api.useUtils()

  const { mutate: edit } = api.document.update.useMutation({
    onSuccess: () => {
      utils.document.getUserDocuments.invalidate()
      toast.success("Материал успешно изменён")
      setIsEditing(false)
    }
  })

  const onSubmit: SubmitHandler<DocumentSchema> = (data: DocumentSchema) =>
    edit(data)

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 space-x-2"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Заголовок</FormLabel>
              <FormControl>
                <Input placeholder="Введите заголовок" {...field} />
              </FormControl>
              <FormMessage />
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
                <Textarea placeholder="Введите описание" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="link"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ссылка на документ</FormLabel>
              <FormControl>
                <Input placeholder="Ссылка на документ" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Сохранить</Button>
        <Button
          type="button"
          onClick={() => setIsEditing(false)}
          variant="outline"
        >
          Отмена
        </Button>
      </form>
    </Form>
  )
}
