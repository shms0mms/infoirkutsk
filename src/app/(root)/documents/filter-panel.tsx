"use client"

import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

export function FilterPanel() {
  const [filters, setFilters] = useState({
    titleTerm: "",
    descriptionTerm: "",
    publishedAtFrom: "",
    publishedAtTo: ""
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFilters(prev => ({ ...prev, [name]: value }))
  }

  const handleDateChange = (
    date: Date | undefined,
    type: "publishedAtFrom" | "publishedAtFrom"
  ) => {
    setFilters(prev => ({ ...prev, [type]: date }))
  }
  const searchParams = useSearchParams()
  const page = searchParams.get("page")
  const pageQuery = page ? (isNaN(+page) ? 1 : +page) : 1
  const router = useRouter()
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const searchParams = new URLSearchParams(Object.entries(filters))
    searchParams.set("page", pageQuery.toString())
    router.push(`/documents?${searchParams.toString()}`)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Заголовок</Label>
        <Input
          id="title"
          name="titleTerm"
          value={filters.titleTerm}
          onChange={handleInputChange}
          placeholder="Поиск по заголовку"
        />
      </div>
      <div>
        <Label htmlFor="description">Описание</Label>
        <Input
          id="description"
          name="description"
          value={filters.descriptionTerm}
          onChange={handleInputChange}
          placeholder="Поиск по описанию"
        />
      </div>
      <div>
        <Label>Дата публикации (от)</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal",
                !filters.publishedAtFrom && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {filters.publishedAtFrom ? (
                format(filters.publishedAtFrom, "PPP")
              ) : (
                <span>Выберите дату</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={new Date(filters.publishedAtFrom)}
              onSelect={date => handleDateChange(date, "publishedAtFrom")}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      <div>
        <Label>Дата публикации (до)</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal",
                !filters.publishedAtFrom && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {filters.publishedAtFrom ? (
                format(filters.publishedAtFrom, "PPP")
              ) : (
                <span>Выберите дату</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={new Date(filters.publishedAtFrom)}
              onSelect={date => handleDateChange(date, "publishedAtFrom")}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      <Button type="submit" className="w-full">
        Применить фильтры
      </Button>
    </form>
  )
}
