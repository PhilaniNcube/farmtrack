import { Suspense } from "react"
import { Download, BarChart3, PieChart, LineChart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"

export default function ReportsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 p-4 md:p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold tracking-tight">Reports & Analytics</h1>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <Select defaultValue="2025">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2025">2025</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="crops">Crops</SelectItem>
              <SelectItem value="livestock">Livestock</SelectItem>
              <SelectItem value="finances">Finances</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Tabs defaultValue="overview" className="mb-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="crops">Crop Reports</TabsTrigger>
            <TabsTrigger value="livestock">Livestock Reports</TabsTrigger>
            <TabsTrigger value="finances">Financial Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Crop Yield Trends</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="h-[200px]">
                    <Suspense fallback={<Skeleton className="h-[200px] w-full" />}>
                      {/* Crop Yield Chart Component would go here */}
                      <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
                        Crop yield visualization
                      </div>
                    </Suspense>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Livestock Production</CardTitle>
                  <LineChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="h-[200px]">
                    <Suspense fallback={<Skeleton className="h-[200px] w-full" />}>
                      {/* Livestock Production Chart Component would go here */}
                      <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
                        Livestock production visualization
                      </div>
                    </Suspense>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Expense Breakdown</CardTitle>
                  <PieChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="h-[200px]">
                    <Suspense fallback={<Skeleton className="h-[200px] w-full" />}>
                      {/* Expense Breakdown Chart Component would go here */}
                      <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
                        Expense breakdown visualization
                      </div>
                    </Suspense>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Annual Performance Summary</CardTitle>
                <CardDescription>Overview of your farm's performance for the current year</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <Suspense fallback={<Skeleton className="h-[350px] w-full" />}>
                    {/* Annual Performance Chart Component would go here */}
                    <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
                      Annual performance visualization
                    </div>
                  </Suspense>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="crops" className="mt-4">
            <Card>
              <CardContent className="pt-6">
                <p>Your crop reports will appear here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="livestock" className="mt-4">
            <Card>
              <CardContent className="pt-6">
                <p>Your livestock reports will appear here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="finances" className="mt-4">
            <Card>
              <CardContent className="pt-6">
                <p>Your financial reports will appear here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

