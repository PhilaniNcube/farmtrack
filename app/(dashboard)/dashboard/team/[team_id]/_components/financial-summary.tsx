import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Finance } from "@/lib/schema"
import { DollarSign, TrendingUp, TrendingDown, Plus } from "lucide-react"
import AddFinancialTransactionDialog from "./add-finanncial-transaction"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export function FinancialSummary({ finances }: { finances: Finance[] }) {
  // In a real app, these would be fetched from your database

  // calculate the dates for the current quarter
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear()
  const currentMonth = currentDate.getMonth()
  const currentQuarter = Math.floor(currentMonth / 3) + 1
  const startMonth = (currentQuarter - 1) * 3
  const endMonth = currentQuarter * 3 - 1
  const startDate = new Date(currentYear, startMonth, 1)
  const endDate = new Date(currentYear, endMonth + 1, 0) // Last day of the quarter
  const startDateString = startDate.toISOString().split("T")[0]
  const endDateString = endDate.toISOString().split("T")[0]

  const quartelyIncome = finances.reduce((acc, finance) => {
    if (finance.transaction_type === "income") {
      return acc + Number(finance.amount)
    }
    return acc
  }, 0)

  const quartelyExpenses = finances.reduce((acc, finance) => {
    if (finance.transaction_type === "expense") {
      return acc + Number(finance.amount)
    }
    return acc
  }, 0)


  const financialData = {
    monthlyIncome: 12500,
    monthlyExpenses: 8200,
    yearToDateIncome: 87500,
    yearToDateExpenses: 62000,
    recentTransactions: [
      {
        id: 1,
        date: "2023-10-05",
        category: "Sales",
        amount: 3200,
        type: "income",
        description: "Corn sales",
      },
      {
        id: 2,
        date: "2023-10-03",
        category: "Supplies",
        amount: 850,
        type: "expense",
        description: "Fertilizer purchase",
      },
      {
        id: 3,
        date: "2023-10-01",
        category: "Sales",
        amount: 1200,
        type: "income",
        description: "Milk sales",
      },
    ],
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  return (
    <Card className="flex flex-col justify-between h-full">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Financial Summary</CardTitle>
          <CardDescription>Track your farm's financial health this quarter <br />
            <Badge className="bg-cyan-500 ">{startDateString} - {endDateString}</Badge>
          </CardDescription>
        </div>
        <AddFinancialTransactionDialog />
      </CardHeader>
      <CardContent className="flex-1">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Quartely Income</p>
            <div className="flex items-center">
              <DollarSign className="mr-1 h-4 w-4 text-green-500" />
              <span className="text-2xl font-bold">{formatCurrency(quartelyIncome)}</span>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Quartely Expenses</p>
            <div className="flex items-center">
              <DollarSign className="mr-1 h-4 w-4 text-red-500" />
              <span className="text-2xl font-bold">{formatCurrency(quartelyExpenses)}</span>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <p className="mb-2 text-sm font-medium">Recent Transactions</p>
          <div className="space-y-3">
            {finances.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{transaction.description}</p>
                  <p className="text-xs text-muted-foreground">
                    {transaction.category} • {new Date(transaction.transaction_date).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center">
                  {transaction.transaction_type === "income" ? (
                    <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
                  ) : (
                    <TrendingDown className="mr-1 h-4 w-4 text-red-500" />
                  )}
                  <span className={`font-medium ${transaction.transaction_type === "income" ? "text-green-500" : "text-red-500"}`}>
                    {transaction.transaction_type === "income" ? "+" : "-"} {formatCurrency(Number(transaction.amount))}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        {
          finances.length > 0 ? (
            <Link href={`/dashboard/team/${finances[0].team_id}/finances`} className="w-full"><Button variant="outline" className="w-full">
              View All Transactions
            </Button></Link>
          ) : (
            <p className="text-sm text-muted-foreground">No transactions available</p>
          )
        }
      
      </CardFooter>
    </Card>
  )
}

