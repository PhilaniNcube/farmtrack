"use client"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useQueryState } from "nuqs"
import {  useState, useTransition } from "react"
import { DateRange } from "react-day-picker"

type PageProps = {
    summary: {
        total_income: number,
        total_expenses: number,
        net_profit: number,
        profit_margin: string
    }

}


export function IncomeVsExpenses({ summary }: PageProps) {

    const router = useRouter()
    const [ isPending,startTransition] = useTransition()


    const [timeframe, setTimeframe] = useState("year")
    const [date, setDate] = useState<DateRange | undefined>()
    const [startDate, setStartDate] = useQueryState("start_date")
    const [endDate, setEndDate] = useQueryState("end_date")

    const handleDateChange = (range: DateRange | undefined) => {
        setDate(range)
        if (range?.from) {
            setStartDate(format(range.from, "yyyy-MM-dd"))
        } else {
            setStartDate(null)
        }
        if (range?.to) {
            setEndDate(format(range.to, "yyyy-MM-dd"))
        } else {
            setEndDate(null)
        }
    }


    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
        }).format(amount)
    }



    return (
        <Card className={cn("w-full", isPending && "opacity-50")}>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Income vs Expenses</CardTitle>
                    <CardDescription>Compare your income and expenses over time</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            id="date"
                            variant={"outline"}
                            className={cn(
                                "w-[300px] justify-start text-left font-normal",
                                !date && "text-muted-foreground"
                            )}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date?.from ? (
                                date.to ? (
                                    <>
                                        {format(date.from, "LLL dd, y")} -{" "}
                                        {format(date.to, "LLL dd, y")}
                                    </>
                                ) : (
                                    format(date.from, "LLL dd, y")
                                )
                            ) : (
                                <span>Pick a date</span>
                            )}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar
                            initialFocus
                            mode="range"
                            defaultMonth={date?.from}
                            selected={date}
                            onSelect={handleDateChange}
                            numberOfMonths={2}
                        />
                    </PopoverContent>
                </Popover>
                <Button variant="outline" onClick={() => {
                    startTransition(() => {
                    router.refresh()
                    })
                }}>
                    Search
                </Button>
                </div>
                <Button variant="outline" onClick={() => {
                    setDate(undefined)
                    setStartDate(null)
                    setEndDate(null)
                }}>
                    Clear Filters
                </Button>
            </CardHeader>
            <CardContent>
                <div className="h-[300px] w-full">
                    {/* This is a placeholder for the chart. In a real app, you would use a charting library like Chart.js or Recharts */}
                    <div className="h-full w-full bg-muted/20 rounded-md flex items-center justify-center">
                        <div className="text-center">
                            <p className="text-muted-foreground">Chart visualization would go here</p>
                            <p className="text-sm text-muted-foreground mt-2">Using a library like Chart.js or Recharts</p>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-4">
                    <div className="space-y-1 text-center">
                        <p className="text-sm font-medium text-muted-foreground">Total Income</p>
                        <p className="text-2xl font-bold text-green-600">{formatCurrency(summary.total_income)}</p>
                    </div>
                    <div className="space-y-1 text-center">
                        <p className="text-sm font-medium text-muted-foreground">Total Expenses</p>
                        <p className="text-2xl font-bold text-red-600">{formatCurrency(summary.total_expenses)}</p>
                    </div>
                    <div className="space-y-1 text-center">
                        <p className="text-sm font-medium text-muted-foreground">Net Profit</p>
                        <p className={`text-2xl font-bold ${summary.net_profit >= 0 ? "text-green-600" : "text-red-600"}`}>
                            {formatCurrency(summary.net_profit)}
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
