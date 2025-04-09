"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Finance } from "@/lib/schema"
import { useState } from "react"

export function CategoryBreakdown({finances}:{finances:Finance[]}) {

  // group the finances by category and transaction type
  const groupedFinances = finances.reduce((acc: Record<string, Record<string, number>>, finance) => {
     
    const { category, transaction_type, amount } = finance
    if (!acc[transaction_type]) {
      acc[transaction_type] = {}
    }
    if (!acc[transaction_type][category]) {
      acc[transaction_type][category] = 0
    }
    acc[transaction_type][category] += Number(amount)
    return acc
  }, {} as Record<string, Record<string, number>>)
  console.log(groupedFinances)
 
  // Convert the groupedFinances object into arrays for rendering
  const formattedData = {
    income: Object.entries(groupedFinances.income || {}).map(([category, amount]) => ({
      category,
      amount
    })),
    expenses: Object.entries(groupedFinances.expense || {}).map(([category, amount]) => ({
      category,
      amount
    }))
  }

  // Fallback to empty arrays if no data
  if (formattedData.income.length === 0) {
    formattedData.income = []
  }
  
  if (formattedData.expenses.length === 0) {
    formattedData.expenses = []
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount)
  }
  const calculatePercentage = (amount: number, total: number) => {
    if (total === 0) return "0%";
    return ((amount / total) * 100).toFixed(1) + "%"
  }

  const totalIncome = formattedData.income.reduce((sum, item) => sum + item.amount, 0)
  const totalExpenses = formattedData.expenses.reduce((sum, item) => sum + item.amount, 0)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Category Breakdown</CardTitle>
          <CardDescription>See where your money is coming from and going to</CardDescription>
        </div>
       
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="expenses">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="income">Income</TabsTrigger>
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
          </TabsList>          <TabsContent value="income" className="mt-4">
            <div className="space-y-4">
              {formattedData.income.map((item, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{item.category}</span>
                    <span className="text-sm font-medium">{formatCurrency(item.amount)}</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div
                      className="h-2 rounded-full bg-green-500"
                      style={{ width: calculatePercentage(item.amount, totalIncome) }}
                    />
                  </div>
                  <div className="text-xs text-muted-foreground text-right">
                    {calculatePercentage(item.amount, totalIncome)}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="expenses" className="mt-4">
            <div className="space-y-4">
              {formattedData.expenses.map((item, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{item.category}</span>
                    <span className="text-sm font-medium">{formatCurrency(item.amount)}</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div
                      className="h-2 rounded-full bg-red-500"
                      style={{ width: calculatePercentage(item.amount, totalExpenses) }}
                    />
                  </div>
                  <div className="text-xs text-muted-foreground text-right">
                    {calculatePercentage(item.amount, totalExpenses)}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
