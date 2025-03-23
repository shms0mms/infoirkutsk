"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter, useSearchParams } from "next/navigation"
import { SubmitHandler, useForm } from "react-hook-form"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { FileUpload } from "@/components/ui/file-upload"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { FileUploadResponse } from "@/app/api/file-upload/route"
import {
  createMaterialFormSchema,
  CreateMaterialFormSchema,
  STATUS
} from "@/lib/schemas"
import { api } from "@/trpc/react"

type FormSchema = CreateMaterialFormSchema & { isDraft: boolean }
export function CreateMaterialForm() {
  const utils = api.useUtils()
  const searchParams = useSearchParams()
  const { mutate: notify } = api.notifications.create.useMutation()
  const { data: categories } = api.category.getAll.useQuery({
    name: ""
  })
  const router = useRouter()
  const { mutate: create } = api.material.create.useMutation({
    onSuccess: () => {
      utils.material.getUserMaterials.invalidate({
        tab: searchParams.get("tab") || "all"
      })
      notify({
        description: "Еще одна заявка на публикацию!",
        title: "Новая заявка на публикацию",
        link: "/dashboard/materials",
        fromUser: true
      })
      toast.success("Материал успешно создан")
      router.push("/dashboard/materials")
    },
    onError: error => {
      toast.error(`Ошибка: ${error.message}`)
    }
  })

  const form = useForm<FormSchema>({
    resolver: zodResolver(createMaterialFormSchema),
    defaultValues: {
      title: "",
      description: "",
      author: "",
      isDraft: false,
      categoryId: ""
    }
  })

  const onSubmit: SubmitHandler<FormSchema> = async ({ isDraft, ...data }) => {
    const formData = new FormData()
    formData.append("file", data.file!)

    const { file: url, type } = (await fetch("/api/file-upload", {
      method: "POST",
      headers: {},
      body: formData
    }).then(res => res.json())) as FileUploadResponse

    if (isDraft)
      create({ ...data, fileUrl: url, status: STATUS[3], fileType: type })
    else create({ ...data, fileUrl: url, status: STATUS[1], fileType: type })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2 flex flex-col gap-3"
      >
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
          name="author"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ваше ФИО</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Ваше ФИО" />
              </FormControl>
              <FormMessage>{form.formState.errors.author?.message}</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Файл</FormLabel>
              <FormControl>
                <FileUpload onChange={field.onChange} />
              </FormControl>
              <FormMessage>{form.formState.errors.file?.message}</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isDraft"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex items-center space-x-2 mb-2 text-xl">
                  <Switch
                    id="is-draft"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <Label htmlFor="is-draft">Сделать черновиком</Label>
                </div>
              </FormControl>
              <FormMessage>
                {form.formState.errors.isDraft?.message}
              </FormMessage>
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
                  value={field.value! || "Категория не выбрана"}
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
        <Button type="submit" className="w-full">
          Создать материал
        </Button>
      </form>
    </Form>
  )
}
