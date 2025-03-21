"use client"

import { User } from '@/lib/schema'
import React, { useActionState, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { updateUserProfile } from '@/app/actions/users'
import { CircleDashed } from 'lucide-react'

const ProfileForm = ({ user }: { user: User }) => {

    const { toast } = useToast()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formData, setFormData] = useState({
        name: user.name || "",
        email: user.email || "",
        profileImageUrl: user.profile_image_url || "",
    })



    const [state, formAction, isPending] = useActionState(updateUserProfile, null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }



    const initials = user.name
        ? user.name
            .split(" ")
            .map((n: string) => n[0])
            .join("")
            .toUpperCase()
        : "U"

    return (
        <form action={formAction} className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                <Avatar className="w-16 h-16">
                    <AvatarImage src={formData.profileImageUrl} alt={user.name} />
                    <AvatarFallback className="text-lg">{initials}</AvatarFallback>
                </Avatar>


            </div>

            <div className="grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" name="name" required />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" required />
                </div>
            </div>

            <Button type="submit" disabled={isPending}>
                {isPending ? <CircleDashed className='animate-spin' /> : "Update Profile"}
            </Button>
        </form>
    )
}

export default ProfileForm