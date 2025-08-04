"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { User, Trophy, Users, GamepadIcon, Star, TrendingUp, Heart, Shield, Sword, Edit, Eye } from "lucide-react"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { ErrorMessage } from "@/components/ui/error-message"
import { DataStatus } from "@/components/ui/data-status"
import { useData } from "@/hooks/use-data"
import { useState } from "react"

export function UserDashboardManagement() {
  const { data, loading, error, isUsingFallback } = useData("/data/user-dashboard.json")
  const [activeTab, setActiveTab] = useState("overview")

  if (loading) {
    return <LoadingSpinner className="py-8" />
  }

  if (error) {
    return <ErrorMessage message={error} />
  }

  if (!data) {
    return <div>No data available</div>
  }

  const getRankColor = (rank: string) => {
    switch (rank) {
      case "Grandmaster":
        return "text-red-600"
      case "Master":
        return "text-purple-600"
      case "Diamond":
        return "text-blue-600"
      case "Platinum":
        return "text-green-600"
      case "Gold":
        return "text-yellow-600"
      default:
        return "text-gray-600"
    }
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "Tank":
        return <Shield className="h-4 w-4 text-blue-500" />
      case "DPS":
        return <Sword className="h-4 w-4 text-red-500" />
      case "Support":
        return <Heart className="h-4 w-4 text-green-500" />
      default:
        return <GamepadIcon className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      <DataStatus isUsingFallback={isUsingFallback} />

      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <User className="h-8 w-8" />
          User Dashboard Management
        </h2>
        <p className="text-muted-foreground">Manage user dashboard features and personal statistics</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="stats">Personal Stats</TabsTrigger>
          <TabsTrigger value="coaching">Coaching</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="social">Social Features</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Current Rank</CardTitle>
                <Trophy className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${getRankColor(data.personalStats.currentRank)}`}>
                  {data.personalStats.currentRank}
                </div>
                <p className="text-xs text-muted-foreground">SR: {data.personalStats.sr}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data.personalStats.winRate}%</div>
                <p className="text-xs text-muted-foreground">
                  {data.personalStats.wins}W / {data.personalStats.losses}L
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Coaching Sessions</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data.coachingHistory.completedSessions}</div>
                <p className="text-xs text-muted-foreground">{data.coachingHistory.averageRating}★ average rating</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Friends Online</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data.socialFeatures.friends.online}</div>
                <p className="text-xs text-muted-foreground">of {data.socialFeatures.friends.total} friends</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Matches</CardTitle>
                <CardDescription>Latest competitive game results</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.recentMatches.map((match: any) => (
                    <div key={match.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            match.result === "Victory" ? "bg-green-500" : "bg-red-500"
                          }`}
                        />
                        <div>
                          <p className="font-medium">{match.map}</p>
                          <p className="text-sm text-muted-foreground">
                            {match.hero} • {match.duration}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={match.result === "Victory" ? "default" : "destructive"}>{match.result}</Badge>
                        <p className="text-sm text-muted-foreground">{match.sr_change}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Achievement Progress</CardTitle>
                <CardDescription>Current achievement goals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.achievements.progress.map((achievement: any, index: number) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{achievement.name}</h4>
                        <span className="text-sm text-muted-foreground">
                          {achievement.progress}/{achievement.target}
                        </span>
                      </div>
                      <Progress value={(achievement.progress / achievement.target) * 100} />
                      <p className="text-xs text-muted-foreground">{achievement.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="stats" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Statistics Management</CardTitle>
              <CardDescription>Monitor and manage user performance statistics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <h4 className="font-medium">Competitive Stats</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 border rounded-lg">
                      <p className="text-sm text-muted-foreground">Current SR</p>
                      <p className="text-2xl font-bold">{data.personalStats.sr}</p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <p className="text-sm text-muted-foreground">Season High</p>
                      <p className="text-2xl font-bold">{data.personalStats.seasonHigh}</p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <p className="text-sm text-muted-foreground">Total Games</p>
                      <p className="text-2xl font-bold">{data.personalStats.totalGames}</p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <p className="text-sm text-muted-foreground">Playtime</p>
                      <p className="text-2xl font-bold">{data.personalStats.playtime}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Preferences</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Main Hero:</span>
                      <Badge variant="outline">{data.personalStats.mainHero}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Favorite Map:</span>
                      <Badge variant="outline">{data.personalStats.favoriteMap}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Win Rate:</span>
                      <span className="font-medium">{data.personalStats.winRate}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="coaching" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Coaching History Management</CardTitle>
              <CardDescription>Track and manage user coaching sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="p-4 border rounded-lg text-center">
                    <div className="text-2xl font-bold">{data.coachingHistory.totalSessions}</div>
                    <p className="text-sm text-muted-foreground">Total Sessions</p>
                  </div>
                  <div className="p-4 border rounded-lg text-center">
                    <div className="text-2xl font-bold">{data.coachingHistory.totalHours}h</div>
                    <p className="text-sm text-muted-foreground">Total Hours</p>
                  </div>
                  <div className="p-4 border rounded-lg text-center">
                    <div className="text-2xl font-bold">{data.coachingHistory.averageRating}★</div>
                    <p className="text-sm text-muted-foreground">Average Rating</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Recent Sessions</h4>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Coach</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Hero</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {data.coachingHistory.recentSessions.map((session: any) => (
                        <TableRow key={session.id}>
                          <TableCell className="font-medium">{session.coach}</TableCell>
                          <TableCell>{new Date(session.date).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{session.hero}</Badge>
                          </TableCell>
                          <TableCell>{session.duration}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              {session.rating}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Achievement System Management</CardTitle>
              <CardDescription>Manage user achievements and progress tracking</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h4 className="font-medium mb-3">Recent Achievements</h4>
                    <div className="space-y-3">
                      {data.achievements.recentAchievements.map((achievement: any) => (
                        <div key={achievement.id} className="flex items-center gap-3 p-3 border rounded-lg">
                          <img
                            src={achievement.icon || "/placeholder.svg"}
                            alt={achievement.name}
                            className="w-12 h-12 rounded"
                          />
                          <div className="flex-1">
                            <h5 className="font-medium">{achievement.name}</h5>
                            <p className="text-sm text-muted-foreground">{achievement.description}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="secondary">{achievement.rarity}</Badge>
                              <span className="text-xs text-muted-foreground">
                                {new Date(achievement.unlockedDate).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">Progress Tracking</h4>
                    <div className="space-y-4">
                      {data.achievements.progress.map((progress: any, index: number) => (
                        <div key={index} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <h5 className="font-medium">{progress.name}</h5>
                            <span className="text-sm text-muted-foreground">
                              {progress.progress}/{progress.target}
                            </span>
                          </div>
                          <Progress value={(progress.progress / progress.target) * 100} />
                          <p className="text-xs text-muted-foreground">{progress.description}</p>
                          <p className="text-xs font-medium">Reward: {progress.reward}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Social Features Management</CardTitle>
              <CardDescription>Manage user social interactions and community features</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h4 className="font-medium mb-3">Friends & Activity</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 border rounded-lg">
                        <span>Total Friends</span>
                        <Badge variant="secondary">{data.socialFeatures.friends.total}</Badge>
                      </div>
                      <div className="flex justify-between items-center p-3 border rounded-lg">
                        <span>Online Now</span>
                        <Badge variant="default">{data.socialFeatures.friends.online}</Badge>
                      </div>
                    </div>

                    <div className="mt-4">
                      <h5 className="text-sm font-medium mb-2">Recent Friend Activity</h5>
                      <div className="space-y-2">
                        {data.socialFeatures.friends.recentActivity.map((activity: any, index: number) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback className="text-xs">
                                {activity.friend.slice(0, 2).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{activity.friend}</span>
                            <span className="text-muted-foreground">{activity.activity}</span>
                            <span className="text-xs text-muted-foreground ml-auto">{activity.time}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">Groups & Communities</h4>
                    <div className="space-y-3">
                      {data.socialFeatures.groups.map((group: any, index: number) => (
                        <div key={index} className="p-3 border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <h5 className="font-medium">{group.name}</h5>
                            <Badge variant="outline">{group.members} members</Badge>
                          </div>
                          <div className="flex items-center gap-2">
                            {getRoleIcon(group.role)}
                            <span className="text-sm">{group.role}</span>
                            <span className="text-sm text-muted-foreground">• {group.rank}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4">
                      <h5 className="text-sm font-medium mb-2">Duo Partner</h5>
                      <div className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{data.socialFeatures.duoPartner.current}</span>
                          <Badge variant="outline">{data.socialFeatures.duoPartner.rank}</Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            {getRoleIcon(data.socialFeatures.duoPartner.role)}
                            <span>{data.socialFeatures.duoPartner.role}</span>
                          </div>
                          <span>Synergy: {data.socialFeatures.duoPartner.synergy}%</span>
                          <span>{data.socialFeatures.duoPartner.gamesPlayed} games</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
