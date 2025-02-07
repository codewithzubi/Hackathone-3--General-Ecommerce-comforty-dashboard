import { NextResponse } from "next/server"

export async function GET() {
  // Yahan par aap actual notifications fetch karenge
  // Abhi ke liye, hum dummy notifications return kar rahe hain
  const notifications = [
    { id: "1", type: "new_order", message: "New order received", timestamp: new Date().toISOString() },
    { id: "2", type: "low_stock", message: "Low stock alert: Product XYZ", timestamp: new Date().toISOString() },
  ]

  return NextResponse.json(notifications)
}

