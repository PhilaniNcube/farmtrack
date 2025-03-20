import { stackServerApp } from '@/stack'
import React from 'react'

const ProfilePage = async () => {

    const user = await stackServerApp.getUser()

    return (
        <main className="flex-1 p-4 md:p-6">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold tracking-tight">Profile</h1>
              
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {/* Add your profile components here */}
                <div className="bg-white shadow-md rounded-lg p-4">
                    <h2 className="text-lg font-semibold">User Information</h2>
                    {/* Add user information fields */}
                </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {/* Add your settings components here */}
                <div className="bg-white shadow-md rounded-lg p-4">
                    <h2 className="text-lg font-semibold">Settings</h2>
                    {/* Add settings fields */}
                </div>
            </div>
        </main>
    )
}

export default ProfilePage