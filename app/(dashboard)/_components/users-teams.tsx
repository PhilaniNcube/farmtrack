"use client";

import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useUser } from '@stackframe/stack';
import { formatDistanceToNow } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

const UsersTeams = () => {

    const user = useUser()
    const allTeams = user?.useTeams()

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {allTeams?.map((farm) => (
            <Card key={farm.id} className="overflow-hidden flex flex-col justify-between">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl">{farm.displayName}</CardTitle>

              </CardHeader>

              <CardFooter className="flex flex-col items-start  justify-end gap-2 border-t pt-3">
                
                <Link
                  href={`/dashboard/team/${farm.id}`}
                  className="text-sm font-medium bg-green-600 text-white *:hover:bg-green-700 rounded-md px-3 py-1.5 transition-colors duration-200 mt-3"
                >
                  View Farm
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
  )
}

export default UsersTeams