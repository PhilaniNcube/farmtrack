"use client"

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getCachedLivestock } from "@/lib/queries/livestock"
import { cn, formatDate } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Livestock } from "@/lib/schema/livestock"
import { ArrowUpDown, Eye, Pencil, Trash2, Download, EllipsisIcon } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { toast } from "@/components/ui/use-toast"
import { deleteLivestock } from "@/app/actions/livestock"
import Link from 'next/link'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [livestockToDelete, setLivestockToDelete] = useState<number | null>(null)
  const router = useRouter()

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  })

  const handleDeleteClick = (id: number) => {
    setLivestockToDelete(id)
    setDeleteDialogOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (livestockToDelete) {
      try {
        const result = await deleteLivestock(livestockToDelete)

        if (result.error) {
          toast({
            title: "Error",
            description: "Failed to delete livestock.",
            variant: "destructive",
          })
        } else {
          toast({
            title: "Success",
            description: `Livestock has been deleted successfully.`,
          })

          // Refresh the data
          router.refresh()
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete livestock.",
          variant: "destructive",
        })
      }
    }
    setDeleteDialogOpen(false)
  }

  const handleExport = () => {
    // Convert the current filtered/sorted data to CSV
    const headers = columns
      .filter(column => column.id !== 'actions')
      .map(column => {
        // Get a meaningful column name - either from header or accessorKey/id
        if (typeof column.header === 'string') {
          return column.header
        } else if ('accessorKey' in column && typeof column.accessorKey === 'string') {
          return column.accessorKey
        } else {
          return column.id || ''
        }
      })

    // Get all visible rows from the table
    const rows = table.getRowModel().rows.map(row => {
      return columns
        .filter(column => column.id !== 'actions')
        .map(column => {
          const columnId = 'accessorKey' in column ?
            (column.accessorKey as string) :
            column.id as string

          const value = row.getValue(columnId)
          if (columnId === 'acquisition_date' && value instanceof Date) {
            return formatDate(value)
          }
          return value
        })
    })

    // Combine headers and rows
    const csvData = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n')

    // Create a blob and download link
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')

    const url = URL.createObjectURL(blob)
    link.href = url
    link.setAttribute('download', `livestock-export-${new Date().toISOString().split('T')[0]}.csv`)
    document.body.appendChild(link)
    link.click()

    // Clean up
    document.body.removeChild(link)
    URL.revokeObjectURL(url)

    toast({
      title: "Export successful",
      description: "The livestock data has been exported as CSV.",
    })
  }

  return (
    <div>
      <div className="flex items-center justify-between py-4">
        <Input
          placeholder="Filter by type..."
          value={(table.getColumn("type")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("type")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <Button variant="outline" onClick={handleExport} className="ml-auto">
          <Download className="mr-2 h-4 w-4" /> Export CSV
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No livestock found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="text-sm text-muted-foreground">
          Showing {table.getRowModel().rows.length} of {data.length} record(s)
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the livestock
              record from your farm's inventory.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

// Define columns for livestock table
const columns: ColumnDef<Livestock>[] = [
  {
    accessorKey: "type",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Type
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "breed",
    header: "Breed",
  },
  {
    accessorKey: "count",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Count
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "acquisition_date",
    header: "Acquisition Date",
    cell: ({ row }) => {
      const date = row.getValue("acquisition_date") as Date
      return <div>{formatDate(date)}</div>
    },
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "health_status",
    header: "Health Status",
    cell: ({ row }) => {
      const status = row.getValue("health_status") as string
      return (
        <Badge className={cn(
          status === "healthy" ? "bg-green-500 text-white" :
            status === "sick" ? "bg-red-500 text-white" :
              status === "quarantine" ? "bg-yellow-500 text-white" :
                status === "sick" ? "bg-red-700 text-white" :
                  status === "quarantine" ? "bg-yellow-500 text-white" :
                    "bg-blue-700 text-white"
          ,
        )}>
          {status}
        </Badge>
      )
    },
  },
  {
    accessorKey: "purpose",
    header: "Purpose",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const livestock = row.original
      const router = useRouter()
      const params = useParams()
      const team_id = params.team_id as string

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <EllipsisIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
            >
              <Link href={`/dashboard/team/${team_id}/livestock/${livestock.id}`} className='flex items-center'>
                <Eye className="mr-2 h-4 w-4" /> View Details
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
            >
              <Link href={`/dashboard/team/${team_id}/livestock/${livestock.id}/edit`} className='flex items-center'>
                <Pencil className="mr-2 h-4 w-4" /> Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />

          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

// Main livestock table component that fetches data for specific team
export default function LivestockTable({ livestock }: { livestock: Livestock[] }) {
  const params = useParams()


  return (
    <div className="">
      <DataTable columns={columns} data={livestock} />
    </div>
  )
}