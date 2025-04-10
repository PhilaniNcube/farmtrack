"use client"
 
import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, Edit, MoreHorizontal, Trash2 } from "lucide-react"
 
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Inventory } from "@/lib/schema"
import { cn, formatCurrency } from "@/lib/utils"
import { formatDate } from "date-fns"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export const columns: ColumnDef<Inventory>[] = [

    {
        id: "select",
        header: ({ table }) => (
            <div className="px-4">
                <Checkbox
                    checked={table.getIsAllRowsSelected()}
                    onCheckedChange={table.getToggleAllRowsSelectedHandler()}
                    aria-label="Select all"
                />
            </div>
        ),
        cell: ({ row }) => (
            <div className="px-4">
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={row.getToggleSelectedHandler()}
                    aria-label="Select row"
                />
            </div>
        ),
    },
    {
       accessorKey: "item_name",
       header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            <ArrowUpDown />
          </Button>
        )
      },
        cell: ({ row }) => {
            const inventory = row.original
            return (
            <div className="flex items-center space-x-2">
                <div className="font-medium">{inventory.item_name}</div>
            </div>
            )
        },

    },
    {
        accessorKey:"purchase_price",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Purchase Price
                    <ArrowUpDown />
                </Button>
            )
        },
        cell: ({ row }) => {
            const inventory = row.original
            return (
                <div className="flex items-center space-x-2">
                    <div className="font-medium">{formatCurrency(Number(inventory.purchase_price))}</div>
                </div>
            )
        }
    },
    {
        accessorKey:"quantity",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Quantity
                    <ArrowUpDown />
                </Button>
            )
        },
        cell: ({ row }) => {
            const inventory = row.original
            return (
                <div className="flex items-center space-x-2">
                    <div className="font-medium">{inventory.quantity}</div>
                </div>
            )
        }
    },
    {
        accessorKey: "category",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Category
                    <ArrowUpDown />
                </Button>
            )
        },
        cell: ({ row }) => {
            const inventory = row.original
            return (
                <div className="flex items-center space-x-2">
                    <Badge className={cn("font-medium",
                        inventory.category === "feed" ? "bg-green-500 text-white" :
                        inventory.category === "equipment" ? "bg-blue-700 text-white" :
                        inventory.category === "supplies" ? "bg-yellow-700 text-white" :
                        inventory.category === "seeds" ? "bg-teal-700 text-white" :
                        inventory.category === "medication" ? "bg-red-700 text-white" :
                        inventory.category === "fertilizer" ? "bg-purple-600 text-white" :
                        inventory.category === "tools" ? "bg-orange-700 text-white" :
                        inventory.category === "other" ? "bg-gray-800 text-white" : ""
                    )} 
                    
                    >{inventory.category}</Badge>
                </div>
            )
        }
    },
    {
        accessorKey: "purchase_date",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Purchase Date
                    <ArrowUpDown />
                </Button>
            )
        },
        cell: ({ row }) => {
            const inventory = row.original
            return (
                <div className="flex items-center space-x-2">
                    <div className="font-medium">{inventory.purchase_date && formatDate(inventory.purchase_date, "PP")}</div>
                </div>
            )
        }
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const inventory = row.original
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Link href={`/dashboard/team/${inventory.team_id}/inventory/${inventory.id}/edit`} className="flex items-center space-x-2">
                            <Edit className="h-4 w-4" />
                            <span className="text-sm">Edit this item</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Trash2 className="h-4 w-4" />
                          Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },

]


const InventoryTable = ({inventory}:{inventory:Inventory[]}) => {

    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
      []
    )
    const [columnVisibility, setColumnVisibility] =
      React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})
   
    const table = useReactTable({
      data:inventory,
      columns,
      onSortingChange: setSorting,
      onColumnFiltersChange: setColumnFilters,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      onColumnVisibilityChange: setColumnVisibility,
      onRowSelectionChange: setRowSelection,
      state: {
        sorting,
        columnFilters,
        columnVisibility,
        rowSelection,
      },
    })

    return (
        <div className="w-full">
          <div className="flex items-center py-4">
            <Input
              placeholder="Filter items..."
              value={(table.getColumn("item_name")?.getFilterValue() as string) ?? ""}
              onChange={(event) =>
                table.getColumn("item_name")?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  Columns <ChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    )
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
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
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-end space-x-2 py-4">
            <div className="flex-1 text-sm text-muted-foreground">
              {table.getFilteredSelectedRowModel().rows.length} of{" "}
              {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
            <div className="space-x-2">
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
        </div>
      )
}

export default InventoryTable