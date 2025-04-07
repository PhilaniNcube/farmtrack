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
    const today = new Date()
    const harvest = new Date(harvestDate)
    const diffTime = harvest.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
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
              <TableCell>{new Date(crop.planting_date).toLocaleDateString()}</TableCell>
              <TableCell>
                <div>
                  {new Date(crop.expected_harvest_date).toLocaleDateString()}
                  <div className="text-xs text-muted-foreground">
                    {calculateDaysRemaining(crop.expected_harvest_date.toDateString())} days remaining
                  </div>
                </div>
              </TableCell>
              <TableCell>{getStatusBadge(crop.status)}</TableCell>
              <TableCell>
                <div className="w-[100px]">
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
                      <Link href={`/dashboard/crops/${crop.id}`}>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/dashboard/crops/${crop.id}/edit`}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Crop
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/dashboard/crops/${crop.id}/activities`}>
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

