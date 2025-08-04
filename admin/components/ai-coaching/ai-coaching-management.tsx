"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Brain,
  Video,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Star,
  RotateCcw,
  Search,
  Filter,
  Download,
  Eye,
  Target,
  Users,
  Zap,
  MapPin,
} from "lucide-react"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { ErrorMessage } from "@/components/ui/error-message"
import { DataStatus } from "@/components/ui/data-status"
import { useData } from "@/hooks/use-data"
import { api } from "@/lib/api"
import { useState } from "react"

export function AICoachingManagement() {
  const { data, loading, error, isUsingFallback, refetch } = useData(() => api.getAICoaching())
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  if (loading) {
    return <LoadingSpinner className="py-8" />
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={refetch} />
  }

  const analytics = data?.coachingAnalytics || {}
  const videoAnalyses = data?.videoAnalyses || []
  const aiMetrics = data?.aiModelMetrics || {}
  const categories = data?.coachingCategories || []
  const errorLogs = data?.errorLogs || []

  const filteredAnalyses = videoAnalyses.filter((analysis: any) => {
    const matchesSearch =
      analysis.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      analysis.battleTag.toLowerCase().includes(searchTerm.toLowerCase()) ||
      analysis.videoTitle.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || analysis.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "default"
      case "processing":
        return "secondary"
      case "failed":
        return "destructive"
      default:
        return "outline"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "processing":
        return <Clock className="h-4 w-4 text-blue-500" />
      case "failed":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
    }
  }

  const getCategoryIcon = (categoryId: string) => {
    const icons: Record<string, any> = {
      positioning: MapPin,
      ability_usage: Zap,
      target_priority: Target,
      teamwork: Users,
      game_sense: Brain,
      mechanics: Star,
    }
    return icons[categoryId] || Brain
  }

  return (
    <div className="space-y-6">
      <DataStatus isUsingFallback={isUsingFallback} />

      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <Brain className="h-8 w-8" />
          AI Coaching Management
        </h2>
        <p className="text-muted-foreground">Monitor and manage AI-powered game coaching system</p>
      </div>

      {/* 전체 통계 */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Analyses</CardTitle>
            <Video className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalAnalyses?.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+{analytics.todayAnalyses} today</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.successRate}%</div>
            <p className="text-xs text-muted-foreground">Processing success rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Processing Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.averageProcessingTime}</div>
            <p className="text-xs text-muted-foreground">Per video analysis</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">User Satisfaction</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.userSatisfaction}/5.0</div>
            <p className="text-xs text-muted-foreground">Average rating</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="analyses" className="space-y-6">
        <TabsList>
          <TabsTrigger value="analyses">Video Analyses</TabsTrigger>
          <TabsTrigger value="performance">AI Performance</TabsTrigger>
          <TabsTrigger value="categories">Coaching Categories</TabsTrigger>
          <TabsTrigger value="errors">Error Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="analyses" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Video Analysis Queue</CardTitle>
                  <CardDescription>Monitor uploaded videos and AI analysis results</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search videos..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8 w-64"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[140px]">
                      <Filter className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="processing">Processing</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Video Info</TableHead>
                    <TableHead>Game Details</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>AI Score</TableHead>
                    <TableHead>User Rating</TableHead>
                    <TableHead>Upload Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAnalyses.map((analysis: any) => (
                    <TableRow key={analysis.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>{analysis.userName.slice(0, 2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{analysis.userName}</div>
                            <div className="text-sm text-muted-foreground">{analysis.battleTag}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium truncate max-w-xs">{analysis.videoTitle}</div>
                          <div className="text-sm text-muted-foreground">
                            {analysis.videoDuration} • {analysis.videoSize}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <Badge variant="outline">{analysis.hero}</Badge>
                          <div className="text-sm text-muted-foreground">{analysis.map}</div>
                          <div className="text-sm text-muted-foreground">{analysis.rank}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(analysis.status)}
                          <Badge variant={getStatusColor(analysis.status)}>{analysis.status}</Badge>
                          {analysis.status === "processing" && analysis.progress && (
                            <div className="w-16">
                              <Progress value={analysis.progress} className="h-2" />
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {analysis.aiScore ? (
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-blue-600">{analysis.aiScore}</span>
                            <span className="text-sm text-muted-foreground">/100</span>
                          </div>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {analysis.userRating ? (
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span>{analysis.userRating}</span>
                          </div>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell>{new Date(analysis.uploadDate).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center gap-2 justify-end">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          {analysis.status === "failed" && (
                            <Button variant="ghost" size="sm">
                              <RotateCcw className="h-4 w-4" />
                            </Button>
                          )}
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>AI Model Performance</CardTitle>
                <CardDescription>Current model: {aiMetrics.currentVersion}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(aiMetrics.accuracy || {}).map(([category, accuracy]) => (
                  <div key={category} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium capitalize">{category.replace("_", " ")}</span>
                      <span className="font-bold text-blue-600">{accuracy}%</span>
                    </div>
                    <Progress value={accuracy as number} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Processing Statistics</CardTitle>
                <CardDescription>Real-time processing metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{aiMetrics.processingStats?.successRate}%</div>
                    <p className="text-sm text-muted-foreground">Success Rate</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{aiMetrics.processingStats?.averageTime}s</div>
                    <p className="text-sm text-muted-foreground">Avg Time</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{aiMetrics.processingStats?.currentLoad}%</div>
                    <p className="text-sm text-muted-foreground">Current Load</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">{aiMetrics.processingStats?.dailyCapacity}</div>
                    <p className="text-sm text-muted-foreground">Daily Capacity</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>User Feedback Distribution</CardTitle>
              <CardDescription>Rating breakdown from {aiMetrics.userFeedback?.totalRatings} users</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(aiMetrics.userFeedback?.ratingDistribution || {})
                  .reverse()
                  .map(([rating, count]) => (
                    <div key={rating} className="flex items-center gap-4">
                      <div className="flex items-center gap-1 w-12">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{rating}</span>
                      </div>
                      <div className="flex-1">
                        <Progress
                          value={((count as number) / aiMetrics.userFeedback?.totalRatings) * 100}
                          className="h-3"
                        />
                      </div>
                      <span className="text-sm text-muted-foreground w-16 text-right">
                        {(count as number).toLocaleString()}
                      </span>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Coaching Categories</CardTitle>
              <CardDescription>Manage AI coaching analysis categories and weights</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {categories.map((category: any) => {
                  const Icon = getCategoryIcon(category.id)
                  return (
                    <div key={category.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Icon className="h-5 w-5 text-blue-600" />
                        <div>
                          <h4 className="font-medium">{category.name}</h4>
                          <p className="text-sm text-muted-foreground">{category.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="font-medium">{category.weight}%</div>
                          <div className="text-sm text-muted-foreground">Weight</div>
                        </div>
                        <Badge variant={category.enabled ? "default" : "secondary"}>
                          {category.enabled ? "Enabled" : "Disabled"}
                        </Badge>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="errors" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Error Logs</CardTitle>
              <CardDescription>AI processing errors and system issues</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Error Type</TableHead>
                    <TableHead>Analysis ID</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Error Message</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {errorLogs.map((error: any) => (
                    <TableRow key={error.id}>
                      <TableCell className="font-mono text-sm">{new Date(error.timestamp).toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant="destructive">{error.errorType}</Badge>
                      </TableCell>
                      <TableCell className="font-mono text-sm">{error.analysisId}</TableCell>
                      <TableCell>{error.userId}</TableCell>
                      <TableCell className="max-w-xs truncate">{error.errorMessage}</TableCell>
                      <TableCell>
                        <Badge variant={error.resolved ? "default" : "destructive"}>
                          {error.resolved ? "Resolved" : "Open"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center gap-2 justify-end">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          {!error.resolved && (
                            <Button variant="outline" size="sm">
                              Resolve
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
