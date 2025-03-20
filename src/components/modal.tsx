"use client"

import { useRouter } from "next/navigation"
import type { FC, PropsWithChildren } from "react"
import {
  Credenza,
  CredenzaContent,
  CredenzaDescription,
  CredenzaHeader,
  CredenzaTitle
} from "@/components/ui/credenza"
import { ScrollArea } from "./ui/scroll-area"

type ModalProps = {
  title: React.ReactNode
  description?: React.ReactNode
}

export const Modal: FC<PropsWithChildren<ModalProps>> = ({
  children,
  title,
  description
}) => {
  const router = useRouter()

  const handleOpenChange = () => router.back()
  return (
    <Credenza open onOpenChange={handleOpenChange}>
      <CredenzaContent>
        <CredenzaHeader>
          <CredenzaTitle>{title}</CredenzaTitle>
          {description ? (
            <CredenzaDescription>{description}</CredenzaDescription>
          ) : null}
        </CredenzaHeader>
        <ScrollArea className="max-h-96"> {children} </ScrollArea>
      </CredenzaContent>
    </Credenza>
  )
}
