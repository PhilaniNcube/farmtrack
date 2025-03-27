

import React, { ReactNode, Suspense } from 'react'
import DashboardSidebar from './_components/dashbaord-sidebar'
import { SidebarHeader, SidebarProvider } from '@/components/ui/sidebar'
import Link from 'next/link'
import { Skeleton } from '@/components/ui/skeleton'


const DashboardLayout = async ({ children }: { children: ReactNode }) => {



  return (
    <SidebarProvider className=''>
      <Suspense fallback={
        <div className="flex w-[17rem] h-[100dvh] bg-sidebar">
        <SidebarHeader className="w-[17rem] ">
                <Link href="/dashboard" className="flex justify-center  gap-2 px-2">
                    <h1 className="text-xl text-center font-bold">FarmTrack</h1>
                </Link>
                {/* <SidebarTrigger /> */}
            </SidebarHeader>
        <div className="flex items-center justify-center w-full h-full">
          <Skeleton className="w-full h-10 rounded-full my-2" />
          <Skeleton className="w-full h-10 rounded-full my-2" />
          <Skeleton className="w-full h-10 rounded-full my-2" />
        </div>
      </div>}>
      <DashboardSidebar />
      </Suspense>
      <div className="w-full">
        {children}
      </div>
    </SidebarProvider>
  )
}

export default DashboardLayout