
import React from 'react'
import Link from 'next/link'


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
    SidebarSeparator
} from '@/components/ui/sidebar'
import { UserButton } from '@stackframe/stack'

import { getUserFarms, UserFarms } from '@/lib/queries/farm-members'

import SidebarSideMenuItems from './sidebar-menu'




export async function DashboardSidebar() {

    const userFarms = await getUserFarms()

    return (
        
        <Sidebar>
            <SidebarHeader className="flex items-center justify-between">
                <Link href="/dashboard" className="flex items-center gap-2 px-2">
                    <h1 className="text-xl font-bold">FarmTrack</h1>
                </Link>
                {/* <SidebarTrigger /> */}
            </SidebarHeader>
           <SidebarSideMenuItems farms={userFarms} />
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