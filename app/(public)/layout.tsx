import Link from "next/link"
import React, { ReactNode } from 'react'
import { Button } from "@/components/ui/button"
import { LucideLogIn, UserPlus } from "lucide-react"
import UserComponent from "@/components/auth/user"

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

                    <div className="flex items-center gap-x-4">
                        <UserComponent />
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