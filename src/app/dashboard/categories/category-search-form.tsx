"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Search } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { api } from "@/trpc/react"

const formSchema = z.object({
  name: z.string()
})

type FormValues = z.infer<typeof formSchema>

export function CategorySearchForm() {
  const searchParams = useSearchParams()
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: searchParams.get("nameTerm") ?? ""
    }
  })
  const utils = api.useUtils()
  async function onSubmit(values: FormValues) {
    utils.category.getAll.invalidate({
      name: values.name
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex items-center gap-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    className="pl-9"
                    placeholder="Поиск категории..."
                    {...field}
                    onChange={e => {
                      field.onChange(e)
                      const params = new URLSearchParams(window.location.search)

                      if (e.target.value) {
                        params.set("nameTerm", e.target.value)
                      } else {
                        params.delete("nameTerm")
                      }

                      history.pushState(
                        {},
                        "",
                        `${window.location.pathname}?${params.toString()}`
                      )
                    }}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={form.formState.isSubmitting}>
          Искать
        </Button>
      </form>
    </Form>
  )
}
