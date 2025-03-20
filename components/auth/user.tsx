
import { stackServerApp } from '@/stack'
import { UserButton } from '@stackframe/stack'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import { LucideLogIn, UserPlus } from 'lucide-react'

const UserComponent = async () => {

    const user = await stackServerApp.getUser()


    return (
        <div>
            {user ? 
        (
        <div className='flex items-center gap-x-4'>
  
            <Link href="/dashboard">
                <Button variant="ghost" size="sm" className="hidden sm:flex gap-1">
                    <LucideLogIn className="h-4 w-4" />
                    Dashboard
                </Button>
                <Button variant="ghost" size="icon" className="sm:hidden">
                    <LucideLogIn className="h-4 w-4" />
                    <span className="sr-only">Dashboard</span>
                </Button>
            </Link>      <UserButton />
        </div>
        ) :
        
        (<div className="flex items-center gap-x-4">
            <Link href="/sign-in">
                            <Button variant="ghost" size="sm" className="hidden sm:flex gap-1">
                                <LucideLogIn className="h-4 w-4" />
                                Sign In
                            </Button>
                            <Button variant="ghost" size="icon" className="sm:hidden">
                                <LucideLogIn className="h-4 w-4" />
                                <span className="sr-only">Sign In</span>
                            </Button>
                        </Link>
                        <Link href="/sign-up">
                            <Button variant="default" size="sm" className="hidden sm:flex gap-1">
                                <UserPlus className="h-4 w-4" />
                                Sign Up
                            </Button>
                            <Button variant="default" size="icon" className="sm:hidden">
                                <UserPlus className="h-4 w-4" />
                                <span className="sr-only">Sign Up</span>
                            </Button>
                        </Link>
        </div>
        )
        }
            
        </div>
    )
}

export default UserComponent