"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { BarChart3, Eye, FileText, ImageIcon, Mail, MessageSquare, Plus, Sparkles, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function DashboardOverview() {
  const [activeTab, setActiveTab] = useState("overview")

  const stats = [
    {
      title: "Total Views",
      value: "12,543",
      change: "+12.3%",
      isPositive: true,
      icon: <Eye className="h-5 w-5 text-blue-500" />,
      color: "bg-blue-500/10",
    },
    {
      title: "Projects",
      value: "8",
      change: "+2",
      isPositive: true,
      icon: <ImageIcon className="h-5 w-5 text-purple-500" />,
      color: "bg-purple-500/10",
    },
    {
      title: "Messages",
      value: "24",
      change: "+5",
      isPositive: true,
      icon: <Mail className="h-5 w-5 text-teal-500" />,
      color: "bg-teal-500/10",
    },
    {
      title: "Downloads",
      value: "156",
      change: "+23.5%",
      isPositive: true,
      icon: <FileText className="h-5 w-5 text-amber-500" />,
      color: "bg-amber-500/10",
    },
  ]

  const recentProjects = [
    { id: 1, title: "Portfolio Website", status: "Live", views: 523, lastUpdated: "2 days ago" },
    { id: 2, title: "E-commerce Dashboard", status: "Draft", views: 0, lastUpdated: "1 week ago" },
    { id: 3, title: "Mobile App UI", status: "Live", views: 245, lastUpdated: "3 days ago" },
  ]

  const recentMessages = [
    { id: 1, name: "John Smith", email: "john@example.com", subject: "Job Opportunity", date: "Today" },
    { id: 2, name: "Sarah Johnson", email: "sarah@example.com", subject: "Collaboration Request", date: "Yesterday" },
    {
      id: 3,
      name: "Mike Williams",
      email: "mike@example.com",
      subject: "Question about your work",
      date: "3 days ago",
    },
  ]

  const learningProgress = [
    { id: 1, title: "Advanced React Patterns", progress: 75, platform: "Frontend Masters" },
    { id: 2, title: "Data Visualization with D3", progress: 40, platform: "Udemy" },
    { id: 3, title: "TypeScript Deep Dive", progress: 90, platform: "egghead.io" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Welcome back! Here's an overview of your portfolio.
          </p>
        </div>
        <div className="mt-4 flex space-x-3 sm:mt-0">
          <Button className="bg-teal-500 hover:bg-teal-600">
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.title}</p>
                    <h3 className="mt-1 text-2xl font-bold">{stat.value}</h3>
                    <p className={`mt-1 text-xs ${stat.isPositive ? "text-green-500" : "text-red-500"}`}>
                      {stat.change} from last month
                    </p>
                  </div>
                  <div className={`rounded-full p-2 ${stat.color}`}>{stat.icon}</div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="learning">Learning</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-2">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="space-y-1">
                  <CardTitle>Visitor Analytics</CardTitle>
                  <CardDescription>Your portfolio traffic over time</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    Weekly
                  </Button>
                  <Button variant="outline" size="sm">
                    Monthly
                  </Button>
                  <Button variant="outline" size="sm">
                    Yearly
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[300px] w-full">
                  {/* Placeholder for chart */}
                  <div className="flex h-full w-full items-center justify-center rounded-md border border-dashed border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                    <div className="flex flex-col items-center text-center">
                      <BarChart3 className="h-10 w-10 text-gray-400" />
                      <h3 className="mt-4 text-lg font-medium">Analytics Chart</h3>
                      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 max-w-xs">
                        This is where your visitor analytics chart would appear, showing traffic trends over time.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Frequently used tools</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="h-24 flex flex-col items-center justify-center space-y-2">
                    <ImageIcon className="h-6 w-6 text-teal-500" />
                    <span>Add Project</span>
                  </Button>
                  <Button variant="outline" className="h-24 flex flex-col items-center justify-center space-y-2">
                    <FileText className="h-6 w-6 text-blue-500" />
                    <span>Edit Resume</span>
                  </Button>
                  <Button variant="outline" className="h-24 flex flex-col items-center justify-center space-y-2">
                    <Mail className="h-6 w-6 text-purple-500" />
                    <span>View Messages</span>
                  </Button>
                  <Button variant="outline" className="h-24 flex flex-col items-center justify-center space-y-2">
                    <Sparkles className="h-6 w-6 text-amber-500" />
                    <span>AI Assistant</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Projects</CardTitle>
                <CardDescription>Your latest portfolio items</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentProjects.map((project) => (
                    <div key={project.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`h-10 w-10 rounded-md flex items-center justify-center ${
                            project.status === "Live" ? "bg-green-500/10" : "bg-amber-500/10"
                          }`}
                        >
                          <ImageIcon
                            className={`h-5 w-5 ${project.status === "Live" ? "text-green-500" : "text-amber-500"}`}
                          />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{project.title}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {project.status} • {project.views} views • {project.lastUpdated}
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Messages</CardTitle>
                <CardDescription>Latest contact form submissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentMessages.map((message) => (
                    <div key={message.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                          <Users className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{message.name}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {message.subject} • {message.date}
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="projects" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Projects</CardTitle>
              <CardDescription>Manage your portfolio projects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentProjects.map((project) => (
                  <div
                    key={project.id}
                    className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-4 last:border-0 last:pb-0"
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`h-12 w-12 rounded-md flex items-center justify-center ${
                          project.status === "Live" ? "bg-green-500/10" : "bg-amber-500/10"
                        }`}
                      >
                        <ImageIcon
                          className={`h-6 w-6 ${project.status === "Live" ? "text-green-500" : "text-amber-500"}`}
                        />
                      </div>
                      <div>
                        <p className="font-medium">{project.title}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {project.status} • {project.views} views • {project.lastUpdated}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-500">
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="messages" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Messages</CardTitle>
              <CardDescription>Manage your contact form submissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentMessages.map((message) => (
                  <div
                    key={message.id}
                    className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-4 last:border-0 last:pb-0"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                        <MessageSquare className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                      </div>
                      <div>
                        <p className="font-medium">{message.name}</p>
                        <p className="text-sm">{message.email}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {message.subject} • {message.date}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        Reply
                      </Button>
                      <Button variant="outline" size="sm">
                        Archive
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="learning" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Learning Progress</CardTitle>
              <CardDescription>Track your courses and skills development</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {learningProgress.map((item) => (
                  <div key={item.id} className="space-y-2">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{item.platform}</p>
                      </div>
                      <p className="text-sm font-medium">{item.progress}%</p>
                    </div>
                    <Progress value={item.progress} className="h-2" />
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
