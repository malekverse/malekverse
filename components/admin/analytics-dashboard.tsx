"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { BarChart3, Calendar, Download, Eye, FileDown, Globe, MousePointerClick, RefreshCw, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function AnalyticsDashboard() {
  const [timeframe, setTimeframe] = useState("30d")

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
      title: "Unique Visitors",
      value: "5,271",
      change: "+8.7%",
      isPositive: true,
      icon: <Users className="h-5 w-5 text-purple-500" />,
      color: "bg-purple-500/10",
    },
    {
      title: "Avg. Session",
      value: "2m 45s",
      change: "+15.2%",
      isPositive: true,
      icon: <Calendar className="h-5 w-5 text-teal-500" />,
      color: "bg-teal-500/10",
    },
    {
      title: "Downloads",
      value: "156",
      change: "+23.5%",
      isPositive: true,
      icon: <FileDown className="h-5 w-5 text-amber-500" />,
      color: "bg-amber-500/10",
    },
  ]

  const topProjects = [
    { id: 1, title: "Portfolio Website", views: 523, clicks: 128 },
    { id: 2, title: "E-commerce Dashboard", views: 412, clicks: 95 },
    { id: 3, title: "Mobile App UI", views: 245, clicks: 67 },
    { id: 4, title: "Landing Page Design", views: 198, clicks: 42 },
    { id: 5, title: "Blog Platform", views: 156, clicks: 38 },
  ]

  const topLocations = [
    { id: 1, country: "United States", visitors: 2341, percentage: 44.4 },
    { id: 2, country: "United Kingdom", visitors: 876, percentage: 16.6 },
    { id: 3, country: "Canada", visitors: 543, percentage: 10.3 },
    { id: 4, country: "Germany", visitors: 421, percentage: 8.0 },
    { id: 5, country: "Australia", visitors: 287, percentage: 5.4 },
  ]

  const referrers = [
    { id: 1, source: "Direct", visitors: 1245, percentage: 23.6 },
    { id: 2, source: "Google", visitors: 2187, percentage: 41.5 },
    { id: 3, source: "GitHub", visitors: 876, percentage: 16.6 },
    { id: 4, source: "LinkedIn", visitors: 543, percentage: 10.3 },
    { id: 5, source: "Twitter", visitors: 421, percentage: 8.0 },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Analytics Dashboard</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Track your portfolio performance and visitor engagement.
          </p>
        </div>
        <div className="mt-4 flex items-center space-x-3 sm:mt-0">
          <Select defaultValue="30d" onValueChange={setTimeframe}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="year">Last 12 months</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
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
                      {stat.change} from last period
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
          <TabsTrigger value="geography">Geography</TabsTrigger>
          <TabsTrigger value="referrers">Referrers</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="space-y-1">
                <CardTitle>Visitor Analytics</CardTitle>
                <CardDescription>Your portfolio traffic over time</CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  Daily
                </Button>
                <Button variant="outline" size="sm">
                  Weekly
                </Button>
                <Button variant="outline" size="sm">
                  Monthly
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

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Top Projects</CardTitle>
                <CardDescription>Most viewed portfolio items</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topProjects.map((project) => (
                    <div key={project.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="h-9 w-9 rounded-md bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                          <Eye className="h-5 w-5 text-gray-500" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{project.title}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {project.views} views • {project.clicks} clicks
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-gray-100 dark:bg-gray-800 rounded-full h-2">
                          <div
                            className="bg-teal-500 h-2 rounded-full"
                            style={{ width: `${(project.views / topProjects[0].views) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Engagement Metrics</CardTitle>
                <CardDescription>How visitors interact with your portfolio</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="h-9 w-9 rounded-md bg-blue-500/10 flex items-center justify-center">
                        <MousePointerClick className="h-5 w-5 text-blue-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Click-through Rate</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Percentage of visitors who click on projects
                        </p>
                      </div>
                    </div>
                    <p className="text-lg font-bold">24.8%</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="h-9 w-9 rounded-md bg-purple-500/10 flex items-center justify-center">
                        <Calendar className="h-5 w-5 text-purple-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Avg. Time on Page</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          How long visitors stay on your portfolio
                        </p>
                      </div>
                    </div>
                    <p className="text-lg font-bold">2m 45s</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="h-9 w-9 rounded-md bg-amber-500/10 flex items-center justify-center">
                        <FileDown className="h-5 w-5 text-amber-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Resume Downloads</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Number of resume/CV downloads</p>
                      </div>
                    </div>
                    <p className="text-lg font-bold">156</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="h-9 w-9 rounded-md bg-teal-500/10 flex items-center justify-center">
                        <Globe className="h-5 w-5 text-teal-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Bounce Rate</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Visitors who leave without interaction
                        </p>
                      </div>
                    </div>
                    <p className="text-lg font-bold">32.1%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="projects" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Project Performance</CardTitle>
              <CardDescription>Detailed analytics for each portfolio project</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs uppercase bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Project
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Views
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Clicks
                      </th>
                      <th scope="col" className="px-6 py-3">
                        CTR
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Avg. Time
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Trend
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {topProjects.map((project) => (
                      <tr key={project.id} className="border-b dark:border-gray-700">
                        <td className="px-6 py-4 font-medium">{project.title}</td>
                        <td className="px-6 py-4">{project.views}</td>
                        <td className="px-6 py-4">{project.clicks}</td>
                        <td className="px-6 py-4">{Math.round((project.clicks / project.views) * 100)}%</td>
                        <td className="px-6 py-4">1m 32s</td>
                        <td className="px-6 py-4">
                          <div className="w-20 bg-gray-100 dark:bg-gray-800 rounded-full h-1.5">
                            <div
                              className="bg-teal-500 h-1.5 rounded-full"
                              style={{ width: `${(project.views / topProjects[0].views) * 100}%` }}
                            ></div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="geography" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Visitor Map</CardTitle>
                <CardDescription>Geographic distribution of your visitors</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] w-full">
                  {/* Placeholder for map */}
                  <div className="flex h-full w-full items-center justify-center rounded-md border border-dashed border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                    <div className="flex flex-col items-center text-center">
                      <Globe className="h-10 w-10 text-gray-400" />
                      <h3 className="mt-4 text-lg font-medium">World Map</h3>
                      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 max-w-xs">
                        This is where your visitor map would appear, showing the geographic distribution of your
                        audience.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Locations</CardTitle>
                <CardDescription>Countries with the most visitors</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topLocations.map((location) => (
                    <div key={location.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="h-9 w-9 rounded-md bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                          <Globe className="h-5 w-5 text-gray-500" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{location.country}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{location.visitors} visitors</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <p className="text-sm font-medium">{location.percentage}%</p>
                        <div className="w-20 bg-gray-100 dark:bg-gray-800 rounded-full h-2">
                          <div
                            className="bg-teal-500 h-2 rounded-full"
                            style={{ width: `${location.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Device & Browser</CardTitle>
                <CardDescription>How visitors access your portfolio</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Device Type</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <p className="text-sm">Mobile</p>
                        <p className="text-sm font-medium">58%</p>
                      </div>
                      <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: "58%" }}></div>
                      </div>
                    </div>
                    <div className="space-y-2 mt-2">
                      <div className="flex justify-between items-center">
                        <p className="text-sm">Desktop</p>
                        <p className="text-sm font-medium">36%</p>
                      </div>
                      <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2">
                        <div className="bg-purple-500 h-2 rounded-full" style={{ width: "36%" }}></div>
                      </div>
                    </div>
                    <div className="space-y-2 mt-2">
                      <div className="flex justify-between items-center">
                        <p className="text-sm">Tablet</p>
                        <p className="text-sm font-medium">6%</p>
                      </div>
                      <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2">
                        <div className="bg-teal-500 h-2 rounded-full" style={{ width: "6%" }}></div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2">Browser</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <p className="text-sm">Chrome</p>
                        <p className="text-sm font-medium">64%</p>
                      </div>
                      <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2">
                        <div className="bg-amber-500 h-2 rounded-full" style={{ width: "64%" }}></div>
                      </div>
                    </div>
                    <div className="space-y-2 mt-2">
                      <div className="flex justify-between items-center">
                        <p className="text-sm">Safari</p>
                        <p className="text-sm font-medium">22%</p>
                      </div>
                      <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: "22%" }}></div>
                      </div>
                    </div>
                    <div className="space-y-2 mt-2">
                      <div className="flex justify-between items-center">
                        <p className="text-sm">Firefox</p>
                        <p className="text-sm font-medium">8%</p>
                      </div>
                      <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2">
                        <div className="bg-purple-500 h-2 rounded-full" style={{ width: "8%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="referrers" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Traffic Sources</CardTitle>
              <CardDescription>Where your visitors are coming from</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {referrers.map((referrer) => (
                  <div key={referrer.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="h-9 w-9 rounded-md bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                        <Globe className="h-5 w-5 text-gray-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{referrer.source}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{referrer.visitors} visitors</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <p className="text-sm font-medium">{referrer.percentage}%</p>
                      <div className="w-20 bg-gray-100 dark:bg-gray-800 rounded-full h-2">
                        <div
                          className="bg-teal-500 h-2 rounded-full"
                          style={{ width: `${referrer.percentage}%` }}
                        ></div>
                      </div>
                    </div>
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
