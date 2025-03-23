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

export function EventCard({
  name,
  description,
  link,
  id
}: {
  name: string
  description: string
  link: string
  id: string
}) {
  return (
    <Card className="w-full p-1">
      <Link className="w-full" href={`/materials/detail/${id}`}>
        <CardHeader className="w-full">
          <div className="flex justify-between items-start w-full">
            <div className="w-[50%]">
              <CardTitle className="text-2xl font-bold overflow-hidden text-ellipsis max-w-full">
                {name}
              </CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription className="mt-2  overflow-hidden text-ellipsis md:max-w-[290px] max-w-[490px]">
            {description}
          </CardDescription>
        </CardContent>
      </Link>
      <CardFooter>
        <Button asChild className="w-full">
          <a href={link} download target="_blank">
            Ссылка на мероприятие/конкурс
          </a>
        </Button>
      </CardFooter>
    </Card>
  )
}
