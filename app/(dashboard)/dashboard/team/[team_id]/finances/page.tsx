import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import { FinancesHeader } from './_components/finances-header'
import { getFinances, getTotalFinancesLastXDays } from '@/lib/queries/finances'
import { FinancialOverview } from './_components/financial-overview'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { FinancesFilters } from './_components/finance-filters'
import { RecentTransactions } from './_components/recent-transactions'

const FinancesPage = async ({ params }: { params: Promise<{ team_id: string }> }) => {

  const { team_id } = await params

  const financeData = getFinances(team_id)
  const summaryData = getTotalFinancesLastXDays(team_id, new Date(new Date().setDate(new Date().getDate() - 100)), new Date(new Date().setDate(new Date().getDate() + 50)))

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
          <div className='flex items-center justify-center h-full'>
            <p className='text-muted-foreground'>No reports found for this farm.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default FinancesPage