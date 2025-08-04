"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"
import { Search, TrendingUp, Users, ShoppingCart, Play, Edit, Eye } from "lucide-react"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { ErrorMessage } from "@/components/ui/error-message"
import { DataStatus } from "@/components/ui/data-status"
import { useData } from "@/hooks/use-data"
import { useState } from "react"

export function UserServicesManagement() {
  const { data, loading, error, isUsingFallback } = useData("/data/user-services.json")
  const [activeTab, setActiveTab] = useState("search")

  if (loading) {
    return <LoadingSpinner className="py-8" />
  }

  if (error) {
    return <ErrorMessage message={error} />
  }

  if (!data) {
    return <div>No data available</div>
  }

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "S":
        return "bg-red-100 text-red-800"
      case "A":
        return "bg-orange-100 text-orange-800"
      case "B":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <DataStatus isUsingFallback={isUsingFallback} />

      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <Users className="h-8 w-8" />
          User Services Management
        </h2>
        <p className="text-muted-foreground">Manage user-facing features and services</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Searches</CardTitle>
            <Search className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.statistics.totalSearches.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+{data.statistics.dailySearches} today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Streamers</CardTitle>
            <Play className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.statistics.activeStreamers}</div>
            <p className="text-xs text-muted-foreground">Currently live</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Shop Revenue</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${data.statistics.shopRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">User Engagement</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.statistics.userEngagement}%</div>
            <p className="text-xs text-muted-foreground">Average daily</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="search">Player Search</TabsTrigger>
          <TabsTrigger value="heroes">Hero Recommendations</TabsTrigger>
          <TabsTrigger value="streamers">Streamers</TabsTrigger>
          <TabsTrigger value="shop">Shop Rotation</TabsTrigger>
        </TabsList>

        <TabsContent value="search" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Player Search Management</CardTitle>
                  <CardDescription>Monitor and manage player statistics searches</CardDescription>
                </div>
                <Switch defaultChecked={data.playerSearch.enabled} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium mb-3">Popular Searches</h4>
                  <div className="grid gap-2">
                    {data.playerSearch.popularSearches.map((search: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <span className="font-medium">{search.playerName}</span>
                        <Badge variant="secondary">{search.searchCount} searches</Badge>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-3">Recent Searches</h4>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Player Name</TableHead>
                        <TableHead>Rank</TableHead>
                        <TableHead>SR</TableHead>
                        <TableHead>Main Hero</TableHead>
                        <TableHead>Win Rate</TableHead>
                        <TableHead>Search Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {data.playerSearch.searchHistory.map((search: any) => (
                        <TableRow key={search.id}>
                          <TableCell className="font-medium">{search.playerName}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{search.results.rank}</Badge>
                          </TableCell>
                          <TableCell>{search.results.sr}</TableCell>
                          <TableCell>{search.results.mainHero}</TableCell>
                          <TableCell>{search.results.winRate}%</TableCell>
                          <TableCell>{new Date(search.searchDate).toLocaleDateString()}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="heroes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Hero Recommendations - Current Meta</CardTitle>
              <CardDescription>
                Season {data.heroRecommendations.currentMeta.season} • Updated{" "}
                {new Date(data.heroRecommendations.currentMeta.lastUpdated).toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {Object.entries(data.heroRecommendations.currentMeta).map(([role, heroes]: [string, any]) => {
                  if (role === "lastUpdated" || role === "season") return null

                  return (
                    <div key={role}>
                      <h4 className="text-lg font-semibold mb-3 capitalize">{role}</h4>
                      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {heroes.map((hero: any, index: number) => (
                          <Card key={index}>
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between mb-2">
                                <h5 className="font-semibold">{hero.hero}</h5>
                                <Badge className={getTierColor(hero.tier)}>{hero.tier}</Badge>
                              </div>
                              <div className="space-y-1 text-sm">
                                <div className="flex justify-between">
                                  <span>Win Rate:</span>
                                  <span className="font-medium">{hero.winRate}%</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Pick Rate:</span>
                                  <span className="font-medium">{hero.pickRate}%</span>
                                </div>
                                <p className="text-muted-foreground mt-2">{hero.reason}</p>
                              </div>
                              <div className="flex gap-2 mt-3">
                                <Button size="sm" variant="outline">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button size="sm" variant="outline">
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="streamers" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Streamer Recommendations</CardTitle>
              <CardDescription>Manage featured streamers and recommendation algorithm</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium mb-3">Algorithm Factors</h4>
                  <div className="flex flex-wrap gap-2">
                    {data.streamerRecommendations.algorithm.factors.map((factor: string) => (
                      <Badge key={factor} variant="secondary">
                        {factor}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-3">Featured Streamers</h4>
                  <div className="grid gap-4">
                    {data.streamerRecommendations.featuredStreamers.map((streamer: any) => (
                      <Card key={streamer.id}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div>
                                <h5 className="font-semibold flex items-center gap-2">
                                  {streamer.name}
                                  {streamer.isLive && (
                                    <Badge variant="destructive" className="text-xs">
                                      LIVE
                                    </Badge>
                                  )}
                                </h5>
                                <p className="text-sm text-muted-foreground">
                                  {streamer.role} • {streamer.rank} • {streamer.language}
                                </p>
                                <p className="text-sm">
                                  Playing: {streamer.playingHero} • {streamer.viewers.toLocaleString()} viewers
                                </p>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {streamer.tags.map((tag: string) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shop" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Shop Rotation Management</CardTitle>
                  <CardDescription>Manage daily shop items and rotations</CardDescription>
                </div>
                <Button>Update Rotation</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium mb-3">Current Rotation</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    {new Date(data.shopRotation.currentRotation.startDate).toLocaleDateString()} -
                    {new Date(data.shopRotation.currentRotation.endDate).toLocaleDateString()}
                  </p>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {data.shopRotation.currentRotation.items.map((item: any) => (
                      <Card key={item.id}>
                        <CardContent className="p-4">
                          <div className="aspect-square bg-muted rounded-lg mb-3 overflow-hidden">
                            <img
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="space-y-2">
                            <h5 className="font-semibold">{item.name}</h5>
                            <Badge variant="outline">{item.type}</Badge>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">
                                {item.price} {item.currency}
                              </span>
                              {item.discount > 0 && <Badge variant="destructive">{item.discount}% OFF</Badge>}
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-3">Rotation History</h4>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Total Sales</TableHead>
                        <TableHead>Top Item</TableHead>
                        <TableHead>Revenue</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {data.shopRotation.rotationHistory.map((history: any, index: number) => (
                        <TableRow key={index}>
                          <TableCell>{history.date}</TableCell>
                          <TableCell>{history.totalSales.toLocaleString()}</TableCell>
                          <TableCell>{history.topItem}</TableCell>
                          <TableCell>${history.revenue.toLocaleString()}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
