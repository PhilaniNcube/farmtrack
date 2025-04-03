import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { getTeam } from '@/lib/queries/teams'
import React from 'react'

const TeamPage = async ({ params }: { params: Promise<{ team_id: string }> }) => {
  const { team_id } = await params

  const team = await getTeam(team_id)

  if (!team) {
    return (
      <div className='p-6'>
        <h1 className='text-2xl font-bold'>Team not found</h1>
      </div>
    )
  }

  return (
    <div className='p-6'>
     

    </div>
  )
}

export default TeamPage