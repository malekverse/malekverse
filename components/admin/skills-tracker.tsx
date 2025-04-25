"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { BarChart, Edit, MoreHorizontal, Plus, Search, Star, Trash, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type Skill = {
  id: number
  name: string
  category: string
  proficiency: number
  lastPracticed: string
  description?: string
  resources?: string[]
  goals?: string[]
  isStarred?: boolean
}

type SkillCategory = {
  id: number
  name: string
  description: string
  color: string
}

export function SkillsTracker() {
  const [skills, setSkills] = useState<Skill[]>([
    {
      id: 1,
      name: "React",
      category: "frontend",
      proficiency: 85,
      lastPracticed: "2023-11-28",
      description: "Building user interfaces with React and related ecosystem tools",
      resources: ["React Documentation", "Epic React by Kent C. Dodds", "React Patterns Course"],
      goals: ["Master advanced patterns", "Learn more about React 18 features"],
      isStarred: true,
    },
    {
      id: 2,
      name: "TypeScript",
      category: "languages",
      proficiency: 80,
      lastPracticed: "2023-11-25",
      description: "Static typing for JavaScript to improve code quality and developer experience",
      resources: ["TypeScript Handbook", "TypeScript Deep Dive", "Advanced Types Workshop"],
      goals: ["Improve type inference understanding", "Master utility types"],
      isStarred: true,
    },
    {
      id: 3,
      name: "Node.js",
      category: "backend",
      proficiency: 75,
      lastPracticed: "2023-11-20",
      description: "Server-side JavaScript runtime for building scalable network applications",
      resources: ["Node.js Documentation", "Node.js Design Patterns Book"],
      goals: ["Build more REST APIs", "Learn more about streams"],
      isStarred: false,
    },
    {
      id: 4,
      name: "CSS/Tailwind",
      category: "frontend",
      proficiency: 90,
      lastPracticed: "2023-11-29",
      description: "Styling web applications with modern CSS and utility-first frameworks",
      resources: ["Tailwind Documentation", "CSS Tricks", "Modern CSS Course"],
      goals: ["Master CSS Grid", "Learn more animation techniques"],
      isStarred: true,
    },
    {
      id: 5,
      name: "GraphQL",
      category: "backend",
      proficiency: 60,
      lastPracticed: "2023-11-15",
      description: "Query language for APIs and runtime for executing those queries",
      resources: ["GraphQL Documentation", "Apollo Client Tutorials"],
      goals: ["Build a full-stack GraphQL application", "Learn about performance optimization"],
      isStarred: false,
    },
    {
      id: 6,
      name: "AWS",
      category: "devops",
      proficiency: 50,
      lastPracticed: "2023-11-10",
      description: "Cloud computing services for deploying and scaling applications",
      resources: ["AWS Documentation", "AWS Certified Developer Course"],
      goals: ["Deploy a serverless application", "Learn more about S3 and Lambda"],
      isStarred: false,
    },
    {
      id: 7,
      name: "Next.js",
      category: "frontend",
      proficiency: 80,
      lastPracticed: "2023-11-27",
      description: "React framework for production with server-side rendering and static site generation",
      resources: ["Next.js Documentation", "Next.js Examples"],
      goals: ["Master App Router", "Explore server components"],
      isStarred: true,
    },
    {
      id: 8,
      name: "Docker",
      category: "devops",
      proficiency: 65,
      lastPracticed: "2023-11-18",
      description: "Platform for developing, shipping, and running applications in containers",
      resources: ["Docker Documentation", "Docker for Developers Course"],
      goals: ["Create more efficient Dockerfiles", "Learn Docker Compose"],
      isStarred: false,
    },
  ])

  const [categories, setCategories] = useState<SkillCategory[]>([
    { id: 1, name: "frontend", description: "Frontend development skills", color: "blue" },
    { id: 2, name: "backend", description: "Backend development skills", color: "green" },
    { id: 3, name: "languages", description: "Programming languages", color: "purple" },
    { id: 4, name: "devops", description: "DevOps and infrastructure skills", color: "amber" },
    { id: 5, name: "design", description: "Design and UI/UX skills", color: "pink" },
    { id: 6, name: "soft", description: "Soft skills and communication", color: "indigo" },
  ])

  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddingSkill, setIsAddingSkill] = useState(false)
  const [isUpdatingSkill, setIsUpdatingSkill] = useState<number | null>(null)
  const [newSkill, setNewSkill] = useState<Omit<Skill, "id">>({
    name: "",
    category: "",
    proficiency: 50,
    lastPracticed: new Date().toISOString().split("T")[0],
    description: "",
    resources: [],
    goals: [],
    isStarred: false,
  })
  const [newResource, setNewResource] = useState("")
  const [newGoal, setNewGoal] = useState("")

  const filteredSkills = skills.filter((skill) => {
    // Filter by tab
    if (activeTab !== "all" && activeTab !== "starred" && skill.category !== activeTab) return false
    if (activeTab === "starred" && !skill.isStarred) return false

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        skill.name.toLowerCase().includes(query) ||
        skill.description?.toLowerCase().includes(query) ||
        skill.category.toLowerCase().includes(query)
      )
    }

    return true
  })

  const handleAddSkill = () => {
    if (!newSkill.name || !newSkill.category) return

    const skillToAdd = {
      ...newSkill,
      id: skills.length + 1,
    }

    setSkills([...skills, skillToAdd])
    setNewSkill({
      name: "",
      category: "",
      proficiency: 50,
      lastPracticed: new Date().toISOString().split("T")[0],
      description: "",
      resources: [],
      goals: [],
      isStarred: false,
    })
    setIsAddingSkill(false)
  }

  const handleUpdateSkill = () => {
    if (!isUpdatingSkill) return

    setSkills(skills.map((skill) => (skill.id === isUpdatingSkill ? { ...newSkill, id: skill.id } : skill)))

    setNewSkill({
      name: "",
      category: "",
      proficiency: 50,
      lastPracticed: new Date().toISOString().split("T")[0],
      description: "",
      resources: [],
      goals: [],
      isStarred: false,
    })
    setIsUpdatingSkill(null)
  }

  const handleEditSkill = (id: number) => {
    const skillToEdit = skills.find((skill) => skill.id === id)
    if (!skillToEdit) return

    setNewSkill({
      name: skillToEdit.name,
      category: skillToEdit.category,
      proficiency: skillToEdit.proficiency,
      lastPracticed: skillToEdit.lastPracticed,
      description: skillToEdit.description || "",
      resources: skillToEdit.resources || [],
      goals: skillToEdit.goals || [],
      isStarred: skillToEdit.isStarred || false,
    })

    setIsUpdatingSkill(id)
  }

  const handleDeleteSkill = (id: number) => {
    setSkills(skills.filter((skill) => skill.id !== id))
  }

  const handleToggleStarred = (id: number) => {
    setSkills(skills.map((skill) => (skill.id === id ? { ...skill, isStarred: !skill.isStarred } : skill)))
  }

  const handleAddResource = () => {
    if (!newResource.trim()) return

    setNewSkill({
      ...newSkill,
      resources: [...(newSkill.resources || []), newResource.trim()],
    })

    setNewResource("")
  }

  const handleRemoveResource = (index: number) => {
    setNewSkill({
      ...newSkill,
      resources: newSkill.resources?.filter((_, i) => i !== index),
    })
  }

  const handleAddGoal = () => {
    if (!newGoal.trim()) return

    setNewSkill({
      ...newSkill,
      goals: [...(newSkill.goals || []), newGoal.trim()],
    })

    setNewGoal("")
  }

  const handleRemoveGoal = (index: number) => {
    setNewSkill({
      ...newSkill,
      goals: newSkill.goals?.filter((_, i) => i !== index),
    })
  }

  const getCategoryColor = (categoryName: string) => {
    const category = categories.find((c) => c.name === categoryName)
    return category?.color || "gray"
  }

  const getProficiencyLevel = (proficiency: number) => {
    if (proficiency >= 90) return "Expert"
    if (proficiency >= 70) return "Advanced"
    if (proficiency >= 40) return "Intermediate"
    return "Beginner"
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Skills Tracker</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Track and manage your technical and professional skills
          </p>
        </div>
        <div className="mt-4 flex space-x-3 sm:mt-0">
          <Dialog open={isAddingSkill} onOpenChange={setIsAddingSkill}>
            <DialogTrigger asChild>
              <Button className="bg-teal-500 hover:bg-teal-600">
                <Plus className="mr-2 h-4 w-4" />
                Add Skill
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Skill</DialogTitle>
                <DialogDescription>Track a new skill in your professional development journey</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="skill-name">Skill Name</Label>
                    <Input
                      id="skill-name"
                      placeholder="e.g. React, Python, UX Design"
                      value={newSkill.name}
                      onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="skill-category">Category</Label>
                    <Select
                      value={newSkill.category}
                      onValueChange={(value) => setNewSkill({ ...newSkill, category: value })}
                    >
                      <SelectTrigger id="skill-category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.name}>
                            {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="skill-proficiency">Proficiency ({newSkill.proficiency}%)</Label>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {getProficiencyLevel(newSkill.proficiency)}
                    </span>
                  </div>
                  <Slider
                    id="skill-proficiency"
                    min={0}
                    max={100}
                    step={5}
                    value={[newSkill.proficiency]}
                    onValueChange={(value) => setNewSkill({ ...newSkill, proficiency: value[0] })}
                    className="py-4"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="skill-last-practiced">Last Practiced</Label>
                  <Input
                    id="skill-last-practiced"
                    type="date"
                    value={newSkill.lastPracticed}
                    onChange={(e) => setNewSkill({ ...newSkill, lastPracticed: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="skill-description">Description</Label>
                  <Textarea
                    id="skill-description"
                    placeholder="Describe this skill and your experience with it"
                    value={newSkill.description}
                    onChange={(e) => setNewSkill({ ...newSkill, description: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Resources</Label>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Add a learning resource"
                      value={newResource}
                      onChange={(e) => setNewResource(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          handleAddResource()
                        }
                      }}
                    />
                    <Button type="button" variant="outline" onClick={handleAddResource}>
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {newSkill.resources?.map((resource, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {resource}
                        <button
                          type="button"
                          className="ml-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 p-0.5"
                          onClick={() => handleRemoveResource(index)}
                        >
                          <Trash className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Learning Goals</Label>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Add a goal for this skill"
                      value={newGoal}
                      onChange={(e) => setNewGoal(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          handleAddGoal()
                        }
                      }}
                    />
                    <Button type="button" variant="outline" onClick={handleAddGoal}>
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {newSkill.goals?.map((goal, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {goal}
                        <button
                          type="button"
                          className="ml-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 p-0.5"
                          onClick={() => handleRemoveGoal(index)}
                        >
                          <Trash className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddingSkill(false)}>
                  Cancel
                </Button>
                <Button className="bg-teal-500 hover:bg-teal-600" onClick={handleAddSkill}>
                  Add Skill
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={isUpdatingSkill !== null} onOpenChange={(open) => !open && setIsUpdatingSkill(null)}>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Update Skill</DialogTitle>
                <DialogDescription>Update your skill information and progress</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="update-skill-name">Skill Name</Label>
                    <Input
                      id="update-skill-name"
                      value={newSkill.name}
                      onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="update-skill-category">Category</Label>
                    <Select
                      value={newSkill.category}
                      onValueChange={(value) => setNewSkill({ ...newSkill, category: value })}
                    >
                      <SelectTrigger id="update-skill-category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.name}>
                            {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="update-skill-proficiency">Proficiency ({newSkill.proficiency}%)</Label>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {getProficiencyLevel(newSkill.proficiency)}
                    </span>
                  </div>
                  <Slider
                    id="update-skill-proficiency"
                    min={0}
                    max={100}
                    step={5}
                    value={[newSkill.proficiency]}
                    onValueChange={(value) => setNewSkill({ ...newSkill, proficiency: value[0] })}
                    className="py-4"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="update-skill-last-practiced">Last Practiced</Label>
                  <Input
                    id="update-skill-last-practiced"
                    type="date"
                    value={newSkill.lastPracticed}
                    onChange={(e) => setNewSkill({ ...newSkill, lastPracticed: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="update-skill-description">Description</Label>
                  <Textarea
                    id="update-skill-description"
                    value={newSkill.description}
                    onChange={(e) => setNewSkill({ ...newSkill, description: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Resources</Label>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Add a learning resource"
                      value={newResource}
                      onChange={(e) => setNewResource(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          handleAddResource()
                        }
                      }}
                    />
                    <Button type="button" variant="outline" onClick={handleAddResource}>
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {newSkill.resources?.map((resource, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {resource}
                        <button
                          type="button"
                          className="ml-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 p-0.5"
                          onClick={() => handleRemoveResource(index)}
                        >
                          <Trash className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Learning Goals</Label>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Add a goal for this skill"
                      value={newGoal}
                      onChange={(e) => setNewGoal(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          handleAddGoal()
                        }
                      }}
                    />
                    <Button type="button" variant="outline" onClick={handleAddGoal}>
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {newSkill.goals?.map((goal, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {goal}
                        <button
                          type="button"
                          className="ml-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 p-0.5"
                          onClick={() => handleRemoveGoal(index)}
                        >
                          <Trash className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsUpdatingSkill(null)}>
                  Cancel
                </Button>
                <Button className="bg-teal-500 hover:bg-teal-600" onClick={handleUpdateSkill}>
                  Update Skill
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <Tabs defaultValue="all" className="w-full md:w-auto" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 w-full md:w-auto">
            <TabsTrigger value="all">All Skills</TabsTrigger>
            <TabsTrigger value="starred">Starred</TabsTrigger>
            <TabsTrigger value="frontend">Frontend</TabsTrigger>
            <TabsTrigger value="backend">Backend</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="relative w-full md:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <Input
            type="search"
            placeholder="Search skills..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSkills.map((skill) => (
          <motion.div
            key={skill.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="h-full flex flex-col">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <Badge
                        className={`
                          ${getCategoryColor(skill.category) === "blue" ? "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300" : ""}
                          ${getCategoryColor(skill.category) === "green" ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300" : ""}
                          ${getCategoryColor(skill.category) === "purple" ? "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300" : ""}
                          ${getCategoryColor(skill.category) === "amber" ? "bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-300" : ""}
                          ${getCategoryColor(skill.category) === "pink" ? "bg-pink-100 text-pink-800 dark:bg-pink-900/20 dark:text-pink-300" : ""}
                          ${getCategoryColor(skill.category) === "indigo" ? "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-300" : ""}
                        `}
                      >
                        {skill.category.charAt(0).toUpperCase() + skill.category.slice(1)}
                      </Badge>
                      <button
                        onClick={() => handleToggleStarred(skill.id)}
                        className={`${skill.isStarred ? "text-yellow-500" : "text-gray-400 hover:text-yellow-500"}`}
                      >
                        <Star className="h-4 w-4" fill={skill.isStarred ? "currentColor" : "none"} />
                      </button>
                    </div>
                    <CardTitle className="mt-2">{skill.name}</CardTitle>
                    <CardDescription>Last practiced: {formatDate(skill.lastPracticed)}</CardDescription>
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
                      <DropdownMenuItem onClick={() => handleEditSkill(skill.id)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Skill
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleToggleStarred(skill.id)}>
                        <Star className="h-4 w-4 mr-2" fill={skill.isStarred ? "currentColor" : "none"} />
                        {skill.isStarred ? "Unstar" : "Star"}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-500" onClick={() => handleDeleteSkill(skill.id)}>
                        <Trash className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="py-2 flex-grow">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Proficiency</p>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Badge variant="outline">{getProficiencyLevel(skill.proficiency)}</Badge>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Proficiency level based on self-assessment</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <Progress
                      value={skill.proficiency}
                      className="h-2 mt-1"
                      indicatorClassName={`
                        ${skill.proficiency >= 90 ? "bg-green-500" : ""}
                        ${skill.proficiency >= 70 && skill.proficiency < 90 ? "bg-blue-500" : ""}
                        ${skill.proficiency >= 40 && skill.proficiency < 70 ? "bg-amber-500" : ""}
                        ${skill.proficiency < 40 ? "bg-red-500" : ""}
                      `}
                    />
                  </div>
                  {skill.description && (
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Description</p>
                      <p className="text-sm">{skill.description}</p>
                    </div>
                  )}
                  {skill.goals && skill.goals.length > 0 && (
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Learning Goals</p>
                      <ul className="text-sm list-disc list-inside">
                        {skill.goals.map((goal, index) => (
                          <li key={index}>{goal}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="pt-2">
                {skill.resources && skill.resources.length > 0 && (
                  <div className="w-full">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Resources</p>
                    <div className="flex flex-wrap gap-2">
                      {skill.resources.map((resource, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {resource}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart className="h-5 w-5 text-teal-500 mr-2" />
            Skills Overview
          </CardTitle>
          <CardDescription>Visualize your skills distribution and identify areas for growth</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium mb-2">Skills by Category</h3>
              <div className="space-y-2">
                {categories.map((category) => {
                  const categorySkills = skills.filter((skill) => skill.category === category.name)
                  const percentage =
                    categorySkills.length > 0 ? Math.round((categorySkills.length / skills.length) * 100) : 0

                  return (
                    <div key={category.id} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{category.name.charAt(0).toUpperCase() + category.name.slice(1)}</span>
                        <span>
                          {categorySkills.length} skills ({percentage}%)
                        </span>
                      </div>
                      <Progress
                        value={percentage}
                        className="h-2"
                        indicatorClassName={`
                          ${category.color === "blue" ? "bg-blue-500" : ""}
                          ${category.color === "green" ? "bg-green-500" : ""}
                          ${category.color === "purple" ? "bg-purple-500" : ""}
                          ${category.color === "amber" ? "bg-amber-500" : ""}
                          ${category.color === "pink" ? "bg-pink-500" : ""}
                          ${category.color === "indigo" ? "bg-indigo-500" : ""}
                        `}
                      />
                    </div>
                  )
                })}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Proficiency Distribution</h3>
              <div className="space-y-2">
                {["Expert", "Advanced", "Intermediate", "Beginner"].map((level) => {
                  let skillsInLevel

                  if (level === "Expert") {
                    skillsInLevel = skills.filter((skill) => skill.proficiency >= 90)
                  } else if (level === "Advanced") {
                    skillsInLevel = skills.filter((skill) => skill.proficiency >= 70 && skill.proficiency < 90)
                  } else if (level === "Intermediate") {
                    skillsInLevel = skills.filter((skill) => skill.proficiency >= 40 && skill.proficiency < 70)
                  } else {
                    skillsInLevel = skills.filter((skill) => skill.proficiency < 40)
                  }

                  const percentage =
                    skillsInLevel.length > 0 ? Math.round((skillsInLevel.length / skills.length) * 100) : 0

                  return (
                    <div key={level} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{level}</span>
                        <span>
                          {skillsInLevel.length} skills ({percentage}%)
                        </span>
                      </div>
                      <Progress
                        value={percentage}
                        className="h-2"
                        indicatorClassName={`
                          ${level === "Expert" ? "bg-green-500" : ""}
                          ${level === "Advanced" ? "bg-blue-500" : ""}
                          ${level === "Intermediate" ? "bg-amber-500" : ""}
                          ${level === "Beginner" ? "bg-red-500" : ""}
                        `}
                      />
                    </div>
                  )
                })}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Recently Practiced Skills</h3>
              <div className="space-y-2">
                {skills
                  .sort((a, b) => new Date(b.lastPracticed).getTime() - new Date(a.lastPracticed).getTime())
                  .slice(0, 5)
                  .map((skill) => (
                    <div
                      key={skill.id}
                      className="flex justify-between items-center p-2 rounded-md border border-gray-200 dark:border-gray-800"
                    >
                      <div className="flex items-center">
                        <div
                          className={`h-8 w-8 rounded-full flex items-center justify-center mr-3 
                          ${getCategoryColor(skill.category) === "blue" ? "bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400" : ""}
                          ${getCategoryColor(skill.category) === "green" ? "bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400" : ""}
                          ${getCategoryColor(skill.category) === "purple" ? "bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400" : ""}
                          ${getCategoryColor(skill.category) === "amber" ? "bg-amber-100 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400" : ""}
                          ${getCategoryColor(skill.category) === "pink" ? "bg-pink-100 text-pink-600 dark:bg-pink-900/20 dark:text-pink-400" : "  === 'pink" ? "bg-pink-100 text-pink-600 dark:bg-pink-900/20 dark:text-pink-400" : ""}
                          ${getCategoryColor(skill.category) === "indigo" ? "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400" : ""}
                        `}
                        >
                          <TrendingUp className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{skill.name}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Practiced {formatDate(skill.lastPracticed)}
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline">{getProficiencyLevel(skill.proficiency)}</Badge>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
