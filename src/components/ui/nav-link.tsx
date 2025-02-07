// src/components/ui/nav-link.tsx

import Link from "next/link"

// NavLink component
export const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  return (
    <Link href={href} className="text-sm text-gray-800 hover:text-blue-500">
      {children}
    </Link>
  )
}

// NavLinkGroup component
export const NavLinkGroup = ({ children }: { children: React.ReactNode }) => {
  return <div className="space-y-2">{children}</div>
}
