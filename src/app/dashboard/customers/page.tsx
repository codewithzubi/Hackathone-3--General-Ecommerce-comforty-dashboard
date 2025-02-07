import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { UserPlus } from "lucide-react"
import { client } from "../../../sanity/lib/sanity"

// Define the types for the customer and accumulator
interface Customer {
  id: string
  firstName: string
  lastName: string
  email: string
  totalOrders: number
  totalSpent: number
  lastOrderDate: string
}

interface Order {
  _id: string
  firstName: string
  lastName: string
  email: string
  total: number
  _createdAt: string
}

async function getCustomers() {
  // Get all orders first
  const orders: Order[] = await client.fetch(`
    *[_type == "order"] {
      _id,
      firstName,
      lastName,
      email,
      total,
      _createdAt
    }
  `)

  // Group orders by customer email to get unique customers with their order history
  const customersMap = orders.reduce((acc: { [email: string]: Customer }, order: Order) => {
    const email = order.email
    if (!acc[email]) {
      acc[email] = {
        id: order._id,
        firstName: order.firstName,
        lastName: order.lastName,
        email: email,
        totalOrders: 0,
        totalSpent: 0,
        lastOrderDate: order._createdAt,
      }
    }
    acc[email].totalOrders += 1
    acc[email].totalSpent += order.total
    acc[email].lastOrderDate =
      new Date(order._createdAt) > new Date(acc[email].lastOrderDate) ? order._createdAt : acc[email].lastOrderDate
    return acc
  }, {})

  return Object.values(customersMap)
}

export default async function CustomersPage() {
  const customers = await getCustomers()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Customers</h1>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" /> Add Customer
        </Button>
      </div>
      <div className="flex items-center space-x-2">
        <Input placeholder="Search customers..." className="max-w-sm" />
        <Button variant="secondary">Search</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Total Orders</TableHead>
            <TableHead>Total Spent</TableHead>
            <TableHead>Last Order</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((customer: Customer) => (
            <TableRow key={customer.id}>
              <TableCell>{`${customer.firstName} ${customer.lastName}`}</TableCell>
              <TableCell>{customer.email}</TableCell>
              <TableCell>{customer.totalOrders}</TableCell>
              <TableCell>${customer.totalSpent.toFixed(2)}</TableCell>
              <TableCell>{new Date(customer.lastOrderDate).toLocaleDateString()}</TableCell>
              <TableCell>
                <Button variant="ghost" size="sm">
                  View Details
                </Button>
                <Button variant="ghost" size="sm">
                  Order History
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
