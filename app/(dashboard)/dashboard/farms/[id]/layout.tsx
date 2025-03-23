import { isFarmMember } from '@/lib/queries/farm-members'
import React, { ReactNode } from 'react'

const FarmLayout = async ({children, params}:{children:ReactNode, params:Promise<{id:string}>}) => {

    const { id } = await params

     const isMember = await isFarmMember(Number(id))
    if (!isMember) {
      return (
        <div>
          <h1>You are not a member of this farm.</h1>
        </div>
      )
    }

  return (
    <div>{children}</div>
  )
}

export default FarmLayout