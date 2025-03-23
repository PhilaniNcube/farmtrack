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
import { getInventoryItems } from "@/lib/queries/inventory"

export default async function InventoryPage({ params }: { params: Promise<{ id: string }> }) {
  const farmId = (await params).id
  const farmIdNumber = Number(farmId)

  const inventoryItems = await getInventoryItems(farmIdNumber)

  const seeds = inventoryItems.filter((item) => item.category === "seeds")
  const fertilizers = inventoryItems.filter((item) => item.category === "fertilizers")
  const equipment = inventoryItems.filter((item) => item.category === "equipment")
  const feed = inventoryItems.filter((item) => item.category === "animal feed")
  const medications = inventoryItems.filter((item) => item.category === "medications")
  const tools = inventoryItems.filter((item) => item.category === "tools")
  const pesticides = inventoryItems.filter((item) => item.category === "pesticides")
  const herbicides = inventoryItems.filter((item) => item.category === "herbicides")
  const fungicides = inventoryItems.filter((item) => item.category === "fungicides")
  const other = inventoryItems.filter((item) => item.category === "other")

  const tabContentSources = [
    { name: "seeds", items: seeds },
    { name: "fertilizers", items: fertilizers },
    { name: "equipment", items: equipment },
    { name: "feed", items: feed },
    { name: "medications", items: medications },
    { name: "tools", items: tools },
    { name: "pesticides", items: pesticides },
    { name: "herbicides", items: herbicides },
    { name: "fungicides", items: fungicides },
    { name: "other", items: other },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 p-4 md:p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold tracking-tight">Inventory Management</h1>
          <Link href={`/dashboard/farms/${farmIdNumber}/inventory/add`} className="inline-flex items-center">
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="mr-2 h-4 w-4" />
              Add Item
            </Button>
          </Link>
        </div>

        <Tabs defaultValue="all" className="mb-6">
          <TabsList>
            <TabsTrigger value="all">All Items</TabsTrigger>
            <TabsTrigger value="seeds">Seeds</TabsTrigger>
            <TabsTrigger value="fertilizers">Fertilizers</TabsTrigger>
            <TabsTrigger value="equipment">Equipment</TabsTrigger>
            <TabsTrigger value="feed">Animal Feed</TabsTrigger>
            <TabsTrigger value="medications">Medications</TabsTrigger>
            <TabsTrigger value="tools">Tools</TabsTrigger>
            <TabsTrigger value="pesticides">Pesticides</TabsTrigger>
            <TabsTrigger value="herbicides">Herbicides</TabsTrigger>
            <TabsTrigger value="fungicides">Fungicides</TabsTrigger>
            <TabsTrigger value="other">Other</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Input placeholder="Search inventory..." className="max-w-xs" />
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
                      <TableHead>Item Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Unit</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Last Updated</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {inventoryItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.item_name}</TableCell>
                        <TableCell className="capitalize">{item.category}</TableCell>
                        <TableCell>{Number(item.quantity)}</TableCell>
                        <TableCell>{item.unit}</TableCell>
                        <TableCell>{item.storage_location}</TableCell>
                        <TableCell>{new Date(item.updated_at).toLocaleDateString()}</TableCell>
                        <TableCell>
                          {Number(item.quantity) > 0 ? (
                            <Badge className="bg-green-500">In Stock</Badge>
                          ) : (
                            <Badge className="bg-red-500">Out of Stock</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              <DropdownMenuItem>Edit Item</DropdownMenuItem>
                              <DropdownMenuItem>Update Quantity</DropdownMenuItem>
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
          </TabsContent>

          {tabContentSources.map((source) => (
            <TabsContent key={source.name} value={source.name} className="mt-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Input placeholder="Search inventory..." className="max-w-xs" />
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
                        <TableHead>Item Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Unit</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Last Updated</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {source.items.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.item_name}</TableCell>
                          <TableCell className="capitalize">{item.category}</TableCell>
                          <TableCell>{Number(item.quantity)}</TableCell>
                          <TableCell>{item.unit}</TableCell>
                          <TableCell>{item.storage_location}</TableCell>
                          <TableCell>{new Date(item.updated_at).toLocaleDateString()}</TableCell>
                          <TableCell>
                            {Number(item.quantity) > 0 ? (
                              <Badge className="bg-green-500">In Stock</Badge>
                            ) : (
                              <Badge className="bg-red-500">Out of Stock</Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                <DropdownMenuItem>Edit Item</DropdownMenuItem>
                                <DropdownMenuItem>Update Quantity</DropdownMenuItem>
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
            </TabsContent>
          ))}


        </Tabs>
      </main>
    </div>
  )
}

