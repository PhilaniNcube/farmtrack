import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import { FinancesHeader } from './_components/finances-header'
import { getFinances, getTotalFinancesLastXDays } from '@/lib/queries/finances'
import { FinancialOverview } from './_components/financial-overview'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { FinancesFilters } from './_components/finance-filters'
import { RecentTransactions } from './_components/recent-transactions'
import type { SearchParams } from 'nuqs/server'
import { loadSearchParams } from '@/lib/search-params'
import { IncomeVsExpenses } from './_components/income-vs-expenses'


const FinancesPage = async ({ params, searchParams }: { params: Promise<{ team_id: string }>, searchParams:Promise<SearchParams> }) => {


  const { start_date, end_date } = await loadSearchParams(searchParams)



  // check if start_date and end_date are empty strings, if so, convert them to Dates separated by 90 days
  const startDate = start_date ? new Date(start_date) : new Date(new Date().setDate(new Date().getDate() - 90))
  const endDate = end_date ? new Date(end_date) : new Date(new Date().setDate(new Date().getDate() + 90))






  const { team_id } = await params

  const financeData = getFinances(team_id)
  const summaryData = getTotalFinancesLastXDays(team_id, startDate, endDate)

  const [finances, financial_summary] = await Promise.all([
    financeData,
    summaryData,
  ])

  console.log("Finances: ", financial_summary)

  if (!finances) {
    return <div className='p-6'>
      <FinancesHeader team_id={team_id} />
      <div className='flex items-center justify-center h-full'>
        <p className='text-muted-foreground'>No finances found for this farm.</p>
      </div>
    </div>
  }

  return (
    <div className='p-6'>
      <FinancesHeader team_id={team_id} />
      <FinancialOverview finances={finances} />
      <Tabs defaultValue="transactions" className="mt-6">
        <TabsList>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="transactions" className="space-y-4">
          <FinancesFilters />
          <RecentTransactions transactions={finances} />
        </TabsContent>
        <TabsContent value="reports" className="space-y-4">
          <IncomeVsExpenses summary={{
            total_income: financial_summary.totalIncome,
            total_expenses: financial_summary.totalExpenses,
            net_profit: financial_summary.net_profit,
            profit_margin: financial_summary.profit_margin
          }} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default FinancesPage