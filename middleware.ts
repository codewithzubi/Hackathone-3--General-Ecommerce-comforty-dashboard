import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value
  const isLoginPage = request.nextUrl.pathname === "/login"
  const isDashboardPage = request.nextUrl.pathname.startsWith("/dashboard")

  // Set a cookie to identify login page
  const response = NextResponse.next()
  response.cookies.set("is_login_page", isLoginPage ? "true" : "false")

  if (!token && isDashboardPage) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  if (token && isLoginPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return response
}

export const config = {
  matcher: ["/login", "/dashboard/:path*"],
}

