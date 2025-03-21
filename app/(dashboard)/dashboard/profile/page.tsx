import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { stackServerApp } from '@/stack'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import React from 'react'
import ProfileForm from './profile-form'
import { getCurrentUser } from '@/lib/queries/users'

export const metadata: Metadata = {
    title: "Profile",
    description: "Manage your profile and farms",
}

const ProfilePage = async () => {

    const user = await stackServerApp.getUser()

    if (!user) {
        redirect("/sign-in")
    }

    const userProfile = await getCurrentUser()

    console.log("userProfile", userProfile)



    return (
        <div className="container mx-auto py-6 space-y-8">
            <div className="flex flex-col px-6 gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
                <p className="text-muted-foreground">Manage your account settings and view farms you are part of.</p>
            </div>

            <Separator />
            <div className='px-6'>
                <Tabs defaultValue="profile" className="w-full">
                    <TabsList className="grid w-full md:w-auto grid-cols-2 md:inline-flex">
                        <TabsTrigger value="profile">Profile</TabsTrigger>
                        <TabsTrigger value="farms">Farms</TabsTrigger>
                    </TabsList>

                    <TabsContent value="profile" className="mt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Profile Information</CardTitle>
                                <CardDescription>Update your profile information and email address.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {userProfile && (
                                    <ProfileForm user={userProfile} />
                                )}
                               
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>


        </div>
    )
}

export default ProfilePage