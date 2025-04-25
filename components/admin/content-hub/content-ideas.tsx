"use client"

import { useState } from "react"
import {
  Archive,
  ArrowUpRight,
  Check,
  Edit,
  Lightbulb,
  MoreHorizontal,
  Plus,
  Search,
  Star,
  Trash2,
  Wand2,
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
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

interface ContentIdea {
  id: string
  title: string
  description: string
  tags: string[]
  source?: string
  createdAt: Date
  isStarred: boolean
  status: "idea" | "in-progress" | "draft" | "published"
}

export function ContentIdeas() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [isAddingIdea, setIsAddingIdea] = useState(false)
  const [newIdea, setNewIdea] = useState({ title: "", description: "", tags: "" })

  // Sample content ideas
  const [ideas, setIdeas] = useState<ContentIdea[]>([
    {
      id: "1",
      title: "How I Built a 3D Interactive Portfolio with Three.js",
      description:
        "A deep dive into creating immersive 3D experiences on the web using Three.js and React Three Fiber.",
      tags: ["three.js", "react", "3d", "portfolio"],
      createdAt: new Date(2023, 3, 15),
      isStarred: true,
      status: "idea",
    },
    {
      id: "2",
      title: "Optimizing Next.js Applications for Performance",
      description:
        "Techniques and best practices for improving load times and runtime performance in Next.js applications.",
      tags: ["next.js", "performance", "optimization"],
      source: "https://nextjs.org/docs/advanced-features/measuring-performance",
      createdAt: new Date(2023, 3, 20),
      isStarred: false,
      status: "in-progress",
    },
    {
      id: "3",
      title: "Building a Custom Admin Dashboard for Content Management",
      description:
        "How I designed and implemented a custom admin dashboard for managing my portfolio content across platforms.",
      tags: ["dashboard", "admin", "react", "ui/ux"],
      createdAt: new Date(2023, 4, 5),
      isStarred: true,
      status: "draft",
    },
    {
      id: "4",
      title: "The Power of Server Components in Next.js 14",
      description:
        "Exploring the benefits and use cases of Server Components in Next.js 14 for improved performance and developer experience.",
      tags: ["next.js", "server-components", "react"],
      createdAt: new Date(2023, 4, 10),
      isStarred: false,
      status: "idea",
    },
    {
      id: "5",
      title: "Creating a Design System for Your Portfolio",
      description: "How to build a consistent design system that scales across your portfolio and personal brand.",
      tags: ["design-system", "ui/ux", "tailwind"],
      createdAt: new Date(2023, 4, 12),
      isStarred: false,
      status: "published",
    },
  ])

  const handleAddIdea = () => {
    if (!newIdea.title) return

    const idea: ContentIdea = {
      id: (ideas.length + 1).toString(),
      title: newIdea.title,
      description: newIdea.description,
      tags: newIdea.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag),
      createdAt: new Date(),
      isStarred: false,
      status: "idea",
    }

    setIdeas([idea, ...ideas])
    setNewIdea({ title: "", description: "", tags: "" })
    setIsAddingIdea(false)
  }

  const toggleStar = (id: string) => {
    setIdeas(ideas.map((idea) => (idea.id === id ? { ...idea, isStarred: !idea.isStarred } : idea)))
  }

  const updateStatus = (id: string, status: ContentIdea["status"]) => {
    setIdeas(ideas.map((idea) => (idea.id === id ? { ...idea, status } : idea)))
  }

  const deleteIdea = (id: string) => {
    setIdeas(ideas.filter((idea) => idea.id !== id))
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
      (activeTab === "ideas" && idea.status === "idea") ||
      (activeTab === "drafts" && idea.status === "draft") ||
      (activeTab === "in-progress" && idea.status === "in-progress") ||
      (activeTab === "published" && idea.status === "published")

    return matchesSearch && matchesTab
  })

  const getStatusColor = (status: ContentIdea["status"]) => {
    switch (status) {
      case "idea":
        return "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
      case "in-progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "draft":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "published":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
    }
  }

  return (
    <div className="space-y-6">
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
        <Button className="bg-teal-500 hover:bg-teal-600" onClick={() => setIsAddingIdea(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add New Idea
        </Button>
      </div>

      <Tabs defaultValue="all" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-6 w-full">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="starred">Starred</TabsTrigger>
          <TabsTrigger value="ideas">Ideas</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="drafts">Drafts</TabsTrigger>
          <TabsTrigger value="published">Published</TabsTrigger>
        </TabsList>
      </Tabs>

      {filteredIdeas.length === 0 ? (
        <div className="text-center py-12">
          <Lightbulb className="h-12 w-12 mx-auto text-gray-400" />
          <h3 className="mt-4 text-lg font-medium">No ideas found</h3>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            {searchQuery ? "Try a different search term" : "Add your first content idea to get started"}
          </p>
          <Button className="mt-4 bg-teal-500 hover:bg-teal-600" onClick={() => setIsAddingIdea(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add New Idea
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIdeas.map((idea) => (
            <Card key={idea.id} className="overflow-hidden">
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
                      className={cn(
                        "h-8 w-8",
                        idea.isStarred ? "text-yellow-500 hover:text-yellow-600" : "text-gray-400 hover:text-gray-500",
                      )}
                      onClick={() => toggleStar(idea.id)}
                    >
                      <Star className="h-4 w-4" fill={idea.isStarred ? "currentColor" : "none"} />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => updateStatus(idea.id, "idea")}>
                          <Lightbulb className="mr-2 h-4 w-4" />
                          Mark as Idea
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => updateStatus(idea.id, "in-progress")}>
                          <Edit className="mr-2 h-4 w-4" />
                          Mark as In Progress
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => updateStatus(idea.id, "draft")}>
                          <Archive className="mr-2 h-4 w-4" />
                          Mark as Draft
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => updateStatus(idea.id, "published")}>
                          <Check className="mr-2 h-4 w-4" />
                          Mark as Published
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-500" onClick={() => deleteIdea(idea.id)}>
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                <Badge className={cn("mt-2", getStatusColor(idea.status))}>
                  {idea.status.charAt(0).toUpperCase() + idea.status.slice(1).replace("-", " ")}
                </Badge>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3">{idea.description}</p>

                {idea.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-3">
                    {idea.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}

                {idea.source && (
                  <a
                    href={idea.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center mt-3 text-xs text-teal-500 hover:text-teal-600"
                  >
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    Source
                  </a>
                )}
              </CardContent>
              <CardFooter className="pt-0">
                <Button variant="outline" className="w-full" onClick={() => {}}>
                  <Wand2 className="mr-2 h-4 w-4" />
                  Generate Draft
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={isAddingIdea} onOpenChange={setIsAddingIdea}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Content Idea</DialogTitle>
            <DialogDescription>Capture your content idea. You can always edit it later.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Enter a title for your idea..."
                value={newIdea.title}
                onChange={(e) => setNewIdea({ ...newIdea, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your idea..."
                className="min-h-[100px]"
                value={newIdea.description}
                onChange={(e) => setNewIdea({ ...newIdea, description: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tags">Tags (comma separated)</Label>
              <Input
                id="tags"
                placeholder="react, next.js, portfolio..."
                value={newIdea.tags}
                onChange={(e) => setNewIdea({ ...newIdea, tags: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddingIdea(false)}>
              Cancel
            </Button>
            <Button className="bg-teal-500 hover:bg-teal-600" onClick={handleAddIdea} disabled={!newIdea.title}>
              <Plus className="mr-2 h-4 w-4" />
              Add Idea
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
