"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpIcon, ArrowDownIcon, GamepadIcon, Users, Clock, Target } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { ErrorMessage } from "@/components/ui/error-message"
import { DataStatus } from "@/components/ui/data-status"
import { useData } from "@/hooks/use-data"
import { api } from "@/lib/api"

export function DuoSquadStats() {
  const { data, loading, error, isUsingFallback, refetch } = useData(() => api.getStatistics())

  if (loading) {
    return <LoadingSpinner className="py-8" />
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={refetch} />
  }

  const duoSquadStats = data?.duoSquadStats || {}

  const stats = [
    {
      title: "Total Matches",
      value: duoSquadStats.totalMatches?.value?.toLocaleString() || "0",
      change: duoSquadStats.totalMatches?.change || "0%",
      changeType: duoSquadStats.totalMatches?.changeType || "positive",
      icon: GamepadIcon,
      description: duoSquadStats.totalMatches?.description || "from last month",
    },
    {
      title: "Successful Matches",
      value: duoSquadStats.successfulMatches?.value?.toLocaleString() || "0",
      change: duoSquadStats.successfulMatches?.change || "0%",
      changeType: duoSquadStats.successfulMatches?.changeType || "positive",
      icon: Target,
      description: duoSquadStats.successfulMatches?.description || "from last month",
    },
    {
      title: "Average Match Time",
      value: duoSquadStats.averageMatchTime?.value || "0 minutes",
      change: duoSquadStats.averageMatchTime?.change || "0%",
      changeType: duoSquadStats.averageMatchTime?.changeType || "positive",
      icon: Clock,
      description: duoSquadStats.averageMatchTime?.description || "from last month",
    },
    {
      title: "Success Rate",
      value: `${Math.round((duoSquadStats.successfulMatches?.value / duoSquadStats.totalMatches?.value) * 100) || 0}%`,
      change: "+2.3%",
      changeType: "positive",
      icon: Users,
      description: "from last month",
    },
  ]

  const popularGameModes = duoSquadStats.popularGameModes || []
  const matchData = duoSquadStats.matchData || []

  return (
    <div className="space-y-4">
      <DataStatus isUsingFallback={isUsingFallback} />

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Duo/Squad Statistics</h2>
          <p className="text-muted-foreground">Track matchmaking and team formation metrics</p>
        </div>
        <Select defaultValue="weekly">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Daily View</SelectItem>
            <SelectItem value="weekly">Weekly View</SelectItem>
            <SelectItem value="monthly">Monthly View</SelectItem>
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
            <CardTitle>Popular Game Modes</CardTitle>
            <CardDescription>Match distribution by game mode</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {popularGameModes.map((mode, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{mode.mode}</span>
                    <span className="text-muted-foreground">
                      {mode.matches.toLocaleString()} ({mode.percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${mode.percentage}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Match Success Trend</CardTitle>
            <CardDescription>Daily match success rate over the last week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <div className="text-4xl mb-2">🎯</div>
                <p>Match success chart would go here</p>
                <p className="text-sm">Integration with charting library needed</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daily Match Activity</CardTitle>
          <CardDescription>Recent match activity breakdown</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {matchData.slice(-4).map((data, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <GamepadIcon className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="font-medium">{new Date(data.date).toLocaleDateString()}</div>
                    <div className="text-sm text-muted-foreground">
                      {Math.round((data.successful / data.matches) * 100)}% success
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold">{data.matches}</div>
                  <div className="text-sm text-muted-foreground">matches</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
