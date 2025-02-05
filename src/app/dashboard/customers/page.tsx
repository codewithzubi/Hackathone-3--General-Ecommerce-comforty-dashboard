import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { UserPlus } from "lucide-react"

const customers = [
  { id: 1, name: "John Doe", email: "john@example.com", orders: 5, totalSpent: 599.95 },
  { id: 2, name: "Jane Smith", email: "jane@example.com", orders: 3, totalSpent: 299.97 },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", orders: 7, totalSpent: 899.93 },
  { id: 4, name: "Alice Brown", email: "alice@example.com", orders: 2, totalSpent: 199.98 },
  { id: 5, name: "Charlie Davis", email: "charlie@example.com", orders: 4, totalSpent: 499.96 },
]

export default function CustomersPage() {
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
            <TableHead>Orders</TableHead>
            <TableHead>Total Spent</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((customer) => (
            <TableRow key={customer.id}>
              <TableCell>{customer.name}</TableCell>
              <TableCell>{customer.email}</TableCell>
              <TableCell>{customer.orders}</TableCell>
              <TableCell>${customer.totalSpent.toFixed(2)}</TableCell>
              <TableCell>
                <Button variant="ghost" size="sm">
                  View
                </Button>
                <Button variant="ghost" size="sm">
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

