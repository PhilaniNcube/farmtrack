import Link from "next/link"
import { ArrowRight, Leaf, DollarSign, MilkIcon as Cow } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-green-50 dark:bg-green-950">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Farm<span className="text-green-600">Track</span>
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Simplify your farm management. Track crops, livestock, inputs, and costs all in one place.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/dashboard">
                  <Button className="bg-green-600 hover:bg-green-700">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/about">
                  <Button variant="outline">Learn More</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <Card>
                <CardHeader>
                  <Leaf className="h-8 w-8 text-green-600" />
                  <CardTitle>Crop Management</CardTitle>
                  <CardDescription>Track planting dates, harvests, and yields for all your crops.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Record detailed information about your crops, including variety, planting date, fertilizer usage,
                    and harvest data.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="/crops">
                    <Button variant="outline" size="sm">
                      Manage Crops
                    </Button>
                  </Link>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <Cow className="h-8 w-8 text-green-600" />
                  <CardTitle>Livestock Tracking</CardTitle>
                  <CardDescription>Monitor your animals' health, feeding, and production.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Keep records of your livestock, including health treatments, feeding schedules, and production
                    metrics.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="/livestock">
                    <Button variant="outline" size="sm">
                      Track Livestock
                    </Button>
                  </Link>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <DollarSign className="h-8 w-8 text-green-600" />
                  <CardTitle>Financial Management</CardTitle>
                  <CardDescription>Track expenses, sales, and overall farm profitability.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Record all farm-related expenses and income to get a clear picture of your farm's financial health.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="/finances">
                    <Button variant="outline" size="sm">
                      Manage Finances
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full border-t bg-background py-6">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:gap-6">
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
              © 2025 FarmTrack. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

