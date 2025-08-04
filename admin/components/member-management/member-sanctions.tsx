"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Ban, UserX, AlertTriangle, Search } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { ErrorMessage } from "@/components/ui/error-message"
import { DataStatus } from "@/components/ui/data-status"
import { useData } from "@/hooks/use-data"
import { api } from "@/lib/api"
import { useState } from "react"

export function MemberSanctions() {
  const [selectedMember, setSelectedMember] = useState<any>(null)
  const [sanctionDialogOpen, setSanctionDialogOpen] = useState(false)
  const { data, loading, error, isUsingFallback, refetch } = useData(() => api.getSanctions())

  if (loading) {
    return (
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Member Sanctions</CardTitle>
            <CardDescription>Manage member suspensions and forced withdrawals</CardDescription>
          </CardHeader>
          <CardContent>
            <LoadingSpinner className="py-8" />
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Member Sanctions</CardTitle>
            <CardDescription>Manage member suspensions and forced withdrawals</CardDescription>
          </CardHeader>
          <CardContent>
            <ErrorMessage message={error} onRetry={refetch} />
          </CardContent>
        </Card>
      </div>
    )
  }

  const sanctionedMembers = data?.sanctions || []

  return (
    <div className="space-y-4">
      <DataStatus isUsingFallback={isUsingFallback} />

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Member Sanctions</CardTitle>
              <CardDescription>Manage member suspensions and forced withdrawals</CardDescription>
            </div>
            <Dialog open={sanctionDialogOpen} onOpenChange={setSanctionDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  New Sanction
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Apply Member Sanction</DialogTitle>
                  <DialogDescription>
                    Apply disciplinary action to a member who violates platform rules.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="member" className="text-right">
                      Member
                    </Label>
                    <Input id="member" placeholder="Search member..." className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="sanction-type" className="text-right">
                      Type
                    </Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select sanction type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="warning">Warning</SelectItem>
                        <SelectItem value="suspension">Suspension</SelectItem>
                        <SelectItem value="forced-withdrawal">Forced Withdrawal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="duration" className="text-right">
                      Duration
                    </Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-day">1 Day</SelectItem>
                        <SelectItem value="3-days">3 Days</SelectItem>
                        <SelectItem value="7-days">7 Days</SelectItem>
                        <SelectItem value="30-days">30 Days</SelectItem>
                        <SelectItem value="permanent">Permanent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="reason" className="text-right">
                      Reason
                    </Label>
                    <Textarea
                      id="reason"
                      placeholder="Explain the reason for this sanction..."
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" variant="destructive">
                    Apply Sanction
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search sanctioned members..." className="pl-8" />
            </div>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
                <SelectItem value="forced-withdrawal">Forced Withdrawal</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="permanent">Permanent</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Member</TableHead>
                <TableHead>Battle Tag</TableHead>
                <TableHead>Sanction Type</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Reports</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sanctionedMembers.map((member: any) => (
                <TableRow key={member.id}>
                  <TableCell className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{member.name.split("").slice(0, 2).join("").toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{member.name}</div>
                      <div className="text-sm text-muted-foreground">{member.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>{member.battleTag}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        member.sanctionType === "Forced Withdrawal"
                          ? "destructive"
                          : member.sanctionType === "Suspended"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {member.sanctionType}
                    </Badge>
                  </TableCell>
                  <TableCell className="max-w-xs truncate">{member.reason}</TableCell>
                  <TableCell>{member.duration}</TableCell>
                  <TableCell>
                    <Badge variant="destructive">{member.reportCount}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        member.status === "Permanent Ban"
                          ? "destructive"
                          : member.status === "Active Sanction"
                            ? "secondary"
                            : "default"
                      }
                    >
                      {member.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{member.sanctionDate}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center gap-2 justify-end">
                      {member.status === "Active Sanction" && (
                        <Button variant="outline" size="sm">
                          Lift Sanction
                        </Button>
                      )}
                      <Button variant="ghost" size="sm">
                        View Details
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Sanction Statistics */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Sanctions</CardTitle>
            <Ban className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {sanctionedMembers.filter((s: any) => s.status === "Active Sanction").length}
            </div>
            <p className="text-xs text-muted-foreground">Currently active</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Permanent Bans</CardTitle>
            <UserX className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {sanctionedMembers.filter((s: any) => s.status === "Permanent Ban").length}
            </div>
            <p className="text-xs text-muted-foreground">Forced withdrawals</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sanctionedMembers.length}</div>
            <p className="text-xs text-muted-foreground">New sanctions applied</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
