
import CreateFarmDialog from "../_components/create-farm-dialog"


import { getTeams } from "@/lib/queries/teams"
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarIcon } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import Link from "next/link"


export default async function Dashboard() {

  const teams = await getTeams()

  return (
    <div className="flex flex-col min-h-screen w-full ">
      <main className="flex-1 p-4 md:p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <div className="flex items-center gap-2">
            <CreateFarmDialog />
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {teams.map((farm) => (
            <Card key={farm.id} className="overflow-hidden flex flex-col justify-between">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl">{farm.displayName}</CardTitle>

              </CardHeader>

              <CardFooter className="flex flex-col items-start  justify-end gap-2 border-t pt-3">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <CalendarIcon className="h-3.5 w-3.5" />
                  Created {formatDistanceToNow(new Date(farm.createdAt), { addSuffix: true })}
                </div>
                <Link
                  href={`/dashboard/team/${farm.id}`}
                  className="text-sm font-medium bg-green-600 text-white *:hover:bg-green-700 rounded-md px-3 py-1.5 transition-colors duration-200 mt-3"
                >
                  View Farm
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}

