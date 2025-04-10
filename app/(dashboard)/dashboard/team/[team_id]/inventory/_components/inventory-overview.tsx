import { Card, CardContent } from "@/components/ui/card"
import { Inventory } from "@/lib/schema"
import { Package, AlertTriangle, Warehouse, DollarSign } from "lucide-react"

export function InventoryOverview({ inventory }: { inventory: Inventory[] }) {

    const totalItems = inventory.reduce((acc, item) => acc + Number(item.quantity), 0)
    const totalValue = inventory.reduce((acc, item) => acc + (Number(item.quantity) * Number(item.purchase_price)), 0)
    const lowStockItems = inventory.filter(item => Number(item.quantity) < 5).length
    const storageLocations = [...new Set(inventory.map(item => item.storage_location))].length

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
        }).format(amount)
    }

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-6">
            <Card>
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Total Items</p>
                            <p className="text-3xl font-bold">{totalItems}</p>
                        </div>
                        <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                            <Package className="h-6 w-6 text-blue-600" />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Inventory Value</p>
                            <p className="text-3xl font-bold">{formatCurrency(totalValue)}</p>
                        </div>
                        <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                            <DollarSign className="h-6 w-6 text-green-600" />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Low Stock Items</p>
                            <p className="text-3xl font-bold">{lowStockItems}</p>
                        </div>
                        <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center">
                            <AlertTriangle className="h-6 w-6 text-amber-600" />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Storage Locations</p>
                            <p className="text-3xl font-bold">{storageLocations}</p>
                        </div>
                        <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                            <Warehouse className="h-6 w-6 text-purple-600" />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
