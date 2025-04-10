import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Package, Calendar, Tag, Warehouse, DollarSign, AlertTriangle } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Inventory } from "@/lib/schema"
import { cn } from "@/lib/utils"

interface InventoryItemDetailsProps {
  item: Inventory
}

export function InventoryItemDetails({ item }: InventoryItemDetailsProps) {
  const formatCurrency = (amount: number | null) => {
    if (amount === null) return "N/A"
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const getStockStatus = (quantity: number, reorderLevel: number | null) => {
    if (!reorderLevel) return "adequate"
    if (quantity <= reorderLevel * 0.5) return "critical"
    if (quantity <= reorderLevel) return "low"
    return "adequate"
  }

  const getStockStatusBadge = (status: string) => {
    switch (status) {
      case "critical":
        return <Badge variant="destructive">Critical</Badge>
      case "low":
        return <Badge variant="secondary">Low</Badge>
      case "adequate":
        return <Badge variant="default">Adequate</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getExpiryStatus = (expiryDate: Date | null) => {
    if (!expiryDate) return null

    const today = new Date()
    const expiry = expiryDate
    const daysUntilExpiry = Math.floor((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

    if (daysUntilExpiry < 0) return { status: "expired", days: Math.abs(daysUntilExpiry) }
    if (daysUntilExpiry < 30) return { status: "expiring-soon", days: daysUntilExpiry }
    return { status: "valid", days: daysUntilExpiry }
  }

  const stockStatus = getStockStatus(Number(item.quantity), Number(item.reorder_level))
  const expiryStatus = getExpiryStatus(item.expiry_date)

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Item Details</CardTitle>
          <CardDescription>Basic information about this inventory item</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-1">
            <div className="flex items-center text-sm">
              <Package className="mr-2 h-4 w-4 text-blue-500" />
              <span className="font-medium">Current Stock</span>
            </div>
            <div className="flex items-center justify-between pl-6">
              <p className="text-2xl font-bold">
                {item.quantity} {item.unit}
              </p>
              {getStockStatusBadge(stockStatus)}
            </div>
            {item.reorder_level && (
              <div className="pl-6 space-y-1">
                <Progress
                  value={(Number(item.quantity) / Number(item.reorder_level)) * 100}
                  className={cn("", stockStatus === "critical" ? "bg-red-500" : stockStatus === "low" ? "bg-amber-500" : "bg-green-500")}              
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>
                    Reorder Level: {item.reorder_level} {item.unit}
                  </span>
                  {stockStatus === "low" || stockStatus === "critical" ? (
                    <span className="text-red-500 font-medium">
                      {stockStatus === "critical" ? "Order immediately!" : "Consider reordering soon"}
                    </span>
                  ) : (
                    <span>Stock level good</span>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-1">
            <div className="flex items-center text-sm">
              <Tag className="mr-2 h-4 w-4 text-green-500" />
              <span className="font-medium">Category</span>
            </div>
            <p className="text-sm pl-6 capitalize">{item.category}</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center text-sm">
              <Warehouse className="mr-2 h-4 w-4 text-purple-500" />
              <span className="font-medium">Storage Location</span>
            </div>
            <p className="text-sm pl-6">{item.storage_location || "Not specified"}</p>
          </div>

          <Separator />

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Purchase Information</h3>
            <div className="grid gap-2 md:grid-cols-2">
              <div className="rounded-md border p-2">
                <div className="text-xs text-muted-foreground">Purchase Date</div>
                <div className="font-medium">
                  {item.purchase_date ? new Date(item.purchase_date).toLocaleDateString() : "N/A"}
                </div>
              </div>
              <div className="rounded-md border p-2">
                <div className="text-xs text-muted-foreground">Purchase Price</div>
                <div className="font-medium">{formatCurrency(Number(item.purchase_price))}</div>
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center text-sm">
              <DollarSign className="mr-2 h-4 w-4 text-amber-500" />
              <span className="font-medium">Supplier</span>
            </div>
            <p className="text-sm pl-6">{item.supplier || "Not specified"}</p>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Expiry Information</CardTitle>
            <CardDescription>Expiry date and status</CardDescription>
          </CardHeader>
          <CardContent>
            {item.expiry_date ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4 text-blue-500" />
                    <span className="font-medium">Expiry Date:</span>
                  </div>
                  <span>{new Date(item.expiry_date).toLocaleDateString()}</span>
                </div>

                {expiryStatus && (
                  <div className="rounded-md border p-4 space-y-2">
                    {expiryStatus.status === "expired" ? (
                      <div className="flex items-center text-red-500">
                        <AlertTriangle className="mr-2 h-5 w-5" />
                        <span className="font-medium">Expired {expiryStatus.days} days ago</span>
                      </div>
                    ) : expiryStatus.status === "expiring-soon" ? (
                      <div className="flex items-center text-amber-500">
                        <AlertTriangle className="mr-2 h-5 w-5" />
                        <span className="font-medium">Expiring in {expiryStatus.days} days</span>
                      </div>
                    ) : (
                      <div className="flex items-center text-green-500">
                        <Calendar className="mr-2 h-5 w-5" />
                        <span className="font-medium">Valid for {expiryStatus.days} more days</span>
                      </div>
                    )}

                    {expiryStatus.status === "expired" && (
                      <p className="text-sm text-red-500">This item has expired and should be disposed of properly.</p>
                    )}

                    {expiryStatus.status === "expiring-soon" && (
                      <p className="text-sm text-amber-500">
                        This item will expire soon. Consider using it promptly or planning for replacement.
                      </p>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-6 text-muted-foreground">
                <p>No expiry date specified</p>
                <p className="text-sm mt-1">This item does not have an expiration date</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notes</CardTitle>
            <CardDescription>Additional information and observations</CardDescription>
          </CardHeader>
          <CardContent>
            {item.notes ? (
              <p className="whitespace-pre-line">{item.notes}</p>
            ) : (
              <p className="text-muted-foreground">No notes available for this item</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Metadata</CardTitle>
            <CardDescription>System information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex justify-between">
                <span>Created:</span>
                <span>{new Date(item.created_at).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Last Updated:</span>
                <span>{new Date(item.updated_at).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Item ID:</span>
                <span>{item.id}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
