"use client"

import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import { UseFormReturn } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { CreateUserSchema } from "@/lib/schemas"

export function PasswordField({
  form
}: {
  form: UseFormReturn<CreateUserSchema>
}) {
  const [showPassword, setShowPassword] = useState(false)

  return (
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
                aria-label={showPassword ? "Скрыть пароль" : "Показать пароль"}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </FormControl>
          <FormMessage>{form.formState.errors.password?.message}</FormMessage>
        </FormItem>
      )}
    />
  )
}
