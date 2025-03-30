"use client"

import type React from "react"

import { useActionState, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { CheckCircle2, CircleDashed } from "lucide-react"
import { acceptInvitation } from "@/app/actions/accept-invitation"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export default function AcceptInviteForm() {

  const searchParams = useSearchParams()
  const email = searchParams.get("email")
  const farm_id = searchParams.get("farm_id")
  const sender = searchParams.get("sender")



  const [state, formAction, isPending] = useActionState(acceptInvitation, null)



  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Accept Invitation</CardTitle>
        <CardDescription>
          You've been invited to join the Farming Application team. Please fill in your details to accept.
        </CardDescription>
      </CardHeader>
      <form action={formAction}>
        <Input type="hidden" name="sender" value={sender!} />  
        <Input type="hidden" name="farm_id" value={farm_id!} />
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" name="name" placeholder="Enter your full name" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" name="email" defaultValue={email || ""} placeholder="Enter your email address" required />
          </div>

          {/* <div className="space-y-2">
            <Label htmlFor="password">Create Password</Label>
            <Input id="password" type="password" name="password" placeholder="Create a secure password" required />
          </div> */}

          <div className="flex items-center space-x-2 pt-2">
            <Checkbox id="terms" required />
            <Label htmlFor="terms" className="text-sm font-normal">
              I agree to the terms of service and privacy policy
            </Label>
          </div>
        </CardContent>

        <CardFooter>
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? <CircleDashed className="animate-spin" /> : "Accept Invitation"}
          </Button>
        </CardFooter>
      </form>

      {state?.success === true && (
        <div className="flex items-center justify-center mt-4 text-green-500">
          <span className="text-sm">Invitation accepted successfully!</span>
        </div>
      )}
    </Card>
  )
}

