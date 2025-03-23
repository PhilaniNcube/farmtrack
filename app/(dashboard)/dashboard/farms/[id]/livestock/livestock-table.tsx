import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { getCachedLivestock, getLivestock } from '@/lib/queries/livestock'
import { formatDate } from 'date-fns'
import { MoreHorizontal } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const LivestockTable = async ({ farmId }: { farmId: number }) => {

    // Fetch livestock data from the database
    const livestock = await getCachedLivestock(farmId) 

    return (
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
                                                    <Link href={`/dashboard/farms/${animal.farm_id}/livestock/${animal.id}`}>
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
    )
}

export default LivestockTable