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
import LivestockTable from "./livestock-table"
import { Suspense } from "react"
import LiveStockSkeleton from "./livestock-skeleton"

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
        <Suspense fallback={<LiveStockSkeleton />}>
          <LivestockTable livestock={livestock} />
        </Suspense>

      </main>
    </div>
  )
}

