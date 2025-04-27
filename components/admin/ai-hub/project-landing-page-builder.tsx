"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  ArrowRight,
  Check,
  Copy,
  Github,
  Globe,
  Loader2,
  PlusCircle,
  Rocket,
  Search,
  Settings,
  Share2,
  Sparkles,
  Upload,
  Wand2,
  X,
  Eye,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Progress } from "@/components/ui/progress"

interface Repository {
  id: string
  name: string
  description: string
  url: string
  stars: number
  language: string
  lastUpdated: string
  isGenerated?: boolean
}

interface Template {
  id: string
  name: string
  description: string
  image: string
  tags: string[]
}

export function ProjectLandingPageBuilder() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRepo, setSelectedRepo] = useState<Repository | null>(null)
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>("minimal")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationProgress, setGenerationProgress] = useState(0)
  const [activeTab, setActiveTab] = useState("repositories")
  const [deployedSites, setDeployedSites] = useState<Repository[]>([])
  const [customDomain, setCustomDomain] = useState("yourname.dev")
  const [isDeploying, setIsDeploying] = useState(false)

  // Sample repositories
  const repositories: Repository[] = [
    {
      id: "1",
      name: "interactive-portfolio",
      description: "A modern portfolio website with interactive 3D elements and animations",
      url: "https://github.com/username/interactive-portfolio",
      stars: 24,
      language: "TypeScript",
      lastUpdated: "2 days ago",
    },
    {
      id: "2",
      name: "ai-content-generator",
      description: "AI-powered content generation tool for blogs and social media",
      url: "https://github.com/username/ai-content-generator",
      stars: 56,
      language: "JavaScript",
      lastUpdated: "1 week ago",
    },
    {
      id: "3",
      name: "react-component-library",
      description: "A collection of reusable React components with Storybook documentation",
      url: "https://github.com/username/react-component-library",
      stars: 132,
      language: "TypeScript",
      lastUpdated: "3 days ago",
    },
    {
      id: "4",
      name: "node-api-starter",
      description: "Starter template for Node.js APIs with Express, TypeScript, and MongoDB",
      url: "https://github.com/username/node-api-starter",
      stars: 87,
      language: "TypeScript",
      lastUpdated: "5 days ago",
    },
    {
      id: "5",
      name: "e-commerce-dashboard",
      description: "Admin dashboard for e-commerce platforms with analytics and order management",
      url: "https://github.com/username/e-commerce-dashboard",
      stars: 45,
      language: "JavaScript",
      lastUpdated: "2 weeks ago",
    },
  ]

  // Sample templates
  const templates: Template[] = [
    {
      id: "minimal",
      name: "Minimal",
      description: "Clean, simple design with focus on content",
      image: "/placeholder.svg?height=100&width=200",
      tags: ["clean", "modern", "simple"],
    },
    {
      id: "tech",
      name: "Tech",
      description: "Modern tech-focused design with code snippets and tech details",
      image: "/placeholder.svg?height=100&width=200",
      tags: ["tech", "code", "dark"],
    },
    {
      id: "creative",
      name: "Creative",
      description: "Bold, creative design with animations and interactive elements",
      image: "/placeholder.svg?height=100&width=200",
      tags: ["creative", "colorful", "interactive"],
    },
    {
      id: "professional",
      name: "Professional",
      description: "Professional design suitable for business or enterprise projects",
      image: "/placeholder.svg?height=100&width=200",
      tags: ["professional", "business", "clean"],
    },
  ]

  const filteredRepositories = repositories.filter(
    (repo) =>
      repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      repo.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleGenerateLandingPage = () => {
    if (!selectedRepo) return

    setIsGenerating(true)
    setGenerationProgress(0)

    // Simulate progress
    const interval = setInterval(() => {
      setGenerationProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 10
      })
    }, 500)

    // Simulate completion after progress reaches 100%
    setTimeout(() => {
      clearInterval(interval)
      setIsGenerating(false)
      setGenerationProgress(100)

      const generatedRepo = {
        ...selectedRepo,
        isGenerated: true,
      }

      setDeployedSites((prev) => [generatedRepo, ...prev])
      setActiveTab("deployed")
    }, 6000)
  }

  const handleDeployWebsite = () => {
    setIsDeploying(true)

    // Simulate deployment
    setTimeout(() => {
      setIsDeploying(false)
    }, 3000)
  }

  const renderRepositoryList = () => (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
        <Input
          placeholder="Search repositories..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {filteredRepositories.length === 0 ? (
        <div className="text-center py-8">
          <Github className="h-12 w-12 mx-auto text-gray-400" />
          <h3 className="mt-4 text-lg font-medium">No repositories found</h3>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Try a different search term or connect more repositories
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredRepositories.map((repo) => (
            <div
              key={repo.id}
              className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                selectedRepo?.id === repo.id
                  ? "border-teal-500 bg-teal-50 dark:bg-teal-900/20"
                  : "border-gray-200 dark:border-gray-800 hover:border-teal-200 dark:hover:border-teal-800"
              }`}
              onClick={() => setSelectedRepo(repo)}
            >
              <div className="flex justify-between">
                <div className="flex items-center">
                  <Github className="h-5 w-5 mr-2 text-gray-500" />
                  <h3 className="font-medium">{repo.name}</h3>
                </div>
                <Badge variant="outline">{repo.language}</Badge>
              </div>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{repo.description}</p>
              <div className="mt-3 flex items-center text-xs text-gray-500">
                <div className="flex items-center mr-4">
                  <svg className="h-4 w-4 mr-1 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
                  </svg>
                  <span>{repo.stars}</span>
                </div>
                <span>Updated {repo.lastUpdated}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <Button className="w-full" variant="outline">
        <PlusCircle className="mr-2 h-4 w-4" />
        Connect More Repositories
      </Button>
    </div>
  )

  const renderTemplateSelector = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {templates.map((template) => (
          <div
            key={template.id}
            className={`p-4 rounded-lg border cursor-pointer transition-colors ${
              selectedTemplate === template.id
                ? "border-teal-500 bg-teal-50 dark:bg-teal-900/20"
                : "border-gray-200 dark:border-gray-800 hover:border-teal-200 dark:hover:border-teal-800"
            }`}
            onClick={() => setSelectedTemplate(template.id)}
          >
            <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-md mb-3 overflow-hidden">
              <img
                src={template.image || "/placeholder.svg"}
                alt={template.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{template.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{template.description}</p>
              </div>
              {selectedTemplate === template.id && (
                <div className="h-5 w-5 rounded-full bg-teal-500 flex items-center justify-center text-white">
                  <Check className="h-3 w-3" />
                </div>
              )}
            </div>
            <div className="mt-3 flex flex-wrap gap-1">
              {template.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderCustomizationOptions = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-sm font-medium">Basic Information</h3>
        <div className="space-y-3">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="project-name" className="text-right">
              Project Name
            </Label>
            <Input id="project-name" defaultValue={selectedRepo?.name} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="project-description" className="text-right">
              Description
            </Label>
            <Textarea
              id="project-description"
              defaultValue={selectedRepo?.description}
              className="col-span-3"
              rows={3}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="project-url" className="text-right">
              GitHub URL
            </Label>
            <Input id="project-url" defaultValue={selectedRepo?.url} className="col-span-3" />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium">Content Sections</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Switch id="features" defaultChecked />
              <Label htmlFor="features">Features Section</Label>
            </div>
            <Badge>Recommended</Badge>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Switch id="tech-stack" defaultChecked />
              <Label htmlFor="tech-stack">Tech Stack</Label>
            </div>
            <Badge>Recommended</Badge>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Switch id="screenshots" defaultChecked />
              <Label htmlFor="screenshots">Screenshots</Label>
            </div>
            <Badge>Recommended</Badge>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Switch id="installation" defaultChecked />
              <Label htmlFor="installation">Installation Guide</Label>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Switch id="contact" defaultChecked />
              <Label htmlFor="contact">Contact Form</Label>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Switch id="demo" defaultChecked />
              <Label htmlFor="demo">Live Demo Link</Label>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium">Deployment Options</h3>
        <div className="space-y-3">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="custom-domain" className="text-right">
              Subdomain
            </Label>
            <div className="col-span-3 flex">
              <Input
                id="project-slug"
                defaultValue={selectedRepo?.name.toLowerCase().replace(/\s+/g, "-")}
                className="rounded-r-none"
              />
              <div className="flex items-center border border-l-0 rounded-r-md px-3 text-sm text-gray-500 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                .{customDomain}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="custom-domain" className="text-right">
              Custom Domain
            </Label>
            <Input id="custom-domain" placeholder="projects.yourdomain.com" className="col-span-3" />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium">AI Enhancements</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Switch id="ai-content" defaultChecked />
              <Label htmlFor="ai-content">AI-Enhanced Content</Label>
            </div>
            <Badge className="bg-purple-500">AI</Badge>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Switch id="ai-seo" defaultChecked />
              <Label htmlFor="ai-seo">SEO Optimization</Label>
            </div>
            <Badge className="bg-purple-500">AI</Badge>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Switch id="ai-features" defaultChecked />
              <Label htmlFor="ai-features">Auto-Extract Features</Label>
            </div>
            <Badge className="bg-purple-500">AI</Badge>
          </div>
        </div>
      </div>
    </div>
  )

  const renderDeployedSites = () => (
    <div className="space-y-4">
      {deployedSites.length === 0 ? (
        <div className="text-center py-8">
          <Rocket className="h-12 w-12 mx-auto text-gray-400" />
          <h3 className="mt-4 text-lg font-medium">No deployed sites yet</h3>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Generate and deploy your first project landing page
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {deployedSites.map((site) => (
            <Card key={site.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <div>
                    <CardTitle>{site.name}</CardTitle>
                    <CardDescription>
                      {site.description.length > 100 ? `${site.description.substring(0, 100)}...` : site.description}
                    </CardDescription>
                  </div>
                  <Badge className="bg-green-500">Live</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden relative">
                  <img
                    src="/placeholder.svg?height=200&width=400"
                    alt={site.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity">
                    <Button variant="secondary">
                      <Eye className="mr-2 h-4 w-4" />
                      Preview
                    </Button>
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <Globe className="h-4 w-4 mr-1 text-gray-500" />
                  <a
                    href={`https://${site.name.toLowerCase().replace(/\s+/g, "-")}.${customDomain}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-500 hover:underline"
                  >
                    {site.name.toLowerCase().replace(/\s+/g, "-")}.{customDomain}
                  </a>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Settings className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                </div>
                <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
                  <X className="mr-2 h-4 w-4" />
                  Remove
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Project Landing Page Builder</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Generate beautiful landing pages for your GitHub projects
          </p>
        </div>
        <div className="mt-4 flex space-x-3 sm:mt-0">
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Import Project
          </Button>
          <Button className="bg-teal-500 hover:bg-teal-600">
            <Sparkles className="mr-2 h-4 w-4" />
            New Template
          </Button>
        </div>
      </div>

      <Tabs defaultValue="repositories" className="space-y-6" onValueChange={setActiveTab} value={activeTab}>
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="repositories">1. Select Repository</TabsTrigger>
          <TabsTrigger value="template" disabled={!selectedRepo}>
            2. Choose Template
          </TabsTrigger>
          <TabsTrigger value="customize" disabled={!selectedRepo || !selectedTemplate}>
            3. Customize
          </TabsTrigger>
          <TabsTrigger value="deployed">Deployed Sites</TabsTrigger>
        </TabsList>

        <TabsContent value="repositories" className="space-y-6">
          {renderRepositoryList()}

          <div className="flex justify-end">
            <Button
              onClick={() => selectedRepo && setActiveTab("template")}
              disabled={!selectedRepo}
              className="bg-teal-500 hover:bg-teal-600"
            >
              Next: Choose Template <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="template" className="space-y-6">
          {renderTemplateSelector()}

          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setActiveTab("repositories")}>
              <ArrowRight className="mr-2 h-4 w-4 rotate-180" /> Back: Select Repository
            </Button>
            <Button
              onClick={() => selectedTemplate && setActiveTab("customize")}
              disabled={!selectedTemplate}
              className="bg-teal-500 hover:bg-teal-600"
            >
              Next: Customize <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="customize" className="space-y-6">
          {renderCustomizationOptions()}

          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setActiveTab("template")}>
              <ArrowRight className="mr-2 h-4 w-4 rotate-180" /> Back: Choose Template
            </Button>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <Button
                      onClick={handleGenerateLandingPage}
                      disabled={isGenerating}
                      className="bg-teal-500 hover:bg-teal-600"
                    >
                      {isGenerating ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Wand2 className="mr-2 h-4 w-4" />
                          Generate Landing Page
                        </>
                      )}
                    </Button>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>AI will analyze your repo and generate a complete landing page</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          {isGenerating && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-6"
            >
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Generation Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Progress value={generationProgress} className="h-2" />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Analyzing repository...</span>
                      <span>{generationProgress}%</span>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2">
                    <div className="flex items-center">
                      <div className="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center text-white mr-2">
                        <Check className="h-3 w-3" />
                      </div>
                      <span className="text-sm">Repository analyzed</span>
                    </div>
                    <div className="flex items-center">
                      <div className="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center text-white mr-2">
                        <Check className="h-3 w-3" />
                      </div>
                      <span className="text-sm">Tech stack identified</span>
                    </div>
                    <div className="flex items-center">
                      {generationProgress >= 50 ? (
                        <div className="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center text-white mr-2">
                          <Check className="h-3 w-3" />
                        </div>
                      ) : (
                        <div className="h-5 w-5 rounded-full border border-gray-300 dark:border-gray-700 mr-2"></div>
                      )}
                      <span className="text-sm">Content generation</span>
                    </div>
                    <div className="flex items-center">
                      {generationProgress >= 80 ? (
                        <div className="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center text-white mr-2">
                          <Check className="h-3 w-3" />
                        </div>
                      ) : (
                        <div className="h-5 w-5 rounded-full border border-gray-300 dark:border-gray-700 mr-2"></div>
                      )}
                      <span className="text-sm">Layout and styling</span>
                    </div>
                    <div className="flex items-center">
                      {generationProgress >= 100 ? (
                        <div className="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center text-white mr-2">
                          <Check className="h-3 w-3" />
                        </div>
                      ) : (
                        <div className="h-5 w-5 rounded-full border border-gray-300 dark:border-gray-700 mr-2"></div>
                      )}
                      <span className="text-sm">Optimization and finalization</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {generationProgress === 100 && !isGenerating && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-6"
            >
              <Card className="border-green-500">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-green-500">Generation Complete!</CardTitle>
                    <Badge className="bg-green-500">Success</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden relative">
                    <img
                      src="/placeholder.svg?height=200&width=400"
                      alt="Generated landing page preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity">
                      <Button variant="secondary">
                        <Eye className="mr-2 h-4 w-4" />
                        Preview
                      </Button>
                    </div>
                  </div>

                  <div className="mt-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Globe className="h-4 w-4 mr-2 text-gray-500" />
                        <span className="text-sm">
                          {selectedRepo?.name.toLowerCase().replace(/\s+/g, "-")}.{customDomain}
                        </span>
                      </div>
                      <Button variant="outline" size="sm">
                        <Copy className="mr-2 h-4 w-4" />
                        Copy URL
                      </Button>
                    </div>

                    <div className="flex justify-between">
                      <Button variant="outline">
                        <Settings className="mr-2 h-4 w-4" />
                        Edit Page
                      </Button>
                      <Button
                        onClick={handleDeployWebsite}
                        disabled={isDeploying}
                        className="bg-teal-500 hover:bg-teal-600"
                      >
                        {isDeploying ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Deploying...
                          </>
                        ) : (
                          <>
                            <Rocket className="mr-2 h-4 w-4" />
                            Deploy Website
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </TabsContent>

        <TabsContent value="deployed" className="space-y-6">
          {renderDeployedSites()}
        </TabsContent>
      </Tabs>
    </div>
  )
}
