import { AddCropForm } from '@/components/add-crop-form'
import { getFieldLocations } from '@/lib/queries/field-locations'
import React from 'react'

const AddCropPage = async ({params}:{params:Promise<{team_id:string}>}) => {

    const { team_id } = await params
    const field_locations = await getFieldLocations(team_id)


  return (
    <div className='px-6'>
        <AddCropForm fields={field_locations} />
    </div>
  )
}

export default AddCropPage