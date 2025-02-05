import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Overview } from "@/components/dashboard/Overview"
import { RecentSales } from "@/components/dashboard/RecentSales"
import { client } from "../sanity/lib/sanity"

// Define specific types for orders and products
interface Order {
  total: number
  status: string
}

interface Product {
  inventory: number
}

async function fetchDashboardData() {
  // Specify the type of the fetched data
  const orders: Order[] = await client.fetch(`
    *[_type == "order"] {
      total,
      status
    }
  `)

  // Use specific types instead of any
  const totalRevenue = orders.reduce((sum: number, order: Order) => sum + (order.total || 0), 0)
  const totalOrders = orders.length
  const pendingOrders = orders.filter((order: Order) => order.status === "pending").length

  const products: Product[] = await client.fetch(`
    *[_type == "products"] {
      inventory
    }
  `)

  const totalProducts = products.length
  const lowStockProducts = products.filter((product: Product) => product.inventory <= 10).length

  return { totalRevenue, totalOrders, totalProducts, pendingOrders, lowStockProducts }
}

export default async function DashboardPage() {
  const { totalRevenue, totalOrders, totalProducts, pendingOrders, lowStockProducts } = await fetchDashboardData()

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProducts}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingOrders}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lowStockProducts}</div>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentSales />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
