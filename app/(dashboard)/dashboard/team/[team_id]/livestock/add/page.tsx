import AddInventoryForm from '@/components/add-inventory-form'
import AddLivestockForm from '@/components/add-livestock-form'
import { getCachedFieldLocations, getFieldLocations } from '@/lib/queries/field-locations'
import React from 'react'

const AddLivestockPage = async ({params}:{params:Promise<{team_id:string}>}) => {

  const { team_id } = await params
  const locationsData = getCachedFieldLocations(team_id)

  const [locations] = await Promise.all([
    locationsData,
  ])

  return (
    <div className="p-6">
      <AddLivestockForm locations={locations} />
    </div>
  )
}

export default AddLivestockPage