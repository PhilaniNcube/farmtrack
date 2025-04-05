import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Leaf, Plus } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Crop, FieldLocation } from "@/lib/schema"
import AddCropDialog from "@/components/add-crop-dialog"
import { format } from "date-fns"
import Link from "next/link"

export function CropStatus({ crops, locations }: { crops: Crop[], locations: FieldLocation[] }) {
    // In a real app, these would be fetched from your database


    const getStatusBadge = (status: string) => {
        switch (status) {
            case "growing":
                return <Badge variant="secondary">Growing</Badge>
            case "ready":
                return <Badge variant="default">Ready for Harvest</Badge>
            case "harvested":
                return <Badge variant="outline">Harvested</Badge>
            default:
                return <Badge variant="outline">{status}</Badge>
        }
    }

    return (
        <Card className="col-span-3">
            <CardHeader className="flex flex-row items-center justify-between">
                <div className="grid gap-2">
                    <CardTitle>Crop Status</CardTitle>
                    <CardDescription>Monitor your current growing crops</CardDescription>
                </div>
                <AddCropDialog locations={locations} />
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {crops.map((crop) => (
                        <div key={crop.id} className="space-y-2">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <Leaf className="h-4 w-4 text-green-500" />
                                    <span className="font-medium">{crop.name}</span>
                                    <span className="text-sm text-muted-foreground">({crop.variety})</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="text-sm text-muted-foreground">{crop.location}</span>
                                    {getStatusBadge(crop.status)}
                                </div>
                            </div>
                            <div className="space-y-1">
                                <div className="flex justify-between text-xs text-foreground">
                                    <span>Planted: {format(crop.planting_date, "PPP")}</span>
                                    <span>Expected Harvest: {format(crop.expected_harvest_date, "PPP")}</span>
                                </div>
                                {/* <Progress value={crop.progress} className="h-2" /> */}
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
            <CardFooter>
                {
                    crops.length > 0 && (
                        <Link href={`/dashboard/team/${crops[0].team_id}/crops`} passHref className="w-full">
                            <Button variant="outline" className="w-full">
                                View All Crops
                            </Button>
                        </Link>
                    )
                }

            </CardFooter>
        </Card>
    )
}

