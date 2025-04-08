"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Eye, Edit, Trash, Download } from "lucide-react"
import Link from "next/link"
import { Finance } from "@/lib/schema"
import { format } from "date-fns"
import { useQueryState } from "nuqs"

export function RecentTransactions({transactions}:{transactions:Finance[]}) {

    const [transaction_type, setTransactionType] = useQueryState("transaction_type")
    const [category, setCategory] = useQueryState("category")
    const [payment_method, setPaymentMethod] = useQueryState("payment_method")
    const [search, setSearch] = useQueryState("search")
    const [startDate, setStartDate] = useQueryState("start_date")
    const [endDate, setEndDate] = useQueryState("end_date")


  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

// filter transactions based on transaction_type, category and payment_method if any of them are selected
    // if transaction_type is "all" or not selected, show all transactions
    // if category is "all" or not selected, show all transactions
    // if payment_method is "all" or not selected, show all transactions
    // if transaction_type is "income" or "expense", show only those transactions
    //  also filter by description if search is used    
    
    const filteredTransactions = transactions.filter((transaction) => {

    if (search && !transaction?.description?.toLowerCase().includes(search.toLowerCase())) {
        return false
        }    

    if (transaction_type && transaction_type !== "all" && transaction.transaction_type !== transaction_type) {
        return false
        }
    if (category && category !== "all" && transaction.category !== category) {
        return false
        }
    if (payment_method && payment_method !== "all" && transaction.payment_method !== payment_method) {
        return false
        }
    // Filter by start date if provided
    if (startDate) {
        const startDateObj = new Date(startDate);
        if (transaction.transaction_date < startDateObj) {
            return false;
        }
    }
    // Filter by end date if provided
    if (endDate) {
        const endDateObj = new Date(endDate);
        // Set to end of day to include the entire end date
        endDateObj.setHours(23, 59, 59, 999);
        if (transaction.transaction_date > endDateObj) {
            return false;
        }
    }
    return true
    })


  const getCategoryBadge = (category: string) => {
    const categoryColors: Record<string, string> = {
      Sales: "bg-green-50",
      Supplies: "bg-blue-50",
      Equipment: "bg-amber-50",
      Feed: "bg-purple-50",
      Fertilizer: "bg-emerald-50",
      Labor: "bg-red-50",
      Utilities: "bg-indigo-50",
    }

    return (
      <Badge variant="outline" className={categoryColors[category] || "bg-gray-50"}>
        {category}
      </Badge>
    )
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Associated With</TableHead>
            <TableHead>Payment Method</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredTransactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{format(transaction.transaction_date, "PPP")}</TableCell>
              <TableCell className="font-medium">{transaction.description}</TableCell>
              <TableCell>{getCategoryBadge(transaction.category)}</TableCell>
              <TableCell>{transaction.associated_with}</TableCell>
              <TableCell>{transaction.payment_method}</TableCell>
              <TableCell className={transaction.transaction_type === "income" ? "text-green-600" : "text-red-600"}>
                {transaction.transaction_type === "income" ? "+" : "-"} {formatCurrency(Number(transaction.amount))}
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem asChild>
                      <Link href={`/dashboard/finances/${transaction.id}`}>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/dashboard/finances/${transaction.id}/edit`}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Transaction
                      </Link>
                    </DropdownMenuItem>
                    {transaction.receipt_url && (
                      <DropdownMenuItem>
                        <Download className="mr-2 h-4 w-4" />
                        Download Receipt
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      <Trash className="mr-2 h-4 w-4" />
                      Delete Transaction
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
