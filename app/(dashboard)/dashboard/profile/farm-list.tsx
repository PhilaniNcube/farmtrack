
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPinIcon, CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import type { Farm } from "@/lib/schema"
import { getMyFarms } from "@/lib/queries/farms"

interface FarmsListProps {
  farms: Farm[]
}

export async function FarmsList() {

    const farms = await getMyFarms()

  if (farms.length === 0) {
    return (
      <div className="text-center py-6">
        <p className="text-muted-foreground">You are not part of any farms yet.</p>
        <p className="mt-2">Create a new farm or ask to be added to an existing one.</p>
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {farms.map((farm) => (
        <Card key={farm.id} className="overflow-hidden">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl">{farm.name}</CardTitle>
            {farm.location && (
              <CardDescription className="flex items-center gap-1">
                <MapPinIcon className="h-3.5 w-3.5" />
                {farm.location}
              </CardDescription>
            )}
          </CardHeader>
          <CardContent className="pb-3">
            {farm.description ? (
              <p className="text-sm text-muted-foreground line-clamp-3">{farm.description}</p>
            ) : (
              <p className="text-sm text-muted-foreground italic">No description provided</p>
            )}
          </CardContent>
          <CardFooter className="flex flex-col items-start gap-2 border-t pt-3">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <CalendarIcon className="h-3.5 w-3.5" />
              Created {formatDistanceToNow(new Date(farm.created_at), { addSuffix: true })}
            </div>
            <Button asChild size="sm" className="mt-2">
              <Link href={`/dashboard/farms/${farm.id}`}>View Farm</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

