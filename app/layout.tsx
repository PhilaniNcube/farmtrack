import type React from "react"
import { StackProvider, StackTheme } from "@stackframe/stack";
import { stackServerApp } from "../stack";
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"


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
      <body className={inter.className}><StackProvider app={stackServerApp}><StackTheme>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen flex-col container mx-auto">

            {children}
          </div>
        </ThemeProvider>
      </StackTheme></StackProvider></body>
    </html>
  )
}



import './globals.css'