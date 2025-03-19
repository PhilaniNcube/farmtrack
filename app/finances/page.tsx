import { Suspense } from "react"
import { Filter, MoreHorizontal, DollarSign, TrendingUp, TrendingDown, BarChart3 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { FinancialSummary } from "@/components/financial-summary"
import { Skeleton } from "@/components/ui/skeleton"

import { getFinances, getFinancialSummary } from "@/app/actions/finances"
import { format } from "date-fns"

export default async function FinancesPage() {
  const { finances = [] } = (await getFinances()) || {}
  const financialSummary = await getFinancialSummary()

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 p-4 md:p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold tracking-tight">Financial Management</h1>
          <div className="flex gap-2">
            <Button variant="outline">
              <TrendingDown className="mr-2 h-4 w-4" />
              Record Expense
            </Button>
            <Button className="bg-green-600 hover:bg-green-700">
              <TrendingUp className="mr-2 h-4 w-4" />
              Record Income
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Income</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${financialSummary.totalIncome || "0.00"}</div>
              <p className="text-xs text-muted-foreground">+20.1% from last year</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
              <TrendingDown className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${financialSummary.totalExpenses || "0.00"}</div>
              <p className="text-xs text-muted-foreground">+4.5% from last year</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${financialSummary.netProfit || "0.00"}</div>
              <p className="text-xs text-muted-foreground">+32.5% from last year</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Profit Margin</CardTitle>
              <BarChart3 className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{financialSummary.profitMargin || "0.0"}%</div>
              <p className="text-xs text-muted-foreground">+8.2% from last year</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-7 mb-6">
          <Card className="md:col-span-7">
            <CardHeader>
              <CardTitle>Financial Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<Skeleton className="h-[350px] w-full" />}>
                <FinancialSummary
                  data={(financialSummary.monthlyData || []).map(item => ({
                    month: String(item.month || ''),
                    income: Number(item.income || 0),
                    expenses: Number(item.expenses || 0),
                    profit: Number(item.profit || 0)
                  }))}
                />
              </Suspense>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="transactions" className="mb-6">
          <TabsList>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
            <TabsTrigger value="income">Income</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>
          <TabsContent value="transactions" className="mt-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Input placeholder="Search transactions..." className="max-w-xs" />
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {finances.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                          No transactions found
                        </TableCell>
                      </TableRow>
                    ) : (
                      finances.map((finance) => (
                        <TableRow key={finance.id}>
                          <TableCell>{format(new Date(finance.transaction_date), "MMM d, yyyy")}</TableCell>
                          <TableCell className="font-medium">{finance.description}</TableCell>
                          <TableCell>{finance.category}</TableCell>
                          <TableCell>
                            <Badge
                              className={
                                finance.type === "income"
                                  ? "bg-green-500"
                                  : "text-red-500 border-red-500 bg-transparent"
                              }
                            >
                              {finance.type === "income" ? "Income" : "Expense"}
                            </Badge>
                          </TableCell>
                          <TableCell
                            className={`text-right font-medium ${finance.type === "income" ? "text-green-600" : "text-red-600"}`}
                          >
                            {finance.type === "income" ? "+" : "-"}${finance.amount}
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                <DropdownMenuItem>Edit Transaction</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="expenses" className="mt-4">
            <Card>
              <CardContent className="pt-6">
                <p>Your expense records will appear here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="income" className="mt-4">
            <Card>
              <CardContent className="pt-6">
                <p>Your income records will appear here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="mt-4">
            <Card>
              <CardContent className="pt-6">
                <p>Your financial reports will appear here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

