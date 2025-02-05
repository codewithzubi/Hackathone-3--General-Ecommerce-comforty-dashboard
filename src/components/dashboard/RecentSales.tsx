"use client"

import { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { client } from "../../sanity/lib/sanity"

interface Sale {
  _id: string
  firstName: string
  lastName: string
  email: string
  total: number
  status: string
}

export function RecentSales() {
  const [recentSales, setRecentSales] = useState<Sale[]>([])

  useEffect(() => {
    async function fetchRecentSales() {
      const result = await client.fetch<Sale[]>(`
        *[_type == "order"] | order(_createdAt desc)[0...5] {
          _id,
          firstName,
          lastName,
          email,
          total,
          status
        }
      `)
      setRecentSales(result)
    }

    fetchRecentSales()
  }, [])

  return (
    <div className="space-y-8">
      {recentSales.map((sale) => (
        <div key={sale._id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src="/avatars/01.png" alt="Avatar" />
            <AvatarFallback>{sale.firstName[0]}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{`${sale.firstName} ${sale.lastName}`}</p>
            <p className="text-sm text-muted-foreground">{sale.email}</p>
          </div>
          <div className="ml-auto text-sm">
            <p className="font-medium">${sale.total.toFixed(2)}</p>
            <p className={`text-xs ${sale.status === "success" ? "text-green-500" : "text-orange-500"}`}>
              {sale.status}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

