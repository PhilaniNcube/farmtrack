"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, SlidersHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"

export function CropsFilters() {
  const [showFilters, setShowFilters] = useState(false)

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex-1 flex items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search crops..." className="pl-8" />
          </div>
          <Button variant="outline" size="icon" onClick={() => setShowFilters(!showFilters)}>
            <SlidersHorizontal className="h-4 w-4" />
            <span className="sr-only">Toggle filters</span>
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="growing">Growing</SelectItem>
              <SelectItem value="ready">Ready for Harvest</SelectItem>
              <SelectItem value="harvested">Harvested</SelectItem>
            </SelectContent>
          </Select>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Sort By</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Sort by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked>Planting Date (Newest)</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Planting Date (Oldest)</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Harvest Date (Upcoming)</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Name (A-Z)</DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {showFilters && (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              <SelectItem value="field1">Field 1</SelectItem>
              <SelectItem value="field2">Field 2</SelectItem>
              <SelectItem value="field3">Field 3</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Crop Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="corn">Corn</SelectItem>
              <SelectItem value="wheat">Wheat</SelectItem>
              <SelectItem value="soybeans">Soybeans</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Planting Season" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Seasons</SelectItem>
              <SelectItem value="spring">Spring 2023</SelectItem>
              <SelectItem value="summer">Summer 2023</SelectItem>
              <SelectItem value="fall">Fall 2023</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Area Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Areas</SelectItem>
              <SelectItem value="small">Small (&lt; 5 acres)</SelectItem>
              <SelectItem value="medium">Medium (5-20 acres)</SelectItem>
              <SelectItem value="large">Large (&gt; 20 acres)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  )
}

