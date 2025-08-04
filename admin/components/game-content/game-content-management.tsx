"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Map, Users, Plus, Edit, Trash2, Eye, Sword, Shield, Heart } from "lucide-react"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { ErrorMessage } from "@/components/ui/error-message"
import { DataStatus } from "@/components/ui/data-status"
import { useData } from "@/hooks/use-data"
import { api } from "@/lib/api"
import { useState } from "react"

export function GameContentManagement() {
  const { data, loading, error, isUsingFallback, refetch } = useData(() => api.getGameContent())
  const [activeTab, setActiveTab] = useState("maps")
  const [searchTerm, setSearchTerm] = useState("")

  if (loading) {
    return <LoadingSpinner className="py-8" />
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={refetch} />
  }

  const maps = data?.maps || []
  const heroes = data?.heroes || []
  const patchNotes = data?.patchNotes || []
  const proPlayers = data?.proPlayers || []
  const tournaments = data?.tournaments || []

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "DPS":
        return <Sword className="h-4 w-4 text-red-500" />
      case "Tank":
        return <Shield className="h-4 w-4 text-blue-500" />
      case "Support":
        return <Heart className="h-4 w-4 text-green-500" />
      default:
        return <Users className="h-4 w-4" />
    }
  }

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "S":
        return "text-red-600 bg-red-50"
      case "A":
        return "text-orange-600 bg-orange-50"
      case "B":
        return "text-yellow-600 bg-yellow-50"
      case "C":
        return "text-green-600 bg-green-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  return (
    <div className="space-y-6">
      <DataStatus isUsingFallback={isUsingFallback} />

      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <Map className="h-8 w-8" />
          Game Content Management
        </h2>
        <p className="text-muted-foreground">Manage maps, heroes, patch notes, and esports content</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="maps">Maps</TabsTrigger>
          <TabsTrigger value="heroes">Heroes</TabsTrigger>
          <TabsTrigger value="patches">Patch Notes</TabsTrigger>
          <TabsTrigger value="players">Pro Players</TabsTrigger>
          <TabsTrigger value="tournaments">Tournaments</TabsTrigger>
        </TabsList>

        <TabsContent value="maps" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Map Information</CardTitle>
                  <CardDescription>Manage Overwatch maps and strategies</CardDescription>
                </div>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Map
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {maps.map((map: any) => (
                  <Card key={map.id}>
                    <CardContent className="p-4">
                      <div className="aspect-video bg-muted rounded-lg mb-4 overflow-hidden">
                        <img
                          src={map.image || "/placeholder.svg"}
                          alt={map.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold">{map.name}</h3>
                          <Badge variant="outline">{map.type}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{map.description}</p>
                        <div className="text-xs text-muted-foreground">
                          Updated: {new Date(map.lastUpdated).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-2 pt-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="heroes" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Hero Information</CardTitle>
                  <CardDescription>Manage hero stats, abilities, and tier rankings</CardDescription>
                </div>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Hero
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Hero</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Difficulty</TableHead>
                    <TableHead>Tier</TableHead>
                    <TableHead>Win Rate</TableHead>
                    <TableHead>Pick Rate</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {heroes.map((hero: any) => (
                    <TableRow key={hero.id}>
                      <TableCell className="font-medium">{hero.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getRoleIcon(hero.role)}
                          <span>{hero.role}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{hero.difficulty}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getTierColor(hero.tierRating)}>{hero.tierRating}</Badge>
                      </TableCell>
                      <TableCell>{hero.winRate}%</TableCell>
                      <TableCell>{hero.pickRate}%</TableCell>
                      <TableCell>{new Date(hero.lastUpdated).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center gap-2 justify-end">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
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

        <TabsContent value="patches" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Patch Notes</CardTitle>
                  <CardDescription>Manage game updates and balance changes</CardDescription>
                </div>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Patch Note
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {patchNotes.map((patch: any) => (
                  <Card key={patch.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg">{patch.title}</CardTitle>
                          <CardDescription>
                            Version {patch.version} • {new Date(patch.releaseDate).toLocaleDateString()}
                          </CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="default">{patch.status}</Badge>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">{patch.summary}</p>
                      <div className="space-y-2">
                        <h4 className="font-medium">Changes:</h4>
                        {patch.changes.map((change: any, index: number) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            <Badge
                              variant={
                                change.type === "buff"
                                  ? "default"
                                  : change.type === "nerf"
                                    ? "destructive"
                                    : "secondary"
                              }
                            >
                              {change.type}
                            </Badge>
                            <span className="font-medium">{change.hero}:</span>
                            <span>{change.description}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="players" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Pro Players</CardTitle>
                  <CardDescription>Manage professional player profiles and information</CardDescription>
                </div>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Player
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {proPlayers.map((player: any) => (
                  <Card key={player.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback>{player.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{player.name}</h3>
                          <p className="text-sm text-muted-foreground">{player.realName}</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Team:</span>
                          <span className="text-sm font-medium">{player.team}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Role:</span>
                          <div className="flex items-center gap-1">
                            {getRoleIcon(player.role)}
                            <span className="text-sm font-medium">{player.role}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Country:</span>
                          <span className="text-sm font-medium">{player.nationality}</span>
                        </div>
                        <div className="pt-2">
                          <p className="text-xs text-muted-foreground">Main Heroes:</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {player.mainHeroes.map((hero: string) => (
                              <Badge key={hero} variant="outline" className="text-xs">
                                {hero}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 pt-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tournaments" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Tournaments</CardTitle>
                  <CardDescription>Manage esports tournaments and competitions</CardDescription>
                </div>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Tournament
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tournaments.map((tournament: any) => (
                  <Card key={tournament.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg">{tournament.name}</CardTitle>
                          <CardDescription>
                            {new Date(tournament.startDate).toLocaleDateString()} -{" "}
                            {new Date(tournament.endDate).toLocaleDateString()}
                          </CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">{tournament.status}</Badge>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <h4 className="font-medium mb-2">Tournament Info</h4>
                          <div className="space-y-1 text-sm">
                            <div>Prize Pool: {tournament.prizePool}</div>
                            <div>Format: {tournament.format}</div>
                            <div>Venue: {tournament.venue}</div>
                            <div>Organizer: {tournament.organizer}</div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Participating Teams</h4>
                          <div className="space-y-1">
                            {tournament.teams.slice(0, 3).map((team: any, index: number) => (
                              <div key={index} className="text-sm">
                                <span className="font-medium">{team.name}</span>
                                <span className="text-muted-foreground"> ({team.region})</span>
                              </div>
                            ))}
                            {tournament.teams.length > 3 && (
                              <div className="text-sm text-muted-foreground">
                                +{tournament.teams.length - 3} more teams
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
