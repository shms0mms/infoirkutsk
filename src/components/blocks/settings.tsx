"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { Input } from "../ui/input"
import { authClient, useSession } from "@/lib/auth"
import { type SettingsSchema, settingsSchema } from "@/lib/schemas"
import { api } from "@/trpc/react"

export const Settings = () => {
  const { data: organizations } = api.organization.getAll.useQuery()
  const { data: session } = useSession()

  const form = useForm<SettingsSchema>({
    defaultValues: {
      name: session?.user.name!,
      organizationId: session?.user.organizationId!
    },
    resolver: zodResolver(settingsSchema)
  })

  const onSubmit = (data: SettingsSchema) => {
    authClient.updateUser(data)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-3 max-w-full px-1 overflow-hidden"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ваше ФИО</FormLabel>
              <FormControl>
                <Input placeholder="Введите ваше ФИО" {...field} />
              </FormControl>
              <FormMessage>{form.formState.errors.name?.message}</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="organizationId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Выбирите ваше учебное заведение</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите учебное заведение" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Учебные заведения</SelectLabel>
                      {organizations?.map(organization => (
                        <SelectItem
                          className="max-w-[460px] overflow-hidden text-ellipsis"
                          value={organization.id}
                          key={organization.id}
                        >
                          {organization.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage>
                {form.formState.errors.organizationId?.message}
              </FormMessage>
            </FormItem>
          )}
        />
        <Button type="submit">Сохранить изменения</Button>
      </form>
    </Form>
  )
}
