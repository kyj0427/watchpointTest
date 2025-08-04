"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Clock, User, Mail, MessageSquare, AlertCircle } from "lucide-react"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { ErrorMessage } from "@/components/ui/error-message"
import { DataStatus } from "@/components/ui/data-status"
import { useData } from "@/hooks/use-data"
import { api } from "@/lib/api"
import { useState } from "react"

export function InquiryDetails() {
  const { data, loading, error, isUsingFallback, refetch } = useData(() => api.getInquiries())
  const [selectedInquiry, setSelectedInquiry] = useState<string | null>(null)
  const [replyText, setReplyText] = useState("")

  if (loading) {
    return <LoadingSpinner className="py-8" />
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={refetch} />
  }

  const inquiries = data?.inquiries || []
  const inquiry = selectedInquiry ? inquiries.find((i) => i.id === selectedInquiry) : inquiries[0]

  if (!inquiry) {
    return (
      <div className="text-center py-8">
        <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground">No inquiries found</p>
      </div>
    )
  }

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "critical":
        return "destructive"
      case "high":
        return "default"
      case "medium":
        return "secondary"
      case "low":
        return "outline"
      default:
        return "secondary"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "open":
        return "destructive"
      case "in progress":
        return "default"
      case "resolved":
        return "secondary"
      default:
        return "outline"
    }
  }

  return (
    <div className="space-y-4">
      <DataStatus isUsingFallback={isUsingFallback} />

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Inquiry Details</h2>
          <p className="text-muted-foreground">View and manage member inquiries</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>All Inquiries</CardTitle>
            <CardDescription>Select an inquiry to view details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {inquiries.map((inq) => (
                <div
                  key={inq.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    selectedInquiry === inq.id || (!selectedInquiry && inq.id === inquiry.id)
                      ? "bg-muted border-primary"
                      : "hover:bg-muted/50"
                  }`}
                  onClick={() => setSelectedInquiry(inq.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium truncate">{inq.subject}</span>
                    <Badge variant={getStatusColor(inq.status)} className="text-xs">
                      {inq.status}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {inq.member} • {inq.submittedDate}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="md:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{inquiry.subject}</CardTitle>
                  <CardDescription>Inquiry #{inquiry.id}</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Badge variant={getPriorityColor(inquiry.priority)}>{inquiry.priority}</Badge>
                  <Badge variant={getStatusColor(inquiry.status)}>{inquiry.status}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 mb-6">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{inquiry.member}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{inquiry.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Submitted: {inquiry.submittedDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{inquiry.messages} messages</span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Original Message</h4>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm">{inquiry.content}</p>
                  </div>
                </div>

                {inquiry.replies && inquiry.replies.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Replies</h4>
                    <div className="space-y-3">
                      {inquiry.replies.map((reply) => (
                        <div key={reply.id} className="flex gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>
                              {reply.isAdmin ? "AD" : reply.author.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm font-medium">{reply.author}</span>
                              {reply.isAdmin && (
                                <Badge variant="secondary" className="text-xs">
                                  Admin
                                </Badge>
                              )}
                              <span className="text-xs text-muted-foreground">
                                {new Date(reply.timestamp).toLocaleString()}
                              </span>
                            </div>
                            <div className="p-3 bg-muted rounded-lg">
                              <p className="text-sm">{reply.content}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h4 className="font-medium mb-2">Add Reply</h4>
                  <div className="space-y-3">
                    <Textarea
                      placeholder="Type your reply here..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      rows={4}
                    />
                    <div className="flex gap-2">
                      <Button>Send Reply</Button>
                      <Button variant="outline">Save Draft</Button>
                      <Button variant="outline">Close Inquiry</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
