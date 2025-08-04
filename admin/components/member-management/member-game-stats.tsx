"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Trophy,
  Target,
  Clock,
  TrendingUp,
  Star,
  Gamepad2,
  Users,
  Brain,
  Zap,
  Shield,
  Heart,
  Sword,
  Eye,
  MessageCircle,
} from "lucide-react"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { ErrorMessage } from "@/components/ui/error-message"
import { DataStatus } from "@/components/ui/data-status"
import { useData } from "@/hooks/use-data"
import { api } from "@/lib/api"
import { useState } from "react"

// 스파이더 차트 컴포넌트
function SpiderChart({ data, size = 300 }: { data: Record<string, number>; size?: number }) {
  const center = size / 2
  const radius = size / 2 - 40
  const angleStep = (2 * Math.PI) / Object.keys(data).length

  const points = Object.entries(data).map(([key, value], index) => {
    const angle = index * angleStep - Math.PI / 2
    const normalizedValue = value / 100
    const x = center + Math.cos(angle) * radius * normalizedValue
    const y = center + Math.sin(angle) * radius * normalizedValue
    return { x, y, key, value, angle }
  })

  const pathData = points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ") + " Z"

  const gridLevels = [0.2, 0.4, 0.6, 0.8, 1.0]

  return (
    <div className="flex justify-center">
      <svg width={size} height={size} className="overflow-visible">
        {/* 격자 */}
        {gridLevels.map((level, levelIndex) => (
          <polygon
            key={levelIndex}
            points={Object.keys(data)
              .map((_, index) => {
                const angle = index * angleStep - Math.PI / 2
                const x = center + Math.cos(angle) * radius * level
                const y = center + Math.sin(angle) * radius * level
                return `${x},${y}`
              })
              .join(" ")}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="1"
            opacity={0.5}
          />
        ))}

        {/* 축선 */}
        {Object.keys(data).map((_, index) => {
          const angle = index * angleStep - Math.PI / 2
          const x = center + Math.cos(angle) * radius
          const y = center + Math.sin(angle) * radius
          return (
            <line key={index} x1={center} y1={center} x2={x} y2={y} stroke="#e5e7eb" strokeWidth="1" opacity={0.5} />
          )
        })}

        {/* 데이터 영역 */}
        <path d={pathData} fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2" />

        {/* 데이터 포인트 */}
        {points.map((point, index) => (
          <circle key={index} cx={point.x} cy={point.y} r="4" fill="#3b82f6" stroke="white" strokeWidth="2" />
        ))}

        {/* 라벨 */}
        {points.map((point, index) => {
          const labelRadius = radius + 25
          const labelX = center + Math.cos(point.angle) * labelRadius
          const labelY = center + Math.sin(point.angle) * labelRadius

          return (
            <g key={index}>
              <text
                x={labelX}
                y={labelY}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-xs font-medium fill-gray-700"
              >
                {point.key}
              </text>
              <text
                x={labelX}
                y={labelY + 12}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-xs fill-gray-500"
              >
                {point.value}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

export function MemberGameStats() {
  const { data, loading, error, isUsingFallback, refetch } = useData(() => api.getMemberGameStats())
  const [selectedMemberId, setSelectedMemberId] = useState("1")

  if (loading) {
    return <LoadingSpinner className="py-8" />
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={refetch} />
  }

  const memberStats = data?.memberGameStats?.[selectedMemberId]
  const personalityQuestions = data?.personalityQuestions || []

  if (!memberStats) {
    return <ErrorMessage message="Member stats not found" />
  }

  const getTraitIcon = (trait: string) => {
    const icons: Record<string, any> = {
      aggression: Sword,
      teamwork: Users,
      leadership: Star,
      adaptability: Brain,
      communication: MessageCircle,
      strategy: Target,
      mechanics: Zap,
      patience: Heart,
    }
    return icons[trait] || Shield
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "DPS":
        return "text-red-600 bg-red-50"
      case "Tank":
        return "text-blue-600 bg-blue-50"
      case "Support":
        return "text-green-600 bg-green-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  const getResultColor = (result: string) => {
    return result === "Win" ? "text-green-600" : "text-red-600"
  }

  return (
    <div className="space-y-6">
      <DataStatus isUsingFallback={isUsingFallback} />

      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <Gamepad2 className="h-8 w-8" />
          Member Game Statistics
        </h2>
        <p className="text-muted-foreground">Detailed gaming performance and personality analysis</p>
      </div>

      {/* 회원 프로필 헤더 */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-6">
            <Avatar className="h-20 w-20">
              <AvatarImage src={memberStats.avatar || "/placeholder.svg"} alt={memberStats.memberName} />
              <AvatarFallback className="text-lg">
                {memberStats.memberName
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="text-2xl font-bold">{memberStats.memberName}</h3>
              <p className="text-muted-foreground">{memberStats.battleTag}</p>
              <div className="flex items-center gap-4 mt-2">
                <Badge variant="outline" className="text-sm">
                  {memberStats.mainGame}
                </Badge>
                <Badge variant="secondary" className="text-sm">
                  {memberStats.overallStats.rank}
                </Badge>
                <span className="text-sm text-muted-foreground">SR: {memberStats.overallStats.skillRating}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-600">{memberStats.overallStats.winRate}%</div>
              <div className="text-sm text-muted-foreground">Win Rate</div>
              <div className="text-sm text-muted-foreground mt-1">{memberStats.totalPlayTime} played</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="heroes">Heroes</TabsTrigger>
          <TabsTrigger value="personality">Personality</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="matches">Recent Matches</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Matches</CardTitle>
                <Trophy className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{memberStats.overallStats.totalMatches}</div>
                <p className="text-xs text-muted-foreground">
                  {memberStats.overallStats.wins}W / {memberStats.overallStats.losses}L
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average KDA</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{memberStats.overallStats.averageKDA}</div>
                <p className="text-xs text-muted-foreground">Kill/Death/Assist ratio</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Play Time</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{memberStats.totalPlayTime}</div>
                <p className="text-xs text-muted-foreground">Total game time</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Skill Rating</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{memberStats.overallStats.skillRating}</div>
                <p className="text-xs text-muted-foreground">{memberStats.overallStats.rank} tier</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Play Style Analysis</CardTitle>
                <CardDescription>AI-generated play style assessment</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="default">{memberStats.playstyle.primary}</Badge>
                    <Badge variant="outline">{memberStats.playstyle.secondary}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{memberStats.playstyle.description}</p>
                </div>
                <div>
                  <h4 className="font-medium text-green-600 mb-2">Strengths</h4>
                  <ul className="text-sm space-y-1">
                    {memberStats.playstyle.strengths.map((strength: string, index: number) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 bg-green-500 rounded-full" />
                        {strength}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-orange-600 mb-2">Areas for Improvement</h4>
                  <ul className="text-sm space-y-1">
                    {memberStats.playstyle.weaknesses.map((weakness: string, index: number) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 bg-orange-500 rounded-full" />
                        {weakness}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Achievements</CardTitle>
                <CardDescription>Recent accomplishments and milestones</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {memberStats.achievements.map((achievement: any, index: number) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg border">
                      <div
                        className={`p-2 rounded-full ${
                          achievement.rarity === "Legendary"
                            ? "bg-yellow-100 text-yellow-600"
                            : achievement.rarity === "Epic"
                              ? "bg-purple-100 text-purple-600"
                              : "bg-blue-100 text-blue-600"
                        }`}
                      >
                        <Trophy className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{achievement.name}</h4>
                          <Badge variant="outline" className="text-xs">
                            {achievement.rarity}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Earned: {new Date(achievement.earnedDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="heroes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Hero Performance</CardTitle>
              <CardDescription>Detailed statistics for each hero played</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Hero</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Play Time</TableHead>
                    <TableHead>Matches</TableHead>
                    <TableHead>Win Rate</TableHead>
                    <TableHead>KDA</TableHead>
                    <TableHead>Damage</TableHead>
                    <TableHead>Healing</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {memberStats.heroStats.map((hero: any, index: number) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{hero.heroName}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getRoleColor(hero.role)}>
                          {hero.role}
                        </Badge>
                      </TableCell>
                      <TableCell>{hero.playTime}</TableCell>
                      <TableCell>{hero.matches}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{hero.winRate}%</span>
                          <Progress value={hero.winRate} className="w-16 h-2" />
                        </div>
                      </TableCell>
                      <TableCell>{hero.kda}</TableCell>
                      <TableCell>{hero.damage.toLocaleString()}</TableCell>
                      <TableCell>{hero.healing.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="personality" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Personality Radar Chart</CardTitle>
                <CardDescription>Gaming personality traits analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <SpiderChart data={memberStats.personalityTraits} size={350} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Trait Breakdown</CardTitle>
                <CardDescription>Detailed personality trait scores</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(memberStats.personalityTraits).map(([trait, value]) => {
                    const Icon = getTraitIcon(trait)
                    const question = personalityQuestions.find((q: any) => q.id === trait)
                    return (
                      <div key={trait} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Icon className="h-4 w-4 text-blue-600" />
                            <span className="font-medium capitalize">{trait}</span>
                          </div>
                          <span className="font-bold text-blue-600">{value}/100</span>
                        </div>
                        <Progress value={value as number} className="h-2" />
                        {question && <p className="text-xs text-muted-foreground">{question.description}</p>}
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Coaching Recommendations</CardTitle>
              <CardDescription>Personalized improvement suggestions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {memberStats.playstyle.recommendations.map((recommendation: string, index: number) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                    <Eye className="h-4 w-4 text-blue-600 mt-0.5" />
                    <p className="text-sm">{recommendation}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance Trend</CardTitle>
              <CardDescription>Win rate and skill rating progression over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <div className="text-4xl mb-2">📈</div>
                  <p>Performance trend chart would go here</p>
                  <p className="text-sm">Integration with charting library needed</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="matches" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Matches</CardTitle>
              <CardDescription>Latest game results and performance</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Hero</TableHead>
                    <TableHead>Result</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>KDA</TableHead>
                    <TableHead>Performance</TableHead>
                    <TableHead>Map</TableHead>
                    <TableHead>Mode</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {memberStats.recentMatches.map((match: any, index: number) => (
                    <TableRow key={index}>
                      <TableCell className="text-sm">{new Date(match.date).toLocaleDateString()}</TableCell>
                      <TableCell className="font-medium">{match.hero}</TableCell>
                      <TableCell>
                        <Badge variant={match.result === "Win" ? "default" : "destructive"}>{match.result}</Badge>
                      </TableCell>
                      <TableCell>{match.duration}</TableCell>
                      <TableCell className="font-mono text-sm">{match.kda}</TableCell>
                      <TableCell>
                        {match.damage && (
                          <div className="text-sm">
                            <span className="text-red-600">{match.damage.toLocaleString()}</span> dmg
                          </div>
                        )}
                        {match.healing && (
                          <div className="text-sm">
                            <span className="text-green-600">{match.healing.toLocaleString()}</span> heal
                          </div>
                        )}
                      </TableCell>
                      <TableCell>{match.map}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{match.gameMode}</Badge>
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
