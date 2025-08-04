"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { User, Shield, Bell, Activity, Upload, Eye, EyeOff, Key, Smartphone } from "lucide-react"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { ErrorMessage } from "@/components/ui/error-message"
import { DataStatus } from "@/components/ui/data-status"
import { useData } from "@/hooks/use-data"
import { api } from "@/lib/api"
import { useState } from "react"

export function ProfileSettings() {
  const { data, loading, error, isUsingFallback, refetch } = useData(() => api.getAdminProfile())
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  if (loading) {
    return <LoadingSpinner className="py-8" />
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={refetch} />
  }

  const profile = data?.profile || {}
  const activityStats = data?.activityStats || {}
  const securitySettings = data?.securitySettings || {}
  const notificationSettings = data?.notificationSettings || {}

  return (
    <div className="space-y-6">
      <DataStatus isUsingFallback={isUsingFallback} />

      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <User className="h-8 w-8" />
          Profile Settings
        </h2>
        <p className="text-muted-foreground">Manage your admin account and preferences</p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Profile Overview</CardTitle>
                <CardDescription>Your admin account information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col items-center space-y-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={profile.avatar || "/placeholder.svg"} alt={profile.name} />
                    <AvatarFallback className="text-lg">
                      {profile.name
                        ?.split(" ")
                        .map((n: string) => n[0])
                        .join("") || "AU"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <h3 className="text-xl font-semibold">{profile.name || "Admin User"}</h3>
                    <p className="text-muted-foreground">{profile.email || "admin@watchpoint.co.kr"}</p>
                    <Badge variant="secondary" className="mt-2">
                      {profile.role || "Super Admin"}
                    </Badge>
                  </div>
                  <Button variant="outline" className="w-full bg-transparent">
                    <Upload className="h-4 w-4 mr-2" />
                    Change Avatar
                  </Button>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Member since:</span>
                      <p className="font-medium">{profile.memberSince || "2023. 6. 15."}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Last login:</span>
                      <p className="font-medium">{profile.lastLogin || "2024. 1. 21."}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Total logins:</span>
                      <p className="font-medium text-right">{profile.totalLogins || "245"}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Status:</span>
                      <Badge variant="outline" className="ml-2">
                        Active
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Activity Summary
                </CardTitle>
                <CardDescription>Your admin activity statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600">{activityStats.totalLogins || "245"}</div>
                      <p className="text-sm text-muted-foreground">Total Logins</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600">{activityStats.actionsThisMonth || "89"}</div>
                      <p className="text-sm text-muted-foreground">Actions This Month</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600">{activityStats.reportsResolved || "156"}</div>
                      <p className="text-sm text-muted-foreground">Reports Resolved</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-orange-600">{activityStats.usersModerated || "23"}</div>
                      <p className="text-sm text-muted-foreground">Users Moderated</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue={profile.firstName || "Admin"} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue={profile.lastName || "User"} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" defaultValue={profile.email || "admin@watchpoint.co.kr"} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" defaultValue={profile.phone || "+82 10-1234-5678"} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea id="bio" placeholder="Tell us about yourself..." defaultValue={profile.bio || ""} />
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Settings
              </CardTitle>
              <CardDescription>Manage your account security and authentication</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="text-sm font-medium">Two-Factor Authentication</h4>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm">Enable 2FA for enhanced security</p>
                    <p className="text-xs text-muted-foreground">
                      {securitySettings.twoFactorEnabled ? "Currently enabled" : "Currently disabled"}
                    </p>
                  </div>
                  <Switch defaultChecked={securitySettings.twoFactorEnabled || false} />
                </div>
                {securitySettings.twoFactorEnabled && (
                  <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                    <Smartphone className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-700">2FA is active via authenticator app</span>
                  </div>
                )}
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="text-sm font-medium">Login Notifications</h4>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm">Get notified of new login attempts</p>
                    <p className="text-xs text-muted-foreground">Email alerts for suspicious activity</p>
                  </div>
                  <Switch defaultChecked={securitySettings.loginNotifications || true} />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="text-sm font-medium">Session Management</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Active Sessions</span>
                    <Badge variant="outline">{securitySettings.activeSessions || 2}</Badge>
                  </div>
                  <Button variant="outline" size="sm">
                    View All Sessions
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                Change Password
              </CardTitle>
              <CardDescription>Update your account password</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <div className="relative">
                  <Input
                    id="currentPassword"
                    type={showCurrentPassword ? "text" : "password"}
                    placeholder="Enter current password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <div className="relative">
                  <Input
                    id="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    placeholder="Enter new password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm new password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <Button>Update Password</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
              <CardDescription>Choose what notifications you want to receive</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="text-sm font-medium">Email Notifications</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm">System Alerts</p>
                      <p className="text-xs text-muted-foreground">Critical system notifications</p>
                    </div>
                    <Switch defaultChecked={notificationSettings.systemAlerts || true} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm">User Reports</p>
                      <p className="text-xs text-muted-foreground">New user reports and flags</p>
                    </div>
                    <Switch defaultChecked={notificationSettings.userReports || true} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm">Member Inquiries</p>
                      <p className="text-xs text-muted-foreground">New member support requests</p>
                    </div>
                    <Switch defaultChecked={notificationSettings.memberInquiries || false} />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="text-sm font-medium">Push Notifications</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm">Urgent Alerts</p>
                      <p className="text-xs text-muted-foreground">High priority system alerts</p>
                    </div>
                    <Switch defaultChecked={notificationSettings.urgentAlerts || true} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm">Daily Summary</p>
                      <p className="text-xs text-muted-foreground">Daily activity summary</p>
                    </div>
                    <Switch defaultChecked={notificationSettings.dailySummary || false} />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="text-sm font-medium">Notification Schedule</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="quietStart">Quiet Hours Start</Label>
                    <Input id="quietStart" type="time" defaultValue={notificationSettings.quietHoursStart || "22:00"} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quietEnd">Quiet Hours End</Label>
                    <Input id="quietEnd" type="time" defaultValue={notificationSettings.quietHoursEnd || "08:00"} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Recent Activity
              </CardTitle>
              <CardDescription>Your recent admin actions and login history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {(data?.recentActivity || []).map((activity: any, index: number) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg border">
                    <div className="h-2 w-2 rounded-full bg-blue-500" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {activity.type}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
