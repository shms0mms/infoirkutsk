"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
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
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { useMaterial } from "@/hooks/use-material"
import { FileUploadResponse } from "@/app/api/file-upload/route"
import {
  createMaterialSchema,
  CreateMaterialSchema,
  STATUS
} from "@/lib/schemas"

type FormSchema = CreateMaterialSchema & { isDraft: boolean }
export function CreateMaterialForm() {
  const form = useForm<FormSchema>({
    resolver: zodResolver(createMaterialSchema),
    defaultValues: {
      title: "",
      description: "",
      author: "",
      fileUrl: "",
      isDraft: false
    }
  })

  const { create, createDraft } = useMaterial()

  const onSubmit: SubmitHandler<FormSchema> = async ({ isDraft, ...data }) => {
    const formData = new FormData()
    formData.append("file", data.fileUrl)

    const { file, type } = (await fetch("/api/file-upload", {
      method: "POST",
      headers: {},
      body: formData
    }).then(res => res.json())) as FileUploadResponse

    if (isDraft)
      createDraft({
        ...data,
        fileUrl: file,
        fileType: type
      })
    else {
      create({ ...data, fileUrl: file, status: STATUS[1], fileType: type })
    }
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
          name="fileUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Файл</FormLabel>
              <FormControl>
                <FileUpload onChange={field.onChange} />
              </FormControl>
              <FormMessage>
                {form.formState.errors.fileUrl?.message}
              </FormMessage>
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
                {" "}
                {form.formState.errors.isDraft?.message}
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
