"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from "framer-motion"
import {
  Star,
  X,
  MapPin,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  Award,
  Target,
  Telescope,
  Compass,
  Zap,
  Trophy,
  Sparkles,
  Eye,
  Navigation,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import { OrbitAnimation } from "@/components/orbit-animation"
import { useMobile } from "@/hooks/use-mobile"
import { useTheme } from "next-themes"

// Enhanced star data structure with more properties
interface StarEvent {
  id: string
  title: string
  date: string
  description: string
  category: "project" | "milestone" | "learning" | "collaboration" | "achievement"
  tags: string[]
  position: { x: number; y: number; z?: number }
  size: number
  brightness: number
  constellation?: string
  connections?: string[]
  image?: string
  impact: number // 1-10 scale
  difficulty: number // 1-10 scale
  duration: string
  skills: string[]
  achievements?: string[]
  hidden?: boolean
  unlockCondition?: string
  rarity: "common" | "rare" | "epic" | "legendary"
  animation?: "pulse" | "rotate" | "float" | "sparkle"
}

// Achievement system
interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  condition: (discoveredStars: Set<string>, stars: StarEvent[]) => boolean
  reward?: string
  unlocked: boolean
}

// Constellation data with enhanced properties
interface Constellation {
  id: string
  name: string
  description: string
  stars: string[]
  color: string
  story: string
  unlockReward?: string
  difficulty: number
}

// Particle system for cosmic effects
interface Particle {
  id: string
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  color: string
  type: "star" | "dust" | "nebula"
}

export function StarlogEnhanced() {
  const containerRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particleCanvasRef = useRef<HTMLCanvasElement>(null)
  const starsContainerRef = useRef<HTMLDivElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const isMobile = useMobile()
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  // Mouse position for parallax effects
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 })
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 })

  // Scroll animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  // Enhanced state management
  const [selectedStar, setSelectedStar] = useState<StarEvent | null>(null)
  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  const [showMiniMap, setShowMiniMap] = useState(false)
  const [discoveredStars, setDiscoveredStars] = useState<Set<string>>(new Set())
  const [activeConstellation, setActiveConstellation] = useState<string | null>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(false)
  const [autoPlay, setAutoPlay] = useState(false)
  const [zoomLevel, setZoomLevel] = useState<number[]>([1])
  const [showParticles, setShowParticles] = useState(true)
  const [guidedTour, setGuidedTour] = useState(false)
  const [currentTourStep, setCurrentTourStep] = useState(0)
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [particles, setParticles] = useState<Particle[]>([])
  const [showAchievementModal, setShowAchievementModal] = useState<Achievement | null>(null)
  const [explorationScore, setExplorationScore] = useState(0)
  const [timeSpent, setTimeSpent] = useState(0)

  // Enhanced star data with more detailed information
  const stars: StarEvent[] = [
    {
      id: "first-website",
      title: "First Website Launch",
      date: "January 2018",
      description:
        "Created my first professional website for a local business. This project ignited my passion for web development and design, marking the beginning of my journey into the digital cosmos.",
      category: "project",
      tags: ["HTML", "CSS", "JavaScript", "First Project"],
      position: { x: 25, y: 20, z: 0 },
      size: 1.5,
      brightness: 0.8,
      constellation: "beginnings",
      connections: ["coding-bootcamp"],
      image: "/placeholder.svg?height=400&width=600",
      impact: 7,
      difficulty: 3,
      duration: "2 weeks",
      skills: ["HTML", "CSS", "JavaScript", "Web Design"],
      achievements: ["First Client", "First Launch"],
      rarity: "common",
      animation: "pulse",
    },
    {
      id: "coding-bootcamp",
      title: "Coding Bootcamp Graduation",
      date: "March 2018",
      description:
        "Completed an intensive 12-week coding bootcamp that transformed my understanding of modern web development practices. This was my first formal training in software development.",
      category: "learning",
      tags: ["React", "Node.js", "MongoDB", "Education"],
      position: { x: 40, y: 35, z: 1 },
      size: 2,
      brightness: 0.9,
      constellation: "beginnings",
      connections: ["first-job"],
      image: "/placeholder.svg?height=400&width=600",
      impact: 9,
      difficulty: 8,
      duration: "12 weeks",
      skills: ["React", "Node.js", "MongoDB", "Express", "Git"],
      achievements: ["Bootcamp Graduate", "Full Stack Foundation"],
      rarity: "rare",
      animation: "sparkle",
    },
    {
      id: "first-job",
      title: "First Developer Role",
      date: "June 2018",
      description:
        "Joined a startup as a junior developer. This opportunity allowed me to work on real-world projects and collaborate with experienced developers in a fast-paced environment.",
      category: "milestone",
      tags: ["Career", "Frontend", "Team Work", "Startup"],
      position: { x: 60, y: 25, z: 0 },
      size: 2.5,
      brightness: 1,
      constellation: "career",
      connections: ["major-project"],
      image: "/placeholder.svg?height=400&width=600",
      impact: 10,
      difficulty: 7,
      duration: "1.5 years",
      skills: ["Professional Development", "Team Collaboration", "Agile", "Code Review"],
      achievements: ["First Job", "Team Player", "Professional Growth"],
      rarity: "epic",
      animation: "rotate",
    },
    {
      id: "major-project",
      title: "First Major Project Lead",
      date: "February 2019",
      description:
        "Led the development of a key client project, managing both the technical implementation and team coordination. This was my first experience as a technical lead.",
      category: "project",
      tags: ["Leadership", "React", "Project Management", "Client Work"],
      position: { x: 75, y: 40, z: 1 },
      size: 2.2,
      brightness: 0.95,
      constellation: "career",
      connections: ["tech-conference"],
      image: "/placeholder.svg?height=400&width=600",
      impact: 8,
      difficulty: 9,
      duration: "4 months",
      skills: ["Leadership", "Project Management", "React", "Team Coordination"],
      achievements: ["First Lead", "Project Success", "Client Satisfaction"],
      rarity: "epic",
      animation: "float",
    },
    {
      id: "tech-conference",
      title: "First Tech Conference Speaker",
      date: "May 2019",
      description:
        "Spoke at my first major tech conference about modern React patterns. The experience of sharing knowledge with the community was transformative.",
      category: "achievement",
      tags: ["Speaking", "Community", "React", "Knowledge Sharing"],
      position: { x: 85, y: 60, z: 2 },
      size: 1.8,
      brightness: 0.85,
      constellation: "growth",
      connections: ["open-source"],
      image: "/placeholder.svg?height=400&width=600",
      impact: 9,
      difficulty: 8,
      duration: "1 day",
      skills: ["Public Speaking", "Knowledge Sharing", "Community Building"],
      achievements: ["First Speaker", "Community Contributor", "Knowledge Sharer"],
      rarity: "legendary",
      animation: "sparkle",
    },
    {
      id: "open-source",
      title: "Major Open Source Contribution",
      date: "August 2019",
      description:
        "Made my first significant contribution to a popular open-source project. This experience taught me about collaborative development and code quality at scale.",
      category: "collaboration",
      tags: ["Open Source", "GitHub", "Community", "Collaboration"],
      position: { x: 65, y: 70, z: 1 },
      size: 1.7,
      brightness: 0.8,
      constellation: "growth",
      connections: ["freelance-start"],
      image: "/placeholder.svg?height=400&width=600",
      impact: 7,
      difficulty: 6,
      duration: "3 weeks",
      skills: ["Open Source", "Git", "Code Review", "Community Collaboration"],
      achievements: ["Open Source Contributor", "Code Quality", "Community Member"],
      rarity: "rare",
      animation: "pulse",
    },
    {
      id: "freelance-start",
      title: "Freelance Journey Begins",
      date: "January 2020",
      description:
        "Started taking on freelance projects alongside my full-time role. This side hustle allowed me to explore different technologies and business domains.",
      category: "milestone",
      tags: ["Freelance", "Entrepreneurship", "Client Work", "Side Hustle"],
      position: { x: 45, y: 65, z: 0 },
      size: 2.3,
      brightness: 0.9,
      constellation: "independence",
      connections: ["agency-collaboration"],
      image: "/placeholder.svg?height=400&width=600",
      impact: 8,
      difficulty: 7,
      duration: "Ongoing",
      skills: ["Client Management", "Business Development", "Time Management"],
      achievements: ["Entrepreneur", "Client Success", "Work-Life Balance"],
      rarity: "epic",
      animation: "rotate",
    },
    {
      id: "agency-collaboration",
      title: "Design Agency Partnership",
      date: "June 2020",
      description:
        "Partnered with a prestigious design agency on a series of high-profile projects. This collaboration enhanced my design sensibility and client communication skills.",
      category: "collaboration",
      tags: ["Agency Work", "Design", "Client Relations", "Partnership"],
      position: { x: 30, y: 80, z: 1 },
      size: 2,
      brightness: 0.85,
      constellation: "independence",
      connections: ["tech-stack-shift"],
      image: "/placeholder.svg?height=400&width=600",
      impact: 8,
      difficulty: 6,
      duration: "8 months",
      skills: ["Design Collaboration", "Client Communication", "High-End Projects"],
      achievements: ["Agency Partner", "Design Excellence", "Premium Clients"],
      rarity: "epic",
      animation: "float",
    },
    {
      id: "tech-stack-shift",
      title: "Technology Stack Evolution",
      date: "November 2020",
      description:
        "Transitioned my focus to a modern technology stack, embracing TypeScript, Next.js, and cloud-native solutions. This shift marked a new phase in my technical expertise.",
      category: "learning",
      tags: ["TypeScript", "Next.js", "Cloud", "Modern Stack"],
      position: { x: 15, y: 60, z: 2 },
      size: 2.1,
      brightness: 0.9,
      constellation: "mastery",
      connections: ["mentorship"],
      image: "/placeholder.svg?height=400&width=600",
      impact: 9,
      difficulty: 8,
      duration: "6 months",
      skills: ["TypeScript", "Next.js", "Cloud Architecture", "Modern Practices"],
      achievements: ["Tech Evolution", "Modern Stack Master", "Cloud Native"],
      rarity: "legendary",
      animation: "sparkle",
    },
    {
      id: "mentorship",
      title: "Mentorship Program Launch",
      date: "February 2021",
      description:
        "Launched a mentorship program for junior developers. Teaching and guiding others has been one of the most rewarding aspects of my career journey.",
      category: "achievement",
      tags: ["Mentorship", "Leadership", "Community", "Teaching"],
      position: { x: 10, y: 40, z: 1 },
      size: 2.4,
      brightness: 0.95,
      constellation: "mastery",
      connections: ["current-focus"],
      image: "/placeholder.svg?height=400&width=600",
      impact: 10,
      difficulty: 7,
      duration: "Ongoing",
      skills: ["Mentorship", "Teaching", "Leadership", "Community Building"],
      achievements: ["Mentor", "Community Leader", "Knowledge Multiplier"],
      rarity: "legendary",
      animation: "pulse",
    },
    {
      id: "current-focus",
      title: "Current Exploration",
      date: "Present",
      description:
        "Currently focused on advanced frontend architectures, AI integration, and creating immersive web experiences. The future holds infinite possibilities.",
      category: "learning",
      tags: ["AI", "Advanced Architecture", "Innovation", "Future"],
      position: { x: 20, y: 15, z: 3 },
      size: 3,
      brightness: 1,
      constellation: "future",
      image: "/placeholder.svg?height=400&width=600",
      impact: 10,
      difficulty: 10,
      duration: "Ongoing",
      skills: ["AI Integration", "Advanced Architecture", "Innovation", "Future Tech"],
      achievements: ["Innovation Leader", "Future Builder", "Tech Pioneer"],
      rarity: "legendary",
      animation: "sparkle",
    },
    // Hidden/Secret stars
    {
      id: "secret-passion",
      title: "Astrophotography Discovery",
      date: "Timeless",
      description:
        "My secret passion for astrophotography has deeply influenced my approach to design and development. The cosmos provides endless inspiration.",
      category: "achievement",
      tags: ["Personal", "Astronomy", "Photography", "Inspiration"],
      position: { x: 50, y: 50, z: 4 },
      size: 1.2,
      brightness: 0.7,
      image: "/placeholder.svg?height=400&width=600",
      impact: 10,
      difficulty: 5,
      duration: "Lifelong",
      skills: ["Photography", "Astronomy", "Patience", "Observation"],
      achievements: ["Stargazer", "Hidden Passion", "Cosmic Inspiration"],
      hidden: true,
      unlockCondition: "Discover all constellation stars",
      rarity: "legendary",
      animation: "sparkle",
    },
    {
      id: "easter-egg",
      title: "The Developer's Secret",
      date: "???",
      description:
        "Sometimes the best code is written at 3 AM with nothing but coffee and cosmic inspiration. This star represents all those late-night coding sessions.",
      category: "achievement",
      tags: ["Secret", "Late Night", "Coffee", "Dedication"],
      position: { x: 90, y: 10, z: 5 },
      size: 0.8,
      brightness: 0.5,
      image: "/placeholder.svg?height=400&width=600",
      impact: 8,
      difficulty: 3,
      duration: "Countless hours",
      skills: ["Dedication", "Problem Solving", "Persistence", "Coffee Brewing"],
      achievements: ["Night Owl", "Coffee Master", "Dedication Award"],
      hidden: true,
      unlockCondition: "Spend 10 minutes exploring",
      rarity: "legendary",
      animation: "pulse",
    },
  ]

  // Enhanced constellation data
  const constellations: Constellation[] = [
    {
      id: "beginnings",
      name: "The Genesis",
      description: "The beginning of my journey into the world of web development.",
      stars: ["first-website", "coding-bootcamp"],
      color: "#4F46E5",
      story:
        "Every great journey begins with a single step. These stars represent my first steps into the vast universe of web development.",
      difficulty: 1,
    },
    {
      id: "career",
      name: "The Professional Path",
      description: "Key milestones in my professional career development.",
      stars: ["first-job", "major-project"],
      color: "#0EA5E9",
      story:
        "The transition from learning to doing, from student to professional. These stars mark the beginning of my career trajectory.",
      difficulty: 2,
    },
    {
      id: "growth",
      name: "The Explorer",
      description: "Periods of significant learning and community engagement.",
      stars: ["tech-conference", "open-source"],
      color: "#10B981",
      story:
        "Growth comes from sharing knowledge and contributing to the community. These stars represent my expansion beyond individual work.",
      difficulty: 3,
    },
    {
      id: "independence",
      name: "The Freelancer",
      description: "My journey into independent work and agency collaborations.",
      stars: ["freelance-start", "agency-collaboration"],
      color: "#F59E0B",
      story: "The courage to venture out on my own, building relationships and creating value independently.",
      difficulty: 4,
    },
    {
      id: "mastery",
      name: "The Craftsman",
      description: "Deepening expertise and giving back to the community.",
      stars: ["tech-stack-shift", "mentorship"],
      color: "#EC4899",
      story: "True mastery comes not just from knowing, but from teaching and evolving with the craft.",
      difficulty: 5,
    },
    {
      id: "future",
      name: "The Horizon",
      description: "Current focus and future aspirations.",
      stars: ["current-focus"],
      color: "#8B5CF6",
      story: "The journey continues toward new frontiers, always reaching for the next star.",
      difficulty: 6,
    },
  ]

  // Achievement definitions
  const achievementDefinitions: Achievement[] = [
    {
      id: "first-discovery",
      title: "First Contact",
      description: "Discover your first star",
      icon: "🌟",
      condition: (discovered) => discovered.size >= 1,
      unlocked: false,
    },
    {
      id: "constellation-master",
      title: "Constellation Master",
      description: "Complete all constellations",
      icon: "🌌",
      condition: (discovered, stars) => {
        const constellationStars = constellations.flatMap((c) => c.stars)
        return constellationStars.every((starId) => discovered.has(starId))
      },
      reward: "Unlock secret star",
      unlocked: false,
    },
    {
      id: "explorer",
      title: "Cosmic Explorer",
      description: "Discover 50% of all stars",
      icon: "🚀",
      condition: (discovered, stars) => discovered.size >= Math.floor(stars.length * 0.5),
      unlocked: false,
    },
    {
      id: "completionist",
      title: "Star Collector",
      description: "Discover all visible stars",
      icon: "🏆",
      condition: (discovered, stars) => {
        const visibleStars = stars.filter((s) => !s.hidden)
        return visibleStars.every((star) => discovered.has(star.id))
      },
      reward: "Unlock hidden stars",
      unlocked: false,
    },
    {
      id: "time-traveler",
      title: "Time Traveler",
      description: "Spend 5 minutes exploring the starlog",
      icon: "⏰",
      condition: () => timeSpent >= 300, // 5 minutes in seconds
      unlocked: false,
    },
    {
      id: "secret-keeper",
      title: "Secret Keeper",
      description: "Discover all hidden stars",
      icon: "🔮",
      condition: (discovered, stars) => {
        const hiddenStars = stars.filter((s) => s.hidden)
        return hiddenStars.every((star) => discovered.has(star.id))
      },
      unlocked: false,
    },
  ]

  // Initialize achievements on mount
  useEffect(() => {
    setAchievements(achievementDefinitions.map((def) => ({ ...def, unlocked: false })))
  }, [])

  // Initialize particles
  useEffect(() => {
    if (!showParticles) return

    const generateParticles = () => {
      const newParticles: Particle[] = []

      // Generate cosmic dust
      for (let i = 0; i < 50; i++) {
        newParticles.push({
          id: `dust-${i}`,
          x: Math.random() * 100,
          y: Math.random() * 100,
          vx: (Math.random() - 0.5) * 0.1,
          vy: (Math.random() - 0.5) * 0.1,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.2,
          color: isDark ? "#ffffff" : "#000000",
          type: "dust",
        })
      }

      // Generate floating stars
      for (let i = 0; i < 20; i++) {
        newParticles.push({
          id: `star-${i}`,
          x: Math.random() * 100,
          y: Math.random() * 100,
          vx: (Math.random() - 0.5) * 0.05,
          vy: (Math.random() - 0.5) * 0.05,
          size: Math.random() * 3 + 2,
          opacity: Math.random() * 0.8 + 0.2,
          color: ["#4F46E5", "#0EA5E9", "#10B981", "#F59E0B", "#EC4899", "#8B5CF6"][Math.floor(Math.random() * 6)],
          type: "star",
        })
      }

      setParticles(newParticles)
    }

    generateParticles()
  }, [showParticles, isDark])

  // Animate particles
  useEffect(() => {
    if (!showParticles || particles.length === 0) return

    const animateParticles = () => {
      setParticles((prev) =>
        prev.map((particle) => ({
          ...particle,
          x: (particle.x + particle.vx + 100) % 100,
          y: (particle.y + particle.vy + 100) % 100,
          opacity: particle.type === "star" ? Math.sin(Date.now() * 0.001 + particle.x) * 0.3 + 0.7 : particle.opacity,
        })),
      )
    }

    const interval = setInterval(animateParticles, 50)
    return () => clearInterval(interval)
  }, [particles.length, showParticles])

  // Track time spent
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeSpent((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  // Mouse tracking for parallax
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height

      mouseX.set((x - 0.5) * 20)
      mouseY.set((y - 0.5) * 20)
    },
    [mouseX, mouseY],
  )

  useEffect(() => {
    if (isMobile) return

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [handleMouseMove, isMobile])

  // Check achievements
  useEffect(() => {
    // Don't run this effect if achievements aren't initialized yet
    if (achievements.length === 0) return

    let shouldUpdate = false
    const updatedAchievements = achievements.map((achievement) => {
      const isUnlocked = achievement.condition(discoveredStars, stars)

      // Only show notification if this is a new unlock
      if (!achievement.unlocked && isUnlocked) {
        // Show achievement notification
        setShowAchievementModal({ ...achievement, unlocked: true })

        // Play sound if enabled
        if (soundEnabled && audioRef.current) {
          audioRef.current.play().catch(() => {})
        }

        shouldUpdate = true
      }

      return isUnlocked !== achievement.unlocked ? { ...achievement, unlocked: isUnlocked } : achievement
    })

    // Only update state if something changed
    if (shouldUpdate) {
      setAchievements(updatedAchievements)
    }
  }, [discoveredStars, timeSpent, soundEnabled, stars])

  // Auto-play guided tour
  useEffect(() => {
    if (!autoPlay || !guidedTour) return

    const tourStars = stars
      .filter((s) => !s.hidden)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

    if (currentTourStep >= tourStars.length) {
      setGuidedTour(false)
      setCurrentTourStep(0)
      return
    }

    const timer = setTimeout(() => {
      const currentStar = tourStars[currentTourStep]
      handleStarClick(currentStar)
      setCurrentTourStep((prev) => prev + 1)
    }, 3000)

    return () => clearTimeout(timer)
  }, [autoPlay, guidedTour, currentTourStep])

  // Enhanced star click handler
  const handleStarClick = (star: StarEvent) => {
    setSelectedStar(star)
    setDiscoveredStars((prev) => new Set(prev).add(star.id))
    setExplorationScore((prev) => prev + star.impact * 10)

    // Play sound effect
    if (soundEnabled && audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.play().catch(() => {})
    }

    // Check for hidden star unlocks
    if (star.id === "secret-passion" && !discoveredStars.has("secret-passion")) {
      // Unlock secret passion star
      setTimeout(() => {
        setShowAchievementModal({
          id: "secret-unlock",
          title: "Hidden Passion Revealed",
          description: "You've discovered the secret of cosmic inspiration",
          icon: "🔭",
          condition: () => true,
          unlocked: true,
        })
      }, 1000)
    }
  }

  // Enhanced filtering
  const filterStars = (category: string | null) => {
    setActiveFilter(category)
    setActiveConstellation(null)
  }

  const highlightConstellation = (constellationId: string | null) => {
    setActiveConstellation(constellationId)
    setActiveFilter(null)
  }

  // Calculate visible stars with enhanced logic
  const visibleStars = stars.filter((star) => {
    // Handle hidden stars with unlock conditions
    if (star.hidden) {
      if (star.unlockCondition === "Discover all constellation stars") {
        const constellationStars = constellations.flatMap((c) => c.stars)
        const allConstellationStarsDiscovered = constellationStars.every((starId) => discoveredStars.has(starId))
        if (!allConstellationStarsDiscovered) return false
      }

      if (star.unlockCondition === "Spend 10 minutes exploring" && timeSpent < 600) {
        return false
      }
    }

    // Apply filters
    if (activeFilter && star.category !== activeFilter) return false
    if (activeConstellation && !star.constellation?.includes(activeConstellation)) return false

    return true
  })

  // Enhanced fullscreen toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  // Guided tour functions
  const startGuidedTour = () => {
    setGuidedTour(true)
    setCurrentTourStep(0)
    setAutoPlay(true)
  }

  const stopGuidedTour = () => {
    setGuidedTour(false)
    setAutoPlay(false)
    setCurrentTourStep(0)
  }

  return (
    <section id="starlog" ref={containerRef} className="py-20 min-h-screen relative overflow-hidden">
      {/* Hidden audio element for sound effects */}
      <audio ref={audioRef} preload="auto">
        <source src="/sounds/star-click.mp3" type="audio/mpeg" />
      </audio>

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="section-heading">Enhanced Starlog</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mb-12">
            An immersive cosmic journey through my professional development. Discover stars, unlock achievements, and
            explore the constellations of my career.
          </p>
        </motion.div>

        {/* Enhanced controls */}
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
              <Eye className="h-4 w-4 mr-1" />
              All Stars
            </Button>
            <Button
              variant={activeFilter === "project" ? "default" : "outline"}
              size="sm"
              onClick={() => filterStars("project")}
            >
              <Target className="h-4 w-4 mr-1" />
              Projects
            </Button>
            <Button
              variant={activeFilter === "milestone" ? "default" : "outline"}
              size="sm"
              onClick={() => filterStars("milestone")}
            >
              <Trophy className="h-4 w-4 mr-1" />
              Milestones
            </Button>
            <Button
              variant={activeFilter === "learning" ? "default" : "outline"}
              size="sm"
              onClick={() => filterStars("learning")}
            >
              <Telescope className="h-4 w-4 mr-1" />
              Learning
            </Button>
            <Button
              variant={activeFilter === "collaboration" ? "default" : "outline"}
              size="sm"
              onClick={() => filterStars("collaboration")}
            >
              <Sparkles className="h-4 w-4 mr-1" />
              Collaborations
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setSoundEnabled(!soundEnabled)}>
              {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </Button>
            <Button variant="outline" size="sm" onClick={() => setShowMiniMap(!showMiniMap)}>
              <MapPin className="h-4 w-4 mr-1" />
              {showMiniMap ? "Hide" : "Show"} Map
            </Button>
            <Button variant="outline" size="sm" onClick={toggleFullscreen}>
              {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
            </Button>
          </div>
        </motion.div>

        {/* Advanced settings panel */}
        <motion.div
          className="mb-8 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium">Zoom:</label>
                <Slider
                  defaultValue={[1]}
                  onValueChange={(value) => {
                    if (JSON.stringify(value) !== JSON.stringify(zoomLevel)) {
                      setZoomLevel(value)
                    }
                  }}
                  max={3}
                  min={0.5}
                  step={0.1}
                  className="w-20"
                />
              </div>

              <div className="flex items-center gap-2">
                <label className="text-sm font-medium">Particles:</label>
                <Switch checked={showParticles} onCheckedChange={setShowParticles} />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant={guidedTour ? "default" : "outline"}
                size="sm"
                onClick={guidedTour ? stopGuidedTour : startGuidedTour}
              >
                <Navigation className="h-4 w-4 mr-1" />
                {guidedTour ? "Stop Tour" : "Guided Tour"}
              </Button>

              <div className="flex items-center gap-2">
                <label className="text-sm font-medium">Auto-play:</label>
                <Switch checked={autoPlay} onCheckedChange={setAutoPlay} disabled={!guidedTour} />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats dashboard */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
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
        </motion.div>

        {/* Enhanced star map */}
        <motion.div
          className="relative bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4 h-[600px] mb-8 overflow-hidden"
          style={{
            backgroundImage: isDark
              ? "radial-gradient(circle at 50% 50%, rgba(30, 41, 59, 0.5) 0%, rgba(15, 23, 42, 0.8) 100%)"
              : "radial-gradient(circle at 50% 50%, rgba(248, 250, 252, 0.8) 0%, rgba(241, 245, 249, 0.9) 100%)",
            transform: `scale(${zoomLevel[0]})`,
            transformOrigin: "center",
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          ref={starsContainerRef}
        >
          {/* Particle system */}
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
                    opacity: particle.opacity,
                    filter: particle.type === "star" ? "blur(0.5px)" : "blur(1px)",
                  }}
                  animate={{
                    x: springX,
                    y: springY,
                  }}
                />
              ))}
            </div>
          )}

          {/* Canvas for constellation lines */}
          <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full pointer-events-none" />

          {/* Enhanced stars */}
          {visibleStars.map((star) => (
            <motion.div
              key={star.id}
              className="absolute cursor-pointer group"
              style={{
                left: `${star.position.x}%`,
                top: `${star.position.y}%`,
                zIndex: selectedStar?.id === star.id ? 20 : 10 + (star.position.z || 0),
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: activeConstellation && !star.constellation?.includes(activeConstellation) ? 0.3 : 1,
                scale: 1,
                x: springX,
                y: springY,
              }}
              transition={{ duration: 0.5, delay: Math.random() * 0.5 }}
              whileHover={{ scale: 1.3, z: 50 }}
              whileTap={{ scale: 0.9 }}
            >
              <div className="relative" onClick={() => handleStarClick(star)}>
                {/* Enhanced star glow effect */}
                <motion.div
                  className="absolute rounded-full"
                  style={{
                    width: `${star.size * 40}px`,
                    height: `${star.size * 40}px`,
                    backgroundColor: star.constellation
                      ? constellations.find((c) => c.id === star.constellation)?.color || "#4F46E5"
                      : "#4F46E5",
                    top: `${-star.size * 20 + 10}px`,
                    left: `${-star.size * 20 + 10}px`,
                    filter: "blur(12px)",
                  }}
                  animate={{
                    opacity: [star.brightness * 0.2, star.brightness * 0.4, star.brightness * 0.2],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />

                {/* Rarity indicator */}
                {star.rarity === "legendary" && (
                  <motion.div
                    className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500"
                    animate={{
                      rotate: [0, 360],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                  />
                )}

                {/* Enhanced star icon with animations */}
                <motion.div
                  animate={
                    star.animation === "rotate"
                      ? { rotate: [0, 360] }
                      : star.animation === "float"
                        ? { y: [-2, 2, -2] }
                        : star.animation === "sparkle"
                          ? { scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }
                          : { scale: [1, 1.1, 1] }
                  }
                  transition={{
                    duration: star.animation === "rotate" ? 10 : 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                >
                  <Star
                    className={`
                      ${discoveredStars.has(star.id) ? "text-white dark:text-white" : "text-gray-400 dark:text-gray-600"}
                      ${star.hidden ? "text-purple-400" : ""}
                      transition-all duration-300 group-hover:drop-shadow-lg
                    `}
                    fill={
                      discoveredStars.has(star.id)
                        ? star.constellation
                          ? constellations.find((c) => c.id === star.constellation)?.color || "#4F46E5"
                          : "#4F46E5"
                        : "none"
                    }
                    size={star.size * 24}
                    strokeWidth={1.5}
                  />
                </motion.div>

                {/* Enhanced star label */}
                <motion.div
                  className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none"
                  initial={{ y: 10 }}
                  whileHover={{ y: 0 }}
                >
                  <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg border border-gray-200 dark:border-gray-700">
                    <div className="text-sm font-medium">{star.title}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{star.date}</div>
                    <div className="flex items-center gap-1 mt-1">
                      <Badge variant="secondary" className="text-xs capitalize">
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
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}

          {/* Enhanced mini map */}
          {showMiniMap && (
            <motion.div
              className="absolute bottom-4 right-4 w-64 h-48 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-lg shadow-xl p-3 border border-gray-200 dark:border-gray-700"
              initial={{ opacity: 0, scale: 0.8, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.8, x: 20 }}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium">Cosmic Map</h4>
                <Button variant="ghost" size="sm" onClick={() => setShowMiniMap(false)} className="h-6 w-6 p-0">
                  <X className="h-3 w-3" />
                </Button>
              </div>

              <div className="relative w-full h-[calc(100%-32px)] rounded bg-gradient-to-br from-indigo-900/20 to-purple-900/20 dark:from-indigo-900/40 dark:to-purple-900/40 overflow-hidden">
                {/* Constellation areas */}
                {constellations.map((constellation) => (
                  <div
                    key={`map-constellation-${constellation.id}`}
                    className="absolute rounded-full opacity-20"
                    style={{
                      backgroundColor: constellation.color,
                      left: `${
                        Math.min(
                          ...constellation.stars.map((starId) => {
                            const star = stars.find((s) => s.id === starId)
                            return star ? star.position.x : 0
                          }),
                        ) - 5
                      }%`,
                      top: `${
                        Math.min(
                          ...constellation.stars.map((starId) => {
                            const star = stars.find((s) => s.id === starId)
                            return star ? star.position.y : 0
                          }),
                        ) - 5
                      }%`,
                      width: `${
                        Math.max(
                          ...constellation.stars.map((starId) => {
                            const star = stars.find((s) => s.id === starId)
                            return star ? star.position.x : 0
                          }),
                        ) -
                        Math.min(
                          ...constellation.stars.map((starId) => {
                            const star = stars.find((s) => s.id === starId)
                            return star ? star.position.x : 0
                          }),
                        ) +
                        10
                      }%`,
                      height: `${
                        Math.max(
                          ...constellation.stars.map((starId) => {
                            const star = stars.find((s) => s.id === starId)
                            return star ? star.position.y : 0
                          }),
                        ) -
                        Math.min(
                          ...constellation.stars.map((starId) => {
                            const star = stars.find((s) => s.id === starId)
                            return star ? star.position.y : 0
                          }),
                        ) +
                        10
                      }%`,
                    }}
                  />
                ))}

                {/* Stars on mini map */}
                {stars.map((star) => (
                  <motion.div
                    key={`map-${star.id}`}
                    className={`absolute w-2 h-2 rounded-full cursor-pointer ${
                      discoveredStars.has(star.id)
                        ? star.hidden
                          ? "bg-purple-400 shadow-purple-400/50"
                          : "bg-teal-400 shadow-teal-400/50"
                        : "bg-gray-400 dark:bg-gray-600"
                    } shadow-sm`}
                    style={{
                      left: `${star.position.x}%`,
                      top: `${star.position.y}%`,
                      transform: "translate(-50%, -50%)",
                      boxShadow: discoveredStars.has(star.id) ? `0 0 8px currentColor` : "none",
                    }}
                    whileHover={{ scale: 1.5 }}
                    onClick={() => handleStarClick(star)}
                    animate={selectedStar?.id === star.id ? { scale: [1, 1.5, 1], opacity: [1, 0.7, 1] } : {}}
                    transition={{ duration: 1, repeat: selectedStar?.id === star.id ? Number.POSITIVE_INFINITY : 0 }}
                  />
                ))}

                {/* Current view indicator */}
                <div className="absolute inset-2 border-2 border-teal-400/50 rounded pointer-events-none" />
              </div>
            </motion.div>
          )}

          {/* Enhanced progress indicator */}
          <motion.div
            className="absolute top-4 left-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-gray-200 dark:border-gray-700"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Star className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-medium">
                {discoveredStars.size} / {stars.length} stars discovered
              </span>
            </div>
            <Progress value={(discoveredStars.size / stars.length) * 100} className="w-32" />

            <div className="flex items-center gap-2 mt-2">
              <Trophy className="h-4 w-4 text-orange-500" />
              <span className="text-sm font-medium">
                {achievements.filter((a) => a.unlocked).length} / {achievements.length} achievements
              </span>
            </div>
            <Progress
              value={(achievements.filter((a) => a.unlocked).length / achievements.length) * 100}
              className="w-32"
            />
          </motion.div>

          {/* Guided tour indicator */}
          {guidedTour && (
            <motion.div
              className="absolute top-4 right-4 bg-blue-500 text-white rounded-lg p-3 shadow-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="flex items-center gap-2">
                <Navigation className="h-4 w-4" />
                <span className="text-sm font-medium">Guided Tour Active</span>
              </div>
              <div className="text-xs mt-1">
                Step {currentTourStep + 1} of {stars.filter((s) => !s.hidden).length}
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Achievement notification modal */}
        <AnimatePresence>
          {showAchievementModal && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAchievementModal(null)}
            >
              <motion.div
                className="bg-white dark:bg-gray-900 rounded-lg shadow-xl p-6 max-w-md w-full border border-gray-200 dark:border-gray-700"
                initial={{ scale: 0.8, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 20 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-center">
                  <div className="text-4xl mb-4">{showAchievementModal.icon}</div>
                  <h3 className="text-xl font-bold mb-2">Achievement Unlocked!</h3>
                  <h4 className="text-lg font-medium text-yellow-600 dark:text-yellow-400 mb-2">
                    {showAchievementModal.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{showAchievementModal.description}</p>
                  {showAchievementModal.reward && (
                    <p className="text-sm text-blue-600 dark:text-blue-400 mb-4">
                      Reward: {showAchievementModal.reward}
                    </p>
                  )}
                  <Button onClick={() => setShowAchievementModal(null)}>Continue Exploring</Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enhanced star detail modal - keeping the existing modal but with enhancements */}
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
                className="relative w-full max-w-4xl bg-white dark:bg-gray-900 rounded-lg shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700"
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close button */}
                <button
                  className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  onClick={() => setSelectedStar(null)}
                >
                  <X size={20} />
                </button>

                {/* Enhanced image section */}
                <div className="relative h-64 sm:h-80 w-full">
                  <Image
                    src={selectedStar.image || "/placeholder.svg?height=400&width=600"}
                    alt={selectedStar.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Floating badges */}
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    <Badge
                      className="capitalize backdrop-blur-sm"
                      style={{
                        backgroundColor: selectedStar.constellation
                          ? constellations.find((c) => c.id === selectedStar.constellation)?.color + "CC"
                          : undefined,
                      }}
                    >
                      {selectedStar.category}
                    </Badge>
                    <Badge
                      variant="outline"
                      className={`backdrop-blur-sm border-white/30 text-white ${
                        selectedStar.rarity === "legendary"
                          ? "bg-yellow-500/20"
                          : selectedStar.rarity === "epic"
                            ? "bg-purple-500/20"
                            : selectedStar.rarity === "rare"
                              ? "bg-blue-500/20"
                              : "bg-gray-500/20"
                      }`}
                    >
                      {selectedStar.rarity}
                    </Badge>
                    {selectedStar.constellation && (
                      <Badge variant="outline" className="border-white/30 text-white backdrop-blur-sm">
                        {constellations.find((c) => c.id === selectedStar.constellation)?.name}
                      </Badge>
                    )}
                  </div>

                  {/* Title and date overlay */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-white text-3xl font-bold mb-2">{selectedStar.title}</h3>
                    <div className="flex items-center gap-4 text-white/80">
                      <span className="text-lg">{selectedStar.date}</span>
                      <span className="text-sm">Duration: {selectedStar.duration}</span>
                    </div>
                  </div>
                </div>

                {/* Enhanced content */}
                <div className="p-6">
                  <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="overview">Overview</TabsTrigger>
                      <TabsTrigger value="skills">Skills</TabsTrigger>
                      <TabsTrigger value="achievements">Achievements</TabsTrigger>
                      <TabsTrigger value="connections">Connections</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="mt-6 space-y-4">
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{selectedStar.description}</p>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3">
                          <div className="text-sm text-gray-500 dark:text-gray-400">Impact</div>
                          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                            {selectedStar.impact}/10
                          </div>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3">
                          <div className="text-sm text-gray-500 dark:text-gray-400">Difficulty</div>
                          <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                            {selectedStar.difficulty}/10
                          </div>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3">
                          <div className="text-sm text-gray-500 dark:text-gray-400">Category</div>
                          <div className="text-lg font-medium capitalize">{selectedStar.category}</div>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3">
                          <div className="text-sm text-gray-500 dark:text-gray-400">Rarity</div>
                          <div
                            className={`text-lg font-medium capitalize ${
                              selectedStar.rarity === "legendary"
                                ? "text-yellow-600"
                                : selectedStar.rarity === "epic"
                                  ? "text-purple-600"
                                  : selectedStar.rarity === "rare"
                                    ? "text-blue-600"
                                    : "text-gray-600"
                            }`}
                          >
                            {selectedStar.rarity}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {selectedStar.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="capitalize">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="skills" className="mt-6 space-y-4">
                      <h4 className="font-medium mb-3">Skills Developed</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {selectedStar.skills.map((skill, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
                          >
                            <Zap className="h-4 w-4 text-yellow-500" />
                            <span className="font-medium">{skill}</span>
                          </div>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="achievements" className="mt-6 space-y-4">
                      <h4 className="font-medium mb-3">Achievements Unlocked</h4>
                      <div className="space-y-2">
                        {selectedStar.achievements?.map((achievement, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
                          >
                            <Award className="h-5 w-5 text-orange-500" />
                            <span className="font-medium">{achievement}</span>
                          </div>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="connections" className="mt-6 space-y-4">
                      <h4 className="font-medium mb-3">Connected Events</h4>
                      {selectedStar.connections && selectedStar.connections.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {selectedStar.connections.map((connectionId) => {
                            const connectedStar = stars.find((s) => s.id === connectionId)
                            if (!connectedStar) return null

                            return (
                              <motion.div
                                key={connectionId}
                                className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                                whileHover={{ scale: 1.02 }}
                                onClick={() => setSelectedStar(connectedStar)}
                              >
                                <div className="flex items-center gap-2 mb-2">
                                  <Star className="h-4 w-4 text-teal-500" />
                                  <span className="font-medium">{connectedStar.title}</span>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{connectedStar.date}</p>
                              </motion.div>
                            )
                          })}
                        </div>
                      ) : (
                        <p className="text-gray-500 dark:text-gray-400">No connected events</p>
                      )}
                    </TabsContent>
                  </Tabs>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enhanced constellations section */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-500" />
            Constellations of Growth
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {constellations.map((constellation) => {
              const completedStars = constellation.stars.filter((starId) => discoveredStars.has(starId))
              const progress = (completedStars.length / constellation.stars.length) * 100

              return (
                <motion.div
                  key={constellation.id}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                    activeConstellation === constellation.id
                      ? "border-current shadow-lg"
                      : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                  }`}
                  style={{
                    borderColor: activeConstellation === constellation.id ? constellation.color : undefined,
                    backgroundColor: activeConstellation === constellation.id ? constellation.color + "10" : undefined,
                  }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() =>
                    highlightConstellation(activeConstellation === constellation.id ? null : constellation.id)
                  }
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

                  <p className="text-xs text-gray-500 dark:text-gray-500">{constellation.story}</p>

                  {progress === 100 && constellation.unlockReward && (
                    <div className="mt-2 p-2 bg-green-50 dark:bg-green-900/20 rounded text-xs text-green-700 dark:text-green-400">
                      🎉 {constellation.unlockReward}
                    </div>
                  )}
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Enhanced mission log */}
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
                <motion.span
                  className="inline-block w-3 h-3 rounded-full bg-teal-500"
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                />
                Enhanced Mission Log
              </h3>

              <Tabs defaultValue="journey">
                <TabsList className="mb-4">
                  <TabsTrigger value="journey">Journey</TabsTrigger>
                  <TabsTrigger value="discoveries">Discoveries</TabsTrigger>
                  <TabsTrigger value="achievements">Achievements</TabsTrigger>
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

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-4">
                      <h4 className="font-medium text-blue-700 dark:text-blue-300 mb-2">Total Experience</h4>
                      <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">5+ Years</p>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-4">
                      <h4 className="font-medium text-green-700 dark:text-green-300 mb-2">Projects Completed</h4>
                      <p className="text-2xl font-bold text-green-900 dark:text-green-100">50+</p>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 rounded-lg p-4">
                      <h4 className="font-medium text-purple-700 dark:text-purple-300 mb-2">Technologies Mastered</h4>
                      <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">20+</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="discoveries" className="space-y-4">
                  <p className="text-gray-700 dark:text-gray-300">
                    Explore the star map to discover key moments in my development journey. Each star represents a
                    significant milestone, project, learning experience, or collaboration.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                      <h4 className="font-medium mb-3 flex items-center gap-2">
                        <Star className="h-4 w-4 text-teal-500" />
                        Recently Discovered
                      </h4>
                      <div className="space-y-2">
                        {[...discoveredStars].slice(-5).map((id) => {
                          const star = stars.find((s) => s.id === id)
                          if (!star) return null

                          return (
                            <motion.div
                              key={id}
                              className="flex items-center gap-2 text-sm p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700/50 cursor-pointer"
                              whileHover={{ x: 4 }}
                              onClick={() => handleStarClick(star)}
                            >
                              <Star className="h-3 w-3 text-teal-500" fill="currentColor" />
                              <span className="font-medium">{star.title}</span>
                              <Badge variant="outline" className="ml-auto text-xs">
                                {star.date}
                              </Badge>
                            </motion.div>
                          )
                        })}
                      </div>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                      <h4 className="font-medium mb-3 flex items-center gap-2">
                        <Telescope className="h-4 w-4 text-purple-500" />
                        Exploration Progress
                      </h4>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Stars Discovered</span>
                            <span>
                              {discoveredStars.size}/{stars.length}
                            </span>
                          </div>
                          <Progress value={(discoveredStars.size / stars.length) * 100} />
                        </div>

                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Exploration Score</span>
                            <span>{explorationScore}</span>
                          </div>
                          <Progress value={Math.min((explorationScore / 1000) * 100, 100)} />
                        </div>

                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Time Exploring</span>
                            <span>
                              {Math.floor(timeSpent / 60)}m {timeSpent % 60}s
                            </span>
                          </div>
                          <Progress value={Math.min((timeSpent / 600) * 100, 100)} />
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="achievements" className="space-y-4">
                  <p className="text-gray-700 dark:text-gray-300">
                    Track your exploration achievements and unlock special rewards as you discover more about my
                    journey.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {achievements.map((achievement) => (
                      <motion.div
                        key={achievement.id}
                        className={`p-4 rounded-lg border-2 ${
                          achievement.unlocked
                            ? "border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20"
                            : "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50"
                        }`}
                        initial={{ opacity: 0.5 }}
                        animate={{ opacity: achievement.unlocked ? 1 : 0.5 }}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-2xl">{achievement.icon}</span>
                          <div>
                            <h4
                              className={`font-medium ${
                                achievement.unlocked
                                  ? "text-green-700 dark:text-green-300"
                                  : "text-gray-600 dark:text-gray-400"
                              }`}
                            >
                              {achievement.title}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{achievement.description}</p>
                          </div>
                        </div>

                        {achievement.unlocked && achievement.reward && (
                          <div className="text-xs text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 rounded px-2 py-1">
                            🎁 {achievement.reward}
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="future" className="space-y-4">
                  <p className="text-gray-700 dark:text-gray-300">
                    The journey continues as I explore new technologies and push the boundaries of what's possible in
                    web development. My current focus is on advanced frontend architectures, AI integration, and
                    creating immersive web experiences.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    The stars of tomorrow are yet to be written, but they will surely include deeper explorations of AI
                    integration, immersive experiences, and sustainable development practices.
                  </p>

                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-6 mt-6">
                    <h4 className="font-bold text-lg mb-3 text-purple-700 dark:text-purple-300">
                      🚀 Next Constellation: "The Innovator"
                    </h4>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      Future stars will focus on cutting-edge technologies, AI integration, and revolutionary web
                      experiences.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {["AI Integration", "WebGL/Three.js", "Web3", "AR/VR", "Edge Computing"].map((tech) => (
                        <Badge
                          key={tech}
                          variant="outline"
                          className="border-purple-300 text-purple-700 dark:border-purple-600 dark:text-purple-300"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Enhanced decorative elements */}
      <div className="absolute top-1/4 left-10 opacity-20 pointer-events-none">
        <OrbitAnimation size={200} speed={25} color="rgba(45, 212, 191, 0.2)">
          <motion.div
            className="w-4 h-4 rounded-full bg-teal-500/80 blur-sm"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
          />
        </OrbitAnimation>
      </div>

      <div className="absolute bottom-1/4 right-10 opacity-20 pointer-events-none">
        <OrbitAnimation size={150} speed={20} color="rgba(79, 70, 229, 0.2)">
          <motion.div
            className="w-3 h-3 rounded-full bg-indigo-500/80 blur-sm"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
        </OrbitAnimation>
      </div>

      {/* Shooting stars */}
      {showParticles && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`shooting-star-${i}`}
              className="absolute w-1 h-1 bg-white rounded-full"
              initial={{
                x: -100,
                y: Math.random() * window.innerHeight,
                opacity: 0,
              }}
              animate={{
                x: window.innerWidth + 100,
                y: Math.random() * window.innerHeight + 200,
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 5 + Math.random() * 10,
                ease: "linear",
              }}
              style={{
                boxShadow: "0 0 10px 2px rgba(255, 255, 255, 0.8)",
                filter: "blur(0.5px)",
              }}
            />
          ))}
        </div>
      )}

      {/* Enhanced CSS animations */}
      <style jsx global>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.2; }
          50% { transform: scale(1.1); opacity: 0.4; }
          100% { transform: scale(1); opacity: 0.2; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes sparkle {
          0%, 100% { opacity: 0.8; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-sparkle {
          animation: sparkle 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}
