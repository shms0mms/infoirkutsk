"use client"

import { ExternalLinkIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"

interface DocumentCardProps {
  title: string
  description: string
  link: string
  publishedAt: string
}

export function DocumentCard({
  title,
  description,
  link,
  publishedAt
}: DocumentCardProps) {
  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
        <CardDescription className="text-sm text-gray-500">
          Опубликовано: {new Date(publishedAt).toLocaleString("ru-RU")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700">{description}</p>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          variant="outline"
          onClick={() => window.open(link, "_blank")}
        >
          <ExternalLinkIcon className="mr-2 h-4 w-4" /> Открыть документ
        </Button>
      </CardFooter>
    </Card>
  )
}
