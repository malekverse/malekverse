"use client"

import { useState } from "react"
import { CalendarIcon, Clock, Edit, Eye, Linkedin, MoreHorizontal, Plus, Trash2, FileText, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

type ContentStatus = "draft" | "scheduled" | "published" | "failed"
type Platform = "portfolio" | "linkedin" | "github"

interface ScheduledContent {
  id: string
  title: string
  excerpt: string
  scheduledDate: Date
  status: ContentStatus
  platforms: Platform[]
}

export function ContentScheduler() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [view, setView] = useState<"calendar" | "list">("calendar")

  // Sample scheduled content
  const scheduledContent: ScheduledContent[] = [
    {
      id: "1",
      title: "Building a Modern Portfolio with Next.js and Three.js",
      excerpt:
        "In this article, I'll walk through how I created an interactive portfolio website using Next.js 14 and Three.js...",
      scheduledDate: new Date(2023, 4, 15, 10, 0),
      status: "scheduled",
      platforms: ["portfolio", "linkedin"],
    },
    {
      id: "2",
      title: "My Approach to Continuous Learning in Web Development",
      excerpt:
        "As a developer, staying current with the latest technologies is essential. In this post, I'll share my approach...",
      scheduledDate: new Date(2023, 4, 18, 14, 30),
      status: "draft",
      platforms: ["portfolio", "linkedin", "github"],
    },
    {
      id: "3",
      title: "How I Built a Custom Admin Dashboard for My Portfolio",
      excerpt:
        "Managing content across multiple platforms can be challenging. Here's how I built a custom admin dashboard...",
      scheduledDate: new Date(2023, 4, 20, 9, 0),
      status: "scheduled",
      platforms: ["portfolio"],
    },
    {
      id: "4",
      title: "Optimizing React Performance: Lessons from My Portfolio Project",
      excerpt:
        "Performance optimization is crucial for modern web applications. In this post, I share techniques I used...",
      scheduledDate: new Date(2023, 4, 10, 15, 0),
      status: "published",
      platforms: ["portfolio", "linkedin"],
    },
    {
      id: "5",
      title: "Creating Engaging 3D Experiences with Three.js",
      excerpt:
        "Three.js opens up possibilities for creating immersive web experiences. Here's how I implemented 3D elements...",
      scheduledDate: new Date(2023, 4, 12, 11, 0),
      status: "failed",
      platforms: ["portfolio", "github"],
    },
  ]

  const getStatusColor = (status: ContentStatus) => {
    switch (status) {
      case "draft":
        return "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
      case "scheduled":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "published":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "failed":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
    }
  }

  const getPlatformIcon = (platform: Platform) => {
    switch (platform) {
      case "portfolio":
        return <FileText className="h-4 w-4" />
      case "linkedin":
        return <Linkedin className="h-4 w-4" />
      case "github":
        return <Github className="h-4 w-4" />
    }
  }

  const filteredContent = date
    ? scheduledContent.filter(
        (content) =>
          content.scheduledDate.getDate() === date.getDate() &&
          content.scheduledDate.getMonth() === date.getMonth() &&
          content.scheduledDate.getFullYear() === date.getFullYear(),
      )
    : scheduledContent

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Content Schedule</h2>
        <div className="flex space-x-2">
          <Tabs defaultValue="calendar" onValueChange={(value) => setView(value as "calendar" | "list")}>
            <TabsList>
              <TabsTrigger value="calendar">Calendar</TabsTrigger>
              <TabsTrigger value="list">List</TabsTrigger>
            </TabsList>
          </Tabs>
          <Button className="bg-teal-500 hover:bg-teal-600">
            <Plus className="h-4 w-4 mr-2" />
            New Content
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
            <CardDescription>Select a date to view or schedule content</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
              components={{
                DayContent: (props) => {
                  // Check if there's content scheduled for this day
                  const hasContent = scheduledContent.some(
                    (content) =>
                      content.scheduledDate.getDate() === props.date.getDate() &&
                      content.scheduledDate.getMonth() === props.date.getMonth() &&
                      content.scheduledDate.getFullYear() === props.date.getFullYear(),
                  )

                  return (
                    <div className="relative">
                      {props.day}
                      {hasContent && (
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-teal-500 rounded-full" />
                      )}
                    </div>
                  )
                },
              }}
            />
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>{date ? format(date, "MMMM d, yyyy") : "All Scheduled Content"}</CardTitle>
            <CardDescription>
              {filteredContent.length} {filteredContent.length === 1 ? "item" : "items"}{" "}
              {date ? "scheduled for this day" : "in your schedule"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {filteredContent.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 dark:text-gray-400">No content scheduled for this date</p>
                <Button className="mt-4 bg-teal-500 hover:bg-teal-600">
                  <Plus className="h-4 w-4 mr-2" />
                  Schedule Content
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredContent.map((content) => (
                  <div
                    key={content.id}
                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="space-y-2 mb-3 sm:mb-0">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-medium">{content.title}</h3>
                        <Badge className={cn("text-xs", getStatusColor(content.status))}>
                          {content.status.charAt(0).toUpperCase() + content.status.slice(1)}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{content.excerpt}</p>
                      <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                        <CalendarIcon className="h-4 w-4" />
                        <span>{format(content.scheduledDate, "MMM d, yyyy")}</span>
                        <Clock className="h-4 w-4 ml-2" />
                        <span>{format(content.scheduledDate, "h:mm a")}</span>
                      </div>
                      <div className="flex space-x-1">
                        {content.platforms.map((platform) => (
                          <Badge key={platform} variant="outline" className="text-xs">
                            <span className="flex items-center">
                              {getPlatformIcon(platform)}
                              <span className="ml-1">{platform.charAt(0).toUpperCase() + platform.slice(1)}</span>
                            </span>
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex space-x-2 self-end sm:self-center">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        Preview
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <CalendarIcon className="h-4 w-4 mr-2" />
                            Reschedule
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Trash2 className="h-4 w-4 mr-2 text-red-500" />
                            <span className="text-red-500">Delete</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
