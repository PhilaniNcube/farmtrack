import Link from "next/link"
import React, { ReactNode } from 'react'
import { Button } from "@/components/ui/button"
import { LucideLogIn, UserPlus } from "lucide-react"

const PublicLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="min-h-screen flex flex-col">
            <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container mx-auto flex h-14 items-center justify-between">
                    <div>
                        <Link href="/" className="flex items-center space-x-2">
                            <span className="font-bold inline-block">
                                Farm<span className="text-green-600">Track</span>
                            </span>
                        </Link>
                    </div>
                    
                    <div className="flex items-center gap-4">
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
                </div>
            </header>
            <main className="flex-1">
                {children}
            </main>
        </div>
    )
}

export default PublicLayout