"use client"

import { useState } from "react"
import {
  CalendarIcon,
  Check,
  Copy,
  Download,
  Github,
  Loader2,
  Linkedin,
  FileText,
  Wand2,
  RefreshCw,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format, subDays } from "date-fns"
import { cn } from "@/lib/utils"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

export function WeeklyRecapGenerator() {
  const [date, setDate] = useState<Date>(new Date())
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedRecap, setGeneratedRecap] = useState("")
  const [selectedFormat, setSelectedFormat] = useState("linkedin")
  const [includeGithub, setIncludeGithub] = useState(true)
  const [includeBlog, setIncludeBlog] = useState(true)
  const [includeLearning, setIncludeLearning] = useState(true)

  const handleGenerateRecap = () => {
    setIsGenerating(true)

    // Simulate API call to generate recap
    setTimeout(() => {
      const weekStart = format(subDays(date, 6), "MMMM d")
      const weekEnd = format(date, "MMMM d, yyyy")

      if (selectedFormat === "linkedin") {
        setGeneratedRecap(`🚀 Weekly Update: ${weekStart} - ${weekEnd} 🚀

This week was productive! Here's what I accomplished:

👨‍💻 GitHub Activity:
- Completed the interactive 3D background for my portfolio using Three.js
- Fixed 5 bugs in my content management system
- Contributed to 2 open source projects

📝 Content Created:
- Published "Building a Modern Portfolio with Next.js and Three.js"
- Drafted "Optimizing React Performance: Lessons from My Portfolio Project"

📚 Learning Progress:
- Completed Advanced React Patterns course
- Read 3 chapters of "Designing Data-Intensive Applications"
- Practiced TypeScript generics and advanced types

Looking forward to next week's challenges! What have you been working on?

#WebDevelopment #React #NextJS #ThreeJS #ContinuousLearning`)
      } else {
        setGeneratedRecap(`# Weekly Recap: ${weekStart} - ${weekEnd}

## GitHub Activity

This week I focused on enhancing my portfolio website and contributing to open source:

- **Portfolio Enhancements**: Implemented an interactive 3D background using Three.js and React Three Fiber
- **Bug Fixes**: Resolved 5 issues in my content management system
- **Open Source**: Contributed to 2 projects:
  - Fixed documentation in react-three-fiber
  - Added a new component to shadcn/ui

## Content Created

I published one article and drafted another:

- **Published**: [Building a Modern Portfolio with Next.js and Three.js](/blog/modern-portfolio)
- **Drafted**: Optimizing React Performance: Lessons from My Portfolio Project

## Learning Progress

Continuing my commitment to continuous learning:

- Completed Advanced React Patterns course on Frontend Masters
- Read 3 chapters of "Designing Data-Intensive Applications"
- Practiced TypeScript generics and advanced types through coding exercises

## Next Week's Goals

- Finish and publish the React performance article
- Implement the content automation system
- Start learning about WebGPU

## Reflections

This week reinforced the importance of balancing coding, content creation, and learning. The 3D background implementation was particularly challenging but rewarding, teaching me about performance optimization in Three.js.`)
      }

      setIsGenerating(false)
    }, 2000)
  }

  const handleCopyRecap = () => {
    navigator.clipboard.writeText(generatedRecap)
    // You could add a toast notification here
  }

  const handleDownloadRecap = () => {
    const element = document.createElement("a")
    const file = new Blob([generatedRecap], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = `weekly-recap-${format(date, "yyyy-MM-dd")}.${selectedFormat === "blog" ? "md" : "txt"}`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Weekly Recap Settings</CardTitle>
            <CardDescription>Configure and generate your weekly activity recap</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Week Ending</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "MMMM d, yyyy") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={(date) => date && setDate(date)} initialFocus />
                </PopoverContent>
              </Popover>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                This will generate a recap for the week ending on this date
              </p>
            </div>

            <div className="space-y-2">
              <Label>Format</Label>
              <Tabs defaultValue="linkedin" onValueChange={setSelectedFormat}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="linkedin" className="flex items-center">
                    <Linkedin className="mr-2 h-4 w-4" />
                    LinkedIn
                  </TabsTrigger>
                  <TabsTrigger value="blog" className="flex items-center">
                    <FileText className="mr-2 h-4 w-4" />
                    Blog
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="space-y-4">
              <Label>Include Content</Label>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Github className="h-4 w-4" />
                  <Label htmlFor="include-github">GitHub Activity</Label>
                </div>
                <Switch id="include-github" checked={includeGithub} onCheckedChange={setIncludeGithub} />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FileText className="h-4 w-4" />
                  <Label htmlFor="include-blog">Blog Posts</Label>
                </div>
                <Switch id="include-blog" checked={includeBlog} onCheckedChange={setIncludeBlog} />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-4 w-4" />
                  <Label htmlFor="include-learning">Learning Progress</Label>
                </div>
                <Switch id="include-learning" checked={includeLearning} onCheckedChange={setIncludeLearning} />
              </div>
            </div>

            <Button
              className="w-full bg-teal-500 hover:bg-teal-600"
              onClick={handleGenerateRecap}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 className="mr-2 h-4 w-4" />
                  Generate Recap
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Weekly Recap Preview</CardTitle>
                <CardDescription>
                  {generatedRecap
                    ? `Week of ${format(subDays(date, 6), "MMM d")} - ${format(date, "MMM d, yyyy")}`
                    : "Generate a recap to see preview"}
                </CardDescription>
              </div>
              {generatedRecap && (
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={handleCopyRecap}>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleDownloadRecap}>
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {generatedRecap ? (
              <div
                className={cn(
                  "min-h-[400px] p-4 rounded-md border",
                  selectedFormat === "linkedin" ? "font-sans" : "font-mono",
                )}
              >
                <div className="prose dark:prose-invert max-w-none">
                  {selectedFormat === "blog" ? (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: generatedRecap
                          .replace(/^# (.*$)/gm, "<h1>$1</h1>")
                          .replace(/^## (.*$)/gm, "<h2>$1</h2>")
                          .replace(/^### (.*$)/gm, "<h3>$1</h3>")
                          .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                          .replace(/\n/g, "<br>"),
                      }}
                    />
                  ) : (
                    <pre className="whitespace-pre-wrap font-sans">{generatedRecap}</pre>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center min-h-[400px] p-4 rounded-md border border-dashed">
                <FileText className="h-16 w-16 text-gray-300 dark:text-gray-600" />
                <p className="mt-4 text-gray-500 dark:text-gray-400">
                  Configure your settings and generate a recap to see it here
                </p>
              </div>
            )}
          </CardContent>
          {generatedRecap && (
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleGenerateRecap}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Regenerate
              </Button>
              <Button className="bg-teal-500 hover:bg-teal-600">
                <Check className="mr-2 h-4 w-4" />
                Use This Recap
              </Button>
            </CardFooter>
          )}
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your recent activity that will be included in the recap</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-lg font-medium flex items-center">
                <Github className="mr-2 h-5 w-5" />
                GitHub Activity
              </h3>
              <div className="space-y-2">
                <div className="flex items-start p-3 rounded-md border">
                  <div className="flex-1">
                    <div className="flex items-center">
                      <h4 className="font-medium">portfolio-website</h4>
                      <Badge className="ml-2 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                        5 commits
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Added interactive 3D background, fixed responsive issues
                    </p>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">2 days ago</div>
                </div>

                <div className="flex items-start p-3 rounded-md border">
                  <div className="flex-1">
                    <div className="flex items-center">
                      <h4 className="font-medium">content-management-system</h4>
                      <Badge className="ml-2 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                        PR merged
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Fixed 5 bugs in the content scheduling system
                    </p>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">4 days ago</div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-medium flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Blog Posts
              </h3>
              <div className="space-y-2">
                <div className="flex items-start p-3 rounded-md border">
                  <div className="flex-1">
                    <div className="flex items-center">
                      <h4 className="font-medium">Building a Modern Portfolio with Next.js and Three.js</h4>
                      <Badge className="ml-2 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                        Published
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      A deep dive into creating an interactive portfolio website
                    </p>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">1 day ago</div>
                </div>

                <div className="flex items-start p-3 rounded-md border">
                  <div className="flex-1">
                    <div className="flex items-center">
                      <h4 className="font-medium">Optimizing React Performance: Lessons from My Portfolio Project</h4>
                      <Badge className="ml-2 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                        Draft
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Techniques for improving load times and runtime performance
                    </p>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">3 days ago</div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-medium flex items-center">
                <BookOpen className="mr-2 h-5 w-5" />
                Learning Progress
              </h3>
              <div className="space-y-2">
                <div className="flex items-start p-3 rounded-md border">
                  <div className="flex-1">
                    <div className="flex items-center">
                      <h4 className="font-medium">Advanced React Patterns</h4>
                      <Badge className="ml-2 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                        Completed
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Frontend Masters course on advanced React patterns and techniques
                    </p>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">2 days ago</div>
                </div>

                <div className="flex items-start p-3 rounded-md border">
                  <div className="flex-1">
                    <div className="flex items-center">
                      <h4 className="font-medium">Designing Data-Intensive Applications</h4>
                      <Badge className="ml-2 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                        In Progress
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Read 3 chapters this week (Chapters 5-7)
                    </p>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">5 days ago</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

import { BookOpen } from "lucide-react"
