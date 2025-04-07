"use client";

import React, { useState } from 'react'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import { AddCropActivityForm } from './add-crop-activity-form';


interface AddCropActivityDialogProps {
  cropId: number;
  teamId: string;
  trigger?: React.ReactNode;
}

const AddCropActivityDialog = ({ cropId, teamId, trigger }: AddCropActivityDialogProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            {trigger || <Button className="btn btn-primary">Add Activity</Button>}
        </DialogTrigger>
        <DialogContent>
            <DialogTitle>Add Crop Activity</DialogTitle>
            <AddCropActivityForm 
              cropId={cropId} 
              teamId={teamId}
              onSuccess={() => setOpen(false)}
            />
        </DialogContent>
    </Dialog>
  )
}

export default AddCropActivityDialog