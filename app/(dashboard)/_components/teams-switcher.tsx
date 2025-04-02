"use client"

import React, { useState } from 'react'
import { useUser } from '@stackframe/stack'
import { Check, ChevronDown } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const TeamsSwitcher = () => {
  const router = useRouter()
  const user = useUser({ or: 'redirect' })
  const teams = user.useTeams()
  const [open, setOpen] = useState(false)

  const params = useParams()

    const team_id = params.team_id as string

  const currentTeamId = team_id ? team_id : null

  // Find the current team object based on the ID from URL
  const currentTeam = teams.find(team => team.id === currentTeamId)

  const handleTeamSelect = (teamId: string) => {
    setOpen(false)
    router.push(`/dashboard/team/${teamId}`)
  }

  // If no teams yet, show a button to create one
  if (teams.length === 0) {
    return (
      <Button 
        variant="outline" 
        className="w-full justify-start"
        onClick={() => router.push('/dashboard')}
      >
        Create a team
      </Button>
    )
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen} >
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          <div className="flex items-center gap-2 truncate">
            {currentTeam && (
              <Avatar className="h-6 w-6">
                <AvatarImage src={currentTeam.profileImageUrl || ''} />
                <AvatarFallback>
                  {currentTeam.displayName.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            )}
            <span className="truncate">
              {currentTeam ? currentTeam.displayName : 'Select a team'}
            </span>
          </div>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" defaultValue={currentTeam?.displayName} className="w-[200px]">
        {teams.map((team) => (
          <DropdownMenuItem
            key={team.id}
            className="flex items-center justify-between cursor-pointer"
            onClick={() => handleTeamSelect(team.id)}
          >
            <div className="flex items-center gap-2 truncate">
              <Avatar className="h-6 w-6">
                <AvatarImage src={team.profileImageUrl || ''} />
                <AvatarFallback>
                  {team.displayName.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="truncate">{team.displayName}</span>
            </div>
            {team.id === currentTeamId && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default TeamsSwitcher