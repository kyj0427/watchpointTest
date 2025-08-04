"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Settings, Shield, Bell, Database, Wrench, Save } from "lucide-react"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { ErrorMessage } from "@/components/ui/error-message"
import { DataStatus } from "@/components/ui/data-status"
import { useData } from "@/hooks/use-data"
import { api } from "@/lib/api"
import { useState } from "react"

export function SystemSettings() {
  const { data, loading, error, isUsingFallback, refetch } = useData(() => api.getSystemSettings())
  const [hasChanges, setHasChanges] = useState(false)

  if (loading) {
    return <LoadingSpinner className="py-8" />
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={refetch} />
  }

  const settings = data || {}
  const general = settings.general || {}
  const security = settings.security || {}
  const notifications = settings.notifications || {}
  const moderation = settings.moderation || {}
  const backup = settings.backup || {}

  return (
    <div className="space-y-4">
      <DataStatus isUsingFallback={isUsingFallback} />

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Settings className="h-6 w-6" />
            System Settings
          </h2>
          <p className="text-muted-foreground">Configure platform settings and preferences</p>
        </div>
        {hasChanges && (
          <Button>
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        )}
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="moderation">Moderation</TabsTrigger>
          <TabsTrigger value="backup">Backup</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wrench className="h-5 w-5" />
                General Settings
              </CardTitle>
              <CardDescription>Basic platform configuration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="platform-name">Platform Name</Label>
                  <Input id="platform-name" defaultValue={general.platformName} onChange={() => setHasChanges(true)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="platform-url">Platform URL</Label>
                  <Input id="platform-url" defaultValue={general.platformUrl} onChange={() => setHasChanges(true)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="support-email">Support Email</Label>
                  <Input
                    id="support-email"
                    type="email"
                    defaultValue={general.supportEmail}
                    onChange={() => setHasChanges(true)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Default Timezone</Label>
                  <Select defaultValue={general.timezone}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/New_York">Eastern Time</SelectItem>
                      <SelectItem value="America/Chicago">Central Time</SelectItem>
                      <SelectItem value="America/Denver">Mountain Time</SelectItem>
                      <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Separator />
              <div className="space-y-4">
                <h4 className="font-medium">Platform Controls</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-medium">Maintenance Mode</h5>
                      <p className="text-sm text-muted-foreground">Temporarily disable access to the platform</p>
                    </div>
                    <Switch checked={general.maintenanceMode} onCheckedChange={() => setHasChanges(true)} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-medium">User Registration</h5>
                      <p className="text-sm text-muted-foreground">Allow new users to register accounts</p>
                    </div>
                    <Switch checked={general.registrationEnabled} onCheckedChange={() => setHasChanges(true)} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Settings
              </CardTitle>
              <CardDescription>Configure security policies and restrictions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="password-min-length">Minimum Password Length</Label>
                  <Input
                    id="password-min-length"
                    type="number"
                    defaultValue={security.passwordMinLength}
                    onChange={() => setHasChanges(true)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="session-timeout">Session Timeout (seconds)</Label>
                  <Input
                    id="session-timeout"
                    type="number"
                    defaultValue={security.sessionTimeout}
                    onChange={() => setHasChanges(true)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="max-login-attempts">Max Login Attempts</Label>
                  <Input
                    id="max-login-attempts"
                    type="number"
                    defaultValue={security.maxLoginAttempts}
                    onChange={() => setHasChanges(true)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rate-limit">Rate Limit (requests/hour)</Label>
                  <Input
                    id="rate-limit"
                    type="number"
                    defaultValue={security.rateLimitRequests}
                    onChange={() => setHasChanges(true)}
                  />
                </div>
              </div>
              <Separator />
              <div className="space-y-4">
                <h4 className="font-medium">Security Features</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-medium">Require Special Characters</h5>
                      <p className="text-sm text-muted-foreground">Passwords must contain special characters</p>
                    </div>
                    <Switch
                      checked={security.passwordRequireSpecialChars}
                      onCheckedChange={() => setHasChanges(true)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-medium">Two-Factor Authentication Required</h5>
                      <p className="text-sm text-muted-foreground">Force all users to enable 2FA</p>
                    </div>
                    <Switch checked={security.twoFactorRequired} onCheckedChange={() => setHasChanges(true)} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-medium">Rate Limiting</h5>
                      <p className="text-sm text-muted-foreground">Enable API rate limiting</p>
                    </div>
                    <Switch checked={security.rateLimitEnabled} onCheckedChange={() => setHasChanges(true)} />
                  </div>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <Label htmlFor="ip-whitelist">IP Whitelist</Label>
                <Textarea
                  id="ip-whitelist"
                  placeholder="Enter IP addresses or ranges, one per line"
                  defaultValue={security.ipWhitelist?.join("\n")}
                  onChange={() => setHasChanges(true)}
                />
                <p className="text-sm text-muted-foreground">
                  Only these IP addresses will be allowed to access admin functions
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Settings
              </CardTitle>
              <CardDescription>Configure notification channels and settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Email Notifications</h4>
                  <p className="text-sm text-muted-foreground">Enable email notifications for system events</p>
                </div>
                <Switch checked={notifications.emailEnabled} onCheckedChange={() => setHasChanges(true)} />
              </div>
              <Separator />
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="smtp-host">SMTP Host</Label>
                  <Input id="smtp-host" defaultValue={notifications.smtpHost} onChange={() => setHasChanges(true)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtp-port">SMTP Port</Label>
                  <Input
                    id="smtp-port"
                    type="number"
                    defaultValue={notifications.smtpPort}
                    onChange={() => setHasChanges(true)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtp-username">SMTP Username</Label>
                  <Input
                    id="smtp-username"
                    defaultValue={notifications.smtpUsername}
                    onChange={() => setHasChanges(true)}
                  />
                </div>
              </div>
              <Separator />
              <div className="space-y-4">
                <h4 className="font-medium">Webhook Integrations</h4>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="slack-webhook">Slack Webhook URL</Label>
                    <Input
                      id="slack-webhook"
                      placeholder="https://hooks.slack.com/..."
                      defaultValue={notifications.slackWebhook}
                      onChange={() => setHasChanges(true)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="discord-webhook">Discord Webhook URL</Label>
                    <Input
                      id="discord-webhook"
                      placeholder="https://discord.com/api/webhooks/..."
                      defaultValue={notifications.discordWebhook}
                      onChange={() => setHasChanges(true)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="moderation">
          <Card>
            <CardHeader>
              <CardTitle>Moderation Settings</CardTitle>
              <CardDescription>Configure automated moderation and content filtering</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Auto Moderation</h4>
                    <p className="text-sm text-muted-foreground">Automatically detect and handle violations</p>
                  </div>
                  <Switch checked={moderation.autoModerationEnabled} onCheckedChange={() => setHasChanges(true)} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Profanity Filter</h4>
                    <p className="text-sm text-muted-foreground">Filter inappropriate language</p>
                  </div>
                  <Switch checked={moderation.profanityFilterEnabled} onCheckedChange={() => setHasChanges(true)} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Spam Detection</h4>
                    <p className="text-sm text-muted-foreground">Automatically detect spam content</p>
                  </div>
                  <Switch checked={moderation.spamDetectionEnabled} onCheckedChange={() => setHasChanges(true)} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Auto Suspend</h4>
                    <p className="text-sm text-muted-foreground">Automatically suspend users after threshold</p>
                  </div>
                  <Switch checked={moderation.autoSuspendEnabled} onCheckedChange={() => setHasChanges(true)} />
                </div>
              </div>
              <Separator />
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="report-threshold">Report Threshold</Label>
                  <Input
                    id="report-threshold"
                    type="number"
                    defaultValue={moderation.reportThreshold}
                    onChange={() => setHasChanges(true)}
                  />
                  <p className="text-sm text-muted-foreground">Number of reports before action is taken</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="backup">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Backup Settings
              </CardTitle>
              <CardDescription>Configure automated backups and data retention</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Automated Backups</h4>
                  <p className="text-sm text-muted-foreground">Enable scheduled database backups</p>
                </div>
                <Switch checked={backup.enabled} onCheckedChange={() => setHasChanges(true)} />
              </div>
              <Separator />
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="backup-frequency">Backup Frequency</Label>
                  <Select defaultValue={backup.frequency}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="retention-days">Retention Period (days)</Label>
                  <Input
                    id="retention-days"
                    type="number"
                    defaultValue={backup.retentionDays}
                    onChange={() => setHasChanges(true)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="s3-bucket">S3 Bucket</Label>
                  <Input id="s3-bucket" defaultValue={backup.s3Bucket} onChange={() => setHasChanges(true)} />
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <h4 className="font-medium">Backup Status</h4>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">Last backup: {new Date(backup.lastBackup).toLocaleString()}</Badge>
                  <Button variant="outline" size="sm">
                    Run Backup Now
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
