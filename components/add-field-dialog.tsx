"use client"

import React, { startTransition, useActionState, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'
import { Card, CardContent, CardFooter } from './ui/card'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { addFieldLocation } from '@/app/actions/field-locations'
import { PlusIcon, CircleDashed } from 'lucide-react'
import { useParams } from 'next/navigation'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { fieldLocations, FieldLocationSchema } from '@/lib/schema'
import { z } from 'zod'

const AddFieldDialog = () => {
  const params = useParams()
  const teamId = typeof params.team_id === 'string' ? params.team_id : ''
  const [open, setOpen] = useState(false)
  const [state, formAction, isPending] = useActionState(addFieldLocation, null)

  const form = useForm<z.infer<typeof FieldLocationSchema>>({
    resolver: zodResolver(FieldLocationSchema),
    defaultValues: {
      team_id: teamId,
      name: '',
      description: ''
    }
  })

  const onSubmit = (data: z.infer<typeof FieldLocationSchema>) => {
    const formData = new FormData()
    formData.append('team_id', data.team_id)
    formData.append('name', data.name)
    if (data.description) {
      formData.append('description', data.description)
    }
    startTransition(() => {
    formAction(formData)
    setOpen(false)
    form.reset()
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex gap-1 items-center bg-green-600 text-white">
          <PlusIcon className="h-4 w-4" />
          Add Field
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Field</DialogTitle>
          <DialogDescription>
            Create a new field location for your farm.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <input type="hidden" name="team_id" value={teamId} />
            
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Field Name</FormLabel>
                  <FormControl>
                    <Input placeholder="North Pasture" {...field} />
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
                  <FormLabel>Description (optional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="5 acres on the north side of the property..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isPending} className="bg-green-600 text-white">
                {isPending ? (
                  <>
                    <CircleDashed className="mr-2 h-4 w-4 animate-spin" />
                    Adding...
                  </>
                ) : (
                  'Add Field'
                )}
              </Button>
            </div>
            
            {state?.error && (
              <p className="text-sm text-red-500 mt-2">{state.error}</p>
            )}
            {state?.success && (
              <p className="text-sm text-green-500 mt-2">Field added successfully!</p>
            )}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default AddFieldDialog