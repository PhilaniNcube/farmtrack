"use client"

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts"

interface FinancialSummaryProps {
  data: {
    month: string
    income: number
    expenses: number
    profit: number
  }[]
}

export function FinancialSummary({ data }: FinancialSummaryProps) {
  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[350px] text-muted-foreground">
        <p>No financial data available</p>
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip formatter={(value) => [`$${value}`, ""]} />
        <Legend />
        <Line type="monotone" dataKey="income" stroke="#4ade80" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="expenses" stroke="#f87171" />
        <Line type="monotone" dataKey="profit" stroke="#60a5fa" />
      </LineChart>
    </ResponsiveContainer>
  )
}

