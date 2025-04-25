"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { ExternalLink, Github, ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FadeIn, StaggerContainer, staggerItem } from "@/components/animations/scroll-animations"

export function Projects() {
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  const [activeFilter, setActiveFilter] = useState("all")
  // Implement the "View All Projects" and "Hide Projects" functionality
  // Add state to track expanded projects view
  const [showAllProjects, setShowAllProjects] = useState(false)

  const projects = [
    {
      id: "tunisiaflicks",
      title: "TunisiaFlicks",
      description:
        "A dedicated streaming and discovery platform for Tunisian cinema, offering users free access to a curated selection of movies with no ads.",
      image: "/placeholder.svg?height=300&width=600",
      tags: ["Next.js", "TypeScript", "Tailwind CSS", "MongoDB", "Zustand", "Framer Motion"],
      category: "fullstack",
      demoLink: "https://github.com/maghraoui3/tunisiaflicks",
      githubLink: "https://github.com/maghraoui3/tunisiaflicks",
      features: [
        "Modern, interactive UI with dark/light mode",
        "Profile dashboard with favorites and saved movies",
        "Tunisian Movies Section via web scraping",
        "Secure authentication with JWT",
        "Optimized with Next.js for performance",
      ],
    },
    {
      id: "lead-insight",
      title: "Lead Insight",
      description:
        "AI-Powered Instagram Lead Management Platform designed to help marketers upload, analyze, score, and manage Instagram leads efficiently using AI and advanced filtering.",
      image: "/placeholder.svg?height=300&width=600",
      tags: ["Next.js", "React", "TypeScript", "MongoDB", "OpenAI API", "Groq SDK", "Tailwind CSS"],
      category: "ai",
      demoLink: "#",
      githubLink: "#",
      features: [
        "Batch Lead Upload with CSV processing",
        "AI-Powered Scoring with OpenAI and Groq",
        "Keyword Filtering with matching logic",
        "Custom AI-generated messaging",
        "Interactive Dashboard with metrics",
      ],
    },
    {
      id: "ipsas-university",
      title: "IPSAS University Platform",
      description:
        "A full-stack web platform for IPSAS University developed during a hackathon, designed to centralize access to university resources and services.",
      image: "/placeholder.svg?height=300&width=600",
      tags: ["React.js", "Next.js", "Tailwind CSS", "MongoDB", "Framer Motion", "Ethereum"],
      category: "fullstack",
      demoLink: "https://ipsas.vercel.app",
      githubLink: "https://github.com/maghraoui3/ipsas-hackathon",
      features: [
        "Responsive UI with modern design",
        "AI-Powered Chatbot for academic questions",
        "Blockchain Integration for certification",
        "Secure Authentication with role-based access",
        "Scalable MongoDB backend",
      ],
    },
  ]

  const filteredProjects =
    activeFilter === "all" ? projects : projects.filter((project) => project.category === activeFilter)

  // Update the handleViewAllProjects function
  const handleViewAllProjects = () => {
    setShowAllProjects(!showAllProjects)
    // Scroll to projects section
    const projectsSection = document.getElementById("projects")
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Update the projects display logic
  const displayedProjects = showAllProjects ? filteredProjects : filteredProjects.slice(0, 3)

  return (
    <section id="projects" ref={containerRef} className="py-20 min-h-screen flex flex-col justify-center">
      <div className="container mx-auto">
        <FadeIn>
          <h2 className="section-heading">Projects</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mb-8">
            A showcase of my recent work, personal projects, and contributions. Each project represents different skills
            and technologies I've worked with.
          </p>
        </FadeIn>

        <div className="mb-8 flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Tabs defaultValue="all" className="w-full max-w-md">
              <TabsList className="grid grid-cols-3 mb-8">
                <TabsTrigger value="all" onClick={() => setActiveFilter("all")}>
                  All
                </TabsTrigger>
                <TabsTrigger value="fullstack" onClick={() => setActiveFilter("fullstack")}>
                  Full Stack
                </TabsTrigger>
                <TabsTrigger value="ai" onClick={() => setActiveFilter("ai")}>
                  AI Projects
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </motion.div>
        </div>

        {/* Update the grid of projects */}
        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedProjects.map((project, index) => (
            <motion.div key={index} variants={staggerItem} className="h-full">
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
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl">{project.title}</CardTitle>
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
                  <CardFooter className="flex flex-col gap-4 pt-0 border-t border-gray-200 dark:border-gray-800 mt-auto">
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

        {/* Update the button at the bottom */}
        <div className="flex justify-center mt-12">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button className="bg-teal-500 hover:bg-teal-600" onClick={handleViewAllProjects}>
              {showAllProjects ? "Hide Projects" : "View All Projects"}
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
