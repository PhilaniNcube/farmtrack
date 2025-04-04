import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const FinancesPage = async ({params}:{params:Promise<{team_id:string}>}) => {

  const { team_id } = await params

  return (
    <div className='p-6'>
    <section className="flex items-center justify-between">
      <div className='flex items-center justify-between w-full'>
        <h1 className='text-2xl font-bold'>Finances</h1>
        <div className="flex items-centre gap-3">
          <Link href={`/dashboard/team/${team_id}/finances/add?type=income`} className="w-full">
            <Button variant="outline"  className="bg-green-300">
              Add Income
            </Button>
          </Link>

          <Link href={`/dashboard/team/${team_id}/finances/add?type=expense`} className="w-full">
            <Button variant="outline" className="bg-slate-100">
              Add Expense
            </Button>
          </Link>
        </div>
      </div>
     
    </section>
  </div>
  )
}

export default FinancesPage