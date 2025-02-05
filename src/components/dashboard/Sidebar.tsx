"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, ShoppingBag, Users, FileText, Settings, LogOut } from "lucide-react"

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: ShoppingBag, label: "Products", href: "/dashboard/products" },
  { icon: Users, label: "Customers", href: "/dashboard/customers" },
  { icon: FileText, label: "Orders", href: "/dashboard/orders" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex flex-col h-full bg-gray-900 text-white w-64">
      <div className="flex items-center justify-center h-20 border-b border-gray-800">
        <h1 className="text-2xl font-bold">Comforty Admin</h1>
      </div>
      <nav className="flex-1 overflow-y-auto">
        <ul className="p-4 space-y-2">
          {sidebarItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href} passHref>
                <Button variant="ghost" className={cn("w-full justify-start", pathname === item.href && "bg-gray-800")}>
                  <item.icon className="mr-2 h-5 w-5" />
                  {item.label}
                </Button>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4">
        <Button variant="ghost" className="w-full justify-start">
          <LogOut className="mr-2 h-5 w-5" />
          Logout
        </Button>
      </div>
    </div>
  )
}

