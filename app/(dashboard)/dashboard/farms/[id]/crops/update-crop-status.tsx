"use client";
import { updateCropStatus } from "@/app/actions/crops";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { CircleDashed } from "lucide-react";
import {  useActionState } from "react";

import React from 'react'

const UpdateCropStatus = ({ cropId, status }: { cropId: number, status: string }) => {

  const [state, formAction, isPending] = useActionState(async (prev:unknown, formData:FormData) => {
    const status = formData.get("status") as string
    console.log("Status: ", status)
    // Call your update crop status function here
    updateCropStatus(cropId, status)
  }, null)


  return (
    <Dialog>
      <DialogTrigger asChild>
        <Badge className={cn("capitalize",
          status === "planned" ? "bg-indigo-800 text-white" :
            status === "planted" ? "bg-stone-800 text-white" :
              status === "growing" ? "bg-yellow-700 text-white" :
                status === "harvesting" ? "bg-green-600 text-white" :
                  status === "harvested" ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
        )} >
          {status === "planned" ? "Planned" :
            status === "planted" ? "Planted" :
              status === "growing" ? "Growing" :
                status === "harvesting" ? "Ready to Harvest" :
                  status === "harvested" ? "Harvested" : "Unknown"
          }
        </Badge>
      </DialogTrigger>
      <DialogContent>
        <div className="space-y-4">
          <DialogTitle className="text-lg font-semibold">Update Crop Status</DialogTitle>
          <p>Are you sure you want to update the status of this crop?</p>
          <form action={formAction} className="">
            <input type="hidden" name="crop_id" value={cropId} />
            <div className="space-y-2 mb-4">
              <Label htmlFor="status">Status</Label>
              <Select name="status" defaultValue={status}>
                <SelectTrigger name="status" id="status">
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
            <Button type="submit" disabled={isPending} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md">
              {isPending ? <CircleDashed className="animate-spin" /> : "Update Status"}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default UpdateCropStatus