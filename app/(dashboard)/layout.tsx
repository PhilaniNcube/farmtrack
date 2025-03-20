"use client"

import React, { ReactNode } from 'react'
import DashboardSidebar from './_components/dashbaord-sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <SidebarProvider className=''>
      <DashboardSidebar />
      <div className="w-full">
        {children}
      </div>
    </SidebarProvider>
  )
}

export default DashboardLayout