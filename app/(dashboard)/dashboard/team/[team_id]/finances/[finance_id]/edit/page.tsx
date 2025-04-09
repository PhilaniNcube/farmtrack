import { getFinanceById } from '@/lib/queries/finances'
import React from 'react'
import { EditTransactionForm } from './_components/edit-transaction-form'
import { notFound } from 'next/navigation'

const EditTransaction = async ({params}:{params:Promise<{finance_id:string; team_id:string}>}) => {
    const { finance_id, team_id } = await params

    // Fetch the transaction data using the finance_id
    const transaction = await getFinanceById(parseInt(finance_id))
    
    if (!transaction) {
      return notFound()
    }

    return (
      <div className="container mx-auto p-6">
        <EditTransactionForm transaction={transaction} teamId={team_id} />
      </div>
    )
}

export default EditTransaction