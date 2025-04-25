"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check, Edit, Eye, Github, Globe, ImageIcon, MoreHorizontal, Plus, Trash, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"

export function PortfolioManager() {
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "E-commerce Dashboard",
      description: "A comprehensive dashboard for managing online stores with analytics and inventory management.",
      image: "/placeholder.svg?height=300&width=600",
      tags: ["React", "TypeScript", "Tailwind CSS", "Next.js"],
      status: "Draft",
      githubUrl: "https://github.com/username/ecommerce-dashboard",
      demoUrl: "",
      featured: false,
      createdAt: "2023-10-15",
    },
    {
      id: 2,
      title: "Portfolio Website",
      description: "Personal portfolio website showcasing projects and skills with a modern design.",
      image: "/placeholder.svg?height=300&width=600",
      tags: ["React", "Next.js", "Framer Motion", "Tailwind CSS"],
      status: "Live",
      githubUrl: "https://github.com/username/portfolio",
      demoUrl: "https://portfolio-demo.com",
      featured: true,
      createdAt: "2023-09-20",
    },
    {
      id: 3,
      title: "Mobile App UI",
      description: "UI design for a fitness tracking mobile application with dark mode support.",
      image: "/placeholder.svg?height=300&width=600",
      tags: ["Figma", "UI/UX", "Mobile Design"],
      status: "Live",
      githubUrl: "",
      demoUrl: "https://figma.com/file/mobile-app-ui",
      featured: true,
      createdAt: "2023-11-05",
    },
  ])

  const [activeTab, setActiveTab] = useState("all")
  const [isAddingProject, setIsAddingProject] = useState(false)
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    image: "",
    tags: [],
    status: "Draft",
    githubUrl: "",
    demoUrl: "",
    featured: false,
  })
  const [newTag, setNewTag] = useState("")

  const filteredProjects =
    activeTab === "all"
      ? projects
      : projects.filter((project) =>
          activeTab === "live"
            ? project.status === "Live"
            : activeTab === "draft"
              ? project.status === "Draft"
              : activeTab === "featured"
                ? project.featured
                : true,
        )

  const handleAddTag = () => {
    if (newTag.trim() && !newProject.tags.includes(newTag.trim())) {
      setNewProject({
        ...newProject,
        tags: [...newProject.tags, newTag.trim()],
      })
      setNewTag("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setNewProject({
      ...newProject,
      tags: newProject.tags.filter((tag) => tag !== tagToRemove),
    })
  }

  const handleSaveProject = () => {
    // In a real app, you would save to a database
    const projectToAdd = {
      ...newProject,
      id: projects.length + 1,
      createdAt: new Date().toISOString().split("T")[0],
    }

    setProjects([...projects, projectToAdd])
    setIsAddingProject(false)
    setNewProject({
      title: "",
      description: "",
      image: "",
      tags: [],
      status: "Draft",
      githubUrl: "",
      demoUrl: "",
      featured: false,
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Portfolio Manager</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Manage your portfolio projects and showcase your work.
          </p>
        </div>
        <div className="mt-4 flex space-x-3 sm:mt-0">
          <Button className="bg-teal-500 hover:bg-teal-600" onClick={() => setIsAddingProject(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Project
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="all" onClick={() => setActiveTab("all")}>
              All Projects
            </TabsTrigger>
            <TabsTrigger value="live" onClick={() => setActiveTab("live")}>
              Live
            </TabsTrigger>
            <TabsTrigger value="draft" onClick={() => setActiveTab("draft")}>
              Drafts
            </TabsTrigger>
            <TabsTrigger value="featured" onClick={() => setActiveTab("featured")}>
              Featured
            </TabsTrigger>
          </TabsList>

          <div className="flex items-center space-x-2">
            <Label htmlFor="sort" className="text-sm">
              Sort by:
            </Label>
            <Select defaultValue="newest">
              <SelectTrigger id="sort" className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="a-z">A-Z</SelectItem>
                <SelectItem value="z-a">Z-A</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <TabsContent value="all" className="space-y-4">
          {isAddingProject ? (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <Card>
                <CardHeader>
                  <CardTitle>Add New Project</CardTitle>
                  <CardDescription>Create a new portfolio project to showcase your work.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Project Title</Label>
                        <Input
                          id="title"
                          placeholder="Enter project title"
                          value={newProject.title}
                          onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          placeholder="Describe your project"
                          rows={4}
                          value={newProject.description}
                          onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="tags">Tags</Label>
                        <div className="flex space-x-2">
                          <Input
                            id="tags"
                            placeholder="Add a tag"
                            value={newTag}
                            onChange={(e) => setNewTag(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault()
                                handleAddTag()
                              }
                            }}
                          />
                          <Button type="button" variant="outline" onClick={handleAddTag}>
                            Add
                          </Button>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {newProject.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="flex items-center gap-1">
                              {tag}
                              <button
                                type="button"
                                className="ml-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 p-0.5"
                                onClick={() => handleRemoveTag(tag)}
                              >
                                <Trash className="h-3 w-3" />
                              </button>
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="github">GitHub URL</Label>
                          <Input
                            id="github"
                            placeholder="https://github.com/..."
                            value={newProject.githubUrl}
                            onChange={(e) => setNewProject({ ...newProject, githubUrl: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="demo">Demo URL</Label>
                          <Input
                            id="demo"
                            placeholder="https://..."
                            value={newProject.demoUrl}
                            onChange={(e) => setNewProject({ ...newProject, demoUrl: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="status">Status</Label>
                        <Select
                          defaultValue="Draft"
                          onValueChange={(value) => setNewProject({ ...newProject, status: value })}
                        >
                          <SelectTrigger id="status">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Draft">Draft</SelectItem>
                            <SelectItem value="Live">Live</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch
                          id="featured"
                          checked={newProject.featured}
                          onCheckedChange={(checked) => setNewProject({ ...newProject, featured: checked })}
                        />
                        <Label htmlFor="featured">Featured Project</Label>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Project Image</Label>
                        <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-md p-6 flex flex-col items-center justify-center">
                          <div className="flex flex-col items-center justify-center text-center">
                            <ImageIcon className="h-10 w-10 text-gray-400 mb-2" />
                            <p className="text-sm font-medium mb-1">Drag and drop an image</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                              SVG, PNG, JPG or GIF (max. 2MB)
                            </p>
                            <Button variant="outline" size="sm">
                              <Upload className="h-4 w-4 mr-2" />
                              Upload Image
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Preview</Label>
                        <Card className="overflow-hidden">
                          <div className="aspect-video bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                            <ImageIcon className="h-10 w-10 text-gray-400" />
                          </div>
                          <CardContent className="p-4">
                            <h3 className="font-medium truncate">{newProject.title || "Project Title"}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mt-1">
                              {newProject.description || "Project description will appear here..."}
                            </p>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {newProject.tags.length > 0 ? (
                                newProject.tags.map((tag, index) => (
                                  <Badge key={index} variant="secondary" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))
                              ) : (
                                <Badge variant="secondary" className="text-xs">
                                  Tags
                                </Badge>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => setIsAddingProject(false)}>
                    Cancel
                  </Button>
                  <Button className="bg-teal-500 hover:bg-teal-600" onClick={handleSaveProject}>
                    Save Project
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden h-full flex flex-col">
                    <div className="relative aspect-video bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                      {project.image ? (
                        <img
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <ImageIcon className="h-10 w-10 text-gray-400" />
                      )}
                      <div className="absolute top-2 right-2 flex space-x-1">
                        <Badge
                          variant={project.status === "Live" ? "default" : "secondary"}
                          className="bg-white dark:bg-gray-900 text-xs"
                        >
                          {project.status}
                        </Badge>
                        {project.featured && <Badge className="bg-yellow-500 text-white text-xs">Featured</Badge>}
                      </div>
                    </div>
                    <CardContent className="p-4 flex-grow">
                      <h3 className="font-medium truncate">{project.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mt-1">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {project.tags.map((tag, tagIndex) => (
                          <Badge key={tagIndex} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 flex justify-between items-center">
                      <div className="flex space-x-2">
                        {project.githubUrl && (
                          <Button variant="outline" size="icon" asChild>
                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                              <Github className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                        {project.demoUrl && (
                          <Button variant="outline" size="icon" asChild>
                            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                              <Globe className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                        <Button variant="outline" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            Preview
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            {project.featured ? (
                              <>
                                <Check className="h-4 w-4 mr-2" />
                                Remove from Featured
                              </>
                            ) : (
                              <>
                                <Check className="h-4 w-4 mr-2" />
                                Mark as Featured
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-500">
                            <Trash className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </TabsContent>

        {/* The other tab contents would be similar but with filtered projects */}
        <TabsContent value="live" className="space-y-4">
          {/* Similar content as "all" but filtered for live projects */}
        </TabsContent>

        <TabsContent value="draft" className="space-y-4">
          {/* Similar content as "all" but filtered for draft projects */}
        </TabsContent>

        <TabsContent value="featured" className="space-y-4">
          {/* Similar content as "all" but filtered for featured projects */}
        </TabsContent>
      </Tabs>
    </div>
  )
}
