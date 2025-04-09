import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { DollarSign, Calendar, Tag, CreditCard } from "lucide-react"
import { Finance } from "@/lib/schema"
import { format } from "date-fns"

interface TransactionDetailsProps {
  transaction: Finance
}

export function TransactionDetails({ transaction }: TransactionDetailsProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Transaction Details</CardTitle>
          <CardDescription>Information about this financial transaction</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-1">
            <div className="flex items-center text-sm">
              <DollarSign className="mr-2 h-4 w-4 text-blue-500" />
              <span className="font-medium">Amount</span>
            </div>
            <p
              className={`text-2xl font-bold pl-6 ${transaction.transaction_type === "income" ? "text-green-600" : "text-red-600"}`}
            >
              {transaction.transaction_type === "income" ? "+" : "-"} {formatCurrency(Number(transaction.amount))}
            </p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center text-sm">
              <Calendar className="mr-2 h-4 w-4 text-amber-500" />
              <span className="font-medium">Date</span>
            </div>
            <p className="text-sm pl-6">{format(transaction.transaction_date, "PPP")}</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center text-sm">
              <Tag className="mr-2 h-4 w-4 text-green-500" />
              <span className="font-medium">Category</span>
            </div>
            <p className="text-sm pl-6">{transaction.category}</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center text-sm">
              <CreditCard className="mr-2 h-4 w-4 text-purple-500" />
              <span className="font-medium">Payment Method</span>
            </div>
            <p className="text-sm pl-6">{transaction.payment_method}</p>
          </div>

          <Separator />

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Associated With</h3>
            <p className="text-sm">{transaction.associated_with}</p>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Transaction Type</h3>
            <Badge variant={transaction.transaction_type === "income" ? "default" : "destructive"}>
              {transaction.transaction_type === "income" ? "Income" : "Expense"}
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notes & Additional Information</CardTitle>
          <CardDescription>Details and observations about this transaction</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Description</h3>
            <p className="text-sm">{transaction.description}</p>
          </div>

          <Separator />

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Notes</h3>
            
          </div>

          <Separator />

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Metadata</h3>
            <div className="text-xs text-muted-foreground">
              <p>Created: {format(transaction.created_at, "PPP")}</p>
              <p>Last Updated: {format(transaction.updated_at, "PPP")}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
