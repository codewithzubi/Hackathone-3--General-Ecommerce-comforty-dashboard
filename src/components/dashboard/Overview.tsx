"use client"

import { useEffect, useState } from "react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { client } from "../../sanity/lib/sanity"

interface MonthlySales {
  month: string
  total: number
}

interface SanityOrder {
  _createdAt: string
  total: number
}

export function Overview() {
  const [data, setData] = useState<MonthlySales[]>([])

  useEffect(() => {
    async function fetchData() {
      const result = await client.fetch(`
        *[_type == "order"] {
          _createdAt,
          total
        }
      `)

      const monthlyData = result.reduce((acc: Record<string, MonthlySales>, order: SanityOrder) => {
        const date = new Date(order._createdAt)
        const month = date.toLocaleString("default", { month: "short" })
        if (!acc[month]) {
          acc[month] = { month, total: 0 }
        }
        acc[month].total += order.total
        return acc
      }, {})

      setData(Object.values(monthlyData))
    }

    fetchData()
  }, [])

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip formatter={(value) => [`$${value}`, "Total Sales"]} labelFormatter={(label) => `Month: ${label}`} />
        <Bar dataKey="total" fill="#adfa1d" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

