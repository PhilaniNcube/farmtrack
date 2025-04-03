import { Separator } from '@/components/ui/separator'
import { getTeam } from '@/lib/queries/teams'
import React, { ReactNode } from 'react'

const layout = async ({ children, params }: { children: ReactNode, params: Promise<{ team_id: string }> }) => {

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
        <div>
            <section className="flex items-center justify-between">
                <div className='px-6 py-2'>
                    <h1 className='text-2xl font-bold'>{team.displayName}</h1>
                </div>
            </section>
            <Separator />
            {children}
        </div>)
}

export default layout