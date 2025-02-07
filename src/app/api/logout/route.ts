import { NextResponse } from "next/server"

export async function POST() {
  const response = NextResponse.json({ success: true })
  response.cookies.delete("auth_token")
  response.cookies.delete("is_login_page")
  return response
}

