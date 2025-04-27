"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { GitHubLogoIcon, VideoIcon, FileTextIcon, CodeIcon, DownloadIcon, Share2Icon } from "@radix-ui/react-icons"
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react"

export function AutoTutorialCreator() {
  const [repoUrl, setRepoUrl] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [activeTab, setActiveTab] = useState("blog")
  const [generationProgress, setGenerationProgress] = useState(0)
  const [generationComplete, setGenerationComplete] = useState(false)
  const [generationError, setGenerationError] = useState(false)
  const [tutorialLength, setTutorialLength] = useState(50)
  const [includeImages, setIncludeImages] = useState(true)
  const [includeCode, setIncludeCode] = useState(true)
  const [targetAudience, setTargetAudience] = useState("intermediate")

  const handleGenerate = () => {
    if (!repoUrl) return

    setIsGenerating(true)
    setGenerationProgress(0)
    setGenerationComplete(false)
    setGenerationError(false)

    // Simulate generation process
    const interval = setInterval(() => {
      setGenerationProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsGenerating(false)
          setGenerationComplete(true)
          return 100
        }
        return prev + 10
      })
    }, 500)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <VideoIcon className="h-5 w-5" />
            Auto-Tutorial Creator
          </CardTitle>
          <CardDescription>
            Transform your GitHub projects into comprehensive tutorials, blog posts, or video scripts
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="repo-url">GitHub Repository URL</Label>
              <div className="flex mt-1.5">
                <div className="bg-muted flex items-center px-3 rounded-l-md border border-r-0 border-input">
                  <GitHubLogoIcon className="h-4 w-4" />
                </div>
                <Input
                  id="repo-url"
                  placeholder="https://github.com/username/repo"
                  value={repoUrl}
                  onChange={(e) => setRepoUrl(e.target.value)}
                  className="rounded-l-none"
                />
              </div>
            </div>
            <div>
              <Label>Tutorial Length</Label>
              <div className="flex items-center gap-4 mt-1.5">
                <Slider
                  value={[tutorialLength]}
                  min={10}
                  max={100}
                  step={10}
                  onValueChange={(value) => setTutorialLength(value[0])}
                  className="w-32"
                />
                <span className="text-sm">{tutorialLength}%</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Target Audience</Label>
              <Select value={targetAudience} onValueChange={setTargetAudience}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue placeholder="Select audience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2 mt-6">
              <Switch id="include-images" checked={includeImages} onCheckedChange={setIncludeImages} />
              <Label htmlFor="include-images">Include Images</Label>
            </div>
            <div className="flex items-center space-x-2 mt-6">
              <Switch id="include-code" checked={includeCode} onCheckedChange={setIncludeCode} />
              <Label htmlFor="include-code">Include Code Snippets</Label>
            </div>
          </div>

          {(isGenerating || generationComplete || generationError) && (
            <div className="mt-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-medium">Generation Progress</span>
                {isGenerating && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
                {generationComplete && <CheckCircle2 className="h-4 w-4 text-green-500" />}
                {generationError && <AlertCircle className="h-4 w-4 text-red-500" />}
              </div>
              <Progress value={generationProgress} className="h-2" />
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Reset</Button>
          <Button onClick={handleGenerate} disabled={!repoUrl || isGenerating} className="gap-2">
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>Generate Tutorial</>
            )}
          </Button>
        </CardFooter>
      </Card>

      {generationComplete && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Generated Tutorial</CardTitle>
              <div className="flex gap-2">
                <Badge variant="outline" className="bg-green-50">
                  AI Generated
                </Badge>
                <Badge variant="outline">React</Badge>
                <Badge variant="outline">TypeScript</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="blog" className="flex items-center gap-1">
                  <FileTextIcon className="h-4 w-4" />
                  Blog Post
                </TabsTrigger>
                <TabsTrigger value="video" className="flex items-center gap-1">
                  <VideoIcon className="h-4 w-4" />
                  Video Script
                </TabsTrigger>
                <TabsTrigger value="code" className="flex items-center gap-1">
                  <CodeIcon className="h-4 w-4" />
                  Code Snippets
                </TabsTrigger>
              </TabsList>

              <TabsContent value="blog" className="space-y-4">
                <div className="prose max-w-none dark:prose-invert">
                  <h1>Building a Modern React Portfolio with Next.js</h1>
                  <p className="lead">
                    In this tutorial, we'll walk through creating a professional portfolio website using React, Next.js,
                    and Tailwind CSS.
                  </p>
                  <h2>Introduction</h2>
                  <p>
                    A well-designed portfolio is essential for developers looking to showcase their work and attract
                    potential employers or clients. This tutorial will guide you through building a responsive,
                    performant portfolio site with modern web technologies.
                  </p>
                  <h2>Setting Up the Project</h2>
                  <p>
                    We'll start by initializing a new Next.js project with TypeScript and Tailwind CSS. This combination
                    provides a powerful foundation for building fast, type-safe web applications with elegant styling.
                  </p>
                  <h2>Creating the Layout</h2>
                  <p>
                    Our portfolio will feature a clean, responsive layout with a navigation bar, hero section, projects
                    showcase, about section, and contact form. We'll use Tailwind's utility classes for styling and
                    ensure the design is mobile-friendly.
                  </p>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" className="gap-1">
                    <DownloadIcon className="h-4 w-4" />
                    Download Markdown
                  </Button>
                  <Button className="gap-1">
                    <Share2Icon className="h-4 w-4" />
                    Share
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="video" className="space-y-4">
                <Textarea
                  className="min-h-[300px] font-mono text-sm"
                  value={`# Video Script: Building a Modern Portfolio with React

## INTRO [0:00-0:30]
Hey everyone! Today we're building a professional developer portfolio using React, Next.js, and Tailwind CSS.

## PROJECT OVERVIEW [0:30-1:00]
This portfolio will feature:
- Responsive design
- Dark/light mode
- Project showcases
- Interactive elements
- Performance optimization

## SETUP [1:00-2:30]
First, let's create our Next.js project:
\`\`\`
npx create-next-app@latest portfolio --typescript --tailwind --eslint
cd portfolio
\`\`\`

## LAYOUT CREATION [2:30-5:00]
Now we'll build our main layout component...`}
                  readOnly
                />
                <div className="flex justify-end gap-2">
                  <Button variant="outline" className="gap-1">
                    <DownloadIcon className="h-4 w-4" />
                    Download Script
                  </Button>
                  <Button className="gap-1">Generate Voiceover</Button>
                </div>
              </TabsContent>

              <TabsContent value="code" className="space-y-4">
                <div className="bg-muted rounded-md p-4 font-mono text-sm overflow-auto max-h-[400px]">
                  <pre>{`// components/Navbar.tsx
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Sun, Moon, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="sticky top-0 z-10 bg-white dark:bg-gray-900 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold">
              Portfolio
            </Link>
          </div>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/#projects" className="hover:text-blue-600 dark:hover:text-blue-400">
              Projects
            </Link>
            <Link href="/#about" className="hover:text-blue-600 dark:hover:text-blue-400">
              About
            </Link>
            <Link href="/#contact" className="hover:text-blue-600 dark:hover:text-blue-400">
              Contact
            </Link>
            
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/#projects" className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
              Projects
            </Link>
            <Link href="/#about" className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
              About
            </Link>
            <Link href="/#contact" className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
              Contact
            </Link>
            
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="flex w-full items-center px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun size={20} className="mr-2" /> : <Moon size={20} className="mr-2" />}
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}`}</pre>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" className="gap-1">
                    <DownloadIcon className="h-4 w-4" />
                    Download Code
                  </Button>
                  <Button className="gap-1">Copy All</Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
