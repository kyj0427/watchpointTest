"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpIcon, ArrowDownIcon, DollarSign, CreditCard, TrendingUp, Calendar } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { ErrorMessage } from "@/components/ui/error-message"
import { useData } from "@/hooks/use-data"
import { api } from "@/lib/api"

export function RevenueStats() {
  const { data, loading, error, refetch } = useData(() => api.getStatistics())

  if (loading) {
    return <LoadingSpinner className="py-8" />
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={refetch} />
  }

  const revenueStats = data?.revenueStats || {}

  const stats = [
    {
      title: "Monthly Revenue",
      value: `$${revenueStats.monthlyRevenue?.value?.toLocaleString() || "0"}`,
      change: revenueStats.monthlyRevenue?.change || "0%",
      changeType: revenueStats.monthlyRevenue?.changeType || "positive",
      icon: DollarSign,
      description: revenueStats.monthlyRevenue?.description || "from last month",
    },
    {
      title: "Yearly Revenue",
      value: `$${revenueStats.yearlyRevenue?.value?.toLocaleString() || "0"}`,
      change: revenueStats.yearlyRevenue?.change || "0%",
      changeType: revenueStats.yearlyRevenue?.changeType || "positive",
      icon: TrendingUp,
      description: revenueStats.yearlyRevenue?.description || "from last year",
    },
    {
      title: "Active Subscriptions",
      value: revenueStats.activeSubscriptions?.value?.toLocaleString() || "0",
      change: revenueStats.activeSubscriptions?.change || "0%",
      changeType: revenueStats.activeSubscriptions?.changeType || "positive",
      icon: CreditCard,
      description: revenueStats.activeSubscriptions?.description || "from last month",
    },
    {
      title: "Avg Revenue Per User",
      value: `$${revenueStats.avgRevenuePerUser?.value || "0"}`,
      change: revenueStats.avgRevenuePerUser?.change || "0%",
      changeType: revenueStats.avgRevenuePerUser?.changeType || "negative",
      icon: DollarSign,
      description: revenueStats.avgRevenuePerUser?.description || "from last month",
    },
  ]

  const monthlyData = revenueStats.monthlyData || []
  const subscriptionBreakdown = revenueStats.subscriptionBreakdown || []

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Revenue Statistics</h2>
          <p className="text-muted-foreground">Track subscription revenue and financial metrics</p>
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
            <CardTitle>Monthly Revenue Trend</CardTitle>
            <CardDescription>Revenue growth over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <div className="text-4xl mb-2">📊</div>
                <p>Revenue trend chart would go here</p>
                <p className="text-sm">Integration with charting library needed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Subscription Breakdown</CardTitle>
            <CardDescription>Revenue by subscription type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {subscriptionBreakdown.map((sub: any, index: number) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 bg-${sub.color}-500 rounded-full`} />
                    <span className="text-sm">
                      {sub.type} (${sub.price}/month)
                    </span>
                  </div>
                  <div className="text-sm font-medium">${sub.revenue.toLocaleString()}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Revenue Details</CardTitle>
          <CardDescription>Detailed breakdown of monthly revenue</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {monthlyData.map((data: any, index: number) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="font-medium">{data.month} 2024</div>
                    <div className="text-sm text-muted-foreground">{data.subscriptions} subscriptions</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold">${data.revenue.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">
                    ${(data.revenue / data.subscriptions).toFixed(2)} per user
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
