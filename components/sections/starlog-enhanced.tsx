"use client"

import { useRef, useState, useEffect, useCallback, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Star,
  X,
  Award,
  Target,
  Telescope,
  Compass,
  Zap,
  Trophy,
  Sparkles,
  Eye,
  Search,
  RotateCcw,
  Settings,
  Orbit,
  Palette,
  Cpu,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { useMobile } from "@/hooks/use-mobile"

// Enhanced interfaces
interface StarEvent {
  id: string
  title: string
  date: string
  description: string
  category: "project" | "milestone" | "learning" | "collaboration" | "achievement"
  tags: string[]
  position: { x: number; y: number }
  size: number
  impact: number
  difficulty: number
  duration: string
  skills: string[]
  achievements?: string[]
  rarity: "common" | "rare" | "epic" | "legendary"
  color: string
  constellation?: string
  connections?: string[]
}

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlocked: boolean
}

interface Constellation {
  id: string
  name: string
  stars: string[]
  color: string
  description: string
}

interface Particle {
  id: string
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  color: string
  life: number
  maxLife: number
}

export function StarlogEnhanced() {
  const containerRef = useRef<HTMLElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const isMobile = useMobile()

  // Enhanced state management
  const [selectedStar, setSelectedStar] = useState<StarEvent | null>(null)
  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [discoveredStars, setDiscoveredStars] = useState<Set<string>>(new Set())
  const [showSettings, setShowSettings] = useState(false)
  const [showMiniMap, setShowMiniMap] = useState(false)
  const [zoomLevel, setZoomLevel] = useState([1])
  const [explorationScore, setExplorationScore] = useState(0)
  const [timeSpent, setTimeSpent] = useState(0)
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [showAchievementModal, setShowAchievementModal] = useState<Achievement | null>(null)

  // New enhanced visual states
  const [cosmicView, setCosmicView] = useState(true)
  const [showConstellations, setShowConstellations] = useState(true)
  const [showParticles, setShowParticles] = useState(true)
  const [animationSpeed, setAnimationSpeed] = useState([1])
  const [particles, setParticles] = useState<Particle[]>([])
  const [hoveredConstellation, setHoveredConstellation] = useState<string | null>(null)
  const [showStarTrails, setShowStarTrails] = useState(true)

  // Enhanced star data with constellation connections
  const stars: StarEvent[] = [
    {
      id: "first-website",
      title: "First Website Launch",
      date: "January 2018",
      description:
        "Created my first professional website for a local business. This project ignited my passion for web development.",
      category: "project",
      tags: ["HTML", "CSS", "JavaScript"],
      position: { x: 20, y: 30 },
      size: 2,
      impact: 7,
      difficulty: 3,
      duration: "2 weeks",
      skills: ["HTML", "CSS", "JavaScript"],
      achievements: ["First Client"],
      rarity: "common",
      color: "#60A5FA",
      constellation: "genesis",
      connections: ["coding-bootcamp"],
    },
    {
      id: "coding-bootcamp",
      title: "Coding Bootcamp Graduation",
      date: "March 2018",
      description:
        "Completed an intensive 12-week coding bootcamp that transformed my understanding of modern web development.",
      category: "learning",
      tags: ["React", "Node.js", "MongoDB"],
      position: { x: 35, y: 45 },
      size: 2.5,
      impact: 9,
      difficulty: 8,
      duration: "12 weeks",
      skills: ["React", "Node.js", "MongoDB"],
      achievements: ["Bootcamp Graduate"],
      rarity: "rare",
      color: "#34D399",
      constellation: "genesis",
      connections: ["first-job"],
    },
    {
      id: "first-job",
      title: "First Developer Role",
      date: "June 2018",
      description:
        "Joined a startup as a junior developer. This opportunity allowed me to work on real-world projects.",
      category: "milestone",
      tags: ["Career", "Frontend", "Team Work"],
      position: { x: 65, y: 25 },
      size: 3,
      impact: 10,
      difficulty: 7,
      duration: "1.5 years",
      skills: ["Professional Development", "Team Collaboration"],
      achievements: ["First Job"],
      rarity: "epic",
      color: "#F59E0B",
      constellation: "career",
      connections: ["major-project"],
    },
    {
      id: "major-project",
      title: "First Major Project Lead",
      date: "February 2019",
      description:
        "Led the development of a key client project, managing both technical implementation and team coordination.",
      category: "project",
      tags: ["Leadership", "React", "Project Management"],
      position: { x: 75, y: 50 },
      size: 2.8,
      impact: 8,
      difficulty: 9,
      duration: "4 months",
      skills: ["Leadership", "Project Management"],
      achievements: ["First Lead"],
      rarity: "epic",
      color: "#8B5CF6",
      constellation: "career",
      connections: ["tech-conference"],
    },
    {
      id: "tech-conference",
      title: "First Tech Conference Speaker",
      date: "May 2019",
      description: "Spoke at my first major tech conference about modern React patterns.",
      category: "achievement",
      tags: ["Speaking", "Community", "React"],
      position: { x: 85, y: 70 },
      size: 2.3,
      impact: 9,
      difficulty: 8,
      duration: "1 day",
      skills: ["Public Speaking", "Knowledge Sharing"],
      achievements: ["First Speaker"],
      rarity: "legendary",
      color: "#EF4444",
      constellation: "growth",
      connections: ["open-source"],
    },
    {
      id: "open-source",
      title: "Major Open Source Contribution",
      date: "August 2019",
      description: "Made my first significant contribution to a popular open-source project.",
      category: "collaboration",
      tags: ["Open Source", "GitHub", "Community"],
      position: { x: 55, y: 75 },
      size: 2.2,
      impact: 7,
      difficulty: 6,
      duration: "3 weeks",
      skills: ["Open Source", "Git"],
      achievements: ["Open Source Contributor"],
      rarity: "rare",
      color: "#10B981",
      constellation: "growth",
      connections: ["freelance-start"],
    },
    {
      id: "freelance-start",
      title: "Freelance Journey Begins",
      date: "January 2020",
      description: "Started taking on freelance projects alongside my full-time role.",
      category: "milestone",
      tags: ["Freelance", "Entrepreneurship"],
      position: { x: 30, y: 65 },
      size: 2.6,
      impact: 8,
      difficulty: 7,
      duration: "Ongoing",
      skills: ["Client Management", "Business Development"],
      achievements: ["Entrepreneur"],
      rarity: "epic",
      color: "#F97316",
      constellation: "independence",
      connections: ["agency-collaboration"],
    },
    {
      id: "agency-collaboration",
      title: "Design Agency Partnership",
      date: "June 2020",
      description: "Partnered with a prestigious design agency on a series of high-profile projects.",
      category: "collaboration",
      tags: ["Agency Work", "Design", "Client Relations"],
      position: { x: 15, y: 80 },
      size: 2.4,
      impact: 8,
      difficulty: 6,
      duration: "8 months",
      skills: ["Design Collaboration", "Client Communication"],
      achievements: ["Agency Partner"],
      rarity: "epic",
      color: "#EC4899",
      constellation: "independence",
      connections: ["current-focus"],
    },
    {
      id: "current-focus",
      title: "Current Exploration",
      date: "Present",
      description:
        "Currently focused on advanced frontend architectures, AI integration, and creating immersive web experiences.",
      category: "learning",
      tags: ["AI", "Advanced Architecture", "Innovation"],
      position: { x: 50, y: 20 },
      size: 3.2,
      impact: 10,
      difficulty: 10,
      duration: "Ongoing",
      skills: ["AI Integration", "Advanced Architecture"],
      achievements: ["Innovation Leader"],
      rarity: "legendary",
      color: "#A855F7",
      constellation: "future",
    },
  ]

  // Constellation definitions
  const constellations: Constellation[] = [
    {
      id: "genesis",
      name: "The Genesis",
      stars: ["first-website", "coding-bootcamp"],
      color: "#60A5FA",
      description: "The beginning of my journey into web development",
    },
    {
      id: "career",
      name: "The Professional Path",
      stars: ["first-job", "major-project"],
      color: "#F59E0B",
      description: "Key milestones in my professional career",
    },
    {
      id: "growth",
      name: "The Explorer",
      stars: ["tech-conference", "open-source"],
      color: "#10B981",
      description: "Periods of significant learning and community engagement",
    },
    {
      id: "independence",
      name: "The Freelancer",
      stars: ["freelance-start", "agency-collaboration"],
      color: "#F97316",
      description: "My journey into independent work and collaborations",
    },
    {
      id: "future",
      name: "The Horizon",
      stars: ["current-focus"],
      color: "#A855F7",
      description: "Current focus and future aspirations",
    },
  ]

  // Achievement definitions
  const achievementDefinitions: Achievement[] = [
    {
      id: "first-discovery",
      title: "First Contact",
      description: "Discover your first star",
      icon: "🌟",
      unlocked: false,
    },
    {
      id: "constellation-discoverer",
      title: "Constellation Mapper",
      description: "Discover all stars in a constellation",
      icon: "🗺️",
      unlocked: false,
    },
    {
      id: "explorer",
      title: "Cosmic Explorer",
      description: "Discover 50% of all stars",
      icon: "🚀",
      unlocked: false,
    },
    {
      id: "completionist",
      title: "Star Collector",
      description: "Discover all stars",
      icon: "🏆",
      unlocked: false,
    },
  ]

  // Initialize achievements
  useEffect(() => {
    setAchievements(achievementDefinitions)
  }, [])

  // Enhanced particle system for cosmic view
  useEffect(() => {
    if (!cosmicView || !showParticles) {
      setParticles([])
      return
    }

    const generateParticles = () => {
      const newParticles: Particle[] = []

      // Cosmic dust
      for (let i = 0; i < 20; i++) {
        newParticles.push({
          id: `dust-${i}`,
          x: Math.random() * 100,
          y: Math.random() * 100,
          vx: (Math.random() - 0.5) * 0.1,
          vy: (Math.random() - 0.5) * 0.1,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.3 + 0.1,
          color: "#64748b",
          life: Math.random() * 1000 + 500,
          maxLife: 1000,
        })
      }

      // Floating stars
      for (let i = 0; i < 8; i++) {
        const colors = ["#60A5FA", "#34D399", "#F59E0B", "#8B5CF6", "#EF4444"]
        newParticles.push({
          id: `floater-${i}`,
          x: Math.random() * 100,
          y: Math.random() * 100,
          vx: (Math.random() - 0.5) * 0.05,
          vy: (Math.random() - 0.5) * 0.05,
          size: Math.random() * 3 + 2,
          opacity: Math.random() * 0.6 + 0.2,
          color: colors[Math.floor(Math.random() * colors.length)],
          life: Math.random() * 2000 + 1000,
          maxLife: 2000,
        })
      }

      setParticles(newParticles)
    }

    generateParticles()
  }, [cosmicView, showParticles])

  // Animate particles
  useEffect(() => {
    if (!cosmicView || particles.length === 0) return

    const animateParticles = () => {
      setParticles((prev) =>
        prev
          .map((particle) => ({
            ...particle,
            x: (particle.x + particle.vx + 100) % 100,
            y: (particle.y + particle.vy + 100) % 100,
            opacity: Math.sin(Date.now() * 0.001 * animationSpeed[0] + particle.x) * 0.2 + particle.opacity,
            life: particle.life - 16,
          }))
          .filter((particle) => particle.life > 0),
      )
    }

    const interval = setInterval(animateParticles, 16)
    return () => clearInterval(interval)
  }, [particles.length, cosmicView, animationSpeed])

  // Time tracking
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeSpent((prev) => prev + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  // Achievement checking
  useEffect(() => {
    if (discoveredStars.size === 0) return

    const newAchievements = achievements.map((achievement) => {
      if (achievement.unlocked) return achievement

      let shouldUnlock = false

      switch (achievement.id) {
        case "first-discovery":
          shouldUnlock = discoveredStars.size >= 1
          break
        case "constellation-discoverer":
          shouldUnlock = constellations.some((constellation) =>
            constellation.stars.every((starId) => discoveredStars.has(starId)),
          )
          break
        case "explorer":
          shouldUnlock = discoveredStars.size >= Math.floor(stars.length * 0.5)
          break
        case "completionist":
          shouldUnlock = discoveredStars.size >= stars.length
          break
      }

      if (shouldUnlock && !achievement.unlocked) {
        setTimeout(() => {
          setShowAchievementModal({ ...achievement, unlocked: true })
        }, 500)
        return { ...achievement, unlocked: true }
      }

      return achievement
    })

    setAchievements(newAchievements)
  }, [discoveredStars.size])

  // Star click handler
  const handleStarClick = useCallback((star: StarEvent) => {
    setSelectedStar(star)
    setDiscoveredStars((prev) => {
      const newSet = new Set(prev)
      newSet.add(star.id)
      return newSet
    })
    setExplorationScore((prev) => prev + star.impact * 10)
  }, [])

  // Filtered stars
  const visibleStars = useMemo(() => {
    let filtered = stars

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (star) =>
          star.title.toLowerCase().includes(query) ||
          star.tags.some((tag) => tag.toLowerCase().includes(query)) ||
          star.description.toLowerCase().includes(query),
      )
    }

    if (activeFilter) {
      filtered = filtered.filter((star) => star.category === activeFilter)
    }

    return filtered
  }, [searchQuery, activeFilter])

  // Reset function
  const resetProgress = useCallback(() => {
    setDiscoveredStars(new Set())
    setExplorationScore(0)
    setSelectedStar(null)
    setActiveFilter(null)
    setSearchQuery("")
    setShowAchievementModal(null)
    setAchievements(achievementDefinitions)
  }, [])

  // Draw constellation lines
  const renderConstellationLines = () => {
    if (!showConstellations) return null

    return constellations.map((constellation) => {
      const constellationStars = constellation.stars
        .map((starId) => visibleStars.find((star) => star.id === starId))
        .filter(Boolean) as StarEvent[]

      if (constellationStars.length < 2) return null

      const isHighlighted = hoveredConstellation === constellation.id
      const allDiscovered = constellation.stars.every((starId) => discoveredStars.has(starId))

      return (
        <g key={constellation.id}>
          {constellationStars.map((star, index) => {
            if (index === constellationStars.length - 1) return null
            const nextStar = constellationStars[index + 1]
            if (!nextStar) return null

            return (
              <motion.line
                key={`${star.id}-${nextStar.id}`}
                x1={`${star.position.x}%`}
                y1={`${star.position.y}%`}
                x2={`${nextStar.position.x}%`}
                y2={`${nextStar.position.y}%`}
                stroke={constellation.color}
                strokeWidth={isHighlighted ? 3 : allDiscovered ? 2 : 1}
                strokeOpacity={isHighlighted ? 0.8 : allDiscovered ? 0.6 : 0.3}
                strokeDasharray={allDiscovered ? "none" : "5,5"}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: index * 0.2 }}
                style={{
                  filter: cosmicView ? `drop-shadow(0 0 ${isHighlighted ? 8 : 4}px ${constellation.color})` : "none",
                }}
              />
            )
          })}

          {/* Connection lines between stars */}
          {constellationStars.map((star) => {
            if (!star.connections) return null
            return star.connections.map((connectionId) => {
              const connectedStar = visibleStars.find((s) => s.id === connectionId)
              if (!connectedStar) return null

              return (
                <motion.line
                  key={`connection-${star.id}-${connectionId}`}
                  x1={`${star.position.x}%`}
                  y1={`${star.position.y}%`}
                  x2={`${connectedStar.position.x}%`}
                  y2={`${connectedStar.position.y}%`}
                  stroke={star.color}
                  strokeWidth={1.5}
                  strokeOpacity={discoveredStars.has(star.id) && discoveredStars.has(connectionId) ? 0.7 : 0.2}
                  strokeDasharray="3,3"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                  style={{
                    filter: cosmicView ? `drop-shadow(0 0 4px ${star.color})` : "none",
                  }}
                />
              )
            })
          })}
        </g>
      )
    })
  }

  return (
    <section id="starlog" ref={containerRef} className="py-20 min-h-screen relative overflow-hidden">
      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-center mb-4">Enhanced Starlog</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-center mb-12">
            An immersive cosmic journey through my professional development. Discover stars, unlock achievements, and
            explore the constellations of my career.
          </p>
        </motion.div>

        {/* Enhanced controls */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-64">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search stars..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Cosmic View Toggle */}
            <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <Orbit className="h-4 w-4" />
              <span className="text-sm font-medium">Cosmic View</span>
              <Switch checked={cosmicView} onCheckedChange={setCosmicView} />
            </div>

            <Button variant="outline" size="sm" onClick={resetProgress}>
              <RotateCcw className="h-4 w-4 mr-1" />
              Reset
            </Button>

            <Button variant="outline" size="sm" onClick={() => setShowSettings(!showSettings)}>
              <Settings className="h-4 w-4 mr-1" />
              Settings
            </Button>
          </div>

          {/* Filter buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant={activeFilter === null ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter(null)}
            >
              <Eye className="h-4 w-4 mr-1" />
              All Stars ({visibleStars.length})
            </Button>
            <Button
              variant={activeFilter === "project" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter("project")}
            >
              <Target className="h-4 w-4 mr-1" />
              Projects
            </Button>
            <Button
              variant={activeFilter === "milestone" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter("milestone")}
            >
              <Trophy className="h-4 w-4 mr-1" />
              Milestones
            </Button>
            <Button
              variant={activeFilter === "learning" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter("learning")}
            >
              <Telescope className="h-4 w-4 mr-1" />
              Learning
            </Button>
            <Button
              variant={activeFilter === "collaboration" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter("collaboration")}
            >
              <Sparkles className="h-4 w-4 mr-1" />
              Collaborations
            </Button>
            <Button
              variant={activeFilter === "achievement" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter("achievement")}
            >
              <Award className="h-4 w-4 mr-1" />
              Achievements
            </Button>
          </div>
        </div>

        {/* Enhanced Settings Panel */}
        {showSettings && (
          <motion.div
            className="mb-8 p-6 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-700"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <h4 className="font-medium flex items-center gap-2">
                  <Palette className="h-4 w-4" />
                  Visual Settings
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm">Zoom Level</label>
                    <Slider
                      value={zoomLevel}
                      onValueChange={setZoomLevel}
                      max={2}
                      min={0.5}
                      step={0.1}
                      className="w-24"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm">Animation Speed</label>
                    <Slider
                      value={animationSpeed}
                      onValueChange={setAnimationSpeed}
                      max={2}
                      min={0.1}
                      step={0.1}
                      className="w-24"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium flex items-center gap-2">
                  <Cpu className="h-4 w-4" />
                  Performance
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm">Show Particles</label>
                    <Switch checked={showParticles} onCheckedChange={setShowParticles} disabled={!cosmicView} />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm">Star Trails</label>
                    <Switch checked={showStarTrails} onCheckedChange={setShowStarTrails} disabled={!cosmicView} />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  Display Options
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm">Constellations</label>
                    <Switch checked={showConstellations} onCheckedChange={setShowConstellations} />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm">Mini Map</label>
                    <Switch checked={showMiniMap} onCheckedChange={setShowMiniMap} />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Stats dashboard */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Star className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-medium">Stars Discovered</span>
            </div>
            <div className="text-2xl font-bold">{discoveredStars.size}</div>
            <Progress value={(discoveredStars.size / stars.length) * 100} className="mt-2" />
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Trophy className="h-4 w-4 text-orange-500" />
              <span className="text-sm font-medium">Achievements</span>
            </div>
            <div className="text-2xl font-bold">{achievements.filter((a) => a.unlocked).length}</div>
            <Progress
              value={(achievements.filter((a) => a.unlocked).length / achievements.length) * 100}
              className="mt-2"
            />
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium">Exploration Score</span>
            </div>
            <div className="text-2xl font-bold">{explorationScore}</div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Compass className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium">Time Exploring</span>
            </div>
            <div className="text-2xl font-bold">
              {Math.floor(timeSpent / 60)}m {timeSpent % 60}s
            </div>
          </Card>
        </div>

        {/* Enhanced star map */}
        <div
          className="relative rounded-lg p-8 h-[600px] mb-8 overflow-hidden border-2 border-gray-300 dark:border-gray-600"
          style={{
            background: cosmicView
              ? "radial-gradient(ellipse at center, #1e293b 0%, #0f172a 50%, #000000 100%)"
              : "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
            transform: `scale(${zoomLevel[0]})`,
            transformOrigin: "center",
          }}
        >
          {/* Cosmic background effects */}
          {cosmicView && (
            <>
              {/* Nebula effect */}
              <div className="absolute inset-0 opacity-30">
                <div
                  className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
                  style={{
                    background: "radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)",
                    filter: "blur(40px)",
                  }}
                />
                <div
                  className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full"
                  style={{
                    background: "radial-gradient(circle, rgba(34, 211, 153, 0.2) 0%, transparent 70%)",
                    filter: "blur(50px)",
                  }}
                />
              </div>

              {/* Particles */}
              {showParticles && (
                <div className="absolute inset-0 pointer-events-none">
                  {particles.map((particle) => (
                    <motion.div
                      key={particle.id}
                      className="absolute rounded-full"
                      style={{
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                        width: `${particle.size}px`,
                        height: `${particle.size}px`,
                        backgroundColor: particle.color,
                        opacity: particle.opacity * (particle.life / particle.maxLife),
                        filter: "blur(0.5px)",
                        boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
                      }}
                    />
                  ))}
                </div>
              )}
            </>
          )}

          {/* SVG for constellation lines */}
          <svg ref={svgRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 5 }}>
            {renderConstellationLines()}
          </svg>

          {/* Enhanced stars */}
          {visibleStars.map((star, index) => (
            <motion.div
              key={star.id}
              className="absolute cursor-pointer group"
              style={{
                left: `${star.position.x}%`,
                top: `${star.position.y}%`,
                zIndex: 10,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.4, zIndex: 50 }}
              onClick={() => handleStarClick(star)}
              onMouseEnter={() => star.constellation && setHoveredConstellation(star.constellation)}
              onMouseLeave={() => setHoveredConstellation(null)}
            >
              {/* Enhanced star glow */}
              {cosmicView && (
                <>
                  <motion.div
                    className="absolute rounded-full pointer-events-none"
                    style={{
                      width: `${star.size * 60}px`,
                      height: `${star.size * 60}px`,
                      backgroundColor: star.color,
                      top: `${-star.size * 30}px`,
                      left: `${-star.size * 30}px`,
                      filter: "blur(20px)",
                      opacity: 0.4,
                    }}
                    animate={{
                      opacity: [0.2, 0.6, 0.2],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 3 / animationSpeed[0],
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  />

                  {/* Star trails */}
                  {showStarTrails && discoveredStars.has(star.id) && (
                    <motion.div
                      className="absolute rounded-full pointer-events-none"
                      style={{
                        width: `${star.size * 80}px`,
                        height: `${star.size * 80}px`,
                        border: `2px solid ${star.color}`,
                        top: `${-star.size * 40}px`,
                        left: `${-star.size * 40}px`,
                        opacity: 0.3,
                      }}
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.3, 0, 0.3],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeOut",
                      }}
                    />
                  )}
                </>
              )}

              {/* Rarity indicator */}
              {star.rarity === "legendary" && (
                <motion.div
                  className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 border-2 border-white shadow-lg"
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                />
              )}

              {/* Star icon */}
              <Star
                className="text-white drop-shadow-lg relative z-10"
                fill={discoveredStars.has(star.id) ? star.color : cosmicView ? "rgba(255,255,255,0.3)" : "none"}
                size={star.size * 20}
                strokeWidth={2}
                style={{
                  color: star.color,
                  filter: cosmicView ? `drop-shadow(0 0 10px ${star.color})` : "none",
                }}
              />

              {/* Enhanced star label */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-20">
                <div
                  className={`backdrop-blur-sm rounded-lg px-4 py-3 shadow-xl border-2 ${
                    cosmicView
                      ? "bg-gray-900/95 border-gray-600 text-white"
                      : "bg-white/95 border-gray-200 text-gray-900"
                  }`}
                >
                  <div className="text-sm font-bold">{star.title}</div>
                  <div className={`text-xs ${cosmicView ? "text-gray-300" : "text-gray-500"}`}>{star.date}</div>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge
                      variant="secondary"
                      className="text-xs"
                      style={{ backgroundColor: star.color + "20", color: star.color, borderColor: star.color }}
                    >
                      {star.category}
                    </Badge>
                    <Badge
                      variant="outline"
                      className={`text-xs ${
                        star.rarity === "legendary"
                          ? "border-yellow-400 text-yellow-600"
                          : star.rarity === "epic"
                            ? "border-purple-400 text-purple-600"
                            : star.rarity === "rare"
                              ? "border-blue-400 text-blue-600"
                              : "border-gray-400 text-gray-600"
                      }`}
                    >
                      {star.rarity}
                    </Badge>
                  </div>
                  <div className={`text-xs mt-1 ${cosmicView ? "text-gray-400" : "text-gray-500"}`}>
                    Impact: {star.impact}/10 • Difficulty: {star.difficulty}/10
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Mini map */}
          {showMiniMap && (
            <motion.div
              className="absolute bottom-4 right-4 w-56 h-40 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-lg shadow-xl p-4 border border-gray-200 dark:border-gray-600"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-medium">Cosmic Map</h4>
                <Button variant="ghost" size="sm" onClick={() => setShowMiniMap(false)} className="h-6 w-6 p-0">
                  <X className="h-3 w-3" />
                </Button>
              </div>
              <div className="relative w-full h-full rounded bg-gray-100 dark:bg-gray-700 overflow-hidden">
                {/* Constellation areas on mini map */}
                {constellations.map((constellation) => {
                  const constellationStars = constellation.stars
                    .map((starId) => stars.find((s) => s.id === starId))
                    .filter(Boolean) as StarEvent[]

                  if (constellationStars.length === 0) return null

                  const minX = Math.min(...constellationStars.map((s) => s.position.x))
                  const maxX = Math.max(...constellationStars.map((s) => s.position.x))
                  const minY = Math.min(...constellationStars.map((s) => s.position.y))
                  const maxY = Math.max(...constellationStars.map((s) => s.position.y))

                  return (
                    <div
                      key={`map-constellation-${constellation.id}`}
                      className="absolute rounded opacity-20 hover:opacity-30 transition-opacity cursor-pointer"
                      style={{
                        backgroundColor: constellation.color,
                        left: `${minX - 2}%`,
                        top: `${minY - 2}%`,
                        width: `${maxX - minX + 4}%`,
                        height: `${maxY - minY + 4}%`,
                      }}
                      onClick={() => setHoveredConstellation(constellation.id)}
                    />
                  )
                })}

                {/* Stars on mini map */}
                {visibleStars.map((star) => (
                  <div
                    key={`map-${star.id}`}
                    className="absolute w-2 h-2 rounded-full cursor-pointer border"
                    style={{
                      left: `${star.position.x}%`,
                      top: `${star.position.y}%`,
                      backgroundColor: discoveredStars.has(star.id) ? star.color : "#9CA3AF",
                      borderColor: discoveredStars.has(star.id) ? star.color : "#6B7280",
                      transform: "translate(-50%, -50%)",
                      boxShadow: discoveredStars.has(star.id) ? `0 0 6px ${star.color}` : "none",
                    }}
                    onClick={() => handleStarClick(star)}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {/* Progress indicator */}
          <div
            className={`absolute top-4 left-4 backdrop-blur-sm rounded-lg p-4 shadow-xl border ${
              cosmicView ? "bg-gray-900/90 border-gray-600 text-white" : "bg-white/90 border-gray-200 text-gray-900"
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <Star className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-medium">
                {discoveredStars.size} / {stars.length} stars
              </span>
            </div>
            <Progress value={(discoveredStars.size / stars.length) * 100} className="w-32 mb-2" />
            <div className="text-xs opacity-75">Score: {explorationScore}</div>
          </div>

          {/* Cosmic view indicator */}
          {cosmicView && (
            <div className="absolute top-4 right-4 bg-purple-500/20 backdrop-blur-sm rounded-lg p-3 border border-purple-400/30">
              <div className="flex items-center gap-2 text-purple-300">
                <Orbit className="h-4 w-4" />
                <span className="text-sm font-medium">Cosmic View Active</span>
              </div>
            </div>
          )}
        </div>

        {/* Constellation legend */}
        {showConstellations && (
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-purple-500" />
              Constellations
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {constellations.map((constellation) => {
                const completedStars = constellation.stars.filter((starId) => discoveredStars.has(starId))
                const progress = (completedStars.length / constellation.stars.length) * 100

                return (
                  <motion.div
                    key={constellation.id}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                      hoveredConstellation === constellation.id
                        ? "border-current shadow-lg scale-105"
                        : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                    }`}
                    style={{
                      borderColor: hoveredConstellation === constellation.id ? constellation.color : undefined,
                      backgroundColor:
                        hoveredConstellation === constellation.id ? constellation.color + "10" : undefined,
                    }}
                    whileHover={{ scale: 1.02 }}
                    onMouseEnter={() => setHoveredConstellation(constellation.id)}
                    onMouseLeave={() => setHoveredConstellation(null)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium" style={{ color: constellation.color }}>
                        {constellation.name}
                      </h4>
                      <Badge variant="outline" className="text-xs">
                        {completedStars.length}/{constellation.stars.length}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{constellation.description}</p>
                    <Progress value={progress} className="mb-2" />
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: constellation.color }} />
                      <span className="text-xs text-gray-500">{Math.round(progress)}% complete</span>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        )}

        {/* Achievement modal */}
        <AnimatePresence>
          {showAchievementModal && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAchievementModal(null)}
            >
              <motion.div
                className="bg-white dark:bg-gray-900 rounded-lg shadow-xl p-6 max-w-md w-full border"
                initial={{ scale: 0.8, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 20 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-center">
                  <motion.div
                    className="text-4xl mb-4"
                    animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                    transition={{ duration: 0.5 }}
                  >
                    {showAchievementModal.icon}
                  </motion.div>
                  <h3 className="text-xl font-bold mb-2">Achievement Unlocked!</h3>
                  <h4 className="text-lg font-medium text-yellow-600 mb-2">{showAchievementModal.title}</h4>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{showAchievementModal.description}</p>
                  <Button onClick={() => setShowAchievementModal(null)}>Continue Exploring</Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Star detail modal */}
        <AnimatePresence>
          {selectedStar && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedStar(null)}
            >
              <motion.div
                className="bg-white dark:bg-gray-900 rounded-lg shadow-xl overflow-hidden border max-w-2xl w-full max-h-[80vh] overflow-y-auto"
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 hover:bg-gray-200 dark:hover:bg-gray-700"
                  onClick={() => setSelectedStar(null)}
                >
                  <X size={20} />
                </button>

                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Star className="h-8 w-8" fill={selectedStar.color} style={{ color: selectedStar.color }} />
                    <div>
                      <h3 className="text-2xl font-bold">{selectedStar.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{selectedStar.date}</p>
                    </div>
                  </div>

                  <p className="text-gray-700 dark:text-gray-300 mb-6">{selectedStar.description}</p>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                      <div className="text-sm text-gray-500">Impact</div>
                      <div className="text-xl font-bold">{selectedStar.impact}/10</div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                      <div className="text-sm text-gray-500">Difficulty</div>
                      <div className="text-xl font-bold">{selectedStar.difficulty}/10</div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-medium mb-2">Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedStar.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-medium mb-2">Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedStar.tags.map((tag, index) => (
                        <Badge key={index} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {selectedStar.achievements && selectedStar.achievements.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2">Achievements</h4>
                      <div className="space-y-2">
                        {selectedStar.achievements.map((achievement, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 p-2 bg-green-50 dark:bg-green-900/20 rounded"
                          >
                            <Award className="h-4 w-4 text-green-600" />
                            <span className="text-sm">{achievement}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mission log */}
        <Card className="mt-12">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-4">Mission Log</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              My journey as a developer has been a cosmic adventure through various technologies, projects, and
              collaborations. Each star represents a significant milestone, connected by the constellations of growth
              and discovery.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <h4 className="font-medium text-blue-700 dark:text-blue-300 mb-2">Experience</h4>
                <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">5+ Years</p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                <h4 className="font-medium text-green-700 dark:text-green-300 mb-2">Projects</h4>
                <p className="text-2xl font-bold text-green-900 dark:text-green-100">50+</p>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                <h4 className="font-medium text-purple-700 dark:text-purple-300 mb-2">Technologies</h4>
                <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">20+</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
