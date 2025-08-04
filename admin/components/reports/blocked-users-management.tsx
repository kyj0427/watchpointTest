"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Shield, UserCheck, Trash2 } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { ErrorMessage } from "@/components/ui/error-message"
import { useData } from "@/hooks/use-data"
import { api } from "@/lib/api"

export function BlockedUsersManagement() {
  const { data, loading, error, refetch } = useData(() => api.getBlockedUsers())

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Blocked Users Management</CardTitle>
          <CardDescription>Manage blocked users and review unblock requests</CardDescription>
        </CardHeader>
        <CardContent>
          <LoadingSpinner className="py-8" />
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Blocked Users Management</CardTitle>
          <CardDescription>Manage blocked users and review unblock requests</CardDescription>
        </CardHeader>
        <CardContent>
          <ErrorMessage message={error} onRetry={refetch} />
        </CardContent>
      </Card>
    )
  }

  const blockedUsers = data?.blockedUsers || []

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Blocked Users Management</CardTitle>
          <CardDescription>Manage blocked users and review unblock requests</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search blocked users..." className="pl-8" />
            </div>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="permanent">Permanently Blocked</SelectItem>
                <SelectItem value="temporary">Temporary Block</SelectItem>
                <SelectItem value="review">Under Review</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Blocked by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="system">System</SelectItem>
                <SelectItem value="moderator">Moderator</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Battle Tag</TableHead>
                <TableHead>Block Reason</TableHead>
                <TableHead>Block Date</TableHead>
                <TableHead>Blocked By</TableHead>
                <TableHead>Reports</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Unblock Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {blockedUsers.map((user: any) => (
                <TableRow key={user.id}>
                  <TableCell className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{user.name.split("").slice(0, 2).join("").toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-muted-foreground">{user.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>{user.battleTag}</TableCell>
                  <TableCell className="max-w-xs truncate">{user.blockReason}</TableCell>
                  <TableCell>{user.blockDate}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{user.blockedBy}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="destructive">{user.reportCount}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        user.status === "Permanently Blocked"
                          ? "destructive"
                          : user.status === "Temporary Block"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.unblockDate || "N/A"}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center gap-2 justify-end">
                      {user.status !== "Permanently Blocked" && (
                        <Button variant="outline" size="sm">
                          <UserCheck className="mr-2 h-4 w-4" />
                          Unblock
                        </Button>
                      )}
                      <Button variant="ghost" size="sm">
                        <Shield className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Block Statistics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Blocked</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{blockedUsers.length}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Permanent Blocks</CardTitle>
            <Shield className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {blockedUsers.filter((u: any) => u.status === "Permanently Blocked").length}
            </div>
            <p className="text-xs text-muted-foreground">Never unblocked</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Temporary Blocks</CardTitle>
            <Shield className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {blockedUsers.filter((u: any) => u.status === "Temporary Block").length}
            </div>
            <p className="text-xs text-muted-foreground">With unblock date</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Under Review</CardTitle>
            <Shield className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {blockedUsers.filter((u: any) => u.status === "Under Review").length}
            </div>
            <p className="text-xs text-muted-foreground">Pending decision</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
