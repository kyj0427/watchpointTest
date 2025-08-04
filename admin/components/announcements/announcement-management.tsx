"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Eye } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { ErrorMessage } from "@/components/ui/error-message"
import { useData } from "@/hooks/use-data"
import { api } from "@/lib/api"

export function AnnouncementManagement() {
  const { data, loading, error, refetch } = useData(() => api.getAnnouncements())

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Announcement Management</CardTitle>
          <CardDescription>Create and manage platform announcements</CardDescription>
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
          <CardTitle>Announcement Management</CardTitle>
          <CardDescription>Create and manage platform announcements</CardDescription>
        </CardHeader>
        <CardContent>
          <ErrorMessage message={error} onRetry={refetch} />
        </CardContent>
      </Card>
    )
  }

  const announcements = data?.announcements || []

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Announcement Management</CardTitle>
              <CardDescription>Create and manage platform announcements</CardDescription>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Announcement
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Content Preview</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Views</TableHead>
                <TableHead>Publish Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {announcements.map((announcement: any) => (
                <TableRow key={announcement.id}>
                  <TableCell className="font-medium">{announcement.title}</TableCell>
                  <TableCell className="max-w-xs truncate">{announcement.content}</TableCell>
                  <TableCell>
                    <Badge variant={announcement.status === "Published" ? "default" : "secondary"}>
                      {announcement.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        announcement.priority === "High"
                          ? "destructive"
                          : announcement.priority === "Medium"
                            ? "default"
                            : "secondary"
                      }
                    >
                      {announcement.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>{announcement.author}</TableCell>
                  <TableCell>{announcement.views}</TableCell>
                  <TableCell>{announcement.publishDate}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center gap-2 justify-end">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
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
    </div>
  )
}
