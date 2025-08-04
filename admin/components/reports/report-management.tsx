"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Eye, CheckCircle, XCircle } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { ErrorMessage } from "@/components/ui/error-message"
import { useData } from "@/hooks/use-data"
import { api } from "@/lib/api"

export function ReportManagement() {
  const { data, loading, error, refetch } = useData(() => api.getReports())

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Report Management</CardTitle>
          <CardDescription>Review and manage user reports</CardDescription>
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
          <CardTitle>Report Management</CardTitle>
          <CardDescription>Review and manage user reports</CardDescription>
        </CardHeader>
        <CardContent>
          <ErrorMessage message={error} onRetry={refetch} />
        </CardContent>
      </Card>
    )
  }

  const reports = data?.reports || []

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Report Management</CardTitle>
          <CardDescription>Review and manage user reports</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Report Type</TableHead>
                <TableHead>Reported User</TableHead>
                <TableHead>Reporter</TableHead>
                <TableHead>Content</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports.map((report: any) => (
                <TableRow key={report.id}>
                  <TableCell className="font-medium">{report.type}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-xs">{report.reportedUser[0]}</AvatarFallback>
                      </Avatar>
                      {report.reportedUser}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-xs">{report.reporter[0]}</AvatarFallback>
                      </Avatar>
                      {report.reporter}
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs truncate">{report.content}</TableCell>
                  <TableCell>{report.date}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        report.severity === "Critical"
                          ? "destructive"
                          : report.severity === "High"
                            ? "destructive"
                            : "secondary"
                      }
                    >
                      {report.severity}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        report.status === "Resolved" ? "default" : report.status === "Pending" ? "secondary" : "outline"
                      }
                    >
                      {report.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center gap-2 justify-end">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-green-600">
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600">
                        <XCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
