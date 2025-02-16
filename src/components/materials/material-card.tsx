import { DownloadIcon } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { MaterialSchema } from "@/lib/schemas"

export function MaterialCard({
  title,
  description,
  fileType,
  fileUrl,
  author,
  publishedAt
}: MaterialSchema) {
  const fileTypeIcons = {
    excel: "📊",
    word: "📝",
    pdf: "📄"
  }

  const fileTypeColors = {
    excel: "bg-green-100 text-green-800",
    word: "bg-blue-100 text-blue-800",
    pdf: "bg-red-100 text-red-800"
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl font-bold overflow-hidden text-ellipsis md:max-w-[290px] max-w-[490px]">
              {title}
            </CardTitle>
            <CardDescription className="mt-2  overflow-hidden text-ellipsis md:max-w-[290px] max-w-[490px]">
              Автор: {author}
            </CardDescription>
          </div>
          <Badge variant="secondary" className={fileTypeColors[fileType]}>
            {fileTypeIcons[fileType]} {fileType?.toUpperCase()}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <h3 className="font-semibold mb-2">Комментарии к публикации:</h3>
        <p className="text-gray-600">{description}</p>
        <div className="mt-4">
          <p className="text-sm text-gray-500">Предмет: Информатика</p>
          <p className="text-sm text-gray-500">
            Опубликовано: {new Date(publishedAt!).toLocaleString("ru-RU")}
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={fileUrl} target="_blank">
            <DownloadIcon className="mr-2 h-4 w-4" /> Скачать материал
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
