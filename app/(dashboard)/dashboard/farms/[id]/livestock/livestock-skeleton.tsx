import { Card, CardContent } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import React from 'react'

const LiveStockSkeleton = () => {
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
                        <TableRow>
                            <TableCell className="h-8 w-12 animate-pulse bg-gray-200" />
                            <TableCell className="h-8 w-12 animate-pulse bg-gray-200" />
                            <TableCell className="h-8 w-12 animate-pulse bg-gray-200" />
                            <TableCell className="h-8 w-12 animate-pulse bg-gray-200" />
                            <TableCell className="h-8 w-12 animate-pulse bg-gray-200" />
                            <TableCell className="h-8 w-12 animate-pulse bg-gray-200" />
                            <TableCell className="h-8 w-12 animate-pulse bg-gray-200" />
                            <TableCell className="h-8 w-12 animate-pulse bg-gray-200" />
                            <TableCell className="h-8 w-12 animate-pulse bg-gray-200" />
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}

export default LiveStockSkeleton