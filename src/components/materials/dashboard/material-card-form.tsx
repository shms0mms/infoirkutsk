"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useSearchParams } from "next/navigation"
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { materialSchema, MaterialSchema } from "@/lib/schemas"
import { api } from "@/trpc/react"

export const MaterialCardForm = ({
  material,
  setIsEditing
}: {
  material: MaterialSchema
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const form = useForm<MaterialSchema>({
    defaultValues: material,
    resolver: zodResolver(materialSchema)
  })
  const utils = api.useUtils()
  const searchParams = useSearchParams()
  const { mutate: edit } = api.material.update.useMutation({
    onSuccess: () => {
      utils.material.getUserMaterials.invalidate({
        tab: searchParams.get("tab") || "all"
      })
      toast.success("Материал успешно изменён")
      setIsEditing(false)
    }
  })
  const { data: categories } = api.category.getAll.useQuery({
    name: ""
  })

  const onSubmit: SubmitHandler<MaterialSchema> = (data: MaterialSchema) => {
    edit(data)
  }
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
          name="author"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Автор</FormLabel>
              <FormControl>
                <Input placeholder="Ваше ФИО" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Выберите категорию</FormLabel>
              <FormControl>
                <Select
                  value={field.value! || "Нет категории"}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите категорию (необязательно)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Категории</SelectLabel>
                      {categories?.map(category => (
                        <SelectItem
                          className="max-w-[460px] overflow-hidden text-ellipsis"
                          value={category.id}
                          key={category.id}
                        >
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage>
                {form.formState.errors.categoryId?.message}
              </FormMessage>
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
