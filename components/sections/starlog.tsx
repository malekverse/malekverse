"use client"

import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Star, X, MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { OrbitAnimation } from "@/components/orbit-animation"
import { useMobile } from "@/hooks/use-mobile"
import { useTheme } from "next-themes"

// Define the star data structure
interface StarEvent {
  id: string
  title: string
  date: string
  description: string
  category: "project" | "milestone" | "learning" | "collaboration"
  tags: string[]
  position: { x: number; y: number }
  size: number
  brightness: number
  constellation?: string
  connections?: string[]
  image?: string
}

// Define constellation data structure
interface Constellation {
  id: string
  name: string
  description: string
  stars: string[]
  color: string
}

export function Starlog() {
  const containerRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const starsContainerRef = useRef<HTMLDivElement>(null)
  const isMobile = useMobile()
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  // Scroll animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  // State for interactive elements
  const [selectedStar, setSelectedStar] = useState<StarEvent | null>(null)
  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  const [showMiniMap, setShowMiniMap] = useState(false)
  const [discoveredStars, setDiscoveredStars] = useState<Set<string>>(new Set())
  const [activeConstellation, setActiveConstellation] = useState<string | null>(null)

  // Star data - this would be your journey milestones
  const stars: StarEvent[] = [
    {
      id: "first-website",
      title: "First Website Launch",
      date: "January 2018",
      description:
        "Created my first professional website for a local business. This project ignited my passion for web development and design.",
      category: "project",
      tags: ["HTML", "CSS", "JavaScript"],
      position: { x: 25, y: 20 },
      size: 1.5,
      brightness: 0.8,
      constellation: "beginnings",
      connections: ["coding-bootcamp"],
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: "coding-bootcamp",
      title: "Coding Bootcamp",
      date: "March 2018",
      description:
        "Completed an intensive 12-week coding bootcamp that transformed my understanding of modern web development practices.",
      category: "learning",
      tags: ["React", "Node.js", "MongoDB"],
      position: { x: 40, y: 35 },
      size: 2,
      brightness: 0.9,
      constellation: "beginnings",
      connections: ["first-job"],
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: "first-job",
      title: "First Developer Role",
      date: "June 2018",
      description:
        "Joined a startup as a junior developer. This opportunity allowed me to work on real-world projects and collaborate with experienced developers.",
      category: "milestone",
      tags: ["Career", "Frontend", "Team Work"],
      position: { x: 60, y: 25 },
      size: 2.5,
      brightness: 1,
      constellation: "career",
      connections: ["major-project"],
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: "major-project",
      title: "First Major Project Lead",
      date: "February 2019",
      description:
        "Led the development of a key client project, managing both the technical implementation and team coordination.",
      category: "project",
      tags: ["Leadership", "React", "Project Management"],
      position: { x: 75, y: 40 },
      size: 2.2,
      brightness: 0.95,
      constellation: "career",
      connections: ["tech-conference"],
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: "tech-conference",
      title: "First Tech Conference",
      date: "May 2019",
      description:
        "Attended my first major tech conference. The exposure to cutting-edge technologies and networking with industry leaders broadened my horizons.",
      category: "learning",
      tags: ["Networking", "Innovation", "Community"],
      position: { x: 85, y: 60 },
      size: 1.8,
      brightness: 0.85,
      constellation: "growth",
      connections: ["open-source"],
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: "open-source",
      title: "First Open Source Contribution",
      date: "August 2019",
      description:
        "Made my first significant contribution to an open-source project. This experience taught me about collaborative development and code quality.",
      category: "collaboration",
      tags: ["Open Source", "GitHub", "Community"],
      position: { x: 65, y: 70 },
      size: 1.7,
      brightness: 0.8,
      constellation: "growth",
      connections: ["freelance-start"],
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: "freelance-start",
      title: "Freelance Journey Begins",
      date: "January 2020",
      description:
        "Started taking on freelance projects alongside my full-time role. This side hustle allowed me to explore different technologies and business domains.",
      category: "milestone",
      tags: ["Freelance", "Entrepreneurship", "Client Work"],
      position: { x: 45, y: 65 },
      size: 2.3,
      brightness: 0.9,
      constellation: "independence",
      connections: ["agency-collaboration"],
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: "agency-collaboration",
      title: "Agency Collaboration",
      date: "June 2020",
      description:
        "Partnered with a design agency on a series of high-profile projects. This collaboration enhanced my design sensibility and client communication skills.",
      category: "collaboration",
      tags: ["Agency Work", "Design", "Client Relations"],
      position: { x: 30, y: 80 },
      size: 2,
      brightness: 0.85,
      constellation: "independence",
      connections: ["tech-stack-shift"],
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: "tech-stack-shift",
      title: "Technology Stack Evolution",
      date: "November 2020",
      description:
        "Transitioned my focus to a new technology stack, embracing TypeScript, Next.js, and modern backend solutions.",
      category: "learning",
      tags: ["TypeScript", "Next.js", "Professional Growth"],
      position: { x: 15, y: 60 },
      size: 2.1,
      brightness: 0.9,
      constellation: "mastery",
      connections: ["mentorship"],
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: "mentorship",
      title: "Mentorship Program",
      date: "February 2021",
      description:
        "Began mentoring junior developers, which has been one of the most rewarding aspects of my career journey.",
      category: "milestone",
      tags: ["Mentorship", "Leadership", "Community"],
      position: { x: 10, y: 40 },
      size: 2.4,
      brightness: 0.95,
      constellation: "mastery",
      connections: ["current-focus"],
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: "current-focus",
      title: "Current Focus",
      date: "Present",
      description:
        "Currently focused on advanced frontend architectures, performance optimization, and exploring the intersection of design and development.",
      category: "learning",
      tags: ["Architecture", "Performance", "Innovation"],
      position: { x: 20, y: 15 },
      size: 3,
      brightness: 1,
      constellation: "future",
      image: "/placeholder.svg?height=400&width=600",
    },
    // Easter egg star - hidden until discovered
    {
      id: "secret-star",
      title: "The Hidden Passion",
      date: "Timeless",
      description:
        "Beyond code and design lies my secret passion: astrophotography. The stars have always been my greatest inspiration, both in the sky and in my work.",
      category: "milestone",
      tags: ["Personal", "Astronomy", "Inspiration"],
      position: { x: 50, y: 50 },
      size: 0.8,
      brightness: 0.6,
      image: "/placeholder.svg?height=400&width=600",
    },
  ]

  // Constellation data
  const constellations: Constellation[] = [
    {
      id: "beginnings",
      name: "The Genesis",
      description: "The beginning of my journey into the world of web development.",
      stars: ["first-website", "coding-bootcamp"],
      color: "#4F46E5", // Indigo
    },
    {
      id: "career",
      name: "The Professional Path",
      description: "Key milestones in my professional career development.",
      stars: ["first-job", "major-project"],
      color: "#0EA5E9", // Sky blue
    },
    {
      id: "growth",
      name: "The Explorer",
      description: "Periods of significant learning and community engagement.",
      stars: ["tech-conference", "open-source"],
      color: "#10B981", // Emerald
    },
    {
      id: "independence",
      name: "The Freelancer",
      description: "My journey into independent work and agency collaborations.",
      stars: ["freelance-start", "agency-collaboration"],
      color: "#F59E0B", // Amber
    },
    {
      id: "mastery",
      name: "The Craftsman",
      description: "Deepening expertise and giving back to the community.",
      stars: ["tech-stack-shift", "mentorship"],
      color: "#EC4899", // Pink
    },
    {
      id: "future",
      name: "The Horizon",
      description: "Current focus and future aspirations.",
      stars: ["current-focus"],
      color: "#8B5CF6", // Violet
    },
  ]

  // Function to handle star click
  const handleStarClick = (star: StarEvent) => {
    setSelectedStar(star)
    // Add to discovered stars
    setDiscoveredStars((prev) => new Set(prev).add(star.id))
  }

  // Function to filter stars
  const filterStars = (category: string | null) => {
    setActiveFilter(category)
    setActiveConstellation(null)
  }

  // Function to highlight constellation
  const highlightConstellation = (constellationId: string | null) => {
    setActiveConstellation(constellationId)
    setActiveFilter(null)
  }

  // Draw constellation lines on canvas
  useEffect(() => {
    const canvas = canvasRef.current
    const starsContainer = starsContainerRef.current

    if (!canvas || !starsContainer) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions to match container
    const resizeCanvas = () => {
      const rect = starsContainer.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Draw connections
    const drawConnections = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Set line style based on theme
      ctx.lineWidth = 1
      ctx.setLineDash([5, 3])

      // Draw all constellation connections or just the active one
      constellations.forEach((constellation) => {
        if (activeConstellation && constellation.id !== activeConstellation) return

        // Set color based on constellation
        ctx.strokeStyle = constellation.color + (isDark ? "80" : "60")

        // Connect stars in this constellation
        for (let i = 0; i < constellation.stars.length - 1; i++) {
          const currentStarId = constellation.stars[i]
          const nextStarId = constellation.stars[i + 1]

          const currentStar = stars.find((s) => s.id === currentStarId)
          const nextStar = stars.find((s) => s.id === nextStarId)

          if (currentStar && nextStar) {
            // Calculate positions relative to container
            const x1 = (currentStar.position.x / 100) * canvas.width
            const y1 = (currentStar.position.y / 100) * canvas.height
            const x2 = (nextStar.position.x / 100) * canvas.width
            const y2 = (nextStar.position.y / 100) * canvas.height

            // Draw line
            ctx.beginPath()
            ctx.moveTo(x1, y1)
            ctx.lineTo(x2, y2)
            ctx.stroke()
          }
        }
      })
    }

    drawConnections()

    // Redraw when active constellation changes
    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [activeConstellation, stars, constellations, isDark])

  // Calculate which stars should be visible based on filter
  const visibleStars = stars.filter((star) => {
    // Hide secret star unless discovered
    if (star.id === "secret-star" && !discoveredStars.has("secret-star")) return false

    // Apply category filter
    if (activeFilter && star.category !== activeFilter) return false

    // Apply constellation filter
    if (activeConstellation && !star.constellation?.includes(activeConstellation)) return false

    return true
  })

  // Check for secret star discovery
  useEffect(() => {
    const checkForSecretStar = () => {
      // If user has discovered all regular stars, reveal the secret star
      const regularStars = stars.filter((s) => s.id !== "secret-star")
      const discoveredRegularStars = [...discoveredStars].filter((id) => id !== "secret-star")

      if (discoveredRegularStars.length === regularStars.length) {
        // Add secret star to discovered after a delay
        setTimeout(() => {
          setDiscoveredStars((prev) => new Set(prev).add("secret-star"))
        }, 2000)
      }
    }

    checkForSecretStar()
  }, [discoveredStars, stars])

  return (
    <section id="starlog" ref={containerRef} className="py-20 min-h-screen relative overflow-hidden">
      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="section-heading">Starlog</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mb-12">
            A cosmic journey through my professional development. Each star represents a milestone, project, or learning
            experience that has shaped my path as a developer.
          </p>
        </motion.div>

        {/* Controls and filters */}
        <motion.div
          className="flex flex-wrap items-center justify-between gap-4 mb-8"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant={activeFilter === null && activeConstellation === null ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setActiveFilter(null)
                setActiveConstellation(null)
              }}
            >
              All Stars
            </Button>
            <Button
              variant={activeFilter === "project" ? "default" : "outline"}
              size="sm"
              onClick={() => filterStars("project")}
            >
              Projects
            </Button>
            <Button
              variant={activeFilter === "milestone" ? "default" : "outline"}
              size="sm"
              onClick={() => filterStars("milestone")}
            >
              Milestones
            </Button>
            <Button
              variant={activeFilter === "learning" ? "default" : "outline"}
              size="sm"
              onClick={() => filterStars("learning")}
            >
              Learning
            </Button>
            <Button
              variant={activeFilter === "collaboration" ? "default" : "outline"}
              size="sm"
              onClick={() => filterStars("collaboration")}
            >
              Collaborations
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setShowMiniMap(!showMiniMap)}>
              <MapPin className="h-4 w-4 mr-1" />
              {showMiniMap ? "Hide Map" : "Show Map"}
            </Button>
          </div>
        </motion.div>

        {/* Constellations selector */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h3 className="text-lg font-medium mb-3">Constellations</h3>
          <div className="flex flex-wrap gap-2">
            {constellations.map((constellation) => (
              <Button
                key={constellation.id}
                variant={activeConstellation === constellation.id ? "default" : "outline"}
                size="sm"
                className="flex items-center gap-1"
                style={{
                  borderColor: activeConstellation === constellation.id ? undefined : constellation.color,
                  color: activeConstellation === constellation.id ? undefined : constellation.color,
                  backgroundColor: activeConstellation === constellation.id ? constellation.color : undefined,
                }}
                onClick={() =>
                  highlightConstellation(activeConstellation === constellation.id ? null : constellation.id)
                }
              >
                <Star className="h-3 w-3" />
                {constellation.name}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Star map */}
        <motion.div
          className="relative bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4 h-[600px] mb-8 overflow-hidden"
          style={{
            backgroundImage: isDark
              ? "radial-gradient(circle at 50% 50%, rgba(30, 41, 59, 0.5) 0%, rgba(15, 23, 42, 0.8) 100%)"
              : "radial-gradient(circle at 50% 50%, rgba(248, 250, 252, 0.8) 0%, rgba(241, 245, 249, 0.9) 100%)",
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          ref={starsContainerRef}
        >
          {/* Canvas for constellation lines */}
          <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full pointer-events-none" />

          {/* Stars */}
          {visibleStars.map((star) => (
            <motion.div
              key={star.id}
              className="absolute cursor-pointer"
              style={{
                left: `${star.position.x}%`,
                top: `${star.position.y}%`,
                zIndex: selectedStar?.id === star.id ? 20 : 10,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: activeConstellation && !star.constellation?.includes(activeConstellation) ? 0.3 : 1,
                scale: 1,
              }}
              transition={{ duration: 0.5, delay: Math.random() * 0.5 }}
              whileHover={{ scale: 1.2 }}
            >
              <div className="relative" onClick={() => handleStarClick(star)}>
                {/* Star glow effect */}
                <div
                  className="absolute rounded-full"
                  style={{
                    width: `${star.size * 30}px`,
                    height: `${star.size * 30}px`,
                    backgroundColor: star.constellation
                      ? constellations.find((c) => c.id === star.constellation)?.color || "#4F46E5"
                      : "#4F46E5",
                    opacity: star.brightness * 0.2,
                    top: `${-star.size * 15 + 10}px`,
                    left: `${-star.size * 15 + 10}px`,
                    filter: "blur(8px)",
                    animation: "pulse 3s infinite alternate",
                  }}
                />

                {/* Star icon */}
                <Star
                  className={`
                    ${discoveredStars.has(star.id) ? "text-white dark:text-white" : "text-gray-400 dark:text-gray-600"}
                    ${star.id === "secret-star" ? "text-yellow-400" : ""}
                  `}
                  fill={
                    discoveredStars.has(star.id)
                      ? star.constellation
                        ? constellations.find((c) => c.id === star.constellation)?.color || "#4F46E5"
                        : "#4F46E5"
                      : "none"
                  }
                  size={star.size * 20}
                  strokeWidth={1.5}
                />

                {/* Star label on hover */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-white/90 dark:bg-gray-800/90 shadow-sm">
                    {star.title}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Mini map */}
          {showMiniMap && (
            <motion.div
              className="absolute bottom-4 right-4 w-48 h-48 bg-white/90 dark:bg-gray-800/90 rounded-lg shadow-lg p-2 border border-gray-200 dark:border-gray-700"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <h4 className="text-xs font-medium mb-2">Star Map</h4>
              <div className="relative w-full h-[calc(100%-20px)] rounded bg-gray-100 dark:bg-gray-900/50">
                {stars.map((star) => (
                  <div
                    key={`map-${star.id}`}
                    className={`absolute w-1.5 h-1.5 rounded-full ${
                      discoveredStars.has(star.id) ? "bg-teal-500" : "bg-gray-400 dark:bg-gray-600"
                    } ${star.id === "secret-star" ? "bg-yellow-400" : ""}`}
                    style={{
                      left: `${star.position.x}%`,
                      top: `${star.position.y}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                  />
                ))}

                {/* Current view indicator */}
                <div className="absolute w-full h-full border-2 border-teal-500/50 rounded pointer-events-none" />
              </div>
            </motion.div>
          )}

          {/* Progress indicator */}
          <div className="absolute top-4 left-4 flex items-center gap-1.5">
            <span className="text-xs font-medium">
              {discoveredStars.size} / {stars.length} stars discovered
            </span>
            <div className="w-24 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-teal-500 rounded-full"
                style={{ width: `${(discoveredStars.size / stars.length) * 100}%` }}
              />
            </div>
          </div>
        </motion.div>

        {/* Star detail modal */}
        <AnimatePresence>
          {selectedStar && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedStar(null)}
            >
              <motion.div
                className="relative w-full max-w-2xl bg-white dark:bg-gray-900 rounded-lg shadow-xl overflow-hidden"
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close button */}
                <button
                  className="absolute top-4 right-4 z-10 p-1 rounded-full bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  onClick={() => setSelectedStar(null)}
                >
                  <X size={20} />
                </button>

                {/* Image */}
                <div className="relative h-48 sm:h-64 w-full">
                  <Image
                    src={selectedStar.image || "/placeholder.svg?height=400&width=600"}
                    alt={selectedStar.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge
                        className="capitalize"
                        style={{
                          backgroundColor: selectedStar.constellation
                            ? constellations.find((c) => c.id === selectedStar.constellation)?.color
                            : undefined,
                        }}
                      >
                        {selectedStar.category}
                      </Badge>
                      {selectedStar.constellation && (
                        <Badge variant="outline" className="border-white/30 text-white">
                          {constellations.find((c) => c.id === selectedStar.constellation)?.name}
                        </Badge>
                      )}
                    </div>
                    <h3 className="text-white text-2xl font-bold">{selectedStar.title}</h3>
                    <p className="text-white/80 text-sm">{selectedStar.date}</p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-gray-700 dark:text-gray-300 mb-4">{selectedStar.description}</p>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {selectedStar.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="capitalize">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Navigation between connected stars */}
                  {selectedStar.connections && selectedStar.connections.length > 0 && (
                    <div className="border-t border-gray-200 dark:border-gray-800 pt-4 mt-4">
                      <h4 className="text-sm font-medium mb-2">Connected Events</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedStar.connections.map((connectionId) => {
                          const connectedStar = stars.find((s) => s.id === connectionId)
                          if (!connectedStar) return null

                          return (
                            <Button
                              key={connectionId}
                              variant="outline"
                              size="sm"
                              className="flex items-center gap-1"
                              onClick={() => setSelectedStar(connectedStar)}
                            >
                              <Star className="h-3 w-3" />
                              {connectedStar.title}
                            </Button>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mission log */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <Card className="border border-gray-200 dark:border-gray-800 dark:bg-navy-500/50">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span>
                Mission Log
              </h3>

              <Tabs defaultValue="journey">
                <TabsList className="mb-4">
                  <TabsTrigger value="journey">Journey</TabsTrigger>
                  <TabsTrigger value="discoveries">Discoveries</TabsTrigger>
                  <TabsTrigger value="future">Future</TabsTrigger>
                </TabsList>

                <TabsContent value="journey" className="space-y-4">
                  <p className="text-gray-700 dark:text-gray-300">
                    My journey as a developer has been a cosmic adventure through various technologies, projects, and
                    collaborations. Each experience has added to my skillset and shaped my approach to problem-solving.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    From my first website to leading complex projects, I've navigated the vast universe of web
                    development with curiosity and determination. The constellations above represent the major themes of
                    my professional growth.
                  </p>
                </TabsContent>

                <TabsContent value="discoveries" className="space-y-4">
                  <p className="text-gray-700 dark:text-gray-300">
                    Explore the star map to discover key moments in my development journey. Each star represents a
                    significant milestone, project, learning experience, or collaboration.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                      <h4 className="font-medium mb-2">Recently Discovered</h4>
                      <ul className="space-y-2">
                        {[...discoveredStars].slice(-3).map((id) => {
                          const star = stars.find((s) => s.id === id)
                          if (!star) return null

                          return (
                            <li key={id} className="flex items-center gap-2 text-sm">
                              <Star className="h-3 w-3 text-teal-500" fill="currentColor" />
                              <span>{star.title}</span>
                            </li>
                          )
                        })}
                      </ul>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                      <h4 className="font-medium mb-2">Undiscovered Stars</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {stars.length - discoveredStars.size} stars remain to be discovered
                      </p>
                      <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full mt-2 overflow-hidden">
                        <div
                          className="h-full bg-teal-500 rounded-full"
                          style={{ width: `${(discoveredStars.size / stars.length) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="future" className="space-y-4">
                  <p className="text-gray-700 dark:text-gray-300">
                    The journey continues as I explore new technologies and push the boundaries of what's possible in
                    web development. My current focus is on advanced frontend architectures, performance optimization,
                    and the intersection of design and development.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    The stars of tomorrow are yet to be written, but they will surely include deeper explorations of AI
                    integration, immersive experiences, and sustainable development practices.
                  </p>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-10 opacity-20 pointer-events-none">
        <OrbitAnimation size={200} speed={25} color="rgba(45, 212, 191, 0.2)">
          <div className="w-4 h-4 rounded-full bg-teal-500/80 blur-sm" />
        </OrbitAnimation>
      </div>

      <div className="absolute bottom-1/4 right-10 opacity-20 pointer-events-none">
        <OrbitAnimation size={150} speed={20} color="rgba(79, 70, 229, 0.2)">
          <div className="w-3 h-3 rounded-full bg-indigo-500/80 blur-sm" />
        </OrbitAnimation>
      </div>

      {/* Add this section to app/page.tsx */}
      <style jsx global>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.2; }
          50% { transform: scale(1.1); opacity: 0.3; }
          100% { transform: scale(1); opacity: 0.2; }
        }
      `}</style>
    </section>
  )
}
