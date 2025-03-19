"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, MilkIcon as Cow, DollarSign, Home, Leaf, Settings, Tractor } from "lucide-react"

import { cn } from "@/lib/utils"

interface MainNavProps {
  className?: string
}

export function MainNav({ className }: MainNavProps) {
  const pathname = usePathname()

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
      <Link
        href="/dashboard"
        className={cn(
          "flex items-center text-sm font-medium transition-colors hover:text-primary",
          pathname === "/dashboard" ? "text-primary" : "text-muted-foreground",
        )}
      >
        <Home className="mr-2 h-4 w-4" />
        Dashboard
      </Link>
      <Link
        href="/crops"
        className={cn(
          "flex items-center text-sm font-medium transition-colors hover:text-primary",
          pathname === "/crops" ? "text-primary" : "text-muted-foreground",
        )}
      >
        <Leaf className="mr-2 h-4 w-4" />
        Crops
      </Link>
      <Link
        href="/livestock"
        className={cn(
          "flex items-center text-sm font-medium transition-colors hover:text-primary",
          pathname === "/livestock" ? "text-primary" : "text-muted-foreground",
        )}
      >
        <Cow className="mr-2 h-4 w-4" />
        Livestock
      </Link>
      <Link
        href="/finances"
        className={cn(
          "flex items-center text-sm font-medium transition-colors hover:text-primary",
          pathname === "/finances" ? "text-primary" : "text-muted-foreground",
        )}
      >
        <DollarSign className="mr-2 h-4 w-4" />
        Finances
      </Link>
      <Link
        href="/inventory"
        className={cn(
          "flex items-center text-sm font-medium transition-colors hover:text-primary",
          pathname === "/inventory" ? "text-primary" : "text-muted-foreground",
        )}
      >
        <Tractor className="mr-2 h-4 w-4" />
        Inventory
      </Link>
      <Link
        href="/reports"
        className={cn(
          "flex items-center text-sm font-medium transition-colors hover:text-primary",
          pathname === "/reports" ? "text-primary" : "text-muted-foreground",
        )}
      >
        <BarChart3 className="mr-2 h-4 w-4" />
        Reports
      </Link>
      <Link
        href="/settings"
        className={cn(
          "flex items-center text-sm font-medium transition-colors hover:text-primary",
          pathname === "/settings" ? "text-primary" : "text-muted-foreground",
        )}
      >
        <Settings className="mr-2 h-4 w-4" />
        Settings
      </Link>
    </nav>
  )
}

