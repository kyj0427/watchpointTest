"use client"

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { PlatformStats } from "@/components/statistics/platform-stats"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Flag, MessageSquare, Megaphone, Shield, TrendingUp, Star, ShoppingCart } from "lucide-react"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { ErrorMessage } from "@/components/ui/error-message"
import { DataStatus } from "@/components/ui/data-status"
import { useData } from "@/hooks/use-data"
import { api } from "@/lib/api"

export default function AdminDashboard() {
  const { data, loading, error, isUsingFallback, refetch } = useData(() => api.getDashboard())

  if (loading) {
    return (
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <DashboardHeader />
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <LoadingSpinner className="py-8" />
          </div>
        </SidebarInset>
      </SidebarProvider>
    )
  }

  if (error) {
    return (
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <DashboardHeader />
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <ErrorMessage message={error} onRetry={refetch} />
          </div>
        </SidebarInset>
      </SidebarProvider>
    )
  }

  const quickStats = data?.quickStats || [
    { title: "Total Users", value: "12,345", icon: "Users", color: "text-blue-500" },
    { title: "Active Reports", value: "23", icon: "Flag", color: "text-red-500" },
    { title: "Open Inquiries", value: "45", icon: "MessageSquare", color: "text-yellow-500" },
    { title: "Announcements", value: "8", icon: "Megaphone", color: "text-green-500" },
  ]

  const recentActivity = data?.recentActivity || [
    { message: "New user registered: ProGamer_KR", time: "2 minutes ago" },
    { message: "Report resolved: Inappropriate behavior", time: "5 minutes ago" },
    { message: "New inquiry submitted", time: "10 minutes ago" },
    { message: "System maintenance completed", time: "1 hour ago" },
  ]

  const recentMemberActivity = data?.recentMemberActivity || [
    { message: "User 'Tracer_Main' reached Grandmaster", time: "5 minutes ago" },
    { message: "New coaching session booked", time: "15 minutes ago" },
    { message: "Shop rotation updated", time: "30 minutes ago" },
    { message: "Meta analysis completed", time: "1 hour ago" },
  ]

  const systemAlerts = data?.systemAlerts || [
    { message: "Server performance optimal", time: "Just now", type: "info" },
    { message: "Daily backup completed", time: "2 hours ago", type: "success" },
    { message: "High traffic detected", time: "3 hours ago", type: "warning" },
  ]

  const iconMap: Record<string, any> = {
    Users,
    Flag,
    MessageSquare,
    Megaphone,
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <DashboardHeader />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <DataStatus isUsingFallback={isUsingFallback} />

          {/* Welcome Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                WatchPoint Admin Dashboard
              </CardTitle>
              <CardDescription>
                Welcome to the admin panel. Monitor and manage your Overwatch coaching platform effectively.
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Quick Stats */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {quickStats.map((stat: any) => {
              const IconComponent = iconMap[stat.icon]
              return (
                <Card key={stat.title}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                    {IconComponent && <IconComponent className={`h-4 w-4 ${stat.color}`} />}
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Platform Statistics */}
          <PlatformStats />

          {/* Recent Activity */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Member Activity</CardTitle>
                <CardDescription>Latest member registrations and activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentMemberActivity.map((activity: any, i: number) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full bg-green-500" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.message}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Alerts</CardTitle>
                <CardDescription>Important system notifications and alerts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {systemAlerts.map((alert: any, i: number) => (
                    <div key={i} className="flex items-center gap-3">
                      <div
                        className={`h-2 w-2 rounded-full ${
                          alert.type === "warning"
                            ? "bg-yellow-500"
                            : alert.type === "info"
                              ? "bg-blue-500"
                              : "bg-green-500"
                        }`}
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{alert.message}</p>
                        <p className="text-xs text-muted-foreground">{alert.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* New Features Preview */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  User Services
                </CardTitle>
                <CardDescription>Main page features for users</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div>• Player Stats Search</div>
                  <div>• Hero Recommendations</div>
                  <div>• Meta Analysis</div>
                  <div>• Streamer Suggestions</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  Shop Management
                </CardTitle>
                <CardDescription>Store rotation and items</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div>• Daily Shop Rotation</div>
                  <div>• Featured Items</div>
                  <div>• Price Management</div>
                  <div>• Sales Analytics</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  User Dashboard
                </CardTitle>
                <CardDescription>My Page features</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div>• Personal Stats</div>
                  <div>• Coaching History</div>
                  <div>• Achievement Progress</div>
                  <div>• Social Features</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
