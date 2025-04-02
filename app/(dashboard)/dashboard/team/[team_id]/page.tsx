import React from 'react'

const TeamPage = async ({params}: {params: Promise<{team_id:string}>}) => {
    const { team_id } = await params

   console.log("Team ID", team_id)      

  return (
    <div className='p-6'>TeamPage</div>
  )
}

export default TeamPage