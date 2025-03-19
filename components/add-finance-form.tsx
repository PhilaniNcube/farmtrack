"use client"

import type React from "react"

import { useState } from "react"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { useRouter } from "next/navigation"

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
import { createActivity } from "@/app/actions/activities"

export function AddFinanceForm() {
  const router = useRouter()
  const [date, setDate] = useState<Date>(new Date())
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [type, setType] = useState<"income" | "expense">("income")

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(event.currentTarget)

    try {
      const result = await createFinance(formData)

      if (result.finance) {
        // Create activity record
        await createActivity(
          formData.get("transaction_date") as string,
          type,
          formData.get("description") as string,
          "finances",
          result.finance.id,
        )

        router.refresh()
        // Reset form or close modal
      }
    } catch (error) {
      console.error("Error creating finance record:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New {type === "income" ? "Income" : "Expense"}</CardTitle>
        <CardDescription>Record a new financial transaction.</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="type">Transaction Type</Label>
            <Select name="type" defaultValue={type} onValueChange={(value) => setType(value as "income" | "expense")}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="income">Income</SelectItem>
                <SelectItem value="expense">Expense</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="transaction_date">Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Select date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(date) => {
                    setDate(date || new Date())
                    const input = document.querySelector('input[name="transaction_date"]') as HTMLInputElement
                    if (input && date) {
                      input.value = format(date, "yyyy-MM-dd")
                    }
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <input type="hidden" name="transaction_date" value={format(date, "yyyy-MM-dd")} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input id="description" name="description" required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select name="category" defaultValue={type === "income" ? "sales" : "supplies"}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {type === "income" ? (
                    <>
                      <SelectItem value="sales">Crop Sales</SelectItem>
                      <SelectItem value="livestock_products">Livestock Products</SelectItem>
                      <SelectItem value="subsidies">Subsidies</SelectItem>
                      <SelectItem value="other_income">Other Income</SelectItem>
                    </>
                  ) : (
                    <>
                      <SelectItem value="supplies">Supplies</SelectItem>
                      <SelectItem value="seeds">Seeds</SelectItem>
                      <SelectItem value="fertilizer">Fertilizer</SelectItem>
                      <SelectItem value="feed">Animal Feed</SelectItem>
                      <SelectItem value="equipment">Equipment</SelectItem>
                      <SelectItem value="fuel">Fuel</SelectItem>
                      <SelectItem value="labor">Labor</SelectItem>
                      <SelectItem value="utilities">Utilities</SelectItem>
                      <SelectItem value="other_expense">Other Expense</SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                <Input id="amount" name="amount" type="number" step="0.01" min="0" className="pl-7" required />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="payment_method">Payment Method</Label>
              <Select name="payment_method" defaultValue="cash">
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
            </div>

            <div className="space-y-2">
              <Label htmlFor="reference_number">Reference Number</Label>
              <Input id="reference_number" name="reference_number" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea id="notes" name="notes" placeholder="Add any additional information..." />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" type="button" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button
            type="submit"
            className={type === "income" ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : `Save ${type === "income" ? "Income" : "Expense"}`}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

