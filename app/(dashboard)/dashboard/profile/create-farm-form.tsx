"use client"

import type React from "react"

import { useActionState, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { createFarm } from "@/app/actions/farms"
import { CircleDashed } from "lucide-react"

export function CreateFarmForm() {
    const { toast } = useToast()
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        location: "",
        description: "",
    })

    const [state, formAction, isPending] = useActionState(createFarm, null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }



    return (
        <form action={formAction} className="space-y-4">
            <div className="grid gap-2">
                <Label htmlFor="name">Farm Name *</Label>
                <Input
                    id="name"
                    name="name"

                    placeholder="Enter farm name"
                    required
                />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="location">Location</Label>
                <Input
                    id="location"
                    name="location"

                    placeholder="City, State, Country"
                />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                    id="description"
                    name="description"

                    placeholder="Describe your farm..."
                    rows={4}
                />
            </div>

            <Button type="submit" disabled={isPending}>
                {isPending ? <CircleDashed className='animate-spin' /> : "Create Farm"}
            </Button>
        </form>
    )
}

