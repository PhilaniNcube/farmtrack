"use client"

import type React from "react"

import { useState } from "react"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { useForm, Controller, SubmitHandler } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { createFinance } from "@/app/actions/finances"
import { useSelectedFarm } from "@/lib/stores/use-selected-farm"
import { toast } from "sonner"

interface FinanceFormData {
  type: "income" | "expense";
  transaction_date: string;
  description: string;
  category: string;
  amount: string;
  payment_method: string;
  reference_number?: string;
  notes?: string;
  team_id: string;
}

export function AddFinanceForm() {
  const {farmId} = useSelectedFarm()
  const searchParams = useSearchParams()
  const type = searchParams.get("type") as "income" | "expense" || "income"
  const params = useParams()
  const {team_id} = params
  const router = useRouter()
  const [isPending, setIsPending] = useState(false)
  
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue, watch
  } = useForm<FinanceFormData>({
    defaultValues: {
      type: type,
      transaction_date: format(new Date(), "yyyy-MM-dd"),
      category: type === "income" ? "sales" : "supplies",
      payment_method: "cash",
      team_id: team_id as string
    }
  })

  const financeType = watch("type")

  const onSubmit: SubmitHandler<FinanceFormData> = async (data) => {
    setIsPending(true)
    try {
      const formData = new FormData()
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined) {
          formData.append(key, value.toString())
        }
      })
      
      const result = await createFinance(null, formData)
      if (result.error) {
        console.error(result.error)
      } else {
        // toast.success("Finance record added successfully")
        router.push(`/dashboard/team/${team_id}/finances`)
      }
    } catch (error) {
      console.error("Failed to submit form:", error)
    } finally {
      setIsPending(false)
    }
  }

  return (
    <Card className="max-w-4xl">
      <CardHeader>
        <CardTitle>Add New {type === "income" ? "Income" : "Expense"}</CardTitle>
        <CardDescription>Record a new financial transaction.</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" {...register("team_id")} />
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="type">Transaction Type</Label>
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
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
            <Input 
              id="description" 
              {...register("description", { required: "Description is required" })} 
              className={errors.description ? "border-red-500" : ""} 
            />
            {errors.description && <span className="text-sm text-red-500">{errors.description.message}</span>}
          </div>

          <div className="grid grid-cols-2 gap-4">
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
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="payment_method">Payment Method</Label>
              <Controller
                name="payment_method"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
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
            </div>

            <div className="space-y-2">
              <Label htmlFor="reference_number">Reference Number</Label>
              <Input id="reference_number" {...register("reference_number")} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea id="notes" {...register("notes")} placeholder="Add any additional information..." />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" type="button" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button
            type="submit"
            className={type === "income" ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"}
            disabled={isPending}>
            {isPending ? "Saving..." : `Save ${type === "income" ? "Income" : "Expense"}`}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

