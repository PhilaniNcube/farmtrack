"use client";

import React from 'react'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import { AddCropForm } from './add-crop-form';
import { FieldLocation } from '@/lib/schema';

const AddCropDialog = ({locations}:{locations:FieldLocation[]}) => {
  return (
    <Dialog>
        <DialogTrigger asChild>
            <Button className="btn btn-primary">Add Crop</Button>
        </DialogTrigger>
        <DialogContent>
            <DialogTitle></DialogTitle>
            <AddCropForm fields={locations} />
        </DialogContent>
    </Dialog>
  )
}

export default AddCropDialog