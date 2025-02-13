"use client"

import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
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

interface FilterPanelProps {
  onFilterChange: (filters: FilterState) => void
}

interface FilterState {
  title: string
  description: string
  startDate: Date | undefined
  endDate: Date | undefined
}

export function FilterPanel({ onFilterChange }: FilterPanelProps) {
  const [filters, setFilters] = useState<FilterState>({
    title: "",
    description: "",
    startDate: undefined,
    endDate: undefined
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFilters(prev => ({ ...prev, [name]: value }))
  }

  const handleDateChange = (
    date: Date | undefined,
    type: "startDate" | "endDate"
  ) => {
    setFilters(prev => ({ ...prev, [type]: date }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onFilterChange(filters)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Заголовок</Label>
        <Input
          id="title"
          name="title"
          value={filters.title}
          onChange={handleInputChange}
          placeholder="Поиск по заголовку"
        />
      </div>
      <div>
        <Label htmlFor="description">Описание</Label>
        <Input
          id="description"
          name="description"
          value={filters.description}
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
                !filters.startDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {filters.startDate ? (
                format(filters.startDate, "PPP")
              ) : (
                <span>Выберите дату</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={filters.startDate}
              onSelect={date => handleDateChange(date, "startDate")}
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
                !filters.endDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {filters.endDate ? (
                format(filters.endDate, "PPP")
              ) : (
                <span>Выберите дату</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={filters.endDate}
              onSelect={date => handleDateChange(date, "endDate")}
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
