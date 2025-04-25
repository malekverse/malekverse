"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  BarChart3,
  Calendar,
  Clock,
  Code,
  Download,
  FileCode,
  Github,
  LineChart,
  Linkedin,
  Moon,
  Share2,
  Sun,
  Twitter,
  User,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function PersonalDevFeed() {
  const [timeRange, setTimeRange] = useState("week")
  const [activeTab, setActiveTab] = useState("summary")
  const [devStyle, setDevStyle] = useState("Night Owl Coder 💻🦉")

  // Sample data
  const commitData = [
    { day: "Mon", count: 12 },
    { day: "Tue", count: 8 },
    { day: "Wed", count: 15 },
    { day: "Thu", count: 10 },
    { day: "Fri", count: 20 },
    { day: "Sat", count: 5 },
    { day: "Sun", count: 3 },
  ]

  const languageData = [
    { name: "TypeScript", percentage: 45, color: "#3178c6" },
    { name: "JavaScript", percentage: 25, color: "#f7df1e" },
    { name: "CSS", percentage: 15, color: "#264de4" },
    { name: "HTML", percentage: 10, color: "#e34c26" },
    { name: "Python", percentage: 5, color: "#3776ab" },
  ]

  const frameworkData = [
    { name: "React", count: 12, color: "#61dafb" },
    { name: "Next.js", count: 8, color: "#000000" },
    { name: "Tailwind CSS", count: 6, color: "#38b2ac" },
    { name: "Three.js", count: 4, color: "#049ef4" },
    { name: "Node.js", count: 3, color: "#339933" },
  ]

  const productivityData = [
    { time: "Morning (6am-12pm)", hours: 3.5 },
    { time: "Afternoon (12pm-6pm)", hours: 4.2 },
    { time: "Evening (6pm-12am)", hours: 5.8 },
    { time: "Night (12am-6am)", hours: 2.1 },
  ]

  const devStyles = [
    "Night Owl Coder 💻🦉",
    "Full-Stack Architect 🏗️",
    "Frontend Artisan ✨",
    "Code Poet 📝",
    "Bug Hunter 🐛",
    "Pixel Perfectionist 🔍",
    "API Whisperer 🌐",
    "Deployment Ninja 🚀",
  ]

  const renderCommitChart = () => (
    <div className="h-64 flex items-end justify-between px-2">
      {commitData.map((item, index) => (
        <div key={index} className="flex flex-col items-center">
          <div className="bg-teal-500 rounded-t-md w-12" style={{ height: `${(item.count / 20) * 180}px` }}></div>
          <span className="text-xs mt-2">{item.day}</span>
        </div>
      ))}
    </div>
  )

  const renderLanguageChart = () => (
    <div className="space-y-4">
      {languageData.map((lang, index) => (
        <div key={index} className="space-y-1">
          <div className="flex justify-between text-sm">
            <span>{lang.name}</span>
            <span>{lang.percentage}%</span>
          </div>
          <Progress value={lang.percentage} className="h-2" indicatorClassName={`bg-[${lang.color}]`} />
        </div>
      ))}
    </div>
  )

  const renderFrameworkChart = () => (
    <div className="flex flex-wrap gap-2">
      {frameworkData.map((framework, index) => (
        <Badge
          key={index}
          className="text-sm py-1 px-3"
          style={{ backgroundColor: framework.color, color: framework.color === "#f7df1e" ? "black" : "white" }}
        >
          {framework.name} ({framework.count})
        </Badge>
      ))}
    </div>
  )

  const renderProductivityChart = () => (
    <div className="space-y-4">
      {productivityData.map((item, index) => (
        <div key={index} className="space-y-1">
          <div className="flex justify-between text-sm">
            <span>{item.time}</span>
            <span>{item.hours} hrs</span>
          </div>
          <Progress value={(item.hours / 6) * 100} className="h-2" />
        </div>
      ))}
    </div>
  )

  const renderDevStyleSelector = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium">Your Dev Style</h3>
        <Select value={devStyle} onValueChange={setDevStyle}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select style" />
          </SelectTrigger>
          <SelectContent>
            {devStyles.map((style, index) => (
              <SelectItem key={index} value={style}>
                {style}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Card className="overflow-hidden">
        <div className="relative h-48 bg-gradient-to-r from-teal-500 to-blue-500 flex items-center justify-center">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-2 left-2 text-white opacity-50">
              <Code size={20} />
            </div>
            <div className="absolute top-2 right-2 text-white opacity-50">
              <FileCode size={20} />
            </div>
            <div className="absolute bottom-2 left-2 text-white opacity-50">
              <Github size={20} />
            </div>
            <div className="absolute bottom-2 right-2 text-white opacity-50">
              <User size={20} />
            </div>
          </div>
          <div className="text-center z-10">
            <h2 className="text-2xl font-bold text-white">{devStyle}</h2>
            <p className="text-white text-opacity-80 mt-2">This week: 73 commits, 4 PRs, 15 hours</p>
          </div>
        </div>
        <CardFooter className="flex justify-between p-4">
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Linkedin className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Twitter className="h-4 w-4" />
                    </Button>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <span>Updated 2 hours ago</span>
          </div>
        </CardFooter>
      </Card>
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Personal Dev Feed</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Track your development activity and share your progress
          </p>
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
            <Calendar className="mr-2 h-4 w-4" />
            Custom Range
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Commits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline justify-between">
                <div className="text-3xl font-bold">73</div>
                <div className="flex items-center text-green-500 text-sm">
                  +12% <LineChart className="h-4 w-4 ml-1" />
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
              <CardTitle className="text-sm font-medium">Coding Hours</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline justify-between">
                <div className="text-3xl font-bold">15.6</div>
                <div className="flex items-center text-green-500 text-sm">
                  +8% <LineChart className="h-4 w-4 ml-1" />
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-1">vs. previous period</p>
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
              <CardTitle className="text-sm font-medium">Pull Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline justify-between">
                <div className="text-3xl font-bold">4</div>
                <div className="flex items-center text-red-500 text-sm">
                  -2% <LineChart className="h-4 w-4 ml-1" />
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-1">vs. previous period</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Tabs defaultValue="summary" className="space-y-6" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="commits">Commits</TabsTrigger>
          <TabsTrigger value="languages">Languages</TabsTrigger>
          <TabsTrigger value="productivity">Productivity</TabsTrigger>
          <TabsTrigger value="style">Dev Style</TabsTrigger>
        </TabsList>

        <TabsContent value="summary" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Commit Activity</CardTitle>
                <CardDescription>Your commit frequency over time</CardDescription>
              </CardHeader>
              <CardContent>{renderCommitChart()}</CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Language Distribution</CardTitle>
                <CardDescription>Languages used in your projects</CardDescription>
              </CardHeader>
              <CardContent>{renderLanguageChart()}</CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Framework Usage</CardTitle>
                <CardDescription>Frameworks and libraries in your projects</CardDescription>
              </CardHeader>
              <CardContent>{renderFrameworkChart()}</CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Productivity Patterns</CardTitle>
                <CardDescription>When you're most productive</CardDescription>
              </CardHeader>
              <CardContent>{renderProductivityChart()}</CardContent>
            </Card>
          </div>

          {renderDevStyleSelector()}
        </TabsContent>

        <TabsContent value="commits" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Commit Activity</CardTitle>
              <CardDescription>Your commit frequency over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">{renderCommitChart()}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Commits</CardTitle>
              <CardDescription>Your latest code contributions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((_, index) => (
                  <div
                    key={index}
                    className="flex items-start p-3 rounded-md border border-gray-200 dark:border-gray-800"
                  >
                    <div className="mr-4 mt-1">
                      <Github className="h-5 w-5 text-gray-500" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">
                          {
                            [
                              "Add interactive 3D background to portfolio",
                              "Fix responsive layout issues on mobile",
                              "Implement dark mode toggle with smooth transition",
                              "Optimize image loading with next/image",
                              "Add content management system integration",
                            ][index]
                          }
                        </h3>
                        <span className="text-xs text-gray-500">{["2h", "5h", "1d", "2d", "3d"][index]} ago</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        {
                          [
                            "portfolio-website",
                            "portfolio-website",
                            "portfolio-website",
                            "image-gallery",
                            "content-management-system",
                          ][index]
                        }
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="languages" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Language Distribution</CardTitle>
              <CardDescription>Languages used in your projects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <div className="h-full flex items-center">
                  <div className="w-full space-y-6">
                    {renderLanguageChart()}
                    <div className="pt-4">
                      <h3 className="text-sm font-medium mb-2">Language Trends</h3>
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-green-500">TypeScript +5%</Badge>
                        <Badge className="bg-yellow-500">JavaScript -3%</Badge>
                        <Badge className="bg-blue-500">CSS +2%</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Framework Expertise</CardTitle>
                <CardDescription>Your most used frameworks and libraries</CardDescription>
              </CardHeader>
              <CardContent>{renderFrameworkChart()}</CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>AI Recommendations</CardTitle>
                <CardDescription>Based on your current stack</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 rounded-md border border-gray-200 dark:border-gray-800">
                    <h3 className="font-medium flex items-center">
                      <Badge className="mr-2 bg-purple-500">New</Badge> Consider learning Framer Motion
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Complements your React skills and would enhance your portfolio animations.
                    </p>
                  </div>
                  <div className="p-3 rounded-md border border-gray-200 dark:border-gray-800">
                    <h3 className="font-medium flex items-center">
                      <Badge className="mr-2 bg-blue-500">Trending</Badge> GraphQL would pair well with your stack
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Your Next.js and Node.js experience makes this a natural next step.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="productivity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Productivity Patterns</CardTitle>
              <CardDescription>When you're most productive</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <div className="h-full flex items-center">
                  <div className="w-full space-y-8">
                    {renderProductivityChart()}
                    <div className="pt-4">
                      <h3 className="text-sm font-medium mb-2">Your Peak Hours</h3>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <Moon className="h-5 w-5 text-indigo-500" />
                          <span>Night Owl (8pm-11pm)</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Sun className="h-5 w-5 text-yellow-500" />
                          <span>Morning Burst (10am-11am)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Focus Sessions</CardTitle>
                <CardDescription>Your deep work patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Average Focus Session</h3>
                      <p className="text-sm text-gray-500">Uninterrupted coding time</p>
                    </div>
                    <div className="text-2xl font-bold">42 min</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Longest Session</h3>
                      <p className="text-sm text-gray-500">This week</p>
                    </div>
                    <div className="text-2xl font-bold">2h 15m</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Focus Score</h3>
                      <p className="text-sm text-gray-500">Based on session length and frequency</p>
                    </div>
                    <div className="text-2xl font-bold text-teal-500">8.5/10</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>AI Productivity Insights</CardTitle>
                <CardDescription>Personalized recommendations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 rounded-md border border-gray-200 dark:border-gray-800">
                    <h3 className="font-medium flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-teal-500" /> Schedule more morning sessions
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Your commit quality is 23% higher during morning hours.
                    </p>
                  </div>
                  <div className="p-3 rounded-md border border-gray-200 dark:border-gray-800">
                    <h3 className="font-medium flex items-center">
                      <BarChart3 className="h-4 w-4 mr-2 text-teal-500" /> Try the Pomodoro Technique
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Your focus sessions average 42 minutes, ideal for Pomodoro cycles.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="style" className="space-y-6">
          {renderDevStyleSelector()}

          <Card>
            <CardHeader>
              <CardTitle>Dev Style Analysis</CardTitle>
              <CardDescription>What your coding patterns say about you</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-4 rounded-md bg-gray-50 dark:bg-gray-800">
                  <h3 className="font-medium text-lg mb-2">Night Owl Coder 💻🦉</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    You thrive during evening hours, with peak productivity between 8pm and 11pm. Your code tends to be
                    more creative and exploratory during these hours, with a focus on frontend and visual elements.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-3 rounded-md border border-gray-200 dark:border-gray-800">
                    <h3 className="font-medium">Coding Strengths</h3>
                    <ul className="mt-2 space-y-1 text-sm">
                      <li className="flex items-center">
                        <span className="h-1.5 w-1.5 rounded-full bg-teal-500 mr-2"></span>
                        Creative problem solving
                      </li>
                      <li className="flex items-center">
                        <span className="h-1.5 w-1.5 rounded-full bg-teal-500 mr-2"></span>
                        UI/UX implementation
                      </li>
                      <li className="flex items-center">
                        <span className="h-1.5 w-1.5 rounded-full bg-teal-500 mr-2"></span>
                        Detailed documentation
                      </li>
                    </ul>
                  </div>

                  <div className="p-3 rounded-md border border-gray-200 dark:border-gray-800">
                    <h3 className="font-medium">Work Style</h3>
                    <ul className="mt-2 space-y-1 text-sm">
                      <li className="flex items-center">
                        <span className="h-1.5 w-1.5 rounded-full bg-teal-500 mr-2"></span>
                        Focused deep work sessions
                      </li>
                      <li className="flex items-center">
                        <span className="h-1.5 w-1.5 rounded-full bg-teal-500 mr-2"></span>
                        Prefers quiet environments
                      </li>
                      <li className="flex items-center">
                        <span className="h-1.5 w-1.5 rounded-full bg-teal-500 mr-2"></span>
                        Iterative approach
                      </li>
                    </ul>
                  </div>

                  <div className="p-3 rounded-md border border-gray-200 dark:border-gray-800">
                    <h3 className="font-medium">Collaboration Style</h3>
                    <ul className="mt-2 space-y-1 text-sm">
                      <li className="flex items-center">
                        <span className="h-1.5 w-1.5 rounded-full bg-teal-500 mr-2"></span>
                        Thoughtful code reviews
                      </li>
                      <li className="flex items-center">
                        <span className="h-1.5 w-1.5 rounded-full bg-teal-500 mr-2"></span>
                        Clear documentation
                      </li>
                      <li className="flex items-center">
                        <span className="h-1.5 w-1.5 rounded-full bg-teal-500 mr-2"></span>
                        Async communication
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
