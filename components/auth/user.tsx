import { stackServerApp } from '@/stack'
import { UserButton } from '@stackframe/stack'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import { LucideLogIn, UserPlus } from 'lucide-react'
import { db } from '@/lib/db';
import { users } from '@/lib/schema/users';
import { eq } from 'drizzle-orm';

const UserComponent = async () => {
    const user = await stackServerApp.getUser();

    if (user !== null) {
        // Check if the user exists in the database
        const existingUser = await db.select().from(users).where(eq(users.id, user.id)).limit(1);

        if (existingUser.length === 0) {
            // Insert the user into the database if they don't exist
            await db.insert(users).values({
                id: user.id,
                email: user.primaryEmail!,
                name: user.displayName || 'Anonymous',
                profile_image_url: user.profileImageUrl || '', // Ensure profile_image_url is always a string
                is_active: true,
                role: 'user', // Default role, you can change this based on your logic
                last_login: new Date(),
                created_at: new Date(),
                updated_at: new Date(),
            })
        } else {
            // Update the last login time for the existing user
            await db.update(users).set({ last_login: new Date() }).where(eq(users.id, user.id));
        }
    }

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
                        </Link>
                        <UserButton />
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