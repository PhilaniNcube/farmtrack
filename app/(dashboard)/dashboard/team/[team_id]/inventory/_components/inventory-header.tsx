import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import Link from "next/link"

export function InventoryHeader({team_id}:{team_id:string}) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Inventory Management</h1>
        <p className="text-muted-foreground">Track and manage your farm supplies and equipment</p>
      </div>
      <Button asChild>
        <Link href={`/dashboard/team/${team_id}/inventory/add`} className="flex items-center justify-center space-x-2">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Inventory Item
        </Link>
      </Button>
    </div>
  )
}
