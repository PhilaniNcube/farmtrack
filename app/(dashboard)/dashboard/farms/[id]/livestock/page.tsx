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
import { getLivestock } from "@/lib/queries/livestock"
import { formatDate } from "date-fns"

export default async function LivestockPage({ params }: { params: Promise<{ id: string }> }) {
  const farmId = (await params).id
  const farmIdNumber = Number(farmId)

  // Fetch livestock data from the database
  const livestock = await getLivestock(farmIdNumber)

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 p-4 md:p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold tracking-tight">Livestock Management</h1>
          <Link href={`/dashboard/farms/${farmId}/livestock/add`}>
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="mr-2 h-4 w-4" />
              Add Animal
            </Button>
          </Link>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Animal</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Breed</TableHead>
                  <TableHead>
                    Purcahsed/Acquired/Born
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Count</TableHead>
                  <TableHead>Purpose</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {livestock.map((animal) => {

                  return (
                    <TableRow key={animal.id}>
                    <TableCell className="font-medium">{animal.type}</TableCell>
                    <TableCell>{animal.source}</TableCell>
                    <TableCell>{animal.breed}</TableCell>
                    <TableCell>{formatDate(animal.acquisition_date, "PPP")}</TableCell>
                    <TableCell>
                      <Badge className="bg-green-500">{animal.health_status}</Badge>
                    </TableCell>
                    <TableCell>{animal.location}</TableCell>
                    <TableCell>
                    {animal.count}
                    </TableCell>
                    <TableCell>{animal.purpose}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Link href={`/dashboard/farms/${farmId}/livestock/${animal.id}`}>
                              View
                            </Link>
                            </DropdownMenuItem>           
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                  )
                })}
               
                
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

