import AddLivestockForm from '@/components/add-livestock-form'
import { getFieldLocations } from '@/lib/queries/field-locations'
import { fieldLocations } from '@/lib/schema'
import React from 'react'

const AddLivestockPage = async ({params}: {params:Promise<{id:string}>}) => {

    const farmId = (await params).id
    const farmIdNumber = Number(farmId)

  const locations = await getFieldLocations(farmIdNumber)

  return (
    <div className="p-6">
        <AddLivestockForm locations={locations} />
    </div>
  )
}

export default AddLivestockPage