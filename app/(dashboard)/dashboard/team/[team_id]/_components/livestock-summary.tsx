import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MilkIcon as Cow,  Plus } from "lucide-react"
import { FieldLocation, Livestock } from "@/lib/schema"
import Link from "next/link"
import AddLivestockDialog from "./add-livestock-dialog"

export function LivestockSummary({livestock, fields}: {livestock: Livestock[], fields: FieldLocation[]}) {


  const getHealthStatusBadge = (status: string) => {
    switch (status) {
      case "healthy":
        return <Badge variant="default">Healthy</Badge>
      case "needs attention":
        return <Badge variant="secondary">Needs Attention</Badge>
      case "sick":
        return <Badge variant="destructive">Sick</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <Card className="col-span-3">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Livestock Summary</CardTitle>
          <CardDescription>Overview of your farm animals</CardDescription>
        </div>
      <AddLivestockDialog locations={fields} />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {livestock.map((animal) => (
            <div key={animal.id} className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-4">
                <Cow className="h-5 w-5 text-amber-500" />
                <div>
                  <p className="text-sm font-medium leading-none">{animal.type}</p>
                  <p className="text-sm text-muted-foreground">{animal.breed}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-sm">
                  <span className="font-medium">{animal.count}</span> animals
                </div>
                <div className="text-sm text-muted-foreground">{animal.location}</div>
                {getHealthStatusBadge(animal.health_status)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        {livestock.length > 0 && (
            <Link href={`/dashboard/team/${livestock[0].team_id}/livestock`} passHref className="w-full">
              <Button variant="outline" className="w-full">
                View All Livestock
              </Button>
            </Link>
        )}        
      </CardFooter>
    </Card>
  )
}

