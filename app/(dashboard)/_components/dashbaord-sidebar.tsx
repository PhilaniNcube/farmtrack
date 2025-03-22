"use client"

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams, usePathname, useRouter } from 'next/navigation'
import {
    LayoutDashboard,
    Wheat,
    PiggyBank,
    PackageIcon,
    Beef,
    BarChart3,
    ChevronDown,
    UserCog,
    Settings
} from 'lucide-react'

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarProvider,
    SidebarTrigger,
    SidebarSeparator
} from '@/components/ui/sidebar'
import { UserButton } from '@stackframe/stack'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { UserFarms } from '@/lib/queries/farm-members'
import { useSelectedFarm } from '@/lib/stores/use-selected-farm'
import { init } from 'next/dist/compiled/webpack/webpack'



export function DashboardSidebar({farms}: { farms: UserFarms[] }) {
    const pathname = usePathname()

    const params = useParams()
    const farmParam = params.id as string



   
   
    const { farmId, setFarmId} = useSelectedFarm()
    const router = useRouter()





    // Handle farm change
    const handleFarmChange = (farmId: string) => {
        setFarmId(parseInt(farmId))
        if (farmId === "manage") {
            router.push("/dashboard/profile")
        } else {
            router.push(`/dashboard/farms/${farmId}`)
        }
    }

    const routes = [
        {
            title: "Dashboard",
            icon: <LayoutDashboard />,
            href: "/dashboard",
            active: pathname === "/dashboard"
        },
        {
            title: "Profile",
            icon: <UserCog />,
            href: "/dashboard/profile",
            active: pathname === "/dashboard/profile"
        },
        {
            title: "Crops",
            icon: <Wheat />,
            href: farmParam ? `/dashboard/farms/${farmId}/crops` : `/dashboard/profile`,
            active: pathname === `/dashboard/farms/${farmId}/crops` || pathname.startsWith(`/dashboard/farms/${farmId}/crops`),
            subItems: [
                {
                    title: "Add Crop",
                    href: farmParam ? `/dashboard/farms/${farmId}/crops/add` : `/dashboard/profile` ,
                    active: pathname === `/dashboard/farms/${farmId}/crops/add`
                }
            ]
        },
        {
            title: "Finances",
            icon: <PiggyBank />,
            href: farmParam ? `/dashboard/farms/${farmId}/finances` : `/dashboard/profile`,
            active: pathname === `/dashboard/farms/${farmId}/finances` || pathname.startsWith(`/dashboard/farms/${farmId}/finances`),
            subItems: [
                {
                    title: "Add Transaction",
                    href: farmParam ? `/dashboard/farms/${farmId}/finances/add` : `/dashboard/profile`,
                    active: pathname === `/dashboard/farms/${farmId}/finances/add`
                }
            ]
        },
        {
            title: "Inventory",
            icon: <PackageIcon />,
            href: farmParam ? `/dashboard/farms/${farmId}/inventory` : `/dashboard/profile`,
            active: pathname === `/dashboard/farms/${farmId}/inventory` || pathname.startsWith(`/dashboard/farms/${farmId}/inventory`)
        },
        {
            title: "Livestock",
            icon: <Beef />,
            href: farmParam ? `/dashboard/farms/${farmId}/livestock` : `/dashboard/profile`,
            active: pathname === `/dashboard/farms/${farmId}/livestock` || pathname.startsWith(`/dashboard/farms/${farmId}/livestock`)
        },
        {
            title: "Reports",
            icon: <BarChart3 />,
            href: farmParam ? `/dashboard/farms/${farmId}/reports` : `/dashboard/profile`,
            active: pathname === `/dashboard/farms/${farmId}/reports` || pathname.startsWith(`/dashboard/farms/${farmId}/reports`)
        }
    ]


    return (

        <Sidebar>
            <SidebarHeader className="flex items-center justify-between">
                <Link href="/dashboard" className="flex items-center gap-2 px-2">
                    <h1 className="text-xl font-bold">FarmTrack</h1>
                </Link>
                {/* <SidebarTrigger /> */}
            </SidebarHeader>
            <SidebarContent>
                {/* Farm Selector Dropdown */}
                <div className="px-2 pb-2 mt-4">
                    <Select onValueChange={handleFarmChange} value={farmId?.toString()} defaultValue={farmId?.toString()}>
                        <SelectTrigger className="w-full bg-sidebar-accent/10 border-sidebar-border">
                            <SelectValue placeholder="Select a farm" />
                        </SelectTrigger>
                        <SelectContent>
                            {farms.length > 0 && farms.map((farm) => (
                                <SelectItem key={farm.farm?.id} value={farm.farm?.id.toString()!}>
                                    {farm.farm?.name}
                                </SelectItem>
                            ))}
                            <SidebarSeparator />
                            <SelectItem value="manage">
                                <Link href="/dashboard/profile" className="flex w-full">Manage Farms</Link>
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                
                <SidebarMenu>
                    {routes.map((route) => (
                        <SidebarMenuItem key={route.title}>
                            <SidebarMenuButton
                                asChild
                                isActive={route.active}
                                tooltip={route.title}
                            >
                                <Link href={route.href}>
                                    {route.icon}
                                    <span>{route.title}</span>
                                </Link>
                            </SidebarMenuButton>

                            {route.subItems && route.subItems.length > 0 && (
                                <SidebarMenuSub>
                                    {route.subItems.map((subItem) => (
                                        <SidebarMenuSubItem key={subItem.title}>
                                            <SidebarMenuSubButton
                                                asChild
                                                isActive={subItem.active}
                                            >
                                                <Link href={subItem.href}>
                                                    <span>{subItem.title}</span>
                                                </Link>
                                            </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                    ))}
                                </SidebarMenuSub>
                            )}
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                   
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            tooltip="Help"
                        >
                            <UserButton />
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>

    )
}

export default DashboardSidebar