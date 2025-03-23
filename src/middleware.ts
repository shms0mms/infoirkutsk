import { betterFetch } from "@better-fetch/fetch"
import { NextRequest, NextResponse } from "next/server"
import { type Session } from "./server/auth"

const protectedRoutes = ["/create-material", "/dashboard"]
const moderatorRoutes = [
  "/create-document",
  "/dashboard/documents",
  "/dashboard/categories",
  "/create-category",
  "/create-event"
]
export const middleware = async (request: NextRequest) => {
  const { data: session } = await betterFetch<Session>(
    "/api/auth/get-session",
    {
      baseURL: request.nextUrl.origin,
      headers: {
        // Get the cookie from the request
        cookie: request.headers.get("cookie") || ""
      }
    }
  )

  const pathname = request.nextUrl.pathname

  if (pathname === "/auth/sign-in" && session) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  if (protectedRoutes.some(p => pathname.startsWith(p)) && !session) {
    return NextResponse.redirect(new URL("/auth/sign-in", request.url))
  }
  const isNotModerator = session?.user.role !== "moderator"
  if (moderatorRoutes.some(p => pathname.startsWith(p)) && isNotModerator) {
    return NextResponse.redirect(new URL("/404", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|user|robots).*)"]
}
