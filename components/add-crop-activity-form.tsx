"use client"

import {  useActionState, useState } from "react"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { cn } from "@/lib/utils"
import { addCropActivity } from "@/app/actions/crop_activities"
import { z } from "zod"

interface AddCropActivityFormProps {
    cropId: number;
    teamId: string;
    onSuccess?: () => void;
}

const CropActivitySchema = z.object({
    name: z.string().min(1, "Activity name is required"),
    type: z.enum([
        "planting",
        "harvesting",
        "fertilizing",
        "irrigating",
        "weeding",
        "pesticide_application",
        "other",
    ]),
    status: z.enum(["pending", "in-progress", "completed"]),
    description: z.string().min(1, "Description is required"),
    scheduled_date: z.string(),
    completed_date: z.string().optional().nullable(),
    crop_id: z.coerce.number({ message: "Crop ID is required" }),
    team_id: z.string({ message: "Team ID is required" }),
})

 type CropActivityFormValues = z.infer<typeof CropActivitySchema>

export function AddCropActivityForm({ cropId, teamId, onSuccess }: AddCropActivityFormProps) {
    const [state, formAction, isPending] = useActionState(addCropActivity, null)
    const [scheduledDate, setScheduledDate] = useState<Date>(new Date())
    const [completedDate, setCompletedDate] = useState<Date | undefined>()

    const form = useForm<CropActivityFormValues>({
        resolver: zodResolver(CropActivitySchema),
        defaultValues: {
            name: "",
            type: "other",
            status: "pending",
            description: "",
            scheduled_date: format(new Date(), "yyyy-MM-dd"),
            completed_date: undefined,
            crop_id: cropId,
            team_id: teamId,
        }
    })



    return (
        <Form {...form}>
            <form action={formAction} className="space-y-6">
                <input type="hidden" name="crop_id" value={cropId} />
                <input type="hidden" name="team_id" value={teamId} />

                <div className="space-y-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Activity Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g., Spring Planting" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="type"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Activity Type</FormLabel>
                                    <Select name="type" onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select type" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="planting">Planting</SelectItem>
                                            <SelectItem value="harvesting">Harvesting</SelectItem>
                                            <SelectItem value="fertilizing">Fertilizing</SelectItem>
                                            <SelectItem value="irrigating">Irrigating</SelectItem>
                                            <SelectItem value="weeding">Weeding</SelectItem>
                                            <SelectItem value="pesticide_application">Pesticide Application</SelectItem>
                                            <SelectItem value="other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Status</FormLabel>
                                    <Select name="status" onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select status" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="pending">Pending</SelectItem>
                                            <SelectItem value="in-progress">In Progress</SelectItem>
                                            <SelectItem value="completed">Completed</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Describe the activity details..."
                                        className="resize-none min-h-[100px]"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Scheduled Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full justify-start text-left font-normal",
                                            !scheduledDate && "text-muted-foreground",
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {scheduledDate ? format(scheduledDate, "PPP") : <span>Select date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={scheduledDate}
                                        onSelect={(date) => {
                                            setScheduledDate(date || new Date())
                                            const input = document.querySelector('input[name="scheduled_date"]') as HTMLInputElement
                                            if (input && date) {
                                                input.value = format(date, "yyyy-MM-dd")
                                            }
                                        }}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            <input
                                type="hidden"
                                name="scheduled_date"
                                value={scheduledDate ? format(scheduledDate, "yyyy-MM-dd") : ""}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Completed Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full justify-start text-left font-normal",
                                            !completedDate && "text-muted-foreground",
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {completedDate ? format(completedDate, "PPP") : <span>Select date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={completedDate}
                                        onSelect={(date) => {
                                            setCompletedDate(date)
                                            const input = document.querySelector('input[name="completed_date"]') as HTMLInputElement
                                            if (input) {
                                                input.value = date ? format(date, "yyyy-MM-dd") : ""
                                            }
                                        }}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            <input
                                type="hidden"
                                name="completed_date"
                                value={completedDate ? format(completedDate, "yyyy-MM-dd") : ""}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-3">
                    <Button variant="outline" type="button" onClick={() => form.reset()}>
                        Reset
                    </Button>
                    <Button type="submit" disabled={isPending} className="bg-green-600 hover:bg-green-700">
                        {isPending ? "Adding..." : "Add Activity"}
                    </Button>
                </div>
            </form>
        </Form>
    )
}