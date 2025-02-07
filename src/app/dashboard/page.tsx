import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Overview } from "@/components/dashboard/Overview"
import { RecentSales } from "@/components/dashboard/RecentSales"
import { client } from "../../sanity/lib/sanity"

// Define the Product type
interface Product {
  _id: string
  inventory: number
}

interface Order {
  _id: string
  total: number
  status: string
  _createdAt: string
  cartItems: { quantity: number, product: Product }[]
}

async function fetchDashboardStats() {
  // Fetch all orders
  const orders: Order[] = await client.fetch(`
    *[_type == "order"] {
      _id,
      total,
      status,
      _createdAt,
      cartItems[] {
        quantity,
        "product": product->
      }
    }
  `)

  // Calculate total revenue (sum is explicitly typed as number)
  const totalRevenue = orders.reduce((sum: number, order: Order) => sum + (order.total || 0), 0)

  // Get orders from last 30 days
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

  const recentOrders = orders.filter((order) => new Date(order._createdAt) > thirtyDaysAgo)

  // Calculate growth
  const previousThirtyDays = orders.filter((order) => {
    const orderDate = new Date(order._createdAt)
    return orderDate > new Date(thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)) && orderDate < thirtyDaysAgo
  })

  const revenueGrowth =
    previousThirtyDays.length > 0
      ? (
          (recentOrders.reduce((sum: number, order: Order) => sum + order.total, 0) /
            previousThirtyDays.reduce((sum: number, order: Order) => sum + order.total, 0) - 1) *
          100
        ).toFixed(1)
      : 0

  // Get products count and low stock items
  const products: Product[] = await client.fetch(`
    *[_type == "products"] {
      _id,
      inventory
    }
  `)

  const lowStockThreshold = 10
  const lowStockCount = products.filter((product: Product) => product.inventory <= lowStockThreshold).length

  return {
    totalRevenue,
    totalOrders: orders.length,
    recentOrders: recentOrders.length,
    pendingOrders: orders.filter((order) => order.status === "pending").length,
    totalProducts: products.length,
    lowStockProducts: lowStockCount,
    revenueGrowth,
  }
}

export default async function DashboardPage() {
  const stats = await fetchDashboardStats()

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">{stats.revenueGrowth}% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalOrders}</div>
            <p className="text-xs text-muted-foreground">{stats.recentOrders} orders in last 30 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProducts}</div>
            <p className="text-xs text-muted-foreground">{stats.lowStockProducts} items low in stock</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingOrders}</div>
            <p className="text-xs text-muted-foreground">Requires attention</p>
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
