import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import Link from "next/link"

export  function CropsHeader({team_id}:{team_id:string}) {

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Crops Management</h1>
        <p className="text-muted-foreground">Track and manage all your crops in one place</p>
      </div>
      <Button asChild>
        <Link href={`/dashboard/team/${team_id}/crops/add`} className="flex items-center gap-2">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New Crop
        </Link>
      </Button>
    </div>
  )
}

