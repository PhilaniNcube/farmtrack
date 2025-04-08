"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Eye, Edit, Trash, CheckCircle, Search, X } from "lucide-react"
import Link from "next/link"
import { ActivityType, CropActivity } from "@/lib/schema"
import { format, isAfter, isBefore, isEqual } from "date-fns"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"

interface ActivitiesListProps {
  activities: CropActivity[]
}

export function ActivitiesList({ activities }: ActivitiesListProps) {
  // Filter states
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState<string | undefined>(undefined)
  const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined)
  const [startDate, setStartDate] = useState<Date | undefined>(undefined)
  const [endDate, setEndDate] = useState<Date | undefined>(undefined)

  // Apply filters to activities
  const filteredActivities = activities.filter((activity) => {
    // Text search filter (name and description)
    if (searchQuery && 
      !activity.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
      !activity.description?.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }
    
    // date range filter
    if (startDate && endDate) {
        if (
            isBefore(activity.scheduled_date, startDate) ||
            isAfter(activity.scheduled_date, endDate) ||
            isEqual(activity.scheduled_date, startDate) ||
            isEqual(activity.scheduled_date, endDate)
        ) {
            return false
        }
        }


  
    return true
  })

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery("")
    setTypeFilter(undefined)
    setStatusFilter(undefined)
    setStartDate(undefined)
    setEndDate(undefined)
  }

  const getStatusBadge = (status: any) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline">Pending</Badge>
      case "in-progress":
        return <Badge variant="secondary">In Progress</Badge>
      case "completed":
        return <Badge variant="default">Completed</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getTypeBadge = (type: ActivityType) => {
    switch (type) {
      case "planting":
        return (
          <Badge variant="outline" className="bg-green-50">
            Planting
          </Badge>
        )
      case "harvesting":
        return (
          <Badge variant="outline" className="bg-amber-50">
            Harvesting
          </Badge>
        )
      case "fertilizing":
        return (
          <Badge variant="outline" className="bg-emerald-50">
            Fertilizing
          </Badge>
        )
      case "irrigating":
        return (
          <Badge variant="outline" className="bg-blue-50">
            Irrigating
          </Badge>
        )
      case "weeding":
        return (
          <Badge variant="outline" className="bg-purple-50">
            Weeding
          </Badge>
        )
      case "pesticide_application":
        return (
          <Badge variant="outline" className="bg-red-50">
            Pesticide
          </Badge>
        )
      default:
        return <Badge variant="outline">Other</Badge>
    }
  }

  return (
    <div className="space-y-4">
      {/* Filter controls */}
      <div className="rounded-md border p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Filter Activities</h3>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={resetFilters}
            className="h-8 px-2 lg:px-3"
          >
            Reset <X className="ml-2 h-4 w-4" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          {/* Search input */}
          <div className="space-y-2">
            <Label htmlFor="search">Search</Label>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="search"
                placeholder="Search activities..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
      
          
          {/* Date range filter */}
          <div className="space-y-2">
            <Label>Date Range</Label>
            <div className="flex space-x-2">
              {/* Start date */}
              <div className="flex-1">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !startDate && "text-muted-foreground"
                      )}
                    >
                      {startDate ? format(startDate, "PP") : "From"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              {/* End date */}
              <div className="flex-1">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !endDate && "text-muted-foreground"
                      )}
                    >
                      {endDate ? format(endDate, "PP") : "To"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="end">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Results summary */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredActivities.length} of {activities.length} activities
      </div>
      
      {/* Activities table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Activity</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Scheduled Date</TableHead>
              <TableHead>Completed Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredActivities.length > 0 ? (
              filteredActivities.map((activity) => (
                <TableRow key={activity.id}>
                  <TableCell className="font-medium">
                    <div>
                      <div>{activity.name}</div>
                      <div className="text-xs text-muted-foreground">{activity.description}</div>
                    </div>
                  </TableCell>
                  <TableCell>{getTypeBadge(activity.type!)}</TableCell>
                  <TableCell>{format(activity.scheduled_date, "PPP")}</TableCell>
                  <TableCell>
                    {activity.completed_date ? format(activity.completed_date, "PPP") : "-"}
                  </TableCell>
                  <TableCell>{getStatusBadge(activity.status)}</TableCell>
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
                        
                        {activity.status !== "completed" && (
                          <DropdownMenuItem>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Mark as Completed
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Trash className="mr-2 h-4 w-4" />
                          Delete Activity
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No activities match your filters
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
