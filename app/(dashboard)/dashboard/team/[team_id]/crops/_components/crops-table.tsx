"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Eye, Edit, Trash, FileText } from "lucide-react"
import Link from "next/link"
import { Crop } from "@/lib/schema"
import { differenceInCalendarDays, format } from "date-fns"
import { cn } from "@/lib/utils"

export function CropsTable({crops}:{crops:Crop[]}) {
  // In a real app, these would be fetched from your database


  const getStatusBadge = (status: string) => {
    switch (status) {
      case "growing":
        return <Badge variant="secondary">Growing</Badge>
      case "ready":
        return <Badge variant="default">Ready for Harvest</Badge>
      case "harvested":
        return <Badge variant="outline">Harvested</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const calculateDaysRemaining = (harvestDate: string) => {
   
   return differenceInCalendarDays(new Date(harvestDate), new Date())

  }


  // Function to calculate progress percentage based on todays date, planting date and harvest date
  const calculateProgress = (plantingDate: Date, harvestDate: Date) => {
    const totalDays = differenceInCalendarDays(harvestDate, plantingDate)
    const daysPassed = differenceInCalendarDays(new Date(), plantingDate)
    return Math.min(Math.max((daysPassed / totalDays) * 100, 0), 100)
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Crop</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Area</TableHead>
            <TableHead>Planting Date</TableHead>
            <TableHead>Harvest Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Progress</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {crops.map((crop) => (
            <TableRow key={crop.id}>
              <TableCell className="font-medium">
                <div>
                  <div>{crop.name}</div>
                  <div className="text-xs text-muted-foreground">{crop.variety}</div>
                </div>
              </TableCell>
              <TableCell>{crop.location}</TableCell>
              <TableCell>
                {crop.area} {crop.area_unit}
              </TableCell>
              <TableCell>{format(crop.planting_date, "PPP")}</TableCell>
              <TableCell>
                <div>
                  {format(crop.expected_harvest_date, "PPP")}
                  <div className="text-xs text-muted-foreground">
                    {calculateDaysRemaining(crop.expected_harvest_date.toDateString())} days remaining
                  </div>
                </div>
              </TableCell>
              <TableCell>{getStatusBadge(crop.status)}</TableCell>
              <TableCell>
                <div className="w-[100px]">
                  <Progress
                    value={calculateProgress(crop.planting_date, crop.expected_harvest_date)}
                    className={cn("h-2",
                   
                     )}
                    aria-label="Crop progress"
                    aria-valuenow={calculateProgress(crop.planting_date, crop.expected_harvest_date)}                    
                  />
                   </div>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem asChild>
                      <Link href={`/dashboard/team/${crop.team_id}/crops/${crop.id}`}>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/dashboard/team/${crop.team_id}/crops/${crop.id}/edit`}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Crop
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/dashboard/team/${crop.team_id}/crops/${crop.id}/activities`}>
                        <FileText className="mr-2 h-4 w-4" />
                        View Activities
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      <Trash className="mr-2 h-4 w-4" />
                      Delete Crop
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

