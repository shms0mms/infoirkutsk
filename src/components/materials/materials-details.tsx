import { DownloadIcon, FileIcon } from "lucide-react"
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
import { Skeleton } from "../ui/skeleton"
import { MaterialSchema } from "@/lib/schemas"

export function MaterialDetails({
  title,
  description,
  fileType,
  fileUrl,
  author,
  publishedAt,
  createdAt,
  updatedAt
}: MaterialSchema) {
  const fileName = fileUrl?.split("/").pop() || "файл"

  return (
    <Card className="w-full shadow-none border-none">
      <CardHeader className="px-0">
        <div className="flex justify-between gap-10 items-start">
          <div className="w-full">
            <CardTitle className="text-xl break-all font-bold">
              {title}
            </CardTitle>
            <CardDescription className="mt-2 break-all text-lg">
              Автор: {author}
            </CardDescription>
          </div>
          <Badge
            variant="secondary"
            className="bg-blue-100 text-blue-800 text-lg"
          >
            {fileType?.toUpperCase()}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="px-0 space-y-4">
        <div>
          <h3 className="font-semibold text-xl mb-2">Описание материала:</h3>
          <p className="">{description}</p>
        </div>
        <div className="space-y-2 text-sm text-gray-600">
          <p>
            Опубликовано:{" "}
            {publishedAt ? (
              new Date(publishedAt).toLocaleString("ru-RU")
            ) : (
              <Skeleton className="w-[100px] h-[20px]" />
            )}
          </p>
          <p>
            Создано:{" "}
            {createdAt ? (
              new Date(createdAt).toLocaleString("ru-RU")
            ) : (
              <Skeleton className="w-[100px] h-[20px]" />
            )}
          </p>
        </div>
      </CardContent>
      <CardFooter className="px-0 flex flex-col items-start space-y-4">
        <div className="flex border w-full p-3 rounded-md border-solid items-center space-x-2 text-sm text-gray-400">
          <FileIcon size={16} />
          <span>{fileName}</span>
        </div>
        <Button asChild className="w-full">
          <Link href={fileUrl ?? "#"} download target="_blank">
            <DownloadIcon className="mr-2 h-5 w-5" /> Скачать материал
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
