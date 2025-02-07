"use client"  // Marking this file as a client component

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { client } from "../../../sanity/lib/sanity";

// Define the Product interface (update as necessary)
interface Product {
  _id: string; // Assuming each product has an ID
  name: string;
  price: number;
  // Add any other fields that are part of the product
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

const fetchOrders = async (): Promise<Order[]> => {
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
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Using useEffect to fetch orders asynchronously after the component mounts
  useEffect(() => {
    const loadOrders = async () => {
      setLoading(true);
      try {
        const fetchedOrders = await fetchOrders();
        setOrders(fetchedOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

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
              <TableCell>{order.cartItems.length} items</TableCell>
              <TableCell>${order.total.toFixed(2)}</TableCell>
              <TableCell>
                <Badge
                  variant={order.status === "success" ? "default" : order.status === "pending" ? "outline" : "secondary"}
                >
                  {order.status}
                </Badge>
              </TableCell>
              <TableCell>
                <Button variant="ghost" size="sm">
                  View Details
                </Button>
                <ClientButton /> {/* Marking the button as a Client Component */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

// Separate Client Button component to handle interactivity
function ClientButton() {
  const handleUpdate = () => {
    // Your logic for updating the order status
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleUpdate}
    >
      Update Status
    </Button>
  );
}
