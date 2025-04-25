"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  BarChart3,
  Clock,
  ExternalLink,
  Eye,
  FileText,
  Github,
  Globe,
  Linkedin,
  MapPin,
  MousePointer,
  RefreshCw,
  Search,
  User,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"

export function PortfolioVisitorTracker() {
  const [timeRange, setTimeRange] = useState("week")
  const [activeTab, setActiveTab] = useState("overview")

  // Sample data
  const visitorData = [
    { day: "Mon", count: 24 },
    { day: "Tue", count: 18 },
    { day: "Wed", count: 32 },
    { day: "Thu", count: 26 },
    { day: "Fri", count: 42 },
    { day: "Sat", count: 30 },
    { day: "Sun", count: 22 },
  ]

  const sectionData = [
    { name: "Projects", timeSpent: 45, visitors: 120 },
    { name: "About", timeSpent: 30, visitors: 95 },
    { name: "Skills", timeSpent: 25, visitors: 85 },
    { name: "Resume", timeSpent: 60, visitors: 75 },
    { name: "Contact", timeSpent: 15, visitors: 50 },
  ]

  const referrerData = [
    { name: "LinkedIn", count: 85, icon: <Linkedin className="h-4 w-4" /> },
    { name: "GitHub", count: 62, icon: <Github className="h-4 w-4" /> },
    { name: "Google", count: 45, icon: <Search className="h-4 w-4" /> },
    { name: "Twitter", count: 28, icon: <ExternalLink className="h-4 w-4" /> },
    { name: "Direct", count: 35, icon: <Globe className="h-4 w-4" /> },
  ]

  const visitorInsights = [
    {
      id: 1,
      type: "Recruiter",
      description: "Spent 2 minutes on your resume and projects sections",
      time: "15 minutes ago",
      location: "San Francisco, CA",
      company: "Tech Innovations Inc.",
    },
    {
      id: 2,
      type: "Developer",
      description: "Viewed your GitHub repos and technical projects",
      time: "1 hour ago",
      location: "New York, NY",
      referrer: "GitHub",
    },
    {
      id: 3,
      type: "Returning Visitor",
      description: "Third visit this week, focused on your contact page",
      time: "3 hours ago",
      location: "Remote",
      referrer: "LinkedIn",
    },
    {
      id: 4,
      type: "Potential Client",
      description: "Spent 5 minutes on services and contact sections",
      time: "Yesterday",
      location: "London, UK",
      company: "Creative Agency Ltd.",
    },
    {
      id: 5,
      type: "Hiring Manager",
      description: "Viewed your resume and downloaded your CV",
      time: "Yesterday",
      location: "Seattle, WA",
      company: "Enterprise Solutions",
    },
  ]

  const renderVisitorChart = () => (
    <div className="h-64 flex items-end justify-between px-2">
      {visitorData.map((item, index) => (
        <div key={index} className="flex flex-col items-center">
          <div className="bg-teal-500 rounded-t-md w-12" style={{ height: `${(item.count / 45) * 180}px` }}></div>
          <span className="text-xs mt-2">{item.day}</span>
        </div>
      ))}
    </div>
  )

  const renderSectionHeatmap = () => (
    <div className="space-y-4">
      {sectionData.map((section, index) => (
        <div key={index} className="space-y-1">
          <div className="flex justify-between text-sm">
            <span>{section.name}</span>
            <span>{section.timeSpent} seconds avg.</span>
          </div>
          <div className="relative">
            <Progress value={(section.timeSpent / 60) * 100} className="h-8" />
            <div className="absolute inset-0 flex items-center justify-between px-3">
              <span className="text-xs text-white font-medium">{section.name}</span>
              <span className="text-xs text-white font-medium">{section.visitors} visitors</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )

  const renderReferrerChart = () => (
    <div className="space-y-4">
      {referrerData.map((referrer, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-3 rounded-md border border-gray-200 dark:border-gray-800"
        >
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mr-3">
              {referrer.icon}
            </div>
            <span>{referrer.name}</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium">{referrer.count}</span>
            <span className="text-xs text-gray-500 ml-1">visitors</span>
          </div>
        </div>
      ))}
    </div>
  )

  const renderVisitorMap = () => (
    <div className="relative h-80 border rounded-md overflow-hidden">
      <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800">
        {/* This would be replaced with an actual map component */}
        <div className="h-full w-full flex items-center justify-center">
          <div className="text-center">
            <Globe className="h-12 w-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">World map visualization</p>
            <p className="text-sm text-gray-400">Visitors from 12 countries</p>
          </div>
        </div>
      </div>
      <div className="absolute bottom-4 left-4 right-4">
        <div className="bg-white dark:bg-gray-900 p-3 rounded-md shadow-lg">
          <h3 className="font-medium text-sm mb-2">Top Locations</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <div className="flex items-center">
                <MapPin className="h-3 w-3 mr-1" />
                <span>United States</span>
              </div>
              <span>45%</span>
            </div>
            <div className="flex justify-between text-sm">
              <div className="flex items-center">
                <MapPin className="h-3 w-3 mr-1" />
                <span>United Kingdom</span>
              </div>
              <span>15%</span>
            </div>
            <div className="flex justify-between text-sm">
              <div className="flex items-center">
                <MapPin className="h-3 w-3 mr-1" />
                <span>Germany</span>
              </div>
              <span>10%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Who's Viewing My Portfolio</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Track and analyze your portfolio visitors</p>
        </div>
        <div className="mt-4 flex space-x-3 sm:mt-0">
          <Select defaultValue="week" onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-teal-500 hover:bg-teal-600">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Visitors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline justify-between">
                <div className="text-3xl font-bold">194</div>
                <div className="flex items-center text-green-500 text-sm">
                  +18% <BarChart3 className="h-4 w-4 ml-1" />
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-1">vs. previous period</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Avg. Time on Page</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline justify-between">
                <div className="text-3xl font-bold">2:45</div>
                <div className="flex items-center text-green-500 text-sm">
                  +12% <BarChart3 className="h-4 w-4 ml-1" />
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-1">minutes:seconds</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Returning Visitors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline justify-between">
                <div className="text-3xl font-bold">32%</div>
                <div className="flex items-center text-red-500 text-sm">
                  -5% <BarChart3 className="h-4 w-4 ml-1" />
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-1">of total visitors</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="insights">Visitor Insights</TabsTrigger>
          <TabsTrigger value="heatmap">Section Heatmap</TabsTrigger>
          <TabsTrigger value="referrers">Referrers</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Visitor Traffic</CardTitle>
                <CardDescription>Portfolio visitors over time</CardDescription>
              </CardHeader>
              <CardContent>{renderVisitorChart()}</CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Geographic Distribution</CardTitle>
                <CardDescription>Where your visitors are from</CardDescription>
              </CardHeader>
              <CardContent>{renderVisitorMap()}</CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Section Engagement</CardTitle>
                <CardDescription>Time spent on different sections</CardDescription>
              </CardHeader>
              <CardContent>{renderSectionHeatmap()}</CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Referrers</CardTitle>
                <CardDescription>Where your visitors are coming from</CardDescription>
              </CardHeader>
              <CardContent>{renderReferrerChart()}</CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>AI Visitor Insights</CardTitle>
              <CardDescription>Understanding who's viewing your portfolio</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Search className="h-4 w-4 text-gray-500" />
                  </div>
                  <Input type="search" placeholder="Search insights..." className="pl-10" />
                </div>

                {visitorInsights.map((insight) => (
                  <div
                    key={insight.id}
                    className="p-4 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-start">
                      <div className="h-10 w-10 rounded-full bg-teal-100 dark:bg-teal-900 flex items-center justify-center mr-3">
                        <User className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium flex items-center">
                            <Badge className="mr-2">{insight.type}</Badge>
                            {insight.company && <span className="text-sm">{insight.company}</span>}
                          </h3>
                          <span className="text-xs text-gray-500">{insight.time}</span>
                        </div>
                        <p className="text-sm mt-1">{insight.description}</p>
                        <div className="flex items-center mt-2 text-xs text-gray-500">
                          <div className="flex items-center mr-3">
                            <MapPin className="h-3 w-3 mr-1" />
                            <span>{insight.location}</span>
                          </div>
                          {insight.referrer && (
                            <div className="flex items-center">
                              <ExternalLink className="h-3 w-3 mr-1" />
                              <span>via {insight.referrer}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                View All Insights
              </Button>
              <Button variant="outline" size="sm">
                <FileText className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Visitor Behavior Analysis</CardTitle>
              <CardDescription>AI-powered insights about your visitors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 rounded-md bg-teal-50 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-900">
                  <h3 className="font-medium text-teal-800 dark:text-teal-300 mb-2">Key Insights</h3>
                  <ul className="space-y-2 text-sm text-teal-700 dark:text-teal-300">
                    <li className="flex items-start">
                      <span className="h-5 w-5 rounded-full bg-teal-100 dark:bg-teal-800 flex items-center justify-center mr-2 mt-0.5">
                        <Users className="h-3 w-3 text-teal-600 dark:text-teal-400" />
                      </span>
                      <span>
                        <strong>Recruiter Interest:</strong> 35% of your visitors show patterns consistent with
                        recruiters or hiring managers.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="h-5 w-5 rounded-full bg-teal-100 dark:bg-teal-800 flex items-center justify-center mr-2 mt-0.5">
                        <Clock className="h-3 w-3 text-teal-600 dark:text-teal-400" />
                      </span>
                      <span>
                        <strong>Resume Focus:</strong> Visitors spend 2.5x more time on your resume page compared to
                        other sections.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="h-5 w-5 rounded-full bg-teal-100 dark:bg-teal-800 flex items-center justify-center mr-2 mt-0.5">
                        <MousePointer className="h-3 w-3 text-teal-600 dark:text-teal-400" />
                      </span>
                      <span>
                        <strong>Project Engagement:</strong> Your 3D interactive projects receive 40% more engagement
                        than other projects.
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="p-4 rounded-md border border-gray-200 dark:border-gray-800">
                  <h3 className="font-medium mb-2">Recommended Actions</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <span className="h-5 w-5 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mr-2 mt-0.5">
                        <FileText className="h-3 w-3 text-gray-600 dark:text-gray-400" />
                      </span>
                      <span>
                        Update your resume to highlight 3D and interactive development skills, as these attract the most
                        attention.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="h-5 w-5 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mr-2 mt-0.5">
                        <Linkedin className="h-3 w-3 text-gray-600 dark:text-gray-400" />
                      </span>
                      <span>
                        Optimize your LinkedIn profile, as it's your top referrer (44% of traffic comes from LinkedIn).
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="h-5 w-5 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mr-2 mt-0.5">
                        <Globe className="h-3 w-3 text-gray-600 dark:text-gray-400" />
                      </span>
                      <span>
                        Consider adding more content for visitors from Germany, as they spend 30% more time on your site
                        but are only 10% of visitors.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="heatmap" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Section Engagement Heatmap</CardTitle>
              <CardDescription>Time spent on different sections of your portfolio</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <div className="h-full flex items-center">
                  <div className="w-full space-y-8">
                    {renderSectionHeatmap()}
                    <div className="pt-4">
                      <h3 className="text-sm font-medium mb-2">Engagement Insights</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-3 rounded-md border border-gray-200 dark:border-gray-800">
                          <h4 className="font-medium text-sm">Most Engaging Section</h4>
                          <p className="text-sm text-gray-500 mt-1">
                            Your Resume section keeps visitors engaged for an average of 60 seconds.
                          </p>
                        </div>
                        <div className="p-3 rounded-md border border-gray-200 dark:border-gray-800">
                          <h4 className="font-medium text-sm">Least Engaging Section</h4>
                          <p className="text-sm text-gray-500 mt-1">
                            Your Contact section has the shortest engagement at 15 seconds average.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Project Engagement</CardTitle>
              <CardDescription>Which projects are getting the most attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Interactive 3D Portfolio", time: 85, views: 95 },
                  { name: "E-commerce Dashboard", time: 62, views: 78 },
                  { name: "AI Content Generator", time: 58, views: 65 },
                  { name: "Mobile App UI", time: 45, views: 52 },
                  { name: "Blog Platform", time: 32, views: 40 },
                ].map((project, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{project.name}</span>
                      <span>{project.time} seconds avg.</span>
                    </div>
                    <div className="relative">
                      <Progress value={(project.time / 85) * 100} className="h-8" />
                      <div className="absolute inset-0 flex items-center justify-between px-3">
                        <span className="text-xs text-white font-medium">{project.name}</span>
                        <span className="text-xs text-white font-medium">{project.views} views</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="referrers" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Referrers</CardTitle>
              <CardDescription>Where your visitors are coming from</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <div className="h-full flex items-center">
                  <div className="w-full space-y-6">
                    {renderReferrerChart()}
                    <div className="pt-4">
                      <h3 className="text-sm font-medium mb-2">Referrer Insights</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-3 rounded-md border border-gray-200 dark:border-gray-800">
                          <h4 className="font-medium text-sm">Top Performer</h4>
                          <p className="text-sm text-gray-500 mt-1">
                            LinkedIn drives 44% of your traffic and has the highest engagement rate.
                          </p>
                        </div>
                        <div className="p-3 rounded-md border border-gray-200 dark:border-gray-800">
                          <h4 className="font-medium text-sm">Growth Opportunity</h4>
                          <p className="text-sm text-gray-500 mt-1">
                            Twitter traffic is low but has high conversion to contact form submissions.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Referrer Quality</CardTitle>
              <CardDescription>Engagement metrics by traffic source</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <th className="text-left py-3 px-4">Source</th>
                        <th className="text-left py-3 px-4">Visitors</th>
                        <th className="text-left py-3 px-4">Avg. Time</th>
                        <th className="text-left py-3 px-4">Bounce Rate</th>
                        <th className="text-left py-3 px-4">Contact Rate</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <Linkedin className="h-4 w-4 mr-2 text-[#0A66C2]" />
                            LinkedIn
                          </div>
                        </td>
                        <td className="py-3 px-4">85</td>
                        <td className="py-3 px-4">3:12</td>
                        <td className="py-3 px-4">24%</td>
                        <td className="py-3 px-4">8.2%</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <Github className="h-4 w-4 mr-2" />
                            GitHub
                          </div>
                        </td>
                        <td className="py-3 px-4">62</td>
                        <td className="py-3 px-4">4:05</td>
                        <td className="py-3 px-4">18%</td>
                        <td className="py-3 px-4">5.5%</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <Search className="h-4 w-4 mr-2 text-[#4285F4]" />
                            Google
                          </div>
                        </td>
                        <td className="py-3 px-4">45</td>
                        <td className="py-3 px-4">2:45</td>
                        <td className="py-3 px-4">32%</td>
                        <td className="py-3 px-4">3.8%</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <ExternalLink className="h-4 w-4 mr-2 text-[#1DA1F2]" />
                            Twitter
                          </div>
                        </td>
                        <td className="py-3 px-4">28</td>
                        <td className="py-3 px-4">2:10</td>
                        <td className="py-3 px-4">35%</td>
                        <td className="py-3 px-4">9.5%</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <Globe className="h-4 w-4 mr-2" />
                            Direct
                          </div>
                        </td>
                        <td className="py-3 px-4">35</td>
                        <td className="py-3 px-4">3:30</td>
                        <td className="py-3 px-4">22%</td>
                        <td className="py-3 px-4">7.2%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
