"use client"
import { createInventoryItem } from '@/app/actions/inventory'
import { useParams } from 'next/navigation'
import React, { useActionState, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from 'zod'
import { InventorySchema } from '@/lib/schema'
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



const AddInventoryForm = () => {

    const params = useParams();
    const team_id = params.team_id as string;

    const [state, formAction, isPending] = useActionState(createInventoryItem, null)

    const form = useForm<z.infer<typeof InventorySchema>>({
        resolver: zodResolver(InventorySchema),
        defaultValues: {
            item_name: "",
            category: "",
            quantity: 0,
            unit: "",
            purchase_date: "",
            expiry_date: "",
            notes: "",
            team_id: team_id,
            purchase_price: 0,
            supplier: "",
            storage_location: "",
            reorder_level: 0
        }
    })

    const [purchaseDate, setPurchaseDate] = useState<Date>(new Date())
    const [expiryDate, setExpiryDate] = useState<Date>(new Date())

    const purchase_date = form.watch("purchase_date")
    const expiry_date = form.watch("expiry_date")


    return (
        <Card className='max-w-3xl'>
            <CardHeader>
                <CardTitle>Add New Inventory Item</CardTitle>
                <CardDescription>Enter the details for your new inventory item.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <Form {...form}>
                    <form action={formAction} className="space-y-4 " >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <FormField
                                control={form.control}
                                name="item_name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Item Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="category"
                                render={({ field }) => (
                                    <FormItem >
                                        <FormLabel>Category</FormLabel>
                                        <Select name='category' onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a category" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="seeds">Seeds</SelectItem>
                                                <SelectItem value="fertilizers">Fertilizers</SelectItem>
                                                <SelectItem value="equipment">Equipment</SelectItem>
                                                <SelectItem value="animal feed">Animal Feed</SelectItem>
                                                <SelectItem value="medications">Medications</SelectItem>
                                                <SelectItem value="tools">Tools</SelectItem>
                                                <SelectItem value="pesticides">Pesticides</SelectItem>
                                                <SelectItem value="herbicides">Herbicides</SelectItem>
                                                <SelectItem value="fungicides">Fungicides</SelectItem>
                                                <SelectItem value="other">Other</SelectItem>
                                            </SelectContent>
                                        </Select>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="quantity"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Quantity</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="unit"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Unit e.g. (kg, litre, packet, etc)</FormLabel>
                                        <FormControl>
                                            <Input placeholder="" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="space-y-2">
                                <Label htmlFor="transaction_date">Purchase Date</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={"outline"}
                                            className={cn("w-full justify-start text-left font-normal", !purchaseDate && "text-muted-foreground")}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {purchaseDate ? format(purchaseDate, "PPP") : <span>Select date</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={purchaseDate}
                                            onSelect={(date) => {
                                                setPurchaseDate(date || new Date())
                                                form.setValue("purchase_date", format(date || new Date(), "yyyy-MM-dd"))
                                                const input = document.querySelector('input[name="transaction_date"]') as HTMLInputElement
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

                                    defaultValue={purchase_date}
                                    name="purchase_date"
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

                            <div className="space-y-2">
                                <Label htmlFor="expiry_date">Expiry Date</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={"outline"}
                                            className={cn("w-full justify-start text-left font-normal", !expiryDate && "text-muted-foreground")}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {expiryDate ? format(expiryDate, "PPP") : <span>Select date</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={expiryDate}
                                            onSelect={(date) => {
                                                setExpiryDate(date || new Date())
                                                form.setValue("expiry_date", format(date || new Date(), "yyyy-MM-dd"))
                                                const input = document.querySelector('input[name="expiry_date"]') as HTMLInputElement
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

                                    defaultValue={expiry_date}
                                    name="expiry_date"
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
                                name="purchase_price"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Purchase Price</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="supplier"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Supplier</FormLabel>
                                        <FormControl>
                                            <Input placeholder="" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="storage_location"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Storage Location</FormLabel>
                                        <FormControl>
                                            <Input placeholder="" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="reorder_level"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Reorder Level</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="" {...field} />
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

                            <div className="col-span-2">
                                <FormField
                                    control={form.control}
                                    name="notes"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Notes</FormLabel>
                                            <FormControl>
                                                <Input placeholder="" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        <Separator className="my-4" />

                        <Button type="submit" disabled={isPending} className="w-full">
                            {isPending ? <CircleDashed className='animate-spin' /> : "Add Inventory Item"}
                        </Button>

                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

export default AddInventoryForm