"use client"

import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"

export function InteractiveStellarBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMouseInWindow, setIsMouseInWindow] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions to match window
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      ctx.scale(dpr, dpr)
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
    }

    // Star properties
    interface Star {
      x: number
      y: number
      size: number
      baseSize: number
      color: string
      brightness: number
      baseBrightness: number
      twinkleSpeed: number
      twinklePhase: number
      glowSize: number
      baseGlowSize: number
    }

    // Create stars - fewer, more detailed stars
    let stars: Star[] = []
    const createStars = () => {
      stars = []
      // Fewer stars for a more refined look
      const numStars = 35

      for (let i = 0; i < numStars; i++) {
        // Create stars with varying properties
        const baseSize = 0.5 + Math.random() * 2.5
        const baseBrightness = 0.3 + Math.random() * 0.7
        const baseGlowSize = baseSize * (2 + Math.random() * 3)

        stars.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: baseSize,
          baseSize: baseSize,
          color: getStarColor(baseBrightness),
          brightness: baseBrightness,
          baseBrightness: baseBrightness,
          twinkleSpeed: 0.5 + Math.random() * 2,
          twinklePhase: Math.random() * Math.PI * 2,
          glowSize: baseGlowSize,
          baseGlowSize: baseGlowSize,
        })
      }
    }

    // Get realistic star color based on brightness
    const getStarColor = (brightness: number) => {
      // Realistic star colors from blue-white to yellow-orange
      const r = Math.min(255, 200 + brightness * 55)
      const g = Math.min(255, 180 + brightness * 75)
      const b = Math.min(255, 170 + brightness * 85)
      return `rgb(${r}, ${g}, ${b})`
    }

    // Draw a single star with glow effect
    const drawStar = (star: Star) => {
      // Draw glow
      const gradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.glowSize)

      gradient.addColorStop(0, `rgba(255, 255, 255, ${star.brightness * 0.8})`)
      gradient.addColorStop(0.4, `rgba(240, 240, 255, ${star.brightness * 0.3})`)
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)")

      ctx.beginPath()
      ctx.fillStyle = gradient
      ctx.arc(star.x, star.y, star.glowSize, 0, Math.PI * 2)
      ctx.fill()

      // Draw star core
      ctx.beginPath()
      ctx.fillStyle = star.color
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
      ctx.fill()

      // Optional: draw subtle cross-shaped light rays for brighter stars
      if (star.brightness > 0.7) {
        ctx.beginPath()
        ctx.strokeStyle = `rgba(255, 255, 255, ${star.brightness * 0.4})`
        ctx.lineWidth = star.size / 3

        // Horizontal ray
        ctx.moveTo(star.x - star.glowSize * 0.7, star.y)
        ctx.lineTo(star.x + star.glowSize * 0.7, star.y)

        // Vertical ray
        ctx.moveTo(star.x, star.y - star.glowSize * 0.7)
        ctx.lineTo(star.x, star.y + star.glowSize * 0.7)

        ctx.stroke()
      }
    }

    // Update star properties based on time and mouse position
    const updateStars = (time: number) => {
      stars.forEach((star) => {
        // Natural twinkling effect
        star.brightness = star.baseBrightness * (0.7 + 0.3 * Math.sin(time * star.twinkleSpeed + star.twinklePhase))
        star.size = star.baseSize * (0.8 + 0.2 * Math.sin(time * star.twinkleSpeed + star.twinklePhase))

        // Update star color based on brightness
        star.color = getStarColor(star.brightness)

        // React to mouse if it's in the window
        if (isMouseInWindow) {
          const dx = mousePosition.x - star.x
          const dy = mousePosition.y - star.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          const maxDistance = 150

          if (distance < maxDistance) {
            // Calculate influence based on distance (closer = stronger effect)
            const influence = 1 - distance / maxDistance

            // Increase brightness and size when mouse is near
            star.brightness = Math.min(1, star.baseBrightness + influence * 0.5)
            star.size = star.baseSize + influence * star.baseSize * 0.7
            star.glowSize = star.baseGlowSize + influence * star.baseGlowSize * 1.5

            // Subtle movement away from cursor
            if (distance > 5) {
              star.x += (dx / distance) * influence * -0.3
              star.y += (dy / distance) * influence * -0.3
            }
          } else {
            // Reset glow size when mouse is far
            star.glowSize = star.baseGlowSize
          }
        } else {
          // Reset glow size when mouse is out of window
          star.glowSize = star.baseGlowSize
        }
      })
    }

    // Draw background
    const drawBackground = () => {
      // Create a gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      gradient.addColorStop(0, "#050510")
      gradient.addColorStop(1, "#0a0a20")

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }

    // Animation loop
    let animationFrameId: number
    const startTime = Date.now()

    const animate = () => {
      const currentTime = (Date.now() - startTime) / 1000

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      drawBackground()

      updateStars(currentTime)
      stars.forEach(drawStar)

      animationFrameId = requestAnimationFrame(animate)
    }

    // Initialize
    resizeCanvas()
    createStars()
    animate()

    // Handle window resize
    const handleResize = () => {
      resizeCanvas()
      createStars()
    }

    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    // Track mouse entering/leaving window
    const handleMouseEnter = () => setIsMouseInWindow(true)
    const handleMouseLeave = () => setIsMouseInWindow(false)

    window.addEventListener("resize", handleResize)
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseenter", handleMouseEnter)
    window.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseenter", handleMouseEnter)
      window.removeEventListener("mouseleave", handleMouseLeave)
      cancelAnimationFrame(animationFrameId)
    }
  }, [mousePosition, isMouseInWindow])

  return (
    <motion.canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
      style={{
        position: "fixed",
        pointerEvents: "none",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    />
  )
}
