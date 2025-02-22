"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
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
import { signUp } from "@/lib/auth"
import { createUserSchema, type CreateUserSchema } from "@/lib/schemas"
import { api } from "@/trpc/react"

export function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false)
  const { data: organizations } = api.organization.getAll.useQuery()
  const form = useForm<CreateUserSchema>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      organizationId: ""
    }
  })

  const router = useRouter()
  const onSubmit = async (values: CreateUserSchema) => {
    try {
      const { data, error } = await signUp.email(values)
      if (error?.code === "USER_ALREADY_EXISTS") {
        return toast.success("Такой пользователь уже существует!")
      } else if (!data) return toast.success("Ошибка при регистрации!")

      router.push("/")
      toast.success("Вы успешно создали аккаунт!")
    } catch (error) {
      toast.error("Ошибка регистрации")
    }
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
        method="post"
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ваш email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Введите ваш email"
                  type="email"
                  {...field}
                />
              </FormControl>
              <FormMessage>{form.formState.errors.email?.message}</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="organizationId"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Выбирите ваше учебное заведение</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите учебное заведение" />
                  </SelectTrigger>
                  <SelectContent className="w-full">
                    <SelectGroup className="w-full">
                      <SelectLabel>Учебные заведения</SelectLabel>
                      {organizations?.map(organization => (
                        <SelectItem
                          value={organization.id}
                          key={organization.id}
                          className="max-w-[340px] text-ellipsis overflow-hidden"
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
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Придумайте пароль</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Введите ваш пароль"
                    value={field.value}
                    onChange={field.onChange}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword ? "Скрыть пароль" : "Показать пароль"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </FormControl>
              <FormMessage>
                {form.formState.errors.password?.message}
              </FormMessage>
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Зарегистрироваться
        </Button>
      </form>
    </Form>
  )
}
