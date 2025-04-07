"use client";

import React, { useState } from 'react'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import { AddCropActivityForm } from './add-crop-activity-form';
import { useParams } from 'next/navigation';
import { Plus } from 'lucide-react';


interface AddCropActivityDialogProps {

  trigger?: React.ReactNode;
}

const AddCropActivityDialog = ({  trigger }: AddCropActivityDialogProps) => {

  const params = useParams()
  
    const cropId = params.crop_id as string
    const teamId = params.team_id as string

  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            {trigger || <Button className="btn btn-primary">
                <Plus className="mr-2 h-4 w-4" />
                Add Activity</Button>}
        </DialogTrigger>
        <DialogContent>
            <DialogTitle>Add Crop Activity</DialogTitle>
            <AddCropActivityForm 
              cropId={Number(cropId)} 
              teamId={teamId}
              onSuccess={() => setOpen(false)}
            />
        </DialogContent>
    </Dialog>
  )
}

export default AddCropActivityDialog