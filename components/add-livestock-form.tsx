"use client";

import { createInventoryItem } from '@/app/actions/inventory'
import { useParams } from 'next/navigation'
import React, { useActionState, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from 'zod'
import { FieldLocation, InventorySchema, LivestockSchema } from '@/lib/schema'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Label } from './ui/label'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Button } from './ui/button'
import { CalendarIcon, CircleDashed } from 'lucide-react'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { Calendar } from './ui/calendar'
import { Separator } from './ui/separator'
import { addLivestock } from '@/app/actions/livestock';
import { Textarea } from './ui/textarea';
import AddFieldDialog from './add-field-dialog';

const AddLivestockForm = ({ locations }: { locations: FieldLocation[] }) => {

    const healthStatusOptions  = [
        "healthy",
        "new born",
        "sick",
        "needs_attention",
        "quarantine",
        "recovering",
        "unknown",
        "other"
      ] as const

    const params = useParams()
    const team_id = params.team_id as string

    const [state, formAction, isPending] = useActionState(addLivestock, null)

    const [acquisitionDate, setAcquisitionDate] = useState<Date>(new Date())

    const form = useForm<z.infer<typeof LivestockSchema>>({
        resolver: zodResolver(LivestockSchema),
        defaultValues: {
            type: "",
            breed: "",
            count: 0,
            acquisition_date: "",
            source: "",
            location: "",
            health_status: "",
            purpose: "",
            notes: "",
            team_id: team_id,
        }
    })

    const acquisition_date = form.watch("acquisition_date")


    return (
        <Card className='max-w-3xl'>
            <CardHeader className='flex flex-row items-center justify-between'>
                <div>
                    <CardTitle>Add Livestock</CardTitle>
                    <CardDescription>Enter the details for your livestock.</CardDescription>
                </div>
                <AddFieldDialog />
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form action={formAction}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <FormField
                                control={form.control}
                                name="type"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Type/Animal</FormLabel>
                                        <FormControl>
                                            <Input placeholder="" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="breed"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Breed</FormLabel>
                                        <FormControl>
                                            <Input placeholder="" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="count"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Count</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="space-y-2">
                                <Label htmlFor="acquisition_date">Acquisition Date</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={"outline"}
                                            className={cn("w-full justify-start text-left font-normal", !acquisitionDate && "text-muted-foreground")}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {acquisitionDate ? format(acquisitionDate, "PPP") : <span>Select date</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={acquisitionDate}
                                            onSelect={(date) => {
                                                setAcquisitionDate(date || new Date())
                                                form.setValue("acquisition_date", format(date || new Date(), "yyyy-MM-dd"))
                                                const input = document.querySelector('input[name="acquisition_date"]') as HTMLInputElement
                                                if (input && date) {
                                                    input.value = format(date, "yyyy-MM-dd")
                                                }
                                            }}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>

                                <FormField
                                    control={form.control}

                                    defaultValue={acquisition_date}
                                    name="acquisition_date"
                                    render={({ field }) => (
                                        <FormItem>

                                            <FormControl>
                                                <Input type="hidden" placeholder="" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="source"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Source/Purchased From</FormLabel>
                                        <FormControl>
                                            <Input placeholder="" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="purpose"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Purpose e.g. For Sale</FormLabel>
                                        <FormControl>
                                            <Input placeholder="" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />


                            {locations.length > 0 ? (<FormField
                                control={form.control}
                                name="location"
                                render={({ field }) => (
                                    <FormItem >
                                        <FormLabel>Location</FormLabel>
                                        <Select name='location' onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a location" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {locations.map((location) => (
                                                    <SelectItem key={location.id} value={location.name}>
                                                        {location.name}
                                                    </SelectItem>
                                                ))}


                                            </SelectContent>
                                        </Select>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />) : (
                                <div className=''>
                                    <p className='text-red-500 text-sm'>No locations available. Please add a location first.</p>
                                </div>
                            )}

                            <FormField
                                control={form.control}
                                name="health_status"
                                render={({ field }) => (
                                    <FormItem >
                                        <FormLabel>Health Status</FormLabel>
                                        <Select name='health_status' onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select animal status" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {healthStatusOptions.map((status) => (
                                                    <SelectItem key={status} value={status}>
                                                        {status}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField

                                control={form.control}
                                name="notes"
                                render={({ field }) => (
                                    <FormItem className='md:col-span-2'>
                                        <FormLabel>Notes</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="team_id"
                                render={({ field }) => (
                                    <FormItem>

                                        <FormControl>
                                            <Input type="hidden" placeholder="" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                        </div>
                        <Separator className='my-4' />
                        <Button type='submit' disabled={isPending} className='w-full'>
                            {isPending ? <CircleDashed className='animate-spin' /> : "Add Livestock"}
                        </Button>

                        {state?.error && <p className='text-red-500 text-sm'>{state.error}</p>}
                      {state?.success && <p className='text-green-500 text-sm'>Livestock added successfully!</p>}
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

export default AddLivestockForm