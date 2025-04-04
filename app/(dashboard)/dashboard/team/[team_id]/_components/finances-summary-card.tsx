import { Finance } from '@/lib/schema'
import React, { useMemo } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowDownIcon, ArrowUpIcon, DollarSign, TrendingDown, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

const FinancesSummaryCard = ({finances}:{finances:Finance[]}) => {
  // Calculate financial summaries
  const summaries = useMemo(() => {
    // Calculate total income
    const totalIncome = finances
      .filter(f => f.transaction_type === 'income')
      .reduce((sum, item) => sum + Number(item.amount), 0);
    
    // Calculate total expenses  
    const totalExpenses = finances
      .filter(f => f.transaction_type === 'expense')
      .reduce((sum, item) => sum + Number(item.amount), 0);
    
    // Calculate net profit
    const netProfit = totalIncome - totalExpenses;
    
    // Calculate profit margin (as a percentage)
    const profitMargin = totalIncome > 0 
      ? (netProfit / totalIncome) * 100 
      : 0;
    
    // Format the profit margin as a percentage with 2 decimal places
    const formattedProfitMargin = new Intl.NumberFormat('en-US', {
      style: 'percent',
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(profitMargin / 100);

    // Get top 3 expense categories
    const expenseCategories = finances
      .filter(f => f.transaction_type === 'expense')
      .reduce((acc, item) => {
        const category = item.category;
        if (!acc[category]) {
          acc[category] = 0;
        }
        acc[category] += Number(item.amount);
        return acc;
      }, {} as Record<string, number>);
    
    // Sort categories by amount and get top 3
    const topExpenses = Object.entries(expenseCategories)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3);
    
    return {
      totalIncome,
      totalExpenses,
      netProfit,
      profitMargin: formattedProfitMargin,
      isProfitable: netProfit > 0,
      topExpenses
    };
  }, [finances]);

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  if (!finances || finances.length === 0) {
    return (
      <Card className='flex flex-col justify-between'>
        <CardHeader>
          <CardTitle>Financial Summary</CardTitle>
          <CardDescription>No financial data available</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center items-center p-6">
          <p className="text-muted-foreground">Add some income and expenses to see your financial summary</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className='flex flex-col justify-between'>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-green-600" />
          Financial Summary
        </CardTitle>
        <CardDescription>Overview of your financial performance for this quarter</CardDescription>
      </CardHeader>
      <CardContent className='flex-1 shrink'>
        {/* Income and Expenses */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-sm text-muted-foreground">Total Income</span>
            <div className="flex items-center">
              <ArrowUpIcon className="mr-2 h-4 w-4 text-green-500" />
              <span className="text-xl font-semibold">{formatCurrency(summaries.totalIncome)}</span>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm text-muted-foreground">Total Expenses</span>
            <div className="flex items-center">
              <ArrowDownIcon className="mr-2 h-4 w-4 text-red-500" />
              <span className="text-xl font-semibold">{formatCurrency(summaries.totalExpenses)}</span>
            </div>
          </div>
        </div>
        
        {/* Net Profit and Margin */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-sm text-muted-foreground">Net Profit</span>
            <div className="flex items-center">
              {summaries.isProfitable ? (
                <TrendingUp className="mr-2 h-4 w-4 text-green-500" />
              ) : (
                <TrendingDown className="mr-2 h-4 w-4 text-red-500" />
              )}
              <span className={cn(
                "text-xl font-semibold", 
                summaries.isProfitable ? "text-green-600" : "text-red-600"
              )}>
                {formatCurrency(summaries.netProfit)}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm text-muted-foreground">Profit Margin</span>
            <div className="flex items-center">
              <Badge variant={summaries.isProfitable ? "default" : "destructive"} className="text-xs">
                {summaries.profitMargin}
              </Badge>
            </div>
          </div>
        </div>

        {/* Top Expenses */}
        {summaries.topExpenses.length > 0 && (
          <div className="pt-2">
            <h4 className="text-sm font-medium mb-2">Top Expense Categories</h4>
            <div className="space-y-2">
              {summaries.topExpenses.map(([category, amount]) => (
                <div key={category} className="flex justify-between items-center">
                  <span className="text-sm capitalize">{category}</span>
                  <span className="text-sm font-medium">{formatCurrency(amount)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      
      <Separator />
      
      <CardFooter className="py-3">
        <Link href={`/dashboard/team/${finances[0]?.team_id}/finances`} className="w-full">
          <Button variant="outline" className="w-full bg-slate-100">
            View All Finances
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

export default FinancesSummaryCard