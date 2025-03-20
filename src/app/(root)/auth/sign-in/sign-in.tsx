"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Icons } from "@/components/ui/icons"
import { Separator } from "@/components/ui/separator"
import { SignInForm } from "./sign-in-form"
import { signIn } from "@/lib/auth"

export function SignIn() {
  const searchParams = useSearchParams()

  const signInWith = async (provider: "google") => {
    const callbackUrl = searchParams.get("callbackUrl")
      ? decodeURIComponent(searchParams.get("callbackUrl")!)
      : "/"
    const callbackUrlSearchParams = new URLSearchParams({ callbackUrl })
    callbackUrlSearchParams.set("fromSignIn", "true")

    await signIn.social({
      provider,
      newUserCallbackURL: "/",
      callbackURL: callbackUrl + `?${callbackUrlSearchParams.toString()}`
    })
  }

  return (
    <>
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <Card className="mx-4 w-full max-w-md rounded-2xl border-0 bg-card p-6 shadow-lg md:mx-0">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Вход</CardTitle>
            <CardDescription className="text-muted-foreground">
              Войдите в систему с помощью одного из следующих способов.
            </CardDescription>
            <Separator />
          </CardHeader>
          <CardContent className="space-y-2">
            <SignInForm />

            <Separator className="mx-auto w-4" />
          </CardContent>
          <CardFooter>
            <Link
              className="text-foreground/40 text-sm text-center w-full"
              href="/auth/sign-up"
            >
              Нет аккаунта? Зарегистрируйтесь
            </Link>
          </CardFooter>
        </Card>
      </div>
      <div className="hidden bg-muted lg:block">
        <Icons.placeholder className="aspect-square h-full w-full object-cover dark:brightness-[0.375]" />
      </div>
    </>
  )
}
