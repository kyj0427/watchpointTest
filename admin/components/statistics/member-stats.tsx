"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpIcon, ArrowDownIcon, Users, UserPlus, Crown, TrendingUp } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { ErrorMessage } from "@/components/ui/error-message"
import { DataStatus } from "@/components/ui/data-status"
import { useData } from "@/hooks/use-data"
import { api } from "@/lib/api"

export function MemberStats() {
  const { data, loading, error, isUsingFallback, refetch } = useData(() => api.getStatistics())

  if (loading) {
    return <LoadingSpinner className="py-8" />
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={refetch} />
  }

  const memberStats = data?.memberStats || {}

  const stats = [
    {
      title: "Total Members",
      value: memberStats.totalMembers?.value?.toLocaleString() || "0",
      change: memberStats.totalMembers?.change || "0%",
      changeType: memberStats.totalMembers?.changeType || "positive",
      icon: Users,
      description: memberStats.totalMembers?.description || "from last month",
    },
    {
      title: "Active Members",
      value: memberStats.activeMembers?.value?.toLocaleString() || "0",
      change: memberStats.activeMembers?.change || "0%",
      changeType: memberStats.activeMembers?.changeType || "positive",
      icon: TrendingUp,
      description: memberStats.activeMembers?.description || "from last month",
    },
    {
      title: "Premium Members",
      value: memberStats.premiumMembers?.value?.toLocaleString() || "0",
      change: memberStats.premiumMembers?.change || "0%",
      changeType: memberStats.premiumMembers?.changeType || "positive",
      icon: Crown,
      description: memberStats.premiumMembers?.description || "from last month",
    },
    {
      title: "New This Month",
      value: memberStats.newMembersThisMonth?.value?.toLocaleString() || "0",
      change: memberStats.newMembersThisMonth?.change || "0%",
      changeType: memberStats.newMembersThisMonth?.changeType || "positive",
      icon: UserPlus,
      description: memberStats.newMembersThisMonth?.description || "from last month",
    },
  ]

  const membersBySubscription = memberStats.membersBySubscription || []
  const memberGrowthData = memberStats.memberGrowthData || []

  return (
    <div className="space-y-4">
      <DataStatus isUsingFallback={isUsingFallback} />

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Member Statistics</h2>
          <p className="text-muted-foreground">Track member growth and engagement metrics</p>
        </div>
        <Select defaultValue="monthly">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="monthly">Monthly View</SelectItem>
            <SelectItem value="yearly">Yearly View</SelectItem>
            <SelectItem value="quarterly">Quarterly View</SelectItem>
          </SelectContent>
        </Select>
      </div>

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
            <CardTitle>Subscription Breakdown</CardTitle>
            <CardDescription>Members by subscription type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {membersBySubscription.map((sub, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{sub.type}</span>
                    <span className="text-muted-foreground">
                      {sub.count.toLocaleString()} ({sub.percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${sub.percentage}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Member Growth Trend</CardTitle>
            <CardDescription>Member growth over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <div className="text-4xl mb-2">📈</div>
                <p>Member growth chart would go here</p>
                <p className="text-sm">Integration with charting library needed</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Member Growth Details</CardTitle>
          <CardDescription>Monthly breakdown of member growth</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {memberGrowthData.map((data, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="font-medium">{data.month} 2024</div>
                    <div className="text-sm text-muted-foreground">Monthly total</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold">{data.members.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">members</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
