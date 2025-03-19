import type React from "react"
import { Inter } from "next/font/google"
import Link from "next/link"
import { Bell, Menu, User } from "lucide-react"

import { ThemeProvider } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { MainNav } from "@/components/main-nav"

import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "FarmTrack - Small Scale Farming Management",
  description: "Track your farming inputs, costs, crops, and livestock",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen flex-col">
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="container flex h-14 items-center">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="mr-2 md:hidden">
                      <Menu className="h-5 w-5" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="pr-0">
                    <MainNav className="flex flex-col items-start" />
                  </SheetContent>
                </Sheet>
                <Link href="/" className="mr-6 flex items-center space-x-2">
                  <span className="font-bold inline-block">
                    Farm<span className="text-green-600">Track</span>
                  </span>
                </Link>
                <MainNav className="hidden md:flex" />
                <div className="flex flex-1 items-center justify-end space-x-2">
                  <div className="w-full flex-1 md:w-auto md:flex-none">
                    <Button variant="outline" size="icon" className="mr-2">
                      <Bell className="h-5 w-5" />
                      <span className="sr-only">Notifications</span>
                    </Button>
                  </div>
                  <Button variant="outline" size="icon">
                    <User className="h-5 w-5" />
                    <span className="sr-only">User</span>
                  </Button>
                </div>
              </div>
            </header>
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'