import { AddFinanceForm } from '@/components/add-finance-form'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Plus } from 'lucide-react'
import React from 'react'

const AddFinancialTransactionDialog = () => {
  return (
    <Dialog>
        <DialogTrigger asChild>
            <Button className="ml-auto gap-1" size="sm">
                <Plus className="h-4 w-4" />
                Add Transaction
            </Button>
        </DialogTrigger>
        <DialogContent>
            <DialogTitle className='sr-only'>Add Financial Transaction</DialogTitle>
            <AddFinanceForm />
        </DialogContent>
    </Dialog>
  )
}

export default AddFinancialTransactionDialog