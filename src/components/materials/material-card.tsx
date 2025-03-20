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
  publishedAt,
  id
}: MaterialSchema) {
  return (
    <Card className="w-full p-1">
      <Link className="w-full" href={`/materials/detail/${id}`}>
        <CardHeader className="w-full">
          <div className="flex justify-between items-start w-full">
            <div className="w-[50%]">
              <CardTitle className="text-2xl font-bold overflow-hidden text-ellipsis max-w-full">
                {title}
              </CardTitle>
              <CardDescription className="mt-2  overflow-hidden text-ellipsis md:max-w-[290px] max-w-[490px]">
                Автор: {author}
              </CardDescription>
            </div>
            <Badge
              variant="secondary"
              className={"bg-blue-100 min-w-[20%] text-blue-800 "}
            >
              <span className="max-w-[80px] overflow-hidden text-ellipsis whitespace-nowrap">
                📄 {fileType?.toUpperCase()}
              </span>
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
      </Link>
      <CardFooter>
        <Button asChild className="w-full">
          <a href={fileUrl} download target="_blank">
            <DownloadIcon className="mr-2 h-4 w-4" /> Скачать материал
          </a>
        </Button>
      </CardFooter>
    </Card>
  )
}
