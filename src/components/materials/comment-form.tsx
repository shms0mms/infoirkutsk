"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"

const formSchema = z.object({
  content: z.string().min(10, {
    message: "Комментарий должен содержать не менее 10 символов."
  })
})

export function CommentForm({ materialId }: { materialId?: string }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    form.reset()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ваш комментарий</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Напишите ваш комментарий здесь..."
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Поделитесь своими мыслями о материале.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting
            ? "Отправка..."
            : "Отправить комментарий"}
        </Button>
      </form>
    </Form>
  )
}
