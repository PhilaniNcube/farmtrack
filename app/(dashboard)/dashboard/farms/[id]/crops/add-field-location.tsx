"use client";

import { addFieldLocation } from '@/app/actions/field-locations';
import { FieldLocationSchema } from '@/lib/schema';
import React, { useActionState } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CircleDashed } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const AddFieldLocation = ({ farmId }: { farmId: number }) => {

    const [state, formAction, isPending] = useActionState(addFieldLocation, null)

    // setup react-hook-form

    const form = useForm<z.infer<typeof FieldLocationSchema>>({
        resolver: zodResolver(FieldLocationSchema),
        defaultValues: {
            farm_id: farmId,
            name: "",
            description: "",
        }
    })

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button  className="bg-green-700 hover:bg-green-800 text-white">
                    Add Field Location
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Field Location</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form action={formAction}>
                        <FormField
                            control={form.control}
                            name="farm_id"
                            render={({ field }) => (
                                <FormItem>

                                    <FormControl>
                                        <Input type="hidden" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                            <FormField
                            control={form.control}
                            name="name"
                            
                            render={({ field }) => (
                                <FormItem className='mb-4'>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="" {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Input placeholder="" {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Separator className="my-4" />
                        <Button className='w-full' type="submit" disabled={isPending}>
                            {isPending ? <CircleDashed className="animate-spin" /> : "Add"}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default AddFieldLocation