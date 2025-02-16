import { ExternalLinkIcon } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { DocumentSchema } from "@/lib/schemas"

export function DocumentCard({
  title,
  description,
  link,
  createdAt
}: DocumentSchema) {
  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
        <CardDescription className="text-sm text-gray-500">
          Опубликовано: {new Date(createdAt).toLocaleString("ru-RU")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700">{description}</p>
      </CardContent>
      <CardFooter>
        <Button className="w-full" variant="outline" asChild>
          <Link href={link} target="_blank">
            <ExternalLinkIcon className="mr-2 h-4 w-4" /> Открыть документ
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
