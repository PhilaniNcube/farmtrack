"use client"

import { User } from '@/lib/schema'
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { updateUserProfile } from '@/app/actions/users'

const ProfileForm = ({ user }: { user: User }) => {

    const { toast } = useToast()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formData, setFormData] = useState({
        name: user.name || "",
        email: user.email || "",
        profileImageUrl: user.profile_image_url || "",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        const formDataObj = new FormData()
        formDataObj.append("name", formData.name)
        formDataObj.append("email", formData.email)
        formDataObj.append("profileImageUrl", formData.profileImageUrl)

        const result = await updateUserProfile(formDataObj)

        if (result.error) {
            toast({
                title: "Error",
                description: result.error,
                variant: "destructive",
            })
        } else if (result.success) {
            toast({
                title: "Success",
                description: result.success,
            })
        }

        setIsSubmitting(false)
    }

    const initials = user.name
        ? user.name
            .split(" ")
            .map((n: string) => n[0])
            .join("")
            .toUpperCase()
        : "U"

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                <Avatar className="w-20 h-20">
                    <AvatarImage src={formData.profileImageUrl} alt={user.name} />
                    <AvatarFallback className="text-lg">{initials}</AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-4">
                    <div className="grid gap-2">
                        <Label htmlFor="profileImageUrl">Profile Image URL</Label>
                        <Input
                            id="profileImageUrl"
                            name="profileImageUrl"
                            value={formData.profileImageUrl}
                            onChange={handleChange}
                            placeholder="https://example.com/avatar.jpg"
                        />
                    </div>
                </div>
            </div>

            <div className="grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                </div>
            </div>

            <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Updating..." : "Update Profile"}
            </Button>
        </form>
    )
}

export default ProfileForm