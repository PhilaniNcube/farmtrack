

import React, { ReactNode } from 'react'
import DashboardSidebar from './_components/dashbaord-sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { getUserFarms } from '@/lib/queries/farm-members'

const DashboardLayout = async ({ children }: { children: ReactNode }) => {

  const userFarms = await getUserFarms()

  return (
    <SidebarProvider className=''>
      <DashboardSidebar farms={userFarms}/>
      <div className="w-full">
        {children}
      </div>
    </SidebarProvider>
  )
}

export default DashboardLayout