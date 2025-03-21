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

export default async function CropsPage({params}:{params:Promise<{id: string}>}) {
  const { id } = await params
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

        <Tabs defaultValue="active" className="mb-6">
          <TabsList>
            <TabsTrigger value="active">Active Crops</TabsTrigger>
            <TabsTrigger value="planned">Planned</TabsTrigger>
            <TabsTrigger value="harvested">Harvested</TabsTrigger>
            <TabsTrigger value="all">All Crops</TabsTrigger>
          </TabsList>
          <TabsContent value="active" className="mt-4">
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
                    <TableRow>
                      <TableCell className="font-medium">Tomatoes</TableCell>
                      <TableCell>Roma</TableCell>
                      <TableCell>Mar 15, 2025</TableCell>
                      <TableCell>Field A</TableCell>
                      <TableCell>0.5 acres</TableCell>
                      <TableCell>
                        <Badge className="bg-green-500">Growing</Badge>
                      </TableCell>
                      <TableCell>Jun 20, 2025</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Edit Crop</DropdownMenuItem>
                            <DropdownMenuItem>Record Activity</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Corn</TableCell>
                      <TableCell>Sweet Corn</TableCell>
                      <TableCell>Apr 5, 2025</TableCell>
                      <TableCell>Field B</TableCell>
                      <TableCell>1.2 acres</TableCell>
                      <TableCell>
                        <Badge className="bg-green-500">Growing</Badge>
                      </TableCell>
                      <TableCell>Aug 10, 2025</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Edit Crop</DropdownMenuItem>
                            <DropdownMenuItem>Record Activity</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Lettuce</TableCell>
                      <TableCell>Romaine</TableCell>
                      <TableCell>Feb 20, 2025</TableCell>
                      <TableCell>Greenhouse 1</TableCell>
                      <TableCell>0.1 acres</TableCell>
                      <TableCell>
                        <Badge className="bg-amber-500">Ready to Harvest</Badge>
                      </TableCell>
                      <TableCell>Apr 25, 2025</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Edit Crop</DropdownMenuItem>
                            <DropdownMenuItem>Record Activity</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="planned" className="mt-4">
            <Card>
              <CardContent className="pt-6">
                <p>Your planned crops will appear here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="harvested" className="mt-4">
            <Card>
              <CardContent className="pt-6">
                <p>Your harvested crops will appear here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="all" className="mt-4">
            <Card>
              <CardContent className="pt-6">
                <p>All your crops will appear here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

