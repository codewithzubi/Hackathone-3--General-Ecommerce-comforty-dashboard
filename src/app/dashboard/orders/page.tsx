import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const orders = [
  { id: 1, customer: "John Doe", date: "2023-05-01", total: 599.95, status: "Delivered" },
  { id: 2, customer: "Jane Smith", date: "2023-05-02", total: 299.97, status: "Processing" },
  { id: 3, customer: "Bob Johnson", date: "2023-05-03", total: 899.93, status: "Shipped" },
  { id: 4, customer: "Alice Brown", date: "2023-05-04", total: 199.98, status: "Pending" },
  { id: 5, customer: "Charlie Davis", date: "2023-05-05", total: 499.96, status: "Delivered" },
]

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Orders</h1>
      </div>
      <div className="flex items-center space-x-2">
        <Input placeholder="Search orders..." className="max-w-sm" />
        <Button variant="secondary">Search</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>#{order.id}</TableCell>
              <TableCell>{order.customer}</TableCell>
              <TableCell>{order.date}</TableCell>
              <TableCell>${order.total.toFixed(2)}</TableCell>
              <TableCell>
                <Badge variant={order.status === "Delivered" ? "secondary" : "default"}>
                  {order.status}
                </Badge>
              </TableCell>
              <TableCell>
                <Button variant="ghost" size="sm">
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
