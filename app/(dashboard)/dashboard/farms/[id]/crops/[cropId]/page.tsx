import React from 'react'

const CropPage = async ({params}:{params:Promise<{id:number, cropId:number}>}) => {

    const { id, cropId } = await params

 

  return (
    <div>CropPage</div>
  )
}

export default CropPage