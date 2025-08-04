"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpIcon, ArrowDownIcon, Users, MessageSquare, Flag, UserPlus } from "lucide-react"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { ErrorMessage } from "@/components/ui/error-message"
import { useData } from "@/hooks/use-data"
import { api } from "@/lib/api"

export function PlatformStats() {
  const { data, loading, error, refetch } = useData(() => api.getStatistics())

  if (loading) {
    return <LoadingSpinner className="py-8" />
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={refetch} />
  }

  const platformStats = data?.platformStats || {}

  const stats = [
    {
      title: "Total Visitors",
      value: platformStats.totalVisitors?.value?.toLocaleString() || "0",
      change: platformStats.totalVisitors?.change || "0%",
      changeType: platformStats.totalVisitors?.changeType || "positive",
      icon: Users,
      description: platformStats.totalVisitors?.description || "from last month",
    },
    {
      title: "New Subscribers",
      value: platformStats.newSubscribers?.value?.toLocaleString() || "0",
      change: platformStats.newSubscribers?.change || "0%",
      changeType: platformStats.newSubscribers?.changeType || "positive",
      icon: UserPlus,
      description: platformStats.newSubscribers?.description || "from last month",
    },
    {
      title: "Active Chat Rooms",
      value: platformStats.activeChatRooms?.value?.toLocaleString() || "0",
      change: platformStats.activeChatRooms?.change || "0%",
      changeType: platformStats.activeChatRooms?.changeType || "positive",
      icon: MessageSquare,
      description: platformStats.activeChatRooms?.description || "from last month",
    },
    {
      title: "Total Reports",
      value: platformStats.totalReports?.value?.toLocaleString() || "0",
      change: platformStats.totalReports?.change || "0%",
      changeType: platformStats.totalReports?.changeType || "negative",
      icon: Flag,
      description: platformStats.totalReports?.description || "from last month",
    },
  ]

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                {stat.changeType === "positive" ? (
                  <ArrowUpIcon className="mr-1 h-3 w-3 text-green-500" />
                ) : (
                  <ArrowDownIcon className="mr-1 h-3 w-3 text-red-500" />
                )}
                <span className={stat.changeType === "positive" ? "text-green-500" : "text-red-500"}>
                  {stat.change}
                </span>
                <span className="ml-1">{stat.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Visitor Trends</CardTitle>
            <CardDescription>Daily visitor statistics for the last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <div className="text-4xl mb-2">📈</div>
                <p>Visitor trend chart would go here</p>
                <p className="text-sm">Integration with charting library needed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Activity</CardTitle>
            <CardDescription>Real-time user activity breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <div className="text-4xl mb-2">🎯</div>
                <p>Activity breakdown chart would go here</p>
                <p className="text-sm">Integration with charting library needed</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
