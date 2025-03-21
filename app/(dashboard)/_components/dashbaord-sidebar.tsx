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

// Farm type definition
interface Farm {
    id: number
    name: string
    location?: string
    description?: string
    created_at: string
    updated_at: string
}

export function DashboardSidebar({farms}: { farms: UserFarms[] }) {
    const pathname = usePathname()
    const params = useParams()

    console.log("Params: ", params)

    const farmId = params.farmId as string
    const farmIdNum = parseInt(farmId)

    const [selectedFarm, setSelectedFarm] = useState<number | null>(farms[0]?.farm?.id || null)
    const router = useRouter()



    // Handle farm change
    const handleFarmChange = (farmId: string) => {
        setSelectedFarm(parseInt(farmId))
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
            href: `/dashboard/farms/${selectedFarm}/crops`,
            active: pathname === `/dashboard/farms/${selectedFarm}/crops` || pathname.startsWith(`/dashboard/farms/${selectedFarm}/crops`),
            subItems: [
                {
                    title: "Add Crop",
                    href:   `/dashboard/farms/${selectedFarm}/crops/add`,
                    active: pathname === `/dashboard/farms/${selectedFarm}/crops/add`
                }
            ]
        },
        {
            title: "Finances",
            icon: <PiggyBank />,
            href: `/dashboard/farms/${selectedFarm}/finances`,
            active: pathname === `/dashboard/farms/${selectedFarm}/finances` || pathname.startsWith(`/dashboard/farms/${selectedFarm}/finances`),
            subItems: [
                {
                    title: "Add Transaction",
                    href: `/dashboard/farms/${selectedFarm}/finances/add`,
                    active: pathname === `/dashboard/farms/${selectedFarm}/finances/add`
                }
            ]
        },
        {
            title: "Inventory",
            icon: <PackageIcon />,
            href: `/dashboard/farms/${selectedFarm}/inventory`,
            active: pathname === `/dashboard/farms/${selectedFarm}/inventory` || pathname.startsWith(`/dashboard/farms/${selectedFarm}/inventory`)
        },
        {
            title: "Livestock",
            icon: <Beef />,
            href: `/dashboard/farms/${selectedFarm}/livestock`,
            active: pathname === `/dashboard/farms/${selectedFarm}/livestock` || pathname.startsWith(`/dashboard/farms/${selectedFarm}/livestock`)
        },
        {
            title: "Reports",
            icon: <BarChart3 />,
            href: `/dashboard/farms/${selectedFarm}/reports`,
            active: pathname === `/dashboard/farms/${selectedFarm}/reports` || pathname.startsWith(`/dashboard/farms/${selectedFarm}/reports`)
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
                    <Select onValueChange={handleFarmChange} value={selectedFarm?.toString()} defaultValue={selectedFarm?.toString()}>
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
                        <SidebarMenuItem key={route.href}>
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
                                        <SidebarMenuSubItem key={subItem.href}>
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