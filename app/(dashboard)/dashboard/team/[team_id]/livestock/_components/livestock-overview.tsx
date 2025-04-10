import { Card, CardContent } from "@/components/ui/card"
import { Livestock } from "@/lib/schema"
import { MilkIcon as Cow, AlertTriangle, MapPin, Clipboard } from "lucide-react"

export function LivestockOverview({ livestock }: { livestock: Livestock[] }) {

    const totalAnimals = livestock.reduce((acc, item) => acc + Number(item.count), 0)

    const healthConcerns = livestock.filter(item => item.health_status === "sick" || item.health_status === "injured" || item.health_status === "quarantine" || item.health_status === "other").length
    // In a real app, these would be fetched from your database

    const locations = [...new Set(livestock.map(item => item.location))].length
    const animalTypes = [...new Set(livestock.map(item => item.type))].length

    const livestockData = {
        totalAnimals: 245,
        healthConcerns: 8,
        locations: 4,
        animalTypes: 3,
    }

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-6">
            <Card>
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Total Animals</p>
                            <p className="text-3xl font-bold">{totalAnimals}</p>
                        </div>
                        <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center">
                            <Cow className="h-6 w-6 text-amber-600" />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Health Concerns</p>
                            <p className="text-3xl font-bold">{healthConcerns}</p>
                        </div>
                        <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
                            <AlertTriangle className="h-6 w-6 text-red-600" />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Locations</p>
                            <p className="text-3xl font-bold">{locations}</p>
                        </div>
                        <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                            <MapPin className="h-6 w-6 text-blue-600" />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Animal Types</p>
                            <p className="text-3xl font-bold">{animalTypes}</p>
                        </div>
                        <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                            <Clipboard className="h-6 w-6 text-purple-600" />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
