"use client";

import { decrementLivestockCount, incrementLivestockCount } from "@/app/actions/livestock";
import { Button } from "@/components/ui/button";
import { Livestock, livestock } from "@/lib/schema";
import { CircleDashed, Minus, Plus } from "lucide-react";
import { useParams } from "next/navigation";

import React, { useTransition } from 'react'

const ReduceAnimalCount = ({livestock}:{livestock:Livestock}) => {

    const params = useParams()
    const livestock_id = params.livestock_id as string
    const [isPending, startTransition] = useTransition()

    return (
        <Button onClick={() => {
            startTransition(() => {
                
                decrementLivestockCount(livestock, 1)
            })
        }} variant="outline" size="sm">
            {isPending ? <CircleDashed className="mr-2 h-4 w-4 animate-spin" /> : <Minus className="mr-2 h-4 w-4" />}

            Remove Animals
        </Button>
    )
}

export default ReduceAnimalCount