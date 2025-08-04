"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Mail, Shield, User, Activity, MessageSquare, Flag, Ban, UserX } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { ErrorMessage } from "@/components/ui/error-message"
import { useData } from "@/hooks/use-data"
import { api } from "@/lib/api"

export function MemberDetails() {
  const { data, loading, error, refetch } = useData(() => api.getMemberDetails())

  if (loading) {
    return <LoadingSpinner className="py-8" />
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={refetch} />
  }

  // Get the first member as example (in real app, this would be based on route params)
  const memberData = data?.members?.[0]
  const memberDetails = data?.memberDetails?.["1"]

  if (!memberData) {
    return <ErrorMessage message="Member not found" />
  }

  const activityHistory = memberDetails?.activityHistory || []
  const reportHistory = memberDetails?.reportHistory || []

  return (
    <div className="space-y-6">
      {/* Member Profile Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={memberData.avatar || "/placeholder.svg?height=64&width=64"} />
                <AvatarFallback className="text-lg">
                  {memberData.name
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="flex items-center gap-2">
                  {memberData.name}
                  {memberData.verified && <Shield className="h-4 w-4 text-green-500" />}
                </CardTitle>
                <CardDescription className="flex items-center gap-4 mt-1">
                  <span className="flex items-center gap-1">
                    <Mail className="h-3 w-3" />
                    {memberData.email}
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    {memberData.battleTag}
                  </span>
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={memberData.status === "Active" ? "default" : "destructive"}>{memberData.status}</Badge>
              <Badge variant="outline">{memberData.subscription}</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{memberData.totalPosts}</div>
              <div className="text-sm text-muted-foreground">Total Posts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{memberData.totalComments}</div>
              <div className="text-sm text-muted-foreground">Comments</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{memberData.chatRoomsJoined}</div>
              <div className="text-sm text-muted-foreground">Chat Rooms</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{memberData.reports}</div>
              <div className="text-sm text-muted-foreground">Reports</div>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                Joined: {memberData.joinDate}
              </span>
              <span className="flex items-center gap-1">
                <Activity className="h-3 w-3" />
                Last Active: {memberData.lastActive}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <MessageSquare className="mr-2 h-4 w-4" />
                Send Message
              </Button>
              <Button variant="outline" size="sm">
                <Ban className="mr-2 h-4 w-4" />
                Suspend
              </Button>
              <Button variant="destructive" size="sm">
                <UserX className="mr-2 h-4 w-4" />
                Force Withdrawal
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Information Tabs */}
      <Tabs defaultValue="activity" className="space-y-4">
        <TabsList>
          <TabsTrigger value="activity">Activity History</TabsTrigger>
          <TabsTrigger value="reports">Report History</TabsTrigger>
          <TabsTrigger value="settings">Account Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Activity History</CardTitle>
              <CardDescription>Recent member activities and interactions</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Details</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activityHistory.map((activity: any, index: number) => (
                    <TableRow key={index}>
                      <TableCell>{activity.date}</TableCell>
                      <TableCell className="font-medium">{activity.action}</TableCell>
                      <TableCell>{activity.details}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Report History</CardTitle>
              <CardDescription>Reports filed against this member</CardDescription>
            </CardHeader>
            <CardContent>
              {reportHistory.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Reporter</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reportHistory.map((report: any, index: number) => (
                      <TableRow key={index}>
                        <TableCell>{report.date}</TableCell>
                        <TableCell>{report.type}</TableCell>
                        <TableCell>
                          <Badge variant={report.status === "Resolved" ? "default" : "secondary"}>
                            {report.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{report.reporter}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Flag className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No reports filed against this member</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Member account configuration and preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Account Status</label>
                    <div className="mt-1">
                      <Badge variant={memberData.status === "Active" ? "default" : "destructive"}>
                        {memberData.status}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Subscription Type</label>
                    <div className="mt-1">
                      <Badge variant="outline">{memberData.subscription}</Badge>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Battle Tag Verified</label>
                    <div className="mt-1">
                      <Badge variant={memberData.verified ? "default" : "secondary"}>
                        {memberData.verified ? "Verified" : "Not Verified"}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Member Since</label>
                    <div className="mt-1 text-sm text-muted-foreground">{memberData.joinDate}</div>
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
