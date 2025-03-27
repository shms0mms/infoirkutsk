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
  date,
  id
}: {
  name: string
  description: string
  date: Date
  id: string
}) {
  return (
    <Card className="w-full p-1">
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
      <CardFooter>
        {new Date(date).toLocaleDateString("ru-RU", {
          year: "numeric",
          month: "long",
          day: "numeric"
        })}
      </CardFooter>
    </Card>
  )
}
