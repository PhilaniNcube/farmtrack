import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FieldLocation } from "@/lib/schema"
import { Map, Plus } from "lucide-react"
import Link from "next/link"

export function FieldLocations({ field_locations }: { field_locations: FieldLocation[] }) {


    return (
        <Card className="flex flex-col justify-between h-full">
            <CardHeader className="flex flex-row items-center">
                <div className="grid gap-2">
                    <CardTitle>Field Locations</CardTitle>
                    <CardDescription>Manage your farm's field locations</CardDescription>
                </div>
                <Button className="ml-auto gap-1" size="sm">
                    <Plus className="h-4 w-4" />
                    Add Field
                </Button>
            </CardHeader>
            <CardContent className="flex-1">
                <div className="space-y-4">
                    {field_locations.map((field) => (
                        <div key={field.id} className="flex items-center justify-between space-x-4">
                            <div className="flex items-center space-x-4">
                                <Map className="h-5 w-5 text-green-500" />
                                <div>
                                    <p className="text-sm font-medium leading-none">{field.name}</p>
                                    <p className="text-sm text-muted-foreground">{field.description}</p>
                                </div>
                            </div>
                            <Button variant="ghost" size="sm">
                                View
                            </Button>
                        </div>
                    ))}
                </div>
            </CardContent>
            <CardFooter className="">

                

            </CardFooter>
        </Card>
    )
}

