import { Card, CardContent } from "@/components/ui/card"
import { Finance } from "@/lib/schema"
import { DollarSign, TrendingUp, TrendingDown, CreditCard } from "lucide-react"

export function FinancialOverview({ finances }: { finances: Finance[] }) {


    // calculate total income, expenses, net balance and pending payments
    const totalIncome = finances.filter((finance) => finance.transaction_type === "income").reduce((acc, finance) => acc + Number(finance.amount), 0)

    const totalExpenses = finances.filter((finance) => finance.transaction_type === "expense").reduce((acc, finance) => acc + Number(finance.amount), 0)

    const netBalance = totalIncome - totalExpenses


    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
        }).format(amount)
    }

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-6">
            <Card>
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Total Income</p>
                            <p className="text-3xl font-bold text-green-600">{formatCurrency(totalIncome)}</p>
                        </div>
                        <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                            <TrendingUp className="h-6 w-6 text-green-600" />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Total Expenses</p>
                            <p className="text-3xl font-bold text-red-600">{formatCurrency(totalExpenses)}</p>
                        </div>
                        <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
                            <TrendingDown className="h-6 w-6 text-red-600" />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Net Balance</p>
                            <p className="text-3xl font-bold">{formatCurrency(netBalance)}</p>
                        </div>
                        <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                            <DollarSign className="h-6 w-6 text-blue-600" />
                        </div>
                    </div>
                </CardContent>
            </Card>


        </div>
    )
}
