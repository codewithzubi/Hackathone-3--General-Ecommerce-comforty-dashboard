import Link from "next/link"
import { Home, ShoppingBag, Users, BarChart } from "lucide-react"

export function Sidebar() {
  return (
    <div className="bg-white w-64 h-full flex flex-col">
      <div className="p-4">
        <h2 className="text-2xl font-bold">E-Commerce Dashboard</h2>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <li>
            <Link href="/dashboard" className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded">
              <Home className="mr-2" />
              Dashboard
            </Link>
          </li>
          <li>
            <Link href="/dashboard/products" className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded">
              <ShoppingBag className="mr-2" />
              Products
            </Link>
          </li>
          <li>
            <Link href="/dashboard/orders" className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded">
              <BarChart className="mr-2" />
              Orders
            </Link>
          </li>
          <li>
            <Link href="/dashboard/customers" className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded">
              <Users className="mr-2" />
              Customers
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

