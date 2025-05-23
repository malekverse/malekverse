"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { ExternalLink, Search, Grid, List, Star, TrendingUp, Clock, Users } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CosmicBackground } from "@/components/cosmic-background"
import { CustomCursor } from "@/components/ui/custom-cursor"
import { useMobile } from "@/hooks/use-mobile"
import { PageWrapper } from "@/components/page-wrapper"

interface Tool {
  name: string
  description: string
  logo: string
  link?: string
  category: string
  experience: "beginner" | "intermediate" | "advanced" | "expert"
  yearStarted: number
  rating: number
  usageFrequency: "daily" | "weekly" | "monthly" | "occasionally"
  tags: string[]
  features: string[]
  alternatives?: string[]
  pros: string[]
  cons?: string[]
}

export default function StackPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("name")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const isMobile = useMobile()

  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  const tools: Tool[] = [
    // AI Tools
    {
      name: "Le Chat",
      description:
        "Advanced AI assistant for general assistance, content ideation, and complex problem-solving across various domains.",
      logo: "/placeholder.svg?height=60&width=60",
      link: "https://chat.mistral.ai/",
      category: "ai",
      experience: "advanced",
      yearStarted: 2023,
      rating: 4.8,
      usageFrequency: "daily",
      tags: ["AI", "Assistant", "Content", "Problem Solving"],
      features: ["Natural Language Processing", "Code Generation", "Creative Writing", "Analysis"],
      pros: ["Excellent reasoning", "Fast responses", "Multilingual support", "Code understanding"],
      cons: ["Limited image generation", "No real-time data"],
    },
    {
      name: "Cursor",
      description:
        "AI-powered code editor that revolutionizes development with intelligent code completion, refactoring, and pair programming.",
      logo: "/placeholder.svg?height=60&width=60",
      link: "https://cursor.sh/",
      category: "ai",
      experience: "expert",
      yearStarted: 2023,
      rating: 4.9,
      usageFrequency: "daily",
      tags: ["AI", "Code Editor", "Development", "Productivity"],
      features: ["AI Code Completion", "Chat with Codebase", "Auto-refactoring", "Bug Detection"],
      pros: ["Incredible AI integration", "Speeds up development", "Great UX", "VS Code compatibility"],
      cons: ["Subscription required", "Can be resource intensive"],
    },
    {
      name: "Midjourney",
      description:
        "Leading AI art generation platform for creating stunning visuals, illustrations, and creative assets for projects.",
      logo: "/placeholder.svg?height=60&width=60",
      link: "https://midjourney.com/",
      category: "ai",
      experience: "advanced",
      yearStarted: 2022,
      rating: 4.7,
      usageFrequency: "weekly",
      tags: ["AI", "Art Generation", "Design", "Creative"],
      features: ["High-quality Images", "Style Control", "Variations", "Upscaling"],
      pros: ["Exceptional quality", "Creative control", "Active community", "Regular updates"],
      cons: ["Discord-based interface", "Limited free usage"],
    },

    // Development Tools
    {
      name: "TypeScript",
      description:
        "Strongly typed programming language that builds on JavaScript, providing better tooling and error detection.",
      logo: "/placeholder.svg?height=60&width=60",
      link: "https://www.typescriptlang.org/",
      category: "development",
      experience: "expert",
      yearStarted: 2020,
      rating: 4.9,
      usageFrequency: "daily",
      tags: ["Programming Language", "Type Safety", "JavaScript", "Development"],
      features: ["Static Typing", "IntelliSense", "Refactoring", "Modern JavaScript"],
      pros: ["Type safety", "Better IDE support", "Catches errors early", "Great ecosystem"],
      cons: ["Learning curve", "Compilation step", "Can be verbose"],
    },
    {
      name: "Next.js",
      description:
        "The React framework for production-grade applications with built-in optimization, routing, and deployment features.",
      logo: "/placeholder.svg?height=60&width=60",
      link: "https://nextjs.org/",
      category: "development",
      experience: "expert",
      yearStarted: 2021,
      rating: 4.8,
      usageFrequency: "daily",
      tags: ["React Framework", "Full Stack", "SSR", "Performance"],
      features: ["App Router", "Server Components", "API Routes", "Image Optimization"],
      pros: ["Great performance", "Developer experience", "Built-in optimizations", "Vercel integration"],
      cons: ["Can be complex", "Rapid changes", "Bundle size"],
    },
    {
      name: "React",
      description:
        "A JavaScript library for building user interfaces with component-based architecture and virtual DOM.",
      logo: "/placeholder.svg?height=60&width=60",
      link: "https://reactjs.org/",
      category: "development",
      experience: "expert",
      yearStarted: 2020,
      rating: 4.8,
      usageFrequency: "daily",
      tags: ["JavaScript Library", "UI", "Components", "Frontend"],
      features: ["Virtual DOM", "Component Lifecycle", "Hooks", "JSX"],
      pros: ["Large ecosystem", "Reusable components", "Strong community", "Flexible"],
      cons: ["Learning curve", "Rapid ecosystem changes", "Boilerplate"],
    },
    {
      name: "Node.js",
      description: "JavaScript runtime built on Chrome's V8 engine for building scalable server-side applications.",
      logo: "/placeholder.svg?height=60&width=60",
      link: "https://nodejs.org/",
      category: "development",
      experience: "advanced",
      yearStarted: 2020,
      rating: 4.7,
      usageFrequency: "daily",
      tags: ["Runtime", "Backend", "JavaScript", "Server"],
      features: ["Event-driven", "Non-blocking I/O", "NPM Ecosystem", "Cross-platform"],
      pros: ["JavaScript everywhere", "Great performance", "Huge ecosystem", "Active development"],
      cons: ["Single-threaded", "Callback complexity", "Rapid changes"],
    },
    {
      name: "Tailwind CSS",
      description:
        "Utility-first CSS framework for rapidly building custom user interfaces with consistent design systems.",
      logo: "/placeholder.svg?height=60&width=60",
      link: "https://tailwindcss.com/",
      category: "development",
      experience: "expert",
      yearStarted: 2021,
      rating: 4.9,
      usageFrequency: "daily",
      tags: ["CSS Framework", "Utility-first", "Design System", "Responsive"],
      features: ["Utility Classes", "Responsive Design", "Dark Mode", "JIT Compiler"],
      pros: ["Rapid development", "Consistent design", "Small bundle size", "Great DX"],
      cons: ["Learning curve", "HTML can look cluttered", "Purging complexity"],
    },
    {
      name: "Prisma",
      description: "Next-generation ORM for Node.js and TypeScript with type-safe database access and migrations.",
      logo: "/placeholder.svg?height=60&width=60",
      link: "https://www.prisma.io/",
      category: "development",
      experience: "advanced",
      yearStarted: 2022,
      rating: 4.6,
      usageFrequency: "weekly",
      tags: ["ORM", "Database", "TypeScript", "Migrations"],
      features: ["Type Safety", "Auto-generated Client", "Database Migrations", "Query Builder"],
      pros: ["Type safety", "Great DX", "Auto-completion", "Database agnostic"],
      cons: ["Learning curve", "Performance overhead", "Limited advanced queries"],
    },

    // Design Tools
    {
      name: "Figma",
      description:
        "Collaborative interface design tool for creating, prototyping, and sharing UI/UX designs in real-time.",
      logo: "/placeholder.svg?height=60&width=60",
      link: "https://www.figma.com/",
      category: "design",
      experience: "advanced",
      yearStarted: 2021,
      rating: 4.8,
      usageFrequency: "weekly",
      tags: ["Design", "UI/UX", "Prototyping", "Collaboration"],
      features: ["Real-time Collaboration", "Prototyping", "Design Systems", "Developer Handoff"],
      pros: ["Excellent collaboration", "Web-based", "Great prototyping", "Strong community"],
      cons: ["Can be slow with large files", "Limited offline access", "Subscription for teams"],
    },
    {
      name: "Framer",
      description: "Interactive design and prototyping tool for creating high-fidelity prototypes and animations.",
      logo: "/placeholder.svg?height=60&width=60",
      link: "https://www.framer.com/",
      category: "design",
      experience: "intermediate",
      yearStarted: 2022,
      rating: 4.5,
      usageFrequency: "monthly",
      tags: ["Design", "Prototyping", "Animation", "Interactive"],
      features: ["Advanced Animations", "Code Components", "Interactive Prototypes", "Design to Code"],
      pros: ["Powerful animations", "Code integration", "Great for complex prototypes", "Modern interface"],
      cons: ["Steep learning curve", "Expensive", "Performance issues with complex projects"],
    },

    // Productivity Tools
    {
      name: "VS Code",
      description:
        "Powerful, lightweight code editor with extensive plugin ecosystem and excellent developer experience.",
      logo: "/placeholder.svg?height=60&width=60",
      link: "https://code.visualstudio.com/",
      category: "productivity",
      experience: "expert",
      yearStarted: 2019,
      rating: 4.9,
      usageFrequency: "daily",
      tags: ["Code Editor", "IDE", "Extensions", "Development"],
      features: ["IntelliSense", "Debugging", "Git Integration", "Extensions"],
      pros: ["Free", "Highly customizable", "Great performance", "Huge extension library"],
      cons: ["Can become resource heavy", "Extension conflicts", "Microsoft ecosystem"],
    },
    {
      name: "Notion",
      description:
        "All-in-one workspace for notes, tasks, databases, and project management with powerful organization features.",
      logo: "/placeholder.svg?height=60&width=60",
      link: "https://www.notion.so/",
      category: "productivity",
      experience: "advanced",
      yearStarted: 2021,
      rating: 4.7,
      usageFrequency: "daily",
      tags: ["Productivity", "Notes", "Project Management", "Database"],
      features: ["Blocks System", "Databases", "Templates", "Collaboration"],
      pros: ["Highly flexible", "Great for organization", "Beautiful interface", "Strong community"],
      cons: ["Can be slow", "Learning curve", "Limited offline access"],
    },
  ]

  const categories = [
    { id: "all", name: "All Tools", count: tools.length },
    { id: "ai", name: "AI", count: tools.filter((t) => t.category === "ai").length },
    { id: "development", name: "Development", count: tools.filter((t) => t.category === "development").length },
    { id: "design", name: "Design", count: tools.filter((t) => t.category === "design").length },
    { id: "productivity", name: "Productivity", count: tools.filter((t) => t.category === "productivity").length },
  ]

  const filteredTools = tools
    .filter(
      (tool) =>
        (selectedCategory === "all" || tool.category === selectedCategory) &&
        (tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tool.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))),
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name)
        case "rating":
          return b.rating - a.rating
        case "experience":
          const expOrder = { beginner: 1, intermediate: 2, advanced: 3, expert: 4 }
          return expOrder[b.experience] - expOrder[a.experience]
        case "year":
          return b.yearStarted - a.yearStarted
        default:
          return 0
      }
    })

  const getExperienceColor = (experience: string) => {
    switch (experience) {
      case "beginner":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
      case "intermediate":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
      case "advanced":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400"
      case "expert":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  const getFrequencyIcon = (frequency: string) => {
    switch (frequency) {
      case "daily":
        return <TrendingUp className="w-4 h-4 text-green-500" />
      case "weekly":
        return <Clock className="w-4 h-4 text-blue-500" />
      case "monthly":
        return <Users className="w-4 h-4 text-purple-500" />
      case "occasionally":
        return <Star className="w-4 h-4 text-gray-500" />
      default:
        return null
    }
  }

  return (
    <PageWrapper>
    <main className="relative min-h-screen text-white overflow-hidden">
      {!isMobile && <CustomCursor />}
      <CosmicBackground />

      <section ref={containerRef} className="py-20 min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-teal-400 to-purple-500 bg-clip-text text-transparent">
              My Stack
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              A comprehensive overview of the tools, technologies, and platforms that power my development workflow and
              creative process.
            </p>
          </motion.div>

          {/* Filters and Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8 space-y-4"
          >
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search tools, technologies, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-navy-500/50 border-gray-700 text-white placeholder-gray-400"
                />
              </div>

              <div className="flex gap-2 items-center">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-40 bg-navy-500/50 border-gray-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-navy-500 border-gray-700">
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id} className="text-white hover:bg-navy-400">
                        {category.name} ({category.count})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40 bg-navy-500/50 border-gray-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-navy-500 border-gray-700">
                    <SelectItem value="name" className="text-white hover:bg-navy-400">
                      Name
                    </SelectItem>
                    <SelectItem value="rating" className="text-white hover:bg-navy-400">
                      Rating
                    </SelectItem>
                    <SelectItem value="experience" className="text-white hover:bg-navy-400">
                      Experience
                    </SelectItem>
                    <SelectItem value="year" className="text-white hover:bg-navy-400">
                      Year Started
                    </SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex border border-gray-700 rounded-md bg-navy-500/50">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-r-none"
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-l-none"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Tools Grid/List */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}
          >
            {filteredTools.map((tool, index) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="h-full"
              >
                <Card
                  className={`overflow-hidden border border-gray-700 hover:shadow-xl transition-all duration-300 dark:bg-navy-500/50 h-full group hover:border-teal-500/50 ${
                    viewMode === "list" ? "flex" : ""
                  }`}
                >
                  <CardHeader className={`${viewMode === "list" ? "flex-shrink-0 w-20" : ""}`}>
                    <div className={`flex ${viewMode === "list" ? "flex-col" : "flex-row"} items-center gap-4`}>
                      <div className="relative w-12 h-12 flex-shrink-0">
                        <Image
                          src={tool.logo || "/placeholder.svg"}
                          alt={tool.name}
                          width={48}
                          height={48}
                          className="object-contain rounded-lg"
                        />
                      </div>
                      {viewMode === "grid" && (
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-bold text-lg text-white group-hover:text-teal-400 transition-colors">
                              {tool.name}
                            </h3>
                            {tool.link && (
                              <a
                                href={tool.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-teal-500 hover:text-teal-400 transition-colors"
                              >
                                <ExternalLink size={16} />
                              </a>
                            )}
                          </div>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className={getExperienceColor(tool.experience)}>{tool.experience}</Badge>
                            <div className="flex items-center gap-1">
                              {getFrequencyIcon(tool.usageFrequency)}
                              <span className="text-xs text-gray-400 capitalize">{tool.usageFrequency}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 mb-2">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < Math.floor(tool.rating) ? "text-yellow-400 fill-current" : "text-gray-600"
                                }`}
                              />
                            ))}
                            <span className="text-sm text-gray-400 ml-1">{tool.rating}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className={`${viewMode === "list" ? "flex-1" : ""} space-y-4`}>
                    {viewMode === "list" && (
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-lg text-white group-hover:text-teal-400 transition-colors">
                            {tool.name}
                          </h3>
                          {tool.link && (
                            <a
                              href={tool.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-teal-500 hover:text-teal-400 transition-colors"
                            >
                              <ExternalLink size={16} />
                            </a>
                          )}
                        </div>
                        <Badge className={getExperienceColor(tool.experience)}>{tool.experience}</Badge>
                        <div className="flex items-center gap-1">
                          {getFrequencyIcon(tool.usageFrequency)}
                          <span className="text-xs text-gray-400 capitalize">{tool.usageFrequency}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(tool.rating) ? "text-yellow-400 fill-current" : "text-gray-600"
                              }`}
                            />
                          ))}
                          <span className="text-sm text-gray-400 ml-1">{tool.rating}</span>
                        </div>
                      </div>
                    )}

                    <p className="text-gray-300 text-sm leading-relaxed">{tool.description}</p>

                    <div className="space-y-3">
                      <div>
                        <h4 className="text-sm font-semibold text-white mb-2">Key Features</h4>
                        <div className="flex flex-wrap gap-1">
                          {tool.features.slice(0, 4).map((feature) => (
                            <Badge key={feature} variant="outline" className="text-xs border-gray-600 text-gray-300">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-white mb-2">Tags</h4>
                        <div className="flex flex-wrap gap-1">
                          {tool.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs bg-teal-500/20 text-teal-400">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-xs text-gray-400">
                        <div>
                          <span className="font-medium">Started:</span> {tool.yearStarted}
                        </div>
                        <div>
                          <span className="font-medium">Experience:</span> {new Date().getFullYear() - tool.yearStarted}{" "}
                          years
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {filteredTools.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
              <p className="text-gray-400 text-lg">No tools found matching your criteria.</p>
            </motion.div>
          )}
        </div>
      </section>
    </main>
    </PageWrapper>
  )
}
