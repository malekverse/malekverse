"use client"

import { useState } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"
import { ArrowDown, ArrowUp, CalendarIcon, FileText, Github, Linkedin, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

// Sample data for analytics
const viewsData = [
  { date: "Mon", portfolio: 120, linkedin: 45, github: 30 },
  { date: "Tue", portfolio: 132, linkedin: 62, github: 35 },
  { date: "Wed", portfolio: 101, linkedin: 55, github: 40 },
  { date: "Thu", portfolio: 134, linkedin: 78, github: 45 },
  { date: "Fri", portfolio: 190, linkedin: 120, github: 60 },
  { date: "Sat", portfolio: 230, linkedin: 85, github: 53 },
  { date: "Sun", portfolio: 210, linkedin: 93, github: 48 },
]

const engagementData = [
  { date: "Mon", likes: 24, comments: 12, shares: 5 },
  { date: "Tue", likes: 30, comments: 18, shares: 8 },
  { date: "Wed", likes: 22, comments: 15, shares: 6 },
  { date: "Thu", likes: 35, comments: 20, shares: 10 },
  { date: "Fri", likes: 50, comments: 32, shares: 15 },
  { date: "Sat", likes: 40, comments: 25, shares: 12 },
  { date: "Sun", likes: 38, comments: 22, shares: 10 },
]

const contentTypeData = [
  { name: "Technical Tutorials", value: 40 },
  { name: "Portfolio Projects", value: 30 },
  { name: "Career Insights", value: 15 },
  { name: "Learning Journey", value: 15 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

const platformData = [
  { name: "Portfolio", views: 1117, engagement: 245, growth: 12.5 },
  { name: "LinkedIn", views: 538, engagement: 187, growth: 23.8 },
  { name: "GitHub", views: 311, engagement: 98, growth: 8.2 },
]

const topContentData = [
  {
    title: "Building a Modern Portfolio with Next.js and Three.js",
    views: 342,
    engagement: 87,
    platform: "portfolio",
    growth: 15.2,
  },
  {
    title: "How I Built a Custom Admin Dashboard for My Portfolio",
    views: 256,
    engagement: 62,
    platform: "portfolio",
    growth: -3.5,
  },
  {
    title: "Optimizing React Performance: Lessons from My Portfolio Project",
    views: 198,
    engagement: 45,
    platform: "linkedin",
    growth: 22.7,
  },
  {
    title: "The Power of Server Components in Next.js 14",
    views: 175,
    engagement: 38,
    platform: "github",
    growth: 5.3,
  },
  {
    title: "Creating a Design System for Your Portfolio",
    views: 146,
    engagement: 29,
    platform: "linkedin",
    growth: 8.9,
  },
]

export function ContentAnalytics() {
  const [dateRange, setDateRange] = useState("7days")
  const [activeTab, setActiveTab] = useState("overview")

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "portfolio":
        return <FileText className="h-4 w-4" />
      case "linkedin":
        return <Linkedin className="h-4 w-4" />
      case "github":
        return <Github className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const getGrowthIndicator = (growth: number) => {
    if (growth > 0) {
      return (
        <div className="flex items-center text-green-500">
          <ArrowUp className="h-3 w-3 mr-1" />
          {growth}%
        </div>
      )
    } else if (growth < 0) {
      return (
        <div className="flex items-center text-red-500">
          <ArrowDown className="h-3 w-3 mr-1" />
          {Math.abs(growth)}%
        </div>
      )
    } else {
      return <div className="text-gray-500">0%</div>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-xl font-semibold">Content Analytics</h2>
        <div className="flex items-center space-x-2">
          <CalendarIcon className="h-4 w-4 text-gray-500" />
          <Select defaultValue="7days" onValueChange={setDateRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select date range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="yesterday">Yesterday</SelectItem>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="custom">Custom range</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="overview" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="platforms">Platforms</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="audience">Audience</TabsTrigger>
        </TabsList>
      </Tabs>

      <TabsContent value="overview" className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline justify-between">
                <div className="text-2xl font-bold">1,966</div>
                <div className="flex items-center text-green-500 text-sm">
                  <ArrowUp className="h-3 w-3 mr-1" />
                  12.5%
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-1">vs. previous period</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Engagement</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline justify-between">
                <div className="text-2xl font-bold">530</div>
                <div className="flex items-center text-green-500 text-sm">
                  <ArrowUp className="h-3 w-3 mr-1" />
                  18.2%
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-1">likes, comments, shares</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline justify-between">
                <div className="text-2xl font-bold">3.8%</div>
                <div className="flex items-center text-red-500 text-sm">
                  <ArrowDown className="h-3 w-3 mr-1" />
                  2.1%
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-1">clicks to portfolio projects</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Views by Platform</CardTitle>
              <CardDescription>Content views across different platforms</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={viewsData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="portfolio" name="Portfolio" fill="#0ea5e9" />
                    <Bar dataKey="linkedin" name="LinkedIn" fill="#0077b5" />
                    <Bar dataKey="github" name="GitHub" fill="#333" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Engagement Metrics</CardTitle>
              <CardDescription>Likes, comments, and shares across all platforms</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={engagementData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="likes" name="Likes" stroke="#0ea5e9" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="comments" name="Comments" stroke="#10b981" />
                    <Line type="monotone" dataKey="shares" name="Shares" stroke="#8b5cf6" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Top Performing Content</CardTitle>
            <CardDescription>Your most viewed and engaged content across all platforms</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topContentData.map((content, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="space-y-1 mb-2 sm:mb-0">
                    <div className="flex items-center">
                      {getPlatformIcon(content.platform)}
                      <Badge className="ml-2" variant="outline">
                        {content.platform.charAt(0).toUpperCase() + content.platform.slice(1)}
                      </Badge>
                    </div>
                    <h3 className="font-medium">{content.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-4 self-end sm:self-center">
                    <div className="text-center">
                      <p className="text-sm text-gray-500">Views</p>
                      <p className="font-medium">{content.views}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-500">Engagement</p>
                      <p className="font-medium">{content.engagement}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-500">Growth</p>
                      <div className="font-medium">{getGrowthIndicator(content.growth)}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="platforms" className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {platformData.map((platform, index) => (
            <Card key={index}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium flex items-center">
                    {getPlatformIcon(platform.name.toLowerCase())}
                    <span className="ml-2">{platform.name}</span>
                  </CardTitle>
                  {getGrowthIndicator(platform.growth)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-gray-500">Views</p>
                    <p className="text-2xl font-bold">{platform.views}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Engagement</p>
                    <p className="text-xl font-semibold">{platform.engagement}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Engagement Rate</p>
                    <p className="text-lg font-medium">{((platform.engagement / platform.views) * 100).toFixed(1)}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Content Distribution</CardTitle>
            <CardDescription>Distribution of content types across platforms</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={contentTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {contentTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="content" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Content Performance</CardTitle>
            <CardDescription>Detailed analytics for all your content</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Platform" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Platforms</SelectItem>
                      <SelectItem value="portfolio">Portfolio</SelectItem>
                      <SelectItem value="linkedin">LinkedIn</SelectItem>
                      <SelectItem value="github">GitHub</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select defaultValue="views">
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="views">Most Views</SelectItem>
                      <SelectItem value="engagement">Most Engagement</SelectItem>
                      <SelectItem value="growth">Highest Growth</SelectItem>
                      <SelectItem value="recent">Most Recent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button variant="outline" size="sm">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Export Report
                </Button>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                      >
                        Content
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                      >
                        Platform
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                      >
                        Views
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                      >
                        Engagement
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                      >
                        Growth
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                    {topContentData.map((content, index) => (
                      <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{content.title}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div className="flex items-center">
                            {getPlatformIcon(content.platform)}
                            <span className="ml-2">
                              {content.platform.charAt(0).toUpperCase() + content.platform.slice(1)}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">{content.views}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">{content.engagement}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">{getGrowthIndicator(content.growth)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="audience" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Audience Insights</CardTitle>
            <CardDescription>Learn more about your audience and their behavior</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">Audience analytics coming soon</p>
              <Button className="mt-4 bg-teal-500 hover:bg-teal-600">Connect Google Analytics</Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </div>
  )
}
