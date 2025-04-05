import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Package, Plus, AlertTriangle } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { FieldLocation, Inventory } from "@/lib/schema"
import Link from "next/link"
import AddInventoryDialog from "./add-inventory-dialog"

export function InventoryLevels({ inventory, fields }: { inventory: Inventory[], fields: FieldLocation[] }) {


    const getInventoryStatusBadge = (status: string) => {
        switch (status) {
            case "adequate":
                return <Badge variant="default">Adequate</Badge>
            case "low":
                return <Badge variant="secondary">Low</Badge>
            case "critical":
                return <Badge variant="destructive">Critical</Badge>
            default:
                return <Badge variant="outline">{status}</Badge>
        }
    }

    const getInventoryProgress = (quantity: number, reorderLevel: number) => {
        const percentage = (quantity / reorderLevel) * 100
        return Math.min(percentage, 100)
    }

    return (
        <Card className="col-span-4">
            <CardHeader className="flex flex-row items-center">
                <div className="grid gap-2">
                    <CardTitle>Inventory Levels</CardTitle>
                    <CardDescription>Monitor your farm supplies and equipment</CardDescription>
                </div>
               <AddInventoryDialog locations={fields} />
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {inventory.map((item) => (
                        <div key={item.id} className="space-y-2">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <Package className="h-4 w-4 text-blue-500" />
                                    <span className="font-medium">{item.item_name}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="text-sm text-muted-foreground">{item.storage_location}</span>
                                    {getInventoryStatusBadge(item.category)}
                                </div>
                            </div>
                            <div className="space-y-1">
                                <div className="flex justify-between text-xs">
                                    <span>
                                        {item.quantity} {item.unit}
                                    </span>
                                    <span className="flex items-center">
                                        {Number(item.quantity) < Number(item.reorder_level) && <AlertTriangle className="mr-1 h-3 w-3 text-amber-500" />}
                                        Reorder Level: {item.reorder_level} {item.unit}
                                    </span>
                                </div>
                                <Progress
                                    value={getInventoryProgress(Number(item.quantity), Number(item.reorder_level))}
                                    className={`h-2 ${Number(item.quantity) < Number(item.reorder_level) ? "bg-amber-100" : "bg-blue-100"}`}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
            <CardFooter>

                {inventory.length > 0 && (
                    <Link href={`/dashboard/team/${inventory[0].team_id}/inventory`} passHref className="w-full">
                        <Button variant="outline" className="w-full">
                            View All Inventory
                        </Button>
                    </Link>
                )}
            </CardFooter>
        </Card>
    )
}

