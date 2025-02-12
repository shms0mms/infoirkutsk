import { type NextRequest, NextResponse } from "next/server"
import { auth } from "@/server/auth"

export async function GET(req: NextRequest) {
  const session = await auth.api.getSession({
    headers: req.headers
  })

  if (!session) {
    return NextResponse.redirect(
      new URL(`/auth/sign-in?callbackUrl=${req.nextUrl.href}`, req.url)
    )
  }

  const url = new URL(req.url)
}
