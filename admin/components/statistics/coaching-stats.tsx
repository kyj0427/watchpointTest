"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpIcon, ArrowDownIcon, Star, Users, TrendingUp, Award } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { ErrorMessage } from "@/components/ui/error-message"
import { DataStatus } from "@/components/ui/data-status"
import { useData } from "@/hooks/use-data"
import { api } from "@/lib/api"

export function CoachingStats() {
  const { data, loading, error, isUsingFallback, refetch } = useData(() => api.getStatistics())

  if (loading) {
    return <LoadingSpinner className="py-8" />
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={refetch} />
  }

  const coachingStats = data?.coachingStats || {}

  const stats = [
    {
      title: "Total Sessions",
      value: coachingStats.totalSessions?.value?.toLocaleString() || "0",
      change: coachingStats.totalSessions?.change || "0%",
      changeType: coachingStats.totalSessions?.changeType || "positive",
      icon: Users,
      description: coachingStats.totalSessions?.description || "from last month",
    },
    {
      title: "Average Rating",
      value: coachingStats.averageRating?.value?.toString() || "0.0",
      change: coachingStats.averageRating?.change || "+0.0",
      changeType: coachingStats.averageRating?.changeType || "positive",
      icon: Star,
      description: coachingStats.averageRating?.description || "from last month",
    },
    {
      title: "Satisfaction Rate",
      value: `${coachingStats.satisfactionRate?.value || 0}%`,
      change: coachingStats.satisfactionRate?.change || "0%",
      changeType: coachingStats.satisfactionRate?.changeType || "positive",
      icon: TrendingUp,
      description: coachingStats.satisfactionRate?.description || "from last month",
    },
    {
      title: "Active Coaches",
      value: (coachingStats.topCoaches?.length || 0).toString(),
      change: "+3",
      changeType: "positive",
      icon: Award,
      description: "new coaches this month",
    },
  ]

  const topCoaches = coachingStats.topCoaches || []
  const sessionsByGame = coachingStats.sessionsByGame || []

  return (
    <div className="space-y-4">
      <DataStatus isUsingFallback={isUsingFallback} />

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Coaching Statistics</h2>
          <p className="text-muted-foreground">Track coaching performance and satisfaction metrics</p>
        </div>
        <Select defaultValue="monthly">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="weekly">Weekly View</SelectItem>
            <SelectItem value="monthly">Monthly View</SelectItem>
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
            <CardTitle>Top Coaches</CardTitle>
            <CardDescription>Highest rated coaches this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topCoaches.map((coach, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{coach.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-sm font-medium">{coach.name}</div>
                      <div className="text-xs text-muted-foreground">{coach.speciality}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{coach.rating}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">{coach.sessions} sessions</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sessions by Game</CardTitle>
            <CardDescription>Coaching sessions breakdown by game</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sessionsByGame.map((game, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{game.game}</span>
                    <span className="text-muted-foreground">
                      {game.sessions.toLocaleString()} ({game.percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${game.percentage}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Coaching Performance</CardTitle>
          <CardDescription>Overall coaching system performance metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <div className="text-4xl mb-2">⭐</div>
              <p>Coaching performance chart would go here</p>
              <p className="text-sm">Integration with charting library needed</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
