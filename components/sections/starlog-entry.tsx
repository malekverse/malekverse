"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { Star, Rocket, Sparkles, ArrowRight } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useMobile } from "@/hooks/use-mobile"

// Mini constellation data for preview
const previewStars = [
  { id: 1, x: 20, y: 30, size: 2, delay: 0 },
  { id: 2, x: 35, y: 45, size: 3, delay: 0.5 },
  { id: 3, x: 60, y: 25, size: 2.5, delay: 1 },
  { id: 4, x: 75, y: 55, size: 2, delay: 1.5 },
  { id: 5, x: 45, y: 70, size: 1.5, delay: 2 },
  { id: 6, x: 25, y: 65, size: 2, delay: 2.5 },
]

const constellationLines = [
  { from: 1, to: 2 },
  { from: 2, to: 3 },
  { from: 3, to: 4 },
  { from: 2, to: 5 },
  { from: 5, to: 6 },
]

export function StarlogEntry() {
  const router = useRouter()
  const isMobile = useMobile()

  const [isHovered, setIsHovered] = useState(false)
  const [isLaunching, setIsLaunching] = useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 })
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 })

  const cardRef = useRef<HTMLDivElement>(null)

  // Handle mouse movement for parallax effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current || isMobile) return

    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const deltaX = (e.clientX - centerX) / 20
    const deltaY = (e.clientY - centerY) / 20

    mouseX.set(deltaX)
    mouseY.set(deltaY)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    mouseX.set(0)
    mouseY.set(0)
  }

  // Launch animation and navigation
  const handleLaunch = async () => {
    setIsLaunching(true)

    // Wait for launch animation
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Navigate to starlog page
    router.push("/starlog")
  }

  // Keyboard accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      handleLaunch()
    }
  }

  return (
    <section id="starlog-entry" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-teal-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Journey Through My Cosmos
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Embark on an immersive exploration of my professional journey through an interactive cosmic experience.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Main Launch Card */}
          <motion.div
            ref={cardRef}
            className="relative flex-1 max-w-2xl mx-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
          >
            <Card className="relative overflow-hidden border-2 border-transparent bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 hover:border-teal-500/50 transition-all duration-500">
              {/* Cosmic Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-purple-900/20 to-teal-900/20 dark:from-indigo-900/40 dark:via-purple-900/40 dark:to-teal-900/40" />

              {/* Animated Stars Background */}
              <div className="absolute inset-0 overflow-hidden">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full opacity-60"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      opacity: [0.3, 1, 0.3],
                      scale: [1, 1.5, 1],
                    }}
                    transition={{
                      duration: 2 + Math.random() * 2,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: Math.random() * 2,
                    }}
                  />
                ))}
              </div>

              {/* Glow Effect */}
              <motion.div
                className="absolute inset-0 rounded-lg"
                animate={
                  isHovered
                    ? {
                        boxShadow: [
                          "0 0 20px rgba(45, 212, 191, 0.3)",
                          "0 0 40px rgba(45, 212, 191, 0.5)",
                          "0 0 20px rgba(45, 212, 191, 0.3)",
                        ],
                      }
                    : {}
                }
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              />

              <div className="relative p-8 lg:p-12">
                <motion.div style={{ x: springX, y: springY }} className="space-y-6">
                  {/* Header */}
                  <div className="text-center space-y-4">
                    <motion.div
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-teal-500/20 to-purple-500/20 border border-teal-500/30"
                      animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
                    >
                      <Sparkles className="h-4 w-4 text-teal-400" />
                      <span className="text-sm font-medium text-teal-300">Interactive Experience</span>
                    </motion.div>

                    <h3 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-teal-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                      Starlog: My Professional Journey
                    </h3>

                    <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto">
                      Navigate through an immersive star map of my career milestones, achievements, and growth as a
                      developer.
                    </p>
                  </div>

                  {/* Features Grid */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { icon: "🌟", label: "Interactive Stars", desc: "Click to explore" },
                      { icon: "🏆", label: "Achievements", desc: "Unlock rewards" },
                      { icon: "🌌", label: "Constellations", desc: "Career themes" },
                      { icon: "🎮", label: "Gamified", desc: "Engaging UX" },
                    ].map((feature, index) => (
                      <motion.div
                        key={index}
                        className="text-center p-3 rounded-lg bg-white/10 dark:bg-black/20 backdrop-blur-sm"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="text-2xl mb-2">{feature.icon}</div>
                        <div className="text-sm font-medium text-gray-800 dark:text-gray-200">{feature.label}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">{feature.desc}</div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Launch Button */}
                  <div className="text-center">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        size="lg"
                        className="relative overflow-hidden bg-gradient-to-r from-teal-500 to-purple-600 hover:from-teal-400 hover:to-purple-500 text-white border-0 px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                        onClick={handleLaunch}
                        onKeyDown={handleKeyDown}
                        disabled={isLaunching}
                        aria-label="Launch Starlog Experience"
                      >
                        {/* Button Background Animation */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                          animate={isHovered ? { x: ["-100%", "100%"] } : {}}
                          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                        />

                        <span className="relative flex items-center gap-3">
                          {isLaunching ? (
                            <>
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                              >
                                <Sparkles className="h-5 w-5" />
                              </motion.div>
                              Launching...
                            </>
                          ) : (
                            <>
                              <Rocket className="h-5 w-5" />
                              Launch Starlog
                              <ArrowRight className="h-5 w-5" />
                            </>
                          )}
                        </span>
                      </Button>
                    </motion.div>

                    <motion.p
                      className="text-sm text-gray-500 dark:text-gray-400 mt-3"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isHovered ? 1 : 0.7 }}
                    >
                      Press Enter or click to begin your cosmic journey
                    </motion.p>
                  </div>
                </motion.div>
              </div>
            </Card>
          </motion.div>

          {/* Preview Window */}
          <motion.div
            className="flex-1 max-w-md"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Card className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-black border border-gray-700">
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex gap-1">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <span className="text-sm text-gray-400 ml-2">Starlog Preview</span>
                </div>

                {/* Mini Star Map */}
                <div className="relative h-48 bg-gradient-to-br from-indigo-900/30 to-purple-900/30 rounded-lg overflow-hidden">
                  {/* Preview Stars */}
                  {previewStars.map((star) => (
                    <motion.div
                      key={star.id}
                      className="absolute"
                      style={{
                        left: `${star.x}%`,
                        top: `${star.y}%`,
                      }}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: star.delay, duration: 0.5 }}
                    >
                      <motion.div
                        className="relative"
                        animate={{
                          scale: [1, 1.2, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                          delay: star.delay,
                        }}
                      >
                        <Star className="text-teal-400" fill="currentColor" size={star.size * 8} />
                        <motion.div
                          className="absolute inset-0 rounded-full bg-teal-400/30 blur-sm"
                          animate={{
                            opacity: [0.3, 0.8, 0.3],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                            delay: star.delay,
                          }}
                        />
                      </motion.div>
                    </motion.div>
                  ))}

                  {/* Constellation Lines */}
                  <svg className="absolute inset-0 w-full h-full">
                    {constellationLines.map((line, index) => {
                      const fromStar = previewStars.find((s) => s.id === line.from)
                      const toStar = previewStars.find((s) => s.id === line.to)
                      if (!fromStar || !toStar) return null

                      return (
                        <motion.line
                          key={index}
                          x1={`${fromStar.x}%`}
                          y1={`${fromStar.y}%`}
                          x2={`${toStar.x}%`}
                          y2={`${toStar.y}%`}
                          stroke="rgba(45, 212, 191, 0.4)"
                          strokeWidth="1"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ delay: 3 + index * 0.2, duration: 0.8 }}
                        />
                      )
                    })}
                  </svg>

                  {/* Floating Particles */}
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-purple-400 rounded-full"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                      }}
                      animate={{
                        y: [-10, 10, -10],
                        opacity: [0.3, 1, 0.3],
                      }}
                      transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: Math.random() * 2,
                      }}
                    />
                  ))}
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Progress</span>
                    <span className="text-teal-400">12/15 Stars</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <motion.div
                      className="bg-gradient-to-r from-teal-500 to-purple-500 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: "80%" }}
                      transition={{ delay: 4, duration: 1 }}
                    />
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Badge variant="secondary" className="text-xs">
                      🏆 5 Achievements
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      ⭐ 3 Constellations
                    </Badge>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Stats Preview */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          {[
            { icon: "🌟", value: "15+", label: "Career Milestones" },
            { icon: "🚀", value: "6", label: "Major Projects" },
            { icon: "🏆", value: "10+", label: "Achievements" },
            { icon: "🌌", value: "5", label: "Growth Phases" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center p-4 rounded-lg bg-white/5 dark:bg-black/20 backdrop-blur-sm border border-gray-200/20 dark:border-gray-700/30"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-teal-400 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Launch Overlay */}
      <AnimatePresence>
        {isLaunching && (
          <motion.div
            className="fixed inset-0 z-50 bg-black flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="text-center text-white"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <motion.div
                className="text-6xl mb-4"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                🚀
              </motion.div>
              <h3 className="text-2xl font-bold mb-2">Launching Starlog...</h3>
              <p className="text-gray-400">Preparing your cosmic journey</p>

              {/* Loading Animation */}
              <div className="flex justify-center mt-6">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 bg-teal-400 rounded-full mx-1"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Decorations */}
      <div className="absolute top-20 left-10 opacity-20 pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          <Star className="h-8 w-8 text-teal-500" />
        </motion.div>
      </div>

      <div className="absolute bottom-20 right-10 opacity-20 pointer-events-none">
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          <Sparkles className="h-6 w-6 text-purple-500" />
        </motion.div>
      </div>
    </section>
  )
}
