"use client"
import { updateInventoryItem } from '@/app/actions/inventory'
import { useParams, useRouter } from 'next/navigation'
import React, { useActionState, useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from 'zod'
import { Inventory, InventoryUpdateSchema } from '@/lib/schema'
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
import { format, parseISO } from 'date-fns'
import { cn } from '@/lib/utils'
import { Calendar } from './ui/calendar'
import { Separator } from './ui/separator'
import { toast } from 'sonner'

interface UpdateInventoryFormProps {
  inventoryItem: Inventory;
}

const UpdateInventoryForm = ({ inventoryItem }: UpdateInventoryFormProps) => {
    const params = useParams();
    const router = useRouter();
    const team_id = params.team_id as string;

    const [state, formAction, isPending] = useActionState(updateInventoryItem, null)

    // Format dates properly from the inventory item
    const parsedPurchaseDate = inventoryItem.purchase_date ? new Date(inventoryItem.purchase_date) : null;
    const parsedExpiryDate = inventoryItem.expiry_date ? new Date(inventoryItem.expiry_date) : null;

    const form = useForm<z.infer<typeof InventoryUpdateSchema>>({
        resolver: zodResolver(InventoryUpdateSchema),
        defaultValues: {
            id: inventoryItem.id,
            item_name: inventoryItem.item_name,
            category: inventoryItem.category,
            quantity: Number(inventoryItem.quantity),
            unit: inventoryItem.unit,
            purchase_date: parsedPurchaseDate ? format(parsedPurchaseDate, "yyyy-MM-dd") : "",
            expiry_date: parsedExpiryDate ? format(parsedExpiryDate, "yyyy-MM-dd") : "",
            notes: inventoryItem.notes || "",
            team_id: team_id,
            purchase_price: Number(inventoryItem.purchase_price),
            supplier: inventoryItem.supplier || "",
            storage_location: inventoryItem.storage_location || "",
            reorder_level: Number(inventoryItem.reorder_level),
        }
    });

    const [purchaseDate, setPurchaseDate] = useState<Date | null>(parsedPurchaseDate);
    const [expiryDate, setExpiryDate] = useState<Date | null>(parsedExpiryDate);

    const purchase_date = form.watch("purchase_date");
    const expiry_date = form.watch("expiry_date");

    // Handle form submission result
    useEffect(() => {
        if (state && !isPending) {
            if (state.error) {
                toast.error(state.error);
            } else if (state.success) {
                toast.success("Inventory item updated successfully");
                router.push(`/dashboard/team/${team_id}/inventory`);
                router.refresh();
            }
        }
    }, [state, isPending, router, team_id]);

    return (
        <Card className='max-w-3xl'>
            <CardHeader>
                <CardTitle>Update Inventory Item</CardTitle>
                <CardDescription>Update the details for this inventory item.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <Form {...form}>
                    <form action={formAction} className="space-y-4 " >
                        <input type="hidden" name="id" value={inventoryItem.id} />
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
                                <Label htmlFor="purchase_date">Purchase Date</Label>
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
                                            selected={purchaseDate || undefined}
                                            onSelect={(date) => {
                                                setPurchaseDate(date!);
                                                if (date) {
                                                    form.setValue("purchase_date", format(date, "yyyy-MM-dd"));
                                                } else {
                                                    form.setValue("purchase_date", "");
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
                                            selected={expiryDate || undefined}
                                            onSelect={(date) => {
                                                setExpiryDate(date!);
                                                if (date) {
                                                    form.setValue("expiry_date", format(date, "yyyy-MM-dd"));
                                                } else {
                                                    form.setValue("expiry_date", "");
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
                                    </FormItem>
                                )}
                            />
                        </div>

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

                        <div className="flex justify-end space-x-3 mt-6">
                            <Button 
                                variant="outline" 
                                type="button"
                                onClick={() => router.push(`/dashboard/team/${team_id}/inventory`)}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isPending}>
                                {isPending ? <CircleDashed className="mr-2 h-4 w-4 animate-spin" /> : null}
                                Update Item
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

export default UpdateInventoryForm
