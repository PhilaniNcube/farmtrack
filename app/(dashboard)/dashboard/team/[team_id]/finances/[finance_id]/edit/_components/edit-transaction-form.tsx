"use client"

import { useState } from "react"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { useRouter } from "next/navigation"
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { Finance, FinanceInsert } from "@/lib/schema"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { updateFinance, deleteFinance } from "@/app/actions/finances"
import { toast } from "sonner"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"



interface EditTransactionFormProps {
    transaction: Finance;
    teamId: string;
}

export function EditTransactionForm({ transaction, teamId }: EditTransactionFormProps) {
    const router = useRouter()
    const [isPending, setIsPending] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        setValue,
        watch
    } = useForm<Finance>({
        defaultValues: {
            id: transaction.id,
            team_id: teamId,
            transaction_type: transaction.transaction_type,
            transaction_date: new Date(transaction.transaction_date),
            description: transaction.description || "",
            category: transaction.category,
            amount: transaction.amount.toString(),
            payment_method: transaction.payment_method || "cash",
            receipt_url: transaction.receipt_url || "",

        }
    })

    const financeType = watch("transaction_type")

    const onSubmit: SubmitHandler<Finance> = async (data) => {
        setIsPending(true)
        try {
            const formData = new FormData()
            Object.entries(data).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    formData.append(key, value.toString())
                }
            })

            const result = await updateFinance(transaction.id, formData)
            if (result.error) {
                toast.error("Failed to update transaction: " + result.error)
            } else {
                toast.success("Transaction updated successfully")
                router.push(`/dashboard/team/${teamId}/finances`)
            }
        } catch (error) {
            console.error("Failed to update transaction:", error)
            toast.error("Failed to update transaction")
        } finally {
            setIsPending(false)
        }
    }

    const handleDelete = async () => {
        setIsDeleting(true)
        try {
            const result = await deleteFinance(transaction.id)
            if (result.error) {
                toast.error("Failed to delete transaction: " + result.error)
            } else {
                toast.success("Transaction deleted successfully")
                router.push(`/dashboard/team/${teamId}/finances`)
            }
        } catch (error) {
            console.error("Failed to delete transaction:", error)
            toast.error("Failed to delete transaction")
        } finally {
            setIsDeleting(false)
        }
    }

    return (
        <Card className="max-w-4xl">
            <CardHeader>
                <CardTitle>Edit {financeType === "income" ? "Income" : "Expense"}</CardTitle>
                <CardDescription>Update transaction details.</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="transaction_type">Transaction Type</Label>
                        <Controller
                            name="transaction_type"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value || undefined}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="income">Income</SelectItem>
                                        <SelectItem value="expense">Expense</SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="transaction_date">Date</Label>
                        <Controller
                            name="transaction_date"
                            control={control}
                            render={({ field }) => (
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={"outline"}
                                            className={cn("w-full justify-start text-left font-normal", !field.value && "text-muted-foreground")}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {field.value ? format(new Date(field.value), "PPP") : <span>Select date</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={field.value ? new Date(field.value) : undefined}
                                            onSelect={(date) => {
                                                if (date) {
                                                    field.onChange(format(date, "yyyy-MM-dd"))
                                                }
                                            }}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            )}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            {...register("description", { required: "Description is required" })}
                            className={errors.description ? "border-red-500" : ""}
                        />
                        {errors.description && <span className="text-sm text-red-500">{errors.description.message}</span>}
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="category">Category</Label>
                            <Controller
                                name="category"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {financeType === "income" ? (
                                                <>
                                                    <SelectItem value="sales">Crop Sales</SelectItem>
                                                    <SelectItem value="livestock_products">Livestock Products</SelectItem>
                                                    <SelectItem value="subsidies">Subsidies</SelectItem>
                                                    <SelectItem value="other_income">Other Income</SelectItem>
                                                </>
                                            ) : (
                                                <>
                                                    <SelectItem value="supplies">Supplies</SelectItem>
                                                    <SelectItem value="chemicals">Chemicals</SelectItem>
                                                    <SelectItem value="seeds">Seeds</SelectItem>
                                                    <SelectItem value="fertilizer">Fertilizer</SelectItem>
                                                    <SelectItem value="feed">Animal Feed</SelectItem>
                                                    <SelectItem value="equipment">Equipment</SelectItem>
                                                    <SelectItem value="fuel">Fuel</SelectItem>
                                                    <SelectItem value="labour">Labour</SelectItem>
                                                    <SelectItem value="utilities">Utilities</SelectItem>
                                                    <SelectItem value="other_expense">Other Expense</SelectItem>
                                                </>
                                            )}
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="amount">Amount</Label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                                <Input
                                    id="amount"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    className={cn("pl-7", errors.amount ? "border-red-500" : "")}
                                    {...register("amount", {
                                        required: "Amount is required",
                                        min: { value: 0, message: "Amount must be positive" }
                                    })}
                                />
                            </div>
                            {errors.amount && <span className="text-sm text-red-500">{errors.amount.message}</span>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="payment_method">Payment Method</Label>
                            <Controller
                                name="payment_method"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value || undefined}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select method" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="cash">Cash</SelectItem>
                                            <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                                            <SelectItem value="check">Check</SelectItem>
                                            <SelectItem value="credit_card">Credit Card</SelectItem>
                                            <SelectItem value="mobile_payment">Mobile Payment</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />

                            <Input
                                id="team_id"
                                type="hidden"
                                className={cn("pl-7", errors.amount ? "border-red-500" : "")}
                                {...register("team_id")}
                            />
                        </div>
                    </div>

                </CardContent>
                <CardFooter className="flex justify-between">
                    <div className="flex space-x-2">
                        <Button variant="outline" type="button" onClick={() => router.push(`/dashboard/team/${teamId}/finances`)}>
                            Cancel
                        </Button>

                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="destructive" type="button">
                                    Delete
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete the transaction.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={handleDelete} disabled={isDeleting}>
                                        {isDeleting ? "Deleting..." : "Delete"}
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>

                    <Button
                        type="submit"
                        className={financeType === "income" ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"}
                        disabled={isPending}>
                        {isPending ? "Saving..." : "Update Transaction"}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    )
}
