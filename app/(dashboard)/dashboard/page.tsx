
import CreateFarmDialog from "../_components/create-farm-dialog"
import { FarmsList } from "./profile/farm-list"
import { Suspense } from "react"
import DashboardFallback from "./dashboard-fallback"


export default async function Dashboard() {


  return (
    <div className="flex flex-col min-h-screen w-full ">
      <main className="flex-1 p-4 md:p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <div className="flex items-center gap-2">
            <CreateFarmDialog />
          </div>
        </div>
        <Suspense fallback={<DashboardFallback />}>
          <FarmsList />
        </Suspense>
      </main>
    </div>
  )
}

