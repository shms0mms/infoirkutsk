"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { useSession } from "@/lib/auth"
import { MaterialSchema } from "@/lib/schemas"
import { api } from "@/trpc/react"

const formSchema = z.object({
  content: z.string({
    required_error: "Это поле обязательно"
  })
})
type FormSchema = z.infer<typeof formSchema>
export function CommentForm({ material }: { material: MaterialSchema }) {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema)
  })

  const { data } = useSession()
  const utils = api.useUtils()
  const { mutate } = api.comment.create.useMutation({
    onSuccess: () => {
      toast.success("Комментарий успешно отправлен")
      utils.comment.getComments.invalidate({
        materialId: material.id
      })
      form.reset()
    },
    onError: () => {
      toast.error("Ошибка отправки комментария")
    }
  })

  function onSubmit(values: FormSchema) {
    mutate({
      ...values,
      materialId: material.id,
      fromUserId: data?.user?.id!,
      toUserId: material.userId
    })
  }
  const isDontHaveUserId = !!!data?.user?.id
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ваш комментарий</FormLabel>
                <FormControl>
                  <Textarea
                    className="max-h-[200px] rounded-sm"
                    placeholder="Напишите ваш комментарий здесь..."
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={form.formState.isSubmitting || isDontHaveUserId}
          >
            {isDontHaveUserId
              ? "Сначала войдите в систему"
              : form.formState.isSubmitting
                ? "Отправка..."
                : "Отправить комментарий"}
          </Button>
        </form>
      </Form>
    </>
  )
}
