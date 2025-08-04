"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpIcon, ArrowDownIcon, Brain, Target, TrendingUp, Zap } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { ErrorMessage } from "@/components/ui/error-message"
import { DataStatus } from "@/components/ui/data-status"
import { useData } from "@/hooks/use-data"
import { api } from "@/lib/api"

export function AIPredictionStats() {
  const { data, loading, error, isUsingFallback, refetch } = useData(() => api.getStatistics())

  if (loading) {
    return <LoadingSpinner className="py-8" />
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={refetch} />
  }

  const aiPredictionStats = data?.aiPredictionStats || {}

  const stats = [
    {
      title: "Total Predictions",
      value: aiPredictionStats.totalPredictions?.value?.toLocaleString() || "0",
      change: aiPredictionStats.totalPredictions?.change || "0%",
      changeType: aiPredictionStats.totalPredictions?.changeType || "positive",
      icon: Brain,
      description: aiPredictionStats.totalPredictions?.description || "from last month",
    },
    {
      title: "Accuracy Rate",
      value: `${aiPredictionStats.accuracyRate?.value || 0}%`,
      change: aiPredictionStats.accuracyRate?.change || "0%",
      changeType: aiPredictionStats.accuracyRate?.changeType || "positive",
      icon: Target,
      description: aiPredictionStats.accuracyRate?.description || "improvement from last month",
    },
    {
      title: "Model Performance",
      value: "Excellent",
      change: "+2.1%",
      changeType: "positive",
      icon: TrendingUp,
      description: "accuracy improvement",
    },
    {
      title: "Processing Speed",
      value: "0.3s",
      change: "-0.1s",
      changeType: "positive",
      icon: Zap,
      description: "average prediction time",
    },
  ]

  const predictionsByGame = aiPredictionStats.predictionsByGame || []
  const accuracyTrend = aiPredictionStats.accuracyTrend || []

  return (
    <div className="space-y-4">
      <DataStatus isUsingFallback={isUsingFallback} />

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">AI Prediction Statistics</h2>
          <p className="text-muted-foreground">Track AI model performance and prediction accuracy</p>
        </div>
        <Select defaultValue="monthly">
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
            <CardTitle>Predictions by Game</CardTitle>
            <CardDescription>AI prediction accuracy by game type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {predictionsByGame.map((game, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{game.game}</span>
                    <span className="text-muted-foreground">
                      {game.predictions.toLocaleString()} ({game.accuracy}% accuracy)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${game.accuracy}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Accuracy Trend</CardTitle>
            <CardDescription>AI prediction accuracy over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <div className="text-4xl mb-2">🧠</div>
                <p>AI accuracy trend chart would go here</p>
                <p className="text-sm">Integration with charting library needed</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Model Performance Details</CardTitle>
          <CardDescription>Detailed AI model performance metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {accuracyTrend.slice(-3).map((data, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <Brain className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="font-medium">{data.month} 2024</div>
                    <div className="text-sm text-muted-foreground">Monthly average</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold">{data.accuracy}%</div>
                  <div className="text-sm text-muted-foreground">accuracy</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
