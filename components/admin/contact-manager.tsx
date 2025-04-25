"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Archive,
  ArrowDown,
  ArrowUp,
  Check,
  Clock,
  Filter,
  Mail,
  MoreHorizontal,
  Reply,
  Search,
  Star,
  Trash,
  User,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ContactManager() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      name: "John Smith",
      email: "john@example.com",
      subject: "Job Opportunity",
      message:
        "Hi there, I came across your portfolio and was really impressed with your work. We're looking for someone with your skills for a project. Would you be interested in discussing this further?",
      date: "2023-11-28T10:30:00",
      status: "New",
      isStarred: false,
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah@example.com",
      subject: "Collaboration Request",
      message:
        "Hello! I'm a designer working on a new platform and I love your development style. I think we could create something amazing together. Are you open to collaboration opportunities?",
      date: "2023-11-27T14:45:00",
      status: "Responded",
      isStarred: true,
    },
    {
      id: 3,
      name: "Mike Williams",
      email: "mike@example.com",
      subject: "Question about your work",
      message:
        "I noticed the animation effects on your portfolio projects and I'm curious about how you achieved that smooth transition effect. Would you mind sharing some insights on your approach?",
      date: "2023-11-25T09:15:00",
      status: "New",
      isStarred: false,
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily@example.com",
      subject: "Speaking opportunity",
      message:
        "We're organizing a web development conference next month and would love to have you as a speaker to talk about your experience with modern frontend frameworks. Please let me know if you're interested!",
      date: "2023-11-22T16:20:00",
      status: "Archived",
      isStarred: false,
    },
    {
      id: 5,
      name: "David Wilson",
      email: "david@example.com",
      subject: "Feedback on your portfolio",
      message:
        "Just wanted to drop a note saying how much I enjoyed browsing through your portfolio. The projects are well-documented and the UI is very intuitive. Great job!",
      date: "2023-11-20T11:05:00",
      status: "Responded",
      isStarred: false,
    },
  ])

  const [activeTab, setActiveTab] = useState("all")
  const [selectedMessage, setSelectedMessage] = useState<number | null>(null)
  const [replyText, setReplyText] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredMessages = messages.filter((message) => {
    // Filter by tab
    if (activeTab === "new" && message.status !== "New") return false
    if (activeTab === "responded" && message.status !== "Responded") return false
    if (activeTab === "archived" && message.status !== "Archived") return false
    if (activeTab === "starred" && !message.isStarred) return false

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        message.name.toLowerCase().includes(query) ||
        message.email.toLowerCase().includes(query) ||
        message.subject.toLowerCase().includes(query) ||
        message.message.toLowerCase().includes(query)
      )
    }

    return true
  })

  const handleStarMessage = (id: number) => {
    setMessages(
      messages.map((message) => (message.id === id ? { ...message, isStarred: !message.isStarred } : message)),
    )
  }

  const handleStatusChange = (id: number, status: string) => {
    setMessages(messages.map((message) => (message.id === id ? { ...message, status } : message)))
  }

  const handleSendReply = () => {
    if (selectedMessage && replyText.trim()) {
      // In a real app, you would send the reply via API
      handleStatusChange(selectedMessage, "Responded")
      setReplyText("")
      // Optionally show a success message
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))

    if (diffDays === 0) {
      return "Today"
    } else if (diffDays === 1) {
      return "Yesterday"
    } else if (diffDays < 7) {
      return `${diffDays} days ago`
    } else {
      return date.toLocaleDateString()
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Contact Manager</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Manage and respond to messages from your contact form.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              type="search"
              placeholder="Search messages..."
              className="w-full pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="new">New</TabsTrigger>
              <TabsTrigger value="responded">Responded</TabsTrigger>
              <TabsTrigger value="starred">Starred</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">{filteredMessages.length} messages</p>
            <Button variant="ghost" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>

          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
            {filteredMessages.length > 0 ? (
              filteredMessages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card
                    className={`cursor-pointer transition-colors ${
                      selectedMessage === message.id
                        ? "border-teal-500 bg-teal-50 dark:bg-teal-900/10"
                        : "hover:border-gray-300 dark:hover:border-gray-700"
                    }`}
                    onClick={() => setSelectedMessage(message.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center space-x-2">
                          <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                            <User className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{message.name}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{message.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleStarMessage(message.id)
                            }}
                            className="text-gray-400 hover:text-yellow-400 dark:hover:text-yellow-300"
                          >
                            <Star className="h-4 w-4" fill={message.isStarred ? "currentColor" : "none"} />
                          </button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => handleStatusChange(message.id, "Responded")}>
                                <Check className="h-4 w-4 mr-2" />
                                Mark as Responded
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleStatusChange(message.id, "Archived")}>
                                <Archive className="h-4 w-4 mr-2" />
                                Archive
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-500">
                                <Trash className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                      <div className="mt-2">
                        <p className="font-medium text-sm">{message.subject}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mt-1">{message.message}</p>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <Badge
                          variant={
                            message.status === "New"
                              ? "default"
                              : message.status === "Responded"
                                ? "outline"
                                : "secondary"
                          }
                          className="text-xs"
                        >
                          {message.status}
                        </Badge>
                        <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {formatDate(message.date)}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Mail className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium">No messages found</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  {searchQuery
                    ? "Try adjusting your search or filters"
                    : "You don't have any messages in this category"}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="md:col-span-2">
          {selectedMessage ? (
            <Card className="h-full flex flex-col">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{messages.find((m) => m.id === selectedMessage)?.subject}</CardTitle>
                    <CardDescription>
                      From: {messages.find((m) => m.id === selectedMessage)?.name} (
                      {messages.find((m) => m.id === selectedMessage)?.email})
                    </CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <ArrowUp className="h-4 w-4 mr-2" />
                      Older
                    </Button>
                    <Button variant="outline" size="sm">
                      <ArrowDown className="h-4 w-4 mr-2" />
                      Newer
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-grow overflow-auto">
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                      <User className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex justify-between">
                        <div>
                          <p className="font-medium">{messages.find((m) => m.id === selectedMessage)?.name}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {messages.find((m) => m.id === selectedMessage)?.email}
                          </p>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {formatDate(messages.find((m) => m.id === selectedMessage)?.date || "")}
                        </p>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                        <p className="text-sm whitespace-pre-line">
                          {messages.find((m) => m.id === selectedMessage)?.message}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t border-gray-200 dark:border-gray-800 p-4">
                <div className="w-full space-y-4">
                  <Textarea
                    placeholder="Type your reply here..."
                    className="w-full"
                    rows={4}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                  />
                  <div className="flex justify-between">
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Archive className="h-4 w-4 mr-2" />
                        Archive
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-500">
                        <Trash className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                    <Button
                      className="bg-teal-500 hover:bg-teal-600"
                      onClick={handleSendReply}
                      disabled={!replyText.trim()}
                    >
                      <Reply className="h-4 w-4 mr-2" />
                      Send Reply
                    </Button>
                  </div>
                </div>
              </CardFooter>
            </Card>
          ) : (
            <div className="h-full flex flex-col items-center justify-center py-12 text-center">
              <Mail className="h-16 w-16 text-gray-400 mb-4" />
              <h3 className="text-xl font-medium">Select a message</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 max-w-md">
                Choose a message from the list to view its contents and reply to it.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
