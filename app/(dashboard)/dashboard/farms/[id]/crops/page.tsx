import { Plus, Filter, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { getCropsByFarmId } from "@/lib/queries/crops"
import { formatDate } from "date-fns"
import UpdateCropStatus from "./update-crop-status"

export default async function CropsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const farmId = Number(id)

  const crops = await getCropsByFarmId(farmId)
  

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 p-4 md:p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold tracking-tight">Crop Management</h1>
          <Link href={`/dashboard/farms/${id}/crops/add`} className="flex items-center">
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="mr-2 h-4 w-4" />
              Add Crop
            </Button>
          </Link>
        </div>

        <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Input placeholder="Search crops..." className="max-w-xs" />
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>

                    <TableRow>
                      <TableHead>Crop Name</TableHead>
                      <TableHead>Variety</TableHead>
                      <TableHead>Planting Date</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Area</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Expected Harvest</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {crops.length > 0 && crops.map((crop) => (
                      <TableRow key={crop.id}>
                        <TableCell className="font-medium">{crop.name}</TableCell>
                        <TableCell>{crop.variety}</TableCell>
                        <TableCell>{formatDate(crop.planting_date, "PPP")}</TableCell>
                        <TableCell>{crop.location}</TableCell>
                        <TableCell>{crop.area} {crop.area_unit}</TableCell>
                        <TableCell>
                         <UpdateCropStatus cropId={crop.id} status={crop.status} />
                        </TableCell>
                        <TableCell>
                          {crop.expected_harvest_date ? formatDate(crop.expected_harvest_date, "PPP") : "N/A"}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Link className="cursor-pointer" href={`/dashboard/farms/${id}/crops/${crop.id}`}>View Details</Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem>Edit Crop</DropdownMenuItem>
                              <DropdownMenuItem>Record Activity</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}



                  </TableBody>
                </Table>
              </CardContent>
            </Card>
      </main>
    </div>
  )
}

