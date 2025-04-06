import { Button } from '@/components/ui/button'
import React from 'react'
import { CropsHeader } from './_components/crops-header'
import { CropsSummary } from './_components/crops-summary'
import { getCrops } from '@/lib/queries/crops'


const CropsPage = async ({params}:{params:Promise<{team_id:string}>}) => {

  const { team_id } = await params

  const cropsData =  getCrops(team_id)

  const [crops] = await Promise.all([
    cropsData,
  ])

  return (
    <div className='p-6'>
      <CropsHeader team_id={team_id} />
      <CropsSummary crops={crops} />
    </div>
  )
}

export default CropsPage