"use client"

import { SubmitHandler, useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { FileUpload } from "@/components/ui/file-upload"
import {
  Form,
  FormControl,
  FormDescription,
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
import { CreateMaterialSchema, STATUS } from "@/lib/schemas"

type FormSchema = CreateMaterialSchema & { isDraft: boolean }
export default function CreateMaterialForm() {
  const form = useForm<FormSchema>()
  const { create, createDraft } = useMaterial()

  const onSubmit: SubmitHandler<FormSchema> = async ({ isDraft, ...data }) => {
    const formData = new FormData()
    formData.append("file", data.fileUrl)

    const { file, type } = (await fetch("/api/file-upload", {
      method: "POST",
      headers: {},
      body: formData
    }).then(res => res.json())) as FileUploadResponse
    console.log(isDraft)

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
          render={({ field: { onChange } }) => (
            <FormItem>
              <FormLabel />
              <FormControl>
                <Input onChange={onChange} placeholder="Заголовок" />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field: { onChange } }) => (
            <FormItem>
              <FormLabel />
              <FormControl>
                <Textarea
                  onChange={onChange}
                  className="max-h-[200px]"
                  placeholder="Описание"
                />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="author"
          render={({ field: { onChange } }) => (
            <FormItem>
              <FormLabel />
              <FormControl>
                <Input onChange={onChange} placeholder="Ваше ФИО" />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fileUrl"
          render={({ field: { onChange } }) => (
            <FormItem>
              <FormLabel />
              <FormControl>
                <FileUpload onChange={onChange} />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isDraft"
          render={({ field }) => (
            <FormItem>
              <FormLabel />
              <FormControl>
                <div className="flex items-center space-x-2 text-xl">
                  <Switch
                    id="is-draft"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <Label htmlFor="is-draft">Сделать черновиком</Label>
                </div>
              </FormControl>
              <FormDescription />
              <FormMessage />
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
