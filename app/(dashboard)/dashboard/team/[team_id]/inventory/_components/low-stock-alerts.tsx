import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ShoppingCart } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Inventory } from "@/lib/schema"

export function LowStockAlerts({inventory}:{inventory:Inventory[]}) {
  // In a real app, these would be fetched from your database
  const lowStockItems = inventory.filter((item) => {
    return Number(item.quantity) < 5
    }
    )

  const getCategoryBadge = (category: string) => {
    const categoryColors: Record<string, string> = {
      seed: "bg-green-50",
      fertilizer: "bg-emerald-50",
      feed: "bg-amber-50",
      equipment: "bg-blue-50",
      chemical: "bg-red-50",
    }

    return (
      <Badge variant="outline" className={categoryColors[category] || "bg-gray-50"}>
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </Badge>
    )
  }



  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Low Stock Items</h2>
        <Button asChild>
          <Link href="/dashboard/inventory/order">
            <ShoppingCart className="mr-2 h-4 w-4" />
            Order Supplies
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {lowStockItems.map((item) => (
          <Card key={item.id} className={Number(item.quantity) < 5 ? "border-red-200" : ""}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{item.item_name}</CardTitle>
              
              </div>
              <CardDescription className="flex items-center justify-between">
                <span>{getCategoryBadge(item.category)}</span>
                <span>{item.storage_location}</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Current Stock:</span>
                  <span className="font-medium">
                    {item.quantity} {item.unit}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Reorder Level:</span>
                  <span className="font-medium">
                    {item.reorder_level} {item.unit}
                  </span>
                </div>
                <Progress
                  value={(Number(item.quantity) / Number(item.reorder_level)) * 100}
                  className={cn("h-2 w-full", Number(item.quantity) < 5 ? "bg-red-500" : "bg-amber-500")}
                />
              </div>

              <div className="flex justify-between items-center">
                <div className="text-sm">
                  <span className="text-muted-foreground">Supplier: </span>
                  <span>{item.supplier}</span>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/dashboard/team/${item.team_id}/inventory/${item.id}`}>View Details</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
