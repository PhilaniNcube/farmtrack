"use client";

import { incrementLivestockCount } from "@/app/actions/livestock";
import { Button } from "@/components/ui/button";
import { Livestock, livestock } from "@/lib/schema";
import { CircleDashed, Plus } from "lucide-react";
import { useParams } from "next/navigation";

import React, { useTransition } from 'react'

const AddAnimalsCount = ({livestock}:{livestock:Livestock}) => {

    const params = useParams()
    const livestock_id = params.livestock_id as string
    const [isPending, startTransition] = useTransition()

    return (
        <Button onClick={() => {
            startTransition(() => {
              
                incrementLivestockCount(livestock, 1)
            })
        }} variant="outline" size="sm">
            {isPending ? <CircleDashed className="mr-2 h-4 w-4 animate-spin" /> : <Plus className="mr-2 h-4 w-4" />}

            Add Animals
        </Button>
    )
}

export default AddAnimalsCount