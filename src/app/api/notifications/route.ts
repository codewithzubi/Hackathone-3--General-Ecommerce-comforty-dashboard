import { NextResponse } from "next/server"

export async function GET() {
  // Return empty notifications array for now
  // You can implement actual notification fetching logic here
  return NextResponse.json([])
}

