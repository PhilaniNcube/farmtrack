
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

} from '@/components/ui/sidebar'
import { UserButton } from '@stackframe/stack'


import SidebarSideMenuItems from './sidebar-menu'
import { Separator } from '@/components/ui/separator'






export async function DashboardSidebar() {

 

 

    return (
        
        <Sidebar>
            <SidebarHeader className="flex items-center justify-between">
                <Link href="/dashboard" className="flex items-center w-full gap-2 px-2">
                    <h1 className="text-xl font-bold text-left">FarmTrack</h1>
                </Link>
                {/* <SidebarTrigger /> */}
            </SidebarHeader>
            <Separator className="mb-2" />
           <SidebarSideMenuItems  />
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