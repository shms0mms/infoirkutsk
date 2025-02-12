"use client"

import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"

interface PaginationProps {
  totalPages: number
  currentPage: number
  siblingsCount?: number
}

export function Pagination({
  totalPages,
  currentPage,
  siblingsCount = 1
}: PaginationProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams)
    params.set("page", pageNumber.toString())
    return `${pathname}?${params.toString()}`
  }

  const range = (start: number, end: number) => {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i)
  }

  const generatePagination = () => {
    const totalPageNumbers = siblingsCount + 5 // siblings + first + last + current + 2 dots

    if (totalPageNumbers >= totalPages) {
      return range(1, totalPages)
    }

    const leftSiblingIndex = Math.max(currentPage - siblingsCount, 1)
    const rightSiblingIndex = Math.min(currentPage + siblingsCount, totalPages)

    const shouldShowLeftDots = leftSiblingIndex > 2
    const shouldShowRightDots = rightSiblingIndex < totalPages - 2

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingsCount
      const leftRange = range(1, leftItemCount)
      return [...leftRange, "DOTS", totalPages]
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingsCount
      const rightRange = range(totalPages - rightItemCount + 1, totalPages)
      return [1, "DOTS", ...rightRange]
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex)
      return [1, "DOTS", ...middleRange, "DOTS", totalPages]
    }
  }

  const paginationRange = generatePagination()

  if (currentPage === 0 || paginationRange!.length < 2) {
    return null
  }

  return (
    <nav className="flex justify-center items-center space-x-2">
      <Button
        variant="outline"
        size="icon"
        disabled={currentPage === 1}
        asChild
      >
        <Link href={createPageURL(currentPage - 1)}>
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Предыдущая страница</span>
        </Link>
      </Button>
      {paginationRange!.map((pageNumber, index) => {
        if (pageNumber === "DOTS") {
          return (
            <Button key={index} variant="outline" size="icon" disabled>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          )
        }
        return (
          <Button
            key={index}
            variant={pageNumber === currentPage ? "default" : "outline"}
            asChild
          >
            <Link href={createPageURL(pageNumber as number)}>{pageNumber}</Link>
          </Button>
        )
      })}
      <Button
        variant="outline"
        size="icon"
        disabled={currentPage === totalPages}
        asChild
      >
        <Link href={createPageURL(currentPage + 1)}>
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Следующая страница</span>
        </Link>
      </Button>
    </nav>
  )
}
