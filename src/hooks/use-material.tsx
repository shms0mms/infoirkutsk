"use client"

import { useSearchParams } from "next/navigation"
import { toast } from "sonner"
import { api } from "@/trpc/react"

export const useMaterial = () => {
  const utils = api.useUtils()
  const searchParams = useSearchParams()
  const { mutate: edit } = api.material.update.useMutation({
    onSuccess: () => {
      utils.material.getUserMaterials.invalidate({
        tab: searchParams.get("tab") || "all"
      })
      toast.success("Материал успешно изменен")
    },
    onError: error => {
      toast.error(`Ошибка: ${error.message}`)
    }
  })
  const { mutate: create } = api.material.create.useMutation({
    onSuccess: () => {
      utils.material.getUserMaterials.invalidate({
        tab: searchParams.get("tab") || "all"
      })
      toast.success("Материал успешно создан")
    },
    onError: error => {
      toast.error(`Ошибка: ${error.message}`)
    }
  })
  const { mutate: createRequest } = api.material.createRequest.useMutation({
    onSuccess: () => {
      utils.material.getUserMaterials.invalidate({
        tab: "requests"
      })
      toast.success("Материал был подан на заявку")
    },
    onError: error => {
      toast.error(`Ошибка: ${error.message}`)
    }
  })
  const { mutate: createDraft } = api.material.createDraft.useMutation({
    onSuccess: () => {
      utils.material.getUserMaterials.invalidate({
        tab: "draft"
      })
      toast.success("Черновик был успешно создан")
    },
    onError: error => {
      toast.error(`Ошибка: ${error.message}`)
    }
  })
  const { mutate: deleteMaterial } = api.material.deleteMaterial.useMutation({
    onSuccess: () => {
      utils.material.getUserMaterials.refetch()
      toast.success("Материал успешно удален")
    },
    onError: error => {
      toast.error(`Ошибка: ${error.message}`)
    }
  })
  return {
    edit,
    createRequest,
    createDraft,
    create,
    deleteMaterial
  }
}
