"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SidebarContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, SidebarSeparator } from '@/components/ui/sidebar';
import { fetcher } from '@/lib/fetchers';
import { UserFarms } from '@/lib/queries/farm-members';
import { useSelectedFarm } from '@/lib/stores/use-selected-farm';
import { Beef, LayoutDashboard, PackageIcon, PiggyBank, UserCog, Wheat } from 'lucide-react';
import Link from 'next/link';
import { useParams, usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react'


const SidebarSideMenuItems = ({farms}: { farms: UserFarms[] }) => {

        const pathname = usePathname()
    
        console.log(pathname)
    
        const params = useParams()
        const farmParam = params.id as string

        const { farmId, setFarmId} = useSelectedFarm()
 
        const router = useRouter()

 
    
        useEffect(() => {
            // if farmId is null, set it to the first farm id in the list
            if (farmId === null && farms.length > 0) {
                // Check if farm id exists before setting it
                const firstFarmId = farms[0].farm?.id;
                if (firstFarmId !== undefined) {
                    setFarmId(firstFarmId);
                }
            } else if (farmId !== null && farmParam !== undefined) {
                const parsedFarmId = parseInt(farmParam);
                // Check if parsing was successful
                if (!isNaN(parsedFarmId)) {
                    setFarmId(parsedFarmId);
                }
            }
        }, [farmId, farms, farmParam, setFarmId]);
    
    
    
        // Handle farm change
        const handleFarmChange = (farmId: string) => {
            setFarmId(parseIntteam_id)
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
                href:  `/dashboard/farms/${farmId}/crops` ,
                active: pathname === `/dashboard/farms/${farmId}/crops` || pathname.startsWith(`/dashboard/farms/${farmId}/crops`),
                subItems: [
                    {
                        title: "Add Crop",
                        href:  `/dashboard/farms/${farmId}/crops/add` ,
                        active: pathname === `/dashboard/farms/${farmId}/crops/add`
                    }
                ]
            },
            {
                title: "Finances",
                icon: <PiggyBank />,
                href: `/dashboard/farms/${farmId}/finances` ,
                active: pathname === `/dashboard/farms/${farmId}/finances` || pathname.startsWith(`/dashboard/farms/${farmId}/finances`),
                subItems: [
                    {
                        title: "Add Transaction",
                        href: `/dashboard/farms/${farmId}/finances/add` ,
                        active: pathname === `/dashboard/farms/${farmId}/finances/add`
                    }
                ]
            },
            {
                title: "Inventory",
                icon: <PackageIcon />,
                href: `/dashboard/farms/${farmId}/inventory` ,
                active: pathname === `/dashboard/farms/${farmId}/inventory` || pathname.startsWith(`/dashboard/farms/${farmId}/inventory`)
            },
            {
                title: "Livestock",
                icon: <Beef />,
                href: `/dashboard/farms/${farmId}/livestock` ,
                active: pathname === `/dashboard/farms/${farmId}/livestock` || pathname.startsWith(`/dashboard/farms/${farmId}/livestock`)
            },
      
        ]


  return (
    <SidebarContent>
    {/* Farm Selector Dropdown */}
    <div className="px-2 pb-2 mt-4">
        <Select onValueChange={handleFarmChange} defaultValue={farmId?.toString()}>
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
                    <Link prefetch={true} href="/dashboard/profile" className="flex w-full">Manage Farms</Link>
                </SelectItem>
            </SelectContent>
        </Select>
    </div>
    
    <SidebarMenu>

        {farmId === null ? (
            <SidebarMenuItem>
                <SidebarMenuButton
                    asChild
                    tooltip="Select a farm"
                >
                    <Link href="/dashboard/profile">
                        <span>Select a farm</span>
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
        ) : routes.map((route) => (
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
  )
}

export default SidebarSideMenuItems