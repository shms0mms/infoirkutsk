"use client"

import { useSearchParams } from "next/navigation"
import React, { useEffect } from "react"
import { toast } from "sonner"

export const AuthToastProvider: React.FC<React.PropsWithChildren> = ({
  children
}) => {
  const searchParams = useSearchParams()

  useEffect(() => {
    setTimeout(() => {
      if (searchParams.get("fromSignIn")) {
        toast.success("Вы успешно вошли в систему")
      }
    })
  }, [searchParams.toString()])

  return children
}
