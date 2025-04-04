"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { toast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import { Livestock, LivestockSchema } from "@/lib/schema/livestock"
import { updateLivestock } from "@/app/actions/livestock"
import { formatDate } from "date-fns"

interface EditLivestockFormProps {
  livestock: Livestock
  team_id: string
}

export default function EditLivestockForm({ livestock, team_id }: EditLivestockFormProps) {
  const router = useRouter()
  const [isPending, setIsPending] = useState(false)
  const [date, setDate] = useState<Date | undefined>(new Date(livestock.acquisition_date))

  const healthStatusOptions = [
    "Healthy", 
    "Sick", 
    "Injured", 
    "Pregnant", 
    "Recovering", 
    "Quarantined"
  ]

  const purposeOptions = [
    "Dairy",
    "Meat",
    "Breeding",
    "Wool/Fiber",
    "Draft/Labor",
    "Companionship",
    "Show/Exhibition",
    "Research",
    "Conservation",
    "Other"
  ]

  const form = useForm({
    resolver: zodResolver(LivestockSchema),
    defaultValues: {
      id: livestock.id.toString(),
      type: livestock.type,
      breed: livestock.breed,
      count: livestock.count,
      acquisition_date: formatDate(livestock.acquisition_date, "yyyy-MM-dd"),
      source: livestock.source || "",
      location: livestock.location,
      health_status: livestock.health_status,
      purpose: livestock.purpose || "",
      notes: livestock.notes || "",
      team_id: team_id,
    },
  })

  const onSubmit = async (data: any) => {
    setIsPending(true)
    
    try {
      const formData = new FormData()
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value as string)
      })
      
      const result = await updateLivestock(null, formData)
      
      if (result.error) {
        toast({
          title: "Error",
          description: "Failed to update livestock data.",
          variant: "destructive",
        })
      } else {
        toast({
          title: "Success",
          description: "Livestock data updated successfully.",
        })
        router.push(`/dashboard/team/${team_id}/livestock`)
        router.refresh()
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      })
    } finally {
      setIsPending(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Cattle, Poultry" {...field} />
                  </FormControl>
                  <FormDescription>
                    The type of livestock
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="breed"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Breed</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Angus, Leghorn" {...field} />
                  </FormControl>
                  <FormDescription>
                    The breed of this livestock
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="count"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Count</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value))} />
                  </FormControl>
                  <FormDescription>
                    Number of animals in this group
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="acquisition_date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Acquisition Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            formatDate(field.value, "MMMM dd, yyyy")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={new Date(field.value)}
                        onSelect={(date) => {
                          setDate(date)
                          field.onChange(date ? formatDate(date, "yyyy-MM-dd") : "")
                        }}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    When this livestock was acquired
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., North Pasture, Barn 2" {...field} />
                  </FormControl>
                  <FormDescription>
                    Where this livestock is located
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="health_status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Health Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select health status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {healthStatusOptions.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Current health condition
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="source"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Source</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Smith's Farm, Auction" {...field} />
                  </FormControl>
                  <FormDescription>
                    Where this livestock was acquired from
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="purpose"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Purpose</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value || undefined}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select purpose" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {purposeOptions.map((purpose) => (
                        <SelectItem key={purpose} value={purpose}>
                          {purpose}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    The primary purpose of this livestock
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Additional information about this livestock..." 
                    className="resize-none h-32"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <input type="hidden" {...form.register("team_id")} />
          <input type="hidden" {...form.register("id")} />
          
          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push(`/dashboard/team/${team_id}/livestock`)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Updating..." : "Update Livestock"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}