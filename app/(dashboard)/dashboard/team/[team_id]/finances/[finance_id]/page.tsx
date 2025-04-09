import { Button } from '@/components/ui/button'
import { getFinanceById } from '@/lib/queries/finances'
import { format } from 'date-fns'
import { ChevronLeft, Download, Edit, Trash } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { TransactionDetails } from '../_components/transaction-details'

const FinancePage = async ({ params }: { params: Promise<{ finance_id: number }> }) => {

    const { finance_id } = await params

    const transactionData = await getFinanceById(finance_id)

    const [transaction] = await Promise.all([
        transactionData
    ])

    if (!transaction) {
        return <div className='p-6'>
            <div className='flex items-center justify-center h-full'>
                <p className='text-muted-foreground'>No transaction found for this finance.</p>
            </div>
        </div>
    }

    return (
        <div className="p-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <Button variant="outline" size="icon" asChild>
                        <Link href={`/dashboard/team/${transaction.team_id}/finances`}>
                            <ChevronLeft className="h-4 w-4" />
                            <span className="sr-only">Back</span>
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">{transaction.description}</h1>
                        <p className="text-muted-foreground">
                            {format(transaction.transaction_date, "PPP")} • {transaction.category}
                        </p>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    {transaction.receipt_url && (
                        <Button variant="outline" asChild>
                            <Link href={transaction.receipt_url}>
                                <Download className="mr-2 h-4 w-4" />
                                Download Receipt
                            </Link>
                        </Button>
                    )}
                    <Button variant="outline" asChild>
                        <Link href={`/dashboard/team/${transaction.team_id}/finances/${transaction.id}/edit`}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                        </Link>
                    </Button>
                    <Button variant="destructive">
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                    </Button>
                </div>
            </div>
            <div className="mt-6">
                <TransactionDetails transaction={transaction} />
            </div>
        </div>
    )
}

export default FinancePage