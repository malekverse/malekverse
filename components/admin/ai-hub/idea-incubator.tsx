"use client"

import { TabsContent } from "@/components/ui/tabs"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Archive,
  ArrowRight,
  Check,
  Code,
  Lightbulb,
  Loader2,
  MoreHorizontal,
  Plus,
  Search,
  Star,
  Trash2,
  Wand2,
  Eye,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Idea {
  id: string
  title: string
  description: string
  tags: string[]
  status: "backlog" | "building" | "done"
  createdAt: Date
  isStarred: boolean
  techStack?: string[]
  mvpPlan?: string[]
  monetization?: string[]
  complexity?: "low" | "medium" | "high"
  timeEstimate?: string
  aiSuggestions?: string[]
}

export function IdeaIncubator() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [isAddingIdea, setIsAddingIdea] = useState(false)
  const [isViewingIdea, setIsViewingIdea] = useState<string | null>(null)
  const [isGeneratingAI, setIsGeneratingAI] = useState(false)
  const [newIdea, setNewIdea] = useState({
    title: "",
    description: "",
    tags: "",
  })

  // Sample ideas
  const [ideas, setIdeas] = useState<Idea[]>([
    {
      id: "1",
      title: "AI-Powered Code Review Assistant",
      description:
        "A tool that automatically reviews code for best practices, potential bugs, and performance issues using machine learning.",
      tags: ["ai", "developer-tools", "productivity"],
      status: "backlog",
      createdAt: new Date(2023, 3, 15),
      isStarred: true,
      techStack: ["Python", "TensorFlow", "React", "Node.js"],
      mvpPlan: [
        "Basic code parsing and analysis",
        "Integration with GitHub",
        "Simple UI for viewing results",
        "Support for JavaScript/TypeScript",
      ],
      monetization: ["Freemium model", "Premium features for teams", "Enterprise licensing"],
      complexity: "high",
      timeEstimate: "4-6 months",
      aiSuggestions: [
        "Consider adding support for multiple programming languages",
        "Implement a VS Code extension for real-time feedback",
        "Add a feature to automatically fix common issues",
      ],
    },
    {
      id: "2",
      title: "Personal Finance Dashboard",
      description:
        "A dashboard that aggregates financial data from multiple sources and provides insights and recommendations.",
      tags: ["finance", "dashboard", "data-visualization"],
      status: "building",
      createdAt: new Date(2023, 4, 10),
      isStarred: false,
      techStack: ["React", "D3.js", "Node.js", "MongoDB"],
      mvpPlan: [
        "Account connection and data aggregation",
        "Basic spending analytics",
        "Budget tracking",
        "Simple dashboard UI",
      ],
      monetization: ["Subscription model", "Premium insights", "White-label for financial advisors"],
      complexity: "medium",
      timeEstimate: "2-3 months",
      aiSuggestions: [
        "Add AI-powered spending predictions",
        "Implement goal-based savings features",
        "Consider adding investment portfolio analysis",
      ],
    },
    {
      id: "3",
      title: "Interactive Learning Platform for Developers",
      description:
        "A platform that teaches coding through interactive exercises, real-world projects, and personalized learning paths.",
      tags: ["education", "coding", "interactive"],
      status: "done",
      createdAt: new Date(2023, 2, 5),
      isStarred: true,
      techStack: ["Next.js", "TypeScript", "WebAssembly", "PostgreSQL"],
      mvpPlan: ["Interactive code editor", "Basic lesson structure", "Progress tracking", "Authentication system"],
      monetization: ["Course marketplace", "Subscription for premium content", "Enterprise training packages"],
      complexity: "high",
      timeEstimate: "6-8 months",
      aiSuggestions: [
        "Implement AI-powered code hints and suggestions",
        "Add social features for collaborative learning",
        "Consider creating a mobile app companion",
      ],
    },
    {
      id: "4",
      title: "Smart Home Energy Optimizer",
      description:
        "An application that uses IoT data to optimize energy usage in smart homes, reducing bills and environmental impact.",
      tags: ["iot", "sustainability", "smart-home"],
      status: "backlog",
      createdAt: new Date(2023, 5, 20),
      isStarred: false,
      techStack: ["React Native", "Node.js", "MQTT", "TensorFlow"],
      mvpPlan: [
        "Integration with popular smart home devices",
        "Basic energy usage dashboard",
        "Simple automation rules",
        "Mobile app interface",
      ],
      monetization: ["Hardware partnerships", "Premium features subscription", "Energy company partnerships"],
      complexity: "medium",
      timeEstimate: "3-4 months",
      aiSuggestions: [
        "Add machine learning for predictive energy optimization",
        "Implement gamification to encourage energy saving",
        "Consider adding solar panel integration and optimization",
      ],
    },
    {
      id: "5",
      title: "Collaborative Whiteboard for Remote Teams",
      description:
        "A real-time collaborative whiteboard tool designed specifically for remote development teams with code integration.",
      tags: ["collaboration", "remote-work", "productivity"],
      status: "backlog",
      createdAt: new Date(2023, 4, 15),
      isStarred: true,
      techStack: ["React", "WebSockets", "Canvas API", "Firebase"],
      mvpPlan: [
        "Real-time drawing and collaboration",
        "Basic shapes and text tools",
        "User presence indicators",
        "Simple sharing and permissions",
      ],
      monetization: ["Team subscription plans", "Enterprise licensing", "Integration marketplace"],
      complexity: "medium",
      timeEstimate: "2-3 months",
      aiSuggestions: [
        "Add code snippet sharing and execution",
        "Implement video chat integration",
        "Consider adding templates for common development diagrams",
      ],
    },
  ])

  const handleAddIdea = () => {
    if (!newIdea.title) return

    const idea: Idea = {
      id: (ideas.length + 1).toString(),
      title: newIdea.title,
      description: newIdea.description,
      tags: newIdea.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag),
      status: "backlog",
      createdAt: new Date(),
      isStarred: false,
    }

    setIdeas([idea, ...ideas])
    setNewIdea({ title: "", description: "", tags: "" })
    setIsAddingIdea(false)
  }

  const handleGenerateAISuggestions = (ideaId: string) => {
    setIsGeneratingAI(true)

    // Simulate API call
    setTimeout(() => {
      setIdeas(
        ideas.map((idea) => {
          if (idea.id === ideaId) {
            return {
              ...idea,
              techStack: idea.techStack || ["React", "Node.js", "MongoDB", "TensorFlow", "WebSockets"],
              mvpPlan: idea.mvpPlan || [
                "User authentication system",
                "Basic feature implementation",
                "Simple dashboard UI",
                "Core functionality testing",
              ],
              monetization: idea.monetization || [
                "Freemium model",
                "Subscription for premium features",
                "Enterprise licensing options",
              ],
              complexity: idea.complexity || "medium",
              timeEstimate: idea.timeEstimate || "2-3 months",
              aiSuggestions: idea.aiSuggestions || [
                "Consider adding a mobile app version",
                "Implement analytics to track user engagement",
                "Add social sharing features to increase virality",
              ],
            }
          }
          return idea
        }),
      )
      setIsGeneratingAI(false)
    }, 2000)
  }

  const toggleStar = (id: string) => {
    setIdeas(ideas.map((idea) => (idea.id === id ? { ...idea, isStarred: !idea.isStarred } : idea)))
  }

  const updateStatus = (id: string, status: Idea["status"]) => {
    setIdeas(ideas.map((idea) => (idea.id === id ? { ...idea, status } : idea)))
  }

  const deleteIdea = (id: string) => {
    setIdeas(ideas.filter((idea) => idea.id !== id))
    if (isViewingIdea === id) {
      setIsViewingIdea(null)
    }
  }

  const filteredIdeas = ideas.filter((idea) => {
    // Filter by search query
    const matchesSearch =
      idea.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      idea.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      idea.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    // Filter by tab
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "starred" && idea.isStarred) ||
      (activeTab === "backlog" && idea.status === "backlog") ||
      (activeTab === "building" && idea.status === "building") ||
      (activeTab === "done" && idea.status === "done")

    return matchesSearch && matchesTab
  })

  const getStatusColor = (status: Idea["status"]) => {
    switch (status) {
      case "backlog":
        return "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
      case "building":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "done":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
    }
  }

  const getComplexityColor = (complexity: Idea["complexity"]) => {
    switch (complexity) {
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const viewingIdea = ideas.find((idea) => idea.id === isViewingIdea)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Idea Incubator</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Track, develop, and bring your project ideas to life
          </p>
        </div>
        <div className="mt-4 flex space-x-3 sm:mt-0">
          <Button className="bg-teal-500 hover:bg-teal-600" onClick={() => setIsAddingIdea(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add New Idea
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <Input
            placeholder="Search ideas..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Tabs defaultValue="all" onValueChange={setActiveTab} className="w-full sm:w-auto">
          <TabsList className="grid grid-cols-5 w-full">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="starred">Starred</TabsTrigger>
            <TabsTrigger value="backlog">Backlog</TabsTrigger>
            <TabsTrigger value="building">Building</TabsTrigger>
            <TabsTrigger value="done">Done</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {filteredIdeas.length === 0 ? (
        <div className="text-center py-12">
          <Lightbulb className="h-12 w-12 mx-auto text-gray-400" />
          <h3 className="mt-4 text-lg font-medium">No ideas found</h3>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            {searchQuery ? "Try a different search term" : "Add your first idea to get started"}
          </p>
          <Button className="mt-4 bg-teal-500 hover:bg-teal-600" onClick={() => setIsAddingIdea(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add New Idea
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIdeas.map((idea) => (
            <motion.div
              key={idea.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="h-full flex flex-col">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <CardTitle className="line-clamp-2">{idea.title}</CardTitle>
                      <CardDescription>{new Date(idea.createdAt).toLocaleDateString()}</CardDescription>
                    </div>
                    <div className="flex space-x-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className={
                          idea.isStarred ? "text-yellow-500 hover:text-yellow-600" : "text-gray-400 hover:text-gray-500"
                        }
                        onClick={() => toggleStar(idea.id)}
                      >
                        <Star className="h-4 w-4" fill={idea.isStarred ? "currentColor" : "none"} />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => setIsViewingIdea(idea.id)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => updateStatus(idea.id, "backlog")}>
                            <Archive className="mr-2 h-4 w-4" />
                            Move to Backlog
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => updateStatus(idea.id, "building")}>
                            <Code className="mr-2 h-4 w-4" />
                            Start Building
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => updateStatus(idea.id, "done")}>
                            <Check className="mr-2 h-4 w-4" />
                            Mark as Done
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-500" onClick={() => deleteIdea(idea.id)}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  <Badge className={getStatusColor(idea.status)}>
                    {idea.status.charAt(0).toUpperCase() + idea.status.slice(1)}
                  </Badge>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3">{idea.description}</p>

                  {idea.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-3">
                      {idea.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
                <CardFooter className="text-right pt-3">
                  <Button variant="link" onClick={() => setIsViewingIdea(idea.id)}>
                    View Details <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Add New Idea Modal */}
      <Dialog open={isAddingIdea} onOpenChange={setIsAddingIdea}>
        <DialogTrigger asChild>
          <Button className="hidden">Add New Idea</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Idea</DialogTitle>
            <DialogDescription>Let's capture that spark of inspiration!</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                value={newIdea.title}
                onChange={(e) => setNewIdea({ ...newIdea, title: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                value={newIdea.description}
                onChange={(e) => setNewIdea({ ...newIdea, description: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tags" className="text-right">
                Tags
              </Label>
              <Input
                id="tags"
                placeholder="e.g., ai, machine-learning, automation"
                value={newIdea.tags}
                onChange={(e) => setNewIdea({ ...newIdea, tags: e.target.value })}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleAddIdea}>
              Add Idea
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Idea Modal */}
      <Dialog open={!!isViewingIdea} onOpenChange={() => setIsViewingIdea(null)}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>{viewingIdea?.title}</DialogTitle>
            <DialogDescription>Dive deeper into the details of this brilliant idea.</DialogDescription>
          </DialogHeader>

          {viewingIdea ? (
            <Tabs defaultValue="details">
              <TabsList>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="ai">AI Insights</TabsTrigger>
              </TabsList>
              <div className="grid gap-4 py-4">
                <TabsContent value="details">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-bold">Description</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{viewingIdea.description}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold">Tags</h4>
                      <div className="flex flex-wrap gap-1">
                        {viewingIdea.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold">Status</h4>
                      <Badge className={getStatusColor(viewingIdea.status)}>
                        {viewingIdea.status.charAt(0).toUpperCase() + viewingIdea.status.slice(1)}
                      </Badge>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold">Created At</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(viewingIdea.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    {viewingIdea.techStack && (
                      <div>
                        <h4 className="text-sm font-bold">Tech Stack</h4>
                        <div className="flex flex-wrap gap-1">
                          {viewingIdea.techStack.map((tech, index) => (
                            <Badge key={index} variant="outline">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    {viewingIdea.mvpPlan && (
                      <div>
                        <h4 className="text-sm font-bold">MVP Plan</h4>
                        <ul className="list-disc pl-5 text-sm text-gray-500 dark:text-gray-400">
                          {viewingIdea.mvpPlan.map((plan, index) => (
                            <li key={index}>{plan}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {viewingIdea.monetization && (
                      <div>
                        <h4 className="text-sm font-bold">Monetization</h4>
                        <ul className="list-disc pl-5 text-sm text-gray-500 dark:text-gray-400">
                          {viewingIdea.monetization.map((monetization, index) => (
                            <li key={index}>{monetization}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {viewingIdea.complexity && (
                      <div>
                        <h4 className="text-sm font-bold">Complexity</h4>
                        <Badge className={getComplexityColor(viewingIdea.complexity)}>
                          {viewingIdea.complexity.charAt(0).toUpperCase() + viewingIdea.complexity.slice(1)}
                        </Badge>
                      </div>
                    )}
                    {viewingIdea.timeEstimate && (
                      <div>
                        <h4 className="text-sm font-bold">Time Estimate</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{viewingIdea.timeEstimate}</p>
                      </div>
                    )}
                  </div>
                </TabsContent>
                <TabsContent value="ai">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold">AI Suggestions</h4>
                      <Button
                        variant="secondary"
                        size="sm"
                        disabled={isGeneratingAI}
                        onClick={() => handleGenerateAISuggestions(viewingIdea.id)}
                      >
                        {isGeneratingAI ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Generating...
                          </>
                        ) : (
                          <>
                            <Wand2 className="mr-2 h-4 w-4" />
                            Generate AI Suggestions
                          </>
                        )}
                      </Button>
                    </div>
                    {viewingIdea.aiSuggestions ? (
                      <ul className="list-disc pl-5 text-sm text-gray-500 dark:text-gray-400">
                        {viewingIdea.aiSuggestions.map((suggestion, index) => (
                          <li key={index}>{suggestion}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        No AI suggestions yet. Click "Generate AI Suggestions" to get started.
                      </p>
                    )}
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          ) : (
            <p>Loading...</p>
          )}

          <DialogFooter>
            <Button onClick={() => setIsViewingIdea(null)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
