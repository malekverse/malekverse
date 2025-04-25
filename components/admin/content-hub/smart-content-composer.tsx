"use client"

import { useState, useRef } from "react"
import { ArrowRight, Check, Edit, Github, Loader2, Sparkles, Wand2, Calendar, Save, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Switch } from "@/components/ui/switch"

export function SmartContentComposer() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [contentType, setContentType] = useState("blog")
  const [tone, setTone] = useState("professional")
  const [githubRepo, setGithubRepo] = useState("")
  const [suggestedKeywords, setSuggestedKeywords] = useState<string[]>([])
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([])
  const [suggestedHashtags, setSuggestedHashtags] = useState<string[]>([])
  const [selectedHashtags, setSelectedHashtags] = useState<string[]>([])
  const [platforms, setPlatforms] = useState<string[]>(["portfolio"])
  const editorRef = useRef<HTMLDivElement>(null)

  const handleGenerateContent = () => {
    if (!title && !githubRepo) return

    setIsGenerating(true)

    // Simulate API call to AI service
    setTimeout(() => {
      if (githubRepo) {
        setTitle("Building a Modern Portfolio with Next.js and Three.js")
        setContent(`# Building a Modern Portfolio with Next.js and Three.js

In this article, I'll walk through how I created an interactive portfolio website using Next.js 14 and Three.js. This project combines modern web development practices with 3D visualization to create an engaging user experience.

## Project Overview

My portfolio needed to showcase my work while demonstrating my technical skills. I chose Next.js for its performance benefits and Three.js for creating immersive 3D elements.

## Key Features

- **Interactive 3D Background**: A cosmic-themed background with interactive stars and planets
- **Server Components**: Utilizing Next.js 14's server components for improved performance
- **Responsive Design**: Seamless experience across all devices
- **Dark/Light Mode**: Theme switching with smooth transitions
- **Content Management**: Custom CMS for easy portfolio updates

## Technical Implementation

The 3D background was implemented using Three.js with custom shaders for the star field effect. I used React Three Fiber to integrate Three.js with React, making the code more maintainable.

\`\`\`jsx
function CosmicBackground() {
  return (
    <Canvas>
      <Stars />
      <OrbitControls enableZoom={false} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <Suspense fallback={null}>
        <Planet position={[0, 0, 0]} />
      </Suspense>
    </Canvas>
  );
}
\`\`\`

## Performance Optimizations

To ensure fast load times, I implemented:

1. Image optimization with Next.js Image component
2. Code splitting and lazy loading
3. Server-side rendering for critical content
4. Efficient 3D rendering with instanced meshes

## Conclusion

This project demonstrates how modern web technologies can create engaging, performant websites. The combination of Next.js and Three.js offers powerful capabilities for developers looking to create standout portfolios.

Check out the [live site](https://example.com) or view the [source code](${githubRepo}).`)
      } else {
        setContent(`# ${title}

As a developer, staying current with the latest technologies is essential. In this post, I'll share my approach to continuous learning and skill development in the fast-paced world of web development.

## Embracing a Learning Mindset

The tech landscape evolves rapidly, with new frameworks, libraries, and best practices emerging constantly. Rather than feeling overwhelmed, I've adopted a strategic approach to learning:

1. **Focus on fundamentals first**: Strong understanding of JavaScript, HTML, and CSS provides a solid foundation
2. **Learn by building**: Practical projects reinforce theoretical knowledge
3. **Contribute to open source**: Collaboration exposes you to different coding styles and approaches

## My Learning System

I've developed a systematic approach to skill acquisition:

- **Weekly learning sprints**: Dedicate 5-10 hours per week to focused learning
- **Project-based practice**: Apply new skills to real-world projects
- **Documentation and reflection**: Maintain notes and blog about what I've learned
- **Community engagement**: Participate in tech communities to share knowledge

## Tools and Resources

These resources have been invaluable in my learning journey:

- **Interactive platforms**: Codecademy, Frontend Mentor
- **Documentation**: MDN Web Docs, official framework docs
- **Newsletters**: JavaScript Weekly, React Status
- **GitHub repositories**: Exploring well-structured open-source projects

## Measuring Progress

Tracking progress is crucial for maintaining motivation:

- **Skills inventory**: Maintain a list of technologies and proficiency levels
- **Project portfolio**: Showcase projects that demonstrate skill application
- **Contribution graph**: Regular GitHub contributions
- **Teaching others**: Explaining concepts reinforces understanding

## Conclusion

Continuous learning is not just about acquiring new skills—it's about developing a sustainable approach to professional growth. By establishing effective learning habits and systems, we can navigate the ever-changing tech landscape with confidence.

What learning strategies work for you? Share your thoughts in the comments!`)
      }

      // Generate suggested keywords and hashtags
      setSuggestedKeywords([
        "web development",
        "next.js",
        "react",
        "portfolio website",
        "three.js",
        "3D web",
        "frontend development",
        "javascript",
        "web design",
        "developer portfolio",
        "UI/UX",
        "performance optimization",
      ])

      setSuggestedHashtags([
        "#webdev",
        "#nextjs",
        "#reactjs",
        "#threejs",
        "#frontenddevelopment",
        "#javascript",
        "#webdesign",
        "#coding",
        "#developerlife",
        "#portfoliowebsite",
        "#uiux",
        "#techblog",
      ])

      setIsGenerating(false)
    }, 2000)
  }

  const handleToneChange = (newTone: string) => {
    setTone(newTone)

    // Simulate AI rewriting content with new tone
    setIsGenerating(true)
    setTimeout(() => {
      if (newTone === "friendly") {
        setContent(content.replace("As a developer, staying current", "Hey there fellow devs! Staying current"))
      } else if (newTone === "technical") {
        setContent(
          content.replace(
            "As a developer, staying current",
            "In the rapidly evolving ecosystem of web technologies, maintaining proficiency",
          ),
        )
      } else if (newTone === "casual") {
        setContent(
          content.replace(
            "As a developer, staying current",
            "Let's face it - keeping up with tech is tough! But staying current",
          ),
        )
      }
      setIsGenerating(false)
    }, 1500)
  }

  const toggleKeyword = (keyword: string) => {
    if (selectedKeywords.includes(keyword)) {
      setSelectedKeywords(selectedKeywords.filter((k) => k !== keyword))
    } else {
      setSelectedKeywords([...selectedKeywords, keyword])
    }
  }

  const toggleHashtag = (hashtag: string) => {
    if (selectedHashtags.includes(hashtag)) {
      setSelectedHashtags(selectedHashtags.filter((h) => h !== hashtag))
    } else {
      setSelectedHashtags([...selectedHashtags, hashtag])
    }
  }

  const togglePlatform = (platform: string) => {
    if (platforms.includes(platform)) {
      setPlatforms(platforms.filter((p) => p !== platform))
    } else {
      setPlatforms([...platforms, platform])
    }
  }

  const handleSaveAsDraft = () => {
    // Simulate saving
    setTimeout(() => {
      alert("Content saved as draft!")
    }, 500)
  }

  const handleSchedule = () => {
    // Simulate scheduling
    setTimeout(() => {
      alert("Content scheduled!")
    }, 500)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Smart Content Composer</CardTitle>
            <CardDescription>
              Create and edit content with AI assistance for your portfolio and social platforms.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="content-title">Title</Label>
              <Input
                id="content-title"
                placeholder="Enter a title for your content..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="flex items-center space-x-2">
                <Label htmlFor="content-type">Type:</Label>
                <Select value={contentType} onValueChange={setContentType}>
                  <SelectTrigger id="content-type" className="w-[140px]">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="blog">Blog Post</SelectItem>
                    <SelectItem value="linkedin">LinkedIn Post</SelectItem>
                    <SelectItem value="portfolio">Portfolio Project</SelectItem>
                    <SelectItem value="github">GitHub README</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Label htmlFor="tone">Tone:</Label>
                <Select value={tone} onValueChange={handleToneChange}>
                  <SelectTrigger id="tone" className="w-[140px]">
                    <SelectValue placeholder="Select tone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="friendly">Friendly</SelectItem>
                    <SelectItem value="technical">Technical</SelectItem>
                    <SelectItem value="casual">Casual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="border rounded-md p-4">
              <div
                ref={editorRef}
                className="min-h-[400px] prose dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{
                  __html: content
                    .replace(/\n/g, "<br>")
                    .replace(/# (.*)/g, "<h1>$1</h1>")
                    .replace(/## (.*)/g, "<h2>$1</h2>")
                    .replace(/\*\*(.*)\*\*/g, "<strong>$1</strong>")
                    .replace(/```(.*)```/gs, "<pre><code>$1</code></pre>"),
                }}
                contentEditable
                onInput={(e) => setContent((e.target as HTMLDivElement).innerText)}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="flex space-x-2">
              <Button variant="outline" onClick={handleSaveAsDraft}>
                <Save className="mr-2 h-4 w-4" />
                Save as Draft
              </Button>
              <Button variant="outline" onClick={handleSchedule}>
                <Calendar className="mr-2 h-4 w-4" />
                Schedule
              </Button>
            </div>
            <Button className="bg-teal-500 hover:bg-teal-600">
              <Send className="mr-2 h-4 w-4" />
              Publish Now
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>AI Assistant</CardTitle>
            <CardDescription>Generate and enhance your content with AI.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Tabs defaultValue="generate">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="generate">Generate</TabsTrigger>
                <TabsTrigger value="enhance">Enhance</TabsTrigger>
              </TabsList>

              <TabsContent value="generate" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="topic">Topic or Idea</Label>
                  <Input
                    id="topic"
                    placeholder="Enter a topic for your content..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="github-repo">
                    <div className="flex items-center">
                      <Github className="h-4 w-4 mr-2" />
                      GitHub Repository (Optional)
                    </div>
                  </Label>
                  <Input
                    id="github-repo"
                    placeholder="https://github.com/username/repo"
                    value={githubRepo}
                    onChange={(e) => setGithubRepo(e.target.value)}
                  />
                </div>

                <Button
                  className="w-full bg-teal-500 hover:bg-teal-600"
                  onClick={handleGenerateContent}
                  disabled={isGenerating || (!title && !githubRepo)}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Wand2 className="mr-2 h-4 w-4" />
                      Generate Content
                    </>
                  )}
                </Button>
              </TabsContent>

              <TabsContent value="enhance" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label>Enhancement Options</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm" className="justify-start">
                      <Edit className="mr-2 h-4 w-4" />
                      Improve Writing
                    </Button>
                    <Button variant="outline" size="sm" className="justify-start">
                      <ArrowRight className="mr-2 h-4 w-4" />
                      Make Concise
                    </Button>
                    <Button variant="outline" size="sm" className="justify-start">
                      <Sparkles className="mr-2 h-4 w-4" />
                      Add Examples
                    </Button>
                    <Button variant="outline" size="sm" className="justify-start">
                      <Check className="mr-2 h-4 w-4" />
                      Fix Grammar
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Custom Instructions</Label>
                  <Textarea placeholder="Add specific instructions for AI enhancement..." className="h-20" />
                </div>

                <Button className="w-full bg-teal-500 hover:bg-teal-600">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Enhance Content
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Keywords & Hashtags</CardTitle>
            <CardDescription>Optimize your content for discovery.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {suggestedKeywords.length > 0 && (
              <div className="space-y-2">
                <Label>Suggested Keywords</Label>
                <div className="flex flex-wrap gap-2">
                  {suggestedKeywords.map((keyword, index) => (
                    <Badge
                      key={index}
                      variant={selectedKeywords.includes(keyword) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => toggleKeyword(keyword)}
                    >
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {suggestedHashtags.length > 0 && (
              <div className="space-y-2">
                <Label>Suggested Hashtags</Label>
                <div className="flex flex-wrap gap-2">
                  {suggestedHashtags.map((hashtag, index) => (
                    <Badge
                      key={index}
                      variant={selectedHashtags.includes(hashtag) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => toggleHashtag(hashtag)}
                    >
                      {hashtag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label>Publish To</Label>
              <div className="flex flex-wrap gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={platforms.includes("portfolio")}
                          onCheckedChange={() => togglePlatform("portfolio")}
                        />
                        <span>Portfolio</span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Publish to your portfolio blog</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={platforms.includes("linkedin")}
                          onCheckedChange={() => togglePlatform("linkedin")}
                        />
                        <span>LinkedIn</span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Publish to LinkedIn</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={platforms.includes("github")}
                          onCheckedChange={() => togglePlatform("github")}
                        />
                        <span>GitHub</span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Create GitHub README or Gist</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
