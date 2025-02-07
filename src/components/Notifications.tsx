"use client"

import { useState, useEffect } from "react"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"

interface Notification {
  id: string
  type: "new_order" | "low_stock"
  message: string
  timestamp: string
}

export function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const router = useRouter()

  useEffect(() => {
    // Fetch notifications from API
    const fetchNotifications = async () => {
      try {
        const response = await fetch("/api/notifications")
        if (response.ok) {
          const data = await response.json()
          setNotifications(data)
        }
      } catch (error) {
        console.error("Failed to fetch notifications:", error)
      }
    }

    fetchNotifications()

    // Poll for new notifications every minute
    const intervalId = setInterval(fetchNotifications, 60000)

    return () => {
      clearInterval(intervalId)
    }
  }, [])

  const handleNotificationClick = (notification: Notification) => {
    if (notification.type === "new_order") {
      router.push("/dashboard/orders")
    } else if (notification.type === "low_stock") {
      router.push("/dashboard/products")
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {notifications.length > 0 && (
            <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
              {notifications.length}
            </span>
          )}
          <span className="sr-only">Notifications</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64" align="end" forceMount>
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {notifications.length === 0 ? (
            <DropdownMenuItem className="text-center text-muted-foreground">No new notifications</DropdownMenuItem>
          ) : (
            notifications.map((notification) => (
              <DropdownMenuItem key={notification.id} onClick={() => handleNotificationClick(notification)}>
                {notification.message}
                <span className="ml-auto text-xs text-muted-foreground">{notification.timestamp}</span>
              </DropdownMenuItem>
            ))
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="justify-center" onClick={() => router.push("/dashboard/notifications")}>
          View all notifications
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

