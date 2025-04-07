"use client"

import { useActionState, useEffect, useState } from "react"
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
import { updateCrop } from "@/app/actions/crops"
import { toast } from "@/components/ui/use-toast"
import { FieldLocation, Crop } from "@/lib/schema"

interface EditCropProps {
  crop: Crop;
  fields: FieldLocation[];
}

export function EditCrop({ crop, fields }: EditCropProps) {
  const router = useRouter()
  const [state, formAction, isPending] = useActionState(updateCrop, null)

  // Convert string dates to Date objects for the form
  const [plantingDate, setPlantingDate] = useState<Date | undefined>(
    crop.planting_date ? new Date(crop.planting_date) : undefined
  )
  
  const [harvestDate, setHarvestDate] = useState<Date | undefined>(
    crop.expected_harvest_date ? new Date(crop.expected_harvest_date) : undefined
  )

  useEffect(() => {
    if (state) {
      if (state.error) {
        toast({
          title: "Error",
          description: state.error,
          variant: "destructive",
        })
      } else if (state.crop) {
        toast({
          title: "Success",
          description: "Crop updated successfully",       
        })
        router.refresh()
      }
    }
  }, [state, router])

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Edit Crop</CardTitle>
        <CardDescription>Update the details for {crop.name}</CardDescription>
      </CardHeader>
      <form action={formAction}>
        <Input type="hidden" name="id" value={crop.id} />
        <Input type="hidden" name="team_id" value={crop.team_id} />
        <Input type="hidden" name="created_at" value={crop.created_at ? new Date(crop.created_at).toISOString() : new Date().toISOString()} />
        <Input type="hidden" name="updated_at" value={new Date().toISOString()} />
        
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Crop Name</Label>
              <Input id="name" name="name" defaultValue={crop.name} placeholder="e.g., Tomatoes" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="variety">Variety</Label>
              <Input id="variety" name="variety" defaultValue={crop.variety} placeholder="e.g., Roma" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Select name="location" defaultValue={crop.location}>
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
                <Input id="area" name="area" type="number" step="0.01" min="0" defaultValue={crop.area} placeholder="0.5" />
                <Select name="area_unit" defaultValue={crop.area_unit}>
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
                defaultValue={plantingDate ? format(plantingDate, "yyyy-MM-dd") : ""}
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
                defaultValue={harvestDate ? format(harvestDate, "yyyy-MM-dd") : ""}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select name="status" defaultValue={crop.status}>
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
            <Textarea id="notes" name="notes" defaultValue={crop.notes || ""} placeholder="Add any additional information about this crop..." />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" type="button" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button className="bg-green-600 hover:bg-green-700" type="submit" disabled={isPending}>
            {isPending ? "Saving..." : "Update Crop"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}