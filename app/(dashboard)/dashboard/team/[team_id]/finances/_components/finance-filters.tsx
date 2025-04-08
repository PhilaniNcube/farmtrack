"use client"

import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, SlidersHorizontal } from "lucide-react"
import { useState } from "react"
import { useQueryState } from 'nuqs'


export function FinancesFilters() {
    const [showFilters, setShowFilters] = useState(false)

    const [transaction_type, setTransactionType] = useQueryState("transaction_type")

    const [category, setCategory] = useQueryState("category")
    const [payment_method, setPaymentMethod] = useQueryState("payment_method")

    const [search, setSearch] = useQueryState("search")

    return (
        <div className="space-y-4">
            <div className="flex flex-col gap-4 sm:flex-row">
                <div className="flex-1 flex items-center space-x-2">
                    <div className="relative flex-1">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input onChange={(e) => setSearch(e.target.value)} type="search" placeholder="Search transactions..." className="pl-8" />
                    </div>
                    <Button variant="outline" size="icon" onClick={() => setShowFilters(!showFilters)}>
                        <SlidersHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle filters</span>
                    </Button>
                </div>
                <div className="flex items-center space-x-2">
                    <Select defaultValue="all" onValueChange={(value) => setTransactionType(value)}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Transaction Type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Transactions</SelectItem>
                            <SelectItem value="income">Income</SelectItem>
                            <SelectItem value="expense">Expenses</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {showFilters && (
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

                    <Select defaultValue="all" onValueChange={(value) => setCategory(value)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Categories</SelectItem>
                            <SelectItem value="sales">Sales</SelectItem>
                            <SelectItem value="supplies">Supplies</SelectItem>
                            <SelectItem value="equipment">Equipment</SelectItem>
                            <SelectItem value="feed">Feed</SelectItem>
                            <SelectItem value="fertilizer">Fertilizer</SelectItem>
                            <SelectItem value="labor">Labor</SelectItem>
                            <SelectItem value="utilities">Utilities</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select defaultValue="all" onValueChange={(value) => setPaymentMethod(value)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Payment Method" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Methods</SelectItem>
                            <SelectItem value="cash">Cash</SelectItem>
                            <SelectItem value="credit_card">Credit Card</SelectItem>
                            <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                            <SelectItem value="check">Check</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                    </Select>
                   
                </div>
            )}
        </div>
    )
}
