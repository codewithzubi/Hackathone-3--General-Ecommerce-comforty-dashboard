import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const body = await request.json()
  const { email, password } = body

  // Yahan par aap actual authentication logic implement kar sakte hain
  // Abhi ke liye, hum ek dummy check kar rahe hain
  if (email === "admin@example.com" && password === "password") {
    const response = NextResponse.json({ success: true })
    response.cookies.set("auth_token", "dummy_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    })
    return response
  }

  return NextResponse.json({ success: false }, { status: 401 })
}

