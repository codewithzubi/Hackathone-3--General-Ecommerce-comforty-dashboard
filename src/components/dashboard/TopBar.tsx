"use client"
import { useEffect, useState } from "react"
// import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { client } from "../../sanity/lib/client"

// Define the Product interface
interface Product {
  name: string;
  price: number;
  // Add other fields as needed
}

// Define the Order interface
interface Order {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  total: number;
  status: string;
  _createdAt: string;
  cartItems: { quantity: number; product: Product }[]; // Updated 'product' type
}

async function getOrders(): Promise<Order[]> {
  const orders = await client.fetch(`
    *[_type == "order"] | order(_createdAt desc) {
      _id,
      firstName,
      lastName,
      email,
      total,
      status,
      _createdAt,
      cartItems[] {
        quantity,
        "product": product->
      }
    }
  `);
  return orders;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      const fetchedOrders = await getOrders();
      setOrders(fetchedOrders);
      setLoading(false);
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Orders</h1>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order._id}>
              <TableCell>#{order._id.slice(-5)}</TableCell>
              <TableCell>{`${order.firstName} ${order.lastName}`}</TableCell>
              <TableCell>{order.email}</TableCell>
              <TableCell>{new Date(order._createdAt).toLocaleDateString()}</TableCell>
              <TableCell>{order.cartItems.length || 0} items</TableCell>
              <TableCell>${order.total.toFixed(2)}</TableCell>
              <TableCell>
                <Badge variant={order.status === "success" ? "default" : "outline"}>
                  {order.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
