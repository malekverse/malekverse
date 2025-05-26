"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Code,
  ExternalLink,
  Filter,
  Github,
  Search,
  SlidersHorizontal,
  Star,
  Tag,
  X,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { FadeIn, StaggerContainer, staggerItem } from "@/components/animations/scroll-animations"
import { PageWrapper } from "@/components/page-wrapper"

// This would typically come from a database or API
const projectsData = [
  {
    id: "tunisiaflicks",
    title: "TunisiaFlicks",
    description:
      "A dedicated streaming and discovery platform for Tunisian cinema, offering users free access to a curated selection of movies with no ads.",
    fullDescription:
      "TunisiaFlicks is a comprehensive platform designed to showcase and preserve Tunisian cinema heritage. The platform provides a user-friendly interface for discovering, watching, and learning about Tunisian films across different genres and eras. With features like user profiles, favorites, and curated collections, TunisiaFlicks aims to make Tunisian cinema more accessible to both local audiences and international viewers interested in North African cinema.",
    image: "/src/projects/tunisiaflicks/thumbnail.png?height=600&width=1200",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "MongoDB", "Zustand", "Framer Motion", "JWT", "JSDOM"],
    category: "fullstack",
    demoLink: "https://tunisiaflicks.vercel.app",
    githubLink: "https://github.com/malekverse/tunisiaflicks",
    features: [
      "Modern, interactive UI with dark/light mode",
      "Profile dashboard with favorites and saved movies",
      "Tunisian Movies Section via web scraping with JSDOM",
      "Secure authentication with JWT, cookies, hashed passwords",
      "Optimized with Next.js for server-side rendering and SEO",
      "Interactive components built with ShadCN and Zustand",
      "Scalable data storage using MongoDB",
      "Smooth animations with Framer Motion",
    ],
    challenges: [
      "Implementing efficient web scraping techniques to gather film data while respecting source websites",
      "Building a responsive video player that works across different devices and connection speeds",
      "Creating a secure authentication system to protect user data",
      "Optimizing performance for users with slower internet connections",
    ],
    outcomes: [
      "Positive user feedback for intuitive design and comprehensive movie database",
      "Increased engagement with Tunisian cinema among younger audiences",
      "Platform serves as a valuable resource for film students and researchers",
    ],
    screenshots: [
      {
        title: "Homepage",
        image: "/placeholder.svg?height=400&width=800",
        description: "The main landing page showcasing featured films and categories",
      },
      {
        title: "Movie Details",
        image: "/placeholder.svg?height=400&width=800",
        description: "Detailed view of a selected movie with information and viewing options",
      },
      {
        title: "User Dashboard",
        image: "/placeholder.svg?height=400&width=800",
        description: "Personalized user dashboard showing saved films and preferences",
      },
    ],
    featured: true,
    status: "In Progress",
    startDate: "2023-01-15",
    endDate: "2023-04-20",
    teamSize: 2,
    role: "Full Stack Developer",
    complexity: 4,
  },
  {
    id: "lead-insight",
    title: "Lead Insight",
    description:
      "AI-Powered Instagram Lead Management Platform designed to help marketers upload, analyze, score, and manage Instagram leads efficiently using AI and advanced filtering.",
    fullDescription:
      "Lead Insight is a sophisticated lead management system specifically designed for Instagram marketers. The platform leverages artificial intelligence to analyze and score potential leads based on their profile data, engagement metrics, and business relevance. Users can upload batches of Instagram accounts, apply keyword filtering, and generate personalized outreach messages, all within an intuitive dashboard interface.",
    image: "/src/projects/lead-insight/thumbnail.png?height=600&width=1200",
    tags: [
      "Next.js",
      "React",
      "TypeScript",
      "MongoDB",
      "OpenAI API",
      "Groq SDK",
      "Tailwind CSS",
      "Radix UI",
      "Framer Motion",
      "TanStack Table",
    ],
    category: "ai",
    demoLink: null,
    githubLink: null,
    features: [
      "Batch Lead Upload with CSV file processing",
      "AI-Powered Scoring using OpenAI API and Groq SDK",
      "Keyword Filtering with 'Good' and 'Bad' keyword matching logic",
      "Custom AI-generated messaging with editable templates",
      "Interactive Dashboard with comprehensive metrics",
      "Secure Authentication with protected routes and JWT",
      "Responsive UI with mobile-ready layout",
      "Progressive batch scoring with retry/backoff logic",
    ],
    challenges: [
      "Designing an efficient system for processing large batches of leads",
      "Implementing reliable AI scoring algorithms that provide consistent results",
      "Creating an intuitive interface for complex filtering operations",
      "Ensuring data privacy and security throughout the lead management process",
    ],
    outcomes: [
      "Streamlined lead generation workflows for marketing professionals",
      "Improved AI-based lead qualification resulting in more targeted outreach",
      "Better user efficiency with time saved on manual lead screening",
      "Highly positive client feedback on the platform's capabilities",
    ],
    screenshots: [
      {
        title: "Dashboard Overview",
        image: "/placeholder.svg?height=400&width=800",
        description: "Main dashboard showing lead metrics and batch status",
      },
      {
        title: "Lead Scoring Interface",
        image: "/placeholder.svg?height=400&width=800",
        description: "AI-powered lead scoring and analysis view",
      },
      {
        title: "Message Template Editor",
        image: "/placeholder.svg?height=400&width=800",
        description: "Custom messaging interface with AI-generated templates",
      },
    ],
    featured: true,
    status: "Completed",
    startDate: "2025",
    endDate: null,
    teamSize: 1,
    role: "Lead Developer",
    complexity: 5,
  },
  {
    id: "ipsas-university",
    title: "IPSAS University Platform",
    description:
      "A full-stack web platform for IPSAS University developed during a hackathon, designed to centralize access to university resources and services.",
    fullDescription:
      "The IPSAS University Platform was developed during an intensive hackathon to address the need for a centralized digital hub for university resources. The platform combines modern web technologies with innovative features like blockchain-based certification and AI assistance to create a comprehensive solution for students, faculty, and administrators. Despite the time constraints of the hackathon environment, the project delivered a fully functional platform with a focus on user experience and technical innovation.",
    image: "/src/projects/ipsas-university/thumbnail.png?height=600&width=1200",
    tags: ["React.js", "Next.js", "Tailwind CSS", "MongoDB", "Framer Motion", "Ethereum", "AI Chatbot"],
    category: "fullstack",
    demoLink: "https://ipsas.vercel.app",
    githubLink: "https://github.com/malekverse/ipsas-hackathon",
    features: [
      "Responsive UI built with React.js and enhanced with Framer Motion",
      "AI-Powered Chatbot for instant academic assistance",
      "Blockchain Integration using Ethereum for secure credential verification",
      "Secure Authentication with role-based access control",
      "Scalable MongoDB backend for efficient data management",
      "Dynamic routing and server-side rendering with Next.js",
      "Optimized performance and SEO capabilities",
    ],
    challenges: [
      "Developing a complete platform within the tight timeframe of a hackathon",
      "Integrating blockchain technology for credential verification",
      "Creating an effective AI chatbot with limited training data",
      "Designing an intuitive interface that works for different user roles",
    ],
    outcomes: [
      "Successfully delivered a functional platform within the hackathon deadline",
      "Demonstrated innovative use of emerging technologies in an educational context",
      "Created a solution that could be further developed for actual implementation",
      "Received positive feedback from hackathon judges and participants",
    ],
    screenshots: [
      {
        title: "Homepage",
        image: "/placeholder.svg?height=400&width=800",
        description: "Main landing page with university information and navigation",
      },
      {
        title: "Resource Center",
        image: "/placeholder.svg?height=400&width=800",
        description: "Centralized access to academic resources and materials",
      },
      {
        title: "Blockchain Certification",
        image: "/placeholder.svg?height=400&width=800",
        description: "Interface for verifying academic credentials using blockchain",
      },
    ],
    featured: false,
    status: "Completed",
    startDate: "2022-11-05",
    endDate: "2022-11-07",
    teamSize: 3,
    role: "Frontend Developer & Blockchain Integration",
    complexity: 3,
  },
]

export default function ProjectsPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, -50])

  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")
  const [sortOption, setSortOption] = useState("newest")
  const [complexityRange, setComplexityRange] = useState([1, 5])
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false)
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [viewMode, setViewMode] = useState("grid")

  // Extract all unique tags from projects
  const allTags = Array.from(new Set(projectsData.flatMap((project) => project.tags))).sort()

  // Extract all unique categories
  const categories = Array.from(new Set(projectsData.map((project) => project.category)))

  // Filter projects based on all criteria
  const filteredProjects = projectsData.filter((project) => {
    // Search query filter
    const matchesSearch =
      searchQuery === "" ||
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    // Category filter
    const matchesCategory = activeCategory === "all" || project.category === activeCategory

    // Featured filter
    const matchesFeatured = !showFeaturedOnly || project.featured

    // Status filter
    const matchesStatus = statusFilter === "all" || project.status === statusFilter

    // Complexity filter
    const matchesComplexity = project.complexity >= complexityRange[0] && project.complexity <= complexityRange[1]

    // Tags filter
    const matchesTags = selectedTags.length === 0 || selectedTags.every((tag) => project.tags.includes(tag))

    return matchesSearch && matchesCategory && matchesFeatured && matchesStatus && matchesComplexity && matchesTags
  })

  // Sort filtered projects
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    switch (sortOption) {
      case "newest":
        return new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
      case "oldest":
        return new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
      case "a-z":
        return a.title.localeCompare(b.title)
      case "z-a":
        return b.title.localeCompare(a.title)
      case "complexity-high":
        return b.complexity - a.complexity
      case "complexity-low":
        return a.complexity - b.complexity
      default:
        return 0
    }
  })

  const handleTagSelect = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  const clearFilters = () => {
    setSearchQuery("")
    setActiveCategory("all")
    setSortOption("newest")
    setComplexityRange([1, 5])
    setShowFeaturedOnly(false)
    setStatusFilter("all")
    setSelectedTags([])
  }

  return (
    <PageWrapper>
    <div className="min-h-screen bg-primary dark:bg-[#0A0E14] text-primary dark:text-white" ref={containerRef}>
      <motion.div className="absolute inset-0 pointer-events-none opacity-50 z-0" style={{ y }}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-teal-500/20 via-transparent to-transparent opacity-70"></div>
      </motion.div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <FadeIn>
            <Link
              href="/"
              className="inline-flex items-center text-teal-500 hover:text-teal-600 transition-colors mb-4 md:mb-0"
            >
              <ArrowLeft size={20} className="mr-2" />
              Back to Home
            </Link>
          </FadeIn>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"
                size={18}
              />
              <Input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full sm:w-64 bg-white/10 dark:bg-navy-500/50 border-gray-200 dark:border-gray-800 focus:border-teal-500 focus:ring-teal-500"
              />
            </div>

            <Button
              variant="outline"
              className="border-gray-200 dark:border-gray-800"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <Filter size={18} className="mr-2" />
              Filters
              {(selectedTags.length > 0 || showFeaturedOnly || statusFilter !== "all" || activeCategory !== "all") && (
                <Badge className="ml-2 bg-teal-500 text-white">
                  {selectedTags.length +
                    (showFeaturedOnly ? 1 : 0) +
                    (statusFilter !== "all" ? 1 : 0) +
                    (activeCategory !== "all" ? 1 : 0)}
                </Badge>
              )}
            </Button>

            <div className="flex border border-gray-200 dark:border-gray-800 rounded-md">
              <Button
                variant="ghost"
                className={`px-3 rounded-none rounded-l-md ${viewMode === "grid" ? "bg-teal-500/10 text-teal-500" : ""}`}
                onClick={() => setViewMode("grid")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="7" height="7"></rect>
                  <rect x="14" y="3" width="7" height="7"></rect>
                  <rect x="3" y="14" width="7" height="7"></rect>
                  <rect x="14" y="14" width="7" height="7"></rect>
                </svg>
              </Button>
              <Button
                variant="ghost"
                className={`px-3 rounded-none rounded-r-md ${viewMode === "list" ? "bg-teal-500/10 text-teal-500" : ""}`}
                onClick={() => setViewMode("list")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="8" y1="6" x2="21" y2="6"></line>
                  <line x1="8" y1="12" x2="21" y2="12"></line>
                  <line x1="8" y1="18" x2="21" y2="18"></line>
                  <line x1="3" y1="6" x2="3.01" y2="6"></line>
                  <line x1="3" y1="12" x2="3.01" y2="12"></line>
                  <line x1="3" y1="18" x2="3.01" y2="18"></line>
                </svg>
              </Button>
            </div>
          </motion.div>
        </div>

        <FadeIn>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Projects</h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mb-8">
            Explore my complete portfolio of projects spanning web development, AI, blockchain, and more. Each project
            represents different skills, challenges, and solutions I've worked on.
          </p>
        </FadeIn>

        <AnimatePresence>
          {isFilterOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-8 overflow-hidden"
            >
              <Card className="bg-white/5 dark:bg-navy-500/50 border border-gray-200 dark:border-gray-800">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row justify-between mb-4">
                    <h3 className="text-xl font-bold mb-4 md:mb-0">Advanced Filters</h3>
                    <Button variant="ghost" onClick={clearFilters} className="text-teal-500">
                      <X size={16} className="mr-2" />
                      Clear all filters
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium mb-1 block">Category</Label>
                        <Select value={activeCategory} onValueChange={setActiveCategory}>
                          <SelectTrigger className="bg-white/10 dark:bg-navy-500/50 border-gray-200 dark:border-gray-800">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Categories</SelectItem>
                            {categories.map((category) => (
                              <SelectItem key={category} value={category} className="capitalize">
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label className="text-sm font-medium mb-1 block">Status</Label>
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                          <SelectTrigger className="bg-white/10 dark:bg-navy-500/50 border-gray-200 dark:border-gray-800">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Statuses</SelectItem>
                            <SelectItem value="Completed">Completed</SelectItem>
                            <SelectItem value="In Progress">In Progress</SelectItem>
                            <SelectItem value="Planning">Planning</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium mb-1 block">Sort By</Label>
                        <Select value={sortOption} onValueChange={setSortOption}>
                          <SelectTrigger className="bg-white/10 dark:bg-navy-500/50 border-gray-200 dark:border-gray-800">
                            <SelectValue placeholder="Sort by" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="newest">Newest First</SelectItem>
                            <SelectItem value="oldest">Oldest First</SelectItem>
                            <SelectItem value="a-z">A-Z</SelectItem>
                            <SelectItem value="z-a">Z-A</SelectItem>
                            <SelectItem value="complexity-high">Most Complex</SelectItem>
                            <SelectItem value="complexity-low">Least Complex</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <Label className="text-sm font-medium">Complexity</Label>
                          <span className="text-sm text-gray-500">
                            {complexityRange[0]} - {complexityRange[1]}
                          </span>
                        </div>
                        <Slider
                          defaultValue={[1, 5]}
                          min={1}
                          max={5}
                          step={1}
                          value={complexityRange}
                          onValueChange={setComplexityRange}
                          className="my-4"
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium mb-3 block">Featured Projects</Label>
                        <div className="flex items-center space-x-2">
                          <Switch id="featured" checked={showFeaturedOnly} onCheckedChange={setShowFeaturedOnly} />
                          <Label htmlFor="featured">Show featured only</Label>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium mb-3 block">Tags</Label>
                      <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto pr-2">
                        {allTags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className={`cursor-pointer ${
                              selectedTags.includes(tag)
                                ? "bg-teal-500 text-white border-teal-500"
                                : "bg-white/10 dark:bg-navy-500/50 border-gray-200 dark:border-gray-800"
                            }`}
                            onClick={() => handleTagSelect(tag)}
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mb-6 flex items-center justify-between">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Showing {sortedProjects.length} of {projectsData.length} projects
          </div>

          {selectedTags.length > 0 && (
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">Active filters:</span>
              {selectedTags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="bg-teal-500/10 text-teal-500 border-teal-500/20 flex items-center gap-1"
                >
                  {tag}
                  <button onClick={() => handleTagSelect(tag)} className="ml-1 hover:bg-teal-600/20 rounded-full">
                    <X size={14} />
                  </button>
                </Badge>
              ))}
              <Button variant="ghost" size="sm" className="text-gray-500 h-6 px-2" onClick={() => setSelectedTags([])}>
                Clear
              </Button>
            </div>
          )}
        </div>

        {sortedProjects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <div className="w-20 h-20 rounded-full bg-teal-500/10 flex items-center justify-center mb-4">
              <Search size={32} className="text-teal-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">No projects found</h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-md mb-6">
              No projects match your current filters. Try adjusting your search criteria or clear the filters.
            </p>
            <Button onClick={clearFilters} className="bg-teal-500 hover:bg-teal-600">
              Clear all filters
            </Button>
          </motion.div>
        ) : viewMode === "grid" ? (
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedProjects.map((project, index) => (
              <motion.div key={project.id} variants={staggerItem} className="h-full">
                <motion.div
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0 20px 25px -5px rgba(45, 212, 191, 0.1), 0 10px 10px -5px rgba(45, 212, 191, 0.04)",
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="h-full"
                >
                  <Card className="h-full flex flex-col overflow-hidden border border-gray-200 dark:border-gray-800 card-hover dark:bg-navy-500/50">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-110"
                      />
                      {project.featured && (
                        <div className="absolute bottom-2 left-2">
                          <Badge className="bg-yellow-500 text-white border-none">
                            <Star size={12} className="mr-1" /> Featured
                          </Badge>
                        </div>
                      )}
                      <div className="absolute bottom-2 right-2">
                        <Badge
                          className={`
                            ${
                              project.status === "Completed"
                                ? "bg-green-500"
                                : project.status === "In Progress"
                                  ? "bg-blue-500"
                                  : "bg-orange-500"
                            } 
                            text-white border-none
                          `}
                        >
                          {project.status}
                        </Badge>
                      </div>
                    </div>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-xl text-primary">{project.title}</CardTitle>
                        <div className="flex space-x-2">
                          {project.demoLink && (
                            <motion.a
                              href={project.demoLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-teal-500 hover:text-teal-600 transition-colors"
                              aria-label="View demo"
                              whileHover={{ scale: 1.2, rotate: 5 }}
                            >
                              <ExternalLink size={18} />
                            </motion.a>
                          )}
                          {project.githubLink && (
                            <motion.a
                              href={project.githubLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-teal-500 hover:text-teal-600 transition-colors"
                              aria-label="View source code"
                              whileHover={{ scale: 1.2, rotate: 5 }}
                            >
                              <Github size={18} />
                            </motion.a>
                          )}
                        </div>
                      </div>
                      <CardDescription className="text-sm mt-2">{project.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                        <Calendar size={14} className="mr-1" />
                        <span>
                          {new Date(project.startDate).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                          })}
                          {project.endDate
                            ? ` - ${new Date(project.endDate).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                              })}`
                            : " - Present"}
                        </span>
                      </div>

                      <h4 className="text-sm font-semibold mb-2">Key Features:</h4>
                      <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300 mb-4">
                        {project.features.slice(0, 3).map((feature, i) => (
                          <li key={i} className="flex items-start">
                            <span className="text-teal-500 mr-2">•</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-4 pt-3 border-t border-gray-200 dark:border-gray-800 mt-auto">
                      <div className="flex flex-wrap gap-2 w-full">
                        {project.tags.slice(0, 4).map((tag, i) => (
                          <Badge key={i} variant="outline" className="bg-teal-500/10 text-teal-500 border-teal-500/20">
                            {tag}
                          </Badge>
                        ))}
                        {project.tags.length > 4 && (
                          <Badge variant="outline" className="bg-gray-500/10 text-gray-500 border-gray-500/20">
                            +{project.tags.length - 4}
                          </Badge>
                        )}
                      </div>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full">
                        <Link
                          href={`/projects/${project.id}`}
                          className="w-full inline-flex items-center justify-center px-4 py-2 rounded-md bg-teal-500 text-white hover:bg-teal-600 transition-colors"
                        >
                          See more details
                          <ArrowRight size={16} className="ml-2" />
                        </Link>
                      </motion.div>
                    </CardFooter>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </StaggerContainer>
        ) : (
          <StaggerContainer className="flex flex-col gap-6">
            {sortedProjects.map((project, index) => (
              <motion.div key={project.id} variants={staggerItem}>
                <motion.div
                  whileHover={{
                    scale: 1.01,
                    boxShadow: "0 20px 25px -5px rgba(45, 212, 191, 0.1), 0 10px 10px -5px rgba(45, 212, 191, 0.04)",
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Card className="overflow-hidden border border-gray-200 dark:border-gray-800 card-hover dark:bg-navy-500/50">
                    <div className="flex flex-col md:flex-row">
                      <div className="relative w-full md:w-1/4 h-48 md:h-auto">
                        <Image
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          fill
                          className="object-cover"
                        />
                        {project.featured && (
                          <div className="absolute top-2 left-2">
                            <Badge className="bg-yellow-500 text-white border-none">
                              <Star size={12} className="mr-1" /> Featured
                            </Badge>
                          </div>
                        )}
                        <div className="absolute top-2 right-2">
                          <Badge
                            className={`
                              ${
                                project.status === "Completed"
                                  ? "bg-green-500"
                                  : project.status === "In Progress"
                                    ? "bg-blue-500"
                                    : "bg-orange-500"
                              } 
                              text-white border-none
                            `}
                          >
                            {project.status}
                          </Badge>
                        </div>
                      </div>

                      <div className="flex-1 p-6">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                          </div>

                          <div className="flex space-x-2 mt-2 md:mt-0">
                            {project.demoLink && (
                              <Button variant="outline" size="sm" asChild>
                                <a href={project.demoLink} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink size={14} className="mr-1" /> Demo
                                </a>
                              </Button>
                            )}
                            {project.githubLink && (
                              <Button variant="outline" size="sm" asChild>
                                <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                                  <Github size={14} className="mr-1" /> Code
                                </a>
                              </Button>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                          <Badge
                            variant="outline"
                            className="bg-teal-500/10 text-teal-500 border-teal-500/20 capitalize"
                          >
                            <Code size={12} className="mr-1" /> {project.category}
                          </Badge>
                          {project.tags.slice(0, 5).map((tag, i) => (
                            <Badge
                              key={i}
                              variant="outline"
                              className="bg-gray-500/10 text-gray-500 border-gray-500/20"
                            >
                              {tag}
                            </Badge>
                          ))}
                          {project.tags.length > 5 && (
                            <Badge variant="outline" className="bg-gray-500/10 text-gray-500 border-gray-500/20">
                              +{project.tags.length - 5}
                            </Badge>
                          )}
                        </div>

                        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
                          <div className="flex items-center">
                            <Calendar size={14} className="mr-1" />
                            <span>
                              {new Date(project.startDate).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                              })}
                              {project.endDate
                                ? ` - ${new Date(project.endDate).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "short",
                                  })}`
                                : " - Present"}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <Tag size={14} className="mr-1" />
                            <span>Role: {project.role}</span>
                          </div>
                          <div className="flex items-center">
                            <SlidersHorizontal size={14} className="mr-1" />
                            <span>Complexity: {project.complexity}/5</span>
                          </div>
                        </div>

                        <Collapsible className="mb-4">
                          <CollapsibleTrigger asChild>
                            <Button variant="ghost" size="sm" className="text-teal-500 p-0 h-auto">
                              View key features
                              <svg
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="ml-1"
                              >
                                <path d="m6 9 6 6 6-6" />
                              </svg>
                            </Button>
                          </CollapsibleTrigger>
                          <CollapsibleContent className="mt-2">
                            <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                              {project.features.slice(0, 4).map((feature, i) => (
                                <li key={i} className="flex items-start">
                                  <span className="text-teal-500 mr-2">•</span>
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </CollapsibleContent>
                        </Collapsible>

                        <div className="flex justify-end">
                          <Link
                            href={`/projects/${project.id}`}
                            className="inline-flex items-center text-teal-500 hover:text-teal-600 transition-colors"
                          >
                            See more details
                            <ArrowRight size={16} className="ml-1" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </StaggerContainer>
        )}
      </div>
    </div>
    </PageWrapper>
  )
}
