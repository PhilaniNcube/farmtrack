"use client"

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
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
    SidebarTrigger
} from '@/components/ui/sidebar'

export function DashboardSidebar() {
    const pathname = usePathname()

    const routes = [
        {
            title: "Dashboard",
            icon: <LayoutDashboard />,
            href: "/dashboard",
            active: pathname === "/dashboard"
        },
        {
            title: "Crops",
            icon: <Wheat />,
            href: "/dashboard/crops",
            active: pathname === "/dashboard/crops" || pathname.startsWith("/dashboard/crops/"),
            subItems: [
                {
                    title: "Add Crop",
                    href: "/dashboard/crops/add",
                    active: pathname === "/dashboard/crops/add"
                }
            ]
        },
        {
            title: "Finances",
            icon: <PiggyBank />,
            href: "/dashboard/finances",
            active: pathname === "/dashboard/finances" || pathname.startsWith("/dashboard/finances/"),
            subItems: [
                {
                    title: "Add Transaction",
                    href: "/dashboard/finances/add",
                    active: pathname === "/dashboard/finances/add"
                }
            ]
        },
        {
            title: "Inventory",
            icon: <PackageIcon />,
            href: "/dashboard/inventory",
            active: pathname === "/dashboard/inventory" || pathname.startsWith("/dashboard/inventory/")
        },
        {
            title: "Livestock",
            icon: <Beef />,
            href: "/dashboard/livestock",
            active: pathname === "/dashboard/livestock" || pathname.startsWith("/dashboard/livestock/")
        },
        {
            title: "Reports",
            icon: <BarChart3 />,
            href: "/dashboard/reports",
            active: pathname === "/dashboard/reports" || pathname.startsWith("/dashboard/reports/")
        }
    ]

    const settingsRoutes = [
        {
            title: "Profile",
            icon: <UserCog />,
            href: "/dashboard/profile",
            active: pathname === "/dashboard/profile"
        },
        {
            title: "Settings",
            icon: <Settings />,
            href: "/dashboard/settings",
            active: pathname === "/dashboard/settings"
        }
    ]

    return (

        <Sidebar>
            <SidebarHeader className="flex items-center justify-between">
                <Link href="/dashboard" className="flex items-center gap-2 px-2">
                    <h1 className="text-xl font-bold">FarmTrack</h1>
                </Link>
                <SidebarTrigger />
            </SidebarHeader>
            <SidebarContent>
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
                    {settingsRoutes.map((route) => (
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
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>

    )
}

export default DashboardSidebar