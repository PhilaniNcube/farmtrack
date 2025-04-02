"use client";

import { SidebarContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, SidebarSeparator } from '@/components/ui/sidebar';
import { useSelectedFarm } from '@/lib/stores/use-selected-farm';
import { Beef, LayoutDashboard, PackageIcon, PiggyBank, UserCog, Wheat } from 'lucide-react';
import Link from 'next/link';
import { useParams, usePathname, useRouter } from 'next/navigation';
import React from 'react'
import { useUser } from '@stackframe/stack';
import TeamsSwitcher from './teams-switcher';

const SidebarSideMenuItems = () => {
    const pathname = usePathname()
    const params = useParams()
    const team_id = params.team_id as string
    const router = useRouter()
    const user = useUser({ or: 'redirect' });

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
            href: `/dashboard/team/${team_id}/crops`,
            active: pathname === `/dashboard/team/${team_id}/crops` || pathname.startsWith(`/dashboard/team/${team_id}/crops`),
            subItems: [
                {
                    title: "Add Crop",
                    href: `/dashboard/team/${team_id}/crops/add`,
                    active: pathname === `/dashboard/team/${team_id}/crops/add`
                }
            ]
        },
        {
            title: "Finances",
            icon: <PiggyBank />,
            href: `/dashboard/team/${team_id}/finances`,
            active: pathname === `/dashboard/team/${team_id}/finances` || pathname.startsWith(`/dashboard/team/${team_id}/finances`),
            subItems: [
                {
                    title: "Add Transaction",
                    href: `/dashboard/team/${team_id}/finances/add`,
                    active: pathname === `/dashboard/team/${team_id}/finances/add`
                }
            ]
        },
        {
            title: "Inventory",
            icon: <PackageIcon />,
            href: `/dashboard/team/${team_id}/inventory`,
            active: pathname === `/dashboard/team/${team_id}/inventory` || pathname.startsWith(`/dashboard/team/${team_id}/inventory`)
        },
        {
            title: "Livestock",
            icon: <Beef />,
            href: `/dashboard/team/${team_id}/livestock`,
            active: pathname === `/dashboard/team/${team_id}/livestock` || pathname.startsWith(`/dashboard/team/${team_id}/livestock`)
        },
    ]

    const { farmId, setFarmId } = useSelectedFarm()

    return (
        <SidebarContent>
            {/* Team Selector */}
            <div className="px-2 py-4">
               <TeamsSwitcher />
            </div>
            
            <SidebarSeparator />

            <SidebarMenu>
                {team_id !== undefined && (routes.map((route) => (
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
                )))}
            </SidebarMenu>
        </SidebarContent>
    )
}

export default SidebarSideMenuItems