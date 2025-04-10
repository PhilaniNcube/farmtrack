"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Inventory } from "@/lib/schema"
import { useState } from "react"

export function CategoryBreakdown({ inventory }: { inventory: Inventory[] }) {
    const [viewType, setViewType] = useState("quantity")





    //   
    const categoryInfo = inventory.reduce((acc: Record<string, { quantity: number; value: number }>, item) => {
        const { category, quantity, purchase_price } = item
        const value = Number(quantity) * Number(purchase_price)
        if (!acc[category]) {
            acc[category] = { quantity: 0, value: 0 }
        }
        acc[category].quantity += Number(quantity)
        acc[category].value += value
        return acc
    }, {} as Record<string, { quantity: number; value: number }>)


    const categoryData = {
        quantity: Object.entries(categoryInfo).map(([category, data]) => ({
            category,
            value: data.quantity,
            unit: "",
        })),
        value: Object.entries(categoryInfo).map(([category, data]) => ({
            category,
            value: data.value,
        })),
    }


    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
        }).format(amount)
    }

    const calculatePercentage = (value: number, total: number) => {
        return ((value / total) * 100).toFixed(1) + "%"
    }

    const totalQuantity = categoryData.quantity.reduce((sum, item) => sum + item.value, 0)
    const totalValue = categoryData.value.reduce((sum, item) => sum + item.value, 0)

    const getCategoryColor = (category: string) => {
        const categoryColors: Record<string, string> = {
            seed: "bg-green-500",
            fertilizer: "bg-emerald-500",
            feed: "bg-amber-500",
            equipment: "bg-blue-500",
            chemical: "bg-red-500",
        }

        return categoryColors[category] || "bg-gray-500"
    }

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Inventory by Category</CardTitle>
                    <CardDescription>Breakdown of your inventory by category</CardDescription>
                </div>
                <Select value={viewType} onValueChange={setViewType}>
                    <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="View Type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="quantity">By Quantity</SelectItem>
                        <SelectItem value="value">By Value</SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent>
                <div className="space-y-4 mt-4">
                    {viewType === "quantity" ? (
                        <>
                            {categoryData.quantity.map((item) => (
                                <div key={item.category} className="space-y-1">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium capitalize">{item.category}</span>
                                        <span className="text-sm font-medium">
                                            {item.value} {item.unit}
                                        </span>
                                    </div>
                                    <div className="h-2 w-full rounded-full bg-muted">
                                        <div
                                            className={`h-2 rounded-full ${getCategoryColor(item.category)}`}
                                            style={{ width: calculatePercentage(item.value, totalQuantity) }}
                                        />
                                    </div>
                                    <div className="text-xs text-muted-foreground text-right">
                                        {calculatePercentage(item.value, totalQuantity)}
                                    </div>
                                </div>
                            ))}
                        </>
                    ) : (
                        <>
                            {categoryData.value.map((item) => (
                                <div key={item.category} className="space-y-1">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium capitalize">{item.category}</span>
                                        <span className="text-sm font-medium">{formatCurrency(item.value)}</span>
                                    </div>
                                    <div className="h-2 w-full rounded-full bg-muted">
                                        <div
                                            className={`h-2 rounded-full ${getCategoryColor(item.category)}`}
                                            style={{ width: calculatePercentage(item.value, totalValue) }}
                                        />
                                    </div>
                                    <div className="text-xs text-muted-foreground text-right">
                                        {calculatePercentage(item.value, totalValue)}
                                    </div>
                                </div>
                            ))}
                        </>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
