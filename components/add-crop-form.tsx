"use client"

import type React from "react"

import { use, useActionState, useEffect, useState } from "react"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { useParams, useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { createCrop } from "@/app/actions/crops"
import { toast } from "./ui/use-toast"
import { FieldLocation } from "@/lib/schema"
import AddFieldDialog from "./add-field-dialog"

export function AddCropForm({fields}: {fields: FieldLocation[]}) {

  const params = useParams()

  const { team_id } = params
  
  console.log("team_id", team_id)





  const router = useRouter()
  const [plantingDate, setPlantingDate] = useState<Date>()
  const [harvestDate, setHarvestDate] = useState<Date>()

  const [state, formAction, isPending] = useActionState(createCrop, null)

  useEffect(() => {

    toast({
      title: state?.error ? "Error" : "Success",
      description: state?.error || "Crop added successfully",
      variant: "default",
    })
    
  }, [state])

  

  return (
    <Card className="w-full max-w-4xl mt-4">
      <CardHeader>
        <CardTitle>Add New Crop</CardTitle>
        <CardDescription>Enter the details for your new crop.</CardDescription>
        <AddFieldDialog />
      </CardHeader>
      <form  action={formAction} >
        <Input type="hidden" name="team_id" value={team_id}/>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Crop Name</Label>
              <Input id="name" name="name" placeholder="e.g., Tomatoes" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="variety">Variety</Label>
              <Input id="variety" name="variety" placeholder="e.g., Roma" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Select name="location">
                <SelectTrigger id="location">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  {fields.length === 0 ? (
                    <SelectItem value="none" disabled>
                      No field locations available
                    </SelectItem>
                  ) : fields.map((field) => (
                    <SelectItem key={field.id} value={String(field.name)}>
                      {field.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="area">Area</Label>
              <div className="flex">
                <Input id="area" name="area" type="number" step="0.01" min="0" placeholder="0.5" />
                <Select name="area_unit" defaultValue="acres">
                  <SelectTrigger className="w-[110px] ml-2">
                    <SelectValue placeholder="Unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="acres">Acres</SelectItem>
                    <SelectItem value="hectares">Hectares</SelectItem>
                    <SelectItem value="sqm">Sq. Meters</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Planting Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !plantingDate && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {plantingDate ? format(plantingDate, "PPP") : <span>Select date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={plantingDate}
                    onSelect={(date) => {
                      setPlantingDate(date)
                      const input = document.querySelector('input[name="planting_date"]') as HTMLInputElement
                      if (input && date) {
                        input.value = format(date, "yyyy-MM-dd")
                      }
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <input
                type="hidden"
                name="planting_date"
                value={plantingDate ? format(plantingDate, "yyyy-MM-dd") : ""}
              />
            </div>
            <div className="space-y-2">
              <Label>Expected Harvest Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !harvestDate && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {harvestDate ? format(harvestDate, "PPP") : <span>Select date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={harvestDate}
                    onSelect={(date) => {
                      setHarvestDate(date)
                      const input = document.querySelector('input[name="expected_harvest_date"]') as HTMLInputElement
                      if (input && date) {
                        input.value = format(date, "yyyy-MM-dd")
                      }
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <input
                type="hidden"
                name="expected_harvest_date"
                value={harvestDate ? format(harvestDate, "yyyy-MM-dd") : ""}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select name="status" defaultValue="planned">
              <SelectTrigger id="status">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="planned">Planned</SelectItem>
                <SelectItem value="planted">Planted</SelectItem>
                <SelectItem value="growing">Growing</SelectItem>
                <SelectItem value="harvesting">Ready to Harvest</SelectItem>
                <SelectItem value="harvested">Harvested</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea id="notes" name="notes" placeholder="Add any additional information about this crop..." />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" type="button" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button className="bg-green-600 hover:bg-green-700" type="submit" disabled={isPending || fields.length === 0}>
            {isPending ? "Saving..." : "Add Crop"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

