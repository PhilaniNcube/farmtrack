import { Suspense } from "react"
import { Leaf, DollarSign, BarChart3, MilkIcon as Cow, Calendar, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { FarmSummary } from "@/components/farm-summary"




import { getCropsByFarmId } from "@/lib/queries/crops"
import CreateFarmDialog from "../_components/create-farm-dialog"
import { getAllMyFarms } from "@/lib/queries/farms"
import { FarmsList } from "./profile/farm-list"
import { formatDate } from "date-fns"

export default async function Dashboard() {
  const cropData = getCropsByFarmId(1) // Replace with actual farm ID
  const farmsData = getAllMyFarms() 

  const [crops, farms] = await Promise.all([cropData, farmsData])
  
  return (
    <div className="flex flex-col min-h-screen w-full ">
      <main className="flex-1 p-4 md:p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <div className="flex items-center gap-2">
            
           <CreateFarmDialog />
          </div>
        </div>
        <FarmsList />
      

      

       
      </main>
    </div>
  )
}

