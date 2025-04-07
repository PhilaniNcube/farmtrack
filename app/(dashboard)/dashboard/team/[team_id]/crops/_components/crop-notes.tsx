
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

import { CropNote } from "@/lib/schema"
import { format } from "date-fns"

import { cn } from "@/lib/utils";
import AddCropNoteDialog from "./add-crop-note-dialog";

interface CropNotesProps {
    notes: CropNote[]
}

export function CropNotes({ notes }: CropNotesProps) {
    // In a real app, this would be fetched from your database

    console.log("Crop Notes", notes)

   

    return (
        <Card>
            <CardHeader>
                <CardTitle>Notes</CardTitle>
                <CardDescription>Additional information and observations</CardDescription>
            </CardHeader>
            <CardContent>
                {notes.length > 0 ? (
                    <div className="space-y-4">
                        {notes.map((note) => (
                            <div key={note.id} className={cn("flex flex-col space-y-1")} >                               
                                <p className="text-sm text-muted-foreground text-balance">- {note.text}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-sm text-muted-foreground">No notes available for this crop.</div>
                )}
            </CardContent>
            <CardFooter>
               <AddCropNoteDialog />
            </CardFooter>
        </Card>
    )
}

